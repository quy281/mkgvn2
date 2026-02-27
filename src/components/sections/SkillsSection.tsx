"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";

interface Skill {
    name: string;
    percentage: number;
}

interface SkillsSectionProps {
    skills: Skill[];
}

export default function SkillsSection({ skills }: SkillsSectionProps) {
    const [inView, setInView] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.3 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    if (!skills || skills.length === 0) return null;

    return (
        <section ref={sectionRef} className="py-24 lg:py-32 bg-[#141414] relative overflow-hidden">

            <div className="section-container relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

                    {/* Left: Images / Graphic */}
                    <div className="relative h-[500px] w-full hidden lg:block">
                        <div className="absolute inset-0 bg-[url('/images/decorative/blueprint.png')] bg-cover opacity-[0.03]" />
                        <div className="relative w-full h-full rounded-tr-[100px] rounded-bl-[100px] overflow-hidden">
                            <Image
                                src="/images/about/about-company.png"
                                alt="MKG Design Process"
                                fill
                                className="object-cover"
                                sizes="50vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-transparent to-transparent" />
                        </div>
                    </div>

                    {/* Right: Skills Content */}
                    <div>
                        <div className="flex items-center gap-3 mb-6">
                            <span className="text-[#c8a45c] text-[12px] font-bold tracking-[0.2em] uppercase">NĂNG LỰC THIẾT KẾ</span>
                            <div className="w-12 h-px bg-[#c8a45c]/50" />
                        </div>

                        <h2
                            className="text-4xl md:text-5xl font-bold text-white mb-8 leading-[1.15]"
                            style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                            GIẢI PHÁP <span className="italic font-light text-[#c8a45c]">TỐI ƯU</span> <br />
                            CHO MỌI KHÔNG GIAN
                        </h2>

                        <p className="text-white/60 text-[15px] leading-relaxed mb-12">
                            Chúng tôi sở hữu đội ngũ kiến trúc sư và kỹ sư giàu kinh nghiệm, đáp ứng mọi yêu cầu khắt khe nhất về thẩm mỹ, công năng và kỹ thuật.
                        </p>

                        {/* Progress Bars */}
                        <div className="space-y-8">
                            {skills.map((skill, idx) => (
                                <div key={idx}>
                                    <div className="flex justify-between items-end mb-2">
                                        <span className="text-white text-[13px] font-bold tracking-widest uppercase">{skill.name}</span>
                                        <span className="text-[#c8a45c] text-[15px] font-bold font-serif">{skill.percentage}%</span>
                                    </div>
                                    <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-[#8a723e] to-[#c8a45c] transition-all duration-1500 ease-out rounded-full"
                                            style={{
                                                width: inView ? `${skill.percentage}%` : '0%',
                                            }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}
