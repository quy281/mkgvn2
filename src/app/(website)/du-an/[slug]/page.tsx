import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MapPin, Tag, ArrowRight, Briefcase, Ruler, Calendar as CalendarIcon } from "lucide-react";
import type { Metadata } from "next";
import { client, urlFor } from "@/sanity/client";
import { getAllProjectsQuery, getProjectBySlugQuery } from "@/sanity/queries";
import { PortableText } from '@portabletext/react';

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    const projects = await client.fetch(getAllProjectsQuery);
    return projects.map((p: any) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const project = await client.fetch(getProjectBySlugQuery, { slug });

    if (!project) return { title: "Không tìm thấy" };
    return {
        title: `${project.title} | MINH KHUÊ GROUP`,
        description: `Dự án ${project.category}: ${project.title} – Thiết kế và thi công nội thất cao cấp bởi Minh Khuê Group.`,
    };
}

export default async function ProjectDetailPage({ params }: Props) {
    const { slug } = await params;
    const project = await client.fetch(getProjectBySlugQuery, { slug });

    if (!project) notFound();

    // Bài viết dự án liên quan (Cùng Category)
    const allProjects = await client.fetch(getAllProjectsQuery);

    const related = allProjects.filter(
        (p: any) => p.slug !== slug && p.category === project.category
    ).slice(0, 3);

    const allOthers = allProjects.filter(
        (p: any) => p.slug !== slug && p.category !== project.category
    ).slice(0, 3 - related.length);

    const relatedProjects = [...related, ...allOthers];

    return (
        <div className="page-enter bg-background">
            {/* ── Hero image ── */}
            <section className="relative h-[60vh] min-h-[500px] overflow-hidden">
                {project.mainImage ? (
                    <Image
                        src={urlFor(project.mainImage).url()}
                        alt={project.title}
                        fill
                        className="object-cover"
                        priority
                        sizes="100vw"
                    />
                ) : (
                    <div className="absolute inset-0 bg-[#141414] flex items-center justify-center">
                        <div className="text-[#c8a45c]/20 text-9xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>MKG</div>
                    </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/30" />

                {/* Top back button */}
                <div className="absolute top-6 left-6 z-10 hidden md:block">
                    <Link
                        href="/du-an"
                        className="inline-flex items-center gap-2 text-[13px] font-semibold tracking-wide text-white hover:text-black bg-white/10 hover:bg-primary backdrop-blur-md border border-white/20 px-5 py-2.5 rounded-full transition-all duration-300"
                    >
                        <ArrowLeft size={16} />
                        Tất cả dự án
                    </Link>
                </div>

                {/* Title overlay */}
                <div className="absolute bottom-0 left-0 right-0 px-6 pb-12 py-20 bg-gradient-to-t from-black via-black/80 to-transparent">
                    <div className="max-w-6xl mx-auto">
                        <span className="inline-flex items-center gap-1.5 px-4 py-1.5 text-[11px] font-bold tracking-widest uppercase rounded-sm bg-[#c8a45c]/20 text-[#c8a45c] border border-[#c8a45c]/30 backdrop-blur-md mb-6 animate-fade-in">
                            <Tag size={12} className="text-[#c8a45c]" />
                            {project.category || "Nhà phố"}
                        </span>
                        <h1
                            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-8 tracking-tight max-w-4xl"
                            style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                            {project.title}
                        </h1>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-white/70 font-medium">
                            {project.location && (
                                <span className="flex items-center gap-1.5 bg-white/5 backdrop-blur-md px-4 py-2 rounded-sm border border-white/10 text-[13px] uppercase tracking-wider">
                                    <MapPin size={14} className="text-[#c8a45c]" />
                                    {project.location}
                                </span>
                            )}
                            {project.area && (
                                <span className="flex items-center gap-1.5 bg-white/5 backdrop-blur-md px-4 py-2 rounded-sm border border-white/10 text-[13px] uppercase tracking-wider">
                                    <Ruler size={14} className="text-[#c8a45c]" />
                                    {project.area}
                                </span>
                            )}
                            {project.year && (
                                <span className="flex items-center gap-1.5 bg-white/5 backdrop-blur-md px-4 py-2 rounded-sm border border-white/10 text-[13px] uppercase tracking-wider">
                                    <CalendarIcon size={14} className="text-[#c8a45c]" />
                                    Năm {project.year}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Content ── */}
            <section className="py-24 px-6 bg-[#0a0a0a]">
                <div className="max-w-4xl mx-auto">

                    <div className="bg-[#141414] border border-white/5 p-8 md:p-16 mb-16 relative">
                        {/* Decorative Corners */}
                        <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-[#c8a45c]/30" />
                        <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-[#c8a45c]/30" />
                        <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-[#c8a45c]/30" />
                        <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-[#c8a45c]/30" />

                        <div className="flex items-center gap-3 mb-6">
                            <span className="text-[#c8a45c] text-[12px] font-bold tracking-[0.2em] uppercase">TỔNG QUAN DỰ ÁN</span>
                            <div className="w-12 h-px bg-[#c8a45c]/50" />
                        </div>

                        <div className="prose prose-invert prose-p:text-white/70 prose-p:leading-relaxed prose-p:text-[16px] prose-headings:text-white prose-headings:font-serif prose-a:text-[#c8a45c] focus:outline-none max-w-none">
                            {project.description ? (
                                <PortableText value={project.description} />
                            ) : (
                                <div className="py-10 text-white/40 italic">
                                    Chi tiết dự án đang được cập nhật.
                                </div>
                            )}
                        </div>

                        {/* Gallery Section */}
                        {project.gallery && project.gallery.length > 0 && (
                            <div className="mt-16 sm:mt-24">
                                <div className="flex items-center gap-3 mb-10">
                                    <span className="text-[#c8a45c] text-[12px] font-bold tracking-[0.2em] uppercase">CHI TIẾT KIẾN TRÚC</span>
                                    <div className="w-12 h-px bg-[#c8a45c]/50" />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                                    {project.gallery.map((img: any, idx: number) => (
                                        <div
                                            key={idx}
                                            className={`relative overflow-hidden border border-white/5 group ${idx % 5 === 0 ? "md:col-span-2 aspect-[16/9]" : "aspect-[4/5] md:aspect-square"
                                                }`}
                                        >
                                            <Image
                                                src={urlFor(img).url()}
                                                alt={`${project.title} - Ảnh ${idx + 1}`}
                                                fill
                                                className="object-cover transition-transform duration-[2s] group-hover:scale-110"
                                                sizes="(max-width: 768px) 100vw, 50vw"
                                            />
                                            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-700" />

                                            {/* Decorative label */}
                                            <div className="absolute bottom-4 left-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                                <span className="text-[10px] font-bold text-white/80 tracking-widest uppercase bg-black/40 backdrop-blur-md px-3 py-1 border border-white/10">
                                                    View {idx + 1}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Feature grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-5 mt-16 pt-10 border-t border-white/10">
                            {[
                                "Khảo sát thực tế",
                                "Thiết kế 3D trực quan",
                                "Vật liệu cao cấp",
                                "Thi công trọn gói",
                                "Bảo hành dài hạn",
                                "Đúng tiến độ",
                            ].map((f) => (
                                <div key={f} className="flex items-center gap-3 text-[14px] font-medium text-white/60">
                                    <div className="w-4 h-4 rounded-full bg-[#c8a45c]/10 flex items-center justify-center flex-shrink-0 border border-[#c8a45c]/30">
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#c8a45c]" />
                                    </div>
                                    {f}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="relative p-12 lg:p-16 text-center border border-[#c8a45c]/20 bg-[#141414]">
                        <div className="relative z-10">
                            <div className="flex justify-center mb-6">
                                <div className="w-16 h-1 bg-[#c8a45c]" />
                            </div>
                            <h3
                                className="text-3xl md:text-4xl font-bold text-white mb-6 uppercase"
                                style={{ fontFamily: "'Playfair Display', serif" }}
                            >
                                BẠN MUỐN CÓ <span className="italic font-light text-[#c8a45c]">KHÔNG GIAN</span> TƯƠNG TỰ?
                            </h3>
                            <p className="text-white/60 text-[15px] mb-10 max-w-xl mx-auto leading-relaxed">
                                Để lại thông tin liên hệ, đội ngũ kỹ sư và kiến trúc sư của chúng tôi sẽ tư vấn và lên bản vẽ thiết kế phù hợp nhất với phong cách và ngân sách của bạn.
                            </p>
                            <Link
                                href="/lien-he"
                                className="inline-flex justify-center items-center gap-2 bg-[#c8a45c] text-black text-[12px] font-bold tracking-[0.2em] uppercase px-10 py-4 hover:bg-white transition-all duration-300"
                            >
                                <MapPin size={16} />
                                NHẬN TƯ VẤN MIỄN PHÍ
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Related projects ── */}
            {relatedProjects.length > 0 && (
                <section className="py-24 px-6 bg-[#0e0e0e] border-t border-[#c8a45c]/10 relative">
                    <div className="max-w-7xl mx-auto relative z-10">
                        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
                            <div>
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="text-[#c8a45c] text-[12px] font-bold tracking-[0.2em] uppercase">DỰ ÁN KHÁC</span>
                                    <div className="w-12 h-px bg-[#c8a45c]/50" />
                                </div>
                                <h2
                                    className="text-4xl md:text-5xl font-bold text-white"
                                    style={{ fontFamily: "'Playfair Display', serif" }}
                                >
                                    CÁC CÔNG TRÌNH <br />
                                    <span className="italic font-light text-[#c8a45c]">TIÊU BIỂU</span> KHÁC
                                </h2>
                            </div>
                            <Link
                                href="/du-an"
                                className="inline-flex items-center gap-2 px-8 py-3 border border-white/20 text-white text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-[#c8a45c] hover:border-[#c8a45c] hover:text-black transition-all"
                            >
                                XEM TẤT CẢ
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {relatedProjects.map((rp: any) => (
                                <Link
                                    key={rp.slug}
                                    href={`/du-an/${rp.slug}`}
                                    className="group block relative aspect-[4/5] overflow-hidden bg-[#141414] border border-white/5"
                                >
                                    <div className="absolute inset-0">
                                        {rp.mainImage && (
                                            <Image
                                                src={urlFor(rp.mainImage).url()}
                                                alt={rp.title}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                                sizes="(max-width: 768px) 100vw, 33vw"
                                            />
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80" />
                                        <span className="absolute top-6 left-6 inline-flex px-4 py-1.5 font-bold text-[10px] uppercase tracking-widest bg-[#c8a45c] text-black">
                                            {rp.category}
                                        </span>
                                    </div>
                                    <div className="absolute bottom-0 left-0 right-0 p-8 z-10 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                        <h4
                                            className="text-2xl font-bold text-white leading-tight mb-4"
                                            style={{ fontFamily: "'Playfair Display', serif" }}
                                        >
                                            {rp.title}
                                        </h4>
                                        <span className="inline-flex items-center gap-2 text-[11px] font-bold text-[#c8a45c] uppercase tracking-widest">
                                            KHÁM PHÁ <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
}
