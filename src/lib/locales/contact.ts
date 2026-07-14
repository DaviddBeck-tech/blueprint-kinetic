// Locale module cho trang "contact". Shape: { vi, en } với en: typeof vi.
const vi = {
  meta: {
    title: "Liên hệ — HBH Vietnam",
    description:
      "Nhận tư vấn miễn phí — HBH Vietnam sẽ liên hệ trong vòng 24 giờ. 234 Hồ Tùng Mậu, Bắc Từ Liêm, Hà Nội.",
    ogDescription: "Nhận tư vấn miễn phí — HBH Vietnam sẽ liên hệ trong vòng 24 giờ.",
  },
  hero: {
    eyebrow: "LIÊN HỆ · 24H",
    titleStart: "Bắt đầu",
    titleAccent: "dự án",
    titleEnd: "của bạn.",
    subtitle: "Đội kỹ sư HBH sẽ liên hệ trong vòng 24 giờ với phương án khảo sát miễn phí.",
  },
  form: {
    label: "— FORM · TƯ VẤN",
    systemPlaceholder: "-- Chọn hệ thống --",
    verify: "Xác minh *",
    submit: "Gửi yêu cầu tư vấn",
    consent: "Bằng việc gửi, bạn đồng ý HBH sử dụng thông tin để phản hồi yêu cầu.",
    success: "Đã gửi yêu cầu — HBH sẽ liên hệ trong vòng 24h",
  },
  formFields: {
    name: "Họ và tên *",
    phone: "Số điện thoại *",
    email: "Email *",
    project: "Tên / loại công trình *",
    system: "Hệ thống quan tâm *",
    message: "Nội dung *",
  },
  systems: {
    vrf: "VRF trung tâm",
    chiller: "Chiller",
    hotWater: "Nước nóng trung tâm",
    bms: "BMS/ACS/EMS",
    lighting: "Chiếu sáng thông minh",
    other: "Khác",
  },
  errors: {
    name: "Vui lòng nhập họ tên",
    phone: "Số điện thoại không hợp lệ",
    email: "Email không hợp lệ",
    project: "Vui lòng nhập tên công trình",
    system: "Chọn hệ thống",
    message: "Nội dung tối thiểu 10 ký tự",
    captcha: "Vui lòng xác nhận bạn không phải robot",
  },
  info: {
    heading: "— TRỤ SỞ HÀ NỘI",
    address: "234 Hồ Tùng Mậu, Bắc Từ Liêm, Hà Nội, Vietnam",
    hours: "T2 – T7 · 08:00 – 17:30",
  },
  faq: {
    heading: "Câu hỏi thường gặp.",
    items: [
      {
        q: "HBH có nhận thi công ngoài Hà Nội không?",
        a: "Có. Chúng tôi đã triển khai dự án tại Thanh Hoá, Quảng Ninh, Đà Nẵng, Bắc Ninh, Hải Phòng và nhiều tỉnh thành khác.",
      },
      {
        q: "Thời gian bảo hành thiết bị là bao lâu?",
        a: "Bảo hành chính hãng tối thiểu 24 tháng. Riêng chiller và VRF có gói bảo hành mở rộng đến 60 tháng.",
      },
      {
        q: "HBH có ký hợp đồng bảo trì dài hạn không?",
        a: "Có. Chúng tôi có gói bảo trì định kỳ 6-12 tháng và hợp đồng vận hành 3-10 năm cho công trình lớn.",
      },
      {
        q: "Thời gian phản hồi báo giá?",
        a: "Trong vòng 48 giờ làm việc kể từ khi nhận đủ hồ sơ khảo sát ban đầu.",
      },
    ],
  },
};

const en: typeof vi = {
  meta: {
    title: "Contact — HBH Vietnam",
    description:
      "Get a free consultation — HBH Vietnam will respond within 24 hours. 234 Ho Tung Mau, Bac Tu Liem, Hanoi.",
    ogDescription: "Get a free consultation — HBH Vietnam will respond within 24 hours.",
  },
  hero: {
    eyebrow: "CONTACT · 24H",
    titleStart: "Start",
    titleAccent: "your project.",
    titleEnd: "",
    subtitle:
      "HBH's engineering team will contact you within 24 hours with a free survey proposal.",
  },
  form: {
    label: "— FORM · CONSULTATION",
    systemPlaceholder: "-- Select a system --",
    verify: "Verification *",
    submit: "Send consultation request",
    consent: "By submitting, you agree to let HBH use your information to respond to your request.",
    success: "Request sent — HBH will contact you within 24h",
  },
  formFields: {
    name: "Full name *",
    phone: "Phone number *",
    email: "Email *",
    project: "Project name / type *",
    system: "System of interest *",
    message: "Message *",
  },
  systems: {
    vrf: "Central VRF",
    chiller: "Chiller",
    hotWater: "Central hot water",
    bms: "BMS/ACS/EMS",
    lighting: "Smart lighting",
    other: "Other",
  },
  errors: {
    name: "Please enter your full name",
    phone: "Invalid phone number",
    email: "Invalid email",
    project: "Please enter the project name",
    system: "Select a system",
    message: "Message must be at least 10 characters",
    captcha: "Please confirm you are not a robot",
  },
  info: {
    heading: "— HANOI HEADQUARTERS",
    address: "234 Ho Tung Mau, Bac Tu Liem, Hanoi, Vietnam",
    hours: "Mon – Sat · 08:00 – 17:30",
  },
  faq: {
    heading: "Frequently asked questions.",
    items: [
      {
        q: "Does HBH take on projects outside Hanoi?",
        a: "Yes. We have delivered projects in Thanh Hoa, Quang Ninh, Da Nang, Bac Ninh, Hai Phong and many other provinces.",
      },
      {
        q: "How long is the equipment warranty?",
        a: "A genuine manufacturer warranty of at least 24 months. Chillers and VRF systems have an extended warranty of up to 60 months.",
      },
      {
        q: "Does HBH sign long-term maintenance contracts?",
        a: "Yes. We offer periodic maintenance packages of 6-12 months and operation contracts of 3-10 years for large projects.",
      },
      {
        q: "How long does a quote take?",
        a: "Within 48 working hours of receiving the complete initial survey documents.",
      },
    ],
  },
};

export const contact = { vi, en };
