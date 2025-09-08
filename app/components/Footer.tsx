"use client";
import Link from "next/link";
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaPhone } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="w-full bg-black/70 text-gray-200 py-12 border-t border-gray-700 relative">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
        
        {/* Brand & About */}
        <div>
          <h2 className="text-2xl font-bold text-indigo-400">VerifyCert</h2>
          <p className="text-sm mt-3 text-gray-300">
            Blockchain-powered certificate verification platform ensuring trust,
            transparency, and authenticity. Empowering organizations and individuals with verified credentials.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide mb-3 text-gray-200">Quick Links</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li>
              <Link href="/" className="hover:text-indigo-400 transition">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-indigo-400 transition">
                About
              </Link>
            </li>
            <li>
              <Link href="/verify" className="hover:text-indigo-400 transition">
                Verify Certificate
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-indigo-400 transition">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide mb-3 text-gray-200">Contact</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li className="flex items-center gap-2">
              <FaEnvelope className="text-indigo-400" /> support@verifycert.com
            </li>
            <li className="flex items-center gap-2">
              <FaPhone className="text-indigo-400" /> +91 9876543210
            </li>
            <li className="flex items-center gap-2">
              <span className="text-gray-400">123 Blockchain St, Tech City, India</span>
            </li>
          </ul>
        </div>

        {/* Social Media & Newsletter */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide mb-3 text-gray-200">Connect & Subscribe</h3>
          
          <div className="flex space-x-4 mb-4 text-xl">
            <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400 transition">
              <FaGithub />
            </a>
            <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400 transition">
              <FaLinkedin />
            </a>
            <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400 transition">
              <FaTwitter />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-12 border-t border-gray-700 pt-6 text-center text-xs text-gray-400">
        &copy; {new Date().getFullYear()} VerifyCert. All rights reserved. Built with blockchain & ❤️.
      </div>
    </footer>
  );
}
