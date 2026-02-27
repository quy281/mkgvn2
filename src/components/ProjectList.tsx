"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Search, MapPin, Maximize } from "lucide-react";
import { urlFor } from "@/sanity/client";

// Simplified type based on what the page passes
interface Project {
    id: string;
    title: string;
    slug: string;
    category: string;
    image: any;
    location?: string;
    area?: string;
    year?: string;
}

export default function ProjectList({ projects }: { projects: Project[] }) {
    const [filter, setFilter] = useState("Tất cả");
    const [searchTerm, setSearchTerm] = useState("");

    const categories = ["Tất cả", ...Array.from(new Set(projects.map((p) => p.category || "Nhà phố")))];

    const filtered = projects
        .filter((p) => filter === "Tất cả" || (p.category || "Nhà phố") === filter)
        .filter((p) => p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (p.location && p.location.toLowerCase().includes(searchTerm.toLowerCase())));

    return (
        <section className="py-16 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="flex gap-4 justify-between items-center mb-10 border-b border-border pb-6 flex-wrap">
                    {/* Filters */}
                    <div className="flex gap-2 flex-wrap">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                className={`px-5 py-2 rounded-full text-[13px] font-semibold tracking-wide uppercase transition-all duration-300 ${filter === cat
                                    ? "bg-[#c8a45c] text-black"
                                    : "bg-surface text-foreground/50 hover:text-[#c8a45c] hover:bg-surface-hover"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Search */}
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-surface w-full md:w-64 focus-within:ring-1 focus-within:ring-[#c8a45c] transition-all">
                        <Search size={14} className="text-[#c8a45c]" />
                        <input
                            type="text"
                            placeholder="Tìm kiếm dự án..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bg-transparent text-[13px] text-foreground outline-none w-full"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filtered.map((project) => (
                        <Link
                            key={project.slug}
                            href={`/du-an/${project.slug}`}
                            className="group block relative aspect-square rounded-xl overflow-hidden bg-surface"
                        >
                            {/* Base Image */}
                            {project.image && (
                                <Image
                                    src={project.image._type === 'image' ? urlFor(project.image).url() : project.image}
                                    alt={project.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                            )}

                            {/* Overlay Top Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

                            {/* Category Badge - Top Left */}
                            <div className="absolute top-5 left-5 z-20">
                                <span className="inline-block px-3 py-1 text-[11px] font-bold tracking-widest uppercase bg-[#c8a45c] text-black rounded-sm shadow-lg transform -translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                                    {project.category || "Nhà phố"}
                                </span>
                            </div>

                            {/* View Button - Center */}
                            <div className="absolute inset-0 z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 scale-50 group-hover:scale-100">
                                <div className="w-14 h-14 bg-[#c8a45c]/90 rounded-full flex items-center justify-center text-black hover:bg-white transition-colors">
                                    <ArrowRight size={20} className="-rotate-45" />
                                </div>
                            </div>

                            {/* Content Bottom */}
                            <div className="absolute bottom-0 left-0 right-0 p-6 z-20 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                <h3 className="text-xl font-bold text-white mb-2 leading-tight">
                                    {project.title}
                                </h3>

                                <div className="flex items-center gap-4 text-[12px] font-medium text-white/70 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                    {project.location && (
                                        <span className="flex items-center gap-1.5">
                                            <MapPin size={12} className="text-[#c8a45c]" />
                                            {project.location}
                                        </span>
                                    )}
                                    {project.area && (
                                        <span className="flex items-center gap-1.5">
                                            <Maximize size={12} className="text-[#c8a45c]" />
                                            {project.area}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </Link>
                    ))}
                    {filtered.length === 0 && (
                        <div className="col-span-full py-20 text-center">
                            <p className="text-white/40 text-sm">Không tìm thấy dự án nào hợp lệ.</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
