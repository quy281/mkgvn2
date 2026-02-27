import Image from "next/image";
import { companyInfo } from "@/data/site-data";
import { CheckCircle } from "lucide-react";
import type { Metadata } from "next";
import { client, urlFor } from "@/sanity/client";
import { getServicesQuery, getSiteSettingsQuery } from "@/sanity/queries";

export async function generateMetadata(): Promise<Metadata> {
    const settings = await client.fetch(getSiteSettingsQuery);
    return {
        title: "Giới thiệu | MINH KHUÊ GROUP",
        description: settings?.aboutText || companyInfo.aboutText,
    };
}

export default async function GioiThieuPage() {
    const services = await client.fetch(getServicesQuery);
    const settings = await client.fetch(getSiteSettingsQuery);

    return (
        <div className="page-enter bg-background">
            {/* Hero Banner */}
            <section className="relative h-[50vh] min-h-[400px] overflow-hidden">
                <Image
                    src="/images/about/about-hero.jpg"
                    alt="Giới thiệu Minh Khuê Group"
                    fill
                    className="object-cover"
                    priority
                    sizes="100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/90" />
                <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-6">
                    <p className="text-[#c8a45c] text-[12px] font-bold tracking-[0.2em] uppercase mb-4">About us</p>
                    <h1
                        className="text-white text-5xl md:text-7xl font-bold mb-6"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                        Giới <span className="text-[#c8a45c] italic font-light">Thiệu</span>
                    </h1>
                    <div className="w-16 h-px bg-[#c8a45c]/50" />
                </div>
            </section>

            {/* About */}
            <section className="py-24 px-6">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <p className="text-[#c8a45c] text-[12px] font-bold tracking-[0.2em] uppercase mb-4">Về chúng tôi</p>
                        <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                            {settings?.companyName || companyInfo.fullName}
                        </h2>
                        <div className="w-12 h-px bg-[#c8a45c] mb-8" />
                        <div className="text-white/60 leading-relaxed text-[16px] space-y-4 font-light">
                            <p>
                                {settings?.aboutText || companyInfo.description}
                            </p>
                        </div>
                        <p className="text-white/60 leading-relaxed mt-8 text-[15px]">
                            Với sứ mệnh <strong className="text-[#c8a45c] italic font-medium">&quot;{settings?.slogan || companyInfo.slogan}&quot;</strong>,
                            Minh Khuê không ngừng phát triển và mở rộng hệ sinh thái, bao gồm
                            các thương hiệu:
                        </p>

                        <div className="mt-8 space-y-4">
                            {companyInfo.brands.map((brand) => (
                                <div
                                    key={brand.name}
                                    className="glass-card rounded-xl p-5 flex items-center gap-5 border border-white/5 hover:border-[#c8a45c]/20 transition-all"
                                >
                                    <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 border border-white/10">
                                        <span className="text-[#c8a45c] font-bold text-xl font-serif">
                                            {brand.name.charAt(0)}
                                        </span>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white text-lg font-serif">
                                            {brand.name}
                                        </h4>
                                        <p className="text-[13px] text-white/50 mt-1">
                                            {brand.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="relative">
                        <div className="relative aspect-[3/4] rounded-2xl overflow-hidden">
                            <Image
                                src="/images/about/about-interior.jpg"
                                alt="Nội thất Minh Khuê"
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                        </div>
                        <div className="absolute -bottom-6 -right-6 w-40 h-40 rounded-2xl bg-[#c8a45c]/10 border border-[#c8a45c]/20 backdrop-blur-xl flex flex-col items-center justify-center">
                            <span className="text-4xl font-bold text-[#c8a45c] mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                                {settings?.stats?.[0]?.number || "500+"}
                            </span>
                            <span className="text-[12px] uppercase tracking-widest text-white/50 font-bold">
                                {settings?.stats?.[0]?.label || "Dự án"}
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Detail */}
            <section className="py-32 px-6 bg-[#0a0a0a] border-y border-white/5">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-20 flex flex-col items-center">
                        <p className="text-[#c8a45c] text-[12px] font-bold tracking-[0.2em] uppercase mb-4">DỊCH VỤ</p>
                        <h2
                            className="text-4xl md:text-5xl font-bold text-white mb-6"
                            style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                            Chúng tôi <span className="text-[#c8a45c] italic font-light">cung cấp</span>
                        </h2>
                        <div className="w-16 h-px bg-[#c8a45c]/50" />
                    </div>
                    {services.map((service: any, i: number) => (
                        <div
                            key={service._id}
                            className={`grid flex-col lg:grid-cols-2 gap-16 items-center mb-24 last:mb-0 ${i % 2 === 1 ? "lg:flex-row-reverse" : ""
                                }`}
                        >
                            <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/5">
                                    {service.image ? (
                                        <Image
                                            src={urlFor(service.image).url()}
                                            alt={service.title}
                                            fill
                                            className="object-cover transition-transform duration-700 hover:scale-105"
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                        />
                                    ) : (
                                        <div className="absolute inset-0 bg-[#0e0e0e] flex items-center justify-center">
                                            <span className="text-white/20 text-4xl font-serif">MKG</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                                <h3 className="text-3xl font-bold text-white mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                                    {service.title}
                                </h3>
                                <div className="w-12 h-px bg-[#c8a45c]" />
                                <p className="text-white/60 leading-relaxed mt-6 text-[15px] font-light">
                                    {service.shortDesc}
                                </p>
                                {service.features && service.features.length > 0 && (
                                    <ul className="mt-8 space-y-4">
                                        {service.features.map((f: string) => (
                                            <li key={f} className="flex items-start gap-4 text-white/70 text-[14px]">
                                                <CheckCircle size={18} className="text-[#c8a45c] flex-shrink-0 mt-0.5" />
                                                <span className="leading-snug">{f}</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Values */}
            <section className="py-32 px-6">
                <div className="max-w-6xl mx-auto text-center">
                    <div className="flex flex-col items-center mb-16">
                        <p className="text-[#c8a45c] text-[12px] font-bold tracking-[0.2em] uppercase mb-4">Giá trị cốt lõi</p>
                        <h2
                            className="text-4xl md:text-5xl font-bold text-white mb-8"
                            style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                            Tại sao chọn <span className="text-[#c8a45c] italic font-light">Minh Khuê?</span>
                        </h2>
                        <div className="w-16 h-px bg-[#c8a45c]/50" />
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Chất lượng",
                                desc: "Cam kết sử dụng vật liệu cao cấp và thi công theo tiêu chuẩn quốc tế.",
                                icon: "🏆",
                            },
                            {
                                title: "Sáng tạo",
                                desc: "Đội ngũ kiến trúc sư sáng tạo, luôn cập nhật xu hướng thiết kế mới nhất.",
                                icon: "💡",
                            },
                            {
                                title: "Tận tâm",
                                desc: "Đồng hành cùng khách hàng từ ý tưởng đến khi hoàn thiện, bảo hành dài hạn.",
                                icon: "🤝",
                            },
                        ].map((v) => (
                            <div key={v.title} className="glass-card rounded-2xl p-10 text-center border border-white/5 hover:border-[#c8a45c]/30 hover:bg-white/5 transition-all group">
                                <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-500">{v.icon}</div>
                                <h3 className="text-xl font-bold text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                                    {v.title}
                                </h3>
                                <p className="text-[14px] text-white/50 leading-relaxed font-light">
                                    {v.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
