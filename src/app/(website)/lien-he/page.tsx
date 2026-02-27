"use client";

import { useState } from "react";
import Image from "next/image";
import { MapPin, Phone, Mail, Globe, Send, CheckCircle } from "lucide-react";
import { companyInfo } from "@/data/site-data";

export default function LienHePage() {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        subject: "",
        message: "",
    });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 5000);
        setFormData({ name: "", phone: "", email: "", subject: "", message: "" });
    };

    return (
        <div className="page-enter">
            {/* Hero */}
            <section className="relative h-[50vh] min-h-[400px] overflow-hidden">
                <Image
                    src="/images/about/about-interior.jpg"
                    alt="Liên hệ Minh Khuê Group"
                    fill
                    className="object-cover"
                    priority
                    sizes="100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/90" />
                <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-6">
                    <p className="text-[#c8a45c] text-[12px] font-bold tracking-[0.2em] uppercase mb-4">Contact us</p>
                    <h1
                        className="text-white text-5xl md:text-7xl font-bold mb-6"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                        Liên <span className="text-[#c8a45c] italic font-light">Hệ</span>
                    </h1>
                    <div className="w-16 h-px bg-[#c8a45c]/50" />
                </div>
            </section>

            {/* Content */}
            <section className="py-16 px-6">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-5 gap-12">
                    {/* Contact Info */}
                    <div className="lg:col-span-2 space-y-6">
                        <div>
                            <p className="text-[#c8a45c] text-[12px] font-bold tracking-[0.2em] uppercase mb-4">THÔNG TIN LIÊN HỆ</p>
                            <h2
                                className="text-4xl lg:text-5xl font-bold text-white mb-6"
                                style={{ fontFamily: "'Playfair Display', serif" }}
                            >
                                Kết nối với <span className="text-[#c8a45c] italic font-light">chúng tôi</span>
                            </h2>
                            <div className="w-12 h-px bg-[#c8a45c] mb-8" />
                        </div>

                        <div className="space-y-4 mt-8">
                            <div className="glass-card rounded-2xl p-6 border border-white/5 hover:border-[#c8a45c]/30 transition-all group cursor-default">
                                <div className="flex items-start gap-5">
                                    <div className="w-12 h-12 rounded-xl bg-[#c8a45c]/10 flex items-center justify-center flex-shrink-0 border border-[#c8a45c]/20 group-hover:bg-[#c8a45c]/20 transition-all">
                                        <MapPin size={20} className="text-[#c8a45c]" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white text-[15px] mb-2 font-serif tracking-wide">
                                            Địa chỉ
                                        </h4>
                                        {companyInfo.contact.addresses.map((addr, i) => (
                                            <p
                                                key={i}
                                                className="text-[14px] text-white/50 leading-relaxed font-light"
                                            >
                                                {addr}
                                            </p>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="glass-card rounded-2xl p-6 border border-white/5 hover:border-[#c8a45c]/30 transition-all group cursor-default">
                                <div className="flex items-start gap-5">
                                    <div className="w-12 h-12 rounded-xl bg-[#c8a45c]/10 flex items-center justify-center flex-shrink-0 border border-[#c8a45c]/20 group-hover:bg-[#c8a45c]/20 transition-all">
                                        <Phone size={20} className="text-[#c8a45c]" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white text-[15px] mb-2 font-serif tracking-wide">
                                            Số điện thoại
                                        </h4>
                                        <p className="text-[14px] text-white/50 font-light">
                                            Hotline: <span className="text-white font-medium">{companyInfo.contact.hotline}</span> (nhấn phím 1)
                                        </p>
                                        {companyInfo.contact.phones.map((p) => (
                                            <p key={p} className="text-[14px] text-white/50 font-light mt-1">
                                                CSKH: {p}
                                            </p>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="glass-card rounded-2xl p-6 border border-white/5 hover:border-[#c8a45c]/30 transition-all group cursor-default">
                                <div className="flex items-start gap-5">
                                    <div className="w-12 h-12 rounded-xl bg-[#c8a45c]/10 flex items-center justify-center flex-shrink-0 border border-[#c8a45c]/20 group-hover:bg-[#c8a45c]/20 transition-all">
                                        <Mail size={20} className="text-[#c8a45c]" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white text-[15px] mb-2 font-serif tracking-wide">
                                            Email
                                        </h4>
                                        <p className="text-[14px] text-white/50 font-light">
                                            {companyInfo.contact.email}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="glass-card rounded-2xl p-6 border border-white/5 hover:border-[#c8a45c]/30 transition-all group cursor-default">
                                <div className="flex items-start gap-5">
                                    <div className="w-12 h-12 rounded-xl bg-[#c8a45c]/10 flex items-center justify-center flex-shrink-0 border border-[#c8a45c]/20 group-hover:bg-[#c8a45c]/20 transition-all">
                                        <Globe size={20} className="text-[#c8a45c]" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white text-[15px] mb-2 font-serif tracking-wide">
                                            Website
                                        </h4>
                                        <p className="text-[14px] text-white/50 font-light">
                                            {companyInfo.contact.website}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-3">
                        <div className="glass-card rounded-3xl p-8 md:p-12 border border-white/5">
                            <h3
                                className="text-3xl font-bold text-white mb-2"
                                style={{ fontFamily: "'Playfair Display', serif" }}
                            >
                                Gửi yêu cầu <span className="text-[#c8a45c] italic font-light">tư vấn</span>
                            </h3>
                            <p className="text-[14px] text-white/50 mb-10 font-light mt-4">
                                Điền thông tin bên dưới, chúng tôi sẽ liên hệ lại trong 24 giờ
                            </p>

                            {submitted && (
                                <div className="mb-8 p-5 rounded-2xl bg-green-500/10 border border-green-500/20 flex items-start gap-3">
                                    <CheckCircle size={20} className="text-green-400 mt-0.5" />
                                    <span className="text-[14px] text-green-400/90 leading-relaxed font-light">
                                        Cảm ơn bạn! Chúng tôi đã nhận được yêu cầu và sẽ phản hồi
                                        sớm nhất.
                                    </span>
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid sm:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-[13px] font-bold text-white/70 uppercase tracking-widest mb-3">
                                            Họ và tên *
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.name}
                                            onChange={(e) =>
                                                setFormData({ ...formData, name: e.target.value })
                                            }
                                            className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white text-[15px] focus:outline-none focus:border-[#c8a45c]/50 focus:bg-white/10 transition-all placeholder:text-white/20 font-light"
                                            placeholder="Nguyễn Văn A"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[13px] font-bold text-white/70 uppercase tracking-widest mb-3">
                                            Số điện thoại *
                                        </label>
                                        <input
                                            type="tel"
                                            required
                                            value={formData.phone}
                                            onChange={(e) =>
                                                setFormData({ ...formData, phone: e.target.value })
                                            }
                                            className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white text-[15px] focus:outline-none focus:border-[#c8a45c]/50 focus:bg-white/10 transition-all placeholder:text-white/20 font-light"
                                            placeholder="0912 345 678"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-[13px] font-bold text-white/70 uppercase tracking-widest mb-3">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) =>
                                            setFormData({ ...formData, email: e.target.value })
                                        }
                                        className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white text-[15px] focus:outline-none focus:border-[#c8a45c]/50 focus:bg-white/10 transition-all placeholder:text-white/20 font-light"
                                        placeholder="email@example.com"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[13px] font-bold text-white/70 uppercase tracking-widest mb-3">
                                        Chủ đề
                                    </label>
                                    <select
                                        value={formData.subject}
                                        onChange={(e) =>
                                            setFormData({ ...formData, subject: e.target.value })
                                        }
                                        className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white text-[15px] focus:outline-none focus:border-[#c8a45c]/50 focus:bg-white/10 transition-all font-light [&>option]:bg-[#141414] [&>option]:text-white"
                                    >
                                        <option value="">Chọn chủ đề</option>
                                        <option value="thiet-ke">Tư vấn thiết kế nội thất</option>
                                        <option value="thi-cong">Thi công nội thất</option>
                                        <option value="bao-gia">Nhận báo giá</option>
                                        <option value="khac">Khác</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-[13px] font-bold text-white/70 uppercase tracking-widest mb-3">
                                        Nội dung *
                                    </label>
                                    <textarea
                                        required
                                        rows={5}
                                        value={formData.message}
                                        onChange={(e) =>
                                            setFormData({ ...formData, message: e.target.value })
                                        }
                                        className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white text-[15px] focus:outline-none focus:border-[#c8a45c]/50 focus:bg-white/10 transition-all placeholder:text-white/20 resize-none font-light"
                                        placeholder="Mô tả dự án hoặc yêu cầu của bạn..."
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full flex items-center justify-center gap-3 bg-[#c8a45c] text-black hover:bg-white px-8 py-5 rounded-xl font-bold text-[13px] tracking-widest uppercase transition-colors"
                                >
                                    <Send size={16} />
                                    GỬI YÊU CẦU
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* Map placeholder */}
            <section className="h-[500px] bg-[#0a0a0a] relative overflow-hidden border-t border-white/5">
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center p-8 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
                        <MapPin size={48} className="text-[#c8a45c] mx-auto mb-4 opacity-50" />
                        <p className="text-white/40 text-[14px] font-light">
                            Bản đồ vệ tinh khu vực công ty (Đang tải...)
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}
