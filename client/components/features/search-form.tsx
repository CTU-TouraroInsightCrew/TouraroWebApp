/*
 * This file is part of TouraroWebApp.
 * Licensed under the GPL-3.0-only License.
 * Copyright (c) 2025 CTU-TouraroInsigtCrew
 */
"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { FaSearch } from "react-icons/fa";
import { Locations } from "@/lib/types";

export default function SearchForm() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Locations[]>([]);
  const router = useRouter();

  // 🔹 Dữ liệu trực tiếp trong file
  const LOCATIONS: Locations[] = [
  {
    id: 1,
    location: "Khu Du Lịch Mỹ Khánh",
    duration: "Xã Mỹ Khánh - Huyện Phong Điền",
    image: "/location_images/MyKhanh.png",
    description: `
    Địa chỉ: 335 Lộ Vòng Cung, Xã Mỹ Khánh, Huyện Phong Điền, Thành Phố Cần Thơ

    Mô tả: Làng du lịch Mỹ Khánh là khu du lịch sinh thái lớn hơn 30ha, cách trung tâm Cần Thơ 10km. Du khách được trải nghiệm không gian miệt vườn, tham quan nhà cổ, chèo xuồng, tát mương bắt cá, câu cá sấu, xem biểu diễn dân gian và thưởng thức ẩm thực miền Tây. Nơi đây thích hợp cho gia đình, nhóm bạn và khách muốn thư giãn, tìm hiểu văn hóa Nam Bộ.
`
  },

  {
    id: 2,
    location: "Làng du lịch Ông Đề",
    duration: "Xã Mỹ Khánh - Huyện Phong Điền",
    image: "/location_images/OngDe.png",
    description: `
    Địa chỉ: Ấp Mỹ Ái, Xã Mỹ Khánh, Huyện Phong Điền, TP Cần Thơ.

    Mô tả: Làng du lịch Ông Đề là khu sinh thái miệt vườn gần trung tâm Cần Thơ, nổi tiếng với trò chơi dân gian, tát mương bắt cá, đi cầu khỉ và các hoạt động sông nước đậm chất miền Tây. Không gian xanh mát, gần gũi thiên nhiên, phù hợp cho gia đình và nhóm bạn muốn trải nghiệm đời sống đồng quê và ẩm thực dân dã.
`
  },
  {
    id: 3,
    location: "Vườn ca cao Mười Cương",
    duration: "Xã Mỹ Khánh - Huyện Phong Điền",
    image: "/location_images/MuoiCuong.png",
    description: `
    Địa chỉ: Ấp Mỹ Ái, Xã Mỹ Khánh, Huyện Phong Điền, TP Cần Thơ.

    Mô tả: Vườn ca cao Mười Cương tại Phong Điền, Cần Thơ là một điểm tham quan độc đáo với diện tích hơn 1,2 ha và gần 2.000 cây ca cao thuộc nhiều giống khác nhau. Du khách được tham quan vườn, hái và thưởng thức trái ca cao tươi, tìm hiểu quy trình làm ca cao thủ công từ ủ, rang, xay tới tạo chocolate. Không gian xanh mát, yên bình, thích hợp cho những ai muốn trải nghiệm miệt vườn nhẹ nhàng, học về nông nghiệp địa phương và thử các sản phẩm ca cao nguyên chất.
`,
    },
  {
    id: 4,
    location: "Vườn trái cây Phi Yến",
    duration: "ấp Nhơn Lộc 1 - Huyện Phong Điền",
    image: "/location_images/PhiYen.png",
    description: `
    Địa chỉ: Đường Nguyễn Văn Cừ nối dài, ấp Nhơn Lộc 1, thị trấn Phong Điền, huyện Phong Điền, TP Cần Thơ.

    Mô tả: Vườn trái cây Phi Yến nằm tại Phong Điền, Cần Thơ, nổi bật với không gian miệt vườn xanh mát và phong phú cây trái như nhãn tím, ổi tím, mận, xoài, vú sữa, cam quýt và đặc sản dâu da địa phương. Du khách có thể tự tay hái trái cây, đi xuồng ba lá len lỏi kênh rạch, câu cá, đi cầu khỉ, tham quan tiểu cảnh check-in, thưởng thức món ăn đồng quê và nghỉ dưỡng tại homestay. Đây là điểm đến lý tưởng cho gia đình và nhóm bạn tìm kiếm sự thư giãn và trải nghiệm đậm chất miền Tây.
`,
    },
  {
    id: 5,
    location: "Cồn Ấu",
    duration: "Phường Hưng Lợi - Quận Cái Răng",
    image: "/location_images/ConAu.png",
    description: `
    Mô tả: Cồn Ấu là một cù lao nhỏ trên sông Hậu thuộc quận Cái Răng, nổi tiếng với cảnh quan sông nước trong lành, rặng bần xanh và vườn cây trái miệt vườn. Với diện tích khoảng 130 ha, nơi đây vẫn giữ nét hoang sơ, bình yên và gần gũi đời sống người dân miền Tây.
`,
    },
  {
    id: 6,
    location: "Cồn Sơn",
    duration: "Phường Bùi Hữu Nghĩa - Quận Bình Thủy",
    image: "/location_images/ConSon.png",
    description: `
    Địa chỉ: Giữa sông Hậu, thuộc phường Bùi Hữu Nghĩa, quận Bình Thủy, TP Cần Thơ.

    Mô tả: Cồn Sơn là một cù lao nhỏ trên sông Hậu thuộc quận Bình Thủy, Cần Thơ, nổi tiếng với không gian miệt vườn xanh mát, kênh rạch và vườn trái cây trĩu quả. Nơi đây được biết đến với mô hình du lịch cộng đồng - người dân trực tiếp làm hướng dẫn, đón khách và phục vụ món ăn địa phương.
`,
    },
  {
    id: 7,
    location: "Khu du lịch sinh thái Phú Hữu",
    duration: "Ấp Phú Nghĩa - Xã Phú Hữu",
    image: "/location_images/PhuHuu.png",
    description: `
    Địa chỉ: Ấp Phú Nghĩa, Xã Phú Hữu, Cần Thơ (khu vực Phụng Hiệp - giáp Cần Thơ & Hậu Giang).

    Mô tả: Khu du lịch sinh thái Phú Hữu rộng khoảng 20 ha, nằm giữa hệ thống kênh rạch và vườn cây ăn trái đặc trưng miền Tây. Đây là điểm đến mang đậm chất miệt vườn, với các hoạt động dân dã như tát mương bắt cá, chèo xuồng dưới tán dừa nước, làm bánh tráng, hái trái cây, câu cá và thưởng thức món ăn đồng quê như lẩu mắm, cá lóc nướng trui. Không gian xanh mát, yên bình và gần gũi giúp du khách thư giãn, rất phù hợp cho chuyến picnic cuối tuần hoặc nghỉ dưỡng gần thiên nhiên.
`,
    },
  {
    id: 8,
    location: "Khu du lịch sinh thái Xẻo Nhum",
    duration: "Phường Hưng Thạnh - Quận Cái Răng",
    image: "/location_images/XeoNhum.png",
    description: `
    Địa chỉ: Số 01 Khu Dân Cư Hồng Loan, Phường Hưng Thạnh, Quận Cái Răng, TP Cần Thơ.

    Mô tả: Khu du lịch sinh thái Xẻo Nhum nằm tại quận Cái Răng, Cần Thơ, rộng khoảng 2,1 ha, được bao phủ bởi hàng trúc xanh, vườn cây ăn trái và ao nước đặc trưng miền Tây. Đây là điểm đến du lịch cộng đồng với nhiều hoạt động dân dã như tát mương bắt cá, chèo xuồng, bắt ốc, câu cá, thuê đất trồng rau và các trò chơi dân gian.
`,
    },
  {
    id: 9,
    location: "Khu du lịch sinh thái Lung Cột Lầu",
    duration: "Xã Nhơn Nghĩa - Huyện Phong Điền",
    image: "/location_images/LungCotCau.png",
    description: `
    Địa chỉ: Quốc lộ 61C, Xã Nhơn Nghĩa, Huyện Phong Điền, TP Cần Thơ.

    Mô tả: Khu du lịch sinh thái Lung Cột Lầu (còn gọi Lung Cột Cầu) là điểm du lịch sinh thái tiêu biểu tại huyện Phong Điền, Cần Thơ, được công nhận là một trong những địa điểm du lịch tiêu biểu vùng ĐBSCL. Khu vườn mang đậm chất miệt vườn Nam Bộ, với rặng cây xanh mát, vườn trái cây, ao cá và kênh rạch tự nhiên.
`,
    },
  {
    id: 10,
    location: "Vườn cò Bằng Lăng",
    duration: "Phường Thuận An - Quận Thốt Nốt",
    image: "/location_images/BangLang.png",
    description: `
    Địa chỉ: Ấp Thới Bình 1, Phường Thuận An, Quận Thốt Nốt, TP. Cần Thơ.

    Mô tả: Vườn cò Bằng Lăng là một trong những khu bảo tồn cò tự nhiên lớn nhất miền Tây, nằm ở quận Thốt Nốt, TP Cần Thơ. Đây là nơi sinh sống của hàng ngàn con cò và nhiều loài chim nước khác. Vào buổi sáng sớm hoặc chiều tối, bạn sẽ thấy cảnh đàn cò bay trắng cả bầu trời — một khung cảnh hiếm gặp và rất ấn tượng. Con đường vào vườn cò được bao phủ bởi hàng cây bằng lăng tím, tạo nên không gian nên thơ và đậm chất miệt vườn Nam Bộ.
`,
    },
  {
    id: 11,
    location: "Thiền Viện Trúc Lâm Phương Nam",
    duration: "Xã Mỹ Khánh - Huyện Phong Điền",
    image: "/location_images/PhuongNam.png",
    description: `
    Địa chỉ: ĐT 923, Ấp Nhơn Mỹ, Xã Mỹ Khánh, Huyện Phong Điền, TP Cần Thơ.

    Mô tả: Thiền Viện Trúc Lâm Phương Nam là thiền viện quy mô lớn nhất vùng Tây Nam Bộ, tọa lạc trên trục ĐT923, xã Mỹ Khánh, Phong Điền. Công trình khởi công năm 2013, khánh thành 2014, diện tích khoảng 3,8-4 ha, kiến trúc mô phỏng phong cách Phật giáo thời Lý-Trần với mái ngói đỏ cong, cột gỗ, chánh điện, tổ điện, gác chuông-trống và các tiểu cảnh. Không gian thanh tịnh, nhiều mảng xanh, phù hợp dạo bộ, tĩnh tâm và chụp ảnh kiến trúc.
`,
    },
  {
    id: 12,
    location: "Chùa Ông (Quảng Triệu Hội Quán)",
    duration: "Phường Thuận An - Quận Thốt Nốt",
    image: "/location_images/ChuaOng.png",
    description: `
    Địa chỉ: Số 32 đường Hai Bà Trưng, phường Tân An, quận Ninh Kiều, TP Cần Thơ.

    Mô tả: Chùa Ông (Quảng Triệu Hội Quán) là di tích của cộng đồng người Hoa gốc Quảng Đông tại Cần Thơ, khởi dựng năm 1894 và hoàn thành năm 1896; được xếp hạng Di tích kiến trúc nghệ thuật cấp quốc gia năm 1993. Công trình nổi bật với bố cục chữ Quốc (國), mái ngói âm-dương, phù điêu gốm sứ và trang trí rực rỡ. Vị trí ngay trung tâm Ninh Kiều, đối diện bến Ninh Kiều, thuận tiện kết hợp nhiều điểm tham quan lân cận.
`,
    },
  {
    id: 13,
    location: "Chùa Nam Nhã",
    duration: "Phường Bùi Hữu Nghĩa - Quận Bình Thủy",
    image: "/location_images/ChuaNamNha.png",
    description: `
    Địa chỉ: Số 612 Đường Cách Mạng Tháng Tám, Phường Bùi Hữu Nghĩa, Quận Bình Thủy, TP. Cần Thơ
    Mô tả: Chùa Nam Nhã là ngôi chùa cổ hơn 120 năm, ghi dấu kiến trúc và lịch sử vùng Tây Đô. Được xây dựng từ cuối thế kỷ XIX (khoảng 1895) bởi ông Nguyễn Giác Nguyên, tiền thân là Nam Nhã Đường, nay trở thành di tích lịch sử - văn hoá. Chùa nằm bên sông Bình Thủy, đối diện đình Bình Thủy, với sân chùa rợp bóng cây, hồ nước, mái ngói cong và kết cấu hài hoà Hoa-Pháp-Việt. Đây là điểm đến phù hợp để tham quan, dâng hương và tìm khoảnh khắc yên bình giữa lòng thành phố.
`,
    },
  {
    id: 14,
    location: "Đình Bình Thủy",
    duration: "Phường Bình Thủy - Quận Bình Thủy",
    image: "/location_images/DinhBinhThuy.png",
    description: `
    Địa chỉ: Số 46/11A Lê Hồng Phong, Phường Bình Thủy, Quận Bình Thủy, TP. Cần Thơ.

    Mô tả: Đình Bình Thủy (còn gọi “Long Tuyền Cổ Miếu”) là công trình kiến trúc hơn 180 năm tuổi tại quận Bình Thủy, Cần Thơ. Ngôi đình được xây dựng năm 1844, trùng tu chủ yếu năm 1909-1910, và được công nhận là Di tích kiến trúc-nghệ thuật cấp quốc gia vào năm 1989. Đình có vị trí ven sông Hậu, mái ngói âm-dương, chạm khắc gỗ tinh xảo và là trung tâm tín ngưỡng, lễ hội của cộng đồng địa phương.
`,
    },
  {
    id: 15,
    location: "Chùa Phật Học",
    duration: "Phường Tân An - Quận Ninh Kiều",
    image: "/location_images/ChuaPhatHoc.png",
    description: `
    Địa chỉ: Số 11 Đại Lộ Hòa Bình, Phường Tân An, Quận Ninh Kiều, TP. Cần Thơ.

    Mô tả: Chùa Phật Học nằm tại trung tâm TP. Cần Thơ, số 11 Đại Lộ Hòa Bình, phường Tân An, quận Ninh Kiều. Được xây dựng năm 1951 bởi Hội Phật Học Nam Việt và sau được trùng tu năm 2012-2014 thành tháp 5 tầng hiện đại. Tọa lạc đối diện chùa Khmer Munir Ansay và cách Bến Ninh Kiều khoảng 500m.
  `,
    },
  {
    id: 16,
    location: "Bến Ninh Kiều",
    duration: "Phường Tân An - Quận Ninh Kiều",
    image: "/location_images/BNK.png",
    description: `
    Địa chỉ: Phường Tân An, quận Ninh Kiều, TP. Cần Thơ.

    Mô tả: Bến Ninh Kiều là biểu tượng du lịch nổi tiếng nhất của Cần Thơ, nằm ngay trung tâm thành phố bên dòng sông Hậu thơ mộng. Không gian bờ kè rộng rãi, công viên cây xanh, tượng Bác Hồ, cầu đi bộ Ninh Kiều và bến tàu tạo nên điểm check-in không thể bỏ qua. Về đêm, Bến Ninh Kiều trở nên rực rỡ với ánh đèn lung linh, nhà hàng du thuyền, nhạc sống và không khí sông nước lãng mạn. Đây là nơi lý tưởng để cảm nhận nhịp sống Cần Thơ hiện đại nhưng vẫn đậm chất miền Tây.
`,
    },
  {
    id: 17,
    location: "Chợ nổi Cái Răng",
    duration: "Phường Lê Bình - Quận Cái Răng",
    image: "/location_images/ChoNoi.png",
    description: `
    Địa chỉ: Trên sông Cần Thơ (nhánh sông Hậu), phường Lê Bình, quận Cái Răng, TP. Cần Thơ.

    Mô tả: Chợ nổi Cái Răng là biểu tượng văn hóa đặc trưng của miền Tây Nam Bộ và là một trong những chợ nổi lớn nhất Việt Nam. Nơi đây diễn ra hoạt động buôn bán nông sản, trái cây, thực phẩm ngay trên thuyền - phản ánh lối sống sông nước đã tồn tại hàng trăm năm. Ghé chợ lúc bình minh, du khách có thể thưởng thức ly cà phê nóng, tô hủ tiếu nghi ngút khói và ngắm dòng người trên sông tạo nên khung cảnh sống động, mộc mạc nhưng đầy chất thơ.
`,
    },
  {
    id: 18,
    location: "Nhà cổ Bình Thủy",
    duration: "Phường Bình Thủy - Quận Bình Thủy",
    image: "/location_images/NhaCo.png",
    description: `
    Địa chỉ: 142/144 đường Bùi Hữu Nghĩa, phường Bình Thủy, quận Bình Thủy, TP. Cần Thơ.

    Mô tả: Nhà cổ Bình Thủy được xây dựng vào năm 1870 bởi gia tộc họ Dương - một trong những dinh thự cổ nổi tiếng nhất miền Tây. Công trình mang kiến trúc giao thoa Pháp - Hoa - Việt, với mặt tiền kiểu biệt thự Pháp, nội thất gỗ truyền thống, cửa vòm, gạch bông cổ và vườn lan quý. Đây là nơi tái hiện không gian sống của tầng lớp điền chủ Nam Bộ xưa và từng xuất hiện trong nhiều bộ phim, trong đó nổi bật là 'Người tình' (L’Amant).
`,
  },
  {
    id: 19,
    location: "Bảo tàng Thành phố Cần Thơ",
    duration: "Phường Tân An - Quận Ninh Kiều",
    image: "/location_images/BaoTang.png",
    description: `
    Địa chỉ: Số 1 Đại Lộ Hòa Bình, phường Tân An, quận Ninh Kiều, TP. Cần Thơ.

    Mô tả: Bảo tàng Thành phố Cần Thơ là nơi lưu giữ, trưng bày toàn diện lịch sử - văn hóa - xã hội của vùng đồng bằng sông Cửu Long, đặt tại số 1 Đại Lộ Hòa Bình, TP. Cần Thơ. Với hơn 3.000 m² không gian trưng bày, bảo tàng giới thiệu hơn 1.000 - 5.000 hiện vật trải dài từ thời văn hóa Óc Eo, đến 3 dân tộc Kinh-Hoa-Khmer, và giai đoạn đấu tranh cách mạng.
`,
  },
  {
    id: 20,
    location: "Đền thờ Hùng Vương",
    duration: "Phường Bình Thủy - Quận Bình Thủy",
    image: "/location_images/DenTho.png",
    description: `
    Địa chỉ: Khu vực 7, phường Bình Thủy, quận Bình Thủy, TP. Cần Thơ, Việt Nam.

    Mô tả: Đền thờ Hùng Vương Cần Thơ là công trình văn hóa - tâm linh quy mô lớn tại miền Tây Nam Bộ, với diện tích gần 39.000 m². Công trình mang đậm biểu tượng thời đại Hùng Vương và văn hóa Đông Sơn: khối chính vuông - tròn tượng trưng 'đất vuông trời tròn', 18 cánh cung biểu trưng 18 đời Vua Hùng và 54 cột trụ đại diện 54 dân tộc Việt Nam. Không gian rộng lớn với hồ nước, cây xanh, khu thờ tự trang nghiêm giúp du khách tìm về nguồn cội dân tộc, tri ân tổ tiên và khám phá văn hóa Việt trong khung cảnh hiện đại hòa quyện truyền thống.
`,
  },
  {
    id: 21,
    location: "Chợ Xuân Khánh",
    duration: "Đường 30 tháng 4 - quận Ninh Kiều",
    image: "/location_images/ChoXK.png",
    description: `
    Địa chỉ: Đường 30 tháng 4, quận Ninh Kiều, Cần Thơ.

    Mô tả: Chợ lớn tại khu dân cư Xuân Khánh, nổi tiếng với hải sản tươi, rau củ và đồ ăn sáng. Không khí nhộn nhịp từ sáng sớm.
`,
  },
  {
    id: 22,
    location: "Chợ Tân An",
    duration: "Đường Hai Bà Trưng - quận Ninh Kiều",
    image: "/location_images/ChoTA.png",
    description: `
    Địa chỉ: Đường Hai Bà Trưng, gần Bến Ninh Kiều, quận Ninh Kiều.

    Mô tả: Một trong những chợ lâu đời nhất Cần Thơ, nổi tiếng bán đặc sản miền Tây: bánh tét, khô cá, mắm, trái cây. Thu hút nhiều khách du lịch.
`,
  },
  {
    id: 23,
    location: "Chợ An Bình",
    duration: "Đường Trần Vĩnh Kiết - quận Ninh Kiều",
    image: "/location_images/ChoAB.png",
    description: `
    Địa chỉ: Đường Trần Vĩnh Kiết, quận Ninh Kiều, Cần Thơ.

    Mô tả: Chợ dân sinh lớn của khu An Bình, chuyên bán cá đồng, hải sản, rau vườn và nhiều món ăn sáng đặc trưng miền Tây.
`,
  },
  {
    id: 24,
    location: "Chợ Cái Khế",
    duration: "Đường Trần Văn Khéo - quận Ninh Kiều",
    image: "/location_images/ChoCK.png",
    description: `
    Địa chỉ: Đường Trần Văn Khéo, quận Ninh Kiều, Cần Thơ.

    Mô tả: Chợ nằm gần khu khách sạn và khu vui chơi Cái Khế, bán nhiều mặt hàng đa dạng: thịt cá, rau củ, quần áo và đồ gia dụng.
`,
  },
  {
    id: 25,
    location: "Chợ Bình Thủy",
    duration: " Đường Lê Hồng Phong - Quận Bình Thủy",
    image: "/location_images/ChoBT.png",
    description: `
    Địa chỉ: Đường Lê Hồng Phong, Phường Bình Thủy, Quận Bình Thủy, Cần Thơ.

    Mô tả: Chợ Bình Thủy là một trong những khu chợ lâu đời và sầm uất của quận Bình Thủy. Chợ nổi tiếng với các loại thực phẩm tươi sống, trái cây miệt vườn, hải sản, cùng nhiều món ăn sáng đặc trưng miền Tây.
`,
  },
];

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;

    router.push(`/search?query=${encodeURIComponent(trimmed)}`);
    setQuery("");
    setSuggestions([]);
  };

  const handleChange = (text: string) => {
  setQuery(text);

  if (!text.trim()) {
    setSuggestions([]);
    return;
  }

  const filtered = LOCATIONS.filter((item) =>
    item.location.toLowerCase().includes(text.toLowerCase())
  );

  setSuggestions(filtered);
};

  const handleSelect = (id: number) => {
    router.push(`/locations/${id}`);
    setSuggestions([]);
    setQuery("");
  };

  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 md:flex-row md:items-center">
        <div className="flex-1 flex items-center gap-2 bg-white rounded-xl px-3 py-2 md:px-4 md:py-3">
          <FaSearch className="text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => handleChange(e.target.value)}
            placeholder="Search......"
            className="w-full bg-transparent border-none outline-none text-gray-900 placeholder:text-gray-400 text-sm md:text-base"
          />
        </div>

        <button
          type="submit"
          className="w-full md:w-auto rounded-xl px-4 py-2 md:px-5 md:py-3 text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors"
        >
          Tìm kiếm
        </button>
      </form>

      {suggestions.length > 0 && (
        <ul className="absolute left-0 mt-2 w-full bg-white rounded-xl shadow-lg border z-20 max-h-60 overflow-y-auto">
          {suggestions.map((item) => (
            <li
              key={item.id}
              onClick={() => handleSelect(item.id)}
              className="px-4 py-3 cursor-pointer hover:bg-gray-100 text-gray-800"
            >
              {item.location}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
