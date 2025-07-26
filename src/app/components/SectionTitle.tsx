import React from "react";

export default function SectionTitle({ children }: { children: React.ReactNode }) {
    return (
        <h2 className="text-xl md:text-2xl font-bold mb-4 flex items-center gap-2">
            {children}
            <span className="text-red-600 text-2xl">//</span>
        </h2>
    );
}
