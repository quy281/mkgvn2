"use client";

import { useState, useEffect } from "react";
import { Save, CheckCircle, Globe, Phone, Mail, MapPin, Info } from "lucide-react";
import { companyInfo } from "@/data/site-data";

type Settings = {
    name: string;
    slogan: string;
    description: string;
    hotline: string;
    email: string;
    address: string;
    facebook: string;
    youtube: string;
    zalo: string;
    googleMapsEmbed: string;
    metaTitle: string;
    metaDescription: string;
    workingHours: string;
};

const DEFAULT_SETTINGS: Settings = {
    name: companyInfo.name,
    slogan: companyInfo.slogan,
    description: companyInfo.description,
    hotline: companyInfo.contact.hotline,
    email: companyInfo.contact.email,
    address: companyInfo.contact.addresses[0],
    facebook: "https://www.facebook.com/MinhKhueGroup",
    youtube: "https://www.youtube.com/@minhkhuegroup",
    zalo: "https://zalo.me/minhkhue",
    googleMapsEmbed: "https://maps.google.com/maps?q=MINH+KHUE+GROUP",
    metaTitle: "MINH KHUÊ GROUP | Kiến trúc & Nội thất cao cấp",
    metaDescription: "Công ty TNHH Kiến trúc và Nội thất Minh Khuê - Nâng tầm không gian sống.",
    workingHours: "T2–T6: 7H30–17H30 | T7: 8H00–12H00",
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div className="rounded-xl overflow-hidden" style={{ background: "#1a1a1a", border: "1px solid rgba(255,255,255,0.06)" }}>
            <div className="px-5 py-4 border-b" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
                <h2 className="text-[13px] font-semibold text-white/60">{title}</h2>
            </div>
            <div className="p-5 space-y-4">{children}</div>
        </div>
    );
}

function Field({ label, description, children }: { label: string; description?: string; children: React.ReactNode }) {
    return (
        <div className="grid sm:grid-cols-3 gap-4 items-start py-3 border-b last:border-0" style={{ borderColor: "rgba(255,255,255,0.04)" }}>
            <div>
                <p className="text-[12px] font-medium text-white/55">{label}</p>
                {description && <p className="text-[11px] text-white/25 mt-0.5">{description}</p>}
            </div>
            <div className="sm:col-span-2">{children}</div>
        </div>
    );
}

const inputClass = "w-full px-3 py-2 text-[13px] text-white/60 rounded-lg outline-none focus:ring-1 focus:ring-[#c8a45c] transition-all";
const inputStyle = { background: "#111", border: "1px solid rgba(255,255,255,0.08)" };

