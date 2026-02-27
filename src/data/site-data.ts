// ===== COMPANY INFO =====
export const companyInfo = {
    name: "MINH KHUÊ GROUP",
    fullName: "Công ty TNHH Kiến trúc và Nội thất Minh Khuê",
    slogan: "Nâng tầm không gian sống",
    logo: "/images/logo/logo-mkg.jpg",
    description:
        "Công ty TNHH Kiến trúc và Nội thất Minh Khuê tự hào mang đến sự toàn diện, đáp ứng mọi nhu cầu thiết kế, thi công và hoàn thiện nội thất cho khách hàng.",
    aboutText:
        "Chúng tôi tâm niệm rằng khách hàng chính là linh hồn của mọi dự án. Chúng tôi đồng hành cùng bạn trên mọi chặng đường, từ lên ý tưởng cho đến biến ý tưởng đó thành hiện thực. Đặc biệt, chúng tôi luôn đề cao nét tinh hoa truyền thống và kết hợp chúng trong những thiết kế đổi mới của mình.",
    brands: [
        {
            name: "Fadi",
            description: "Thiết kế và thi công nội thất cao cấp",
            color: "#ed1c24",
        },
        {
            name: "Fadisa",
            description: "Gia công CNC chính xác",
            color: "#ed1c24",
        },
        {
            name: "Modi",
            description: "Cung cấp sỉ lẻ nội thất thông minh",
            color: "#ed1c24",
        },
    ],
    contact: {
        addresses: [
            "Số 8 đường 79, Phường Tân Quy, Quận 7, TP.HCM",
        ],
        hotline: "0932 084 444",
        phones: ["0932 084 444", "0934 389 181"],
        email: "fadifurnitures@gmail.com",
        website: "https://mkg.vn"
    },
    social: {
        facebook: "https://facebook.com/mkg.vn",
        youtube: "https://youtube.com/c/mkg",
        zalo: "https://zalo.me/", // Update with actual Zalo link
    },
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder video
    skills: [
        { name: "Thiết kế Nội thất", percentage: 95 },
        { name: "Thi công Xây dựng", percentage: 90 },
        { name: "Gia công CNC", percentage: 98 },
        { name: "Sản xuất Đồ gỗ", percentage: 95 }
    ],
    stats: [
        { label: "Năm Kinh Nghiệm", number: "10+" },
        { label: "Dự Án Hoàn Thành", number: "500+" },
        { label: "Khách Hàng Hài Lòng", number: "1500+" },
        { label: "Giải Thưởng Thiết Kế", number: "25" }
    ]
};

// ===== HERO SLIDES =====
export const heroSlides = [
    {
        id: 1,
        image:
            "/images/hero/hero-slide-1.png",
        alt: "Minh Khuê Group - Nội thất cao cấp",
    },
    {
        id: 2,
        image:
            "/images/hero/hero-slide-2.png",
        alt: "Minh Khuê Group - Thiết kế nội thất",
    },
];

// ===== SERVICES =====
export const services = [
    {
        id: 1,
        title: "Thiết kế nội thất",
        slug: "dich-vu-tu-van-thiet-ke-noi-that",
        description:
            "Với tâm niệm khách hàng là linh hồn của mọi dự án, chúng tôi luôn tin khách hàng mới thật sự làm nên không gian của chính mình. Chúng tôi đồng hành để giúp khách hàng định hình lại phong cách của chính mình.",
        image:
            "/images/services/service-design.jpg",
        features: [
            "Thiết kế nội thất chung cư",
            "Thiết kế nội thất biệt thự",
            "Thiết kế nội thất nhà phố",
        ],
    },
    {
        id: 2,
        title: "Thi công nội thất",
        slug: "dich-vu-thi-cong-noi-that",
        description:
            "Chúng tôi tin rằng một không gian đẹp là nhờ sự tinh tế và hài hòa. Nhằm đem đến cho khách hàng không gian sống thoải mái, tiện nghi, thể hiện rõ nghệ thuật sống phong cách.",
        image:
            "/images/services/service-construction.jpg",
        features: [
            "Thi công trọn gói",
            "Sử dụng vật liệu cao cấp",
            "Bảo hành dài hạn",
        ],
    },
];

