import https from "https";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = path.join(__dirname, "..", "public", "images");

// ===== ALL IMAGES CATEGORIZED =====
const imageMap = {
    // Logo
    logo: [
        {
            url: "https://mkg.vn/wp-content/uploads/2025/04/logoMKG-320x200-1.jpg",
            filename: "logo-mkg.jpg",
        },
    ],

    // Hero slides
    hero: [
        {
            url: "https://mkg.vn/wp-content/uploads/2024/07/Anh-man-hinh-2024-07-13-luc-14.51.34.png",
            filename: "hero-slide-1.png",
        },
        {
            url: "https://mkg.vn/wp-content/uploads/2024/07/Anh-man-hinh-2024-07-13-luc-15.08.28.png",
            filename: "hero-slide-2.png",
        },
    ],

    // About / Company images
    about: [
        {
            url: "https://mkg.vn/wp-content/uploads/2024/07/Anh-man-hinh-2024-07-13-luc-14.50.37-1024x575.png",
            filename: "about-company.png",
        },
        {
            url: "https://mkg.vn/wp-content/uploads/2022/04/concrete-house-raw-architecture-workshop-tarry-perry_dezeen_18.jpg",
            filename: "about-hero.jpg",
        },
        {
            url: "https://mkg.vn/wp-content/uploads/2022/04/concrete-house-raw-architecture-workshop-tarry-perry_dezeen_4.jpg",
            filename: "about-interior.jpg",
        },
    ],

    // Services
    services: [
        {
            url: "https://mkg.vn/wp-content/uploads/2022/04/grosvenor-residence-lim-and-lu-interior_dezeen_2364_col_5-e1632540848661.jpg",
            filename: "service-design.jpg",
        },
        {
            url: "https://mkg.vn/wp-content/uploads/2022/04/1-4-e1632540760462-1.jpg",
            filename: "service-construction.jpg",
        },
    ],

    // Projects
    projects: [
        {
            url: "https://mkg.vn/wp-content/uploads/2024/07/37af9edb80262ac104df8f70adc94c09.jpg",
            filename: "project-nha-pho-long-an.jpg",
        },
        {
            url: "https://mkg.vn/wp-content/uploads/2024/03/z5269946573642_5108d33b7d6c106f723b37ae840a5921.jpg",
            filename: "project-saigon-south.jpg",
        },
        {
            url: "https://mkg.vn/wp-content/uploads/2022/04/352514396_806767264342723_1022459514988091864_n.jpg",
            filename: "project-sunrise-city.jpg",
        },
        {
            url: "https://mkg.vn/wp-content/uploads/2022/04/348664600_806761814343268_3182801582151494041_n-1.jpg",
            filename: "project-zenity-q1.jpg",
        },
        {
            url: "https://mkg.vn/wp-content/uploads/2022/04/345053019_581395274135396_4713295348114555334_n.jpg",
            filename: "project-him-lam.jpg",
        },
        {
            url: "https://mkg.vn/wp-content/uploads/2024/03/z5274036144139_5feb21423ea32b3ed0384b6fdeccbb1d-1.jpg",
            filename: "project-lam-ha.jpg",
        },
    ],

    // Blog post featured images
    blog: [
        {
            url: "https://mkg.vn/wp-content/uploads/2024/07/fad056b0b5099bdadba7c0aef9131a5d-1.jpg",
            filename: "blog-ban-hoc.jpg",
        },
        {
            url: "https://mkg.vn/wp-content/uploads/2024/07/5a63803e02a999c5ac36c2505c280f12.jpg",
            filename: "blog-ban-an.jpg",
        },
        {
            url: "https://mkg.vn/wp-content/uploads/2024/07/fad056b0b5099bdadba7c0aef9131a5d.jpg",
            filename: "blog-tu-ao.jpg",
        },
        {
            url: "https://mkg.vn/wp-content/uploads/2024/07/2276f9978349110b28057cd227c717f8.jpg",
            filename: "blog-ban-lam-viec.jpg",
        },
        {
            url: "https://mkg.vn/wp-content/uploads/2024/07/7cb2746dc9c5596af874d3f6ea12f1b8.jpg",
            filename: "blog-phong-ngu.jpg",
        },
        {
            url: "https://mkg.vn/wp-content/uploads/2024/07/79ddef430c81f71ef6c52e42bfedb7e5.jpg",
            filename: "blog-ban-trang-diem.jpg",
        },
        {
            url: "https://mkg.vn/wp-content/uploads/2024/07/5c415dbec271689df2f2a46259abb7ba.jpg",
            filename: "blog-giuong-tang.jpg",
        },
    ],

    // Background
    backgrounds: [
        {
            url: "https://mkg.vn/wp-content/uploads/2022/10/webmau16.com-banner-2-1.webp",
            filename: "bg-projects.webp",
        },
    ],
};

