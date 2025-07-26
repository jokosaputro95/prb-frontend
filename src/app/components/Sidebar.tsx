import React from "react";
import MostReadWidget from "./MostReadWidget";

export default function Sidebar() {
    return (
        <aside className="space-y-6">
            <MostReadWidget />
            {/* Promo / Ads */}
            <div className="bg-purple-100 rounded-xl p-4 text-center">
            </div>
        </aside>
    );
}
