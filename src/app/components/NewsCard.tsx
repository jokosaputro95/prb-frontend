import React from "react";

type News = {
    category: string;
    date: string;
    title: string;
    excerpt?: string;
    image: string;
};

export default function NewsCard({
    news,
    size = "md",
}: {
    news: News;
    size?: "md" | "lg" | "sm";
}) {
    return (
        <div
            className={
                size === "lg"
                    ? "rounded-xl shadow overflow-hidden"
                    : size === "sm"
                        ? "rounded-lg shadow overflow-hidden"
                        : "rounded-lg shadow-md overflow-hidden"
            }
        >
            <img src={news.image} alt={news.title} className="w-full object-cover h-40 sm:h-48" />
            <div className="p-4 bg-white">
                <div className="text-xs text-red-600 font-bold mb-1 uppercase">{news.category}</div>
                <div className="text-xs text-gray-500 mb-2">{news.date}</div>
                <h3 className="font-bold text-lg mb-1">{news.title}</h3>
                {news.excerpt && <p className="text-gray-700 text-sm">{news.excerpt}</p>}
            </div>
        </div>
    );
}
