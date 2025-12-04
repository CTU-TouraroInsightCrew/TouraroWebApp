# RAG Knowledge Base – Cần Thơ Travelling Dataset

Thư mục này chứa toàn bộ dữ liệu JSON được sử dụng làm nguồn tri thức (Knowledge Base) cho hệ thống **RAG Chatbot Du lịch Cần Thơ**.  
Mỗi file JSON mô tả một chủ đề riêng, được chia thành các chunk nhỏ để phục vụ việc embedding và truy vấn.

---

## 📁 Cấu trúc thư mục

json_data/
├── festivals_cantho.json # Thông tin lễ hội theo tháng/khu vực
├── flooding_cantho.json # Mức độ ngập, triều cường, thời điểm thủy triều, các lưu ý khi di chuyển mùa triều cường
├── food_cantho.json # Món ăn đặc sản và gợi ý địa điểm
├── market_cantho.json # Thông tin chợ, chợ nổi, giờ hoạt động
├── restaurant_cantho.json # Danh sách nhà hàng, quán ăn nổi bật
├── tourist_places.json # Điểm tham quan, làng du lịch, vườn sinh thái
├── transport_cantho.json # Taxi, xe bus, xe máy,giờ cao điểm, tình trạng giao thông, mức độ kẹt xe các tuyến đường
└── weather_cantho.json # Thời tiết, mùa mưa, mẹo di chuyển theo mùa


---

## 🗂 Định dạng dữ liệu JSON

Mỗi file là một **mảng các object**, mỗi object đại diện cho **một chunk thông tin độc lập**, các chunk vừa có tiếng Việt và tiếng Anh hỗ trợ truy vấn song ngữ cho khách du lịch nước ngoài.



### Ví dụ:
Một chunk trong `Festival` - Lễ hội diễn ra ở Cần Thơ: 
```json
{
    "id": "festival_banh_dan_gian", 
    "type": "festival",
    "name_vi": "Lễ hội Bánh Dân Gian Nam Bộ",
    "name_en": "Southern Folk Cake Festival",
    "category_vi": "Lễ hội ẩm thực - văn hóa",
    "category_en": "Culinary & Cultural Festival",
    "time_vi": "Tháng 4 (giỗ Tổ Hùng Vương)",
    "time_en": "April (Hung Kings’ Commemoration period)",
    "location_vi": "Trung tâm Hội chợ Triển lãm Cần Thơ",
    "location_en": "Can Tho Exhibition & Fair Center",
    "description_vi": "Lễ hội Bánh Dân Gian Nam Bộ...",
    "description_en": "The Southern Folk Cake Festival...",
    "highlights_vi": [
      "Trình diễn làm bánh truyền thống", "..."
    ],
    "highlights_en": [
      "Traditional cake-making shows", "..."
    ]
}
```

### Quy tắc ghi dữ liệu:
- Mỗi chunk phải ngắn gọn, tối ưu cho mô hình (150–350 ký tự).
- Không nhét quá nhiều ý vào một chunk → chia nhỏ nếu cần.
- Nội dung chỉ dựa trên dữ liệu xác thực, không suy đoán.
- Không trùng lặp giữa các file (ví dụ: Mỹ Khánh chỉ xuất hiện 1 lần).
- Dùng tiếng Việt thân thiện, tự nhiên (phù hợp chatbot).

### Cách thêm dữ liệu mới

1. Thêm object mới vào file tương ứng.
2. Tạo id mới theo chuẩn:
- food_XX
- festival_XX
- flood_XX
- transport_XX
- …
3. Chạy lại script `embed` để cập nhật vector store.

Mục đích bộ dữ liệu

## Bộ dữ liệu nhằm cung cấp tri thức nền để chatbot:

- Gợi ý địa điểm tham quan
- Tư vấn ẩm thực
- Gợi ý lịch trình
- Cảnh báo thời tiết, triều cường
- Hướng dẫn di chuyển trong thành phố
- Giải thích lễ hội và văn hóa Cần Thơ