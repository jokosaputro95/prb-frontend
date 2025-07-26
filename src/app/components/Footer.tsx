import React from "react";

export default function Footer() {
    return (
        <footer className="bg-gradient-to-b from-blue-900 to-black text-white pt-10 pb-4 mt-12">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
                    {/* Kiri: Logo, deskripsi, newsletter */}
                    <div className="lg:w-1/2 flex flex-col">
                        <img src="/logo.svg" alt="Foxiz Logo" className="h-10 mb-4" />
                        <div className="h-2 w-full border-t border-b border-white border-dashed mb-6" />
                        <p className="font-bold mb-2 text-xl">Information You Can Trust:</p>
                        <p className="mb-6 text-lg leading-relaxed">
                            Stay instantly connected with breaking stories and live updates. From politics and technology to entertainment and beyond, we provide real-time coverage you can rely on, making us your dependable source for 24/7 news.
                        </p>
                        <form className="mb-6">
                            <input
                                className="w-full bg-transparent border border-blue-200 rounded-md px-4 py-4 text-lg text-white placeholder-gray-300 mb-4 focus:outline-none"
                                type="email"
                                placeholder="Your email address"
                            />
                            <button
                                type="submit"
                                className="bg-red-600 hover:bg-red-700 text-white rounded-md px-8 py-3 font-semibold text-lg transition w-full sm:w-auto"
                            >
                                Subscribe
                            </button>
                        </form>
                        {/* Social (mobile only) */}
                        <div className="flex gap-2 mb-6 lg:hidden">
                            <SocialIcons />
                        </div>
                    </div>
                    {/* Divider vertikal */}
                    <div className="hidden lg:flex flex-col items-center justify-center px-2">
                        <div className="h-60 w-px bg-gradient-to-b from-blue-300/60 to-blue-900/10 rounded-full" />
                    </div>
                    {/* Kanan: Quick Links & About */}
                    <div className="flex-1 flex flex-col gap-8">
                        <div className="flex flex-col md:flex-row gap-8">
                            {/* QUICK LINKS */}
                            <div className="flex-1">
                                <div className="flex items-center mb-2 gap-2">
                                    <span className="text-blue-300">
                                        <svg width={20} height={20} fill="none"><circle cx={10} cy={10} r={8} fill="#3B82F6" /><path d="M8.8 7.2l2.6 2.6-2.6 2.6" stroke="#fff" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" /></svg>
                                    </span>
                                    <span className="font-semibold text-lg tracking-wide text-gray-200">Quick Links</span>
                                </div>
                                <ul className="flex flex-wrap gap-x-6 gap-y-1">
                                    {[
                                        "Read History",
                                        "Economy",
                                        "Travel",
                                        "Global Security",
                                        "Global Affairs",
                                        "World",
                                        "Technology",
                                    ].map((link, idx) => (
                                        <li key={link}>
                                            <a
                                                href="#"
                                                className="inline-block text-white text-lg font-semibold hover:underline hover:underline-offset-4 transition-all duration-200"
                                            >
                                                {link}
                                            </a>
                                            {idx < 6 && <span className="mx-1 text-blue-200">|</span>}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            {/* ABOUT COMPANY */}
                            <div className="flex-1">
                                <div className="flex items-center mb-2 gap-2">
                                    <span className="text-blue-300">
                                        <svg width={18} height={18} fill="none"><rect width={12} height={12} x={3} y={3} rx={3} fill="#38bdf8" /><path d="M6 9h6M9 6v6" stroke="#fff" strokeWidth={1.5} strokeLinecap="round" /></svg>
                                    </span>
                                    <span className="font-semibold text-lg tracking-wide text-gray-200">About Company</span>
                                </div>
                                <ul className="flex flex-wrap gap-x-6 gap-y-1">
                                    {[
                                        "Contact Us",
                                        "Advertise with US",
                                        "Privacy Policy",
                                        "Submit a Tip",
                                    ].map((link, idx) => (
                                        <li key={link}>
                                            <a
                                                href="#"
                                                className="inline-block text-white text-lg font-semibold hover:underline hover:underline-offset-4 transition-all duration-200"
                                            >
                                                {link}
                                            </a>
                                            {idx < 3 && <span className="mx-1 text-blue-200">|</span>}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        {/* Social (desktop only) */}
                        <div className="hidden lg:flex justify-end gap-3">
                            <SocialIcons />
                        </div>
                    </div>
                </div>
                <div className="h-2 w-full border-t border-b border-white border-dashed my-7" />
                <div className="text-center text-gray-200 text-base font-medium pb-2">
                    © Foxiz News Network. Ruby Design Company. All Rights Reserved.
                </div>
            </div>
        </footer>
    );
}

// Social icons component
function SocialIcons() {
    return (
        <>
            <a href="#" className="inline-block hover:scale-110 transition">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow">
                    <svg width={28} height={28} fill="none"><circle cx={14} cy={14} r={14} fill="#ef4444" /><path d="M10.5 10l7 4-7 4V10z" fill="#fff" /></svg>
                </div>
            </a>
            <a href="#" className="inline-block hover:scale-110 transition">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow">
                    <span className="text-blue-800 font-bold text-xl">G</span>
                </div>
            </a>
            <a href="#" className="inline-block hover:scale-110 transition">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow">
                    <span className="text-gray-900 font-bold text-xl">M</span>
                </div>
            </a>
            <a href="#" className="inline-block hover:scale-110 transition">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow">
                    <span className="text-fuchsia-700 font-bold text-xl">F</span>
                </div>
            </a>
            <a href="#" className="inline-block hover:scale-110 transition">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow">
                    <svg width={26} height={26} fill="none"><rect width={18} height={18} x={4} y={4} rx={6} fill="#22c55e" /><path d="M8 13h10M13 8v10" stroke="#fff" strokeWidth={1.5} strokeLinecap="round" /></svg>
                </div>
            </a>
        </>
    );
}
