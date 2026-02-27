"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import { urlFor } from "@/sanity/client";

interface BlogPost {
    _id: string;
    title: string;
    slug: string;
    excerpt: string;
    publishedAt: string;
    mainImage: any;
    category: { title: string };
    author?: string;
}

interface BlogSectionProps {
    posts: BlogPost[];
}

export default function BlogSection({ posts }: BlogSectionProps) {
    if (!posts || posts.length === 0) return null;

    return (
        <section className="py-24 lg:py-32 bg-[#0a0a0a] relative">
            <div className="section-container">

                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <span className="text-[#c8a45c] text-[12px] font-bold tracking-[0.2em] uppercase">GÓC CHIA SẺ</span>
                            <div className="w-12 h-px bg-[#c8a45c]/50" />
                        </div>
                        <h2
                            className="text-4xl md:text-5xl font-bold text-white leading-[1.15]"
                            style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                            TIN TỨC & BÀI BÁO <br />
                            <span className="italic font-light text-[#c8a45c]">MỚI NHẤT</span>
                        </h2>
                    </div>

                    <Link
                        href="/tin-tuc"
                        className="inline-flex justify-center items-center gap-2 border border-white/20 text-white text-[11px] font-bold tracking-[0.2em] uppercase px-8 py-3 hover:border-[#c8a45c] hover:bg-[#c8a45c] hover:text-black transition-all duration-300"
                    >
                        XEM TẤT CẢ TÀI LIỆU
                    </Link>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.slice(0, 3).map((post, idx) => (
                        <article key={post._id || idx} className="group">
                            <Link href={`/tin-tuc/${post.slug}`} className="block overflow-hidden relative mb-6 rounded-tr-3xl rounded-bl-3xl">
                                <div className="aspect-[4/3] w-full relative">
                                    <Image
                                        src={post.mainImage ? (typeof post.mainImage === 'string' ? post.mainImage : urlFor(post.mainImage).url()) : "/images/placeholder.jpg"}
                                        alt={post.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        sizes="(max-width: 768px) 100vw, 33vw"
                                    />
                                </div>
                                {/* Fixed Date Badge overlaying image */}
                                <div className="absolute top-4 left-4 bg-white text-black px-4 py-3 text-center rounded-sm">
                                    <div className="text-[20px] font-bold leading-none" style={{ fontFamily: "'Playfair Display', serif" }}>
                                        {new Date(post.publishedAt || new Date()).getDate()}
                                    </div>
                                    <div className="text-[10px] uppercase font-bold tracking-widest mt-1 opacity-60">
                                        TH {new Date(post.publishedAt || new Date()).getMonth() + 1}
                                    </div>
                                </div>
                            </Link>

                            <div>
                                <div className="flex items-center gap-4 text-[12px] text-white/40 mb-3 uppercase tracking-wider font-bold">
                                    <span className="text-[#c8a45c]">{post.category?.title || "Tin tức"}</span>
                                    <span className="w-1 h-1 rounded-full bg-white/20" />
                                    <span>Bởi {post.author || "MKG Admin"}</span>
                                </div>

                                <h3
                                    className="text-xl lg:text-2xl font-bold text-white mb-4 line-clamp-2 leading-snug group-hover:text-[#c8a45c] transition-colors"
                                    style={{ fontFamily: "'Playfair Display', serif" }}
                                >
                                    <Link href={`/tin-tuc/${post.slug}`}>
                                        {post.title}
                                    </Link>
                                </h3>

                                <p className="text-white/50 text-[14px] line-clamp-2 leading-relaxed mb-6">
                                    {post.excerpt}
                                </p>

                                <Link
                                    href={`/tin-tuc/${post.slug}`}
                                    className="inline-flex items-center gap-2 text-[#c8a45c] text-[11px] font-bold tracking-[0.2em] uppercase transition-all group-hover:gap-4"
                                >
                                    <span>ĐỌC THÊM</span>
                                    <ArrowRight size={14} />
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>

            </div>
        </section>
    );
}
