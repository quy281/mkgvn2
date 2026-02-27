"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
    Plus, Search, Filter, Edit2, Trash2, Eye, ArrowLeft, FileText,
    Save, X, AlertTriangle, CheckCircle, ChevronDown
} from "lucide-react";
import { blogPosts as seedBlogs } from "@/data/site-data";

interface Post {
    id: number | string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    category: string;
    featuredImage: string;
    author: string;
    date: string;
    status: "published" | "draft";
}

const CATEGORIES = ["Tin tức", "Mẫu thiết kế", "Kiến thức", "Dự án"];

function slugify(text: string) {
    return text.toLowerCase()
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        .replace(/đ/g, "d").replace(/[^a-z0-9\s-]/g, "")
        .trim().replace(/\s+/g, "-");
}

/* ═══════════════════ POST FORM ═══════════════════ */
function PostForm({ post, onSave, onCancel }: { post?: Post; onSave: (p: Post) => void; onCancel: () => void }) {
    const [form, setForm] = useState<Post>(post || {
        id: Date.now(), title: "", slug: "", excerpt: "", content: "",
        category: "Tin tức", featuredImage: "", author: "Admin",
        date: new Date().toISOString().split("T")[0], status: "draft",
    });
    const [saved, setSaved] = useState(false);

    const handleTitleChange = (title: string) => {
        setForm(f => ({ ...f, title, slug: post ? f.slug : slugify(title) }));
    };

    const handleSubmit = (e: React.FormEvent, status?: "published" | "draft") => {
        e.preventDefault();
        const final = { ...form, status: status || form.status };
        onSave(final);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex items-center gap-3 mb-2">
                <button type="button" onClick={onCancel} className="flex items-center gap-1.5 text-[12px] text-white/40 hover:text-white/70 transition-colors">
                    <ArrowLeft size={14} /> Quay lại
                </button>
                <span className="text-white/15">/</span>
                <span className="text-[13px] text-white/50">{post ? "Chỉnh sửa bài viết" : "Tạo bài viết mới"}</span>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                {/* Main content */}
                <div className="lg:col-span-2 space-y-4">
                    <div className="rounded-xl p-5 space-y-4" style={{ background: "#1a1a1a", border: "1px solid rgba(255,255,255,0.06)" }}>
                        <div>
                            <label className="text-[11px] tracking-widest uppercase text-white/35 block mb-1.5">Tiêu đề *</label>
                            <input
                                type="text" value={form.title} required
                                onChange={e => handleTitleChange(e.target.value)}
                                placeholder="Nhập tiêu đề bài viết..."
                                className="w-full px-4 py-3 text-[15px] font-semibold text-white bg-transparent border-0 border-b outline-none focus:border-[#c8a45c] transition-colors"
                                style={{ borderColor: "rgba(255,255,255,0.08)" }}
                            />
                        </div>
                        <div>
                            <label className="text-[11px] tracking-widest uppercase text-white/35 block mb-1.5">Slug URL</label>
                            <input
                                type="text" value={form.slug}
                                onChange={e => setForm(f => ({ ...f, slug: e.target.value }))}
                                placeholder="duong-dan-bai-viet"
                                className="w-full px-3 py-2 text-[12px] text-white/50 rounded-lg outline-none focus:border-[#c8a45c] transition-colors"
                                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
                            />
                        </div>
                        <div>
                            <label className="text-[11px] tracking-widest uppercase text-white/35 block mb-1.5">Tóm tắt</label>
                            <textarea
                                value={form.excerpt} rows={2}
                                onChange={e => setForm(f => ({ ...f, excerpt: e.target.value }))}
                                placeholder="Mô tả ngắn gọn bài viết..."
                                className="w-full px-3 py-2.5 text-[13px] text-white/60 rounded-lg outline-none focus:border-[#c8a45c] transition-colors resize-none"
                                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
                            />
                        </div>
                    </div>

                    {/* Content editor */}
                    <div className="rounded-xl overflow-hidden" style={{ background: "#1a1a1a", border: "1px solid rgba(255,255,255,0.06)" }}>
                        <div className="flex items-center gap-2 px-4 py-3 border-b" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
                            <span className="text-[11px] tracking-widest uppercase text-white/35">Nội dung bài viết</span>
                        </div>
                        <textarea
                            value={form.content} rows={16}
                            onChange={e => setForm(f => ({ ...f, content: e.target.value }))}
                            placeholder="Nhập nội dung bài viết... (hỗ trợ Markdown)"
                            className="w-full px-5 py-4 text-[14px] text-white/60 leading-relaxed outline-none resize-none"
                            style={{ background: "transparent", fontFamily: "'Courier New',monospace" }}
                        />
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-4">
                    {/* Publish */}
                    <div className="rounded-xl p-5 space-y-4" style={{ background: "#1a1a1a", border: "1px solid rgba(255,255,255,0.06)" }}>
                        <h3 className="text-[13px] font-semibold text-white/60">Đăng bài</h3>
                        <div>
                            <label className="text-[11px] tracking-widest uppercase text-white/35 block mb-1.5">Trạng thái</label>
                            <select
                                value={form.status}
                                onChange={e => setForm(f => ({ ...f, status: e.target.value as any }))}
                                className="w-full px-3 py-2 text-[13px] text-white/60 rounded-lg outline-none"
                                style={{ background: "#111", border: "1px solid rgba(255,255,255,0.1)" }}
                            >
                                <option value="draft">Bản nháp</option>
                                <option value="published">Đã đăng</option>
                            </select>
                        </div>
                        <div>
                            <label className="text-[11px] tracking-widest uppercase text-white/35 block mb-1.5">Ngày đăng</label>
                            <input
                                type="date" value={form.date}
                                onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
                                className="w-full px-3 py-2 text-[13px] text-white/60 rounded-lg outline-none"
                                style={{ background: "#111", border: "1px solid rgba(255,255,255,0.1)" }}
                            />
                        </div>
                        <div>
                            <label className="text-[11px] tracking-widest uppercase text-white/35 block mb-1.5">Tác giả</label>
                            <input
                                type="text" value={form.author}
                                onChange={e => setForm(f => ({ ...f, author: e.target.value }))}
                                className="w-full px-3 py-2 text-[13px] text-white/60 rounded-lg outline-none"
                                style={{ background: "#111", border: "1px solid rgba(255,255,255,0.1)" }}
                            />
                        </div>
                        <div className="flex flex-col gap-2 pt-2">
                            <button
                                type="submit" onClick={(e) => handleSubmit(e, "published")}
                                className="w-full py-2.5 text-[12px] tracking-widest uppercase font-bold transition-all hover:opacity-90 rounded-lg"
                                style={{ background: "#c8a45c", color: "#000" }}
                            >
                                {saved ? "✓ Đã lưu!" : "Đăng bài"}
                            </button>
                            <button
                                type="button" onClick={(e) => { handleSubmit(e as any, "draft"); }}
                                className="w-full py-2.5 text-[12px] tracking-widest uppercase font-semibold rounded-lg transition-all"
                                style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.5)" }}
                            >
                                Lưu nháp
                            </button>
                        </div>
                    </div>

                    {/* Category */}
                    <div className="rounded-xl p-5" style={{ background: "#1a1a1a", border: "1px solid rgba(255,255,255,0.06)" }}>
                        <h3 className="text-[13px] font-semibold text-white/60 mb-3">Danh mục</h3>
                        <div className="space-y-2">
                            {CATEGORIES.map(cat => (
                                <label key={cat} className="flex items-center gap-2.5 cursor-pointer group">
                                    <input
                                        type="radio" name="category" value={cat}
                                        checked={form.category === cat}
                                        onChange={() => setForm(f => ({ ...f, category: cat }))}
                                        className="accent-[#c8a45c]"
                                    />
                                    <span className="text-[13px] text-white/50 group-hover:text-white/70 transition-colors">{cat}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Featured image */}
                    <div className="rounded-xl p-5" style={{ background: "#1a1a1a", border: "1px solid rgba(255,255,255,0.06)" }}>
                        <h3 className="text-[13px] font-semibold text-white/60 mb-3">Ảnh đại diện</h3>
                        <input
                            type="text" value={form.featuredImage}
                            onChange={e => setForm(f => ({ ...f, featuredImage: e.target.value }))}
                            placeholder="/images/blog/ten-anh.jpg"
                            className="w-full px-3 py-2 text-[12px] text-white/40 rounded-lg outline-none"
                            style={{ background: "#111", border: "1px solid rgba(255,255,255,0.1)" }}
                        />
                        {form.featuredImage && (
                            <div className="mt-3 rounded-lg overflow-hidden aspect-video relative">
                                <img src={form.featuredImage} alt="preview" className="w-full h-full object-cover" onError={e => { (e.target as any).style.display = "none" }} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </form>
    );
}

/* ═══════════════════ MAIN PAGE ═══════════════════ */
export default function BaiVietPage() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [view, setView] = useState<"list" | "edit" | "create">("list");
    const [editingPost, setEditingPost] = useState<Post | undefined>();
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");
    const [deleteConfirm, setDeleteConfirm] = useState<number | string | null>(null);
    const [toast, setToast] = useState("");

    useEffect(() => {
        const saved = localStorage.getItem("mkg_posts");
        setPosts(saved ? JSON.parse(saved) : seedBlogs.map(b => ({ ...b, status: "published" })));
    }, []);

    const savePosts = (updated: Post[]) => {
        setPosts(updated);
        localStorage.setItem("mkg_posts", JSON.stringify(updated));
    };

    const showToast = (msg: string) => {
        setToast(msg);
        setTimeout(() => setToast(""), 3000);
    };

    const handleSave = (post: Post) => {
        let updated: Post[];
        if (editingPost) {
            updated = posts.map(p => p.id === post.id ? post : p);
            showToast("✓ Đã cập nhật bài viết");
        } else {
            updated = [post, ...posts];
            showToast("✓ Đã tạo bài viết mới");
        }
        savePosts(updated);
        setView("list");
        setEditingPost(undefined);
    };

    const handleDelete = (id: number | string) => {
        const updated = posts.filter(p => p.id !== id);
        savePosts(updated);
        setDeleteConfirm(null);
        showToast("Đã xoá bài viết");
    };

    const handleToggleStatus = (id: number | string) => {
        const updated = posts.map(p =>
            p.id === id ? { ...p, status: (p.status === "published" ? "draft" : "published") as any } : p
        );
        savePosts(updated);
    };

    const filtered = posts
        .filter(p => filterStatus === "all" || p.status === filterStatus)
        .filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase()) || p.category.toLowerCase().includes(searchTerm.toLowerCase()));

    if (view === "create" || view === "edit") {
        return (
            <PostForm
                post={editingPost}
                onSave={handleSave}
                onCancel={() => { setView("list"); setEditingPost(undefined); }}
            />
        );
    }

    return (
        <div className="space-y-5">
            {/* Toast */}
            {toast && (
                <div className="fixed top-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-xl shadow-2xl text-[13px] font-medium" style={{ background: "#1a2e1a", border: "1px solid #4ade8040", color: "#4ade80" }}>
                    <CheckCircle size={15} /> {toast}
                </div>
            )}

            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-[18px] font-bold text-white">Bài viết</h1>
                    <p className="text-[12px] text-white/30 mt-0.5">{posts.length} bài viết tổng cộng</p>
                </div>
                <button
                    onClick={() => { setEditingPost(undefined); setView("create"); }}
                    className="flex items-center gap-2 px-4 py-2.5 text-[12px] font-semibold rounded-lg transition-all hover:opacity-90"
                    style={{ background: "#c8a45c", color: "#000" }}
                >
                    <Plus size={15} /> Tạo bài viết
                </button>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-3 items-center">
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg flex-1 min-w-[200px]" style={{ background: "#1a1a1a", border: "1px solid rgba(255,255,255,0.07)" }}>
                    <Search size={14} className="text-white/25 flex-shrink-0" />
                    <input
                        type="text" value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        placeholder="Tìm kiếm bài viết..."
                        className="bg-transparent outline-none text-[13px] text-white/60 w-full"
                    />
                </div>
                <div className="flex rounded-lg overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.07)" }}>
                    {[["all", "Tất cả"], ["published", "Đã đăng"], ["draft", "Nháp"]].map(([val, label]) => (
                        <button
                            key={val}
                            onClick={() => setFilterStatus(val)}
                            className="px-4 py-2 text-[12px] font-medium transition-all"
                            style={{
                                background: filterStatus === val ? "#c8a45c" : "#1a1a1a",
                                color: filterStatus === val ? "#000" : "rgba(255,255,255,0.4)",
                            }}
                        >
                            {label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Table */}
            <div className="rounded-xl overflow-hidden" style={{ background: "#1a1a1a", border: "1px solid rgba(255,255,255,0.06)" }}>
                <table className="w-full">
                    <thead>
                        <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                            {["Tiêu đề", "Danh mục", "Ngày đăng", "Trạng thái", "Hành động"].map(h => (
                                <th key={h} className="px-5 py-3.5 text-left text-[11px] tracking-widest uppercase text-white/25 font-medium">
                                    {h}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y" style={{ borderColor: "rgba(255,255,255,0.03)" }}>
                        {filtered.map(post => (
                            <tr key={post.id} className="group hover:bg-white/[0.02] transition-colors">
                                <td className="px-5 py-4">
                                    <p className="text-[13px] font-medium text-white/70 line-clamp-1">{post.title}</p>
                                    <p className="text-[11px] text-white/25 mt-0.5">/tin-tuc/{post.slug}</p>
                                </td>
                                <td className="px-5 py-4">
                                    <span className="text-[11px] px-2.5 py-1 rounded-full" style={{ background: "rgba(200,164,92,0.1)", color: "#c8a45c" }}>
                                        {post.category}
                                    </span>
                                </td>
                                <td className="px-5 py-4 text-[12px] text-white/35">
                                    {new Date(post.date).toLocaleDateString("vi-VN")}
                                </td>
                                <td className="px-5 py-4">
                                    <button
                                        onClick={() => handleToggleStatus(post.id)}
                                        className="flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-full transition-all cursor-pointer"
                                        style={{
                                            background: post.status === "published" ? "#16a34a20" : "#92400e20",
                                            color: post.status === "published" ? "#4ade80" : "#fbbf24",
                                        }}
                                    >
                                        {post.status === "published" ? <CheckCircle size={10} /> : <AlertTriangle size={10} />}
                                        {post.status === "published" ? "Đã đăng" : "Nháp"}
                                    </button>
                                </td>
                                <td className="px-5 py-4">
                                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Link
                                            href={`/tin-tuc/${post.slug}`} target="_blank"
                                            className="p-1.5 rounded-lg text-white/30 hover:text-white/60 hover:bg-white/05 transition-all"
                                            title="Xem"
                                        >
                                            <Eye size={14} />
                                        </Link>
                                        <button
                                            onClick={() => { setEditingPost(post); setView("edit"); }}
                                            className="p-1.5 rounded-lg text-white/30 hover:text-[#c8a45c] hover:bg-white/05 transition-all"
                                            title="Chỉnh sửa"
                                        >
                                            <Edit2 size={14} />
                                        </button>
                                        <button
                                            onClick={() => setDeleteConfirm(post.id)}
                                            className="p-1.5 rounded-lg text-white/30 hover:text-red-400 hover:bg-red-400/10 transition-all"
                                            title="Xoá"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {filtered.length === 0 && (
                    <div className="text-center py-16 text-white/25">
                        <FileText size={32} className="mx-auto mb-3 opacity-30" />
                        <p className="text-[14px]">Không tìm thấy bài viết nào</p>
                    </div>
                )}
            </div>

            {/* Delete confirm modal */}
            {deleteConfirm !== null && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                    <div className="rounded-2xl p-6 w-full max-w-sm mx-4" style={{ background: "#1a1a1a", border: "1px solid rgba(255,255,255,0.1)" }}>
                        <div className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: "rgba(239,68,68,0.1)" }}>
                            <AlertTriangle size={22} className="text-red-400" />
                        </div>
                        <h3 className="text-[15px] font-semibold text-white text-center mb-2">Xoá bài viết?</h3>
                        <p className="text-[13px] text-white/40 text-center mb-6">Hành động này không thể hoàn tác.</p>
                        <div className="flex gap-3">
                            <button onClick={() => setDeleteConfirm(null)} className="flex-1 py-2.5 rounded-lg text-[13px] text-white/50" style={{ border: "1px solid rgba(255,255,255,0.1)" }}>
                                Huỷ
                            </button>
                            <button onClick={() => handleDelete(deleteConfirm)} className="flex-1 py-2.5 rounded-lg text-[13px] font-semibold bg-red-500 text-white hover:bg-red-600 transition-colors">
                                Xoá
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
