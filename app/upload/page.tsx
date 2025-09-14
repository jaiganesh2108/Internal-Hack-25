"use client";

import { useState } from "react";
import CryptoJS from "crypto-js";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {
  CheckCircleIcon,
  CloudArrowUpIcon,
  AcademicCapIcon,
  UserCircleIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { QRCodeCanvas } from "qrcode.react";

const universities = [
  "Harvard University",
  "Stanford University",
  "MIT",
  "Oxford University",
];
const issuers = [
  "Registrar Office",
  "Dean of Academics",
  "Certificate Desk",
  "Admin Office",
];

export default function UploadPage() {
  const [selectedUniversity, setUniversity] = useState("");
  const [selectedIssuer, setIssuer] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [studentFiles, setStudentFiles] = useState({});
  const [search, setSearch] = useState("");

  const handleUpload = async (event) => {
    const files = Array.from(event.target.files || []);
    if (!files.length) return;

    setLoading(true);
    setResults([]);
    setStudentFiles({});

    const studentsMap = {};
    files.forEach((file) => {
      // If uploaded as folder -> use folder name
      // If drag-drop -> fallback from file name
      const parts = file.webkitRelativePath
        ? file.webkitRelativePath.split("/")
        : [file.name];
      const student =
        parts.length > 1 ? parts[1] : file.name.split("_")[0] || "Unknown";

      if (!studentsMap[student]) studentsMap[student] = [];
      studentsMap[student].push(file);
    });

    setStudentFiles(studentsMap); // preview before hashing

    const output = [];
    for (const student of Object.keys(studentsMap)) {
      const files = studentsMap[student];
      files.sort((a, b) => a.name.localeCompare(b.name));

      let folderContent = "";
      for (const f of files) {
        const content = await f.arrayBuffer();
        const wordArray = CryptoJS.lib.WordArray.create(new Uint8Array(content));
        const fileHash = CryptoJS.SHA256(wordArray).toString();
        folderContent += fileHash;
      }
      const folderHash = CryptoJS.SHA256(folderContent).toString();
      output.push({
        student,
        hash: folderHash,
        university: selectedUniversity,
        issuer: selectedIssuer,
      });
    }

    setResults(output);
    setLoading(false);
  };

  const steps = [
    { label: "University", icon: <AcademicCapIcon className="w-6 h-6" /> },
    { label: "Issuer", icon: <UserCircleIcon className="w-6 h-6" /> },
    { label: "Upload", icon: <CloudArrowUpIcon className="w-6 h-6" /> },
    { label: "Results", icon: <CheckCircleIcon className="w-6 h-6" /> },
  ];

  const activeStep =
    selectedUniversity === ""
      ? 0
      : selectedIssuer === ""
      ? 1
      : Object.keys(studentFiles).length === 0 && !loading
      ? 2
      : results.length > 0
      ? 3
      : 2;

  const downloadQRCode = (student) => {
    const canvas = document.getElementById(`qr-${student}`);
    if (!canvas) return;
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    const link = document.createElement("a");
    link.href = pngUrl;
    link.download = `${student}_qr.png`;
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  // Search filter
  const filteredResults = results.filter((r) =>
    r.student.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 to-white flex flex-col">
      <Header />

      <section className="flex-1 w-full px-4 py-8 sm:px-6 lg:px-12 flex items-center justify-center">
        <div className="w-full max-w-5xl bg-white shadow-2xl rounded-3xl p-8 sm:p-12 border border-gray-200">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-indigo-900 mb-12 text-center">
            Bulk Upload Certificates
          </h1>

          {/* Stepper */}
          <div className="flex justify-between items-center mb-10 gap-4 relative">
            {steps.map((step, idx) => {
              const isActive = idx === activeStep;
              const isCompleted = idx < activeStep;
              return (
                <div
                  key={idx}
                  className="flex-1 flex flex-col items-center relative"
                >
                  {idx < steps.length - 1 && (
                    <div className="absolute top-6 left-1/2 w-full h-1 transform -translate-x-1/2 z-0">
                      <div
                        className={`h-1 rounded-full transition-all duration-500 ${
                          isCompleted
                            ? "bg-indigo-500 w-full"
                            : "bg-gray-300 w-full"
                        }`}
                      ></div>
                    </div>
                  )}
                  <div
                    className={`relative z-10 flex items-center justify-center w-12 h-12 rounded-full border-2 transition-colors duration-300 ${
                      isCompleted
                        ? "border-indigo-600 bg-indigo-600 text-white animate-pulse"
                        : isActive
                        ? "border-indigo-600 bg-indigo-100 text-indigo-600"
                        : "border-gray-300 bg-white text-gray-400"
                    }`}
                    aria-current={isActive ? "step" : undefined}
                  >
                    {isCompleted ? (
                      <CheckCircleIcon className="w-6 h-6" />
                    ) : (
                      step.icon
                    )}
                  </div>
                  <span
                    className={`mt-3 text-xs sm:text-sm font-semibold text-center ${
                      isActive
                        ? "text-indigo-800"
                        : isCompleted
                        ? "text-indigo-700"
                        : "text-gray-500"
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* University Dropdown */}
          <div className="mb-6 sm:mb-8">
            <label
              htmlFor="university-select"
              className="block mb-2 font-semibold text-indigo-900 text-lg"
            >
              University Name
            </label>
            <select
              id="university-select"
              value={selectedUniversity}
              onChange={(e) => setUniversity(e.target.value)}
              className="w-full p-4 border border-indigo-400 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-400 bg-white text-gray-900 placeholder-gray-700 transition disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed"
            >
              <option value="" className="text-gray-500">
                Select University
              </option>
              {universities.map((uni) => (
                <option value={uni} key={uni} className="text-gray-900">
                  {uni}
                </option>
              ))}
            </select>
          </div>

          {/* Issuer Dropdown */}
          <div className="mb-8">
            <label
              htmlFor="issuer-select"
              className="block mb-2 font-semibold text-indigo-900 text-lg"
            >
              Issuer Name
            </label>
            <select
              id="issuer-select"
              value={selectedIssuer}
              onChange={(e) => setIssuer(e.target.value)}
              disabled={!selectedUniversity}
              className="w-full p-4 border border-indigo-200 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-400 bg-white text-gray-900 transition disabled:border-gray-200 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
            >
              <option value="" className="text-gray-500">
                Select Issuer
              </option>
              {issuers.map((issuer) => (
                <option value={issuer} key={issuer} className="text-gray-900">
                  {issuer}
                </option>
              ))}
            </select>
          </div>

          {/* Drag and Drop Upload */}
          <div
            onDragEnter={() => setDragActive(true)}
            onDragLeave={() => setDragActive(false)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              setDragActive(false);
              const inputElement = document.getElementById("fileInput");
              if (inputElement) {
                const dt = e.dataTransfer;
                if (dt?.files?.length) {
                  const dataTransfer = new DataTransfer();
                  Array.from(dt.files).forEach((file) =>
                    dataTransfer.items.add(file)
                  );
                  inputElement.files = dataTransfer.files;
                  handleUpload({ target: inputElement });
                }
              }
            }}
            className={`mb-10 border-4 border-dashed rounded-3xl p-10 text-center cursor-pointer transition-colors duration-300 select-none relative
              ${
                !selectedUniversity || !selectedIssuer
                  ? "border-gray-200 bg-gray-100 text-gray-500 cursor-not-allowed"
                  : dragActive
                  ? "border-indigo-600 bg-indigo-50 text-indigo-800"
                  : "border-indigo-500 bg-indigo-100 text-indigo-800 hover:border-indigo-600"
              }
            `}
            onClick={() => {
              if (selectedUniversity && selectedIssuer) {
                const input = document.getElementById("fileInput");
                input?.click();
              }
            }}
          >
            <CloudArrowUpIcon className="w-14 h-14 mx-auto mb-6" />
            <input
              id="fileInput"
              type="file"
              directory=""
              webkitdirectory=""
              multiple
              onChange={handleUpload}
              className="hidden"
              disabled={!selectedUniversity || !selectedIssuer}
            />
            <p
              className={`text-lg sm:text-xl font-semibold ${
                selectedUniversity && selectedIssuer
                  ? "text-indigo-800"
                  : "text-gray-500"
              }`}
            >
              {selectedUniversity && selectedIssuer
                ? "Click or drag folder here to upload certificates"
                : "Select university and issuer to enable upload"}
            </p>
            {Object.keys(studentFiles).length > 0 && (
              <div className="mt-6 bg-gray-50 border rounded-xl p-4 shadow w-full text-left max-h-40 overflow-y-auto">
                <div className="text-indigo-700 font-bold mb-2">
                  Folders Selected:
                </div>
                {Object.keys(studentFiles).map((student) => (
                  <div key={student} className="mb-2">
                    <span className="font-semibold">{student}:</span>{" "}
                    {studentFiles[student].map((file) => file.name).join(", ")}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Loading */}
          {loading && (
            <div className="flex justify-center items-center h-24">
              <div className="border-4 border-indigo-600 border-t-transparent rounded-full w-10 h-10 animate-spin mr-4"></div>
              <span className="text-indigo-600 font-semibold text-lg sm:text-xl animate-pulse">
                Hashing student folders... Please wait.
              </span>
            </div>
          )}

          {/* Search */}
          {results.length > 0 && (
            <div className="flex items-center gap-2 mb-6 max-w-md mx-auto">
              <MagnifyingGlassIcon className="w-6 h-6 text-indigo-400" />
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-4 py-2 border border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="Search student..."
              />
            </div>
          )}

          {/* Results */}
          {results.length > 0 && (
            <section className="mt-8" aria-live="polite" aria-atomic="true">
              <h2 className="text-2xl sm:text-3xl font-bold text-indigo-900 mb-6 flex items-center gap-3">
                <CheckCircleIcon className="w-7 h-7 text-green-600 animate-pulse" />
                Upload Results
              </h2>
              <div className="grid gap-6 max-h-[28rem] overflow-y-auto sm:grid-cols-2 lg:grid-cols-3">
                {filteredResults.map((r, i) => (
                  <article
                    key={i}
                    className="p-5 rounded-3xl bg-indigo-50 border border-indigo-200 shadow-lg hover:shadow-xl transition-shadow focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    tabIndex={0}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-bold text-indigo-700 text-lg truncate">
                        {r.student}
                      </h3>
                      <span className="px-4 py-1 text-xs bg-green-200 text-green-800 rounded-full font-semibold select-none">
                        Verified
                      </span>
                    </div>
                    <p className="text-sm font-mono text-indigo-800 break-words select-text">
                      {r.hash}
                    </p>
                    <p className="text-indigo-700 mt-2 text-sm mb-2">
                      University: {r.university} <br /> Issuer: {r.issuer}
                    </p>
                    <div className="mt-3 flex flex-col items-center gap-2">
                      <QRCodeCanvas
                        id={`qr-${r.student}`}
                        value={`https://your-verification-site.com/verify?hash=${r.hash}`}
                        size={128}
                      />
                      <button
                        onClick={() => downloadQRCode(r.student)}
                        className="px-3 py-1 bg-indigo-600 text-white rounded-xl text-sm hover:bg-indigo-700 transition focus:outline-none focus:ring-2 focus:ring-indigo-600"
                      >
                        Download QR
                      </button>
                    </div>
                  </article>
                ))}
                {filteredResults.length === 0 && (
                  <div className="col-span-full text-center text-indigo-500 font-semibold p-6">
                    No matches found.
                  </div>
                )}
              </div>
            </section>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
