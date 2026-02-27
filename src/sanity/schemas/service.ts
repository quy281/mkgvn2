export default {
    name: 'service',
    title: 'Dịch vụ',
    type: 'document',
    fields: [
        { name: 'title', title: 'Tên dịch vụ', type: 'string' },
        { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' } },
        { name: 'icon', title: 'Icon (Tên Lucide Icon)', type: 'string' },
        { name: 'shortDesc', title: 'Mô tả ngắn', type: 'text' },
        { name: 'image', title: 'Ảnh đại diện', type: 'image', options: { hotspot: true } },
        { name: 'features', title: 'Tính năng nổi bật', type: 'array', of: [{ type: 'string' }] },
        { name: 'order', title: 'Thứ tự hiển thị', type: 'number' },
    ]
};
