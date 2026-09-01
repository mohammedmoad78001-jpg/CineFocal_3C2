/*
================================================================================
* PROJECT / المشروع: Cyberpunk Cinematic Photography Portfolio Template
* FILE / اسم الملف: js/main.js
* ------------------------------------------------------------------------------
* QUICK EDIT GUIDE / دليل التعديلات السريعة:
* 1. Safe Initialization Logic / الإطلاق الآمن دون تعليق       : Lines [20 to 35]
* 2. Staggered Timeline Sequence / التسلسل الزمني للظهور      : Lines [38 to 55]
* 3. Config Data Injection Engine / محرك حقن بيانات التهيئة     : Lines [60 to 155]
* 4. Downward Section Navigation / التنقل والتمرير للأسفل بدقة   : Lines [160 to 200]
* 5. Theme Toggle (Dark/Light) / تبديل الوضع الليلي والنهاري     : Lines [205 to 220]
* 6. Bilingual Toggle (AR/EN) / تبديل اللغات وتعديل الاتجاه     : Lines [225 to 240]
* 7. Vision Pulse Tracking / تتبع مؤشر الماوس لبطاقات الرؤية     : Lines [245 to 255]
* 8. Line-Art Parallax Engine / محرك البارالاكس للرسومات المتجهة : Lines [260 to 275]
* 9. Direct Booking Modal Logic / نافذة طلب وحجز الخدمات المباشر : Lines [280 to 345]
================================================================================
*/

