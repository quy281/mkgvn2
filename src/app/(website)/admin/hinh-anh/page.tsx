"use client";

import { useState, useEffect, useRef } from "react";
import {
    Upload, Trash2, Copy, Search, Grid, List, ImageIcon,
    CheckCircle, AlertTriangle, FolderOpen, Download
} from "lucide-react";

interface MediaFile {
    id: string;
    name: string;
    path: string;
    size: number;
    type: string;
    uploadedAt: string;
    folder: string;
}

const FOLDERS = ["Tất cả", "logo", "hero", "projects", "blog", "about", "services", "backgrounds"];

// Pre-fill with existing local images
const DEFAULT_IMAGES: MediaFile[] = [
    { id: "1", name: "logo-mkg.jpg", path: "/images/logo/logo-mkg.jpg", size: 45000, type: "image/jpeg", uploadedAt: "2024-07-01", folder: "logo" },
    { id: "2", name: "hero-slide-1.png", path: "/images/hero/hero-slide-1.png", size: 320000, type: "image/png", uploadedAt: "2024-07-01", folder: "hero" },
    { id: "3", name: "hero-slide-2.png", path: "/images/hero/hero-slide-2.png", size: 280000, type: "image/png", uploadedAt: "2024-07-01", folder: "hero" },
    { id: "4", name: "about-company.png", path: "/images/about/about-company.png", size: 210000, type: "image/png", uploadedAt: "2024-07-01", folder: "about" },
    { id: "5", name: "project-nha-pho-long-an.jpg", path: "/images/projects/project-nha-pho-long-an.jpg", size: 180000, type: "image/jpeg", uploadedAt: "2024-07-01", folder: "projects" },
    { id: "6", name: "project-saigon-south.jpg", path: "/images/projects/project-saigon-south.jpg", size: 190000, type: "image/jpeg", uploadedAt: "2024-07-01", folder: "projects" },
    { id: "7", name: "project-sunrise-city.jpg", path: "/images/projects/project-sunrise-city.jpg", size: 175000, type: "image/jpeg", uploadedAt: "2024-07-01", folder: "projects" },
    { id: "8", name: "service-design.jpg", path: "/images/services/service-design.jpg", size: 200000, type: "image/jpeg", uploadedAt: "2024-07-01", folder: "services" },
    { id: "9", name: "service-construction.jpg", path: "/images/services/service-construction.jpg", size: 195000, type: "image/jpeg", uploadedAt: "2024-07-01", folder: "services" },
];

function formatSize(bytes: number) {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
}

