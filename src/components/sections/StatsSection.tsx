"use client";

import { useEffect, useState, useRef } from "react";

interface Stat {
    label: string;
    number: string; // e.g., "10", "500", "150"
}

interface StatsSectionProps {
    stats: Stat[];
}

export default function StatsSection({ stats }: StatsSectionProps) {
    const [inView, setInView] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);
    const [counts, setCounts] = useState<number[]>(stats.map(() => 0));

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.5 }
        );

        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (inView) {
            stats.forEach((stat, idx) => {
                // Extract numeric part for animation
                const numMatch = stat.number.match(/\d+/);
                if (!numMatch) return;

                const target = parseInt(numMatch[0], 10);
                const duration = 2000; // ms
                const steps = 60;
                const stepTime = duration / steps;

                let current = 0;
                const timer = setInterval(() => {
                    current += target / steps;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    setCounts(prev => {
                        const newCounts = [...prev];
                        newCounts[idx] = Math.floor(current);
                        return newCounts;
                    });
                }, stepTime);
            });
        }
    }, [inView, stats]);

    if (!stats || stats.length === 0) return null;

    return (
        <section ref={sectionRef} className="py-20 lg:py-24 bg-[#0a0a0a] border-y border-[#c8a45c]/10">
            <div className="section-container">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-12 lg:gap-8 divide-x divide-[#c8a45c]/10">

                    {stats.map((stat, idx) => {
                        const hasPlus = stat.number.includes('+');
                        const hasK = stat.number.includes('k') || stat.number.includes('K');

                        return (
                            <div key={idx} className="flex flex-col items-center justify-center text-center px-4">
                                <div className="flex items-start mb-4">
                                    <span
                                        className="text-5xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#c8a45c] to-[#8a723e]"
                                        style={{ fontFamily: "'Playfair Display', serif", lineHeight: 1 }}
                                    >
                                        {counts[idx]}
                                    </span>
                                    <span className="text-[#c8a45c] text-2xl lg:text-4xl font-light ml-1 -mt-2">
                                        {hasK && 'K'}
                                        {hasPlus && '+'}
                                    </span>
                                </div>
                                <span className="text-[12px] font-bold tracking-[0.2em] text-white/50 uppercase">
                                    {stat.label}
                                </span>
                            </div>
                        );
                    })}

                </div>
            </div>
        </section>
    );
}
