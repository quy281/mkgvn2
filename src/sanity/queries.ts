import { groq } from 'next-sanity';

// Lấy tất cả cài đặt website
export const getSiteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    companyName,
    slogan,
    logo,
    heroSlides,
    aboutText,
    phone,
    email,
    addresses,
    socialLinks,
    stats,
    skills,
    videoUrl
  }
`;

// Lấy danh sách dịch vụ (sắp xếp theo order)
export const getServicesQuery = groq`
  *[_type == "service"] | order(order asc) {
    _id,
    title,
    "slug": slug.current,
    icon,
    shortDesc,
    image,
    features
  }
`;

// Lấy dự án nổi bật (trang chủ)
export const getFeaturedProjectsQuery = groq`
  *[_type == "project" && featured == true] | order(order asc) [0...6] {
    _id,
    title,
    "slug": slug.current,
    category,
    mainImage
  }
`;

// Lấy tất cả dự án
export const getAllProjectsQuery = groq`
  *[_type == "project"] | order(order asc) {
    _id,
    title,
    "slug": slug.current,
    category,
    mainImage
  }
`;

// Lấy chi tiết 1 dự án
export const getProjectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    title,
    category,
    mainImage,
    gallery,
    area,
    location,
    year,
    description
  }
`;

// Lấy bài viết mới nhất (trang chủ)
export const getLatestPostsQuery = groq`
  *[_type == "blogPost" && status == "published"] | order(publishedAt desc) [0...3] {
    _id,
    title,
    "slug": slug.current,
    "category": category->title,
    "categorySlug": category->slug.current,
    mainImage,
    excerpt,
    publishedAt
  }
`;

// Lấy tất cả bài viết
export const getAllPostsQuery = groq`
  *[_type == "blogPost" && status == "published"] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    "category": category->title,
    mainImage,
    excerpt,
    publishedAt
  }
`;

// Lấy chi tiết bài viết
export const getPostBySlugQuery = groq`
  *[_type == "blogPost" && slug.current == $slug][0] {
    title,
    "category": category->title,
    mainImage,
    gallery,
    body,
    author,
    publishedAt
  }
`;

// Lấy đánh giá khách hàng
export const getTestimonialsQuery = groq`
  *[_type == "testimonial"] | order(order asc) {
    _id,
    name,
    role,
    quote,
    avatar,
    rating
  }
`;
