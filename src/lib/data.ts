import hospital from "@/assets/project-hospital.jpg";
import resort from "@/assets/project-resort.jpg";
import factory from "@/assets/project-factory.jpg";
import hotel from "@/assets/project-hotel.jpg";
import defense from "@/assets/project-defense.jpg";
import chiller from "@/assets/hero-chiller.jpg";

export type Project = {
  slug: string;
  name: string;
  nameEn: string;
  client: string;
  clientEn: string;
  type: "hospital" | "defense" | "hotel" | "infra" | "factory";
  system: string[];
  systemEn: string[];
  location: string;
  locationEn: string;
  year: number;
  scope: string;
  scopeEn: string;
  image: string;
  gallery?: string[];
};

export const projects: Project[] = [
  {
    slug: "benh-vien-103",
    name: "Bệnh viện Quân y 103 — Toà nhà A2",
    nameEn: "Military Hospital 103 — Building A2",
    client: "Bộ Quốc phòng",
    clientEn: "Ministry of Defense",
    type: "hospital",
    system: ["Chiller", "AHU", "BMS"],
    systemEn: ["Chiller", "AHU", "BMS"],
    location: "Hà Nội",
    locationEn: "Hanoi",
    year: 2020,
    scope: "Cung cấp & lắp đặt hệ thống Chiller 2.400 RT, AHU, BMS trung tâm",
    scopeEn: "Supply & installation of 2,400 RT Chiller system, AHU, central BMS",
    image: hospital,
    gallery: [hospital, chiller, factory],
  },
  {
    slug: "flc-sam-son",
    name: "FLC Sầm Sơn Beach & Golf Resort",
    nameEn: "FLC Sầm Sơn Beach & Golf Resort",
    client: "FLC Group",
    clientEn: "FLC Group",
    type: "hotel",
    system: ["VRF", "Nước nóng trung tâm"],
    systemEn: ["VRF", "Central hot water"],
    location: "Thanh Hoá",
    locationEn: "Thanh Hoa",
    year: 2019,
    scope: "Hệ thống VRF 620HP, nước nóng năng lượng mặt trời 48.000 L/ngày",
    scopeEn: "620HP VRF system, 48,000 L/day solar hot water",
    image: resort,
    gallery: [resort, chiller],
  },
  {
    slug: "nha-may-mipec",
    name: "Nhà máy sản xuất Mipec",
    nameEn: "Mipec Manufacturing Plant",
    client: "Mipec Corporation",
    clientEn: "Mipec Corporation",
    type: "factory",
    system: ["AHU", "Ducting"],
    systemEn: ["AHU", "Ducting"],
    location: "Bắc Ninh",
    locationEn: "Bac Ninh",
    year: 2021,
    scope: "Hệ thống thông gió, điều hoà công nghiệp cho 12.000 m² nhà xưởng",
    scopeEn: "Industrial ventilation & air conditioning system for 12,000 m² factory",
    image: factory,
    gallery: [factory, chiller],
  },
  {
    slug: "tnr-goldsilk",
    name: "TNR Goldsilk Complex",
    nameEn: "TNR Goldsilk Complex",
    client: "TNR Holdings",
    clientEn: "TNR Holdings",
    type: "hotel",
    system: ["VRF", "Chiếu sáng"],
    systemEn: ["VRF", "Lighting"],
    location: "Hà Nội",
    locationEn: "Hanoi",
    year: 2022,
    scope: "Điều hoà VRF 850HP, chiếu sáng LED thông minh 34 tầng",
    scopeEn: "850HP VRF air conditioning, smart LED lighting across 34 floors",
    image: hotel,
    gallery: [hotel, chiller],
  },
  {
    slug: "tong-cuc-hau-can",
    name: "Tổng cục Hậu cần — Trụ sở H",
    nameEn: "General Department of Logistics — Headquarters H",
    client: "Bộ Quốc phòng",
    clientEn: "Ministry of Defense",
    type: "defense",
    system: ["Chiller", "BMS"],
    systemEn: ["Chiller", "BMS"],
    location: "Hà Nội",
    locationEn: "Hanoi",
    year: 2018,
    scope: "Chiller giải nhiệt nước 800 RT, BMS/ACS/EMS toàn công trình",
    scopeEn: "800 RT water-cooled Chiller, project-wide BMS/ACS/EMS",
    image: defense,
    gallery: [defense, chiller],
  },
  {
    slug: "sun-group-ha-long",
    name: "Sun Premier Village Hạ Long",
    nameEn: "Sun Premier Village Ha Long",
    client: "Sun Group",
    clientEn: "Sun Group",
    type: "hotel",
    system: ["VRF", "Nước nóng trung tâm"],
    systemEn: ["VRF", "Central hot water"],
    location: "Quảng Ninh",
    locationEn: "Quang Ninh",
    year: 2023,
    scope: "VRF 1.200HP, hệ nước nóng heat-pump 60.000 L/ngày",
    scopeEn: "1,200HP VRF, 60,000 L/day heat-pump hot water system",
    image: resort,
    gallery: [resort],
  },
];

