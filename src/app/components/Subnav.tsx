import React from "react";

const subnavLinks = [
    "Opinion",
    "Economic",
    "Featured",
    "Global Affairs",
    "Climate Change",
    "Renewable Energy",
    "Politics",
    "Research",
];

export default function Subnav() {
    return (
        <div
            className="
        bg-red-600 text-white
        px-2 sm:px-6 py-2
        text-sm font-semibold
        flex gap-4
        overflow-x-auto
        whitespace-nowrap
        relative
      "
            style={{
                WebkitOverflowScrolling: "touch",
                scrollbarWidth: "thin", // Firefox
            }}
        >
            {/* Inline style tag for scrollbar (works in Next.js) */}
            <style>
                {`
        /* Chrome, Safari, Edge scrollbar for this element only */
        .subnav-scroll::-webkit-scrollbar {
          height: 4px;
        }
        .subnav-scroll::-webkit-scrollbar-thumb {
          background: #e5e7eb; /* neutral gray */
          border-radius: 2px;
        }
        .subnav-scroll::-webkit-scrollbar-track {
          background: #ef4444;
        }
        `}
            </style>
            <div className="flex gap-4 subnav-scroll w-full">
                {subnavLinks.map((item) => (
                    <span
                        key={item}
                        className="px-3 py-1 rounded-full cursor-pointer hover:bg-red-700 transition-all"
                    >
                        {item}
                    </span>
                ))}
            </div>
        </div>
    );
}
