"use client";

import Image from "next/image";
import { Play } from "lucide-react";
import { useState } from "react";

interface VideoCTASectionProps {
    videoUrl?: string; // e.g., YouTube embed URL
}

export default function VideoCTASection({ videoUrl }: VideoCTASectionProps) {
    const [isPlaying, setIsPlaying] = useState(false);

    return (
        <section className="relative h-[500px] lg:h-[700px] w-full flex items-center justify-center overflow-hidden">

            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/placeholder.jpg"
                    alt="MKG Factory Video"
                    fill
                    className={`object-cover transition-transform duration-[20s] ${isPlaying ? 'scale-110' : 'scale-100'}`}
                    sizes="100vw"
                />
                <div className="absolute inset-0 bg-black/60" />
            </div>

            <div className="section-container relative z-10 text-center">
                {isPlaying && videoUrl ? (
                    <div className="absolute inset-0 z-50 flex items-center justify-center p-4">
                        <div className="relative w-full max-w-5xl aspect-video bg-black shadow-2xl rounded-lg overflow-hidden border border-[#c8a45c]/20">
                            <button
                                onClick={() => setIsPlaying(false)}
                                className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-[#c8a45c] hover:text-black transition-colors"
                            >
                                ✕
                            </button>
                            <iframe
                                src={videoUrl + "?autoplay=1"}
                                allow="autoplay; encrypted-media"
                                allowFullScreen
                                className="w-full h-full"
                            />
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center">

                        {/* Play Button */}
                        <button
                            onClick={() => setIsPlaying(true)}
                            className="group relative w-24 h-24 mb-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-[#c8a45c] transition-all duration-500 backdrop-blur-sm"
                        >
                            <div className="absolute inset-0 rounded-full border border-white/30 group-hover:border-transparent animate-[ping_3s_ease-out_infinite]" />
                            <div className="absolute inset-2 rounded-full border border-white/20 group-hover:border-transparent animate-[ping_3s_ease-out_infinite_500ms]" />

                            <Play
                                size={32}
                                className="text-white group-hover:text-black ml-2 transition-colors duration-500"
                                fill="currentColor"
                            />
                        </button>

                        <h2
                            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white uppercase mb-6 leading-tight max-w-3xl"
                            style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                            THIẾT KẾ ĐỘC BẢN <br />
                            <span className="italic font-light text-[#c8a45c]">SẢN XUẤT</span> TRỰC TIẾP
                        </h2>

                        <p className="text-white/60 text-[15px] md:text-[18px] max-w-2xl font-light">
                            Khám phá nhà máy Fadisa với hệ thống máy CNC hiện đại, quy trình sản xuất khép kín mang lại chất lượng hoàn mỹ cho từng sản phẩm nội thất.
                        </p>

                    </div>
                )}
            </div>
        </section>
    );
}
