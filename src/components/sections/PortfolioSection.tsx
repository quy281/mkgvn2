"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { urlFor } from "@/sanity/client";

interface Project {
    _id: string;
    title: string;
    slug: string;
    category: string;
    mainImage: any;
}

interface PortfolioSectionProps {
    projects: Project[];
}

export default function PortfolioSection({ projects }: PortfolioSectionProps) {
    if (!projects || projects.length === 0) return null;

    return (
        <section className="bg-black">
            {/* Grid Container */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full">
                {projects.slice(0, 4).map((project, index) => (
                    <Link
                        key={project._id || index}
                        href={`/du-an/${project.slug}`}
                        className="group relative h-[500px] lg:h-[650px] overflow-hidden block border-r border-white/5 last:border-0"
                    >
                        {/* Shimmer / Scan Effect on hover */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] z-20 pointer-events-none" />

                        {/* Background Image */}
                        <Image
                            src={project.mainImage ? (typeof project.mainImage === 'string' ? project.mainImage : urlFor(project.mainImage).url()) : "/images/placeholder.jpg"}
                            alt={project.title}
                            fill
                            className="object-cover transition-transform duration-1000 group-hover:scale-110"
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        />

                        {/* Overlays */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-70 group-hover:opacity-85 transition-opacity duration-500 z-10" />

                        {/* Top Left Number */}
                        <div className="absolute top-8 left-8 z-20 text-[10px] font-bold text-white/20 tracking-widest uppercase">
                            0{index + 1} /
                        </div>

                        {/* Content Box */}
                        <div className="absolute bottom-0 left-0 right-0 p-10 z-20">
                            {/* Category */}
                            <div className="flex items-center gap-3 mb-4 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                                <span className="text-[#c8a45c] text-[10px] font-bold tracking-[0.3em] uppercase">
                                    {project.category || "Dự án"}
                                </span>
                                <div className="w-8 h-px bg-[#c8a45c]/50" />
                            </div>

                            {/* Title */}
                            <h3
                                className="text-2xl lg:text-3xl font-bold text-white uppercase leading-tight mb-6 transform -translate-y-2 group-hover:translate-y-0 transition-transform duration-500"
                                style={{ fontFamily: "'Playfair Display', serif" }}
                            >
                                {project.title}
                            </h3>

                            {/* View Detail Link */}
                            <div className="flex items-center gap-3 text-white/60 text-[11px] font-bold tracking-[0.3em] uppercase opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                                <span className="border-b border-white/20 group-hover:border-[#c8a45c] transition-colors">CHI TIẾT</span>
                                <ArrowRight size={14} className="text-[#c8a45c] group-hover:translate-x-2 transition-transform" />
                            </div>
                        </div>

                        {/* Decorative Corner Element */}
                        <div className="absolute top-0 right-0 w-0 h-0 border-t-[60px] border-r-[60px] border-t-transparent border-r-white/5 group-hover:border-r-[#c8a45c]/10 transition-colors duration-500" />
                    </Link>
                ))}
            </div>
        </section>
    );
}

