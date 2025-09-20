"use client";

import { useState } from "react";

export default function VerifyPage() {
  const [certificate, setCertificate] = useState<File | null>(null);
  const [certPreview, setCertPreview] = useState<string | null>(null);
  const [metadata, setMetadata] = useState({ studentName: "", rollNumber: "" });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  // Handle file upload and display preview for images
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCertificate(e.target.files[0]);
      if (e.target.files[0].type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onloadend = () => setCertPreview(reader.result as string);
        reader.readAsDataURL(e.target.files[0]);
      } else {
        setCertPreview(null);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMetadata({ ...metadata, [e.target.name]: e.target.value });
  };

  // Animation hint for missing fields
  const isFieldMissing =
    !certificate || !metadata.studentName.trim() || !metadata.rollNumber.trim();

  const handleVerify = async () => {
    if (isFieldMissing) {
      setResult(null);
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const buffer = await certificate.arrayBuffer();
      const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");

      // Mock verification:
      const mockVerified = hashHex.endsWith("a");
      setResult(mockVerified ? "verified" : "not_verified");
    } catch (err) {
      setResult("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-100 flex justify-center items-center px-4 pb-8 pt-2">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl px-8 py-7">
        <h1 className="text-3xl font-extrabold text-center text-indigo-700 mb-2">
          Certificate Verification
        </h1>
        <p className="text-center text-gray-500 mb-7 text-sm">
          Upload the certificate and fill student details to verify authenticity.
        </p>

        {/* Upload Section */}
        <div className="mb-6">
          <label className="block font-semibold text-gray-700 mb-2">
            Upload Certificate <span className="text-red-400">*</span>
          </label>
          <div
            className={`rounded-xl border-2 border-dashed ${
              certificate ? "border-green-200" : "border-indigo-200"
            } bg-indigo-50 flex items-center px-4 py-4`}
          >
            <input
              type="file"
              onChange={handleFileChange}
              className="flex-1 text-sm text-gray-600 focus:outline-none bg-transparent"
              accept=".pdf,.jpg,.jpeg,.png"
              aria-label="Upload certificate file"
            />
            {certificate && (
              <span className="bg-green-100 text-green-800 ml-4 px-3 py-1 rounded-full text-xs font-semibold">
                {certificate.name}
              </span>
            )}
          </div>
          {/* Certificate Image Preview */}
          {certPreview && (
            <div className="mt-3 mb-1 flex justify-center">
              <img
                src={certPreview}
                alt="Certificate preview"
                className="max-h-40 rounded-2xl border shadow"
              />
            </div>
          )}
        </div>

        {/* Inputs */}
        <div className="mb-5">
          <label className="block font-semibold text-gray-700 mb-1">
            Student Name <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            name="studentName"
            value={metadata.studentName}
            onChange={handleChange}
            className="w-full border border-indigo-200 rounded-lg p-3 text-gray-800 focus:ring-2 focus:ring-indigo-200 bg-indigo-50 placeholder-gray-400"
            placeholder="Enter student name"
            autoComplete="off"
          />
        </div>

        <div className="mb-6">
          <label className="block font-semibold text-gray-700 mb-1">
            Roll Number <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            name="rollNumber"
            value={metadata.rollNumber}
            onChange={handleChange}
            className="w-full border border-indigo-200 rounded-lg p-3 text-gray-800 focus:ring-2 focus:ring-indigo-200 bg-indigo-50 placeholder-gray-400"
            placeholder="Enter roll number"
            autoComplete="off"
          />
        </div>

        <div className="mb-6">
          <label className="block font-semibold text-gray-700 mb-1">
            University <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            name="University"
            value={metadata.university}
            onChange={handleChange}
            className="w-full border border-indigo-200 rounded-lg p-3 text-gray-800 focus:ring-2 focus:ring-indigo-200 bg-indigo-50 placeholder-gray-400"
            placeholder="Enter University Name"
            autoComplete="off"
          />
        </div>
        

        {/* Button */}
        <div className="flex justify-center mt-4 mb-2">
          <button
            onClick={handleVerify}
            disabled={loading || isFieldMissing}
            className={`w-full px-6 py-3 rounded-xl text-white text-lg font-semibold
             shadow-md transition-all duration-200
             ${
               loading || isFieldMissing
                 ? "bg-indigo-200 cursor-not-allowed"
                 : "bg-indigo-600 hover:bg-indigo-700"
             }`}
          >
            {loading ? "Verifying..." : "Verify Certificate"}
          </button>
        </div>
        {/* Field hint */}
        {isFieldMissing && (
          <div className="mt-2 text-center text-red-400 text-sm font-medium animate-pulse">
            Please upload a certificate and fill all fields.
          </div>
        )}

        {/* Result */}
        {result && (
          <div className="mt-7 text-center">
            {result === "verified" && (
              <div className="bg-green-50 border border-green-200 py-5 px-2 rounded-xl animate-pulse">
                <p className="text-green-600 font-bold text-2xl mb-1">✓ Certificate Verified</p>
                <p className="text-sm text-green-700">This certificate is authentic and valid.</p>
              </div>
            )}
            {result === "not_verified" && (
              <div className="bg-red-50 border border-red-200 py-5 px-2 rounded-xl animate-pulse">
                <p className="text-red-600 font-bold text-2xl mb-1">✗ Not Verified</p>
                <p className="text-sm text-red-700">This certificate could not be verified.</p>
              </div>
            )}
            {result === "error" && (
              <div className="bg-yellow-50 border border-yellow-200 py-5 px-2 rounded-xl">
                <p className="text-yellow-600 font-bold text-xl mb-1">
                  ⚠️ Error during verification
                </p>
                <p className="text-sm text-yellow-700">Please try again later.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
0x22d0e6b48f0f5841a48828c96ff42b60612249d3c2e7816c3ed41daf9c44e19f