function initPortfolioApp() {
    const htmlElement = document.documentElement;

    // ========================================================================
    // 1. DATA INJECTION ENGINE / محرك حقن البيانات المسبق
    // ========================================================================
    try {
        if (window.siteConfig) {
            const cfg = window.siteConfig;

            // Brand Names / حقن الاسم
            const brandArEl = document.getElementById('brand-name-ar');
            const brandEnEl = document.getElementById('brand-name-en');
            const pageTitleEl = document.getElementById('dynamic-page-title');

            if (pageTitleEl && cfg.brand && cfg.brand.metaTitle) pageTitleEl.textContent = cfg.brand.metaTitle;

            if (brandArEl && cfg.brand && cfg.brand.nameAr && Array.isArray(cfg.brand.nameAr)) {
                brandArEl.innerHTML = cfg.brand.nameAr.map(word => `<span class="word-group">${word}</span>`).join(' ');
            }

            if (brandEnEl && cfg.brand && cfg.brand.nameEn && Array.isArray(cfg.brand.nameEn)) {
                brandEnEl.innerHTML = cfg.brand.nameEn.map(char => char === ' ' ? '<span class="ch">&nbsp;</span>' : `<span class="ch">${char}</span>`).join('');
            }

            // HUD Personal Info / حقن معلومات الـ HUD
            const hudInfoContainer = document.getElementById('hud-info-container');
            if (hudInfoContainer && cfg.personalInfo && Array.isArray(cfg.personalInfo)) {
                hudInfoContainer.innerHTML = '';
                cfg.personalInfo.forEach(item => {
                    const box = document.createElement('div');
                    box.className = 'hud-data-box';
                    box.innerHTML = `
                        <span class="hud-data-label">
                            <span class="lang-ar">${item.labelAr}</span>
                            <span class="lang-en">${item.labelEn}</span>
                        </span>
                        <span class="hud-data-val">
                            <span class="lang-ar">${item.valueAr}</span>
                            <span class="lang-en">${item.valueEn}</span>
                        </span>
                    `;
                    hudInfoContainer.appendChild(box);
                });
            }

            // HUD Skills / حقن أشرطة المهارات
            const hudSkillsContainer = document.getElementById('hud-skills-container');
            if (hudSkillsContainer && cfg.skills && Array.isArray(cfg.skills)) {
                hudSkillsContainer.innerHTML = '';
                cfg.skills.forEach(skill => {
                    const item = document.createElement('div');
                    item.className = 'skill-item';
                    item.innerHTML = `
                        <div class="skill-header">
                            <span class="lang-ar">${skill.nameAr}</span>
                            <span class="lang-en">${skill.nameEn}</span>
                        </div>
                        <div class="range" style="--p:${skill.percentage}"></div>
                    `;
                    hudSkillsContainer.appendChild(item);
                });
            }

            // Vision Section / حقن نصوص قسم الرؤية
            if (cfg.vision) {
                const vTagAr = document.getElementById('vision-tag-ar');
                const vTagEn = document.getElementById('vision-tag-en');
                const vTitleAr = document.getElementById('vision-title-ar');
                const vTitleEn = document.getElementById('vision-title-en');
                const vDescAr = document.getElementById('vision-desc-ar');
                const vDescEn = document.getElementById('vision-desc-en');
                const vBtnAr = document.getElementById('vision-btn-ar');
                const vBtnEn = document.getElementById('vision-btn-en');

                if (vTagAr) vTagAr.textContent = cfg.vision.tagAr;
                if (vTagEn) vTagEn.textContent = cfg.vision.tagEn;
                if (vTitleAr) vTitleAr.textContent = cfg.vision.titleAr;
                if (vTitleEn) vTitleEn.textContent = cfg.vision.titleEn;
                if (vDescAr) vDescAr.textContent = cfg.vision.descAr;
                if (vDescEn) vDescEn.textContent = cfg.vision.descEn;
                if (vBtnAr) vBtnAr.textContent = cfg.vision.btnAr;
                if (vBtnEn) vBtnEn.textContent = cfg.vision.btnEn;
            }

            // Services Grid / حقن باقات الخدمات
            const servicesContainer = document.getElementById('services-cards-container');
            if (servicesContainer && cfg.services && Array.isArray(cfg.services)) {
                servicesContainer.innerHTML = '';
                cfg.services.forEach(srv => {
                    const card = document.createElement('div');
                    card.className = `service-card-item ${srv.cardStyle || 'card-bronze'}`;
                    card.setAttribute('data-service-ar', srv.titleAr);
                    card.setAttribute('data-service-en', srv.titleEn);
                    card.setAttribute('data-price', `${srv.currency}${srv.price}`);
                    
                    card.innerHTML = `
                        <div class="c-layer-1">
                            <div class="c-icon"><i class="${srv.iconClass}"></i></div>
                            <h3 class="c-title lang-ar">${srv.titleAr}</h3>
                            <h3 class="c-title lang-en">${srv.titleEn}</h3>
                        </div>
                        <div class="c-layer-2">
                            <span class="c-desc lang-ar">${srv.descAr}</span>
                            <span class="c-desc lang-en">${srv.descEn}</span>
                            <div class="c-footer-action">
                                <div class="c-price-box">
                                    <span class="c-currency">${srv.currency}</span>
                                    <span class="c-number">${srv.price}</span>
                                </div>
                                <button class="order-service-btn" type="button">
                                    <span class="lang-ar">طلب الخدمة</span>
                                    <span class="lang-en">Order Now</span>
                                    <i class="fa-solid fa-bolt"></i>
                                </button>
                            </div>
                        </div>
                    `;
                    servicesContainer.appendChild(card);
                });
            }

            // Contact Channels / حقن روابط التواصل
            if (cfg.contact) {
                const linkWa = document.getElementById('contact-link-wa');
                const linkCall = document.getElementById('contact-link-call');
                const linkIg = document.getElementById('contact-link-ig');
                const linkTt = document.getElementById('contact-link-tt');
                const linkFb = document.getElementById('contact-link-fb');
                const linkMail = document.getElementById('contact-link-mail');

                const dispWa = document.getElementById('contact-display-wa');
                const dispMail = document.getElementById('contact-display-mail');

                if (linkWa) linkWa.href = (cfg.contact.socials && cfg.contact.socials.whatsapp) ? cfg.contact.socials.whatsapp : `https://wa.me/${cfg.contact.phoneRaw}`;
                if (dispWa && cfg.contact.phoneDisplay) dispWa.textContent = cfg.contact.phoneDisplay;

                if (linkCall) linkCall.href = `tel:+${cfg.contact.phoneRaw}`;
                if (linkIg) linkIg.href = (cfg.contact.socials && cfg.contact.socials.instagram) ? cfg.contact.socials.instagram : '#';
                if (linkTt) linkTt.href = (cfg.contact.socials && cfg.contact.socials.tiktok) ? cfg.contact.socials.tiktok : '#';
                if (linkFb) linkFb.href = (cfg.contact.socials && cfg.contact.socials.facebook) ? cfg.contact.socials.facebook : '#';
                
                if (linkMail) linkMail.href = `mailto:${cfg.contact.email}`;
                if (dispMail && cfg.contact.email) dispMail.textContent = cfg.contact.email;
            }
        }
    } catch (err) {
        console.warn("Config injection notice:", err);
    }

    // ========================================================================
    // 2. STAGGERED INTRO TIMELINE / التسلسل الزمني الصارم للظهور التدريجي
    // ========================================================================
    
    // المرحلة 2 (بعد 2.5 ثانية من فتح العدسة): إظهار صندوق المعلومات والمهارات
    setTimeout(() => {
        document.body.classList.add('intro-hud-done');
    }, 2500);

    // المرحلة 3 (بعد 3.3 ثانية): إظهار رسومات السكتش في الخلفية
    setTimeout(() => {
        document.body.classList.add('intro-bg-done');
    }, 3300);

    // المرحلة 4 (بعد 3.9 ثانية): إظهار شريط التنقل والأقسام وتفعيل التفاعل
    setTimeout(() => {
        document.body.classList.add('intro-nav-done');
    }, 3900);

    // ========================================================================
    // 3. DOWNWARD SECTION NAVIGATION / التنقل والتمرير للأسفل
    // ========================================================================
    const navButtons = document.querySelectorAll('.nav-cyber-btn');
    const sections = document.querySelectorAll('.section-page');

    navButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();

            navButtons.forEach(b => b.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active-section'));

            btn.classList.add('active');
            const targetId = btn.getAttribute('data-target');
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.classList.add('active-section');
                
                if (targetId === 'portfolio' && window.resetGalleryView) {
                    window.resetGalleryView();
                }

                const navElement = document.getElementById('main-nav');
                const navHeight = navElement ? navElement.offsetHeight : 70;
                const sectionRect = targetSection.getBoundingClientRect();
                const absoluteTargetTop = sectionRect.top + window.pageYOffset - (navHeight + 20);

                window.scrollTo({
                    top: absoluteTargetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ========================================================================
    // 4. THEME TOGGLE (DARK / LIGHT) / تبديل الوضع الليلي والنهاري
    // ========================================================================
    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-theme');
            if (currentTheme === 'dark') {
                htmlElement.setAttribute('data-theme', 'light');
                themeBtn.textContent = '🌙';
            } else {
                htmlElement.setAttribute('data-theme', 'dark');
                themeBtn.textContent = '☀️';
            }
        });
    }

    // ========================================================================
    // 5. BILINGUAL LANGUAGE TOGGLE (AR / EN) / تبديل اللغة
    // ========================================================================
    const langBtn = document.getElementById('lang-toggle');
    if (langBtn) {
        langBtn.addEventListener('click', () => {
            const currentLang = htmlElement.getAttribute('lang');
            if (currentLang === 'ar') {
                htmlElement.setAttribute('dir', 'ltr');
                htmlElement.setAttribute('lang', 'en');
                langBtn.textContent = 'AR';
            } else {
                htmlElement.setAttribute('dir', 'rtl');
                htmlElement.setAttribute('lang', 'ar');
                langBtn.textContent = 'EN';
            }
        });
    }

    // ========================================================================
    // 6. VISION CARD MOUSE TRACKING / تتبع مؤشر الفأرة
    // ========================================================================
    const pulseCards = document.querySelectorAll('[data-card-29="root"]');
    pulseCards.forEach(card => {
        card.addEventListener('mouseenter', (e) => {
            const rect = card.getBoundingClientRect();
            card.style.setProperty('--card-29-x', `${e.clientX - rect.left}px`);
            card.style.setProperty('--card-29-y', `${e.clientY - rect.top}px`);
        });
    });

    // ========================================================================
    // 7. LINE-ART PARALLAX ENGINE / محرك البارالاكس للرسومات
    // ========================================================================
    const parallaxElements = document.querySelectorAll('.lineart-parallax');
    if (parallaxElements.length > 0) {
        window.addEventListener('mousemove', (e) => {
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;
            const deltaX = (e.clientX - centerX);
            const deltaY = (e.clientY - centerY);

            parallaxElements.forEach(el => {
                const depth = parseFloat(el.getAttribute('data-depth')) || 0.05;
                el.style.transform = `translate(${deltaX * depth}px, ${deltaY * depth}px)`;
            });
        }, { passive: true });
    }

    // ========================================================================
    // 8. DIRECT BOOKING MODAL LOGIC / نافذة طلب وحجز الخدمات المباشر
    // ========================================================================
    const serviceModal = document.getElementById('serviceModal');
    const closeServiceModal = document.getElementById('closeServiceModal');
    const modalServiceTitle = document.getElementById('modalServiceTitle');
    const modalServicePrice = document.getElementById('modalServicePrice');
    
    const orderViaWhatsApp = document.getElementById('orderViaWhatsApp');
    const orderViaCall = document.getElementById('orderViaCall');
    const orderViaInstagram = document.getElementById('orderViaInstagram');
    const orderViaEmail = document.getElementById('orderViaEmail');

    document.addEventListener('click', (e) => {
        const btn = e.target.closest('.order-service-btn');
        if (!btn || !serviceModal) return;

        e.stopPropagation();
        const serviceCard = btn.closest('.service-card-item');
        if (!serviceCard) return;

        const isArabic = htmlElement.getAttribute('lang') === 'ar';
        const serviceName = isArabic 
            ? serviceCard.getAttribute('data-service-ar') 
            : serviceCard.getAttribute('data-service-en');
        const servicePrice = serviceCard.getAttribute('data-price');

        if (modalServiceTitle) modalServiceTitle.textContent = serviceName;
        if (modalServicePrice) modalServicePrice.textContent = servicePrice;

        const phoneRaw = (window.siteConfig && window.siteConfig.contact) ? window.siteConfig.contact.phoneRaw : "123456789000";
        const emailAddr = (window.siteConfig && window.siteConfig.contact) ? window.siteConfig.contact.email : "contact@yourdomain.com";
        const igUrl = (window.siteConfig && window.siteConfig.contact && window.siteConfig.contact.socials) ? window.siteConfig.contact.socials.instagram : "#";

        const messageText = isArabic 
            ? `مرحباً، أود الاستفسار وحجز خدمة (${serviceName}) بسعر (${servicePrice}). يرجى تأكيد الموعد والتفاصيل.`
            : `Hello, I would like to book (${serviceName}) for (${servicePrice}). Please confirm availability.`;

        if (orderViaWhatsApp) orderViaWhatsApp.href = `https://wa.me/${phoneRaw}?text=${encodeURIComponent(messageText)}`;
        if (orderViaCall) orderViaCall.href = `tel:+${phoneRaw}`;
        if (orderViaInstagram) orderViaInstagram.href = igUrl;
        if (orderViaEmail) orderViaEmail.href = `mailto:${emailAddr}?subject=${encodeURIComponent("Booking Request: " + serviceName)}&body=${encodeURIComponent(messageText)}`;

        serviceModal.classList.add('active');
    });

    if (closeServiceModal) {
        closeServiceModal.addEventListener('click', () => {
            serviceModal.classList.remove('active');
        });
    }

    if (serviceModal) {
        serviceModal.addEventListener('click', (e) => {
            if (e.target === serviceModal) {
                serviceModal.classList.remove('active');
            }
        });
    }
}

// Guaranteed launch regardless of DOM readiness state
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPortfolioApp);
} else {
    initPortfolioApp();
}