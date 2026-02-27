"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
    Plus, Search, Edit2, Trash2, Eye, ArrowLeft,
    Save, CheckCircle, AlertTriangle, Grid, List
} from "lucide-react";
import { projects as seedProjects } from "@/data/site-data";

interface Project {
    id: number | string;
    title: string;
    slug: string;
    category: string;
    image: string;
    description?: string;
    status: "published" | "draft";
}

const CATEGORIES = ["Nhà phố", "Chung cư", "Biệt thự", "Thương mại"];

function slugify(text: string) {
    return text.toLowerCase()
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        .replace(/đ/g, "d").replace(/[^a-z0-9\s-]/g, "")
        .trim().replace(/\s+/g, "-");
}

function ProjectForm({ project, onSave, onCancel }: { project?: Project; onSave: (p: Project) => void; onCancel: () => void }) {
    const [form, setForm] = useState<Project>(project || {
        id: Date.now(), title: "", slug: "", category: "Nhà phố",
        image: "", description: "", status: "draft",
    });
    const [saved, setSaved] = useState(false);

    const handleTitleChange = (title: string) => {
        setForm(f => ({ ...f, title, slug: project ? f.slug : slugify(title) }));
    };

    const handleSubmit = (e: React.FormEvent, status?: "published" | "draft") => {
        e.preventDefault();
        onSave({ ...form, status: status || form.status });
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
                <span className="text-[13px] text-white/50">{project ? "Chỉnh sửa dự án" : "Tạo dự án mới"}</span>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-4">
                    <div className="rounded-xl p-5 space-y-4" style={{ background: "#1a1a1a", border: "1px solid rgba(255,255,255,0.06)" }}>
                        <div>
                            <label className="text-[11px] tracking-widest uppercase text-white/35 block mb-1.5">Tên dự án *</label>
                            <input
                                type="text" value={form.title} required
                                onChange={e => handleTitleChange(e.target.value)}
                                placeholder="VD: Villa Lâm Đồng..."
                                className="w-full px-4 py-3 text-[15px] font-semibold text-white bg-transparent border-0 border-b outline-none focus:border-[#c8a45c] transition-colors"
                                style={{ borderColor: "rgba(255,255,255,0.08)" }}
                            />
                        </div>
                        <div>
                            <label className="text-[11px] tracking-widest uppercase text-white/35 block mb-1.5">Slug URL</label>
                            <input
                                type="text" value={form.slug}
                                onChange={e => setForm(f => ({ ...f, slug: e.target.value }))}
                                className="w-full px-3 py-2 text-[12px] text-white/50 rounded-lg outline-none"
                                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
                            />
                        </div>
                        <div>
                            <label className="text-[11px] tracking-widest uppercase text-white/35 block mb-1.5">Mô tả dự án</label>
                            <textarea
                                value={form.description || ""} rows={5}
                                onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                                placeholder="Mô tả chi tiết về dự án..."
                                className="w-full px-3 py-2.5 text-[13px] text-white/60 rounded-lg outline-none resize-none"
                                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
                            />
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    {/* Settings */}
                    <div className="rounded-xl p-5 space-y-4" style={{ background: "#1a1a1a", border: "1px solid rgba(255,255,255,0.06)" }}>
                        <h3 className="text-[13px] font-semibold text-white/60">Cài đặt</h3>
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
                            <label className="text-[11px] tracking-widest uppercase text-white/35 block mb-1.5">Danh mục</label>
                            <div className="space-y-2">
                                {CATEGORIES.map(cat => (
                                    <label key={cat} className="flex items-center gap-2.5 cursor-pointer">
                                        <input type="radio" name="cat" value={cat} checked={form.category === cat} onChange={() => setForm(f => ({ ...f, category: cat }))} className="accent-[#c8a45c]" />
                                        <span className="text-[13px] text-white/50">{cat}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 pt-2">
                            <button type="submit" onClick={(e) => handleSubmit(e, "published")}
                                className="w-full py-2.5 text-[12px] tracking-widest uppercase font-bold rounded-lg hover:opacity-90 transition-all"
                                style={{ background: "#c8a45c", color: "#000" }}>
                                {saved ? "✓ Đã lưu!" : "Đăng dự án"}
                            </button>
                            <button type="button" onClick={(e) => handleSubmit(e as any, "draft")}
                                className="w-full py-2.5 text-[12px] tracking-widest uppercase font-semibold rounded-lg transition-all"
                                style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.5)" }}>
                                Lưu nháp
                            </button>
                        </div>
                    </div>

                    {/* Image */}
                    <div className="rounded-xl p-5" style={{ background: "#1a1a1a", border: "1px solid rgba(255,255,255,0.06)" }}>
                        <h3 className="text-[13px] font-semibold text-white/60 mb-3">Ảnh dự án</h3>
                        <input
                            type="text" value={form.image}
                            onChange={e => setForm(f => ({ ...f, image: e.target.value }))}
                            placeholder="/images/projects/..."
                            className="w-full px-3 py-2 text-[12px] text-white/40 rounded-lg outline-none"
                            style={{ background: "#111", border: "1px solid rgba(255,255,255,0.1)" }}
                        />
                        {form.image && (
                            <div className="mt-3 rounded-lg overflow-hidden aspect-video" style={{ position: "relative" }}>
                                <img src={form.image} alt="preview" className="w-full h-full object-cover" onError={e => { (e.target as any).style.display = "none" }} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </form>
    );
}

/* ═══════════════════ MAIN PAGE ═══════════════════ */
export default function DuAnAdminPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [view, setView] = useState<"list" | "edit" | "create">("list");
    const [editingProject, setEditingProject] = useState<Project | undefined>();
    const [searchTerm, setSearchTerm] = useState("");
    const [filterCat, setFilterCat] = useState("all");
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const [deleteConfirm, setDeleteConfirm] = useState<number | string | null>(null);
    const [toast, setToast] = useState("");

    useEffect(() => {
        const saved = localStorage.getItem("mkg_projects");
        setProjects(saved ? JSON.parse(saved) : seedProjects.map(p => ({ ...p, status: "published" })));
    }, []);

    const saveProjects = (updated: Project[]) => {
        setProjects(updated);
        localStorage.setItem("mkg_projects", JSON.stringify(updated));
    };

    const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(""), 3000); };

    const handleSave = (project: Project) => {
        let updated: Project[];
        if (editingProject) {
            updated = projects.map(p => p.id === project.id ? project : p);
            showToast("✓ Đã cập nhật dự án");
        } else {
            updated = [project, ...projects];
            showToast("✓ Đã tạo dự án mới");
        }
        saveProjects(updated);
        setView("list");
        setEditingProject(undefined);
    };

    const handleDelete = (id: number | string) => {
        saveProjects(projects.filter(p => p.id !== id));
        setDeleteConfirm(null);
        showToast("Đã xoá dự án");
    };

    const handleToggleStatus = (id: number | string) => {
        saveProjects(projects.map(p => p.id === id ? { ...p, status: (p.status === "published" ? "draft" : "published") as any } : p));
    };

    const allCats = ["all", ...Array.from(new Set(projects.map(p => p.category)))];
    const filtered = projects
        .filter(p => filterCat === "all" || p.category === filterCat)
        .filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase()));

    if (view === "create" || view === "edit") {
        return <ProjectForm project={editingProject} onSave={handleSave} onCancel={() => { setView("list"); setEditingProject(undefined); }} />;
    }

    return (
        <div className="space-y-5">
            {toast && (
                <div className="fixed top-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-xl shadow-2xl text-[13px] font-medium" style={{ background: "#1a2e1a", border: "1px solid #4ade8040", color: "#4ade80" }}>
                    <CheckCircle size={15} /> {toast}
                </div>
            )}

            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-[18px] font-bold text-white">Dự án</h1>
                    <p className="text-[12px] text-white/30 mt-0.5">{projects.length} dự án tổng cộng</p>
                </div>
                <button
                    onClick={() => { setEditingProject(undefined); setView("create"); }}
                    className="flex items-center gap-2 px-4 py-2.5 text-[12px] font-semibold rounded-lg hover:opacity-90"
                    style={{ background: "#c8a45c", color: "#000" }}
                >
                    <Plus size={15} /> Tạo dự án
                </button>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg flex-1 min-w-[180px]" style={{ background: "#1a1a1a", border: "1px solid rgba(255,255,255,0.07)" }}>
                    <Search size={14} className="text-white/25 flex-shrink-0" />
                    <input type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="Tìm kiếm dự án..." className="bg-transparent outline-none text-[13px] text-white/60 w-full" />
                </div>
                <div className="flex rounded-lg overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.07)" }}>
                    {allCats.map(cat => (
                        <button key={cat} onClick={() => setFilterCat(cat)}
                            className="px-4 py-2 text-[12px] font-medium transition-all capitalize"
                            style={{ background: filterCat === cat ? "#c8a45c" : "#1a1a1a", color: filterCat === cat ? "#000" : "rgba(255,255,255,0.4)" }}>
                            {cat === "all" ? "Tất cả" : cat}
                        </button>
                    ))}
                </div>
                <div className="flex rounded-lg overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.07)" }}>
                    <button onClick={() => setViewMode("grid")} className="p-2.5 transition-all" style={{ background: viewMode === "grid" ? "#c8a45c" : "#1a1a1a", color: viewMode === "grid" ? "#000" : "rgba(255,255,255,0.4)" }}>
                        <Grid size={15} />
                    </button>
                    <button onClick={() => setViewMode("list")} className="p-2.5 transition-all" style={{ background: viewMode === "list" ? "#c8a45c" : "#1a1a1a", color: viewMode === "list" ? "#000" : "rgba(255,255,255,0.4)" }}>
                        <List size={15} />
                    </button>
                </div>
            </div>

            {/* Grid view */}
            {viewMode === "grid" ? (
                <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {filtered.map(project => (
                        <div key={project.id} className="group rounded-xl overflow-hidden" style={{ background: "#1a1a1a", border: "1px solid rgba(255,255,255,0.06)" }}>
                            <div className="relative aspect-video overflow-hidden bg-black/30">
                                {project.image && (
                                    <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.05]" />
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                <span className="absolute top-2 left-2 text-[10px] px-2 py-0.5 tracking-widest uppercase" style={{ background: "rgba(200,164,92,0.2)", color: "#c8a45c", border: "1px solid rgba(200,164,92,0.3)" }}>
                                    {project.category}
                                </span>
                                <span className="absolute top-2 right-2 text-[10px] px-2 py-0.5 rounded-full" style={{ background: project.status === "published" ? "#16a34a30" : "#92400e30", color: project.status === "published" ? "#4ade80" : "#fbbf24" }}>
                                    {project.status === "published" ? "Đăng" : "Nháp"}
                                </span>
                            </div>
                            <div className="p-4">
                                <h3 className="text-[13px] font-semibold text-white/70 line-clamp-1 mb-3">{project.title}</h3>
                                <div className="flex items-center gap-1">
                                    <Link href={`/du-an/${project.slug}`} target="_blank" className="p-1.5 rounded text-white/25 hover:text-white/50 transition-colors" title="Xem"><Eye size={13} /></Link>
                                    <button onClick={() => { setEditingProject(project); setView("edit"); }} className="p-1.5 rounded text-white/25 hover:text-[#c8a45c] transition-colors" title="Sửa"><Edit2 size={13} /></button>
                                    <button onClick={() => handleToggleStatus(project.id)} className="p-1.5 rounded text-white/25 hover:text-blue-400 transition-colors text-[10px]">
                                        {project.status === "published" ? "→Nháp" : "→Đăng"}
                                    </button>
                                    <button onClick={() => setDeleteConfirm(project.id)} className="p-1.5 rounded text-white/25 hover:text-red-400 transition-colors ml-auto" title="Xoá"><Trash2 size={13} /></button>
                                </div>
                            </div>
                        </div>
                    ))}
                    {filtered.length === 0 && (
                        <div className="col-span-full text-center py-16 text-white/25">
                            <p className="text-[14px]">Không tìm thấy dự án nào</p>
                        </div>
                    )}
                </div>
            ) : (
                /* List view */
                <div className="rounded-xl overflow-hidden" style={{ background: "#1a1a1a", border: "1px solid rgba(255,255,255,0.06)" }}>
                    <table className="w-full">
                        <thead>
                            <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                                {["", "Tên dự án", "Danh mục", "Trạng thái", "Hành động"].map(h => (
                                    <th key={h} className="px-4 py-3 text-left text-[11px] tracking-widest uppercase text-white/25 font-medium">{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y" style={{ borderColor: "rgba(255,255,255,0.03)" }}>
                            {filtered.map(project => (
                                <tr key={project.id} className="group hover:bg-white/[0.02] transition-colors">
                                    <td className="pl-4 py-3 w-16">
                                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-black/20 flex-shrink-0">
                                            {project.image && <img src={project.image} alt="" className="w-full h-full object-cover" />}
                                        </div>
                                    </td>
                                    <td className="px-4 py-3">
                                        <p className="text-[13px] font-medium text-white/70">{project.title}</p>
                                        <p className="text-[11px] text-white/25">/du-an/{project.slug}</p>
                                    </td>
                                    <td className="px-4 py-3">
                                        <span className="text-[11px] px-2.5 py-1 rounded-full" style={{ background: "rgba(96,165,250,0.1)", color: "#60a5fa" }}>{project.category}</span>
                                    </td>
                                    <td className="px-4 py-3">
                                        <button onClick={() => handleToggleStatus(project.id)} className="text-[11px] font-medium px-2.5 py-1 rounded-full transition-all"
                                            style={{ background: project.status === "published" ? "#16a34a20" : "#92400e20", color: project.status === "published" ? "#4ade80" : "#fbbf24" }}>
                                            {project.status === "published" ? "Đã đăng" : "Nháp"}
                                        </button>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100">
                                            <Link href={`/du-an/${project.slug}`} target="_blank" className="p-1.5 text-white/25 hover:text-white/60 transition-colors"><Eye size={14} /></Link>
                                            <button onClick={() => { setEditingProject(project); setView("edit"); }} className="p-1.5 text-white/25 hover:text-[#c8a45c] transition-colors"><Edit2 size={14} /></button>
                                            <button onClick={() => setDeleteConfirm(project.id)} className="p-1.5 text-white/25 hover:text-red-400 transition-colors"><Trash2 size={14} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Delete confirm */}
            {deleteConfirm !== null && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                    <div className="rounded-2xl p-6 w-full max-w-sm mx-4" style={{ background: "#1a1a1a", border: "1px solid rgba(255,255,255,0.1)" }}>
                        <div className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: "rgba(239,68,68,0.1)" }}>
                            <AlertTriangle size={22} className="text-red-400" />
                        </div>
                        <h3 className="text-[15px] font-semibold text-white text-center mb-2">Xoá dự án?</h3>
                        <p className="text-[13px] text-white/40 text-center mb-6">Hành động này không thể hoàn tác.</p>
                        <div className="flex gap-3">
                            <button onClick={() => setDeleteConfirm(null)} className="flex-1 py-2.5 rounded-lg text-[13px] text-white/50" style={{ border: "1px solid rgba(255,255,255,0.1)" }}>Huỷ</button>
                            <button onClick={() => handleDelete(deleteConfirm)} className="flex-1 py-2.5 rounded-lg text-[13px] font-semibold bg-red-500 text-white">Xoá</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
