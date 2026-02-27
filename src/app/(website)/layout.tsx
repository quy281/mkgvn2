import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "MINH KHUÊ GROUP | Kiến trúc & Nội thất cao cấp",
  description:
    "Công ty TNHH Kiến trúc và Nội thất Minh Khuê - Nâng tầm không gian sống. Thiết kế, thi công nội thất cao cấp cho chung cư, biệt thự, nhà phố.",
  keywords: [
    "nội thất",
    "thiết kế nội thất",
    "thi công nội thất",
    "Minh Khuê",
    "MKG",
    "Fadi",
    "nội thất cao cấp",
  ],
  openGraph: {
    title: "MINH KHUÊ GROUP | Kiến trúc & Nội thất cao cấp",
    description:
      "Nâng tầm không gian sống - Thiết kế, thi công nội thất cao cấp",
    url: "https://mkg.vn",
    siteName: "MKG.VN",
    type: "website",
    locale: "vi_VN",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
