"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X, Phone, Search } from "lucide-react";
import { companyInfo, navigation } from "@/data/site-data";
import { usePathname } from "next/navigation";

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [pathname]);

    const isHome = pathname === "/";
    const transparent = isHome && !isScrolled;

    return (
        <header
            className="fixed top-0 left-0 right-0 z-50 transition-all duration-700"
            style={{
                height: isScrolled ? "80px" : "100px",
                background: transparent ? "transparent" : "rgba(10,10,10,0.98)",
                borderBottom: transparent ? "none" : "1px solid rgba(200,164,92,0.1)",
                backdropFilter: transparent ? "none" : "blur(15px)",
            }}
        >
            <div className="section-container h-full">
                <div className="flex items-center justify-between h-full">

                    {/* Logo Area */}
                    <Link href="/" className="flex items-center gap-4 group">
                        <div className="relative w-12 h-12 transition-transform duration-500 group-hover:scale-105">
                            <Image
                                src="/images/logo/logo-mkg.jpg"
                                alt="MKG Logo"
                                fill
                                className="object-contain"
                                sizes="48px"
                            />
                        </div>
                        <div className="hidden sm:block">
                            <div className="text-[18px] font-extrabold tracking-[0.2em] text-white leading-none mb-1">
                                MKG<span className="text-[#c8a45c]">.VN</span>
                            </div>
                            <div className="text-[9px] tracking-[0.3em] font-bold text-white/30 uppercase">
                                Architecture & Interior
                            </div>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-10">
                        {navigation.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="group relative py-2"
                                >
                                    <span className={`text-[12px] font-bold tracking-[0.25em] uppercase transition-colors duration-300 ${isActive ? "text-[#c8a45c]" : "text-white/70 group-hover:text-white"}`}>
                                        {item.label}
                                    </span>
                                    <span className={`absolute bottom-0 left-0 h-[2px] bg-[#c8a45c] transition-all duration-500 ${isActive ? "w-full" : "w-0 group-hover:w-full"}`} />
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Right Utility Area */}
                    <div className="flex items-center gap-6">
                        <button className="hidden sm:flex text-white/40 hover:text-[#c8a45c] transition-colors">
                            <Search size={20} />
                        </button>

                        <a
                            href={`tel:${companyInfo.contact.hotline.replace(/\s/g, "")}`}
                            className="hidden md:flex items-center gap-2 text-[#c8a45c] text-[13px] font-bold tracking-widest border border-[#c8a45c]/30 px-6 py-2.5 rounded-sm hover:bg-[#c8a45c] hover:text-black hover:border-[#c8a45c] transition-all duration-300"
                        >
                            <Phone size={14} />
                            <span>{companyInfo.contact.hotline}</span>
                        </a>

                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="lg:hidden w-12 h-12 flex flex-col items-center justify-center gap-1.5 transition-all text-[#c8a45c]"
                        >
                            <div className={`w-6 h-[2px] bg-current transition-all ${isMobileMenuOpen ? "rotate-45 translate-y-2" : ""}`} />
                            <div className={`w-6 h-[2px] bg-current transition-all ${isMobileMenuOpen ? "opacity-0" : ""}`} />
                            <div className={`w-6 h-[2px] bg-current transition-all ${isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Fullscreen Menu */}
            <div
                className={`fixed inset-0 top-[80px] bg-[#0a0a0a] z-40 transition-all duration-500 lg:hidden ${isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"}`}
            >
                <div className="section-container py-12 flex flex-col items-center gap-8">
                    {navigation.map((item, i) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`text-2xl font-bold tracking-[0.3em] uppercase text-white hover:text-[#c8a45c] transition-all duration-500 ${isMobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
                            style={{ transitionDelay: `${i * 100}ms` }}
                        >
                            {item.label}
                        </Link>
                    ))}
                    <div className="w-12 h-px bg-[#c8a45c]/30 mt-4" />
                    <a href={`tel:${companyInfo.contact.hotline.replace(/\s/g, "")}`} className="text-[#c8a45c] text-lg font-bold tracking-widest">
                        {companyInfo.contact.hotline}
                    </a>
                </div>
            </div>
        </header>
    );
}

