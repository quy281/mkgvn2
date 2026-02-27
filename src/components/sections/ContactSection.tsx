"use client";

import { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactSection() {
    const [formData, setFormData] = useState({ name: "", email: "", services: "", message: "" });
    const [sent, setSent] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSent(true);
        setTimeout(() => setSent(false), 4000);
        setFormData({ name: "", email: "", services: "", message: "" });
    };

    return (
        <section className="py-24 lg:py-32 bg-[#0e0e0e] relative">
            <div className="section-container">

                <div className="text-center mb-16">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <span className="text-[#c8a45c] text-[12px] font-bold tracking-[0.2em] uppercase">BẮT ĐẦU DỰ ÁN</span>
                        <div className="w-12 h-px bg-[#c8a45c]/50" />
                    </div>
                    <h2
                        className="text-5xl lg:text-7xl font-bold text-white uppercase leading-[1.1]"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                        SÁNG TẠO <span className="italic font-light text-[#c8a45c]">CÙNG MKG</span>
                    </h2>
                </div>

                <div className="grid lg:grid-cols-12 gap-16">

                    {/* Left Form */}
                    <div className="lg:col-span-7">
                        {sent ? (
                            <div className="h-full min-h-[400px] flex flex-col items-center justify-center bg-[#141414] border border-[#c8a45c]/20 p-12 text-center">
                                <div className="w-20 h-20 rounded-full bg-[#c8a45c]/10 flex items-center justify-center mb-6 text-[#c8a45c]">
                                    <Mail size={40} />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                                    Chân thành cảm ơn!
                                </h3>
                                <p className="text-white/60 text-[15px]">
                                    Thông tin của bạn đã được gửi. Đội ngũ MKG sẽ liên hệ tư vấn trong thời gian sớm nhất.
                                </p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="bg-[#141414] p-8 md:p-12 border border-white/5">
                                <div className="grid md:grid-cols-2 gap-6 mb-6">
                                    <div>
                                        <input
                                            type="text"
                                            placeholder="Tên của bạn *"
                                            required
                                            value={formData.name}
                                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full bg-[#0a0a0a] border border-white/10 text-white px-6 py-4 text-[13px] outline-none focus:border-[#c8a45c] transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <input
                                            type="email"
                                            placeholder="Email *"
                                            required
                                            value={formData.email}
                                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full bg-[#0a0a0a] border border-white/10 text-white px-6 py-4 text-[13px] outline-none focus:border-[#c8a45c] transition-colors"
                                        />
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <input
                                        type="text"
                                        placeholder="Dịch vụ quan tâm (Thiết kế / Thi công /...)"
                                        value={formData.services}
                                        onChange={e => setFormData({ ...formData, services: e.target.value })}
                                        className="w-full bg-[#0a0a0a] border border-white/10 text-white px-6 py-4 text-[13px] outline-none focus:border-[#c8a45c] transition-colors"
                                    />
                                </div>

                                <div className="mb-8">
                                    <textarea
                                        placeholder="Giới thiệu về dự án của bạn..."
                                        rows={5}
                                        value={formData.message}
                                        onChange={e => setFormData({ ...formData, message: e.target.value })}
                                        className="w-full bg-[#0a0a0a] border border-white/10 text-white px-6 py-4 text-[13px] outline-none focus:border-[#c8a45c] transition-colors resize-none"
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    className="bg-[#c8a45c] text-black font-bold tracking-[0.2em] uppercase text-[12px] px-12 py-5 hover:bg-white transition-colors duration-300 w-full sm:w-auto"
                                >
                                    GỬI YÊU CẦU NGAY
                                </button>
                            </form>
                        )}
                    </div>

                    {/* Right Info */}
                    <div className="lg:col-span-5 flex flex-col justify-center">

                        <div className="mb-12">
                            <h4 className="text-[11px] font-bold tracking-widest text-[#c8a45c] uppercase mb-4">LIÊN HỆ TRỰC TIẾP</h4>
                            <p className="text-[24px] lg:text-[32px] text-white leading-tight font-bold" style={{ fontFamily: "'Inter', sans-serif" }}>
                                <a href="tel:0932084444" className="hover:text-[#c8a45c] transition-colors block">0932 084 444</a>
                                <a href="tel:0934389181" className="hover:text-[#c8a45c] transition-colors block text-white/50">0934 389 181</a>
                            </p>
                        </div>

                        <div className="mb-12">
                            <h4 className="text-[11px] font-bold tracking-widest text-[#c8a45c] uppercase mb-4">EMAIL HỖ TRỢ</h4>
                            <a href="mailto:fadifurnitures@gmail.com" className="text-[20px] lg:text-[24px] text-white hover:text-[#c8a45c] transition-colors border-b border-white/30 hover:border-[#c8a45c] pb-1">
                                fadifurnitures@gmail.com
                            </a>
                        </div>

                        <div>
                            <h4 className="text-[11px] font-bold tracking-widest text-[#c8a45c] uppercase mb-4">ĐỊA CHỈ</h4>
                            <div className="space-y-4">
                                <div className="flex gap-4">
                                    <MapPin className="text-[#c8a45c] flex-shrink-0 mt-1" size={18} />
                                    <div>
                                        <p className="text-white text-[15px] font-bold mb-1">Văn phòng đại diện</p>
                                        <p className="text-white/50 text-[14px]">Số 8 đường 79, Phường Tân Quy, Quận 7, TP.HCM</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </section>
    );
}
