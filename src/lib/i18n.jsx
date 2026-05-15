import React, { createContext, useContext, useState } from 'react';

const translations = {
  uz: {
    nav: {
      home: "Bosh sahifa",
      about: "Biz haqimizda",
      portfolio: "Loyihalar",
      process: "Jarayon",
      team: "Jamoa",
      faq: "Savollar",
      contact: "Bog'lanish",
    },
    hero: {
      badge: "Ish jarayonlaringizni optimallashtiring",
      title1: "Innovatsiyalar bilan",
      title2: "biznesingizni yuksaltiring",
      desc: "Axiora — g'oyalarni jonli biznes mahsulotlarga aylantiruvchi startup studio. Biz texnologiya, strategiya va kreativlikni birlashtirib, global miqyosdagi yechimlar yaratamiz.",
      cta1: "Bog'lanish",
      cta2: "Batafsil ma'lumot",
      videoPlaceholder: "Video tez orada",
    },
    partners: {
      title: "HAMKORLARIMIZ",
      subtitle: "Biz bilan birga o'sadigan kompaniyalar",
    },
    results: {
      label: "NATIJALAR",
      title: "Samarali yechimlar bilan tezkor o'sish",
      stats: [
        { value: "25+", label: "Ishga tushirilgan loyihalar" },
        { value: "10+", label: "Faol biznes hamkorlar" },
        { value: "300%", label: "O'rtacha o'sish tezligi" },
        { value: "5+", label: "Xalqaro bozorlar" },
      ],
    },
    about: {
      label: "BIZ HAQIMIZDA",
      title: "G'oyalarni real biznesga aylantiramiz",
      desc: "Axiora — bu oddiy IT kompaniya emas. Biz startup studio sifatida g'oyani mahsulotga, mahsulotni esa muvaffaqiyatli biznesga aylantiramiz. Har bir loyihada biz texnologiya, strategiya va kreativlikni birlashtirib, xalqaro miqyosdagi yechimlar yaratamiz.",
      slogan: "Biz faqat ishlamaymiz — biz tizim quramiz.",
      cards: [
        { title: "Innovatsion mahsulotlar yaratish", desc: "Eng so'nggi texnologiyalar asosida noyob mahsulotlar ishlab chiqamiz" },
        { title: "Startuplarni xalqaro miqyosga olib chiqish", desc: "Mahalliy g'oyalarni global bozorga tayyorlaymiz" },
        { title: "Raqamli ekotizimlar qurish", desc: "O'zaro bog'liq platformalar va xizmatlar ekotizimini yaratamiz" },
        { title: "Global bozorlarda mavjudlik", desc: "Markaziy Osiyo va undan tashqari bozorlarda faol ishlaymiz" },
      ],
    },
    portfolio: {
      label: "PORTFOLIO",
      title: "Muvaffaqiyatli loyihalarimiz",
      problem: "Muammo",
      solution: "Yechim",
      result: "Natija",
      projects: [
        { cat: "SaaS", name: "Bulutli SaaS Platforma", problem: "Qo'lda bajarilgan jarayonlar", solution: "Avtomatlashtirilgan ish oqimi", result: "+220% samaradorlik" },
        { cat: "EdTech", name: "Onlayn Ta'lim Markazi", problem: "Past faollik darajasi", solution: "O'yinlashtirilgan tajriba", result: "60K+ faol o'quvchi" },
        { cat: "E-commerce", name: "Marketplace Tizimi", problem: "Tarqoq sotuvchilar", solution: "Yagona platforma", result: "$2M+ aylanma" },
        { cat: "AI", name: "AI Qaror Mexanizmi", problem: "Sekin tahlil", solution: "Mashina o'rganishi", result: "10x tezroq insight" },
        { cat: "CRM", name: "Korporativ CRM", problem: "Ma'lumot bo'linishi", solution: "Yagona CRM tizim", result: "+45% mijoz ushlab qolish" },
        { cat: "ERP", name: "ERP Yechim", problem: "Qo'lda boshqaruv", solution: "Uchidan-uchiga avtomatlashtirish", result: "30% xarajat tejash" },
      ],
    },
    metrics: {
      label: "RAQAMLARDA KUCHIMIZ",
      items: [
        { value: "500K+", label: "Foydalanuvchilar qamrovi" },
        { value: "1M+", label: "Oylik API so'rovlar" },
        { value: "95%", label: "Mijoz qoniqishi" },
        { value: "12+", label: "Muvaffaqiyatli scale" },
      ],
    },
    team: {
      label: "JAMOA",
      title: "Tajribali mutaxassislar",
      detail: "Batafsil",
      members: [
        { name: "Ismoil Nishonov", role: "COO", desc: "Operatsion boshqaruv va strategiya" },
        { name: "Abdulaziz Mansurov", role: "CPO", desc: "Mahsulot va foydalanuvchi tajribasi" },
        { name: "Davron Uralov", role: "CCO", desc: "Kreativ yo'nalish va brending" },
        { name: "Zafar Ibragimov", role: "CTO", desc: "Texnik arxitektura" },
        { name: "Faridun Bayenov", role: "BDM", desc: "Biznes rivojlantirish" },
        { name: "Shaxzod Negmatov", role: "HRD", desc: "Jamoa va kadrlar" },
        { name: "Ahadjon Muxamedjonov", role: "CMO", desc: "Marketing va o'sish" },
      ],
    },
    testimonials: {
      label: "MIJOZ FIKRLARI",
      title: "Hamkorlar biz haqimizda",
      reviews: [
        { name: "Otabek Muhammadiyev", role: "Hamkor kompaniya rahbari", text: "Axiora bilan ishlash bizga butunlay yangi imkoniyatlar ochdi. Ularning professional yondashuvi va innovatsion yechimlari bizning biznesimizni keyingi bosqichga olib chiqdi." },
        { name: "Alixon Rahmatullayev", role: "Startup asoschisi", text: "G'oyamni haqiqiy mahsulotga aylantirish jarayonida Axiora jamoasi har bir bosqichda yordam berdi. Professional, tezkor va ishonchli hamkor." },
      ],
    },
    process: {
      label: "JARAYON",
      title: "Biz qanday ishlaymiz",
      steps: [
        { num: "01", title: "Tahlil", desc: "Biznes va bozorni chuqur o'rganish" },
        { num: "02", title: "Strategiya", desc: "Yechim va aniq yo'l xaritasi" },
        { num: "03", title: "Dizayn va Dev", desc: "Mahsulotni jonlantirish" },
        { num: "04", title: "Ishga tushirish", desc: "Bozorga chiqarish" },
        { num: "05", title: "O'sish", desc: "Kengaytirish va optimallashtirish" },
      ],
    },
    location: {
      label: "JOYLASHUV",
      title: "Toshkent, O'zbekiston",
      desc: "Markaziy Osiyoning startup hub markazida joylashgan Axiora HQ",
      coords: "41.31° N · 69.24° E",
      office: "Axiora HQ",
    },
    faq: {
      label: "FAQ",
      title: "Tez-tez beriladigan savollar",
      items: [
        { q: "Axiora nima bilan shug'ullanadi?", a: "Axiora — startup studio bo'lib, innovatsion mahsulotlar yaratish, startuplarni xalqaro miqyosga olib chiqish va raqamli ekotizimlar qurishga ixtisoslashgan." },
        { q: "Qanday xizmatlar taklif qilasiz?", a: "Strategiya, mahsulot dizayni, dasturiy ta'minot ishlab chiqish, brending, marketing va o'sish — to'liq tsikl xizmatlarini taklif qilamiz." },
        { q: "Hamkorlik qilish uchun nima kerak?", a: "G'oya yoki hal etilishi kerak bo'lgan muammoni aytish yetarli. Qolganini birga rejalashtiramiz." },
        { q: "Loyihani boshlash qancha vaqt oladi?", a: "Kelishuvdan so'ng 1–2 hafta ichida ishni boshlab yuboramiz." },
        { q: "Narxlar qanday shakllanadi?", a: "Loyiha hajmi, muddati va qo'shilgan qiymatga qarab individual baholanadi." },
      ],
    },
    contact: {
      label: "BOG'LANISH",
      title: "Loyihangizni birga boshlaymiz",
      name: "Ism va familiya",
      phone: "Telefon raqami",
      company: "Kompaniya nomi",
      message: "Xabar",
      submit: "Xabarni yuborish",
      phone_label: "Telefon",
      email_label: "Elektron pochta",
      location_label: "Joylashuv",
      strategic: "Strategik hamkorlik bo'limi",
      success: "Xabaringiz muvaffaqiyatli yuborildi!",
    },
    footer: {
      rights: "Barcha huquqlar himoyalangan",
    },
  },
  en: {
    nav: {
      home: "Home",
      about: "About Us",
      portfolio: "Projects",
      process: "Process",
      team: "Team",
      faq: "FAQ",
      contact: "Contact",
    },
    hero: {
      badge: "Optimize your workflows",
      title1: "Elevate your business",
      title2: "with innovation",
      desc: "Axiora is a startup studio that transforms ideas into living business products. We combine technology, strategy, and creativity to build solutions at a global scale.",
      cta1: "Contact Us",
      cta2: "Learn More",
      videoPlaceholder: "Video coming soon",
    },
    partners: {
      title: "OUR PARTNERS",
      subtitle: "Companies growing alongside us",
    },
    results: {
      label: "RESULTS",
      title: "Rapid growth with effective solutions",
      stats: [
        { value: "25+", label: "Launched projects" },
        { value: "10+", label: "Active business partners" },
        { value: "300%", label: "Average growth rate" },
        { value: "5+", label: "International markets" },
      ],
    },
    about: {
      label: "ABOUT US",
      title: "We turn ideas into real business",
      desc: "Axiora is not just an IT company. As a startup studio, we transform ideas into products, and products into successful businesses. In every project, we combine technology, strategy, and creativity to create solutions at an international scale.",
      slogan: "We don't just work — we build systems.",
      cards: [
        { title: "Creating innovative products", desc: "We develop unique products based on cutting-edge technologies" },
        { title: "Scaling startups internationally", desc: "We prepare local ideas for the global market" },
        { title: "Building digital ecosystems", desc: "We create interconnected platforms and service ecosystems" },
        { title: "Presence in global markets", desc: "We actively operate in Central Asia and beyond" },
      ],
    },
    portfolio: {
      label: "PORTFOLIO",
      title: "Our successful projects",
      problem: "Problem",
      solution: "Solution",
      result: "Result",
      projects: [
        { cat: "SaaS", name: "Cloud SaaS Platform", problem: "Manual processes", solution: "Automated workflow", result: "+220% efficiency" },
        { cat: "EdTech", name: "Online Learning Center", problem: "Low engagement rate", solution: "Gamified experience", result: "60K+ active learners" },
        { cat: "E-commerce", name: "Marketplace System", problem: "Scattered sellers", solution: "Unified platform", result: "$2M+ turnover" },
        { cat: "AI", name: "AI Decision Engine", problem: "Slow analysis", solution: "Machine learning", result: "10x faster insights" },
        { cat: "CRM", name: "Enterprise CRM", problem: "Data fragmentation", solution: "Unified CRM system", result: "+45% client retention" },
        { cat: "ERP", name: "ERP Solution", problem: "Manual management", solution: "End-to-end automation", result: "30% cost savings" },
      ],
    },
    metrics: {
      label: "OUR STRENGTH IN NUMBERS",
      items: [
        { value: "500K+", label: "User coverage" },
        { value: "1M+", label: "Monthly API requests" },
        { value: "95%", label: "Client satisfaction" },
        { value: "12+", label: "Successful scales" },
      ],
    },
    team: {
      label: "TEAM",
      title: "Experienced specialists",
      detail: "Details",
      members: [
        { name: "Ismoil Nishonov", role: "COO", desc: "Operations management & strategy" },
        { name: "Abdulaziz Mansurov", role: "CPO", desc: "Product & user experience" },
        { name: "Davron Uralov", role: "CCO", desc: "Creative direction & branding" },
        { name: "Zafar Ibragimov", role: "CTO", desc: "Technical architecture" },
        { name: "Faridun Bayenov", role: "BDM", desc: "Business development" },
        { name: "Shaxzod Negmatov", role: "HRD", desc: "Team & HR" },
        { name: "Ahadjon Muxamedjonov", role: "CMO", desc: "Marketing & growth" },
      ],
    },
    testimonials: {
      label: "TESTIMONIALS",
      title: "What our partners say",
      reviews: [
        { name: "Otabek Muhammadiyev", role: "Partner company executive", text: "Working with Axiora opened entirely new opportunities for us. Their professional approach and innovative solutions elevated our business to the next level." },
        { name: "Alixon Rahmatullayev", role: "Startup founder", text: "Axiora's team supported us at every stage of turning our idea into a real product. Professional, fast, and reliable partner." },
      ],
    },
    process: {
      label: "PROCESS",
      title: "How we work",
      steps: [
        { num: "01", title: "Analysis", desc: "Deep research of business and market" },
        { num: "02", title: "Strategy", desc: "Solution and clear roadmap" },
        { num: "03", title: "Design & Dev", desc: "Bringing the product to life" },
        { num: "04", title: "Launch", desc: "Going to market" },
        { num: "05", title: "Growth", desc: "Scaling and optimization" },
      ],
    },
    location: {
      label: "LOCATION",
      title: "Tashkent, Uzbekistan",
      desc: "Axiora HQ, located in the startup hub of Central Asia",
      coords: "41.31° N · 69.24° E",
      office: "Axiora HQ",
    },
    faq: {
      label: "FAQ",
      title: "Frequently Asked Questions",
      items: [
        { q: "What does Axiora do?", a: "Axiora is a startup studio specializing in creating innovative products, scaling startups internationally, and building digital ecosystems." },
        { q: "What services do you offer?", a: "We offer full-cycle services: strategy, product design, software development, branding, marketing, and growth." },
        { q: "What do I need to start a partnership?", a: "Just share your idea or the problem you need to solve. We'll plan the rest together." },
        { q: "How long does it take to start a project?", a: "We begin work within 1–2 weeks after agreement." },
        { q: "How is pricing structured?", a: "Pricing is determined individually based on project scope, timeline, and added value." },
      ],
    },
    contact: {
      label: "CONTACT",
      title: "Let's start your project together",
      name: "Full name",
      phone: "Phone number",
      company: "Company name",
      message: "Message",
      submit: "Send Message",
      phone_label: "Phone",
      email_label: "Email",
      location_label: "Location",
      strategic: "Strategic Partnership Division",
      success: "Your message has been sent successfully!",
    },
    footer: {
      rights: "All rights reserved",
    },
  },
};

const I18nContext = createContext();

export function I18nProvider({ children }) {
  const [lang, setLang] = useState('uz');
  const t = translations[lang];
  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}