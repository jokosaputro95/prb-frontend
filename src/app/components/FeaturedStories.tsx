import React from "react";
import SectionTitle from "./SectionTitle";
const featuredStories = [
    {
        image: "/images/feat1.jpg",
        category: "Travel",
        date: "May 13, 2025",
        title: "A Budget Backpacking Guide Through Europe for Every Traveler"
    },
    {
        image: "/images/feat2.jpg",
        category: "Travel",
        date: "May 13, 2025",
        title: "Best Hiking Trails for Nature Lovers and Where to Find Them"
    },
    {
        image: "/images/feat3.jpg",
        category: "Travel",
        date: "May 13, 2025",
        title: "Most Instagrammable Spots Around the Globe for Your Travel Photos"
    },
    {
        image: "/images/feat4.jpg",
        category: "Travel",
        date: "May 13, 2025",
        title: "Best Cities with the Best Nightlife for Party Seekers"
    },
];
export default function FeaturedStories() {
    return (
        <section className="my-12">
            <SectionTitle>Featured Stories</SectionTitle>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
                {featuredStories.map((item, idx) => (
                    <div key={idx} className="bg-white rounded-md overflow-hidden shadow">
                        <img src={item.image} alt={item.title} className="w-full h-40 object-cover" />
                        <div className="p-4">
                            <div className="text-xs font-bold uppercase text-red-600 mb-1">{item.category}</div>
                            <div className="text-gray-500 text-xs mb-1">{item.date}</div>
                            <div className="font-semibold">{item.title}</div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