// ===== PROJECTS =====
export type Project = {
    id: number;
    title: string;
    slug: string;
    category: string;
    image: string;
    link: string;
};

export const projects: Project[] = [
    {
        id: 1,
        title: "DỰ ÁN NHÀ PHỐ – LONG AN",
        slug: "du-an-nha-pho-long-an",
        category: "Nhà phố",
        image:
            "/images/projects/project-nha-pho-long-an.jpg",
        link: "/du-an/nha-pho/du-an-nha-pho-long-an",
    },
    {
        id: 2,
        title: "Saigon South Residences",
        slug: "chung-cu-saigon-south-residences",
        category: "Chung cư",
        image:
            "/images/projects/project-saigon-south.jpg",
        link: "/du-an/chung-cu/chung-cu-saigon-south-residences",
    },
    {
        id: 3,
        title: "Căn hộ Sunrise City View",
        slug: "thiet-ke-noi-that-sunrise-city-view",
        category: "Chung cư",
        image:
            "/images/projects/project-sunrise-city.jpg",
        link: "/du-an/chung-cu/thiet-ke-noi-that-sunrise-city-view",
    },
    {
        id: 4,
        title: "Căn hộ Zenity Quận 1",
        slug: "can-ho-zenith-quan-1",
        category: "Chung cư",
        image:
            "/images/projects/project-zenity-q1.jpg",
        link: "/du-an/chung-cu/can-ho-zenith-quan-1",
    },
    {
        id: 5,
        title: "Căn hộ Him Lam Riverside – Block F_15.XX",
        slug: "can-ho-him-lam",
        category: "Chung cư",
        image:
            "/images/projects/project-him-lam.jpg",
        link: "/du-an/chung-cu/can-ho-him-lam",
    },
    {
        id: 6,
        title: "Dự án nhà phố: Lâm Hà, Lâm Đồng",
        slug: "nha-anh-thien-chi-hang",
        category: "Nhà phố",
        image:
            "/images/projects/project-lam-ha.jpg",
        link: "/du-an/nha-pho/nha-anh-thien-chi-hang",
    },
];

// ===== BLOG POSTS =====
export type BlogPost = {
    id: number;
    title: string;
    slug: string;
    date: string;
    excerpt: string;
    category: string;
    categorySlug: string;
    featuredImage: string;
};

