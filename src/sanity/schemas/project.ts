export default {
    name: 'project',
    title: 'Dự án',
    type: 'document',
    fields: [
        { name: 'title', title: 'Tên dự án', type: 'string' },
        { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' } },
        { name: 'category', title: 'Danh mục', type: 'string', options: { list: ['Nhà phố', 'Chung cư', 'Biệt thự', 'Thương mại'] } },
        { name: 'mainImage', title: 'Ảnh đại diện', type: 'image', options: { hotspot: true } },
        { name: 'gallery', title: 'Thư viện ảnh', type: 'array', of: [{ type: 'image', options: { hotspot: true } }] },
        { name: 'area', title: 'Diện tích (m²)', type: 'string' },
        { name: 'location', title: 'Địa điểm', type: 'string' },
        { name: 'year', title: 'Năm thực hiện', type: 'string' },
        { name: 'description', title: 'Mô tả chi tiết', type: 'array', of: [{ type: 'block' }] },
        { name: 'featured', title: 'Nổi bật (Hiển thị trang chủ)', type: 'boolean', initialValue: false },
        { name: 'order', title: 'Thứ tự hiển thị', type: 'number' },
    ]
};
