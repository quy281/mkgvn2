"use client";

import Image from "next/image";
import { Check } from "lucide-react";

export default function ExpertiseSection() {
    const features = [
        "Thiết kế 3D chân thực, đón đầu xu hướng",
        "Thi công hoàn thiện sắc nét, chuẩn thiết kế 99%",
        "Kiểm soát ngân sách chặt chẽ, không phát sinh",
        "Gia công CNC tự động, độ chính xác tuyệt đối",
        "Vật liệu nhập khẩu và nội địa đạt chuẩn E0, E1",
        "Bảo hành công trình dài hạn, bảo trì trọn đời"
    ];

    return (
        <section className="py-24 lg:py-32 bg-[#0a0a0a] relative overflow-hidden">

            {/* Background large text mark */}
            <div
                className="absolute top-10 right-[-5%] text-[#111] font-bold text-[200px] leading-none select-none z-0"
                style={{ fontFamily: "'Playfair Display', serif" }}
            >
                MKG
            </div>

            <div className="section-container relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

                    {/* Left: Text & Features List */}
                    <div>
                        <div className="flex items-center gap-3 mb-6">
                            <span className="text-[#c8a45c] text-[12px] font-bold tracking-[0.2em] uppercase">TẠI SAO CHỌN CHÚNG TÔI</span>
                            <div className="w-12 h-px bg-[#c8a45c]/50" />
                        </div>

                        <h2
                            className="text-4xl md:text-5xl font-bold text-white mb-8 leading-[1.15]"
                            style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                            NĂNG LỰC <br />
                            <span className="italic font-light text-[#c8a45c]">CỐT LÕI</span> TẠO NÊN <br />
                            SỰ KHÁC BIỆT
                        </h2>

                        <p className="text-white/60 text-[15px] leading-relaxed mb-12 max-w-lg">
                            Sở hữu hệ sinh thái khép kín từ thiết kế sáng tạo, sản xuất trực tiếp đến thi công hoàn thiện. Minh Khuê cam kết mang lại chất lượng hoàn mỹ và tiến độ chính xác cho mọi dự án.
                        </p>

                        <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-4">
                            {features.map((feature, idx) => (
                                <li key={idx} className="flex items-start gap-3">
                                    <div className="mt-1 flex-shrink-0 w-4 h-4 rounded-full bg-[#c8a45c]/10 flex items-center justify-center text-[#c8a45c]">
                                        <Check size={10} strokeWidth={3} />
                                    </div>
                                    <span className="text-[13px] text-white/50 tracking-wide">{feature}</span>
                                </li>
                            ))}
                        </ul>

                        {/* Signature Box */}
                        <div className="mt-12 inline-flex items-center gap-6 p-6 border border-[#c8a45c]/20 bg-[#141414] rounded-sm">
                            <div className="w-14 h-14 rounded-full overflow-hidden relative border border-[#c8a45c]/30">
                                <Image src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&q=80&crop=faces" alt="CEO Min Khuê" fill className="object-cover" sizes="56px" />
                            </div>
                            <div>
                                <p className="text-[13px] text-white/40 italic mb-1">
                                    "Sứ mệnh của chúng tôi là mang lại không gian sống hoàn hảo, nơi mỗi chi tiết đều có câu chuyện riêng."
                                </p>
                                <p className="text-[#c8a45c] text-[12px] font-bold tracking-widest uppercase">CEO, Founder</p>
                            </div>
                        </div>
                    </div>

                    {/* Right: Images Composition */}
                    <div className="relative h-[650px] w-full hidden lg:block">
                        {/* Primary Image */}
                        <div className="absolute top-0 right-0 w-[80%] h-[80%] z-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                            <Image
                                src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200"
                                alt="Thiết kế nội thất"
                                fill
                                className="object-cover"
                                sizes="(max-width: 1024px) 100vw, 50vw"
                            />
                        </div>

                        {/* Secondary Image Overlapping */}
                        <div className="absolute bottom-0 left-0 w-[60%] h-[60%] z-20 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-[8px] border-[#0a0a0a]">
                            <Image
                                src="https://images.unsplash.com/photo-1503387762-592dea58ef23?w=800"
                                alt="Thi công nội thất"
                                fill
                                className="object-cover"
                                sizes="(max-width: 1024px) 100vw, 50vw"
                            />
                            <div className="absolute inset-0 bg-[#c8a45c]/10 mix-blend-overlay" />
                        </div>

                        {/* Decorative Gold Frame */}
                        <div className="absolute top-10 right-10 w-[80%] h-[80%] border border-[#c8a45c]/50 z-0 -translate-x-10 translate-y-10" />
                    </div>

                </div>
            </div>
        </section>
    );
}
