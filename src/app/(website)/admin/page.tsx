"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
    FileText, FolderOpen, Image as ImageIcon, TrendingUp, Eye,
    Plus, ArrowUpRight, Clock, CheckCircle, AlertCircle
} from "lucide-react";
import { projects as seedProjects, blogPosts as seedBlogs } from "@/data/site-data";

function StatCard({ icon: Icon, label, value, change, color }: { icon: any; label: string; value: string | number; change?: string; color: string }) {
    return (
        <div className="rounded-xl p-5" style={{ background: "#1a1a1a", border: "1px solid rgba(255,255,255,0.06)" }}>
            <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: `${color}15` }}>
                    <Icon size={18} style={{ color }} />
                </div>
                {change && (
                    <span className="text-[11px] font-medium px-2 py-0.5 rounded-full" style={{ background: "#16a34a20", color: "#4ade80" }}>
                        {change}
                    </span>
                )}
            </div>
            <div className="text-2xl font-bold text-white mb-1">{value}</div>
            <div className="text-[12px] text-white/35">{label}</div>
        </div>
    );
}

export default function AdminDashboard() {
    const [posts, setPosts] = useState<any[]>([]);
    const [projects, setProjects] = useState<any[]>([]);
    const [images, setImages] = useState<any[]>([]);

    useEffect(() => {
        const savedPosts = localStorage.getItem("mkg_posts");
        const savedProjects = localStorage.getItem("mkg_projects");
        const savedImages = localStorage.getItem("mkg_images");

        setPosts(savedPosts ? JSON.parse(savedPosts) : seedBlogs.map(b => ({ ...b, status: "published" })));
        setProjects(savedProjects ? JSON.parse(savedProjects) : seedProjects.map(p => ({ ...p, status: "published" })));
        setImages(savedImages ? JSON.parse(savedImages) : []);
    }, []);

    const publishedPosts = posts.filter(p => p.status === "published").length;
    const draftPosts = posts.filter(p => p.status === "draft").length;

    const recentActivity = [
        ...posts.slice(0, 3).map(p => ({ type: "post", title: p.title, time: p.date, status: p.status })),
        ...projects.slice(0, 2).map(p => ({ type: "project", title: p.title, time: "2024-07-01", status: p.status })),
    ].slice(0, 5);

    const quickStats = [
        { icon: FileText, label: "Tổng bài viết", value: posts.length, change: "+2 tuần này", color: "#c8a45c" },
        { icon: FolderOpen, label: "Tổng dự án", value: projects.length, change: "+1 tháng này", color: "#60a5fa" },
        { icon: ImageIcon, label: "Hình ảnh", value: images.length, change: undefined, color: "#a78bfa" },
        { icon: Eye, label: "Đã đăng", value: publishedPosts + projects.filter(p => p.status === "published").length, change: undefined, color: "#34d399" },
    ];

    return (
        <div className="space-y-6">
            {/* Welcome */}
            <div className="rounded-xl p-6 relative overflow-hidden" style={{ background: "linear-gradient(135deg,#1a1408,#211b0a)", border: "1px solid rgba(200,164,92,0.2)" }}>
                <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-5" style={{ background: "#c8a45c", filter: "blur(60px)" }} />
                <h2 className="text-xl font-bold text-white mb-1" style={{ fontFamily: "'Playfair Display',serif" }}>
                    Chào mừng trở lại, <span style={{ color: "#c8a45c" }}>Admin</span> 👋
                </h2>
                <p className="text-white/40 text-[13px] mb-5">Quản lý nội dung website MKG.VN tại đây</p>
                <div className="flex flex-wrap gap-3">
                    <Link href="/admin/bai-viet/moi" className="flex items-center gap-2 px-4 py-2 text-[12px] font-semibold tracking-wide rounded-lg transition-all hover:opacity-90" style={{ background: "#c8a45c", color: "#000" }}>
                        <Plus size={14} /> Bài viết mới
                    </Link>
                    <Link href="/admin/du-an/moi" className="flex items-center gap-2 px-4 py-2 text-[12px] font-semibold tracking-wide rounded-lg transition-all" style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.7)", border: "1px solid rgba(255,255,255,0.1)" }}>
                        <Plus size={14} /> Dự án mới
                    </Link>
                    <Link href="/" target="_blank" className="flex items-center gap-2 px-4 py-2 text-[12px] font-semibold tracking-wide rounded-lg transition-all" style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.4)", border: "1px solid rgba(255,255,255,0.06)" }}>
                        <Eye size={14} /> Xem website
                    </Link>
                </div>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {quickStats.map((s, i) => (
                    <StatCard key={i} {...s} />
                ))}
            </div>

            {/* Two columns: recent + quick links */}
            <div className="grid lg:grid-cols-3 gap-6">

                {/* Recent activity */}
                <div className="lg:col-span-2 rounded-xl" style={{ background: "#1a1a1a", border: "1px solid rgba(255,255,255,0.06)" }}>
                    <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
                        <h3 className="text-[14px] font-semibold text-white/70">Nội dung gần đây</h3>
                        <TrendingUp size={16} className="text-white/20" />
                    </div>
                    <div className="divide-y" style={{ borderColor: "rgba(255,255,255,0.04)" }}>
                        {recentActivity.map((item, i) => (
                            <div key={i} className="flex items-center gap-4 px-5 py-3.5">
                                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: item.type === "post" ? "rgba(200,164,92,0.1)" : "rgba(96,165,250,0.1)" }}>
                                    {item.type === "post"
                                        ? <FileText size={14} style={{ color: "#c8a45c" }} />
                                        : <FolderOpen size={14} style={{ color: "#60a5fa" }} />
                                    }
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-[13px] text-white/70 truncate">{item.title}</p>
                                    <div className="flex items-center gap-2 mt-0.5">
                                        <Clock size={10} className="text-white/20" />
                                        <span className="text-[11px] text-white/25">{new Date(item.time).toLocaleDateString("vi-VN")}</span>
                                    </div>
                                </div>
                                <span
                                    className="flex-shrink-0 text-[10px] font-semibold px-2 py-0.5 rounded-full"
                                    style={{
                                        background: item.status === "published" ? "#16a34a20" : "#92400e20",
                                        color: item.status === "published" ? "#4ade80" : "#fbbf24",
                                    }}
                                >
                                    {item.status === "published" ? "Đã đăng" : "Nháp"}
                                </span>
                            </div>
                        ))}
                        {recentActivity.length === 0 && (
                            <p className="text-center text-white/25 text-[13px] py-8">Chưa có nội dung</p>
                        )}
                    </div>
                </div>

                {/* Quick links */}
                <div className="space-y-4">
                    <div className="rounded-xl" style={{ background: "#1a1a1a", border: "1px solid rgba(255,255,255,0.06)" }}>
                        <div className="px-5 py-4 border-b" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
                            <h3 className="text-[14px] font-semibold text-white/70">Truy cập nhanh</h3>
                        </div>
                        <div className="p-3 space-y-1">
                            {[
                                { href: "/admin/bai-viet", label: "Quản lý bài viết", icon: FileText, count: posts.length },
                                { href: "/admin/du-an", label: "Quản lý dự án", icon: FolderOpen, count: projects.length },
                                { href: "/admin/hinh-anh", label: "Thư viện ảnh", icon: ImageIcon, count: images.length },
                                { href: "/admin/cai-dat", label: "Cài đặt website", icon: AlertCircle, count: null },
                            ].map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group"
                                    style={{ color: "rgba(255,255,255,0.45)" }}
                                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)"; }}
                                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                                >
                                    <item.icon size={15} />
                                    <span className="text-[13px] flex-1">{item.label}</span>
                                    {item.count !== null && (
                                        <span className="text-[11px] text-white/20">{item.count}</span>
                                    )}
                                    <ArrowUpRight size={13} className="opacity-0 group-hover:opacity-100 transition-opacity text-[#c8a45c]" />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Status summary */}
                    <div className="rounded-xl p-5" style={{ background: "#1a1a1a", border: "1px solid rgba(255,255,255,0.06)" }}>
                        <h3 className="text-[13px] font-semibold text-white/50 mb-4">Trạng thái bài viết</h3>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                    <CheckCircle size={13} className="text-green-400" />
                                    <span className="text-[12px] text-white/50">Đã đăng</span>
                                </div>
                                <span className="text-[13px] font-semibold text-white/70">{publishedPosts}</span>
                            </div>
                            <div className="w-full rounded-full overflow-hidden" style={{ height: "4px", background: "rgba(255,255,255,0.06)" }}>
                                <div className="h-full rounded-full bg-green-400" style={{ width: posts.length ? `${(publishedPosts / posts.length) * 100}%` : "0%" }} />
                            </div>
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                    <Clock size={13} className="text-yellow-400" />
                                    <span className="text-[12px] text-white/50">Bản nháp</span>
                                </div>
                                <span className="text-[13px] font-semibold text-white/70">{draftPosts}</span>
                            </div>
                            <div className="w-full rounded-full overflow-hidden" style={{ height: "4px", background: "rgba(255,255,255,0.06)" }}>
                                <div className="h-full rounded-full bg-yellow-400" style={{ width: posts.length ? `${(draftPosts / posts.length) * 100}%` : "0%" }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

