export default {
    name: 'siteSettings',
    title: 'Cài đặt Website',
    type: 'document',
    fields: [
        { name: 'companyName', title: 'Tên công ty', type: 'string' },
        { name: 'slogan', title: 'Slogan', type: 'string' },
        { name: 'logo', title: 'Logo', type: 'image' },
        { name: 'heroSlides', title: 'Ảnh Hero Slider', type: 'array', of: [{ type: 'image' }] },
        { name: 'aboutText', title: 'Giới thiệu ngắn (Trang chủ)', type: 'text' },
        { name: 'phone', title: 'Số điện thoại', type: 'string' },
        { name: 'email', title: 'Email', type: 'string' },
        { name: 'addresses', title: 'Địa chỉ', type: 'array', of: [{ type: 'string' }] },
        {
            name: 'socialLinks', title: 'Mạng xã hội', type: 'object', fields: [
                { name: 'facebook', type: 'url' },
                { name: 'youtube', type: 'url' },
                { name: 'zalo', type: 'url' }
            ]
        },
        {
            name: 'stats', title: 'Thống kê', type: 'array', of: [{
                type: 'object', fields: [
                    { name: 'number', title: 'Con số (VD: 500+)', type: 'string' },
                    { name: 'label', title: 'Mô tả', type: 'string' }
                ]
            }]
        },
        {
            name: 'skills', title: 'Năng lực', type: 'array', of: [{
                type: 'object', fields: [
                    { name: 'name', title: 'Tên kỹ năng', type: 'string' },
                    { name: 'percentage', title: 'Phần trăm (%)', type: 'number', validation: (Rule: any) => Rule.min(0).max(100) }
                ]
            }]
        },
        { name: 'videoUrl', title: 'URL Video YouTube', type: 'url' },
    ]
};
