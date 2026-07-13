import hospital from "@/assets/project-hospital.jpg";
import resort from "@/assets/project-resort.jpg";
import factory from "@/assets/project-factory.jpg";
import hotel from "@/assets/project-hotel.jpg";
import defense from "@/assets/project-defense.jpg";
import chiller from "@/assets/hero-chiller.jpg";

export type Project = {
  slug: string;
  name: string;
  client: string;
  type: "hospital" | "defense" | "hotel" | "infra" | "factory";
  system: string[];
  location: string;
  year: number;
  scope: string;
  image: string;
  gallery?: string[];
};

export const projects: Project[] = [
  {
    slug: "benh-vien-103",
    name: "Bệnh viện Quân y 103 — Toà nhà A2",
    client: "Bộ Quốc phòng",
    type: "hospital",
    system: ["Chiller", "AHU", "BMS"],
    location: "Hà Nội",
    year: 2020,
    scope: "Cung cấp & lắp đặt hệ thống Chiller 2.400 RT, AHU, BMS trung tâm",
    image: hospital,
    gallery: [hospital, chiller, factory],
  },
  {
    slug: "flc-sam-son",
    name: "FLC Sầm Sơn Beach & Golf Resort",
    client: "FLC Group",
    type: "hotel",
    system: ["VRF", "Nước nóng trung tâm"],
    location: "Thanh Hoá",
    year: 2019,
    scope: "Hệ thống VRF 620HP, nước nóng năng lượng mặt trời 48.000 L/ngày",
    image: resort,
    gallery: [resort, chiller],
  },
  {
    slug: "nha-may-mipec",
    name: "Nhà máy sản xuất Mipec",
    client: "Mipec Corporation",
    type: "factory",
    system: ["AHU", "Ducting"],
    location: "Bắc Ninh",
    year: 2021,
    scope: "Hệ thống thông gió, điều hoà công nghiệp cho 12.000 m² nhà xưởng",
    image: factory,
    gallery: [factory, chiller],
  },
  {
    slug: "tnr-goldsilk",
    name: "TNR Goldsilk Complex",
    client: "TNR Holdings",
    type: "hotel",
    system: ["VRF", "Chiếu sáng"],
    location: "Hà Nội",
    year: 2022,
    scope: "Điều hoà VRF 850HP, chiếu sáng LED thông minh 34 tầng",
    image: hotel,
    gallery: [hotel, chiller],
  },
  {
    slug: "tong-cuc-hau-can",
    name: "Tổng cục Hậu cần — Trụ sở H",
    client: "Bộ Quốc phòng",
    type: "defense",
    system: ["Chiller", "BMS"],
    location: "Hà Nội",
    year: 2018,
    scope: "Chiller giải nhiệt nước 800 RT, BMS/ACS/EMS toàn công trình",
    image: defense,
    gallery: [defense, chiller],
  },
  {
    slug: "sun-group-ha-long",
    name: "Sun Premier Village Hạ Long",
    client: "Sun Group",
    type: "hotel",
    system: ["VRF", "Nước nóng trung tâm"],
    location: "Quảng Ninh",
    year: 2023,
    scope: "VRF 1.200HP, hệ nước nóng heat-pump 60.000 L/ngày",
    image: resort,
    gallery: [resort],
  },
];

export const fields = [
  { id: "01", name: "Điều hòa cục bộ", desc: "Split, Cassette – ứng dụng dân dụng & thương mại quy mô nhỏ.", brands: ["Daikin", "LG", "Mitsubishi"] },
  { id: "02", name: "Điều hòa Multi", desc: "1 dàn nóng – nhiều dàn lạnh cho căn hộ, biệt thự cao cấp.", brands: ["Daikin", "Mitsubishi Electric"] },
  { id: "03", name: "VRF trung tâm", desc: "Hệ VRV/VRF cho toà nhà văn phòng, khách sạn, bệnh viện.", brands: ["Daikin", "LG", "Trane"] },
  { id: "04", name: "Chiller", desc: "Chiller giải nhiệt nước & gió cho công trình quy mô lớn.", brands: ["Trane", "Carrier", "York"] },
  { id: "05", name: "Nước nóng trung tâm", desc: "Heat-pump, năng lượng mặt trời cho resort, bệnh viện.", brands: ["Solimpeks", "Munters"] },
  { id: "06", name: "Chiếu sáng", desc: "LED thông minh & chiếu sáng kiến trúc tiết kiệm năng lượng.", brands: ["Philips", "Osram"] },
];

export const brands = [
  "Trane", "Carrier", "Mitsubishi Electric", "LG", "Munters", "Solimpeks",
  "Daikin", "York",
];

export const clients = [
  "Sun Group", "FLC", "TNR", "TTG Holding", "MIK Group",
  "Mipec", "Splendora", "Dragon Ocean", "Hong Ngoc Hospital",
];

export const news = [
  {
    slug: "hbh-ky-hop-dong-benh-vien-108",
    title: "HBH ký hợp đồng cung cấp hệ Chiller cho Bệnh viện 108 mở rộng",
    category: "Tin công ty",
    date: "2026-06-12",
    excerpt: "Gói thầu M&E trị giá 128 tỷ VNĐ — HBH tiếp tục là đối tác chiến lược của khối y tế quốc phòng.",
  },
  {
    slug: "vrf-tiet-kiem-nang-luong",
    title: "VRF thế hệ mới: tiết kiệm đến 32% điện năng cho khách sạn 5 sao",
    category: "Kiến thức kỹ thuật",
    date: "2026-05-28",
    excerpt: "Phân tích công nghệ inverter DC và thu hồi nhiệt trong các dự án resort tại Việt Nam.",
  },
  {
    slug: "ban-giao-tnr-goldsilk",
    title: "Bàn giao hệ VRF 850HP tại TNR Goldsilk Complex",
    category: "Dự án",
    date: "2026-04-03",
    excerpt: "Toàn bộ hệ thống điều hoà & chiếu sáng thông minh 34 tầng đi vào vận hành đúng tiến độ.",
  },
  {
    slug: "hop-tac-trane-2026",
    title: "HBH mở rộng hợp tác chiến lược với Trane khu vực Đông Nam Á",
    category: "Tin công ty",
    date: "2026-03-15",
    excerpt: "Chính thức trở thành nhà phân phối ủy quyền cấp cao nhất tại thị trường miền Bắc.",
  },
];
