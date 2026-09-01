/*
================================================================================
* PROJECT / المشروع: Cyberpunk Cinematic Photography Portfolio Template
* FILE / اسم الملف: js/config.js
* ------------------------------------------------------------------------------
* QUICK EDIT GUIDE / دليل التعديلات السريعة للمشتري:
* 1. Brand Identity & Name / الهوية والاسم الشخصي      : Lines [24 to 52]
* 2. HUD Info Dashboard / لوحة المعلومات الشخصية           : Lines [55 to 88]
* 3. Skills & Progress / أشرطة المهارات والنسب المئوية     : Lines [91 to 120]
* 4. Vision Section Text / نصوص قسم الرؤية وفلسفة العدسة   : Lines [123 to 142]
* 5. Services & Pricing / باقات الخدمات والأسعار المتمددة  : Lines [145 to 198]
* 6. Contact & Socials / قنوات التواصل الاجتماعي والحجز     : Lines [201 to 240]
================================================================================
*/

const siteConfig = {

  // ==========================================================================
  // 1. BRAND & PERSONAL IDENTITY / الهوية والاسم والترويسة
  // ==========================================================================
  brand: {
    // English Name: Characters separated for individual hover animation
    // الاسم بالإنجليزي: حروف مفصولة للتأثير الحركي الفردي
    nameEn: ["P", "H", "O", "T", "O", "G", "R", "A", "P", "H", "E", "R", " ", "N", "A", "M", "E"],

    // Arabic Name: Array of words to maintain proper Arabic calligraphy
    // الاسم بالعربي: مصفوفة كلمات للحفاظ على اتصال الحروف العربية
    nameAr: ["المصور", "اسم", "المصور"],

    // Browser Tab Meta Title / عنوان تبويب المتصفح
    metaTitle: "Photographer Portfolio | مصور سينمائي وفوتوغرافي",
    
    // Theme Accent Colors / ألوان التمييز الأساسية
    themeColorDark: "#F3E600",
    themeColorLight: "#2563eb"
  },

  // ==========================================================================
  // 2. HUD PERSONAL DATA / بيانات لوحة المعلومات الشخصية
  // ==========================================================================
  personalInfo: [
    {
      labelAr: "المهنة",
      labelEn: "Profession",
      valueAr: "مصور سينمائي وفوتوغرافي",
      valueEn: "Cinematographer & Photographer"
    },
    {
      labelAr: "العمر",
      labelEn: "Age",
      valueAr: "24 سنة",
      valueEn: "24 Years"
    },
    {
      labelAr: "الموقع",
      labelEn: "Location",
      valueAr: "المدينة - الدولة",
      valueEn: "City - Country"
    }
  ],

  // ==========================================================================
  // 3. SKILLS & PROGRESS BARS / أشرطة المهارات ونسب التقدم المائلة
  // ==========================================================================
  skills: [
    {
      nameAr: "فوتوشوب وتعديل الصور",
      nameEn: "Photoshop & Retouching",
      percentage: 95
    },
    {
      nameAr: "لايت روم ومعالجة الألوان",
      nameEn: "Lightroom Color Grading",
      percentage: 90
    },
    {
      nameAr: "التصوير السينمائي والإضاءة",
      nameEn: "Cinematic Studio Lighting",
      percentage: 85
    }
  ],

  // ==========================================================================
  // 4. VISION SECTION / قسم الرؤية والقصة
  // ==========================================================================
  vision: {
    tagAr: "// فلسفة العدسة",
    tagEn: "// Lens Philosophy",
    titleAr: "تجميد اللحظة",
    titleEn: "Freezing Time",
    descAr: "الصورة ليست مجرد انعكاس ضوئي على مستشعر رقمي؛ إنها طاقة شعورية مجمدة تبقى حية عندما تتلاشى كل التفاصيل الأخرى في الذاكرة.",
    descEn: "A photograph is not merely light captured on a digital sensor; it is an emotional pulse frozen in time that outlasts memory.",
    btnAr: "استكشف الرؤية ⚡",
    btnEn: "Explore Vision ⚡"
  },

  // ==========================================================================
  // 5. SERVICES & PACKAGES / باقات الخدمات والأسعار القابلة للتمدد
  // ==========================================================================
  services: [
    {
      id: "portrait",
      iconClass: "fa-solid fa-user-tie",
      cardStyle: "card-bronze",
      titleAr: "جلسة بورتريه",
      titleEn: "Portrait Session",
      descAr: "تصوير شخصي احترافي وتعديل 10 صور بدقة فائقة مع معالجة وتنعيم البشرة وتوزيع إضاءة سينمائي.",
      descEn: "10 High-End Retouched Photos with Studio Lighting Setup.",
      currency: "$",
      price: "49"
    },
    {
      id: "cinematic-video",
      iconClass: "fa-solid fa-video",
      cardStyle: "card-gold",
      titleAr: "فيديو سينمائي",
      titleEn: "Cinematic Video",
      descAr: "تصوير بدقة 4K مع تصحيح وتدريج ألوان سينمائي (Color Grading)، مؤثرات صوتية وإخراج احترافي.",
      descEn: "Full 4K Production, Professional Color Grading & Sound FX.",
      currency: "$",
      price: "120"
    },
    {
      id: "event-coverage",
      iconClass: "fa-solid fa-camera-retro",
      cardStyle: "card-silver",
      titleAr: "تغطية مناسبات",
      titleEn: "Event Coverage",
      descAr: "تغطية شاملة للحفلات والمؤتمرات والمعارض وتسليم ألبوم رقمي كامل ومعدل في وقت قياسي.",
      descEn: "Full Event Coverage, High-Res Digital Album & Fast Delivery.",
      currency: "$",
      price: "199"
    }
  ],

  // ==========================================================================
  // 6. CONTACT & BOOKING CHANNELS / منصات التواصل وبيانات الحجز المباشر
  // ==========================================================================
  contact: {
    phoneRaw: "123456789000",
    phoneDisplay: "+1 (234) 567-8900",
    email: "contact@yourdomain.com",
    socials: {
      whatsapp: "https://wa.me/123456789000",
      instagram: "https://instagram.com/your_username",
      tiktok: "https://tiktok.com/@your_username",
      facebook: "https://facebook.com/your_page"
    }
  }
};

window.siteConfig = siteConfig;