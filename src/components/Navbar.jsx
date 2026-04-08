"use client";

import React from "react";
import { FaInstagram, FaEnvelope } from "react-icons/fa";

export default function Navbar() {
  const [showToast, setShowToast] = React.useState(false);
  const email = "kate.richardson410@gmail.com";

  const copyEmail = async () => {
  try {
    await navigator.clipboard.writeText(email);

    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
    }, 2000);
  } catch (err) {
    console.error("Failed to copy email:", err);
  }
};

  return (
   <header className="w-full h-16 fixed top-0 left-0 z-50 backdrop-blur-md bg-white/10">
      <nav className="h-full flex items-center justify-between px-4 relative">
        
        {/* Left spacer (keeps logo centered) */}
        <div className="w-10" />

        {/* Logo (centered) */}
        <div className="absolute left-1/2 -translate-x-1/2">
          <a href="/">
            <img
              src="/KIK_logo.svg"
              alt="Keep It Katelin Photography Logo"
              className="h-16 w-auto object-contain"
            />
          </a>
        </div>

        {/* RIGHT ICON GROUP */}
        <div className="flex items-center gap-2">
          <button
            onClick={copyEmail}
            className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition transform hover:scale-110 cursor-pointer"
            aria-label="Copy email"
          >
            <FaEnvelope className="w-5 h-5 text-black" />
          </button>

          <a
            href="https://instagram.com/keepitkatelin"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition transform hover:scale-110"
          >
            <FaInstagram className="w-5 h-5 text-black" />
          </a>
        </div>
      </nav>
      {showToast && (
  <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-black text-white text-sm px-4 py-2 rounded-full shadow-lg animate-fade-in">
    Katelin’s email copied ✓
  </div>
)}
    </header>
  );
}