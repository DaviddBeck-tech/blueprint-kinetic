// Locale module cho trang "news". Shape: { vi, en } với en: typeof vi.
const vi = {
  hero: {
    eyebrow: "TIN TỨC · EDITORIAL",
    index: "ARCHIVE",
    titleLine1: "Ghi chép",
    titleEmphasis: "kỹ thuật",
    titleLine2: " & dự án.",
    subtitle: "Cập nhật dự án, tin công ty và những bài viết kỹ thuật từ đội ngũ HBH.",
  },
  categories: {
    "Tất cả": "Tất cả",
    "Tin công ty": "Tin công ty",
    "Dự án": "Dự án",
    "Kiến thức kỹ thuật": "Kiến thức kỹ thuật",
  },
  featured: {
    badge: "NỔI BẬT",
  },
  sidebar: {
    searchLabel: "TÌM KIẾM",
    searchPlaceholder: "Nhập từ khoá...",
    categoriesHeading: "DANH MỤC",
    newsletterBadge: "NHẬN BẢN TIN",
    newsletterTitle: "Kiến thức M&E hàng tháng.",
    subscribe: "Đăng ký",
  },
  detail: {
    notFoundTitle: "Không tìm thấy bài viết",
    backToList: "Về danh sách",
    relatedBadge: "BÀI VIẾT LIÊN QUAN",
    body: {
      p1: "HBH Vietnam tiếp tục củng cố vị thế của mình trong lĩnh vực M&E, HVAC và BMS với những cột mốc quan trọng trong quý vừa qua. Đội ngũ kỹ sư của chúng tôi đã hoàn thành khảo sát và triển khai giai đoạn đầu của gói thầu trị giá hàng trăm tỷ đồng.",
      p2: "Với hơn 10 năm kinh nghiệm và 35+ dự án đã bàn giao, HBH cam kết mang lại giải pháp trọn gói — từ tư vấn thiết kế, cung cấp thiết bị chính hãng đến thi công lắp đặt và bảo trì dài hạn. Đây là những giá trị mà khách hàng như Sun Group, FLC, TNR và Bộ Quốc phòng đã tin tưởng lựa chọn.",
      h2: "Định hướng phát triển",
      p3: "Trong năm 2026, HBH sẽ tiếp tục mở rộng danh mục thiết bị chính hãng, tăng cường đội ngũ kỹ sư chuyên sâu và triển khai các dự án BMS/EMS quy mô lớn cho khối bệnh viện và khách sạn 5 sao.",
    },
  },
};

const en: typeof vi = {
  hero: {
    eyebrow: "NEWS · EDITORIAL",
    index: "ARCHIVE",
    titleLine1: "Field notes on",
    titleEmphasis: "engineering",
    titleLine2: " & projects.",
    subtitle: "Project updates, company news and technical articles from the HBH team.",
  },
  categories: {
    "Tất cả": "All",
    "Tin công ty": "Company news",
    "Dự án": "Projects",
    "Kiến thức kỹ thuật": "Technical knowledge",
  },
  featured: {
    badge: "FEATURED",
  },
  sidebar: {
    searchLabel: "SEARCH",
    searchPlaceholder: "Enter a keyword...",
    categoriesHeading: "CATEGORIES",
    newsletterBadge: "NEWSLETTER",
    newsletterTitle: "Monthly M&E knowledge.",
    subscribe: "Subscribe",
  },
  detail: {
    notFoundTitle: "Article not found",
    backToList: "Back to list",
    relatedBadge: "RELATED POSTS",
    body: {
      p1: "HBH Vietnam continues to strengthen its position in the M&E, HVAC and BMS sectors with major milestones over the past quarter. Our engineering team has completed the survey and rolled out the first phase of a contract package worth hundreds of billions of VND.",
      p2: "With over 10 years of experience and 35+ delivered projects, HBH is committed to delivering turnkey solutions — from design consulting and the supply of genuine equipment to installation and long-term maintenance. These are the values that clients such as Sun Group, FLC, TNR and the Ministry of Defense have trusted and chosen.",
      h2: "Development direction",
      p3: "In 2026, HBH will continue to expand its portfolio of genuine equipment, reinforce its team of specialized engineers, and deploy large-scale BMS/EMS projects for hospitals and 5-star hotels.",
    },
  },
};

export const news = { vi, en };
