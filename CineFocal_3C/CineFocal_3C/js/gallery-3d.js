/*
================================================================================
* PROJECT / المشروع: Cyberpunk Cinematic Photography Portfolio Template
* FILE / اسم الملف: js/gallery-3d.js
* ------------------------------------------------------------------------------
* QUICK EDIT GUIDE / دليل التعديلات السريعة:
* 1. Gallery & Lightbox Elements / تهيئة عناصر المعرض والـ Lightbox : Lines [16 to 32]
* 2. Card Centering Physics / منطق تركيز وتوسيط الكروت ثلاثية الأبعاد : Lines [38 to 65]
* 3. Lightbox Triggers / أحداث فتح نافذة المعاينة المكبرة          : Lines [70 to 110]
* 4. Drag Inertia Velocity (0.08) / سرعة القصور الذاتي للسحب      : Line [163]
* 5. Continuous Floating Speed (0.024) / سرعة الطفو التلقائي المستمر : Line [166]
* 6. Focused Card Front Offset (160px) / مسافة إبراز الكرت للأمام : Line [183]
* 7. Hover Card Elevation (tz + 60) / ارتفاع الكرت عند التمرير      : Line [187]
================================================================================
*/

function initGallery3D() {
  const board = document.getElementById("board");
  const viewport = document.getElementById("viewport");
  const cards = document.querySelectorAll(".photo-card-3d");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const closeBtn = document.getElementById("closeLightboxBtn");

  if (!board || !viewport || cards.length === 0) return;

  let isDragging = false;
  let startX = 0, startY = 0;
  let currentX = 0, currentY = 0;
  let targetX = 0, targetY = 0;
  let hasMoved = false;

  let time = 0;
  let highestZIndex = 100;
  let activeCard = null;
  let hoveredCard = null;

  function resetCardTransform(card) {
    if (card) {
      card.classList.remove("is-focused");
    }
  }

  function centerCard(card) {
    if (activeCard && activeCard !== card) {
      resetCardTransform(activeCard);
    }

    highestZIndex += 1;
    card.style.zIndex = highestZIndex;
    card.classList.add("is-focused");
    activeCard = card;

    const x = parseFloat(card.dataset.x) || 0;
    const y = parseFloat(card.dataset.y) || 0;

    targetX = -x;
    targetY = -y;
  }

  window.resetGalleryView = function() {
    const defaultCard = document.getElementById("defaultCenterCard") || cards[0];
    if (defaultCard) {
      centerCard(defaultCard);
    }
  };

  cards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      if (!isDragging) hoveredCard = card;
    });

    card.addEventListener("mouseleave", () => {
      if (hoveredCard === card) hoveredCard = null;
    });

    card.addEventListener("click", () => {
      if (hasMoved) return;

      const x = parseFloat(card.dataset.x) || 0;
      const y = parseFloat(card.dataset.y) || 0;
      const distanceToCenter = Math.hypot(targetX - (-x), targetY - (-y));

      if (distanceToCenter > 20 || activeCard !== card) {
        centerCard(card);
      } else {
        const img = card.querySelector("img");
        if (img && lightbox && lightboxImg) {
          lightboxImg.src = img.src;
          lightbox.classList.add("active");
        }
      }
    });
  });

  function closeLightboxModal() {
    if (lightbox) lightbox.classList.remove("active");
    setTimeout(() => { if (lightboxImg) lightboxImg.src = ""; }, 300);
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", closeLightboxModal);
  }

  if (lightbox) {
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) closeLightboxModal();
    });
  }

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightbox && lightbox.classList.contains("active")) {
      closeLightboxModal();
    }
  });

  function onPointerDown(e) {
    if (lightbox && lightbox.classList.contains("active")) return;
    isDragging = true;
    hasMoved = false;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    startX = clientX - currentX;
    startY = clientY - currentY;
  }

  function onPointerMove(e) {
    if (!isDragging) return;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    
    const dx = clientX - (startX + currentX);
    const dy = clientY - (startY + currentY);
    
    if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
      hasMoved = true;
    }

    targetX = clientX - startX;
    targetY = clientY - startY;
  }

  function onPointerUp() {
    isDragging = false;
  }

  function renderLoop() {
    currentX += (targetX - currentX) * 0.08;
    currentY += (targetY - currentY) * 0.08;

    time += 0.024;
    const damp = isDragging ? 0.2 : 1.0;

    const ambientBoardX = Math.sin(time * 0.7) * 7 * damp;
    const ambientBoardY = Math.cos(time * 0.5) * 8 * damp;
    const tiltY = (currentX * 0.02) + (Math.sin(time * 0.6) * 1.5 * damp);
    const tiltX = -(currentY * 0.02) + (Math.cos(time * 0.8) * 1.5 * damp);

    board.style.transform = `translate3d(${currentX + ambientBoardX}px, ${currentY + ambientBoardY}px, 0) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;

    cards.forEach((card, index) => {
      const x = parseFloat(card.dataset.x) || 0;
      const y = parseFloat(card.dataset.y) || 0;
      const rx = parseFloat(card.dataset.rx) || 0;
      const ry = parseFloat(card.dataset.ry) || 0;
      const rz = parseFloat(card.dataset.rz) || 0;
      const tz = parseFloat(card.dataset.tz) || 0;

      if (activeCard === card) {
        const breatheZ = Math.sin(time * 1.5) * 5;
        card.style.transform = `translate3d(calc(-50% + ${x}px), calc(-50% + ${y}px), ${160 + breatheZ}px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale(1.05)`;
      } 
      else if (hoveredCard === card && !isDragging) {
        card.style.transform = `translate3d(calc(-50% + ${x}px), calc(-50% + ${y}px), ${tz + 60}px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale(1.04)`;
      } 
      else {
        const phase = index * 0.95;
        const floatY = Math.sin(time * 1.1 + phase) * 6 * damp;
        const floatZ = Math.cos(time * 0.9 + phase) * 8 * damp;
        const floatRotX = Math.sin(time * 0.8 + phase) * 1.8 * damp;
        const floatRotY = Math.cos(time * 1.0 + phase) * 1.6 * damp;

        card.style.transform = `translate3d(calc(-50% + ${x}px), calc(-50% + ${y + floatY}px), ${tz + floatZ}px) rotateX(${rx + floatRotX}deg) rotateY(${ry + floatRotY}deg) rotateZ(${rz}deg)`;
      }
    });

    requestAnimationFrame(renderLoop);
  }

  renderLoop();

  setTimeout(() => {
    if (window.resetGalleryView) window.resetGalleryView();
  }, 100);

  viewport.addEventListener("mousedown", onPointerDown);
  window.addEventListener("mousemove", onPointerMove);
  window.addEventListener("mouseup", onPointerUp);

  viewport.addEventListener("touchstart", onPointerDown, { passive: true });
  window.addEventListener("touchmove", onPointerMove, { passive: true });
  window.addEventListener("touchend", onPointerUp);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initGallery3D);
} else {
  initGallery3D();
}