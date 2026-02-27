"use client";

import Image from "next/image";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";

interface AboutSectionProps {
    aboutText: string;
}

export default function AboutSection({ aboutText }: AboutSectionProps) {
    const [activeAccordion, setActiveAccordion] = useState<number | null>(0);

    const accordions = [
        {
            title: "KIẾN TẠO KHÔNG GIAN SỐNG TƯƠNG LAI",
            content: "Chúng tôi kết hợp nét tinh hoa truyền thống trong những thiết kế đổi mới, hướng tới không gian sống tiện nghi, thông minh và bền vững."
        },
        {
            title: "CHUYÊN GIA TRONG LĨNH VỰC NỘI THẤT",
            content: "Sở hữu sự hiểu biết sâu rộng về vật liệu và xu hướng thiết kế trên thế giới. Môi trường làm việc độc đáo là khởi nguồn sáng tạo."
        },
        {
            title: "GIẢI PHÁP TOÀN DIỆN VÀ ĐỒNG BỘ",
            content: "Từ ý tưởng thiết kế, sản xuất gia công CNC tại nhà máy Fadisa, đến cung cấp nội thất thông minh Modi và thi công hoàn thiện Fadi."
        }
    ];

    return (
        <section className="py-24 lg:py-40 bg-[#0a0a0a] relative overflow-hidden">
            {/* Large Watermark Number (Antra Style) */}
            <div
                className="absolute -left-10 top-20 text-[300px] font-bold text-white/[0.02] leading-none pointer-events-none select-none"
                style={{ fontFamily: "'Playfair Display', serif" }}
            >
                01
            </div>

            <div className="section-container relative z-10">
                <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-center">

                    {/* Left: Images Composition (Offset Style) */}
                    <div className="lg:col-span-6 relative h-[550px] lg:h-[700px] w-full">
                        <div className="absolute top-0 left-0 w-[85%] h-[85%] z-10 p-2 bg-[#0a0a0a]">
                            <div className="relative w-full h-full overflow-hidden">
                                <Image
                                    src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200"
                                    alt="MKG Workspace"
                                    fill
                                    className="object-cover transition-transform duration-1000 hover:scale-105"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                            </div>
                        </div>
                        <div className="absolute bottom-0 right-0 w-[55%] h-[55%] z-20 p-2 bg-[#0a0a0a]">
                            <div className="relative w-full h-full overflow-hidden border border-[#c8a45c]/30 shadow-2xl">
                                <Image
                                    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800"
                                    alt="MKG Project"
                                    fill
                                    className="object-cover transition-transform duration-1000 hover:scale-105"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                                <div className="absolute inset-0 bg-[#c8a45c]/5 mix-blend-overlay" />
                            </div>
                        </div>

                        {/* Floating Badge (Refined) */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 w-36 h-36 rounded-full glass flex flex-col items-center justify-center p-2 text-white text-center border-[#c8a45c]/30 animate-[float_5s_ease-in-out_infinite]">
                            <span className="text-4xl font-bold text-[#c8a45c] leading-none" style={{ fontFamily: "'Playfair Display', serif" }}>10+</span>
                            <span className="text-[9px] font-bold uppercase tracking-[0.3em] mt-2 text-white/70">Năm <br /> Kinh Nghiệm</span>
                        </div>
                    </div>

                    {/* Right: Text & Accordion */}
                    <div className="lg:col-span-6 lg:pl-4">
                        <div className="flex items-center gap-3 mb-6">
                            <span className="text-[#c8a45c] text-[12px] font-bold tracking-[0.3em] uppercase">VỀ CHÚNG TÔI</span>
                            <div className="w-12 h-px bg-[#c8a45c]/30" />
                        </div>

                        <h2
                            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-10 leading-[1.1]"
                            style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                            CHÚNG TÔI XÂY DỰNG <br />
                            <span className="italic font-light text-[#c8a45c] lowercase">tương lai</span> CỦA BẠN
                        </h2>

                        <div className="w-full h-px bg-white/5 mb-10" />

                        <p className="text-white/50 text-[15px] leading-relaxed mb-12 max-w-xl italic">
                            &quot;{aboutText || "Công ty TNHH Kiến trúc và Nội thất Minh Khuê tự hào mang đến sự toàn diện, đáp ứng mọi nhu cầu thiết kế, thi công và hoàn thiện nội thất cho khách hàng."}&quot;
                        </p>

                        {/* Accordion (Minimal Style) */}
                        <div className="space-y-2">
                            {accordions.map((item, index) => {
                                const isActive = activeAccordion === index;
                                return (
                                    <div
                                        key={index}
                                        className={`transition-all duration-500 border-l-2 ${isActive ? "border-[#c8a45c] bg-white/[0.02]" : "border-white/5 bg-transparent"}`}
                                    >
                                        <button
                                            onClick={() => setActiveAccordion(isActive ? null : index)}
                                            className="w-full flex items-center justify-between py-6 px-6 text-left group"
                                        >
                                            <span className={`text-[13px] font-bold tracking-widest uppercase transition-colors duration-300 ${isActive ? "text-[#c8a45c]" : "text-white/60 group-hover:text-white"}`}>
                                                {item.title}
                                            </span>
                                            <span className={`transition-transform duration-300 ${isActive ? "rotate-180 text-[#c8a45c]" : "text-white/30"}`}>
                                                {isActive ? <Minus size={16} /> : <Plus size={16} />}
                                            </span>
                                        </button>
                                        <div
                                            className="transition-all duration-500 ease-in-out px-6"
                                            style={{
                                                maxHeight: isActive ? "200px" : "0",
                                                opacity: isActive ? 1 : 0,
                                                paddingBottom: isActive ? "24px" : "0",
                                                visibility: isActive ? "visible" : "hidden"
                                            }}
                                        >
                                            <p className="text-white/40 text-[14px] leading-relaxed border-t border-white/5 pt-4">
                                                {item.content}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                    </div>

                </div>
            </div>
        </section>
    );
}

