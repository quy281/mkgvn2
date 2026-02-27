import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import PortfolioSection from "@/components/sections/PortfolioSection";
import ProcessSection from "@/components/sections/ProcessSection";
import ServicesSection from "@/components/sections/ServicesSection";
import ExpertiseSection from "@/components/sections/ExpertiseSection";
import VideoCTASection from "@/components/sections/VideoCTASection";
import SkillsSection from "@/components/sections/SkillsSection";
import StatsSection from "@/components/sections/StatsSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import ContactSection from "@/components/sections/ContactSection";
import BlogSection from "@/components/sections/BlogSection";

import { client } from "@/sanity/client";
import {
  getSiteSettingsQuery,
  getFeaturedProjectsQuery,
  getServicesQuery,
  getLatestPostsQuery,
  getTestimonialsQuery
} from "@/sanity/queries";
import {
  companyInfo,
  heroSlides,
  blogPosts as mockPosts,
  projects as mockProjects,
  services as mockServices
} from "@/data/site-data";

const RibbonSeparator = () => (
  <div className="section-ribbon">
    <div className="ribbon-line-glow" />
    <div className="ribbon-center">
      <span className="ribbon-icon">MKG</span>
    </div>
  </div>
);

export default async function HomePage() {
  // Fetch all data in parallel
  const [
    siteSettings,
    featuredProjects,
    services,
    latestPosts,
    testimonials
  ] = await Promise.all([
    client.fetch(getSiteSettingsQuery).catch(() => null),
    client.fetch(getFeaturedProjectsQuery).catch(() => []),
    client.fetch(getServicesQuery).catch(() => []),
    client.fetch(getLatestPostsQuery).catch(() => []),
    client.fetch(getTestimonialsQuery).catch(() => [])
  ]);

  // Handle hero slides
  const slides = siteSettings?.heroSlides || heroSlides.map(s => s.image);
  const slogan = siteSettings?.slogan || companyInfo.slogan;
  const aboutText = siteSettings?.aboutText || companyInfo.aboutText;
  const skills = siteSettings?.skills || companyInfo.skills;
  const stats = siteSettings?.stats || companyInfo.stats;
  const videoUrl = siteSettings?.videoUrl || companyInfo.videoUrl;

  // Fallback to mock data if Sanity returns empty results
  const displayPosts = latestPosts && latestPosts.length > 0
    ? latestPosts
    : mockPosts.map(p => ({
      _id: `mock-${p.id}`,
      title: p.title,
      slug: p.slug,
      excerpt: p.excerpt,
      publishedAt: p.date,
      mainImage: p.featuredImage,
      category: { title: p.category }
    }));

  const displayProjects = featuredProjects && featuredProjects.length > 0
    ? featuredProjects
    : mockProjects.map(p => ({
      _id: `mock-${p.id}`,
      title: p.title,
      slug: p.slug,
      category: p.category,
      mainImage: p.image
    }));

  const displayServices = services && services.length > 0
    ? services
    : mockServices.map(s => ({
      _id: `mock-${s.id}`,
      title: s.title,
      slug: s.slug,
      shortDesc: s.description,
      image: s.image
    }));

  return (
    <>
      <HeroSection
        slides={slides}
        slogan={slogan}
      />

      <RibbonSeparator />

      <AboutSection
        aboutText={aboutText}
      />

      <RibbonSeparator />

      <PortfolioSection
        projects={displayProjects}
      />

      <RibbonSeparator />

      <ProcessSection />

      <RibbonSeparator />

      <ServicesSection
        services={displayServices}
      />

      <RibbonSeparator />

      <ExpertiseSection />

      <RibbonSeparator />

      <VideoCTASection videoUrl={videoUrl} />

      <RibbonSeparator />

      <SkillsSection skills={skills} />

      <RibbonSeparator />

      <StatsSection stats={stats} />

      <RibbonSeparator />

      <TestimonialsSection
        testimonials={testimonials || []}
      />

      <RibbonSeparator />

      <BlogSection
        posts={displayPosts}
      />
    </>
  );
}
