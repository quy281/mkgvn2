export default {
    name: 'blogPost',
    title: 'Bài viết',
    type: 'document',
    fields: [
        { name: 'title', title: 'Tiêu đề', type: 'string' },
        { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' } },
        { name: 'category', title: 'Danh mục', type: 'reference', to: [{ type: 'category' }] },
        { name: 'mainImage', title: 'Ảnh đại diện', type: 'image', options: { hotspot: true } },
        { name: 'gallery', title: 'Thư viện ảnh', type: 'array', of: [{ type: 'image', options: { hotspot: true } }] },
        { name: 'excerpt', title: 'Tóm tắt', type: 'text' },
        { name: 'body', title: 'Nội dung', type: 'array', of: [{ type: 'block' }] },
        { name: 'author', title: 'Tác giả', type: 'string', initialValue: 'Admin' },
        { name: 'publishedAt', title: 'Ngày đăng', type: 'datetime' },
        { name: 'status', title: 'Trạng thái', type: 'string', options: { list: ['published', 'draft'] }, initialValue: 'draft' },
    ]
};