export const blogPosts: BlogPost[] = [
    {
        id: 2561,
        title: "MẪU BÀN HỌC DÀNH CHO CÁC BÉ",
        slug: "mau-ban-hoc-danh-cho-cac-be",
        date: "2024-07-26",
        excerpt: "Các Yếu Tố Chính Của Bàn Học Cho Bé: Chiều Cao Điều Chỉnh, Thiết kế bàn học nên có khả năng điều chỉnh chiều cao để phù hợp với sự phát triển của bé...",
        category: "Tin tức",
        categorySlug: "tin-tuc",
        featuredImage: "/images/blog/blog-ban-hoc.jpg",
    },
    {
        id: 2554,
        title: "NHỮNG MẪU BÀN ĂN – PHÙ HỢP CHO GIA ĐÌNH NHÀ CỦA BẠN",
        slug: "nhung-mau-ban-an-phu-hop-cho-can-nha-cua-ban",
        date: "2024-07-26",
        excerpt: "Các Yếu Tố Chính Thiết Kế Tinh Tế và Tối Giản: Hình Dáng kiểu dáng bàn ăn hiện đại thường có thiết kế đơn giản với đường nét sạch sẽ...",
        category: "Tin tức",
        categorySlug: "tin-tuc",
        featuredImage: "/images/blog/blog-ban-an.jpg",
    },
    {
        id: 2550,
        title: "30+ MẪU TỦ ÁO HIỆN ĐẠI",
        slug: "30-mau-tu-ao-hien-dai",
        date: "2024-07-26",
        excerpt: "Thiết Kế Tinh Tế và Tối Giản: Hình Dáng Đơn Giản, tủ áo hiện đại thường có đường nét sạch sẽ và thiết kế tối giản...",
        category: "Mẫu thiết kế",
        categorySlug: "phong-cach-song",
        featuredImage: "/images/blog/blog-tu-ao.jpg",
    },
    {
        id: 2547,
        title: "30+ PHONG CÁCH BÀN LÀM VIỆC",
        slug: "30-phong-cach-ban-lam-viec",
        date: "2024-07-25",
        excerpt: "Bàn làm việc không chỉ đơn giản là một nơi để làm việc mà còn là trung tâm của sự sáng tạo và hiệu quả trong công việc hàng ngày...",
        category: "Mẫu thiết kế",
        categorySlug: "phong-cach-song",
        featuredImage: "/images/blog/blog-ban-lam-viec.jpg",
    },
    {
        id: 2543,
        title: "MẪU PHÒNG NGỦ HIỆN ĐẠI",
        slug: "mau-phong-ngu-hien-dai",
        date: "2024-07-25",
        excerpt: "Phòng ngủ là không gian quan trọng nhất trong căn nhà, nơi mà chúng ta có thể thư giãn, tái tạo năng lượng sau một ngày làm việc mệt mỏi...",
        category: "Mẫu thiết kế",
        categorySlug: "phong-cach-song",
        featuredImage: "/images/blog/blog-phong-ngu.jpg",
    },
    {
        id: 2538,
        title: "MẪU BÀN TRANG ĐIỂM TÔ THÊM VẺ CHO CĂN PHÒNG",
        slug: "mau-ban-trang-diem-to-them-ve-cho-can-phong",
        date: "2024-07-25",
        excerpt: "Bàn trang điểm không chỉ đơn thuần là một món đồ nội thất, mà còn là một không gian đặc biệt được dành riêng để làm đẹp và tự tin cho phái đẹp...",
        category: "Mẫu thiết kế",
        categorySlug: "phong-cach-song",
        featuredImage: "/images/blog/blog-ban-trang-diem.jpg",
    },
    {
        id: 2514,
        title: "30+ MẪU GIƯỜNG TẦNG KHÔNG THỂ THIẾU TRONG NGÔI NHÀ",
        slug: "30-mau-giuong-tang-khong-the-thieu-trong-ngoi-nha",
        date: "2024-07-25",
        excerpt: "Giường tầng, hay còn gọi là giường đôi tầng, là một trong những giải pháp thông minh giúp tối ưu hóa diện tích sống...",
        category: "Mẫu thiết kế",
        categorySlug: "phong-cach-song",
        featuredImage: "/images/blog/blog-giuong-tang.jpg",
    },
    {
        id: 2222,
        title: "XU HƯỚNG MÀU SẮC NỘI THẤT NĂM 2025",
        slug: "xu-huong-mau-sac-noi-that-2025",
        date: "2025-01-15",
        excerpt: "Khám phá những bảng màu sẽ dẫn đầu xu hướng trang trí nội thất trong năm tới, từ tông đất ấm áp đến sắc xanh huyền bí...",
        category: "Tin tức",
        categorySlug: "tin-tuc",
        featuredImage: "https://images.unsplash.com/photo-1616486341351-79b90c19a97d?auto=format&fit=crop&w=800&q=80",
    },
    {
        id: 2219,
        title: "PHONG CÁCH LUXURY – TÔ ĐIỂM CHO SỰ NỔI BẬT",
        slug: "phong-cach-luxury-to-diem-cho-su-noi-bat",
        date: "2024-06-29",
        excerpt: "Phong cách luxury là một trong những phong cách thời thượng luôn chiếm vị trí hàng top trong xu hướng thiết kế nội thất...",
        category: "Mẫu thiết kế",
        categorySlug: "phong-cach-song",
        featuredImage: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80",
    },
    {
        id: 2206,
        title: "BÍ QUYẾT TỐI ƯU KHÔNG GIAN CĂN HỘ NHỎ",
        slug: "bi-quyet-toi-uu-khong-gian-can-ho-nho",
        date: "2024-11-20",
        excerpt: "Làm thế nào để biến một căn hộ diện tích hạn hẹp thành không gian sống tiện nghi và rộng rãi bằng nội thất thông minh...",
        category: "Tin tức",
        categorySlug: "tin-tuc",
        featuredImage: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80",
    },
    {
        id: 2092,
        title: "XU HƯỚNG THIẾT KẾ PHÒNG BẾP NHÀ ỐNG 5M",
        slug: "xu-huong-thiet-ke-phong-bep-nha-ong-5m",
        date: "2024-06-17",
        excerpt: "Những căn nhà ống vốn có đặc điểm nhỏ nhắn, bó hẹp về diện tích bởi quỹ đất xây dựng hạn hẹp...",
        category: "Mẫu thiết kế",
        categorySlug: "phong-cach-song",
        featuredImage: "https://images.unsplash.com/photo-1556912177-f32a762886c5?auto=format&fit=crop&w=800&q=80",
    },
    {
        id: 3001,
        title: "NGHỆ THUẬT SẮP ĐẶT ÁNH SÁNG TRONG NỘI THẤT",
        slug: "nghe-thuat-sap-dat-anh-sang-trong-noi-that",
        date: "2024-12-05",
        excerpt: "Ánh sáng không chỉ để thắp sáng mà còn là linh hồn tạo nên cảm xúc và chiều sâu cho không gian sống của bạn...",
        category: "Mẫu thiết kế",
        categorySlug: "phong-cach-song",
        featuredImage: "https://images.unsplash.com/photo-1513519247388-4a26d18b3bd1?auto=format&fit=crop&w=800&q=80",
    },
    {
        id: 3002,
        title: "PHONG CÁCH INDOCHINE - NÉT ĐẸP HOÀI CỔ",
        slug: "phong-cach-indochine-net-dep-hoai-co",
        date: "2024-12-10",
        excerpt: "Sự kết hợp hoàn hảo giữa nét lãng mạn của kiến trúc Pháp và sự mộc mạc của tâm hồn Á Đông trong thiết kế đương đại...",
        category: "Mẫu thiết kế",
        categorySlug: "phong-cach-song",
        featuredImage: "https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?auto=format&fit=crop&w=800&q=80",
    },
    {
        id: 3003,
        title: "VẬT LIỆU XANH TRONG KIẾN TRÚC HIỆN ĐẠI",
        slug: "vat-lieu-xanh-trong-kien-truc-hien-dai",
        date: "2024-12-15",
        excerpt: "Tại sao vật liệu bền vững đang trở thành lựa chọn hàng đầu cho các chủ nhân biệt thự và căn hộ cao cấp ngày nay...",
        category: "Tin tức",
        categorySlug: "tin-tuc",
        featuredImage: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=800&q=80",
    },
    {
        id: 3004,
        title: "7 MẪU SOFA DA CAO CẤP CHO PHÒNG KHÁCH",
        slug: "7-mau-sofa-da-cao-cap",
        date: "2024-12-20",
        excerpt: "Điểm qua những mẫu sofa da thật được chế tác thủ công, mang lại vẻ đẹp đẳng cấp và sự thư giãn tuyệt đối cho gia đình...",
        category: "Mẫu thiết kế",
        categorySlug: "phong-cach-song",
        featuredImage: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80",
    },
    {
        id: 3005,
        title: "CÔNG NGHỆ NHÀ THÔNG MINH TRONG NỘI THẤT",
        slug: "cong-nghe-nha-thong-minh",
        date: "2024-12-25",
        excerpt: "Tích hợp hệ thống Smarthome vào thiết kế nội thất để mang lại cuộc sống tiện nghi, an toàn và hiện đại hơn bao giờ hết...",
        category: "Tin tức",
        categorySlug: "tin-tuc",
        featuredImage: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=800&q=80",
    },
    {
        id: 3006,
        title: "THIẾT KẾ PHÒNG TẮM CHUẨN SPA TẠI GIA",
        slug: "thiet-ke-phong-tam-chuan-spa",
        date: "2025-01-05",
        excerpt: "Biến không gian phòng tắm thành nơi thư giãn đúng nghĩa với bồn tắm nằm, vòi sen âm trần và đá tự nhiên cao cấp...",
        category: "Mẫu thiết kế",
        categorySlug: "phong-cach-song",
        featuredImage: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=800&q=80",
    },
    {
        id: 3007,
        title: "CÁCH CHỌN RÈM CỬA PHÙ HỢP VỚI CĂN HỘ",
        slug: "cach-chon-rem-cua-phu-hop",
        date: "2025-01-08",
        excerpt: "Hướng dẫn chọn màu sắc, chất liệu và kiểu dáng rèm cửa để vừa cản nắng vừa tăng tính thẩm mỹ cho không gian...",
        category: "Tin tức",
        categorySlug: "tin-tuc",
        featuredImage: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
    },
    {
        id: 3008,
        title: "TỦ RƯỢU ÂM TƯỜNG CHO PHÒNG KHÁCH SANG TRỌNG",
        slug: "tu-ruou-am-tuong-sang-trong",
        date: "2025-01-12",
        excerpt: "Những ý tưởng thiết kế tủ rượu không chỉ để lưu trữ mà còn là điểm nhấn thể hiện gu thẩm mỹ của gia chủ...",
        category: "Mẫu thiết kế",
        categorySlug: "phong-cach-song",
        featuredImage: "https://images.unsplash.com/photo-1505275350441-83dcda8eeef5?auto=format&fit=crop&w=800&q=80",
    },
    {
        id: 3009,
        title: "BÍ QUYẾT BỐ TRÍ PHÒNG THỜ TRANG NGHIÊM",
        slug: "bi-quyet-bo-tri-phong-tho",
        date: "2025-01-20",
        excerpt: "Nguyên tắc phong thủy và các mẫu bàn thờ gỗ tự nhiên cao cấp mang lại sự bình an và tài lộc cho gia đình...",
        category: "Tin tức",
        categorySlug: "tin-tuc",
        featuredImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    },
    {
        id: 3010,
        title: "NỘI THẤT PHÒNG KHÁCH LIÊN THÔNG BẾP",
        slug: "noi-that-phong-khach-lien-thong-bep",
        date: "2025-01-25",
        excerpt: "Giải pháp kiến tạo không gian mở, tạo sự kết nối liền mạch giữa các khu vực chức năng trong căn nhà hiện đại...",
        category: "Mẫu thiết kế",
        categorySlug: "phong-cach-song",
        featuredImage: "https://images.unsplash.com/photo-1620626011761-9963d7521476?auto=format&fit=crop&w=800&q=80",
    },
    {
        id: 3011,
        title: "Ý TƯỞNG THIẾT KẾ BAN CÔNG THÀNH NƠI CHILL",
        slug: "y-tuong-thiet-ke-ban-cong",
        date: "2025-02-01",
        excerpt: "Tận dụng diện tích nhỏ ngoài ban công để làm khu vườn mini hoặc góc thưởng trà yên tĩnh sau giờ làm việc...",
        category: "Tin tức",
        categorySlug: "tin-tuc",
        featuredImage: "https://images.unsplash.com/photo-1590073242672-ad942ce2b921?auto=format&fit=crop&w=800&q=80",
    },
    {
        id: 3012,
        title: "PHONG CÁCH JAPANDI - SỰ KẾT HỢP ĐỘC ĐÁO",
        slug: "phong-cach-japandi",
        date: "2025-02-05",
        excerpt: "Sự pha trộn giữa nét mộc mạc Nhật Bản và tính công năng của khu vực Bắc Âu tạo nên không gian thanh bình...",
        category: "Mẫu thiết kế",
        categorySlug: "phong-cach-song",
        featuredImage: "https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?auto=format&fit=crop&w=800&q=80",
    },
    {
        id: 3013,
        title: "CÁCH CHỌN SÀN GỖ CHO BIỆT THỰ CAO CẤP",
        slug: "cach-chon-san-go",
        date: "2025-02-10",
        excerpt: "Phân biệt sàn gỗ tự nhiên và sàn gỗ công nghiệp, cùng các tiêu chuẩn lựa chọn sàn gỗ chất lượng cao...",
        category: "Tin tức",
        categorySlug: "tin-tuc",
        featuredImage: "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?auto=format&fit=crop&w=800&q=80",
    },
    {
        id: 3014,
        title: "THIẾT KẾ PHÒNG ĐỌC SÁCH TRUYỀN CẢM HỨNG",
        slug: "thiet-ke-phong-doc-sach",
        date: "2025-02-15",
        excerpt: "Bố trí kệ sách kịch trần, ghế đọc sách êm ái và ánh sáng vàng dịu cho một không gian tri thức tuyệt vời...",
        category: "Mẫu thiết kế",
        categorySlug: "phong-cach-song",
        featuredImage: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=800&q=80",
    },
    {
        id: 3015,
        title: "BÍ QUYẾT TRANG TRÍ CĂN HỘ TÂN CỔ ĐIỂN",
        slug: "bi-quyet-trang-tri-tan-co-dien",
        date: "2025-02-18",
        excerpt: "Những đường phào chỉ tinh tế, đèn chùm lộng lẫy mang lại vẻ đẹp quyền quý và sang trọng vượt thời gian...",
        category: "Mẫu thiết kế",
        categorySlug: "phong-cach-song",
        featuredImage: "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=800&q=80",
    },
    {
        id: 3016,
        title: "KINH NGHIỆM THI CÔNG NỘI THẤT TRỌN GÓI",
        slug: "kinh-nghiem-thi-cong-tron-goi",
        date: "2025-02-20",
        excerpt: "Làm thế nào để quản lý tiến độ, ngân sách và đảm bảo chất lượng công trình khi thuê đơn vị thi công trọn gói...",
        category: "Tin tức",
        categorySlug: "tin-tuc",
        featuredImage: "https://images.unsplash.com/photo-1503387762-592dea58ef23?auto=format&fit=crop&w=800&q=80",
    },
    {
        id: 3017,
        title: "XU HƯỚNG NỘI THẤT BỀN VỮNG 2025",
        slug: "xu-huong-noi-that-ben-vung",
        date: "2025-02-22",
        excerpt: "Sử dụng đồ tái chế, gỗ có nguồn gốc rõ ràng và sơn không độc hại để bảo vệ môi trường và sức khỏe gia đình...",
        category: "Tin tức",
        categorySlug: "tin-tuc",
        featuredImage: "https://images.unsplash.com/photo-1616486341351-79b90c19a97d?auto=format&fit=crop&w=800&q=80",
    },
    {
        id: 3018,
        title: "THIẾT KẾ PHÒNG TRẺ EM KÍCH THÍCH SÁNG TẠO",
        slug: "thiet-ke-phong-tre-em",
        date: "2025-02-24",
        excerpt: "Tạo nên thế giới kỳ diệu cho bé với giường tầng hình lâu đài, decal tường màu sắc và góc học chơi linh hoạt...",
        category: "Mẫu thiết kế",
        categorySlug: "phong-cach-song",
        featuredImage: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=800&q=80",
    },
    {
        id: 3019,
        title: "PHONG THỦY NỘI THẤT CHO GIA CHỦ MỆNH KIM",
        slug: "phong-thuy-menh-kim",
        date: "2025-02-26",
        excerpt: "Cách lựa chọn màu sắc, vật liệu và vị trí kê đồ đạc giúp mang lại may mắn và thịnh vượng cho người mệnh Kim...",
        category: "Tin tức",
        categorySlug: "tin-tuc",
        featuredImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    },
];


// ===== CATEGORIES =====
export const categories = [
    { id: 6, name: "Mẫu thiết kế", slug: "phong-cach-song", count: 21 },
    { id: 1, name: "Tin tức", slug: "tin-tuc", count: 19 },
];

// ===== NAVIGATION =====
export const navigation = [
    { label: "Trang chủ", href: "/" },
    { label: "Giới thiệu", href: "/gioi-thieu" },
    { label: "Dự án", href: "/du-an" },
    { label: "Tin tức", href: "/tin-tuc" },
    { label: "Liên hệ", href: "/lien-he" },
];
