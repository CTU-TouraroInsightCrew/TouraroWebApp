# RAG & Chatbot AI

Kiến trúc RAG của Touraro kết hợp khả năng truy xuất tri thức từ cơ sở dữ liệu JSON với sức mạnh của các mô hình embedding và mô hình ngôn ngữ lớn (LLM) của OpenAI. Khi người dùng đặt câu hỏi, hệ thống chuyển câu hỏi thành vector embedding, tìm ra các đoạn dữ liệu liên quan nhất từ vector store, kết hợp các thông tin về thời tiết / triều cường nếu cần, sau đó gửi toàn bộ ngữ cảnh cho mô hình LLM để tạo ra câu trả lời chính xác, tự nhiên và đúng với thực tế địa phương.

Hệ thống Chatbot du lịch Touraro sử dụng kiến trúc RAG (Retrieval-Augmented Generation) để bảo đảm câu trả lời:
- Chính xác dựa trên dữ liệu du lịch & đời sống tại Cần Thơ
- Không “bịa” thông tin ngoài CSDL
- Linh hoạt và có khả năng cập nhật linh hoạt tùy theo tình hình thực tế

Dữ liệu trong các tệp JSON của dự án được tổng hợp từ nhiều nguồn thông tin công khai và đáng tin cậy, bao gồm:
- Thông tin địa điểm du lịch, ẩm thực: Traveloka.com, MIA.vn, Vinpearl.com, Bachhoaxanh.com, Atrip.vn
- Thông tin về triều cường và tình hình giao thông: Baocantho.com, VTV.vn, TuoiTre.vn
- Bên cạnh đó, dữ liệu còn được bổ sung từ ý kiến, chia sẻ và kinh nghiệm thực tế của người dân địa phương tại Cần Thơ.
Dữ liệu được sử dụng với mục đích nghiên cứu học thuật và phục vụ nhu cầu tham khảo trong khuôn khổ dự án.

---

## Quy trình RAG

> **1. Người dùng đặt câu hỏi**  
> ↓  
> **2. Chuyển câu hỏi → embedding (OpenAI Embeddings)**  
> ↓  
> **3. Tìm kiếm vector gần nhất (Vector Store)**  
> ↓  
> **4. Lấy top-k context**  
> ↓  
> **5. Ghép thêm thời tiết (nếu cần)**  
> ↓  
> **6. Tạo prompt**  
> ↓  
> **7. Mô hình GPT trả lời**  
> ↓  
> **8. Trả về frontend**

---

## Nguồn dữ liệu JSON

Dữ liệu RAG được tổng hợp từ:

- Traveloka, MIA.vn, Vinpearl, Bách Hoá Xanh
- Báo Cần Thơ, VTV, Tuổi Trẻ
- Kinh nghiệm thực tế từ người dân địa phương

Dùng cho mục đích học thuật và nghiên cứu.

---