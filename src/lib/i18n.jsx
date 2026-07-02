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
      title1: "Kuchli jamoa bilan",
      title2Line1: "Biznesingizni",
      title2Line2: "yuksaltiring",
      desc: "Axiora — g'oyalarni jonli biznesga aylantiruvchi studio. Biz texnologiya, strategiya va kreativlikni birlashtirib, global miqyosdagi yechimlar yaratamiz.",
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
      title: "Bizning eng yaxshi natijalarimiz ",
      stats: [
        { value: "25+", label: "Ishga tushirilgan loyihalar" },
        { value: "10+", label: "Faol biznes hamkorlar" },
        { value: "300%", label: "O'rtacha o'sish tezligi" },
        { value: "5+", label: "Xalqaro bozorlar" },
      ],
    },
    about: {
      label: "BIZ HAQIMIZDA",
      title: "Katta biznes qurish uchun bizni tanlang",
      desc: "Axiora — bu oddiy IT kompaniya emas. Biz startup studio sifatida g'oyani mahsulotga, mahsulotni esa muvaffaqiyatli biznesga aylantiramiz. Har bir loyihada biz texnologiya, strategiya va kreativlikni birlashtirib, xalqaro miqyosdagi yechimlar yaratamiz.",
      slogan: "Ortiqcha nazariyasiz - samarali natija.",
      cards: [
        { title: "Biznesingizni O'zbekistonga olib kelamiz", desc: "Istalgan biznesni O'zbekistonda ishga tushiramiz va mahalliy bozorda  muvofaqiyatli rivojlantiramiz" },
        { title: "O'zbekistondan xalqaro miqyosga olib chiqamiz", desc: "Mahalliy bozorda muvaffaqiyat qozongan biznesingizni xalqaro bozorga olib chiqamiz" },
        { title: "0 dan biznes qurib beramiz", desc: "G'oya yoki Kapitalingiz bo'lsa bas - biz siz uchun biznesni 0 dan yaratib, ishga tushirib  beramiz" },
        { title: "Har qanday biznesga yordam beramiz", desc: "Xizmat, ishlab chiqarish, IT, marketing, o'sish va boshqa hududlarda bizning jamoa sizga yordam beradi" },
      ],
    },
    // portfolio: {
    //   label: "PORTFOLIO",
    //   title: "Muvaffaqiyatli loyihalarimiz",
    //   problem: "Muammo",
    //   solution: "Yechim",
    //   result: "Natija",
    //   projects: [
    //     { cat: "SaaS", name: "Bulutli SaaS Platforma", problem: "Qo'lda bajarilgan jarayonlar", solution: "Avtomatlashtirilgan ish oqimi", result: "+220% samaradorlik" },
    //     { cat: "EdTech", name: "Onlayn Ta'lim Markazi", problem: "Past faollik darajasi", solution: "O'yinlashtirilgan tajriba", result: "60K+ faol o'quvchi" },
    //     { cat: "E-commerce", name: "Marketplace Tizimi", problem: "Tarqoq sotuvchilar", solution: "Yagona platforma", result: "$2M+ aylanma" },
    //     { cat: "AI", name: "AI Qaror Mexanizmi", problem: "Sekin tahlil", solution: "Mashina o'rganishi", result: "10x tezroq insight" },
    //     { cat: "CRM", name: "Korporativ CRM", problem: "Ma'lumot bo'linishi", solution: "Yagona CRM tizim", result: "+45% mijoz ushlab qolish" },
    //     { cat: "ERP", name: "ERP Yechim", problem: "Qo'lda boshqaruv", solution: "Uchidan-uchiga avtomatlashtirish", result: "30% xarajat tejash" },
    //   ],
    // },
    metrics: {
      label: "BIZNING NATIJALARIMIZ",
      items: [
        { value: "25+", label: "Ishga tushirilgan loyihalar" },
        { value: "10+", label: "Faal biznes hamkorlar" },
        { value: "300%", label: "O'rtacha o'sish tezligi" },
        { value: "5+", label: "Xalqaro bozorlar" },
      ],
    },
    team: {
      label: "BIZNING JAMOA",
      title: "Jamoamiz Leaderlari",
      detail: "Batafsil",
      members: [
        { name: "Ismoil Nishonov", role: "COO", desc: "Operatsion boshqaruv va strategiya" },
        { name: "Abdulaziz Mansurov", role: "CPO", desc: "Mahsulot va foydalanuvchi tajribasi" },
        { name: "Davron Uralov", role: "CCO", desc: "Kreativ yo'nalish va brending" },
        { name: "Zafar Ibragimov", role: "CTO", desc: "Texnik arxitektura" },
        { name: "Faridun Bayonov", role: "BDM", desc: "Biznes rivojlantirish" },
        { name: "Shaxzod Nematov", role: "HRD", desc: "Jamoa va kadrlar" },
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
        {
          num: "01",
          title: "G'oya topish",
          desc: "Sizning qiziqishlaringiz va bozor ehtiyojlari asosida yangi, istiqbolli g'oyalarni aniqlaymiz."
        },
        {
          num: "02",
          title: "G'oyani chuqur o'rganish",
          desc: "G'oyaning foydaliligi, amalga oshirish imkoniyati va bozordagi o'rnini batafsil tahlil qilamiz."
        },
        {
          num: "03",
          title: "Bozor va raqobat tahlili",
          desc: "Bozorni, raqobatchilarni va maqsadli auditoriyani chuqur o'rganib, aniq xulosalar chiqaramiz."
        },
        {
          num: "04",
          title: "Strategiya ishlab chiqish",
          desc: "Maqsadlaringizga mos keladigan biznes modeli, pozitsionlashuv va marketing strategiyasini yaratamiz."
        },
        {
          num: "05",
          title: "Product (mahsulot) konsepsiyasini yaratish",
          desc: "Mahsulotning asosiy qiymati, funksiyalari va foydalanuvchiga beradigan foydasini belgilaymiz."
        },
        {
          num: "06",
          title: "MVP va Product yaratish",
          desc: "G'oyani minimal mahsulot (MVP) ko'rinishida ishlab chiqamiz, sinovdan o'tkazamiz va takomillashtiramiz."
        },
        {
          num: "07",
          title: "Brend va rebranding",
          desc: "Kuchli brend identiteti yaratamiz yoki mavjud brendingizni bozor talabiga mos holda yangilaymiz."
        },
        {
          num: "08",
          title: "Biznesni tizimlashtirish",
          desc: "Jarayonlar, jamoa tuzilmasi, moliyaviy model va operatsion tizimlarni yo'lga qo'yamiz."
        },
        {
          num: "09",
          title: "Marketing va mijozlarni jalb qilish",
          desc: "Mahsulotingizni bozorga olib chiqish va barqaror mijoz oqimini yaratish uchun marketing strategiyalarini amalga oshiramiz."
        },
        {
          num: "10",
          title: "O'sish va xalqaro miqyosga chiqish",
          desc: "Biznesingizni kengaytirish, yangi bozorlarga kirish va xalqaro miqyosda muvaffaqiyatga olib chiqamiz."
        }
      ]
    },
    location: {
      label: "JOYLASHUV",
      title: "Toshkent, O'zbekiston",
      desc: "Axiora Kampaniyasi joylashuvi",
      coords: "41.31° N · 69.25° E",
      office: "Axiora",
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
      title1: "With a powerful team",
      title2Line1: "Elevate your",
      title2Line2: "business",
      desc: "Axiora is a studio that turns ideas into living businesses. We combine technology, strategy, and creativity to build solutions at a global scale.",
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
      title: "Our best results",
      stats: [
        { value: "25+", label: "Launched projects" },
        { value: "10+", label: "Active business partners" },
        { value: "300%", label: "Average growth rate" },
        { value: "5+", label: "International markets" },
      ],
    },
    about: {
      label: "ABOUT US",
      title: "Choose us to build a great business",
      desc: "Axiora is not just an IT company. As a startup studio, we turn ideas into products and products into successful businesses. In every project, we combine technology, strategy, and creativity to create solutions at an international scale.",
      slogan: "No extra theory — effective results.",
      cards: [
        { title: "We bring your business to Uzbekistan", desc: "We launch any business in Uzbekistan and develop it successfully in the local market" },
        { title: "We scale from Uzbekistan to the world", desc: "We take your business that succeeded locally to the international market" },
        { title: "We build businesses from scratch", desc: "If you have an idea or capital — we create and launch your business from zero" },
        { title: "We help any business", desc: "Our team supports you in services, manufacturing, IT, marketing, growth, and other areas" },
      ],
    },
    metrics: {
      label: "OUR RESULTS",
      items: [
        { value: "25+", label: "Launched projects" },
        { value: "10+", label: "Active business partners" },
        { value: "300%", label: "Average growth rate" },
        { value: "5+", label: "International markets" },
      ],
    },
    team: {
      label: "OUR TEAM",
      title: "Our team leaders",
      detail: "Details",
      members: [
        { name: "Ismoil Nishonov", role: "COO", desc: "Operations management & strategy" },
        { name: "Abdulaziz Mansurov", role: "CPO", desc: "Product & user experience" },
        { name: "Davron Uralov", role: "CCO", desc: "Creative direction & branding" },
        { name: "Zafar Ibragimov", role: "CTO", desc: "Technical architecture" },
        { name: "Faridun Bayonov", role: "BDM", desc: "Business development" },
        { name: "Shaxzod Nematov", role: "HRD", desc: "Team & HR" },
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
        {
          num: "01",
          title: "Finding an idea",
          desc: "We identify new, promising ideas based on your interests and market needs."
        },
        {
          num: "02",
          title: "Deep idea exploration",
          desc: "We analyze the idea's usefulness, feasibility, and position in the market in detail."
        },
        {
          num: "03",
          title: "Market & competitor analysis",
          desc: "We study the market, competitors, and target audience in depth to draw clear conclusions."
        },
        {
          num: "04",
          title: "Strategy development",
          desc: "We create a business model, positioning, and marketing strategy aligned with your goals."
        },
        {
          num: "05",
          title: "Product concept creation",
          desc: "We define the product's core value, features, and benefits for the user."
        },
        {
          num: "06",
          title: "MVP & product development",
          desc: "We build the idea as a minimum viable product (MVP), test it, and refine it."
        },
        {
          num: "07",
          title: "Brand & rebranding",
          desc: "We create a strong brand identity or refresh your existing brand to meet market demands."
        },
        {
          num: "08",
          title: "Business systematization",
          desc: "We set up processes, team structure, financial model, and operational systems."
        },
        {
          num: "09",
          title: "Marketing & customer acquisition",
          desc: "We implement marketing strategies to bring your product to market and build a steady customer flow."
        },
        {
          num: "10",
          title: "Growth & international expansion",
          desc: "We expand your business, enter new markets, and drive success at an international scale."
        },
      ],
    },
    location: {
      label: "LOCATION",
      title: "Tashkent, Uzbekistan",
      desc: "Axiora company location",
      coords: "41.31° N · 69.25° E",
      office: "Axiora",
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
  ru: {
    nav: {
      home: "Главная",
      about: "О нас",
      portfolio: "Проекты",
      process: "Процесс",
      team: "Команда",
      faq: "Вопросы",
      contact: "Контакты",
    },
    hero: {
      badge: "Оптимизируйте рабочие процессы",
      title1: "С сильной командой",
      title2Line1: "Поднимите свой",
      title2Line2: "бизнес",
      desc: "Axiora — студия, превращающая идеи в живой бизнес. Мы сочетаем технологии, стратегию и креативность для создания решений мирового масштаба.",
      cta1: "Связаться",
      cta2: "Подробнее",
      videoPlaceholder: "Видео скоро",
    },
    partners: {
      title: "НАШИ ПАРТНЁРЫ",
      subtitle: "Компании, растущие вместе с нами",
    },
    results: {
      label: "РЕЗУЛЬТАТЫ",
      title: "Наши лучшие результаты",
      stats: [
        { value: "25+", label: "Запущенных проектов" },
        { value: "10+", label: "Активных бизнес-партнёров" },
        { value: "300%", label: "Средний темп роста" },
        { value: "5+", label: "Международных рынков" },
      ],
    },
    about: {
      label: "О НАС",
      title: "Выберите нас для построения крупного бизнеса",
      desc: "Axiora — это не просто IT-компания. Как стартап-студия мы превращаем идеи в продукты, а продукты — в успешный бизнес. В каждом проекте мы сочетаем технологии, стратегию и креативность для создания решений международного масштаба.",
      slogan: "Без лишней теории — эффективный результат.",
      cards: [
        { title: "Приведём ваш бизнес в Узбекистан", desc: "Запустим любой бизнес в Узбекистане и успешно развием его на местном рынке" },
        { title: "Выведем из Узбекистана на международный уровень", desc: "Выведем ваш бизнес, успешный на местном рынке, на международную арену" },
        { title: "Построим бизнес с нуля", desc: "Есть идея или капитал — мы создадим и запустим ваш бизнес с нуля" },
        { title: "Поможем любому бизнесу", desc: "Наша команда поможет вам в сфере услуг, производства, IT, маркетинга, роста и других направлениях" },
      ],
    },
    metrics: {
      label: "НАШИ РЕЗУЛЬТАТЫ",
      items: [
        { value: "25+", label: "Запущенных проектов" },
        { value: "10+", label: "Активных бизнес-партнёров" },
        { value: "300%", label: "Средний темп роста" },
        { value: "5+", label: "Международных рынков" },
      ],
    },
    team: {
      label: "НАША КОМАНДА",
      title: "Лидеры нашей команды",
      detail: "Подробнее",
      members: [
        { name: "Ismoil Nishonov", role: "COO", desc: "Операционное управление и стратегия" },
        { name: "Abdulaziz Mansurov", role: "CPO", desc: "Продукт и пользовательский опыт" },
        { name: "Davron Uralov", role: "CCO", desc: "Креативное направление и брендинг" },
        { name: "Zafar Ibragimov", role: "CTO", desc: "Техническая архитектура" },
        { name: "Faridun Bayonov", role: "BDM", desc: "Развитие бизнеса" },
        { name: "Shaxzod Nematov", role: "HRD", desc: "Команда и кадры" },
        { name: "Ahadjon Muxamedjonov", role: "CMO", desc: "Маркетинг и рост" },
      ],
    },
    testimonials: {
      label: "ОТЗЫВЫ",
      title: "Партнёры о нас",
      reviews: [
        { name: "Otabek Muhammadiyev", role: "Руководитель партнёрской компании", text: "Работа с Axiora открыла для нас совершенно новые возможности. Их профессиональный подход и инновационные решения вывели наш бизнес на новый уровень." },
        { name: "Alixon Rahmatullayev", role: "Основатель стартапа", text: "Команда Axiora помогала нам на каждом этапе превращения идеи в реальный продукт. Профессиональный, быстрый и надёжный партнёр." },
      ],
    },
    process: {
      label: "ПРОЦЕСС",
      title: "Как мы работаем",
      steps: [
        {
          num: "01",
          title: "Поиск идеи",
          desc: "Определяем новые перспективные идеи на основе ваших интересов и потребностей рынка."
        },
        {
          num: "02",
          title: "Глубокое изучение идеи",
          desc: "Детально анализируем полезность, реализуемость и место идеи на рынке."
        },
        {
          num: "03",
          title: "Анализ рынка и конкурентов",
          desc: "Глубоко изучаем рынок, конкурентов и целевую аудиторию, формируя чёткие выводы."
        },
        {
          num: "04",
          title: "Разработка стратегии",
          desc: "Создаём бизнес-модель, позиционирование и маркетинговую стратегию, соответствующие вашим целям."
        },
        {
          num: "05",
          title: "Создание концепции продукта",
          desc: "Определяем ключевую ценность продукта, его функции и пользу для пользователя."
        },
        {
          num: "06",
          title: "MVP и создание продукта",
          desc: "Разрабатываем идею в виде минимального продукта (MVP), тестируем и улучшаем."
        },
        {
          num: "07",
          title: "Бренд и ребрендинг",
          desc: "Создаём сильную идентичность бренда или обновляем существующий бренд под требования рынка."
        },
        {
          num: "08",
          title: "Систематизация бизнеса",
          desc: "Налаживаем процессы, структуру команды, финансовую модель и операционные системы."
        },
        {
          num: "09",
          title: "Маркетинг и привлечение клиентов",
          desc: "Реализуем маркетинговые стратегии для вывода продукта на рынок и создания стабильного потока клиентов."
        },
        {
          num: "10",
          title: "Рост и выход на международный уровень",
          desc: "Масштабируем ваш бизнес, выходим на новые рынки и обеспечиваем успех на международном уровне."
        },
      ],
    },
    location: {
      label: "МЕСТОПОЛОЖЕНИЕ",
      title: "Ташкент, Узбекистан",
      desc: "Местоположение компании Axiora",
      coords: "41.31° N · 69.25° E",
      office: "Axiora",
    },
    faq: {
      label: "FAQ",
      title: "Часто задаваемые вопросы",
      items: [
        { q: "Чем занимается Axiora?", a: "Axiora — стартап-студия, специализирующаяся на создании инновационных продуктов, выводе стартапов на международный уровень и построении цифровых экосистем." },
        { q: "Какие услуги вы предлагаете?", a: "Мы предлагаем полный цикл услуг: стратегия, дизайн продукта, разработка ПО, брендинг, маркетинг и рост." },
        { q: "Что нужно для начала сотрудничества?", a: "Достаточно рассказать о своей идее или проблеме, которую нужно решить. Остальное спланируем вместе." },
        { q: "Сколько времени занимает запуск проекта?", a: "Мы начинаем работу в течение 1–2 недель после согласования." },
        { q: "Как формируется стоимость?", a: "Стоимость определяется индивидуально в зависимости от объёма проекта, сроков и добавленной ценности." },
      ],
    },
    contact: {
      label: "КОНТАКТЫ",
      title: "Начнём ваш проект вместе",
      name: "Имя и фамилия",
      phone: "Номер телефона",
      company: "Название компании",
      message: "Сообщение",
      submit: "Отправить сообщение",
      phone_label: "Телефон",
      email_label: "Электронная почта",
      location_label: "Местоположение",
      strategic: "Отдел стратегического партнёрства",
      success: "Ваше сообщение успешно отправлено!",
    },
    footer: {
      rights: "Все права защищены",
    },
  },
};

const defaultI18n = {
  lang: 'uz',
  setLang: (_lang) => {},
  t: translations.uz,
};

const I18nContext = createContext(defaultI18n);

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