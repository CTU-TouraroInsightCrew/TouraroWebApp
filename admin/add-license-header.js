const fs = require("fs");
const path = require("path");

// HEADER bạn muốn chèn
const HEADER = `/*
 * This file is part of TouraroWebApp.
 * Licensed under the GPL-3.0-only License.
 * Copyright (c) 2025 CTU-TouraroInsigtCrew
 */

`;

// Các loại file code cần thêm license
const VALID_EXT = [".ts", ".js", ".tsx"];

// Các folder KHÔNG quét
const IGNORE_DIRS = ["node_modules", "dist", "build", ".next", "out"];

// Hàm đệ quy quét thư mục
function addHeaderToFiles(dir) {
    const files = fs.readdirSync(dir);

    for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        // Bỏ qua folder không cần quét
        if (stat.isDirectory()) {
            if (!IGNORE_DIRS.includes(file)) {
                addHeaderToFiles(filePath);
            }
            continue;
        }

        // Chỉ xử lý file có đuôi .ts, .js, .tsx
        const ext = path.extname(file);
        if (!VALID_EXT.includes(ext)) continue;

        // Đọc nội dung file
        let content = fs.readFileSync(filePath, "utf8");

        // Nếu file đã có header, bỏ qua
        if (content.includes("This file is part of TouraroWebApp")) continue;

        // Thêm header vào đầu file
        const newContent = HEADER + content;

        // Ghi lại file
        fs.writeFileSync(filePath, newContent, "utf8");
        console.log("Đã thêm header:", filePath);
    }
}

// Chạy script
addHeaderToFiles(process.cwd());

console.log("\n✔️ Hoàn thành: Tất cả file .ts, .js, .tsx đã được chèn header!");
