import BlogList from "@/components/BlogList";
import { client } from "@/sanity/client";
import { getAllPostsQuery } from "@/sanity/queries";

export const metadata = {
    title: "Tin Tức | Minh Khuê Group",
    description: "Cập nhật xu hướng thiết kế, mẫu nội thất mới nhất và tin tức từ Minh Khuê Group",
};

export default async function TinTucPage() {
    // Fetch from Sanity
    const sanityPosts = await client.fetch(getAllPostsQuery);

    // Map to component format
    const posts = sanityPosts.map((p: any) => ({
        id: p._id,
        title: p.title,
        slug: p.slug,
        category: p.category,
        featuredImage: p.mainImage,
        excerpt: p.excerpt,
        date: p.publishedAt
    }));

    return (
        <div className="page-enter">
            {/* Hero */}
            <section className="relative h-[40vh] min-h-[400px] overflow-hidden bg-[#0a0a0a]">
                <div className="absolute inset-0 bg-[url('/images/projects/project-hero-bg.jpg')] bg-cover bg-center opacity-30 mix-blend-overlay" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />

                <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-6">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-8 h-px bg-[#c8a45c]" />
                        <span className="text-[#c8a45c] text-[12px] font-bold tracking-[0.2em] uppercase">GÓC CHIA SẺ VÀ KIẾN THỨC</span>
                        <div className="w-8 h-px bg-[#c8a45c]" />
                    </div>
                    <h1
                        className="text-white text-5xl md:text-6xl lg:text-7xl font-bold uppercase tracking-widest mb-6"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                        TIN <span className="text-[#c8a45c] italic font-light">TỨC</span>
                    </h1>
                    <p className="text-white/60 text-lg max-w-xl font-light">
                        Khám phá các xu hướng thiết kế nội thất mới nhất và những câu chuyện từ quá trình kiến tạo công trình của MKG.
                    </p>
                </div>
            </section>

            {/* Client Component hiển thị danh sách có tìm kiếm, bộ lọc */}
            <BlogList posts={posts} />
        </div>
    );
}
