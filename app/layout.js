// layout.js
"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { useState, Suspense } from 'react';
import Link from 'next/link';

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Suspense fallback={<div>Loading...</div>}>
          <LayoutContent>
            {children}
          </LayoutContent>
        </Suspense>
      </body>
    </html>
  );
}

function LayoutContent({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <>
      <nav className="bg-black px-6 lg:px-14 py-2 ml-5 mr-5 lg:mr-[55px] lg:ml-[80px] mt-4 rounded-full">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-white font-bold text-lg">
            <Link href="https://simdia.framer.website">
              <img src="/logo.png" alt="Logo" className="h-12 rounded-full" />
            </Link>
          </div>
          <div className="hidden lg:flex space-x-6">
            {/* Navigation Links */}
            <Link href="https://simdia.framer.website" className="text-slate-200 font-normal text-sm hover:text-[#FF6F00]">Home</Link>
            {/* ... other links */}
            <Link href="/vessel-tracking" className="text-[#FF6F00] text-sm font-bold">Vessel Tracking</Link>
          </div>
          <div className="lg:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white">
              <div className="space-y-2">
                <span className="block w-6 h-0.5 bg-slate-400"></span>
                <span className="block w-6 h-0.5 bg-slate-400"></span>
              </div>
            </button>
          </div>
        </div>
        {isOpen && (
          <div
            className={`lg:hidden absolute top-0 left-0 right-0 bg-black bg-opacity-90 z-50 p-4 border rounded-3xl my-4 mx-4 transition-all duration-500 ease-in-out transform ${
              isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'
            }`}
          >
            <button onClick={() => setIsOpen(false)} className="text-slate-400 text-xl absolute top-4 right-4 hover:text-[#FF6F00]">
              ✕
            </button>
            <div className="flex flex-col items-start p-4 space-y-4 mt-8 gap-y-1">
              <Link href="https://simdia.framer.website" className="text-slate-200 font-normal text-sm hover:text-[#FF6F00] py-2" onClick={handleLinkClick}>Home</Link>
              {/* ... other links */}
              <Link href="/vessel-tracking" className="text-[#FF6F00] text-sm font-bold py-2" onClick={handleLinkClick}>Vessel Tracking</Link>
            </div>
          </div>
        )}
      </nav>
      {children}
    </>
  );
}
