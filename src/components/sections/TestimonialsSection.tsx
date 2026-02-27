"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { urlFor } from "@/sanity/client";

interface Testimonial {
    _id: string;
    name: string;
    role: string;
    quote: string;
    avatar: any;
    rating: number;
}

interface TestimonialsSectionProps {
    testimonials: Testimonial[];
}

export default function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1 >= (testimonials?.length || 0) ? 0 : prev + 1));
    };

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 < 0 ? Math.max((testimonials?.length || 0) - 1, 0) : prev - 1));
    };

    if (!testimonials || testimonials.length === 0) return null;

    return (
        <section className="py-24 lg:py-32 bg-[#141414] relative overflow-hidden">
            {/* Background Quote Mark */}
            <div className="absolute top-20 left-10 text-white/5 z-0 pointer-events-none">
                <Quote size={300} strokeWidth={0.5} />
            </div>

            <div className="section-container relative z-10">
                <div className="flex flex-col items-center text-center pb-16">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-8 h-px bg-[#c8a45c]" />
                        <span className="text-[#c8a45c] text-[12px] font-bold tracking-[0.2em] uppercase">ĐÁNH GIÁ TỪ KHÁCH HÀNG</span>
                        <div className="w-8 h-px bg-[#c8a45c]" />
                    </div>

                    <h2
                        className="text-4xl md:text-5xl font-bold text-white leading-[1.15] max-w-2xl"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                        MỌI NGƯỜI <span className="italic font-light text-[#c8a45c]">NÓI GÌ</span> VỀ CHÚNG TÔI
                    </h2>
                </div>

                <div className="max-w-4xl mx-auto relative">

                    <div className="overflow-hidden">
                        <div
                            className="flex transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
                            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                        >
                            {testimonials.map((item, idx) => (
                                <div key={item._id || idx} className="w-full flex-shrink-0 px-4">
                                    <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center bg-[#0a0a0a] p-8 md:p-12 border border-white/5 relative">

                                        {/* Corner accents */}
                                        <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-[#c8a45c]/30" />
                                        <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-[#c8a45c]/30" />

                                        {/* Avatar */}
                                        <div className="relative w-32 h-32 md:w-48 md:h-48 flex-shrink-0 rounded-full overflow-hidden border-2 border-[#c8a45c]/20">
                                            <Image
                                                src={item.avatar ? (typeof item.avatar === 'string' ? item.avatar : urlFor(item.avatar).url()) : "/images/about/about-company.png"}
                                                alt={item.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 text-center md:text-left">
                                            <div className="flex justify-center md:justify-start gap-1 mb-6 text-[#c8a45c]">
                                                {[...Array(5)].map((_, i) => (
                                                    <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill={i < item.rating ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
                                                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                                    </svg>
                                                ))}
                                            </div>

                                            <p className="text-white/80 text-[16px] md:text-[20px] leading-relaxed font-light italic mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>
                                                "{item.quote}"
                                            </p>

                                            <div>
                                                <h4 className="text-white font-bold tracking-widest uppercase text-[15px] mb-1">{item.name}</h4>
                                                <p className="text-[#c8a45c] text-[12px]">{item.role}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Controls */}
                    <div className="flex justify-center gap-4 mt-12">
                        <button
                            onClick={handlePrev}
                            className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:bg-[#c8a45c] hover:border-[#c8a45c] hover:text-black transition-all duration-300"
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <button
                            onClick={handleNext}
                            className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:bg-[#c8a45c] hover:border-[#c8a45c] hover:text-black transition-all duration-300"
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>

                </div>
            </div>
        </section>
    );
}
