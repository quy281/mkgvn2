import { createClient } from '@sanity/client';
import { blogPosts, projects } from '../src/data/site-data.ts';
import 'dotenv/config';

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    apiVersion: '2024-01-01',
    token: process.env.SANITY_API_TOKEN,
    useCdn: false,
});

// Helper to generate Portable Text blocks
function generateRichText(paragraphs) {
    return paragraphs.map(text => ({
        _type: 'block',
        style: 'normal',
        markDefs: [],
        children: [{ _type: 'span', text: text }]
    }));
}

async function uploadImageFromUrl(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Failed to fetch image: ${response.statusText}`);
        const buffer = await response.arrayBuffer();
        const asset = await client.assets.upload('image', Buffer.from(buffer), {
            filename: url.split('/').pop() || 'image.jpg'
        });
        return {
            _type: 'image',
            asset: { _type: 'reference', _ref: asset._id }
        };
    } catch (error) {
        return null;
    }
}

async function seedData() {
    console.log('🚀 Starting Super Vivid Seed (Content + Images)...');

    try {
        // Cleanup
        console.log('🧹 Cleaning up old documents...');
        const docs = await client.fetch('*[_type in ["blogPost", "post", "project", "category"]]');
        if (docs.length > 0) {
            const transaction = client.transaction();
            docs.forEach(doc => transaction.delete(doc._id));
            await transaction.commit();
        }

        // 0. Seed Categories
        console.log('📂 Seeding categories...');
        const categories = [
            { id: 'cat-1', title: 'Tin tức', slug: 'tin-tuc' },
            { id: 'cat-2', title: 'Mẫu thiết kế', slug: 'phong-cach-song' }
        ];
        for (const cat of categories) {
            await client.create({
                _type: 'category',
                _id: cat.id,
                title: cat.title,
                slug: { _type: 'slug', current: cat.slug }
            });
        }

        // 1. Seed Blog Posts
        console.log('\n📝 Seeding blog posts with rich content...');
        for (const post of blogPosts.slice(0, 10)) { // Limit for speed, but high quality
            console.log(`⏳ Processing post: ${post.title}`);

            const mainImage = await uploadImageFromUrl(post.featuredImage.startsWith('http') ? post.featuredImage : `https://images.unsplash.com/photo-${1600000000000 + post.id}?w=1200`);

            const content = [
                `Trong thế giới kiến trúc hiện đại, ${post.title} không chỉ là một xu hướng mà còn là biểu tượng của sự tinh tế và đẳng cấp.`,
                `Chúng tôi tại Minh Khuê Group luôn tâm niệm rằng mỗi không gian sống đều mang một linh hồn riêng. Với sự kết hợp giữa vật liệu cao cấp và tư duy thiết kế đột phá, chúng tôi mang đến những giải pháp hoàn hảo nhất cho gia đình bạn.`,
                `${post.excerpt}`,
                `Yếu tố quan trọng nhất chính là sự hài hòa giữa ánh sáng tự nhiên và nội thất gỗ. Việc sử dụng các tông màu trung tính như xám, trắng kết hợp với màu gỗ tự nhiên giúp không gian trở nên rộng rãi và ấm cúng hơn bao giờ hết.`,
                `Đội ngũ kiến trúc sư của chúng tôi đã dành hàng trăm giờ để nghiên cứu về thói quen sinh hoạt của người Việt, từ đó tối ưu hóa công năng sử dụng cho từng mét vuông diện tích.`
            ];

            await client.create({
                _type: 'blogPost',
                _id: `post-${post.id}`,
                title: post.title,
                slug: { _type: 'slug', current: post.slug },
                category: { _type: 'reference', _ref: post.category === 'Tin tức' ? 'cat-1' : 'cat-2' },
                mainImage: mainImage,
                excerpt: post.excerpt,
                body: generateRichText(content),
                publishedAt: new Date(post.date).toISOString(),
                status: 'published'
            });
            console.log(`  ✅ Done: ${post.title}`);
        }

        // 2. Seed Projects
        console.log('\n🏗️ Seeding projects with detailed technical info...');
        const projectDetails = [
            { loc: 'Bến Lức, Long An', area: '250m2', year: '2023', style: 'Hiện đại (Modern)' },
            { loc: 'Quận 7, TP. HCM', area: '120m2', year: '2024', style: 'Tân cổ điển (Neoclassical)' },
            { loc: 'Quận 7, TP. HCM', area: '95m2', year: '2023', style: 'Tối giản (Minimalism)' },
            { loc: 'Quận 1, TP. HCM', area: '110m2', year: '2024', style: 'Luxury Luxury' },
            { loc: 'Quận 7, TP. HCM', area: '85m2', year: '2022', style: 'Scandivavian' },
            { loc: 'Lâm Hà, Lâm Đồng', area: '350m2', year: '2024', style: 'Nghỉ dưỡng (Resort Style)' },
        ];

        for (let i = 0; i < projects.length; i++) {
            const project = projects[i];
            const detail = projectDetails[i] || projectDetails[0];
            console.log(`⏳ Processing project: ${project.title}`);

            const mainImage = await uploadImageFromUrl(project.image.startsWith('http') ? project.image : `https://images.unsplash.com/photo-${1600000000000 + (i * 50000)}?w=1200`);

            const gallery = [];
            for (let g = 0; g < 6; g++) {
                const img = await uploadImageFromUrl(`https://images.unsplash.com/photo-${1600121000000 + (i * 20000) + (g * 5000)}?w=1200`);
                if (img) gallery.push(img);
            }

            const description = [
                `Dự án ${project.title} là một trong những công trình trọng điểm mà Minh Khuê Group thực hiện trong năm ${detail.year}.`,
                `Với phong cách ${detail.style}, chúng tôi đã khéo léo biến những mét vuông diện tích thành một tác phẩm nghệ thuật kiến trúc đầy cảm hứng. Điểm nhấn của dự án chính là sự kết hợp hoàn hảo giữa vật liệu đá tự nhiên và hệ thống ánh sáng thông minh.`,
                `Toàn bộ nội thất được gia công riêng tại xưởng của Minh Khuê Group, sử dụng gỗ An Cường cao cấp và các phụ kiện nhập khẩu từ Đức, đảm bảo độ bền và tính thẩm mỹ tuyệt đối.`,
                `Chúng tôi đặc biệt chú trọng vào không gian mở, tạo sự kết nối liền mạch giữa phòng khách và không gian bếp, giúp gia chủ luôn cảm thấy thoải mái và tự do trong chính ngôi nhà của mình.`
            ];

            await client.create({
                _type: 'project',
                _id: `project-${project.id}`,
                title: project.title,
                slug: { _type: 'slug', current: project.slug },
                category: project.category,
                mainImage: mainImage,
                gallery: gallery,
                location: detail.loc,
                area: detail.area,
                year: detail.year,
                description: generateRichText(description),
                featured: true,
                order: i + 1
            });
            console.log(`  ✅ Done: ${project.title}`);
        }

        // 3. Seed Services
        console.log('\n🛠️ Seeding services...');
        const serviceData = [
            {
                title: 'Tư vấn Thiết kế nội thất',
                icon: 'PenTool',
                img: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200',
                desc: 'Kiến tạo không gian sống đẳng cấp, cá nhân hóa theo phong cách độc bản của gia chủ.'
            },
            {
                title: 'Thi công nội thất trọn gói',
                icon: 'Hammer',
                img: 'https://images.unsplash.com/photo-1503387762-592dea58ef23?w=1200',
                desc: 'Biến bản vẽ thành hiện thực với độ chính xác tuyệt đối, cam kết đúng tiến độ và chất lượng.'
            },
            {
                title: 'Thiết kế kiến trúc biệt thự',
                icon: 'Home',
                img: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200',
                desc: 'Phác thảo những công trình kiến trúc vượt thời gian, kết hợp giữa công năng và tính thẩm mỹ cao.'
            },
            {
                title: 'Sản xuất nội thất CNC',
                icon: 'Settings',
                img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200',
                desc: 'Hệ thống xưởng hiện đại tiêu chuẩn Châu Âu, đảm bảo độ tinh xảo cho từng sản phẩm.'
            },
            {
                title: 'Giải pháp Nhà thông minh',
                icon: 'Cpu',
                img: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=1200',
                desc: 'Tích hợp công nghệ hiện đại mang lại cuộc sống tiện nghi, an toàn và thông minh hơn.'
            },
            {
                title: 'Thiết kế cảnh quan sân vườn',
                icon: 'Leaf',
                img: 'https://images.unsplash.com/photo-1558905619-17254263bc89?w=1200',
                desc: 'Kết nối con người với thiên nhiên qua những mảng xanh nghệ thuật và yên bình.'
            }
        ];

        for (let i = 0; i < serviceData.length; i++) {
            const s = serviceData[i];
            console.log(`⏳ Processing service: ${s.title}`);
            const image = await uploadImageFromUrl(s.img);

            await client.create({
                _type: 'service',
                _id: `service-${i}`,
                title: s.title,
                slug: { _type: 'slug', current: `dich-vu-${i}` },
                icon: s.icon,
                shortDesc: s.desc,
                image: image,
                order: i + 1,
                features: ['Chuyên nghiệp', 'Tận tâm', 'Sáng tạo']
            });
            console.log(`  ✅ Done: ${s.title}`);
        }

        console.log('\n✨ Super Vivid Seeding Completed!');
    } catch (error) {
        console.error('❌ Seed failed:', error.message);
    }
}

seedData();
