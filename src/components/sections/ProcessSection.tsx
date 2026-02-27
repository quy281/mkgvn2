"use client";

import Image from "next/image";

export default function ProcessSection() {
    const steps = [
        { num: "01", title: "LÝ TƯỞNG & THIẾT KẾ", desc: "Tiếp nhận ý tưởng của bạn, tư vấn giải pháp tối ưu và thiết kế 3D chân thực phù hợp phong cách." },
        { num: "02", title: "KẾ HOẠCH & BÁO GIÁ", desc: "Lập bảng tiến độ chi tiết và dự toán kinh phí minh bạch, chuẩn xác cho từng hạng mục thi công." },
        { num: "03", title: "GIA CÔNG & SẢN XUẤT", desc: "Nhà máy Fadisa với máy CNC hiện đại gia công độ chính xác cao, nguyên vật liệu đạt chuẩn." },
        { num: "04", title: "THI CÔNG & BÀN GIAO", desc: "Đội ngũ Fadi thi công chuyên nghiệp, hoàn thiện sắc nét và bàn giao đúng cam kết dự án." }
    ];

    return (
        <section className="py-24 lg:py-32 bg-[#141414] relative">
            <div className="section-container">
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* Left: Featured Image */}
                    <div className="relative group">
                        {/* Main Rounded Image */}
                        <div className="relative h-[600px] w-full rounded-2xl overflow-hidden shadow-2xl">
                            <Image
                                src="/images/projects/project-sunrise-city.jpg"
                                alt="Quy trình làm việc MKG"
                                fill
                                className="object-cover transition-transform duration-1000 group-hover:scale-110"
                                sizes="(max-width: 1024px) 100vw, 50vw"
                            />
                            {/* Subtle Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent mix-blend-multiply" />
                        </div>

                        {/* Decorative Corner Element */}
                        <div className="absolute -bottom-6 -left-6 w-32 h-32 border-l-2 border-b-2 border-[#c8a45c]/30 rounded-bl-3xl -z-10" />
                        <div className="absolute -top-6 -right-6 w-32 h-32 border-r-2 border-t-2 border-[#c8a45c]/30 rounded-tr-3xl -z-10" />
                    </div>

                    {/* Right: Process List */}
                    <div className="lg:pl-8">
                        <div className="flex items-center gap-3 mb-6">
                            <span className="text-[#c8a45c] text-[12px] font-bold tracking-[0.2em] uppercase">QUY TRÌNH LÀM VIỆC</span>
                            <div className="w-12 h-px bg-[#c8a45c]/50" />
                        </div>

                        <h2
                            className="text-4xl md:text-5xl font-bold text-white mb-16 leading-[1.15]"
                            style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                            HÀNH TRÌNH TẠO NÊN <br className="hidden lg:block" />
                            <span className="italic font-light text-[#c8a45c]">KIỆT TÁC</span> CỦA BẠN
                        </h2>

                        <div className="space-y-12">
                            {steps.map((step, i) => (
                                <div key={i} className="group relative pl-16 md:pl-20 2xl:pl-24">

                                    {/* Faded Background Number */}
                                    <div
                                        className="absolute left-0 top-1/2 -translate-y-1/2 font-bold leading-none text-white/5 transition-colors duration-500 group-hover:text-[#c8a45c]/10"
                                        style={{ fontSize: "70px", fontFamily: "'Playfair Display', serif" }}
                                    >
                                        {step.num}
                                    </div>

                                    {/* Content */}
                                    <div className="relative z-10 transition-transform duration-300 group-hover:translate-x-2">
                                        <h4 className="text-[15px] font-bold text-white tracking-widest uppercase mb-3 flex items-center gap-4">
                                            {step.title}
                                            {/* Active line indicator on hover */}
                                            <span className="w-0 h-px bg-[#c8a45c] transition-all duration-300 group-hover:w-8" />
                                        </h4>
                                        <p className="text-white/50 text-[14px] leading-relaxed max-w-md">
                                            {step.desc}
                                        </p>
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
