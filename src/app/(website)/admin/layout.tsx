"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
    LayoutDashboard, FileText, FolderOpen, Image as ImageIcon,
    Settings, LogOut, Menu, X, ChevronRight, Bell, Search,
    Globe, Eye
} from "lucide-react";

const navItems = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/bai-viet", label: "Bài viết", icon: FileText },
    { href: "/admin/du-an", label: "Dự án", icon: FolderOpen },
    { href: "/admin/hinh-anh", label: "Thư viện ảnh", icon: ImageIcon },
    { href: "/admin/cai-dat", label: "Cài đặt", icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loginForm, setLoginForm] = useState({ username: "", password: "" });
    const [loginError, setLoginError] = useState("");
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        const auth = sessionStorage.getItem("mkg_admin_auth");
        if (auth === "true") setIsAuthenticated(true);
    }, []);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (loginForm.username === "admin" && loginForm.password === "mkg2024") {
            sessionStorage.setItem("mkg_admin_auth", "true");
            setIsAuthenticated(true);
            setLoginError("");
        } else {
            setLoginError("Sai tên đăng nhập hoặc mật khẩu!");
        }
    };

    const handleLogout = () => {
        sessionStorage.removeItem("mkg_admin_auth");
        setIsAuthenticated(false);
    };

    /* ── LOGIN SCREEN ── */
    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center" style={{ background: "#0a0a0a" }}>
                <div className="w-full max-w-sm">
                    {/* Logo */}
                    <div className="text-center mb-10">
                        <div className="text-3xl font-extrabold tracking-widest mb-1" style={{ color: "#c8a45c", fontFamily: "'Playfair Display',serif" }}>MKG.VN</div>
                        <div className="text-[11px] tracking-[0.3em] text-white/30 uppercase">Admin Panel</div>
                    </div>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label className="text-[11px] tracking-widest uppercase text-white/40 block mb-1.5">Tên đăng nhập</label>
                            <input
                                type="text"
                                value={loginForm.username}
                                onChange={e => setLoginForm({ ...loginForm, username: e.target.value })}
                                className="w-full px-4 py-3 text-[14px] text-white bg-transparent border outline-none focus:border-[#c8a45c] transition-colors"
                                style={{ borderColor: "rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.03)" }}
                                placeholder="admin"
                                autoComplete="username"
                            />
                        </div>
                        <div>
                            <label className="text-[11px] tracking-widest uppercase text-white/40 block mb-1.5">Mật khẩu</label>
                            <input
                                type="password"
                                value={loginForm.password}
                                onChange={e => setLoginForm({ ...loginForm, password: e.target.value })}
                                className="w-full px-4 py-3 text-[14px] text-white bg-transparent border outline-none focus:border-[#c8a45c] transition-colors"
                                style={{ borderColor: "rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.03)" }}
                                placeholder="••••••••"
                                autoComplete="current-password"
                            />
                        </div>
                        {loginError && (
                            <p className="text-red-400 text-[12px] text-center">{loginError}</p>
                        )}
                        <button
                            type="submit"
                            className="w-full py-3.5 text-[12px] tracking-widest uppercase font-bold transition-all hover:opacity-90"
                            style={{ background: "#c8a45c", color: "#000" }}
                        >
                            ĐĂNG NHẬP
                        </button>
                        <p className="text-center text-[11px] text-white/20 mt-4">
                            user: <span className="text-white/40">admin</span> | pass: <span className="text-white/40">mkg2024</span>
                        </p>
                    </form>
                </div>
            </div>
        );
    }

    const currentPage = navItems.find(i => i.href === pathname)?.label || "Admin";

    return (
        <div className="flex min-h-screen" style={{ background: "#0d0d0d", fontFamily: "'Inter',sans-serif" }}>

            {/* ── SIDEBAR ── */}
            <aside
                className="flex-shrink-0 flex flex-col transition-all duration-300"
                style={{
                    width: sidebarOpen ? "240px" : "64px",
                    background: "#111",
                    borderRight: "1px solid rgba(200,164,92,0.1)",
                }}
            >
                {/* Sidebar header */}
                <div className="flex items-center justify-between px-4 h-16 border-b" style={{ borderColor: "rgba(200,164,92,0.1)" }}>
                    {sidebarOpen && (
                        <div>
                            <div className="text-[15px] font-extrabold tracking-widest" style={{ color: "#c8a45c" }}>MKG.VN</div>
                            <div className="text-[9px] tracking-[0.2em] text-white/25 uppercase">Admin</div>
                        </div>
                    )}
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="w-8 h-8 rounded flex items-center justify-center text-white/40 hover:text-[#c8a45c] hover:bg-white/5 transition-all ml-auto"
                    >
                        {sidebarOpen ? <X size={16} /> : <Menu size={16} />}
                    </button>
                </div>

                {/* Nav items */}
                <nav className="flex-1 py-4 space-y-1 px-2">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                title={!sidebarOpen ? item.label : undefined}
                                className="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group"
                                style={{
                                    background: isActive ? "rgba(200,164,92,0.1)" : "transparent",
                                    color: isActive ? "#c8a45c" : "rgba(255,255,255,0.45)",
                                    borderLeft: isActive ? "2px solid #c8a45c" : "2px solid transparent",
                                }}
                            >
                                <item.icon size={18} className="flex-shrink-0" />
                                {sidebarOpen && (
                                    <span className="text-[13px] font-medium">{item.label}</span>
                                )}
                                {sidebarOpen && isActive && <ChevronRight size={14} className="ml-auto" />}
                            </Link>
                        );
                    })}
                </nav>

                {/* Sidebar footer */}
                <div className="p-3 border-t space-y-1" style={{ borderColor: "rgba(200,164,92,0.08)" }}>
                    <Link
                        href="/"
                        target="_blank"
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-white/30 hover:text-white/60 transition-colors"
                        title={!sidebarOpen ? "Xem website" : undefined}
                    >
                        <Eye size={16} className="flex-shrink-0" />
                        {sidebarOpen && <span className="text-[12px]">Xem website</span>}
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-white/30 hover:text-red-400 transition-colors"
                        title={!sidebarOpen ? "Đăng xuất" : undefined}
                    >
                        <LogOut size={16} className="flex-shrink-0" />
                        {sidebarOpen && <span className="text-[12px]">Đăng xuất</span>}
                    </button>
                </div>
            </aside>

            {/* ── MAIN AREA ── */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Top bar */}
                <header
                    className="h-16 flex items-center justify-between px-6 flex-shrink-0"
                    style={{ background: "#111", borderBottom: "1px solid rgba(200,164,92,0.08)" }}
                >
                    <div>
                        <h1 className="text-[15px] font-semibold text-white/80">{currentPage}</h1>
                        <p className="text-[11px] text-white/25">
                            {new Date().toLocaleDateString("vi-VN", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div
                            className="flex items-center gap-2 px-3 py-2 rounded-lg text-white/30"
                            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
                        >
                            <Search size={14} />
                            <span className="text-[12px] hidden sm:block">Tìm kiếm...</span>
                        </div>
                        <button className="relative p-2 rounded-lg text-white/30 hover:text-white/60 transition-colors">
                            <Bell size={18} />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#c8a45c]" />
                        </button>
                        <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-bold text-black" style={{ background: "#c8a45c" }}>A</div>
                            {/* <span className="text-[13px] text-white/50 hidden sm:block">Admin</span> */}
                        </div>
                    </div>
                </header>

                {/* Page content */}
                <main className="flex-1 overflow-auto p-6" style={{ background: "#0d0d0d" }}>
                    {children}
                </main>
            </div>
        </div>
    );
}