export const fields = [
  {
    id: "01",
    name: "Điều hòa cục bộ",
    nameEn: "Local (split) air conditioning",
    desc: "Split, Cassette – ứng dụng dân dụng & thương mại quy mô nhỏ.",
    descEn: "Split, Cassette – for small-scale residential & commercial applications.",
    brands: ["Daikin", "LG", "Mitsubishi"],
    image: hotel,
  },
  {
    id: "02",
    name: "Điều hòa Multi",
    nameEn: "Multi-split air conditioning",
    desc: "1 dàn nóng – nhiều dàn lạnh cho căn hộ, biệt thự cao cấp.",
    descEn: "One outdoor unit – multiple indoor units for apartments and premium villas.",
    brands: ["Daikin", "Mitsubishi Electric"],
    image: resort,
  },
  {
    id: "03",
    name: "VRF trung tâm",
    nameEn: "Central VRF air conditioning",
    desc: "Hệ VRV/VRF cho toà nhà văn phòng, khách sạn, bệnh viện.",
    descEn: "VRV/VRF systems for office buildings, hotels, and hospitals.",
    brands: ["Daikin", "LG", "Trane"],
    image: hospital,
  },
  {
    id: "04",
    name: "Chiller",
    nameEn: "Chiller",
    desc: "Chiller giải nhiệt nước & gió cho công trình quy mô lớn.",
    descEn: "Water-cooled & air-cooled chillers for large-scale projects.",
    brands: ["Trane", "Carrier", "York"],
    image: chiller,
  },
  {
    id: "05",
    name: "Nước nóng trung tâm",
    nameEn: "Central hot water",
    desc: "Heat-pump, năng lượng mặt trời cho resort, bệnh viện.",
    descEn: "Heat-pump and solar energy for resorts and hospitals.",
    brands: ["Solimpeks", "Munters"],
    image: factory,
  },
  {
    id: "06",
    name: "Chiếu sáng",
    nameEn: "Lighting",
    desc: "LED thông minh & chiếu sáng kiến trúc tiết kiệm năng lượng.",
    descEn: "Smart LED & energy-efficient architectural lighting.",
    brands: ["Philips", "Osram"],
    image: defense,
  },
];

export const brands = [
  "Trane",
  "Carrier",
  "Mitsubishi Electric",
  "LG",
  "Munters",
  "Solimpeks",
  "Daikin",
  "York",
];

export const clients = [
  "Sun Group",
  "FLC",
  "TNR",
  "TTG Holding",
  "MIK Group",
  "Mipec",
  "Splendora",
  "Dragon Ocean",
  "Hong Ngoc Hospital",
];

export const news = [
  {
    slug: "hbh-ky-hop-dong-benh-vien-108",
    title: "HBH ký hợp đồng cung cấp hệ Chiller cho Bệnh viện 108 mở rộng",
    titleEn: "HBH signs contract to supply Chiller system for the Hospital 108 expansion",
    category: "Tin công ty",
    categoryEn: "Company news",
    date: "2026-06-12",
    excerpt:
      "Gói thầu M&E trị giá 128 tỷ VNĐ — HBH tiếp tục là đối tác chiến lược của khối y tế quốc phòng.",
    excerptEn:
      "An M&E package worth 128 billion VND — HBH remains a strategic partner of the defense healthcare sector.",
  },
  {
    slug: "vrf-tiet-kiem-nang-luong",
    title: "VRF thế hệ mới: tiết kiệm đến 32% điện năng cho khách sạn 5 sao",
    titleEn: "New-generation VRF: up to 32% energy savings for 5-star hotels",
    category: "Kiến thức kỹ thuật",
    categoryEn: "Technical knowledge",
    date: "2026-05-28",
    excerpt:
      "Phân tích công nghệ inverter DC và thu hồi nhiệt trong các dự án resort tại Việt Nam.",
    excerptEn:
      "An analysis of DC inverter and heat-recovery technology in resort projects across Vietnam.",
  },
  {
    slug: "ban-giao-tnr-goldsilk",
    title: "Bàn giao hệ VRF 850HP tại TNR Goldsilk Complex",
    titleEn: "Handover of the 850HP VRF system at TNR Goldsilk Complex",
    category: "Dự án",
    categoryEn: "Projects",
    date: "2026-04-03",
    excerpt:
      "Toàn bộ hệ thống điều hoà & chiếu sáng thông minh 34 tầng đi vào vận hành đúng tiến độ.",
    excerptEn:
      "The entire smart air conditioning & lighting system across 34 floors went into operation on schedule.",
  },
  {
    slug: "hop-tac-trane-2026",
    title: "HBH mở rộng hợp tác chiến lược với Trane khu vực Đông Nam Á",
    titleEn: "HBH expands strategic partnership with Trane in Southeast Asia",
    category: "Tin công ty",
    categoryEn: "Company news",
    date: "2026-03-15",
    excerpt: "Chính thức trở thành nhà phân phối ủy quyền cấp cao nhất tại thị trường miền Bắc.",
    excerptEn:
      "Officially becoming the highest-tier authorized distributor in the Northern market.",
  },
];