export default function HinhAnhPage() {
    const [images, setImages] = useState<MediaFile[]>([]);
    const [selectedFolder, setSelectedFolder] = useState("Tất cả");
    const [searchTerm, setSearchTerm] = useState("");
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const [selectedImage, setSelectedImage] = useState<MediaFile | null>(null);
    const [copyToast, setCopyToast] = useState(false);
    const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
    const [newFolder, setNewFolder] = useState("projects");
    const [dragging, setDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const dropRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const saved = localStorage.getItem("mkg_images");
        setImages(saved ? JSON.parse(saved) : DEFAULT_IMAGES);
    }, []);

    const saveImages = (updated: MediaFile[]) => {
        setImages(updated);
        localStorage.setItem("mkg_images", JSON.stringify(updated));
    };

    const handleFileDrop = (files: FileList) => {
        const newFiles: MediaFile[] = Array.from(files).map(file => ({
            id: Date.now() + Math.random().toString(36).slice(2),
            name: file.name,
            path: `/images/${newFolder}/${file.name}`,
            size: file.size,
            type: file.type,
            uploadedAt: new Date().toISOString().split("T")[0],
            folder: newFolder,
        }));
        saveImages([...newFiles, ...images]);
    };

    const handleDelete = (id: string) => {
        saveImages(images.filter(img => img.id !== id));
        if (selectedImage?.id === id) setSelectedImage(null);
        setDeleteConfirm(null);
    };

    const handleCopyPath = (path: string) => {
        navigator.clipboard.writeText(path);
        setCopyToast(true);
        setTimeout(() => setCopyToast(false), 2000);
    };

    const filtered = images
        .filter(img => selectedFolder === "Tất cả" || img.folder === selectedFolder)
        .filter(img => img.name.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div className="space-y-5 h-full flex flex-col">
            {copyToast && (
                <div className="fixed top-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-xl" style={{ background: "#1a2e1a", border: "1px solid #4ade8040", color: "#4ade80" }}>
                    <CheckCircle size={14} /> Đã copy đường dẫn!
                </div>
            )}

            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-[18px] font-bold text-white">Thư viện ảnh</h1>
                    <p className="text-[12px] text-white/30 mt-0.5">{images.length} file · Quản lý hình ảnh website</p>
                </div>
                <button
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center gap-2 px-4 py-2.5 text-[12px] font-semibold rounded-lg hover:opacity-90"
                    style={{ background: "#c8a45c", color: "#000" }}
                >
                    <Upload size={14} /> Tải ảnh lên
                </button>
                <input
                    ref={fileInputRef} type="file" multiple accept="image/*" className="hidden"
                    onChange={e => e.target.files && handleFileDrop(e.target.files)}
                />
            </div>

            <div className="flex gap-5 flex-1 min-h-0">
                {/* LEFT: folder sidebar */}
                <div className="w-44 flex-shrink-0 space-y-1">
                    <p className="text-[10px] tracking-widest uppercase text-white/25 px-2 mb-3">Thư mục</p>
                    {FOLDERS.map(folder => (
                        <button
                            key={folder}
                            onClick={() => setSelectedFolder(folder)}
                            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left transition-all text-[12px]"
                            style={{
                                background: selectedFolder === folder ? "rgba(200,164,92,0.1)" : "transparent",
                                color: selectedFolder === folder ? "#c8a45c" : "rgba(255,255,255,0.4)",
                                borderLeft: selectedFolder === folder ? "2px solid #c8a45c" : "2px solid transparent",
                            }}
                        >
                            <FolderOpen size={13} className="flex-shrink-0" />
                            <span className="capitalize">{folder}</span>
                            <span className="ml-auto text-[10px] opacity-50">
                                {folder === "Tất cả" ? images.length : images.filter(i => i.folder === folder).length}
                            </span>
                        </button>
                    ))}
                </div>

                {/* RIGHT: main content */}
                <div className="flex-1 flex flex-col gap-4 min-w-0">
                    {/* Filters bar */}
                    <div className="flex gap-3">
                        <div className="flex items-center gap-2 px-3 py-2 rounded-lg flex-1" style={{ background: "#1a1a1a", border: "1px solid rgba(255,255,255,0.07)" }}>
                            <Search size={13} className="text-white/25 flex-shrink-0" />
                            <input type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="Tìm kiếm file..." className="bg-transparent outline-none text-[12px] text-white/60 w-full" />
                        </div>
                        <select
                            value={newFolder}
                            onChange={e => setNewFolder(e.target.value)}
                            className="px-3 py-2 text-[12px] text-white/50 rounded-lg outline-none"
                            style={{ background: "#1a1a1a", border: "1px solid rgba(255,255,255,0.07)" }}
                        >
                            {FOLDERS.slice(1).map(f => <option key={f} value={f}>{f}</option>)}
                        </select>
                        <div className="flex rounded-lg overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.07)" }}>
                            <button onClick={() => setViewMode("grid")} className="p-2.5 transition-all" style={{ background: viewMode === "grid" ? "#c8a45c" : "#1a1a1a", color: viewMode === "grid" ? "#000" : "rgba(255,255,255,0.4)" }}><Grid size={14} /></button>
                            <button onClick={() => setViewMode("list")} className="p-2.5 transition-all" style={{ background: viewMode === "list" ? "#c8a45c" : "#1a1a1a", color: viewMode === "list" ? "#000" : "rgba(255,255,255,0.4)" }}><List size={14} /></button>
                        </div>
                    </div>

                    {/* Drop zone */}
                    <div
                        ref={dropRef}
                        onDragOver={e => { e.preventDefault(); setDragging(true); }}
                        onDragLeave={() => setDragging(false)}
                        onDrop={e => { e.preventDefault(); setDragging(false); handleFileDrop(e.dataTransfer.files); }}
                        className="border-2 border-dashed rounded-xl py-5 text-center cursor-pointer transition-all"
                        style={{ borderColor: dragging ? "#c8a45c" : "rgba(255,255,255,0.08)", background: dragging ? "rgba(200,164,92,0.04)" : "transparent" }}
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <Upload size={18} className="mx-auto mb-2" style={{ color: dragging ? "#c8a45c" : "rgba(255,255,255,0.2)" }} />
                        <p className="text-[12px]" style={{ color: dragging ? "#c8a45c" : "rgba(255,255,255,0.2)" }}>
                            Kéo thả ảnh hoặc click để tải lên · Folder: <strong>{newFolder}</strong>
                        </p>
                    </div>

                    {/* Grid / List */}
                    <div className="flex-1 overflow-auto">
                        {viewMode === "grid" ? (
                            <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
                                {filtered.map(img => (
                                    <div
                                        key={img.id}
                                        className="group relative rounded-lg overflow-hidden cursor-pointer"
                                        style={{ aspectRatio: "1/1", background: "#1a1a1a", border: "1px solid rgba(255,255,255,0.06)" }}
                                        onClick={() => setSelectedImage(img)}
                                    >
                                        <img
                                            src={img.path} alt={img.name}
                                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.06]"
                                            onError={e => { (e.target as HTMLImageElement).style.display = "none"; }}
                                        />
                                        {/* Hover overlay */}
                                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
                                            <p className="text-[10px] text-white/80 line-clamp-1 leading-tight">{img.name}</p>
                                        </div>
                                        {/* Quick actions */}
                                        <div className="absolute top-1 right-1 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={e => { e.stopPropagation(); handleCopyPath(img.path); }}
                                                className="w-6 h-6 rounded flex items-center justify-center text-white bg-black/60 hover:bg-[#c8a45c] hover:text-black transition-all"
                                                title="Copy path"
                                            >
                                                <Copy size={10} />
                                            </button>
                                            <button
                                                onClick={e => { e.stopPropagation(); setDeleteConfirm(img.id); }}
                                                className="w-6 h-6 rounded flex items-center justify-center text-white bg-black/60 hover:bg-red-500 transition-all"
                                                title="Xoá"
                                            >
                                                <Trash2 size={10} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                                {filtered.length === 0 && (
                                    <div className="col-span-full text-center py-12 text-white/20">
                                        <ImageIcon size={32} className="mx-auto mb-2 opacity-25" />
                                        <p className="text-[13px]">Không có hình ảnh nào</p>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="rounded-xl overflow-hidden" style={{ background: "#1a1a1a", border: "1px solid rgba(255,255,255,0.06)" }}>
                                <table className="w-full">
                                    <thead>
                                        <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                                            {["", "Tên file", "Folder", "Kích thước", "Ngày", ""].map(h => (
                                                <th key={h} className="px-4 py-3 text-left text-[10px] tracking-widest uppercase text-white/20 font-medium">{h}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y" style={{ borderColor: "rgba(255,255,255,0.03)" }}>
                                        {filtered.map(img => (
                                            <tr key={img.id} className="group hover:bg-white/[0.02] cursor-pointer" onClick={() => setSelectedImage(img)}>
                                                <td className="pl-4 py-2.5 w-12">
                                                    <div className="w-10 h-10 rounded-lg overflow-hidden bg-black/20">
                                                        <img src={img.path} alt="" className="w-full h-full object-cover" onError={e => { (e.target as any).style.display = "none" }} />
                                                    </div>
                                                </td>
                                                <td className="px-4 py-2.5 text-[12px] text-white/60">{img.name}</td>
                                                <td className="px-4 py-2.5">
                                                    <span className="text-[10px] px-2 py-0.5 rounded-full capitalize" style={{ background: "rgba(200,164,92,0.1)", color: "#c8a45c" }}>{img.folder}</span>
                                                </td>
                                                <td className="px-4 py-2.5 text-[12px] text-white/30">{formatSize(img.size)}</td>
                                                <td className="px-4 py-2.5 text-[12px] text-white/25">{img.uploadedAt}</td>
                                                <td className="px-4 py-2.5">
                                                    <div className="flex gap-1 opacity-0 group-hover:opacity-100">
                                                        <button onClick={e => { e.stopPropagation(); handleCopyPath(img.path); }} className="p-1.5 text-white/25 hover:text-[#c8a45c] transition-colors"><Copy size={13} /></button>
                                                        <button onClick={e => { e.stopPropagation(); setDeleteConfirm(img.id); }} className="p-1.5 text-white/25 hover:text-red-400 transition-colors"><Trash2 size={13} /></button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>

                {/* RIGHT PANEL: selected image detail */}
                {selectedImage && (
                    <div className="w-64 flex-shrink-0 rounded-xl overflow-hidden flex flex-col" style={{ background: "#1a1a1a", border: "1px solid rgba(255,255,255,0.08)" }}>
                        <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
                            <span className="text-[12px] font-semibold text-white/60">Chi tiết</span>
                            <button onClick={() => setSelectedImage(null)} className="text-white/25 hover:text-white/50 transition-colors">✕</button>
                        </div>
                        <div className="p-4 flex-1">
                            <div className="aspect-video rounded-lg overflow-hidden bg-black/20 mb-4">
                                <img src={selectedImage.path} alt={selectedImage.name} className="w-full h-full object-contain" onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
                            </div>
                            <div className="space-y-3">
                                <div>
                                    <p className="text-[10px] tracking-widest uppercase text-white/25 mb-1">Tên file</p>
                                    <p className="text-[12px] text-white/60 break-all">{selectedImage.name}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] tracking-widest uppercase text-white/25 mb-1">Đường dẫn</p>
                                    <p className="text-[11px] text-white/40 break-all">{selectedImage.path}</p>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <p className="text-[10px] tracking-widest uppercase text-white/25 mb-1">Folder</p>
                                        <p className="text-[12px] text-[#c8a45c] capitalize">{selectedImage.folder}</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] tracking-widest uppercase text-white/25 mb-1">Kích thước</p>
                                        <p className="text-[12px] text-white/50">{formatSize(selectedImage.size)}</p>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-[10px] tracking-widest uppercase text-white/25 mb-1">Ngày upload</p>
                                    <p className="text-[12px] text-white/40">{selectedImage.uploadedAt}</p>
                                </div>
                            </div>
                        </div>
                        <div className="p-4 border-t space-y-2" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
                            <button
                                onClick={() => handleCopyPath(selectedImage.path)}
                                className="w-full flex items-center justify-center gap-2 py-2 rounded-lg text-[12px] font-medium transition-all hover:opacity-90"
                                style={{ background: "#c8a45c", color: "#000" }}
                            >
                                <Copy size={13} /> Copy đường dẫn
                            </button>
                            <button
                                onClick={() => setDeleteConfirm(selectedImage.id)}
                                className="w-full flex items-center justify-center gap-2 py-2 rounded-lg text-[12px] text-red-400 transition-all"
                                style={{ border: "1px solid rgba(239,68,68,0.2)" }}
                            >
                                <Trash2 size={13} /> Xoá ảnh
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Delete confirm */}
            {deleteConfirm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                    <div className="rounded-2xl p-6 w-full max-w-sm mx-4" style={{ background: "#1a1a1a", border: "1px solid rgba(255,255,255,0.1)" }}>
                        <div className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: "rgba(239,68,68,0.1)" }}>
                            <AlertTriangle size={22} className="text-red-400" />
                        </div>
                        <h3 className="text-[15px] font-semibold text-white text-center mb-2">Xoá hình ảnh?</h3>
                        <p className="text-[13px] text-white/40 text-center mb-6">Hình ảnh sẽ bị xóa khỏi danh sách.</p>
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
