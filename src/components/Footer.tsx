"use client";

import Link from "next/link";
import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Facebook, Youtube } from "lucide-react";
import { companyInfo, navigation } from "@/data/site-data";

export default function Footer() {
    const [formData, setFormData] = useState({ name: "", phone: "", service: "" });
    const [sent, setSent] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSent(true);
        setTimeout(() => setSent(false), 4000);
        setFormData({ name: "", phone: "", service: "" });
    };

    return (
        <footer style={{ background: "#0e0e0e", borderTop: "1px solid rgba(200,164,92,0.1)" }}>
            {/* Top gold accent line */}
            <div style={{ height: "2px", background: "linear-gradient(90deg,transparent,#c8a45c,transparent)" }} />

            <div className="section-container py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">

                    {/* Col 1: VỀ CHÚNG TÔI */}
                    <div>
                        <h4
                            className="text-[11px] font-bold tracking-[0.3em] uppercase mb-8"
                            style={{ color: "#c8a45c" }}
                        >
                            VỀ CHÚNG TÔI
                        </h4>
                        <p className="text-[14px] font-bold text-white mb-4 uppercase tracking-wider">{companyInfo.fullName}</p>
                        <div className="space-y-4 mb-8">
                            {companyInfo.contact.addresses.map((addr, i) => (
                                <div key={i} className="flex gap-3 text-[13px] text-white/50 leading-relaxed">
                                    <MapPin size={16} className="flex-shrink-0 mt-0.5" style={{ color: "#c8a45c" }} />
                                    <span>{addr}</span>
                                </div>
                            ))}
                            <div className="flex gap-3 text-[13px] text-white/50">
                                <Phone size={16} className="flex-shrink-0 mt-0.5" style={{ color: "#c8a45c" }} />
                                <div className="flex flex-col gap-1">
                                    {companyInfo.contact.phones.map((phone, i) => (
                                        <a key={i} href={`tel:${phone.replace(/\s/g, "")}`} className="hover:text-[#c8a45c] transition-colors font-medium text-white/80">
                                            {phone}
                                        </a>
                                    ))}
                                </div>
                            </div>
                            <div className="flex gap-3 text-[13px] text-white/50">
                                <Mail size={16} className="flex-shrink-0 mt-0.5" style={{ color: "#c8a45c" }} />
                                <a href={`mailto:${companyInfo.contact.email}`} className="hover:text-[#c8a45c] transition-colors">
                                    {companyInfo.contact.email}
                                </a>
                            </div>
                        </div>

                        <div className="pt-6 border-t border-white/5 flex gap-4">
                            {companyInfo.brands.map((brand) => (
                                <div key={brand.name} className="flex items-center gap-2">
                                    <span
                                        className="text-[9px] font-bold tracking-widest uppercase border border-[#c8a45c]/30 px-2 py-0.5 text-[#c8a45c]"
                                    >
                                        {brand.name}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Col 2: BẢN ĐỒ */}
                    <div>
                        <h4
                            className="text-[11px] font-bold tracking-[0.3em] uppercase mb-8"
                            style={{ color: "#c8a45c" }}
                        >
                            BẢN ĐỒ DẪN ĐƯỜNG
                        </h4>
                        <div
                            className="w-full overflow-hidden rounded-sm grayscale invert contrast-75 brightness-75 hover:grayscale-0 hover:invert-0 transition-all duration-700"
                            style={{ height: "260px", background: "#141414", border: "1px solid rgba(200,164,92,0.1)" }}
                        >
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15680.1234!2d106.7123!3d10.7456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zQ8O0bmcgdHkgTWluaCBLaHXDqg!5e0!3m2!1svi!2svn!4v1614000000"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                loading="lazy"
                                title="Bản đồ MKG.VN"
                            />
                        </div>
                    </div>

                    {/* Col 3: THEO DÕI CHÚNG TÔI */}
                    <div>
                        <h4
                            className="text-[11px] font-bold tracking-[0.3em] uppercase mb-8"
                            style={{ color: "#c8a45c" }}
                        >
                            THEO DÕI CHÚNG TÔI
                        </h4>
                        <div className="flex gap-4 mb-10">
                            {[
                                { icon: Facebook, label: "Facebook", href: companyInfo.social?.facebook || "#" },
                                { icon: Youtube, label: "Youtube", href: companyInfo.social?.youtube || "#" },
                            ].map((s) => (
                                <a
                                    key={s.label}
                                    href={s.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-12 h-12 border border-white/10 flex items-center justify-center text-white/40 hover:text-[#c8a45c] hover:border-[#c8a45c] transition-all duration-300"
                                    title={s.label}
                                >
                                    <s.icon size={18} />
                                </a>
                            ))}
                        </div>

                        <h4
                            className="text-[11px] font-bold tracking-[0.3em] uppercase mb-6"
                            style={{ color: "#c8a45c" }}
                        >
                            HỖ TRỢ KHÁCH HÀNG
                        </h4>
                        <ul className="grid grid-cols-1 gap-3">
                            {navigation.map((item) => (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        className="text-[13px] text-white/40 hover:text-[#c8a45c] transition-colors flex items-center gap-2 group"
                                    >
                                        <div className="w-1.5 h-px bg-white/20 group-hover:w-3 group-hover:bg-[#c8a45c] transition-all" />
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        <div className="mt-8 pt-8 border-t border-white/5">
                            <div className="flex items-center gap-3 text-[12px] text-white/40">
                                <Clock size={14} style={{ color: "#c8a45c" }} />
                                <span>T2 - T6: 7:30 - 17:30 | T7: 8:00 - 12:00</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom bar */}
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                <div className="section-container py-8">
                    <p className="text-center text-[11px] text-white/20 tracking-[0.3em] uppercase font-bold">
                        © MKG.VN | {companyInfo.fullName}
                    </p>
                </div>
            </div>
        </footer>
    );
}
