"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Calendar, Search } from "lucide-react";
import { urlFor } from "@/sanity/client";

interface Post {
    id: string;
    title: string;
    slug: string;
    category: string;
    featuredImage: any;
    excerpt: string;
    date: string;
}

export default function BlogList({ posts }: { posts: Post[] }) {
    const [filter, setFilter] = useState("Tất cả");
    const [searchTerm, setSearchTerm] = useState("");

    // Lấy danh sách category và đếm số bài viết
    const catsMap = posts.reduce((acc, curr) => {
        const c = curr.category || "Tin tức";
        acc[c] = (acc[c] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    const categories = Object.keys(catsMap).map(k => ({ name: k, count: catsMap[k] }));

    const filtered = posts
        .filter((p) => filter === "Tất cả" || (p.category || "Tin tức") === filter)
        .filter((p) => p.title.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <section className="py-16 px-6">
            <div className="max-w-7xl mx-auto">
                {/* Controls */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
                    {/* Filter */}
                    <div className="flex flex-wrap justify-center gap-2">
                        <button
                            onClick={() => setFilter("Tất cả")}
                            className={`px-5 py-2.5 rounded-full text-[12px] font-bold tracking-widest uppercase transition-all duration-300 ${filter === "Tất cả"
                                ? "bg-[#c8a45c] text-black"
                                : "bg-white/5 border border-white/10 text-white/50 hover:text-[#c8a45c] hover:border-[#c8a45c]/50"
                                }`}
                        >
                            Tất cả
                        </button>
                        {categories.map((cat) => (
                            <button
                                key={cat.name}
                                onClick={() => setFilter(cat.name)}
                                className={`px-5 py-2.5 rounded-full text-[12px] font-bold tracking-widest uppercase transition-all duration-300 ${filter === cat.name
                                    ? "bg-[#c8a45c] text-black"
                                    : "bg-white/5 border border-white/10 text-white/50 hover:text-[#c8a45c] hover:border-[#c8a45c]/50"
                                    }`}
                            >
                                {cat.name} ({cat.count})
                            </button>
                        ))}
                    </div>

                    {/* Search */}
                    <div className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 w-full md:w-72 focus-within:border-[#c8a45c]/50 transition-colors">
                        <Search size={16} className="text-[#c8a45c]" />
                        <input
                            type="text"
                            placeholder="Tìm bài viết..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bg-transparent text-[13px] text-white outline-none w-full"
                        />
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filtered.map((post) => (
                        <Link
                            key={post.slug}
                            href={`/tin-tuc/${post.slug}`}
                            className="group flex flex-col h-full"
                        >
                            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-tr-3xl rounded-bl-3xl mb-6">
                                {post.featuredImage ? (
                                    <Image
                                        src={post.featuredImage._type === 'image' ? urlFor(post.featuredImage).url() : post.featuredImage}
                                        alt={post.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    />
                                ) : (
                                    <div className="absolute inset-0 bg-[#141414] flex items-center justify-center border border-white/5">
                                        <div className="text-[#c8a45c]/20 text-4xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>MKG</div>
                                    </div>
                                )}

                                {/* Date Badge Overlay */}
                                <div className="absolute top-4 left-4 bg-white text-black px-4 py-3 text-center rounded-sm">
                                    <div className="text-[20px] font-bold leading-none" style={{ fontFamily: "'Playfair Display', serif" }}>
                                        {post.date ? new Date(post.date).getDate() : "01"}
                                    </div>
                                    <div className="text-[10px] uppercase font-bold tracking-widest mt-1 opacity-60">
                                        TH {post.date ? new Date(post.date).getMonth() + 1 : "01"}
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col flex-1 pl-2">
                                <div className="flex items-center gap-4 text-[11px] text-white/40 mb-3 uppercase tracking-wider font-bold">
                                    <span className="text-[#c8a45c]">{post.category || "Tin tức"}</span>
                                    <span className="w-1 h-1 rounded-full bg-white/20" />
                                    <span>MKG Admin</span>
                                </div>

                                <h3
                                    className="text-xl lg:text-2xl font-bold text-white mb-3 line-clamp-2 leading-snug group-hover:text-[#c8a45c] transition-colors"
                                    style={{ fontFamily: "'Playfair Display', serif" }}
                                >
                                    {post.title}
                                </h3>

                                <p className="text-[14px] text-white/50 mb-6 line-clamp-2 leading-relaxed font-light">
                                    {post.excerpt}
                                </p>

                                <div className="mt-auto flex items-center gap-2 text-[#c8a45c] text-[11px] font-bold tracking-[0.2em] uppercase transition-all group-hover:gap-4">
                                    <span>ĐỌC THÊM</span>
                                    <ArrowRight size={14} />
                                </div>
                            </div>
                        </Link>
                    ))}
                    {filtered.length === 0 && (
                        <div className="col-span-full py-20 text-center">
                            <p className="text-white/40 text-sm">Không tìm thấy bài viết nào.</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
