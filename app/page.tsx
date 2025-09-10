import Link from 'next/link';
import Header from "./components/Header";
import Footer from "./components/Footer";


export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex flex-col items-center justify-between">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="w-full min-h-screen bg-grid flex items-center justify-center px-6 py-12">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
          
          {/* Left Side (Image) */}
          <div className="flex-1 flex justify-center">
            <img
              src="/hero-certificates.png"
              alt="Illustration of certificate verification"
              className="w-full max-w-sm md:max-w-md object-contain"
              loading="lazy"
            />
          </div>

          {/* Right Side (Text + CTA + Problem & Solution) */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-900 leading-tight">
              Verify certificates instantly,{" "}
              <span className="text-indigo-600">Prevent Fraud. Build Trust.</span>
            </h1>

            <p className="text-lg text-gray-600 mb-8">
              Trusted by universities, employers, and institutions, our platform securely
              verifies academic and professional credentials using
              <span className="font-semibold"> blockchain-backed technology</span>.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-10">
              <Link
                href="/"
                className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-full shadow hover:bg-indigo-700 transition-colors"
              >
                Verify Now
              </Link>
              <Link
                  href="/upload"
                  className="px-6 py-3 bg-gray-100 text-indigo-700 font-semibold rounded-full shadow hover:bg-gray-200 transition-colors"
                >
                  Bulk Upload
              </Link>
              <Link
                href="/"
                className="px-6 py-3 bg-gray-100 text-indigo-700 font-semibold rounded-full shadow hover:bg-gray-200 transition-colors"
              >
                Dashboard
              </Link>
            </div>

            {/* Problem & Solution Summary */}
            <div className="bg-indigo-50 p-6 rounded-xl shadow-md">
              <h2 className="text-2xl font-semibold text-indigo-800 mb-3">
                Problem &amp; Solution
              </h2>
              <p className="text-gray-700 mb-3">
                Fake degrees and forged certificates are a growing concern, causing
                delays and risks in employment and admissions. Manual verifications are
                slow and unreliable.
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">VerifyCert</span> offers a smart digital
                platform integrating <span className="font-semibold">AI, OCR, and blockchain </span> 
                to authenticate credentials instantly — ensuring trust and security across
                institutions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full max-w-6xl mx-auto px-6 mb-20">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
          Platform Features
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {/* Feature 1 */}
          <div className="p-8 border rounded-2xl shadow hover:shadow-lg transition bg-white">
            <div className="flex justify-center mb-4">
              <svg className="w-12 h-12 text-indigo-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-indigo-700 mb-2">AI-Powered OCR</h3>
            <p className="text-gray-600">
              Instantly extract & validate details from certificates, PDFs, and images
              with high accuracy — no manual entry required.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="p-8 border rounded-2xl shadow hover:shadow-lg transition bg-white">
            <div className="flex justify-center mb-4">
              <svg className="w-12 h-12 text-indigo-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-indigo-700 mb-2">Blockchain Validation</h3>
            <p className="text-gray-600">
              Every certificate is hashed & stored on blockchain, making it tamper-proof,
              transparent, and universally verifiable.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="p-8 border rounded-2xl shadow hover:shadow-lg transition bg-white">
            <div className="flex justify-center mb-4">
              <svg className="w-12 h-12 text-indigo-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M20 13V9a7 7 0 10-14 0v4H5l7 7 7-7h-1z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-indigo-700 mb-2">Institution Integration</h3>
            <p className="text-gray-600">
              Universities & colleges can bulk-upload or integrate APIs
              for seamless real-time certificate authentication.
            </p>
          </div>
        </div>

        {/* More Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          <div className="p-6 bg-indigo-50 rounded-xl shadow-sm">
            <h4 className="font-semibold text-indigo-800 mb-2">QR-Code Verification</h4>
            <p className="text-gray-700">Each certificate generates a unique QR code for instant scanning & validation.</p>
          </div>
          <div className="p-6 bg-indigo-50 rounded-xl shadow-sm">
            <h4 className="font-semibold text-indigo-800 mb-2">Fraud Detection AI</h4>
            <p className="text-gray-700">Smart algorithms flag suspicious or duplicate certificate entries proactively.</p>
          </div>
          <div className="p-6 bg-indigo-50 rounded-xl shadow-sm">
            <h4 className="font-semibold text-indigo-800 mb-2">Secure User Access</h4>
            <p className="text-gray-700">OAuth & DigiLocker integration for secure, privacy-first certificate access.</p>
          </div>
          <div className="p-6 bg-indigo-50 rounded-xl shadow-sm">
            <h4 className="font-semibold text-indigo-800 mb-2">Analytics Dashboard</h4>
            <p className="text-gray-700">Track certificate issuance, verification trends, and fraud prevention stats.</p>
          </div>
        </div>

        {/* Demo Link */}
        <div className="text-center mt-16">
          <a
            href="https://demo.verifycert.example"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-10 py-4 bg-indigo-600 text-white text-lg font-semibold rounded-full shadow-lg hover:bg-indigo-700 transition"
          >
            Try the Live Demo
          </a>
        </div>
      </section>


      {/* How it works */}
      <section
        className="w-full py-16 bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/jharkhand-bg-image.png')",
          backgroundSize: "50%",
        }}
      >
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-14 text-center">How It Works</h2>
          <div className="md:grid md:grid-cols-3 flex flex-col gap-y-12 md:gap-x-8">
            {/* Step 1 */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <div className="bg-indigo-600 w-12 h-12 flex items-center justify-center rounded-full shadow mb-5">
                {/* Icon: Upload Arrow */}
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 16V7m0 0L8.5 10.5M12 7l3.5 3.5M5 19h14" />
                </svg>
              </div>
              <h3 className="font-bold text-xl mb-3 text-indigo-800">1. Upload or Scan</h3>
              <p className="text-gray-600 text-base mb-2">
                Submit your certificate as a file, enter its unique code, or scan a QR code using our mobile-friendly platform.
              </p>
              <p className="text-sm text-gray-500">
                Example: Take a photo of your degree’s QR code or upload a university-issued PDF for rapid processing.
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <div className="bg-indigo-600 w-12 h-12 flex items-center justify-center rounded-full shadow mb-5">
                {/* Icon: Validation/Shield */}
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4l7 4v2c0 5-3.3 9.7-7 11-3.7-1.3-7-6-7-11V8l7-4z" />
                </svg>
              </div>
              <h3 className="font-bold text-xl mb-3 text-indigo-800">2. Secure Validation</h3>
              <p className="text-gray-600 text-base mb-2">
                Our system checks every entry against university-verified and blockchain-protected records, using robust crypto-security to instantly confirm authenticity.
              </p>
              <p className="text-sm text-gray-500">
                Within seconds, forged or tampered credentials are flagged, ensuring only genuine documents proceed.
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <div className="bg-indigo-600 w-12 h-12 flex items-center justify-center rounded-full shadow mb-5">
                {/* Icon: Check Badge */}
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 15c2.502 0 4.847.564 6.879 1.804M15 11l-3 3-2-2m4 6a5 5 0 11-10 0 5 5 0 0110 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-xl mb-3 text-indigo-800">3. Instant Results & Reports</h3>
              <p className="text-gray-600 text-base mb-2">
                Get an immediate result: <span className="font-semibold text-green-700">Valid</span>, <span className="font-semibold text-yellow-700">Expired</span>, or <span className="font-semibold text-red-700">Invalid</span>.
                Download a detailed report and share or print as proof.
              </p>
              <p className="text-sm text-gray-500">
                Admins and institutions can track all verifications, manage dashboards, and access analytics for ongoing oversight.
              </p>
            </div>
          </div>

          {/* DigiLocker/Login Access Section */}
          <div className="mt-20 p-8 rounded-xl max-w-4xl mx-auto text-center" style={{ backgroundColor: "rgba(67, 56, 202, 0.1)" }}>
            <h3 className="text-2xl font-semibold text-indigo-800 mb-6">Secure Access with DigiLocker Login</h3>
            <p className="text-gray-700 mb-4">
              Students, employers, and institutions can securely log in to our platform using their DigiLocker accounts — India's trusted digital locker service. This seamless integration guarantees safe access without the need for multiple passwords.
            </p>
            <p className="text-gray-600 mb-4">
              <strong>Students:</strong> Instantly link your certificates stored in DigiLocker to verify and share your credentials.
            </p>
            <p className="text-gray-600 mb-4">
              <strong>Employers:</strong> Quickly validate candidate qualifications directly from DigiLocker for streamlined hiring decisions.
            </p>
            <p className="text-gray-600">
              <strong>Institutions/Admins:</strong> Manage certificate issuance and verification efficiently with DigiLocker integration, ensuring compliance and security.
            </p>
            <div className="mt-8">
              <button className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-full shadow hover:bg-indigo-700 transition">
                Login with DigiLocker
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
