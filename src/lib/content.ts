import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "../../keystatic.config";

// This reader reads content from the local filesystem (works on server)
const reader = createReader(process.cwd(), keystaticConfig);

export type BaiViet = {
    slug: string;
    title: string;
    excerpt: string;
    category: string;
    featuredImage: string | null;
    author: string;
    date: string | null;
    status: string;
    content: () => Promise<any>;
};

export type DuAn = {
    slug: string;
    title: string;
    category: string;
    image: string | null;
    area: string;
    location: string;
    year: string;
    status: string;
    content: () => Promise<any>;
};

// ─── BÀI VIẾT ─────────────────────────────────────────
export async function getAllBaiViet(): Promise<BaiViet[]> {
    try {
        const slugs = await reader.collections["bai-viet"].list();
        const posts = await Promise.all(
            slugs.map(async (slug) => {
                const post = await reader.collections["bai-viet"].read(slug);
                if (!post) return null;
                return {
                    slug,
                    title: post.title,
                    excerpt: post.excerpt ?? "",
                    category: post.category ?? "tin-tuc",
                    featuredImage: post.featuredImage ?? null,
                    author: post.author ?? "Admin",
                    date: post.date ?? null,
                    status: post.status ?? "draft",
                    content: post.content,
                } as BaiViet;
            })
        );
        return posts.filter(Boolean) as BaiViet[];
    } catch {
        return [];
    }
}

export async function getPublishedBaiViet(): Promise<BaiViet[]> {
    const all = await getAllBaiViet();
    return all.filter((p) => p.status === "published");
}

export async function getBaiViet(slug: string): Promise<BaiViet | null> {
    try {
        const post = await reader.collections["bai-viet"].read(slug);
        if (!post) return null;
        return {
            slug,
            title: post.title,
            excerpt: post.excerpt ?? "",
            category: post.category ?? "tin-tuc",
            featuredImage: post.featuredImage ?? null,
            author: post.author ?? "Admin",
            date: post.date ?? null,
            status: post.status ?? "draft",
            content: post.content,
        };
    } catch {
        return null;
    }
}

// ─── DỰ ÁN ────────────────────────────────────────────
export async function getAllDuAn(): Promise<DuAn[]> {
    try {
        const slugs = await reader.collections["du-an"].list();
        const projects = await Promise.all(
            slugs.map(async (slug) => {
                const project = await reader.collections["du-an"].read(slug);
                if (!project) return null;
                return {
                    slug,
                    title: project.title,
                    category: project.category ?? "Nhà phố",
                    image: project.image ?? null,
                    area: project.area ?? "",
                    location: project.location ?? "",
                    year: project.year ?? "",
                    status: project.status ?? "published",
                    content: project.content,
                } as DuAn;
            })
        );
        return projects.filter(Boolean) as DuAn[];
    } catch {
        return [];
    }
}

export async function getPublishedDuAn(): Promise<DuAn[]> {
    const all = await getAllDuAn();
    return all.filter((p) => p.status === "published");
}

export async function getDuAn(slug: string): Promise<DuAn | null> {
    try {
        const project = await reader.collections["du-an"].read(slug);
        if (!project) return null;
        return {
            slug,
            title: project.title,
            category: project.category ?? "Nhà phố",
            image: project.image ?? null,
            area: project.area ?? "",
            location: project.location ?? "",
            year: project.year ?? "",
            status: project.status ?? "published",
            content: project.content,
        };
    } catch {
        return null;
    }
}
