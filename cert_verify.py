# certificate_forgery_train.py
import os
import re
import cv2
import math
import json
import glob
import time
import random
import numpy as np
import pandas as pd
from PIL import Image
from tqdm import tqdm
from pathlib import Path

import torch
import torch.nn as nn
from torch.utils.data import Dataset, DataLoader
import torchvision.transforms as T
import torchvision.models as models

import pytesseract
from pyzbar.pyzbar import decode as decode_barcodes

from sklearn.preprocessing import StandardScaler
from sklearn.metrics import classification_report, roc_auc_score

# --------------------------
# Utility: watermark detection (LSB + DCT fingerprint)
# --------------------------
def lsb_watermark_score(img_gray):
    """
    Simple LSB-based anomaly detection heuristic:
    - compute least-significant-bit noise energy across the image.
    - real scanned documents often have less random LSB noise than forged printed-edited images.
    Returns a float score (higher -> suspicious).
    """
    arr = np.array(img_gray).astype(np.uint8)
    lsb = arr & 1
    # measure entropy/variance of LSB plane
    return float(lsb.var())

def dct_fingerprint_score(img_gray, freq_block_size=8):
    """
    Compute DCT energy in mid-high frequency bands as a fingerprint.
    Forged/edited images often show different DCT energy patterns.
    Return normalized energy score.
    """
    arr = np.array(img_gray).astype(np.float32)
    h, w = arr.shape
    # crop to multiple of block size
    H = (h // freq_block_size) * freq_block_size
    W = (w // freq_block_size) * freq_block_size
    arr = arr[:H, :W]

    total_energy = 0.0
    count = 0
    for i in range(0, H, freq_block_size):
        for j in range(0, W, freq_block_size):
            block = arr[i:i+freq_block_size, j:j+freq_block_size]
            dct = cv2.dct(block)
            # mid-high freq indices (exclude DC [0,0] and lowest freq)
            # pick a small mask
            mask = np.zeros_like(dct)
            mask[freq_block_size//2:, freq_block_size//2:] = 1.0
            energy = np.sum((dct * mask)**2)
            total_energy += energy
            count += 1
    return float(total_energy / max(1, count))

def watermark_features_from_image(pil_img):
    """
    Returns a small vector of watermark-related signals.
    """
    # convert to grayscale
    img_gray = pil_img.convert("L")
    # low-res version to speed up
    small = img_gray.resize((512, int(512 * img_gray.size[1] / img_gray.size[0])), Image.BILINEAR)
    lsb_score = lsb_watermark_score(np.array(small))
    dct_score = dct_fingerprint_score(np.array(small))
    return np.array([lsb_score, dct_score], dtype=np.float32)

# --------------------------
# OCR + QR features
# --------------------------
KEYWORDS = ["degree", "certificate", "awarded", "university", "signed", "signature", "seal"]

def ocr_features_from_image(pil_img):
    """
    Runs pytesseract OCR and extracts features:
    - text length
    - number of words
    - fraction of numeric tokens (roll numbers, dates)
    - keyword matches count
    - average word length
    """
    # convert to OpenCV format and optionally pre-process
    img = np.array(pil_img.convert("RGB"))
    # optionally apply grayscale + threshold for better OCR
    gray = cv2.cvtColor(img, cv2.COLOR_RGB2GRAY)
    # Adaptive threshold can help
    proc = cv2.adaptiveThreshold(gray, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C,
                                 cv2.THRESH_BINARY, 11, 2)
    text = pytesseract.image_to_string(proc, lang='eng')
    tokens = re.findall(r"\w+", text.lower())
    if len(tokens) == 0:
        return np.zeros(5, dtype=np.float32)
    num_tokens = len(tokens)
    num_numeric = sum(1 for t in tokens if t.isdigit())
    keyword_matches = sum(1 for k in KEYWORDS for t in tokens if k in t)
    avg_word_len = sum(len(t) for t in tokens) / num_tokens
    text_len = len(text)
    return np.array([text_len, num_tokens, num_numeric / num_tokens, keyword_matches, avg_word_len], dtype=np.float32)

QR_REGEX = re.compile(r"^(https?://|ipfs://|CID:|SHA256:|URN:|urn:|http)", flags=re.I)

def qr_features_from_image(pil_img):
    """
    Uses pyzbar to detect and decode QR/Barcodes.
    Returns:
    - qr_present (0/1)
    - count_qr
    - valid_qr_payload (0/1) - if payload matches expected pattern (customize your regex)
    """
    img_cv = cv2.cvtColor(np.array(pil_img.convert("RGB")), cv2.COLOR_RGB2BGR)
    decoded = decode_barcodes(img_cv)
    count = len(decoded)
    if count == 0:
        return np.array([0.0, 0.0, 0.0], dtype=np.float32)
    valid = 0
    for d in decoded:
        try:
            s = d.data.decode('utf-8')
        except:
            s = ""
        if QR_REGEX.search(s):
            valid = 1
            break
    return np.array([1.0, float(count), float(valid)], dtype=np.float32)

# --------------------------
# Dataset + transforms
# --------------------------
class CertificateDataset(Dataset):
    def __init__(self, root_dir, split="train", transform=None, augment=False):
        self.root_dir = Path(root_dir) / split
        self.samples = []
        for label_name in ["real", "fake"]:
            class_dir = self.root_dir / label_name
            if not class_dir.exists(): continue
            for p in class_dir.glob("*.*"):
                self.samples.append((str(p), 1 if label_name == "real" else 0))
        random.shuffle(self.samples)
        self.transform = transform
        self.augment = augment

    def __len__(self):
        return len(self.samples)

    def __getitem__(self, idx):
        path, label = self.samples[idx]
        pil = Image.open(path).convert("RGB")

        # Extract engineered features (do this here so dataloader can batch)
        wm_feats = watermark_features_from_image(pil)         # shape (2,)
        ocr_feats = ocr_features_from_image(pil)              # shape (5,)
        qr_feats = qr_features_from_image(pil)                # shape (3,)
        engineered = np.concatenate([wm_feats, ocr_feats, qr_feats], axis=0).astype(np.float32)  # (10,)

        if self.transform:
            img_tensor = self.transform(pil)
        else:
            # default transform
            img_tensor = T.Compose([
                T.Resize((512, 512)),
                T.ToTensor(),
                T.Normalize(mean=[0.485,0.456,0.406], std=[0.229,0.224,0.225])
            ])(pil)

        return {
            "image": img_tensor,
            "features": torch.from_numpy(engineered),
            "label": torch.tensor(label, dtype=torch.long),
            "path": path
        }

# --------------------------
# Model: CNN backbone + feature fusion
# --------------------------
class MultimodalForgeryDetector(nn.Module):
    def __init__(self, cnn_name='resnet18', engineered_dim=10, num_classes=2, pretrained=True):
        super().__init__()
        # load backbone
        if cnn_name == 'resnet18':
            backbone = models.resnet18(pretrained=pretrained)
            in_feat = backbone.fc.in_features
            # remove final fc
            modules = list(backbone.children())[:-1]
            self.cnn = nn.Sequential(*modules)  # outputs (B, in_feat, 1, 1)
        else:
            raise NotImplementedError

        self.cnn_out_dim = in_feat
        # small MLP for engineered features
        self.feat_mlp = nn.Sequential(
            nn.Linear(engineered_dim, 64),
            nn.ReLU(),
            nn.BatchNorm1d(64),
            nn.Dropout(0.2),
            nn.Linear(64, 32),
            nn.ReLU()
        )
        # classifier combining both
        self.classifier = nn.Sequential(
            nn.Linear(self.cnn_out_dim + 32, 256),
            nn.ReLU(),
            nn.Dropout(0.4),
            nn.Linear(256, 64),
            nn.ReLU(),
            nn.Linear(64, num_classes)
        )

    def forward(self, image, features):
        # image: (B, 3, H, W)
        x = self.cnn(image)          # (B, C, 1, 1)
        x = x.view(x.size(0), -1)    # (B, C)
        f = self.feat_mlp(features)  # (B, 32)
        out = torch.cat([x, f], dim=1)
        logits = self.classifier(out)
        return logits

# --------------------------
# Training utilities
# --------------------------
def train_epoch(model, dataloader, opt, criterion, device):
    model.train()
    running_loss = 0.0
    all_preds = []
    all_labels = []
    for batch in tqdm(dataloader, desc="train"):
        imgs = batch["image"].to(device)
        feats = batch["features"].to(device)
        labels = batch["label"].to(device)

        opt.zero_grad()
        logits = model(imgs, feats)
        loss = criterion(logits, labels)
        loss.backward()
        opt.step()

        running_loss += loss.item() * imgs.size(0)
        preds = torch.argmax(logits, dim=1).detach().cpu().numpy()
        all_preds.extend(preds.tolist())
        all_labels.extend(labels.detach().cpu().numpy().tolist())

    avg_loss = running_loss / len(dataloader.dataset)
    return avg_loss, all_labels, all_preds

def eval_epoch(model, dataloader, criterion, device):
    model.eval()
    running_loss = 0.0
    all_preds = []
    all_probs = []
    all_labels = []
    with torch.no_grad():
        for batch in tqdm(dataloader, desc="eval"):
            imgs = batch["image"].to(device)
            feats = batch["features"].to(device)
            labels = batch["label"].to(device)
            logits = model(imgs, feats)
            loss = criterion(logits, labels)
            running_loss += loss.item() * imgs.size(0)
            probs = torch.softmax(logits, dim=1)[:,1].detach().cpu().numpy()  # prob of class 1 (real)
            preds = (probs > 0.5).astype(int)
            all_probs.extend(probs.tolist())
            all_preds.extend(preds.tolist())
            all_labels.extend(labels.detach().cpu().numpy().tolist())
    avg_loss = running_loss / len(dataloader.dataset)
    return avg_loss, all_labels, all_preds, all_probs

# --------------------------
# Main training script
# --------------------------
def main():
    root = "./dataset"  # change as needed
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    batch_size = 8
    num_epochs = 12
    lr = 1e-4

    # transforms for image input
    train_transforms = T.Compose([
        T.Resize((512, 512)),
        T.RandomRotation(2),
        T.ColorJitter(brightness=0.05, contrast=0.05),
        T.ToTensor(),
        T.Normalize(mean=[0.485,0.456,0.406], std=[0.229,0.224,0.225]),
    ])
    val_transforms = T.Compose([
        T.Resize((512, 512)),
        T.ToTensor(),
        T.Normalize(mean=[0.485,0.456,0.406], std=[0.229,0.224,0.225]),
    ])

    train_ds = CertificateDataset(root_dir=root, split="train", transform=train_transforms)
    val_ds = CertificateDataset(root_dir=root, split="val", transform=val_transforms)

    train_loader = DataLoader(train_ds, batch_size=batch_size, shuffle=True, num_workers=4, pin_memory=True)
    val_loader = DataLoader(val_ds, batch_size=batch_size, shuffle=False, num_workers=4, pin_memory=True)

    model = MultimodalForgeryDetector(cnn_name='resnet18', engineered_dim=10, num_classes=2, pretrained=True)
    model.to(device)

    # Freeze early layers optionally (uncomment if small dataset)
    # for name, param in model.cnn.named_parameters():
    #     if "layer4" not in name: param.requires_grad = False

    optimizer = torch.optim.AdamW(filter(lambda p: p.requires_grad, model.parameters()), lr=lr, weight_decay=1e-5)
    criterion = nn.CrossEntropyLoss()

    best_auc = 0.0
    save_dir = Path("./checkpoints"); save_dir.mkdir(parents=True, exist_ok=True)

    for epoch in range(1, num_epochs+1):
        print(f"\n=== Epoch {epoch}/{num_epochs} ===")
        train_loss, train_labels, train_preds = train_epoch(model, train_loader, optimizer, criterion, device)
        val_loss, val_labels, val_preds, val_probs = eval_epoch(model, val_loader, criterion, device)

        try:
            auc = roc_auc_score(val_labels, val_probs)
        except:
            auc = 0.0
        print(f"Train Loss: {train_loss:.4f} | Val Loss: {val_loss:.4f} | Val AUC: {auc:.4f}")

        # print simple classification report
        print("Validation classification report:")
        print(classification_report(val_labels, val_preds, target_names=["fake","real"], digits=4))

        # save best
        if auc > best_auc:
            best_auc = auc
            torch.save({
                "epoch": epoch,
                "model_state": model.state_dict(),
                "optimizer_state": optimizer.state_dict(),
                "auc": best_auc
            }, save_dir / f"best_model_epoch{epoch}_auc{best_auc:.4f}.pt")
            print("Saved best model.")

    print("Training finished.")

if __name__ == "__main__":
    main()
