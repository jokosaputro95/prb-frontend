"use client";
import Header from "./Header";
import Footer from "./Footer";
import SectionTitle from "./SectionTitle";
import NewsCard from "./NewsCard";
import Sidebar from "./Sidebar";

// === Dummy Data ===
const newsList = [
    {
        id: 1,
        category: "Global Affairs",
        date: "May 13, 2025",
        title: "How Migration Is Reshaping Borders and Policies",
        excerpt: "Foreign Aid Sparks Debate Over Motive and Impact.",
        image: "/images/news1.jpg",
    },
    {
        id: 2,
        category: "Global Affairs",
        date: "May 13, 2025",
        title: "Global Trade Wars: Winners, Losers, and Long-Term Effects",
        excerpt: "Winners and losers emerge as trade wars escalate.",
        image: "/images/news2.jpg",
    },
    {
        id: 3,
        category: "Global Affairs",
        date: "May 13, 2025",
        title: "Cybersecurity Becomes the New Frontline of Global Conflict",
        excerpt: "Governments prioritize cybersecurity amidst rising threats.",
        image: "/images/news3.jpg",
    },
    {
        id: 4,
        category: "World",
        date: "May 13, 2025",
        title: "War-Torn Nation Begins Reconstruction Efforts with International Aid",
        excerpt: "International support accelerates recovery in conflict zones.",
        image: "/images/news4.jpg",
    },
];

const featuredStories = [
    {
        id: 10,
        category: "Travel",
        date: "May 13, 2025",
        title: "A Budget Backpacking Guide Through Europe for Every Traveler",
        image: "/images/feat1.jpg",
    },
    {
        id: 11,
        category: "Travel",
        date: "May 13, 2025",
        title: "Best Hiking Trails for Nature Lovers and Where to Find Them",
        image: "/images/feat2.jpg",
    },
    {
        id: 12,
        category: "Travel",
        date: "May 13, 2025",
        title: "Most Instagrammable Spots Around the Globe for Your Travel Photos",
        image: "/images/feat3.jpg",
    },
    {
        id: 13,
        category: "Travel",
        date: "May 13, 2025",
        title: "Best Cities with the Best Nightlife for Party Seekers",
        image: "/images/feat4.jpg",
    },
];

const justIn = [
    {
        id: 200,
        category: "Global Security",
        date: "Aug 30, 2021",
        title: "Skirmishes Break Out on the Border Between Dravena and Kylor",
        image: "/images/justin1.jpg",
    },
    {
        id: 201,
        category: "Technology",
        date: "May 13, 2025",
        title: "Exploring Blockchain Technology Beyond Cryptocurrency",
        image: "/images/justin2.jpg",
    },
    {
        id: 202,
        category: "Technology",
        date: "May 13, 2025",
        title: "How 5G Will Transform Communication and Connectivity",
        image: "/images/justin3.jpg",
    },
    {
        id: 203,
        category: "Technology",
        date: "May 13, 2025",
        title: "The Rise of Augmented Reality in Everyday Life",
        image: "/images/justin4.jpg",
    },
];

const businessNews = [
    {
        id: 301,
        category: "Technology",
        date: "May 13, 2025",
        title: "Cybersecurity Threats and How to Protect Your Data",
        image: "/images/biz1.jpg",
    },
    {
        id: 302,
        category: "Technology",
        date: "May 13, 2025",
        title: "The Ultimate Smartphone Showdown: Best Phones Reviewed and Ranked",
        image: "/images/biz2.jpg",
    },
];

export default function Home() {
    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="w-[100vw] max-w-100vw] mx-auto">
                <Header />
            </div>

            {/* HERO + SIDEBAR - FULLY RESPONSIVE */}
            <section className="w-[90vw] max-w-[90vw] mx-auto px-2 sm:px-4 py-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* LEFT */}
                <div>
                    <NewsCard news={newsList[1]} />
                    <div className="mt-4">
                        <NewsCard news={newsList[2]} />
                    </div>
                </div>
                {/* CENTER */}
                <div>
                    <NewsCard news={newsList[0]} size="lg" />
                    <div className="grid grid-cols-2 gap-2 mt-2">
                        <NewsCard news={newsList[2]} size="sm" />
                        <NewsCard news={newsList[3]} size="sm" />
                    </div>
                </div>
                {/* SIDEBAR */}
                <div className="order-last lg:order-none w-full">
                    <Sidebar />
                </div>
            </section>

            {/* Featured Stories */}
            <section className="w-[90vw] max-w-[90vw] mx-auto px-2 sm:px-4 mb-8">
                <SectionTitle>Featured Stories</SectionTitle>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {featuredStories.map((item) => (
                        <div key={item.id} className="bg-white rounded-lg shadow">
                            <img src={item.image} alt={item.title} className="h-40 sm:h-48 w-full object-cover rounded-t-lg" />
                            <div className="p-4">
                                <div className="text-xs font-bold text-red-600">{item.category}</div>
                                <div className="text-xs text-gray-500 mb-2">{item.date}</div>
                                <h3 className="font-semibold">{item.title}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Quick Links */}
            <div className="w-[90vw] max-w-[90vw] mx-auto px-2 sm:px-4 mb-4 flex flex-wrap gap-2 text-xs sm:text-sm">
                <span className="font-bold text-black">Quick Links:</span>
                <span className="bg-gray-200 rounded-full px-3 py-1">Opinion</span>
                <span className="bg-gray-200 rounded-full px-3 py-1">Economic</span>
                <span className="bg-gray-200 rounded-full px-3 py-1">Featured</span>
                <span className="bg-gray-200 rounded-full px-3 py-1">Global Affairs</span>
                <span className="bg-gray-200 rounded-full px-3 py-1">Climate Change</span>
                <span className="bg-gray-200 rounded-full px-3 py-1">Renewable Energy</span>
                <span className="bg-gray-200 rounded-full px-3 py-1">Politics</span>
                <span className="bg-gray-200 rounded-full px-3 py-1">Research</span>
            </div>

            {/* Just In Section */}
            <section className="w-[90vw] max-w-[90vw] mx-auto px-2 sm:px-4 mb-8">
                <SectionTitle>Just In</SectionTitle>
                <div className="bg-white rounded-xl shadow p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <img src={justIn[0].image} alt={justIn[0].title} className="rounded-lg w-full h-40 sm:h-60 object-cover mb-4" />
                        <div className="text-xs text-red-600 font-bold mb-1 uppercase">{justIn[0].category}</div>
                        <div className="text-xs text-gray-500 mb-2">{justIn[0].date}</div>
                        <h3 className="font-bold text-xl sm:text-2xl">{justIn[0].title}</h3>
                    </div>
                    <div className="flex flex-col gap-4">
                        {justIn.slice(1).map((item) => (
                            <div key={item.id} className="relative">
                                <img src={item.image} alt={item.title} className="rounded-lg w-full h-20 sm:h-24 object-cover mb-2" />
                                <div className="absolute bottom-2 left-2 bg-black bg-opacity-60 text-white px-2 py-1 text-xs rounded">
                                    {item.category}
                                </div>
                                <h4 className="font-semibold text-base">{item.title}</h4>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Business Section */}
            <section className="w-[90vw] max-w-[90vw] mx-auto px-2 sm:px-4 mb-8">
                <SectionTitle>Business</SectionTitle>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {businessNews.map((item) => (
                        <NewsCard key={item.id} news={item} />
                    ))}
                </div>
            </section>

            {/* Footer */}
            <div className="w-[100vw] max-w-[100vw] mx-auto">
                <Footer />
            </div>
        </div>
    );
}