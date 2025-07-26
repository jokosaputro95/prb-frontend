import React from "react";
import SectionTitle from "./SectionTitle";

const mostRead = [
    { id: 1, title: "Top 5 Countries for Adventure Travel and Thrilling Experiences" },
    { id: 2, title: "Nationalism Gains Momentum Across the World" },
    { id: 3, title: "How Global Migration is Changing Policies and Societies" },
    { id: 4, title: "The Future of Energy Hinges on Global Geopolitics" },
    { id: 5, title: "The Rise of Nationalism: A Global Trend to Watch" },
    { id: 6, title: "AI Reshaping Journalism in 2025" },
    { id: 7, title: "SpaceX Plans for Moon Tourism Announced" },
    { id: 8, title: "Youth Unemployment: A Silent Crisis in the Global Economy" },
    { id: 9, title: "Universal Basic Income: Bold Idea or Economic Risk?" },
    { id: 10, title: "Why We Need More Women in Leadership Positions" },
    // ...tambah lagi sesuai kebutuhan!
];

export default function MostReadWidget() {
    return (
        <div className="bg-white rounded-xl shadow-md p-4 mb-4 flex flex-col"
            style={{ minHeight: "480px", maxHeight: "calc(100vh - 220px)" }}>
            <SectionTitle>Most Read</SectionTitle>
            <ol className="space-y-3 overflow-y-auto pr-2 flex-1">
                {mostRead.map((item, idx) => (
                    <li key={item.id} className="flex gap-2 items-center">
                        <span className="w-6 h-6 flex items-center justify-center rounded-full bg-red-600 text-white font-bold">{idx + 1}</span>
                        <span className="text-sm">{item.title}</span>
                    </li>
                ))}
            </ol>
        </div>
    );
}