function downloadFile(url, destPath) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(destPath);
        const request = https.get(url, { headers: { "User-Agent": "Mozilla/5.0" } }, (response) => {
            // Follow redirects
            if (response.statusCode === 301 || response.statusCode === 302) {
                const redirectUrl = response.headers.location;
                console.log(`  ↳ Redirect → ${redirectUrl}`);
                downloadFile(redirectUrl, destPath).then(resolve).catch(reject);
                file.close();
                return;
            }
            if (response.statusCode !== 200) {
                file.close();
                fs.unlink(destPath, () => { });
                reject(new Error(`HTTP ${response.statusCode} for ${url}`));
                return;
            }
            const totalBytes = parseInt(response.headers["content-length"], 10);
            let downloadedBytes = 0;
            response.on("data", (chunk) => {
                downloadedBytes += chunk.length;
            });
            response.pipe(file);
            file.on("finish", () => {
                file.close();
                const sizeKB = (downloadedBytes / 1024).toFixed(1);
                resolve({ size: sizeKB });
            });
        });
        request.on("error", (err) => {
            file.close();
            fs.unlink(destPath, () => { });
            reject(err);
        });
        request.setTimeout(30000, () => {
            request.destroy();
            reject(new Error(`Timeout for ${url}`));
        });
    });
}

async function main() {
    console.log("🖼️  MINH KHUÊ GROUP - Image Downloader");
    console.log("═".repeat(50));
    console.log();

    let totalFiles = 0;
    let successCount = 0;
    let failCount = 0;

    for (const [category, images] of Object.entries(imageMap)) {
        const categoryDir = path.join(PUBLIC_DIR, category);
        if (!fs.existsSync(categoryDir)) {
            fs.mkdirSync(categoryDir, { recursive: true });
        }

        console.log(`📁  ${category.toUpperCase()} (${images.length} files)`);
        console.log("─".repeat(40));

        for (const img of images) {
            totalFiles++;
            const destPath = path.join(categoryDir, img.filename);

            // Skip if already downloaded
            if (fs.existsSync(destPath)) {
                const stats = fs.statSync(destPath);
                if (stats.size > 1000) {
                    console.log(`  ✅ ${img.filename} (already exists, ${(stats.size / 1024).toFixed(1)} KB)`);
                    successCount++;
                    continue;
                }
            }

            process.stdout.write(`  ⬇️  ${img.filename} ... `);
            try {
                const result = await downloadFile(img.url, destPath);
                console.log(`✅ ${result.size} KB`);
                successCount++;
            } catch (err) {
                console.log(`❌ ${err.message}`);
                failCount++;
            }
        }
        console.log();
    }

    console.log("═".repeat(50));
    console.log(`📊 RESULTS: ${successCount}/${totalFiles} downloaded, ${failCount} failed`);
    console.log();

    // Print the folder structure
    console.log("📂 Folder structure:");
    for (const [category, images] of Object.entries(imageMap)) {
        console.log(`  public/images/${category}/`);
        for (const img of images) {
            console.log(`    └── ${img.filename}`);
        }
    }
    console.log();
    console.log("✨ Done! Now update site-data.ts to use local paths.");
}

main().catch(console.error);
