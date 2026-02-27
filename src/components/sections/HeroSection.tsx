"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ArrowRight, Facebook, Youtube, Instagram } from "lucide-react";
import { urlFor } from "@/sanity/client";

interface HeroSectionProps {
    slides: any[];
    slogan: string;
}

export default function HeroSection({ slides, slogan }: HeroSectionProps) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const timer = setInterval(() => {
            setCurrentSlide((p) => (p + 1) % (slides?.length || 1));
        }, 6000);
        return () => clearInterval(timer);
    }, [slides]);

    if (!slides || slides.length === 0) return null;

    return (
        <section className="relative h-screen min-h-[750px] overflow-hidden bg-black">
            {/* Background Slides */}
            {slides.map((slide, i) => (
                <div
                    key={i}
                    className={`hero-slide ${i === currentSlide ? "active" : ""}`}
                >
                    <Image
                        src={typeof slide === 'string' ? slide : urlFor(slide).url()}
                        alt="MKG Interior"
                        fill
                        className="object-cover transition-transform duration-[10000ms] ease-linear scale-110 active:scale-125"
                        style={{ transform: i === currentSlide ? 'scale(1.1)' : 'scale(1.2)' }}
                        priority={i === 0}
                        sizes="100vw"
                    />
                </div>
            ))}

            {/* Overlays */}
            <div className="absolute inset-0 bg-black/45" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/80" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />

            {/* Side Social Bar (Antra Home-6 Style) */}
            <div className="absolute right-0 top-0 bottom-0 z-20 hidden xl:flex flex-col items-center justify-center gap-12 w-24">
                <div className="w-px h-24 bg-white/15" />
                <div className="flex flex-col gap-6 text-white/40">
                    <Link href="#" className="hover:text-[#c8a45c] transition-colors"><Facebook size={18} /></Link>
                    <Link href="#" className="hover:text-[#c8a45c] transition-colors"><Youtube size={18} /></Link>
                    <Link href="#" className="hover:text-[#c8a45c] transition-colors"><Instagram size={18} /></Link>
                </div>
                <div
                    className="flex items-center gap-4 text-[10px] font-bold tracking-[0.4em] text-white/20 uppercase"
                    style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
                >
                    FOLLOW US — SOCIAL NETWORKS
                </div>
                <div className="w-px h-24 bg-white/15" />
            </div>

            {/* Vertical Text Left */}
            <div
                className="absolute left-8 bottom-32 z-20 hidden lg:flex items-center gap-4"
                style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
            >
                <span className="text-[10px] font-bold tracking-[0.5em] text-[#c8a45c] uppercase">
                    MINH KHUÊ GROUP — <span className="text-white/30">NÂNG TẦM KHÔNG GIAN SỐNG</span>
                </span>
            </div>

            {/* Main Content */}
            <div className="absolute inset-0 flex items-center z-10">
                <div className="section-container w-full">
                    <div className="max-w-4xl">
                        <div
                            className={`transition-all duration-1000 delay-300 ${mounted ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
                                }`}
                        >
                            <div className="flex items-center gap-4 mb-8">
                                <span className="text-[12px] font-bold tracking-[0.4em] text-[#c8a45c] uppercase leading-none">
                                    {slogan || "HI-END INTERIOR SOLUTIONS"}
                                </span>
                                <div className="w-16 h-px bg-[#c8a45c]/50" />
                            </div>

                            <h1
                                className="text-5xl md:text-7xl lg:text-[100px] font-bold text-white uppercase leading-[0.95] mb-10"
                                style={{ fontFamily: "'Playfair Display', serif", letterSpacing: "-0.03em" }}
                            >
                                KIẾN TẠO <br />
                                <span className="italic font-light text-[#c8a45c] lowercase" style={{ fontFamily: "'Playfair Display', serif" }}>Luxury</span> <br className="lg:hidden" />
                                <span className="lg:ml-20">KHÔNG GIAN</span>
                            </h1>

                            <div className="flex flex-col sm:flex-row items-center gap-8 mt-12">
                                <Link
                                    href="/du-an"
                                    className="group relative overflow-hidden bg-[#c8a45c] text-black px-10 py-5 transition-all duration-300 hover:pr-14"
                                >
                                    <span className="relative z-10 text-[13px] font-bold tracking-[0.2em] uppercase">XEM DỰ ÁN</span>
                                    <ArrowRight size={18} className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all" />
                                </Link>

                                <Link
                                    href="/gioi-thieu"
                                    className="text-white/60 hover:text-[#c8a45c] text-[13px] font-bold tracking-[0.2em] uppercase transition-colors border-b border-white/10 pb-1"
                                >
                                    VỀ CHÚNG TÔI
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Slide Counter (Home-6 Style) */}
            <div className="absolute bottom-16 left-8 lg:left-16 z-20 flex items-end gap-2">
                <span className="text-4xl font-bold text-[#c8a45c] leading-none" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {String(currentSlide + 1).padStart(2, '0')}
                </span>
                <span className="text-xl font-light text-white/20 mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                    / {String(slides.length).padStart(2, '0')}
                </span>
            </div>

            {/* Scroll Mouse Animation */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 hidden md:flex flex-col items-center gap-3">
                <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-[#c8a45c]/50 to-[#c8a45c]" />
                <span className="text-[10px] font-bold tracking-[0.3em] text-white/30 uppercase cursor-default">SCROLL</span>
            </div>

            {/* Custom Navigation Dots (Right Side) */}
            <div className="absolute top-1/2 -translate-y-1/2 right-8 z-20 flex flex-col gap-6">
                {slides.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrentSlide(i)}
                        className="group relative w-2 h-12 flex items-center justify-center"
                    >
                        <div className={`w-[2px] transition-all duration-500 ${i === currentSlide ? "h-full bg-[#c8a45c]" : "h-4 bg-white/20 group-hover:bg-white/40"}`} />
                        {i === currentSlide && (
                            <span className="absolute right-6 text-[11px] font-bold text-[#c8a45c] opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-tighter">
                                NEXT
                            </span>
                        )}
                    </button>
                ))}
            </div>
        </section>
    );
}

