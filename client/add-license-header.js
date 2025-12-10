/*
 * This file is part of TouraroWebApp.
 * Licensed under the GPL-3.0-only License.
 * Copyright (c) 2025 CTU-TouraroInsightCrew
 */

const fs = require("fs");
const path = require("path");

// HEADER MỚI ĐÚNG CHÍNH TẢ
const NEW_HEADER = `

`;

// Regex tìm mọi header cũ (dù sai chính tả hoặc khác nhau)
const OLD_HEADER_REGEX = /\/\*[\s\S]*?TouraroWebApp[\s\S]*?\*\//;

// Các loại file code cần thêm license
const VALID_EXT = [".ts", ".js", ".tsx"];

// Các folder KHÔNG quét
const IGNORE_DIRS = ["node_modules", "dist", "build", ".next", "out"];

function addHeaderToFiles(dir) {
    const files = fs.readdirSync(dir);

    for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            if (!IGNORE_DIRS.includes(file)) {
                addHeaderToFiles(filePath);
            }
            continue;
        }

        const ext = path.extname(file);
        if (!VALID_EXT.includes(ext)) continue;

        let content = fs.readFileSync(filePath, "utf8");

        // XÓA HEADER CŨ (nếu có)
        if (OLD_HEADER_REGEX.test(content)) {
            content = content.replace(OLD_HEADER_REGEX, "");
        }

        // Nếu file đã có header mới, bỏ qua
        if (content.trim().startsWith("/*") && content.includes("Licensed under the GPL-3.0-only")) {
            continue;
        }

        // Thêm header chính xác
        const newContent = NEW_HEADER + content.trimStart();

        fs.writeFileSync(filePath, newContent, "utf8");
        console.log("Đã cập nhật header:", filePath);
    }
}

// Chạy script
addHeaderToFiles(process.cwd());

console.log("\n✔️ Hoàn thành: Header cũ đã được thay thế bằng header mới!");
