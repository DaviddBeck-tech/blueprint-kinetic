// Locale module cho trang "projects". Shape: { vi, en } với en: typeof vi.
const vi = {
  meta: {
    title: "Dự án — 35+ công trình HBH Vietnam",
    description:
      "35+ công trình M&E, HVAC, BMS đã bàn giao — bệnh viện, quốc phòng, khách sạn – resort, nhà máy.",
    detailFallbackTitle: "Dự án — HBH Vietnam",
  },
  hero: {
    eyebrow: "DỰ ÁN · PORTFOLIO",
    title: "DỰ ÁN TIÊU BIỂU",
    subtitle:
      "Mỗi dự án là minh chứng cho năng lực kỹ thuật, chất lượng thi công và cam kết đồng hành lâu dài.",
  },
  filters: {
    type: "LĨNH VỰC",
    system: "HỆ THỐNG",
    all: "Tất cả",
  },
  types: {
    all: "Tất cả",
    hospital: "Bệnh viện",
    airport: "Sân bay",
    office: "Văn phòng",
    hotel: "Khách sạn & Resort",
    factory: "Nhà máy",
    // Không còn hiện thành chip lọc, nhưng vẫn là type hợp lệ trong dữ liệu.
    defense: "Quốc phòng",
    infra: "Hạ tầng",
  },
  systems: {
    hvac: "HVAC",
    electrical: "Điện",
    elvBms: "ELV & BMS",
    hotWater: "Nước nóng",
    medicalGas: "Khí y tế",
  },
  grid: {
    noResults: "— KHÔNG CÓ KẾT QUẢ",
    noResultsHint: "Thử điều chỉnh bộ lọc để xem thêm dự án.",
  },
  detail: {
    back: "Về danh sách dự án",
    notFoundTitle: "Không tìm thấy dự án",
    notFoundBack: "← Về danh sách",
    techNote: "— GHI CHÚ KỸ THUẬT",
    scopeHeading: "Phạm vi công việc",
    scopeBody:
      "HBH đảm nhận vai trò tổng thầu M&E cho toàn bộ hệ thống, bao gồm khảo sát hiện trường, thiết kế shopdrawing, cung cấp thiết bị chính hãng, thi công lắp đặt và bàn giao vận hành đúng tiến độ tổng thầu.",
    warrantyBody:
      "Hệ thống được bảo hành 24 tháng theo tiêu chuẩn nhà sản xuất và ký kết hợp đồng bảo trì định kỳ với đội ngũ kỹ sư chuyên trách của HBH.",
    similarCta: "Dự án tương tự?",
    related: "— DỰ ÁN LIÊN QUAN",
    spec: {
      client: "CHỦ ĐẦU TƯ",
      location: "ĐỊA ĐIỂM",
      year: "NĂM BÀN GIAO",
      system: "HỆ THỐNG",
      type: "LOẠI CÔNG TRÌNH",
    },
  },
};

const en: typeof vi = {
  meta: {
    title: "Projects — 35+ HBH Vietnam works",
    description:
      "35+ M&E, HVAC, BMS works delivered — hospitals, defense, hotels – resorts, factories.",
    detailFallbackTitle: "Projects — HBH Vietnam",
  },
  hero: {
    eyebrow: "PROJECTS · PORTFOLIO",
    title: "FEATURED PROJECTS",
    subtitle:
      "Every project stands as proof of our engineering capability, installation quality and long-term commitment.",
  },
  filters: {
    type: "SECTOR",
    system: "SYSTEM",
    all: "All",
  },
  types: {
    all: "All",
    hospital: "Hospital",
    airport: "Airport",
    office: "Office",
    hotel: "Hotel & Resort",
    factory: "Factory",
    defense: "Defense",
    infra: "Infrastructure",
  },
  systems: {
    hvac: "HVAC",
    electrical: "Electrical",
    elvBms: "ELV & BMS",
    hotWater: "Hot water",
    medicalGas: "Medical gas",
  },
  grid: {
    noResults: "— NO RESULTS",
    noResultsHint: "Try adjusting the filters to see more projects.",
  },
  detail: {
    back: "Back to projects list",
    notFoundTitle: "Project not found",
    notFoundBack: "← Back to list",
    techNote: "— TECHNICAL NOTES",
    scopeHeading: "Scope of work",
    scopeBody:
      "HBH acts as the M&E main contractor for the entire system, including site survey, shop drawing design, supply of genuine equipment, installation and operational handover on the main-contract schedule.",
    warrantyBody:
      "The system carries a 24-month warranty per manufacturer standards, with a periodic maintenance contract signed with HBH's dedicated engineering team.",
    similarCta: "Similar project?",
    related: "— RELATED PROJECTS",
    spec: {
      client: "CLIENT",
      location: "LOCATION",
      year: "YEAR DELIVERED",
      system: "SYSTEM",
      type: "PROJECT TYPE",
    },
  },
};

export const projects = { vi, en };
