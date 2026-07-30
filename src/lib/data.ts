// Ảnh nằm trong public/images → tham chiếu bằng đường dẫn tuyệt đối từ web root.
// (Trước đây import từ src/assets qua Vite; Next.js phục vụ trực tiếp từ public/.)
export const IMG = {
  hospital: "/images/project-hospital.jpg",
  resort: "/images/project-resort.jpg",
  factory: "/images/project-factory.jpg",
  hotel: "/images/project-hotel.jpg",
  defense: "/images/project-defense.jpg",
  chiller: "/images/hero-chiller.jpg",
  chairman: "/images/chairman.jpg",
} as const;

const { hospital, resort, factory, hotel, defense, chiller } = IMG;

export type Project = {
  slug: string;
  name: string;
  nameEn: string;
  client: string;
  clientEn: string;
  type: "hospital" | "airport" | "office" | "hotel" | "factory" | "defense" | "infra";
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
    name: "Hệ thống Điều hòa & Thông gió",
    nameEn: "HVAC & Ventilation systems",
    desc: "HVAC, Chiller, VRF và giải pháp kiểm soát môi trường trong nhà.",
    descEn: "HVAC, chillers, VRF and indoor environment control solutions.",
    brands: ["Trane", "Mitsubishi Electric", "Kruger"],
    image: chiller,
  },
  {
    id: "02",
    name: "Hệ thống Chiếu sáng",
    nameEn: "Lighting systems",
    desc: "Chiếu sáng thông minh cho công trình dân dụng, thương mại và công nghiệp.",
    descEn: "Smart lighting for residential, commercial and industrial projects.",
    brands: ["Signify / Philips", "Osram"],
    image: hotel,
  },
  {
    id: "03",
    name: "Hệ thống Nước nóng trung tâm",
    nameEn: "Central hot water systems",
    desc: "Heat Pump và giải pháp nước nóng tiết kiệm năng lượng.",
    descEn: "Heat pumps and energy-efficient hot water solutions.",
    brands: ["Mitsubishi Electric", "Solimpeks"],
    image: resort,
  },
  {
    id: "04",
    name: "Hệ thống Khí y tế & Vận chuyển mẫu",
    nameEn: "Medical gas & pneumatic tube systems",
    desc: "Medical Gas, PTS và hạ tầng kỹ thuật cho bệnh viện hiện đại.",
    descEn: "Medical gas, PTS and technical infrastructure for modern hospitals.",
    // TODO(client): xác nhận hãng khí y tế / PTS mà HBH đang là đại lý.
    brands: ["BeaconMedaes", "Aerocom"],
    image: hospital,
  },
  {
    id: "05",
    name: "Hệ thống Điện nhẹ & BMS",
    nameEn: "ELV & BMS systems",
    desc: "BMS, ELV và nền tảng quản lý vận hành tòa nhà thông minh.",
    descEn: "BMS, ELV and the operations platform for smart buildings.",
    brands: ["Schneider Electric"],
    image: defense,
  },
  {
    id: "06",
    name: "Hệ thống Tủ điện & Thiết bị điện",
    nameEn: "Switchboards & electrical equipment",
    desc: "Tủ điện, thiết bị đóng cắt và giải pháp phân phối điện Schneider Electric.",
    descEn: "Switchboards, switchgear and Schneider Electric power distribution solutions.",
    brands: ["Schneider Electric"],
    image: factory,
  },
];

export type BrandLogo = { name: string; logo: string };

// Hãng thiết bị / thương hiệu M&E — HBH là đại lý ủy quyền.
// Logo lưu tại public/logos/*.png (xem README bên dưới để biết tên file tương ứng).
export const brands: BrandLogo[] = [
  { name: "Mitsubishi Electric", logo: "/logos/mitsubishi-electric.png" },
  { name: "Trane", logo: "/logos/trane.png" },
  { name: "Carrier", logo: "/logos/carrier.png" },
  { name: "LG", logo: "/logos/lg.png" },
  { name: "Toshiba", logo: "/logos/toshiba.png" },
  { name: "Dunham-Bush", logo: "/logos/dunham-bush.png" },
  { name: "Kruger", logo: "/logos/kruger.png" },
  { name: "AL-KO", logo: "/logos/al-ko.png" },
  { name: "Grundfos", logo: "/logos/grundfos.png" },
  { name: "Wilo", logo: "/logos/wilo.png" },
  { name: "Signify / Philips", logo: "/logos/signify-philips.png" },
  { name: "Breeze", logo: "/logos/breeze.png" },
];

// Chủ đầu tư / khách hàng.
export const clients: BrandLogo[] = [
  { name: "Sun Group", logo: "/logos/sun-group.png" },
  { name: "FLC Group", logo: "/logos/flc.png" },
  { name: "TNR Holdings", logo: "/logos/tnr.png" },
  { name: "Sunshine Group", logo: "/logos/sunshine-group.png" },
  { name: "MIK Group", logo: "/logos/mik-group.png" },
  { name: "TTG Holding", logo: "/logos/ttg-holding.png" },
  { name: "Mipec", logo: "/logos/mipec.png" },
  { name: "Splendora", logo: "/logos/splendora.png" },
  { name: "Dragon Ocean Đồ Sơn", logo: "/logos/dragon-ocean.png" },
  { name: "Hồng Ngọc Hospital", logo: "/logos/hong-ngoc-hospital.png" },
];

// Tổng thầu xây dựng / đối tác M&E.
export const contractors: BrandLogo[] = [
  { name: "Coteccons", logo: "/logos/coteccons.png" },
  { name: "Ricons", logo: "/logos/ricons.png" },
  { name: "Hòa Bình", logo: "/logos/hoa-binh.png" },
  { name: "Delta", logo: "/logos/delta.png" },
  { name: "REE M&E", logo: "/logos/ree-me.png" },
  { name: "Hawee", logo: "/logos/hawee.png" },
  { name: "Tổng công ty 36", logo: "/logos/tong-cong-ty-36.png" },
  { name: "G.I. Industrial Holding", logo: "/logos/gi-industrial.png" },
];

export type NewsItem = {
  slug: string;
  title: string;
  titleEn: string;
  category: string;
  categoryEn: string;
  date: string;
  excerpt: string;
  excerptEn: string;
  image: string;
};

export const news: NewsItem[] = [
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
    image: hospital,
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
    image: hotel,
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
    image: resort,
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
    image: chiller,
  },
];
