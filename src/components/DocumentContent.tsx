import { DocumentRenderer } from "@keystatic/core/renderer";
import Image from "next/image";

// Custom components để render nội dung từ Keystatic theo design system của MKG
const renderers = {
    inline: {
        bold: ({ children }: any) => <strong>{children}</strong>,
    },
    block: {
        heading: ({ level, children, textAlign }: any) => {
            const alignment = textAlign ? `text-${textAlign}` : "";
            switch (level) {
                case 1:
                    return <h1 className={`text-3xl font-bold mt-10 mb-6 text-foreground ${alignment}`}>{children}</h1>;
                case 2:
                    return <h2 className={`text-2xl font-bold mt-10 mb-5 text-foreground ${alignment}`}>{children}</h2>;
                case 3:
                    return <h3 className={`text-xl font-bold mt-8 mb-4 text-foreground/90 ${alignment}`}>{children}</h3>;
                case 4:
                    return <h4 className={`text-lg font-bold mt-6 mb-3 text-foreground/80 ${alignment}`}>{children}</h4>;
                default:
                    return <h5 className={`font-bold mt-4 mb-2 ${alignment}`}>{children}</h5>;
            }
        },
        paragraph: ({ children, textAlign }: any) => {
            const alignment = textAlign ? `text-${textAlign}` : "";
            return <p className={`text-foreground/70 leading-relaxed mb-6 ${alignment}`}>{children}</p>;
        },
        list: ({ type, children }: any) => {
            if (type === "ordered") {
                return <ol className="list-decimal pl-6 mb-6 space-y-2 text-foreground/70">{children}</ol>;
            }
            return <ul className="list-disc pl-6 mb-6 space-y-2 text-foreground/70">{children}</ul>;
        },
        layout: ({ layout, children }: any) => {
            return (
                <div className={`grid gap-6 mb-8 mt-4 grid-cols-1 md:grid-cols-${layout.length}`}>
                    {children}
                </div>
            );
        },
        image: ({ src, alt, title }: any) => {
            return (
                <figure className="my-10 rounded-xl overflow-hidden glass-card p-2 w-fit mx-auto">
                    <div className="relative aspect-video w-full max-w-4xl mx-auto rounded-lg overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={src} alt={alt || ""} title={title} className="object-cover w-full h-full" />
                    </div>
                    {title && <figcaption className="text-center text-sm text-foreground/50 mt-3">{title}</figcaption>}
                </figure>
            );
        },
        divider: () => <hr className="my-12 border-white/10" />,
    },
};

export default function DocumentContent({ document }: { document: any[] }) {
    if (!document || !Array.isArray(document)) return null;
    return (
        <div className="keystatic-content">
            <DocumentRenderer document={document} renderers={renderers} />
        </div>
    );
}
