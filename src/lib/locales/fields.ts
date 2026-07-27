// Locale module cho trang "fields". Shape: { vi, en } với en: typeof vi.
const vi = {
  meta: {
    title: "Lĩnh vực kinh doanh — HBH Vietnam",
    description:
      "6 nhóm giải pháp M&E, HVAC, BMS của HBH — từ điều hoà cục bộ đến chiller trung tâm và hệ điều khiển toà nhà.",
  },
  hero: {
    eyebrow: "LĨNH VỰC · 06 NHÓM",
    titlePre: "Sáu",
    titleEm: "kỹ thuật lõi.",
    titleAfter: "Một đối tác duy nhất.",
    subtitle: "Từ điều hoà cục bộ cho căn hộ đến chiller trung tâm và BMS cho toà nhà thông minh.",
  },
  extended: {
    label: "— NHÓM MỞ RỘNG",
    meInstall: {
      title: "M&E Installation",
      desc: "Thi công cơ điện toàn diện: điện, nước, HVAC, PCCC — đảm bảo tiến độ tổng thầu.",
    },
    bms: {
      title: "BMS / ACS / EMS",
      desc: "Hệ điều khiển toà nhà, kiểm soát truy cập, giám sát năng lượng — nền tảng cho công trình thông minh.",
    },
  },
  process: {
    label: "— QUY TRÌNH · 05 BƯỚC",
    heading: "Từ khảo sát đến bàn giao.",
    cta: "Đặt lịch tư vấn",
    steps: {
      s1: { t: "Khảo sát", d: "Đo đạc tại hiện trường, phân tích tải lạnh, điện, thông gió." },
      s2: { t: "Thiết kế", d: "Bản vẽ shopdrawing, tính toán tối ưu chi phí đầu tư và vận hành." },
      s3: { t: "Cung cấp", d: "Thiết bị chính hãng, CO/CQ đầy đủ, logistics tại công trường." },
      s4: { t: "Lắp đặt", d: "Đội thi công chuyên trách, tiến độ cam kết, an toàn tuyệt đối." },
      s5: {
        t: "Bàn giao & bảo trì",
        d: "Vận hành thử, đào tạo, bảo hành 24 tháng, bảo trì dài hạn.",
      },
    },
  },
};

const en: typeof vi = {
  meta: {
    title: "Business Fields — HBH Vietnam",
    description:
      "HBH's 6 M&E, HVAC and BMS solution groups — from split air conditioning to central chillers and building management systems.",
  },
  hero: {
    eyebrow: "FIELDS · 06 GROUPS",
    titlePre: "Six",
    titleEm: "core disciplines.",
    titleAfter: "One single partner.",
    subtitle:
      "From local split air conditioning for apartments to central chillers and BMS for smart buildings.",
  },
  extended: {
    label: "— EXTENDED GROUP",
    meInstall: {
      title: "Complete M&E system installation",
      desc: "Comprehensive M&E installation — electrical, plumbing, HVAC and fire protection — securing the general-contractor schedule.",
    },
    bms: {
      title: "Smart building management BMS / ACS / EMS",
      desc: "Building management, access control and energy monitoring — the foundation for smart buildings.",
    },
  },
  process: {
    label: "— PROCESS · 05 STEPS",
    heading: "From survey to handover.",
    cta: "Book a consultation",
    steps: {
      s1: {
        t: "Survey",
        d: "On-site measurement and analysis of cooling, electrical and ventilation loads.",
      },
      s2: {
        t: "Design",
        d: "Shop drawings and calculations that optimize both capital and operating costs.",
      },
      s3: {
        t: "Supply",
        d: "Genuine equipment with full CO/CQ documentation and on-site logistics.",
      },
      s4: {
        t: "Installation",
        d: "Dedicated installation teams, a committed schedule and absolute safety.",
      },
      s5: {
        t: "Handover & maintenance",
        d: "Commissioning, training, a 24-month warranty and long-term maintenance.",
      },
    },
  },
};

export const fields = { vi, en };
