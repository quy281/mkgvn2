export default {
    name: 'testimonial',
    title: 'Đánh giá',
    type: 'document',
    fields: [
        { name: 'name', title: 'Tên khách hàng', type: 'string' },
        { name: 'role', title: 'Vai trò (VD: Chủ biệt thự, Quận 7)', type: 'string' },
        { name: 'quote', title: 'Nội dung đánh giá', type: 'text' },
        { name: 'avatar', title: 'Ảnh đại diện', type: 'image', options: { hotspot: true } },
        { name: 'rating', title: 'Đánh giá (Số sao)', type: 'number', validation: (Rule: any) => Rule.min(1).max(5) },
        { name: 'order', title: 'Thứ tự hiển thị', type: 'number' },
    ]
};
