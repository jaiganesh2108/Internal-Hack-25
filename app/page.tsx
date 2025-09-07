import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex flex-col items-center justify-between">
      {/* Header */}
      <header className="w-full flex justify-between items-center px-8 py-6 bg-white shadow-sm">
        <div className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-indigo-600">VerifyCert</span>
        </div>
        <nav className="flex gap-4">
          <Link
            href="/"
            className="text-sm font-medium text-gray-700 hover:text-indigo-600"
            >
            Login
          </Link>

          <Link href="/"
            className="text-sm font-medium text-gray-700 hover:text-indigo-600">Sign Up
          </Link>
          <Link
            href="/"
            className="text-sm font-medium text-gray-700 hover:text-indigo-600"
            >
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="w-full min-h-screen bg-grid flex flex-col md:flex-row items-center justify-center px-6">
        {/* Left Side (Image) */}
        <div className="flex-1 mt-10 md:mt-0 flex justify-center">
          <img 
            src="/hero-certificates.png" 
            alt="Certificate verification illustration" 
            className="w-full max-w-sm md:max-w-md"
          />
        </div>

        {/* Right Side (Text) */}
        <div className="flex-1 text-center md:text-left md:pl-12">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-3 text-gray-900">
            Verify certificates instantly, <span className="text-indigo-600"> Prevent Fraud. Build Trust.</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mt-4 mb-8">
              Trusted by universities, employers, and institutions, our platform provides a secure, blockchain-backed verification system to protect credentials from fraud. 
              Instantly confirm the legitimacy of academic and professional certificates with a simple scan or click. 
              Designed for students, universities, and recruiters, it ensures trust, saves time, and safeguards the integrity of qualifications worldwide.
          </p>
          <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4">
            <Link href="/"
              className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-full shadow hover:bg-indigo-700 transition">
              For Students
            </Link>
            <Link href="/"
              className="px-6 py-3 bg-gray-100 text-indigo-700 font-semibold rounded-full shadow hover:bg-indigo-200 transition">
              For Universities
            </Link>
            <Link href="/"
              className="px-6 py-3 bg-gray-100 text-indigo-700 font-semibold rounded-full shadow hover:bg-indigo-200 transition">
              For Employers
            </Link>
          </div>
          <div className="mt-6">
            <span className="text-gray-400 text-xs">Institutions/Admin?</span>
            <Link href="/login"
              className="ml-2 text-indigo-600 underline font-medium text-xs">
              Login / Sign up
            </Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="w-full bg-white py-12">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-5">
            <div className="bg-indigo-50 p-6 rounded-xl shadow">
              <h3 className="font-bold text-lg mb-3 text-indigo-700">1. Simple Upload</h3>
              <p className="text-gray-600 text-sm">Users or institutions upload/submit certificate codes or scan QR codes.</p>
            </div>
            <div className="bg-indigo-50 p-6 rounded-xl shadow">
              <h3 className="font-bold text-lg mb-3 text-indigo-700">2. Instant Validation</h3>
              <p className="text-gray-600 text-sm">Our system checks the authenticity from secure, university-verified databases in real-time.</p>
            </div>
            <div className="bg-indigo-50 p-6 rounded-xl shadow">
              <h3 className="font-bold text-lg mb-3 text-indigo-700">3. Results & Actions</h3>
              <p className="text-gray-600 text-sm">See instant results: verified, expired, or invalid.
              Institutions & admins manage uploads, analytics, and users with dedicated dashboards.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-gray-50 py-6 text-center text-gray-400 text-xs border-t mt-12">
        &copy; 2025 VerifyCert. Powered by NextAdmin theme. All rights reserved.
      </footer>
    </main>
  );
}
