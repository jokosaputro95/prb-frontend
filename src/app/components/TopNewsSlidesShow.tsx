// src/app/components/TopNewsSlideshow.tsx
'use client';
import React, { useState } from "react";

interface NewsType {
    title: string;
    category: string;
    img: string;
    desc: string;
    time: string;
}

interface Props {
    newsList: NewsType[];
}

export default function TopNewsSlidesShow({ newsList }: Props) {
    const slides = newsList.slice(0, 5);
    const [current, setCurrent] = useState(0);

    const goPrev = () => setCurrent(current === 0 ? slides.length - 1 : current - 1);
    const goNext = () => setCurrent(current === slides.length - 1 ? 0 : current + 1);

    return (
        <div className="relative w-full max-w-2xl h-[380px] md:h-[440px] mx-auto mb-10 rounded-2xl shadow-xl bg-white overflow-hidden">
            {slides.map((news, idx) => (
                <div
                    key={idx}
                    className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ${idx === current ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                >
                    <img src={news.img} alt={news.title} className="w-full h-48 md:h-64 object-cover" />
                    <div className="p-5">
                        <span className="text-xs font-semibold text-teal-600">{news.category}</span>
                        <h2 className="text-xl md:text-2xl font-bold mt-2 text-gray-800">{news.title}</h2>
                        <p className="text-xs text-gray-600 mt-2 mb-4 md:line-clamp-3">{news.desc}</p>
                        <span className="text-xs text-gray-400">{news.time}</span>
                    </div>
                </div>
            ))}
            {/* Nav Buttons */}
            <button
                onClick={goPrev}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-gray-200 hover:bg-teal-500 hover:text-white text-gray-700 rounded-full w-8 h-8 flex items-center justify-center shadow transition z-20"
                aria-label="Prev"
            >
                &#8592;
            </button>
            <button
                onClick={goNext}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-200 hover:bg-teal-500 hover:text-white text-gray-700 rounded-full w-8 h-8 flex items-center justify-center shadow transition z-20"
                aria-label="Next"
            >
                &#8594;
            </button>
            {/* Dots indicator */}
            <div className="absolute bottom-2 left-0 w-full flex justify-center gap-2 z-20">
                {slides.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrent(idx)}
                        className={`w-3 h-3 rounded-full ${idx === current ? "bg-teal-500" : "bg-gray-300"} border-2 border-white`}
                        aria-label={`Go to slide ${idx + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}
