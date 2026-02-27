export const products = Array.from({ length: 30 }).map((_, i) => ({
  id: i + 1,
  name: "Sản phẩm MKG Công nghiệp " + (i + 1),
  slug: "san-pham-mkg-" + (i + 1),
  price: (Math.floor(Math.random() * 50) + 10) * 100000,
  image: "https://picsum.photos/seed/" + (i + 1) + "/400/400",
  description: "Đây là mô tả chi tiết cho sản phẩm số " + (i + 1) + " của MKG. Hệ thống vận hành bền bỉ, bảo hành chính hãng 12 tháng, phù hợp triển khai dự án."
}));
