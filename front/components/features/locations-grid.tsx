"use client";
import React from 'react'
import { Locations } from "@/lib/types";
import LocationsCard from "./locations-card";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
const LocationsSection: Locations[] = [
  {
    id: 1,
    location: "Khu Du Lịch Mỹ Khánh",
    duration: "Xã Mỹ Khánh - Huyện Phong Điền",
    image: "/MyKhanh.png",
  },
  {
    id: 2,
    location: "Làng du lịch Ông Đề",
    duration: "Xã Mỹ Khánh - Huyện Phong Điền",
    image: "/OngDe.png",
  },
  {
    id: 3,
    location: "Vườn ca cao Mười Cương",
    duration: "Xã Mỹ Khánh - Huyện Phong Điền",
    image: "/MuoiCuong.png",
    },
  {
    id: 4,
    location: "Vườn trái cây Phi Yến",
    duration: "ấp Nhơn Lộc 1 - Huyện Phong Điền",
    image: "/PhiYen.png",
    },
  {
    id: 5,
    location: "Cồn Ấu",
    duration: "Phường Hưng Lợi - Quận Cái Răng",
    image: "/ConAu.png",
    },
  {
    id: 6,
    location: "Cồn Sơn",
    duration: "Phường Bùi Hữu Nghĩa - Quận Bình Thủy",
    image: "/ConSon.png",
    },
  {
    id: 7,
    location: "Khu du lịch sinh thái Phú Hữu",
    duration: "Ấp Phú Nghĩa - Xã Phú Hữu",
    image: "/PhuHuu.png",
    },
  {
    id: 8,
    location: "Khu du lịch sinh thái Xẻo Nhum",
    duration: "Phường Hưng Thạnh - Quận Cái Răng",
    image: "/XeoNhum.png",
    },
  {
    id: 9,
    location: "Khu du lịch sinh thái Lung Cột Lầu",
    duration: "Xã Nhơn Nghĩa - Huyện Phong Điền",
    image: "/LungCotCau.png",
    },
  {
    id: 10,
    location: "Vườn cò Bằng Lăng",
    duration: "Phường Thuận An - Quận Thốt Nốt",
    image: "/BangLang.png",
    },
  {
    id: 11,
    location: "Thiền Viện Trúc Lâm Phương Nam",
    duration: "Xã Mỹ Khánh - Huyện Phong Điền",
    image: "/PhuongNam.png",
    },
  {
    id: 12,
    location: "Chùa Ông (Quảng Triệu Hội Quán)",
    duration: "Phường Thuận An - Quận Thốt Nốt",
    image: "/ChuaOng.png",
    },
  {
    id: 13,
    location: "Chùa Nam Nhã",
    duration: "Phường Bùi Hữu Nghĩa - Quận Bình Thủy",
    image: "/ChuaNamNha.png",
    },
  {
    id: 14,
    location: "Đình Bình Thủy",
    duration: "Phường Bình Thủy - Quận Bình Thủy",
    image: "/DinhBinhThuy.png",
    },
  {
    id: 15,
    location: "Chùa Phật Học",
    duration: "Phường Tân An - Quận Ninh Kiều",
    image: "/ChuaPhatHoc.png",
    },
  {
    id: 16,
    location: "Bến Ninh Kiều",
    duration: "Phường Tân An - Quận Ninh Kiều",
    image: "/BNK.png",
    },
  {
    id: 17,
    location: "Chợ nổi Cái Răng",
    duration: "Phường Lê Bình - Quận Cái Răng",
    image: "/ChoNoi.png",
    },
  {
    id: 18,
    location: "Nhà cổ Bình Thủy",
    duration: "Phường Bình Thủy - Quận Bình Thủy",
    image: "/NhaCo.png",
  },
  {
    id: 19,
    location: "Bảo tàng Thành phố Cần Thơ",
    duration: "Phường Tân An - Quận Ninh Kiều",
    image: "/BaoTang.png",
  },
  {
    id: 20,
    location: "Đền thờ Hùng Vương",
    duration: "Phường Bình Thủy - Quận Bình Thủy",
    image: "/DenTho.png",
  },
  {
    id: 21,
    location: "Chợ Xuân Khánh",
    duration: "Đường 30 tháng 4 - quận Ninh Kiều",
    image: "/ChoXK.png",
  },
  {
    id: 22,
    location: "Chợ Tân An",
    duration: "Đường Hai Bà Trưng - quận Ninh Kiều",
    image: "/ChoTA.png",
  },
  {
    id: 23,
    location: "Chợ An Bình",
    duration: "Đường Trần Vĩnh Kiết - quận Ninh Kiều",
    image: "/ChoAB.png",
  },
  {
    id: 24,
    location: "Chợ Cái Khế",
    duration: "Đường Trần Văn Khéo - quận Ninh Kiều",
    image: "/ChoCK.png",
  },
  {
    id: 25,
    location: "Chợ Bình Thủy",
    duration: " Đường Lê Hồng Phong - Quận Bình Thủy",
    image: "/ChoBT.png",
  },
];
export default function LocationsGrid() {
    return (
        <div className="w-full py-8">
      <Swiper
        modules={[Navigation, Pagination]} // Kích hoạt module mũi tên
        spaceBetween={24}       // Khoảng cách giữa các thẻ (tương đương gap-6)
        slidesPerView={1}       // Mặc định mobile hiện 1 hình
        navigation={true}       // Hiện mũi tên trái phải
        pagination={{ clickable: true }} // (Tùy chọn) Hiện dấu chấm tròn ở dưới
        breakpoints={{
          640: { slidesPerView: 2 },  // Tablet nhỏ: hiện 2 hình
          768: { slidesPerView: 3 },  // Tablet lớn: hiện 3 hình
          1024: { slidesPerView: 4 }, // Desktop: hiện 4 hình (giống Booking)
        }}
        className="mySwiper pb-12! px-4" 
      >
        {LocationsSection.map((item) => (
          <SwiperSlide key={item.id} className="h-auto">
            {/* Chiều cao h-full để các thẻ bằng nhau */}
            <div className="h-full">
              <LocationsCard Locations={item} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
    );
}
