import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const vi = {
  nav: {
    about: "Giới thiệu",
    fields: "Lĩnh vực kinh doanh",
    services: "Dịch vụ",
    projects: "Dự án",
    partners: "Đối tác",
    news: "Tin tức",
    contact: "Liên hệ",
    cta: "Liên hệ",
  },
  common: {
    viewAll: "Xem tất cả",
    viewProjects: "Xem Dự Án Tiêu Biểu",
    freeConsult: "Nhận Tư Vấn Miễn Phí",
    quote: "Yêu cầu báo giá",
    readMore: "Đọc tiếp",
    year: "Năm",
    system: "Hệ thống",
    location: "Địa điểm",
    client: "Chủ đầu tư",
  },
};

const en: typeof vi = {
  nav: {
    about: "About",
    fields: "Business Fields",
    services: "Services",
    projects: "Projects",
    partners: "Partners",
    news: "News",
    contact: "Contact",
    cta: "Contact",
  },
  common: {
    viewAll: "View all",
    viewProjects: "See Featured Projects",
    freeConsult: "Free Consultation",
    quote: "Request Quote",
    readMore: "Read more",
    year: "Year",
    system: "System",
    location: "Location",
    client: "Client",
  },
};

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources: { vi: { translation: vi }, en: { translation: en } },
    lng: typeof window !== "undefined" ? localStorage.getItem("hbh-lang") || "vi" : "vi",
    fallbackLng: "vi",
    interpolation: { escapeValue: false },
  });
}

export default i18n;