export default function CaiDatPage() {
    const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
    const [saved, setSaved] = useState(false);
    const [activeTab, setActiveTab] = useState<"general" | "contact" | "social" | "seo">("general");

    useEffect(() => {
        const s = localStorage.getItem("mkg_settings");
        if (s) setSettings(JSON.parse(s));
    }, []);

    const handleSave = () => {
        localStorage.setItem("mkg_settings", JSON.stringify(settings));
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    const f = (key: keyof Settings) => ({
        value: settings[key],
        onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
            setSettings(s => ({ ...s, [key]: e.target.value })),
    });

    const TABS = [
        { id: "general", label: "Thông tin chung", icon: Info },
        { id: "contact", label: "Liên hệ", icon: Phone },
        { id: "social", label: "Mạng xã hội", icon: Globe },
        { id: "seo", label: "SEO", icon: Globe },
    ] as const;

    return (
        <div className="max-w-3xl space-y-5">
            {saved && (
                <div className="fixed top-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-xl text-[13px] font-medium" style={{ background: "#1a2e1a", border: "1px solid #4ade8040", color: "#4ade80" }}>
                    <CheckCircle size={15} /> Đã lưu cài đặt!
                </div>
            )}

            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-[18px] font-bold text-white">Cài đặt</h1>
                    <p className="text-[12px] text-white/30 mt-0.5">Quản lý thông tin và tuỳ chọn website</p>
                </div>
                <button
                    onClick={handleSave}
                    className="flex items-center gap-2 px-5 py-2.5 text-[12px] font-bold rounded-lg hover:opacity-90 transition-all"
                    style={{ background: "#c8a45c", color: "#000" }}
                >
                    <Save size={14} /> Lưu cài đặt
                </button>
            </div>

            {/* Tab navigation */}
            <div className="flex gap-1 p-1 rounded-xl" style={{ background: "#1a1a1a", border: "1px solid rgba(255,255,255,0.06)" }}>
                {TABS.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className="flex-1 flex items-center justify-center gap-2 py-2 text-[12px] font-medium rounded-lg transition-all"
                        style={{
                            background: activeTab === tab.id ? "#c8a45c" : "transparent",
                            color: activeTab === tab.id ? "#000" : "rgba(255,255,255,0.4)",
                        }}
                    >
                        <tab.icon size={13} />
                        <span className="hidden sm:block">{tab.label}</span>
                    </button>
                ))}
            </div>

            {/* Tab content */}
            {activeTab === "general" && (
                <Section title="Thông tin chung">
                    <Field label="Tên công ty" description="Hiển thị trên toàn website">
                        <input {...f("name")} className={inputClass} style={inputStyle} />
                    </Field>
                    <Field label="Slogan" description="Câu tagline xuất hiện ở header/footer">
                        <input {...f("slogan")} className={inputClass} style={inputStyle} />
                    </Field>
                    <Field label="Mô tả" description="Giới thiệu ngắn về công ty">
                        <textarea {...f("description")} rows={4} className={inputClass + " resize-none"} style={inputStyle} />
                    </Field>
                    <Field label="Giờ làm việc">
                        <input {...f("workingHours")} className={inputClass} style={inputStyle} placeholder="T2–T6: 7H30–17H30" />
                    </Field>
                </Section>
            )}

            {activeTab === "contact" && (
                <Section title="Thông tin liên hệ">
                    <Field label="Hotline" description="Số điện thoại chính">
                        <input {...f("hotline")} className={inputClass} style={inputStyle} placeholder="028 7303 2879" />
                    </Field>
                    <Field label="Email">
                        <input {...f("email")} type="email" className={inputClass} style={inputStyle} />
                    </Field>
                    <Field label="Địa chỉ văn phòng">
                        <input {...f("address")} className={inputClass} style={inputStyle} />
                    </Field>
                    <Field label="Google Maps Embed URL" description="URL từ Google Maps > Chia sẻ > Nhúng bản đồ">
                        <textarea {...f("googleMapsEmbed")} rows={3} className={inputClass + " resize-none"} style={inputStyle} />
                    </Field>
                </Section>
            )}

            {activeTab === "social" && (
                <Section title="Mạng xã hội">
                    <Field label="Facebook Page URL">
                        <input {...f("facebook")} className={inputClass} style={inputStyle} placeholder="https://facebook.com/..." />
                    </Field>
                    <Field label="YouTube Channel URL">
                        <input {...f("youtube")} className={inputClass} style={inputStyle} placeholder="https://youtube.com/..." />
                    </Field>
                    <Field label="Zalo OA URL">
                        <input {...f("zalo")} className={inputClass} style={inputStyle} placeholder="https://zalo.me/..." />
                    </Field>
                </Section>
            )}

            {activeTab === "seo" && (
                <Section title="SEO & Meta">
                    <Field label="Tiêu đề trang (Meta Title)" description="Hiển thị trên tab trình duyệt, ~60 ký tự">
                        <input {...f("metaTitle")} className={inputClass} style={inputStyle} maxLength={70} />
                        <p className="text-[10px] text-white/20 mt-1">{settings.metaTitle.length}/70 ký tự</p>
                    </Field>
                    <Field label="Mô tả trang (Meta Description)" description="Hiển thị kết quả Google, ~160 ký tự">
                        <textarea {...f("metaDescription")} rows={3} className={inputClass + " resize-none"} style={inputStyle} maxLength={170} />
                        <p className="text-[10px] text-white/20 mt-1">{settings.metaDescription.length}/170 ký tự</p>
                    </Field>

                    {/* SEO preview */}
                    <div className="mt-4 p-4 rounded-lg" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                        <p className="text-[10px] tracking-widest uppercase text-white/20 mb-3">Xem trước Google</p>
                        <div className="space-y-1">
                            <p className="text-[13px] text-blue-400">🔗 https://mkg.vn</p>
                            <p className="text-[15px] text-[#1a73e8] font-medium">{settings.metaTitle}</p>
                            <p className="text-[13px] text-white/35 leading-relaxed">{settings.metaDescription}</p>
                        </div>
                    </div>
                </Section>
            )}

            {/* Danger zone */}
            <div className="rounded-xl p-5" style={{ background: "#1a1a1a", border: "1px solid rgba(239,68,68,0.15)" }}>
                <h3 className="text-[13px] font-semibold text-red-400 mb-3">Vùng nguy hiểm</h3>
                <p className="text-[12px] text-white/35 mb-4">Các hành động bên dưới không thể hoàn tác. Thực hiện cẩn thận.</p>
                <button
                    onClick={() => {
                        if (confirm("Reset tất cả dữ liệu về mặc định?")) {
                            localStorage.removeItem("mkg_posts");
                            localStorage.removeItem("mkg_projects");
                            localStorage.removeItem("mkg_images");
                            localStorage.removeItem("mkg_settings");
                            setSettings(DEFAULT_SETTINGS);
                        }
                    }}
                    className="px-4 py-2 rounded-lg text-[12px] text-red-400 font-medium transition-all"
                    style={{ border: "1px solid rgba(239,68,68,0.2)", background: "rgba(239,68,68,0.05)" }}
                >
                    🗑 Reset dữ liệu về mặc định
                </button>
            </div>
        </div>
    );
}
