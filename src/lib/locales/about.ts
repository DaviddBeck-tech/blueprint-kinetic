// Locale module cho trang "about". Shape: { vi, en } với en: typeof vi.
const vi = {
  meta: {
    title: "Giới thiệu — HBH Vietnam",
    description:
      "Câu chuyện HBH Vietnam — hơn 10 năm kiến tạo giải pháp M&E cho các công trình trọng điểm.",
  },
  hero: {
    eyebrow: "GIỚI THIỆU · 001",
    title1: "Kỹ thuật",
    title2: "chính xác.",
    title3: "Cam kết",
    title4: "dài hạn.",
    subtitle:
      "Hơn một thập kỷ HBH Vietnam đồng hành cùng các công trình khắt khe nhất — bệnh viện quốc phòng, khách sạn 5 sao, nhà máy công nghiệp.",
  },
  chairman: {
    imgAlt: "Chủ tịch HBH Vietnam",
    label: "— THÔNG ĐIỆP · CHỦ TỊCH",
    quote1: "Với HBH, mỗi hệ thống bàn giao là một",
    quoteHighlight: "lời cam kết vận hành 20 năm",
    quote2: ". Chúng tôi không đi tắt trên kỹ thuật, và không thoả hiệp về chất lượng.",
    name: "Ông Nguyễn Văn Hải",
    role: "CHỦ TỊCH HĐQT · HBH VIETNAM",
  },
  philosophy: {
    label: "— TẦM NHÌN · SỨ MỆNH · GIÁ TRỊ",
    vision: {
      t: "Tầm nhìn",
      d: "Trở thành nhà thầu M&E đáng tin cậy nhất miền Bắc — được chọn cho những công trình khó nhất.",
    },
    mission: {
      t: "Sứ mệnh",
      d: "Mang lại sự thoải mái và an toàn vận hành cho người sử dụng cuối cùng, thông qua kỹ thuật chính xác.",
    },
    values: {
      t: "Giá trị cốt lõi",
      d: "Minh bạch. Kỹ thuật lõi. Cam kết dài hạn. Không thoả hiệp.",
    },
  },
  timeline: {
    label: "— LỊCH SỬ · 2012 → NAY",
    heading: "Hành trình 14 năm.",
    items: {
      "2012": { t: "Thành lập", d: "HBH Vietnam Investment JSC ra đời tại Hà Nội." },
      "2015": { t: "Đại lý ủy quyền", d: "Trở thành đại lý chính thức của Trane và Carrier." },
      "2018": { t: "Bước vào Quốc phòng", d: "Trúng thầu dự án Tổng cục Hậu cần." },
      "2020": { t: "Y tế trọng điểm", d: "Bàn giao hệ Chiller 2.400 RT tại Bệnh viện 103." },
      "2022": {
        t: "Mở rộng miền Trung",
        d: "Loạt dự án khách sạn – resort tại Đà Nẵng, Quảng Ninh.",
      },
      "2026": { t: "35+ dự án", d: "Cột mốc 35+ công trình đã bàn giao, giá trị 655 tỷ VNĐ." },
    },
  },
  org: {
    label: "— SƠ ĐỒ TỔ CHỨC",
    heading: "Bộ máy vận hành.",
    desc: "Cơ cấu tinh gọn — mỗi hệ thống kỹ thuật có một đội chuyên trách chịu trách nhiệm từ thi công đến bảo trì.",
    boxes: {
      board: "Hội đồng Quản trị",
      director: "Giám đốc",
      deputyTech: "Phó Giám đốc phụ trách Kỹ thuật",
      deputyProject: "Phó Giám đốc phụ trách Dự án",
      deptProject: "Phòng Dự án",
      deptTech: "Phòng Kỹ thuật",
      deptAccounting: "Phòng Kế toán – Tổng hợp",
      teamBMS: "Đội BMS",
      teamRefrigeration: "Đội Nhiệt lạnh",
      teamHotWater: "Đội Nước nóng",
    },
  },
  explore: {
    label: "→ KHÁM PHÁ",
    continue: "TIẾP TỤC →",
    fields: { d: "6 nhóm giải pháp M&E · HVAC · BMS" },
    services: { d: "Thi công · Bảo trì · Tư vấn · Phân phối" },
  },
};

const en: typeof vi = {
  meta: {
    title: "About — HBH Vietnam",
    description:
      "The HBH Vietnam story — over a decade building M&E solutions for landmark projects.",
  },
  hero: {
    eyebrow: "ABOUT · 001",
    title1: "Precise",
    title2: "engineering.",
    title3: "Long-term",
    title4: "commitment.",
    subtitle:
      "For over a decade, HBH Vietnam has partnered on the most demanding projects — defense hospitals, five-star hotels and industrial plants.",
  },
  chairman: {
    imgAlt: "Chairman of HBH Vietnam",
    label: "— MESSAGE · CHAIRMAN",
    quote1: "At HBH, every system we deliver is a",
    quoteHighlight: "20-year operating commitment",
    quote2: ". We never cut corners on engineering, and never compromise on quality.",
    name: "Mr. Nguyen Van Hai",
    role: "CHAIRMAN OF THE BOARD · HBH VIETNAM",
  },
  philosophy: {
    label: "— VISION · MISSION · VALUES",
    vision: {
      t: "Vision",
      d: "To become the most trusted M&E contractor in Northern Vietnam — the one chosen for the toughest projects.",
    },
    mission: {
      t: "Mission",
      d: "To deliver comfort and operational safety for end users, through precise engineering.",
    },
    values: {
      t: "Core values",
      d: "Transparency. Core engineering. Long-term commitment. No compromise.",
    },
  },
  timeline: {
    label: "— HISTORY · 2012 → NOW",
    heading: "A 14-year journey.",
    items: {
      "2012": { t: "Established", d: "HBH Vietnam Investment JSC is founded in Hanoi." },
      "2015": { t: "Authorized dealer", d: "Becomes an official dealer for Trane and Carrier." },
      "2018": { t: "Entering Defense", d: "Wins the General Logistics Department project." },
      "2020": { t: "Key healthcare", d: "Delivers a 2,400 RT Chiller system at Hospital 103." },
      "2022": {
        t: "Central region expansion",
        d: "A series of hotel – resort projects in Da Nang and Quang Ninh.",
      },
      "2026": {
        t: "35+ projects",
        d: "A milestone of 35+ delivered projects, valued at VND 655 billion.",
      },
    },
  },
  org: {
    label: "— ORGANIZATIONAL CHART",
    heading: "Our operating structure.",
    desc: "A lean structure — each engineering system has a dedicated team responsible from installation through maintenance.",
    boxes: {
      board: "Board of Directors",
      director: "Director",
      deputyTech: "Deputy Director, Engineering",
      deputyProject: "Deputy Director, Projects",
      deptProject: "Projects Department",
      deptTech: "Engineering Department",
      deptAccounting: "Accounting & Administration",
      teamBMS: "BMS Team",
      teamRefrigeration: "Refrigeration Team",
      teamHotWater: "Hot Water Team",
    },
  },
  explore: {
    label: "→ EXPLORE",
    continue: "CONTINUE →",
    fields: { d: "6 solution groups · M&E · HVAC · BMS" },
    services: { d: "Installation · Maintenance · Consulting · Distribution" },
  },
};

export const about = { vi, en };
