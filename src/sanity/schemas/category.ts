export default {
    name: 'category',
    title: 'Danh mục',
    type: 'document',
    fields: [
        { name: 'title', title: 'Tên danh mục', type: 'string' },
        { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' } },
    ]
};
