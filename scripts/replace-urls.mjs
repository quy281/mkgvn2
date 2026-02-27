import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SRC_DIR = path.join(__dirname, "..", "src");

// Đây là data mapping từ script lúc nãy
const imageMap = {
    logo: [
        { url: "https://mkg.vn/wp-content/uploads/2025/04/logoMKG-320x200-1.jpg", filename: "logo-mkg.jpg" }
    ],
    hero: [
        { url: "https://mkg.vn/wp-content/uploads/2024/07/Anh-man-hinh-2024-07-13-luc-14.51.34.png", filename: "hero-slide-1.png" },
        { url: "https://mkg.vn/wp-content/uploads/2024/07/Anh-man-hinh-2024-07-13-luc-15.08.28.png", filename: "hero-slide-2.png" }
    ],
    about: [
        { url: "https://mkg.vn/wp-content/uploads/2024/07/Anh-man-hinh-2024-07-13-luc-14.50.37-1024x575.png", filename: "about-company.png" },
        { url: "https://mkg.vn/wp-content/uploads/2022/04/concrete-house-raw-architecture-workshop-tarry-perry_dezeen_18.jpg", filename: "about-hero.jpg" },
        { url: "https://mkg.vn/wp-content/uploads/2022/04/concrete-house-raw-architecture-workshop-tarry-perry_dezeen_4.jpg", filename: "about-interior.jpg" }
    ],
    services: [
        { url: "https://mkg.vn/wp-content/uploads/2022/04/grosvenor-residence-lim-and-lu-interior_dezeen_2364_col_5-e1632540848661.jpg", filename: "service-design.jpg" },
        { url: "https://mkg.vn/wp-content/uploads/2022/04/1-4-e1632540760462-1.jpg", filename: "service-construction.jpg" }
    ],
    projects: [
        { url: "https://mkg.vn/wp-content/uploads/2024/07/37af9edb80262ac104df8f70adc94c09.jpg", filename: "project-nha-pho-long-an.jpg" },
        { url: "https://mkg.vn/wp-content/uploads/2024/03/z5269946573642_5108d33b7d6c106f723b37ae840a5921.jpg", filename: "project-saigon-south.jpg" },
        { url: "https://mkg.vn/wp-content/uploads/2022/04/352514396_806767264342723_1022459514988091864_n.jpg", filename: "project-sunrise-city.jpg" },
        { url: "https://mkg.vn/wp-content/uploads/2022/04/348664600_806761814343268_3182801582151494041_n-1.jpg", filename: "project-zenity-q1.jpg" },
        { url: "https://mkg.vn/wp-content/uploads/2022/04/345053019_581395274135396_4713295348114555334_n.jpg", filename: "project-him-lam.jpg" },
        { url: "https://mkg.vn/wp-content/uploads/2024/03/z5274036144139_5feb21423ea32b3ed0384b6fdeccbb1d-1.jpg", filename: "project-lam-ha.jpg" }
    ],
    blog: [
        { url: "https://mkg.vn/wp-content/uploads/2024/07/fad056b0b5099bdadba7c0aef9131a5d-1.jpg", filename: "blog-ban-hoc.jpg" },
        { url: "https://mkg.vn/wp-content/uploads/2024/07/5a63803e02a999c5ac36c2505c280f12.jpg", filename: "blog-ban-an.jpg" },
        { url: "https://mkg.vn/wp-content/uploads/2024/07/fad056b0b5099bdadba7c0aef9131a5d.jpg", filename: "blog-tu-ao.jpg" },
        { url: "https://mkg.vn/wp-content/uploads/2024/07/2276f9978349110b28057cd227c717f8.jpg", filename: "blog-ban-lam-viec.jpg" },
        { url: "https://mkg.vn/wp-content/uploads/2024/07/7cb2746dc9c5596af874d3f6ea12f1b8.jpg", filename: "blog-phong-ngu.jpg" },
        { url: "https://mkg.vn/wp-content/uploads/2024/07/79ddef430c81f71ef6c52e42bfedb7e5.jpg", filename: "blog-ban-trang-diem.jpg" },
        { url: "https://mkg.vn/wp-content/uploads/2024/07/5c415dbec271689df2f2a46259abb7ba.jpg", filename: "blog-giuong-tang.jpg" }
    ],
    backgrounds: [
        { url: "https://mkg.vn/wp-content/uploads/2022/10/webmau16.com-banner-2-1.webp", filename: "bg-projects.webp" }
    ]
};

// Chuẩn bị danh sách mapping
const replacements = [];
for (const [category, items] of Object.entries(imageMap)) {
    for (const item of items) {
        replacements.push({
            oldUrl: item.url,
            newUrl: `/images/${category}/${item.filename}`
        });
    }
}

function processDirectory(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDirectory(fullPath);
        } else if (fullPath.endsWith('.ts') || fullPath.endsWith('.tsx')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let changed = false;

            for (const map of replacements) {
                if (content.includes(map.oldUrl)) {
                    // split and join to replace all occurrences
                    content = content.split(map.oldUrl).join(map.newUrl);
                    changed = true;
                }
            }

            if (changed) {
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log(`✅ Updated ${file}`);
            }
        }
    }
}

console.log("Replacing WordPress URLs in source code...");
processDirectory(SRC_DIR);
console.log("✨ Replacement complete!");
