"use client";
import React, { useState } from "react";
import Subnav from "./Subnav";

const navLinks = [
  { label: "Home", href: "#" },
  { label: "Trending", href: "#" },
  { label: "Live Streaming", href: "#" },
  { label: "Polling", href: "#" },
  { label: "Video", href: "#" },
  { label: "Cerita", href: "#" },
  { label: "Opini", href: "#" },
];

export default function Header() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-blue-900 text-white">
      {/* Topbar */}
      <div className="flex items-center justify-between px-3 sm:px-6 py-2">
        <div className="flex items-center gap-2">
          <img
            src="/logo.svg"
            alt="Pantau Rakyat Bersama Logo"
            className="h-9 w-auto"
          />
        </div>
        {/* Desktop Menu */}
        <nav className="hidden lg:flex gap-3 text-lg font-semibold">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:underline px-2 py-1 rounded transition-all"
            >
              {link.label}
            </a>
          ))}
        </nav>
        {/* Desktop Right */}
        <div className="hidden lg:flex items-center gap-2">
          <button
            onClick={() => setSearchOpen(true)}
            className="hover:bg-blue-800 p-2 rounded-full"
            aria-label="Search"
          >
            <svg
              width="22"
              height="22"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <circle cx="10" cy="10" r="7" />
              <path d="m15 15 4 4" />
            </svg>
          </button>
          <button
            className="hover:bg-blue-800 p-2 rounded-full"
            aria-label="Darkmode"
          >
            <svg
              width="22"
              height="22"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <circle cx="11" cy="11" r="9" />
            </svg>
          </button>
        </div>
        {/* Hamburger */}
        <button
          className="lg:hidden p-2 rounded-md hover:bg-blue-800"
          onClick={() => setMobileMenu(true)}
          aria-label="Open menu"
        >
          <svg
            width="28"
            height="28"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
          >
            <line x1="6" x2="22" y1="9" y2="9" />
            <line x1="6" x2="22" y1="15" y2="15" />
            <line x1="6" x2="22" y1="21" y2="21" />
          </svg>
        </button>
      </div>

      {/* --- SUBNAV Selalu Muncul & Scrollable di Mobile --- */}
      <Subnav />

      {/* === MOBILE DRAWER === */}
      {(mobileMenu || searchOpen) && (
        <div
          className="fixed inset-0 bg-black/40 z-[99]"
          onClick={() => {
            setMobileMenu(false);
            setSearchOpen(false);
          }}
        />
      )}
      {/* Mobile Menu Drawer */}
      <div
        className={`fixed inset-0 z-[100] bg-blue-900 text-white transition-all duration-200 ease-in-out ${
          mobileMenu ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ pointerEvents: mobileMenu ? "auto" : "none" }}
      >
        <div className="flex justify-between items-center p-4 border-b border-blue-800">
          <img src="/logo.svg" alt="Foxiz Logo" className="h-9" />
          <button
            onClick={() => setMobileMenu(false)}
            className="p-2"
            aria-label="Close menu"
          >
            <svg
              width="32"
              height="32"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <line x1="8" y1="8" x2="24" y2="24" />
              <line x1="24" y1="8" x2="8" y2="24" />
            </svg>
          </button>
        </div>
        <nav className="flex flex-col px-4 py-3 gap-3 text-xl font-semibold">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="py-2 border-b border-blue-800"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="flex gap-4 p-4">
          <button className="flex-1 bg-yellow-400 text-black py-2 rounded font-bold">
            Newsletter
          </button>
          <button
            className="bg-blue-800 p-2 rounded-full"
            aria-label="Search"
            onClick={() => {
              setSearchOpen(true);
              setMobileMenu(false);
            }}
          >
            <svg
              width="22"
              height="22"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <circle cx="10" cy="10" r="7" />
              <path d="m15 15 4 4" />
            </svg>
          </button>
        </div>
      </div>
      {/* Search Drawer */}
      <div
        className={`fixed inset-0 z-[100] bg-blue-900 text-white flex flex-col transition-all duration-200 ${
          searchOpen ? "translate-y-0" : "-translate-y-full"
        }`}
        style={{ pointerEvents: searchOpen ? "auto" : "none" }}
      >
        <div className="flex justify-between items-center p-4 border-b border-blue-800">
          <img src="/logo.svg" alt="Foxiz Logo" className="h-9" />
          <button
            onClick={() => setSearchOpen(false)}
            className="p-2"
            aria-label="Close search"
          >
            <svg
              width="32"
              height="32"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <line x1="8" y1="8" x2="24" y2="24" />
              <line x1="24" y1="8" x2="8" y2="24" />
            </svg>
          </button>
        </div>
        <form className="flex items-center px-4 py-6">
          <input
            type="text"
            placeholder="Search Headlines, News..."
            className="flex-1 px-4 py-3 text-lg rounded-l bg-white text-blue-900 outline-none"
            autoFocus
          />
          <button
            className="bg-yellow-400 text-black px-4 py-3 rounded-r font-bold"
            type="submit"
          >
            Search
          </button>
        </form>
      </div>
    </header>
  );
}
