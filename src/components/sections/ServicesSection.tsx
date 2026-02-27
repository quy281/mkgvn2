"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, PenTool, LayoutTemplate, Box, Settings } from "lucide-react";
import { urlFor } from "@/sanity/client";

interface Service {
    _id: string;
    title: string;
    slug: string;
    shortDesc: string;
    image: any;
    icon?: string;
}

interface ServicesSectionProps {
    services: Service[];
}

export default function ServicesSection({ services }: ServicesSectionProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    // Icon mapping helper since we store string in DB
    const getIcon = (name: string) => {
        switch (name?.toLowerCase()) {
            case 'design': return <PenTool size={32} strokeWidth={1.5} />;
            case 'construction': return <Box size={32} strokeWidth={1.5} />;
            case 'cnc': return <Settings size={32} strokeWidth={1.5} />;
            default: return <LayoutTemplate size={32} strokeWidth={1.5} />;
        }
    };

    const visibleCards = 3; // On desktop

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1 >= (services?.length || 0) ? 0 : prev + 1));
    };

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 < 0 ? Math.max((services?.length || 0) - 1, 0) : prev - 1));
    };

    if (!services || services.length === 0) return null;

    return (
        <section className="py-24 lg:py-32 bg-[#0e0e0e] relative overflow-hidden">
            {/* Decorative dark pattern */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: "url(/images/decorative/blueprint.png)", backgroundSize: "400px" }} />

            <div className="section-container relative z-10 flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
                <div>
                    <div className="flex items-center gap-3 mb-4">
                        <span className="text-[#c8a45c] text-[12px] font-bold tracking-[0.2em] uppercase">DỊCH VỤ CỦA CHÚNG TÔI</span>
                        <div className="w-12 h-px bg-[#c8a45c]/50" />
                    </div>
                    <h2
                        className="text-4xl md:text-5xl font-bold text-white leading-[1.15]"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                        GIẢI PHÁP <span className="italic font-light text-[#c8a45c]">NỘI THẤT</span> <br />
                        TOÀN DIỆN
                    </h2>
                </div>

                {/* Navigation Buttons */}
                <div className="flex gap-3">
                    <button
                        onClick={handlePrev}
                        className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:bg-[#c8a45c] hover:border-[#c8a45c] hover:text-black transition-all duration-300"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <button
                        onClick={handleNext}
                        className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:bg-[#c8a45c] hover:border-[#c8a45c] hover:text-black transition-all duration-300"
                    >
                        <ChevronRight size={20} />
                    </button>
                </div>
            </div>

            <div className="section-container relative z-10">
                <div className="overflow-hidden" ref={containerRef}>
                    <div
                        className="flex transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
                        style={{
                            transform: `translateX(calc(-${currentIndex * (100 / visibleCards)}% - ${currentIndex * 24}px))`
                        }}
                    >
                        {services.map((service, idx) => (
                            <div
                                key={service._id || idx}
                                className="w-full md:w-[calc(100%/2-12px)] lg:w-[calc(100%/3-16px)] flex-shrink-0 mr-6 last:mr-0 group"
                            >
                                <div className="relative h-[480px] bg-[#141414] overflow-hidden rounded-lg">

                                    {/* Background Image (faded) */}
                                    <div className="absolute inset-0 z-0">
                                        <Image
                                            src={service.image ? (typeof service.image === 'string' ? service.image : urlFor(service.image).url()) : "/images/services/service-construction.jpg"}
                                            alt={service.title}
                                            fill
                                            className="object-cover opacity-30 transition-transform duration-1000 group-hover:scale-110 group-hover:opacity-40"
                                            sizes="(max-width: 768px) 100vw, 33vw"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-[#0e0e0e]/80 to-transparent" />
                                    </div>

                                    {/* Content */}
                                    <div className="relative z-10 h-full p-8 lg:p-10 flex flex-col pt-16">
                                        {/* Floating Number indicator */}
                                        <div
                                            className="absolute top-8 right-8 text-5xl font-bold text-white/10 transition-colors duration-500 group-hover:text-[#c8a45c]/20"
                                            style={{ fontFamily: "'Playfair Display', serif" }}
                                        >
                                            {String(idx + 1).padStart(2, '0')}
                                        </div>

                                        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-[#c8a45c] mb-8 border border-white/10 group-hover:bg-[#c8a45c] group-hover:text-black group-hover:border-transparent transition-all duration-500">
                                            {getIcon(service.icon || "")}
                                        </div>

                                        <h3
                                            className="text-2xl font-bold text-white mb-4 uppercase tracking-wide group-hover:text-[#c8a45c] transition-colors"
                                            style={{ fontFamily: "'Playfair Display', serif" }}
                                        >
                                            {service.title}
                                        </h3>

                                        <p className="text-white/50 text-[14px] leading-relaxed mb-auto opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">
                                            {service.shortDesc}
                                        </p>

                                        <Link
                                            href={`/gioi-thieu/#${service.slug}`}
                                            className="inline-flex items-center gap-3 text-[11px] font-bold tracking-[0.2em] uppercase text-white/40 group-hover:text-white transition-colors mt-8"
                                        >
                                            <span className="group-hover:text-[#c8a45c]">ĐỌC THÊM</span>
                                            <div className="w-8 h-[1px] bg-white/40 group-hover:bg-[#c8a45c] transition-colors" />
                                        </Link>
                                    </div>

                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
