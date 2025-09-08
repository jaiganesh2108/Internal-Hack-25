"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50); // when scrolled more than 50px
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full flex justify-between items-center px-8 py-4 transition-all duration-300 z-50 ${
        isScrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="flex items-center space-x-2">
        <span className="text-2xl font-bold text-indigo-600">VerifyCert</span>
      </div>
      <nav className="flex gap-4">
        <Link
          href="/"
          className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition"
        >
          University login
        </Link>
        <Link
          href="/"
          className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition"
        >
          Employer/Student login
        </Link>
        <Link
          href="/"
          className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition"
        >
          Admin login
        </Link>
      </nav>
    </header>
  );
}
