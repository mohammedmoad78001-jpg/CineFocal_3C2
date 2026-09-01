/*
================================================================================
* PROJECT / المشروع: Cyberpunk Cinematic Photography Portfolio Template
* FILE / اسم الملف: js/components/camera-intro.js
* ------------------------------------------------------------------------------
* QUICK EDIT GUIDE / دليل التعديلات السريعة:
* 1. Lens Stage & Outer Glow / تنسيق المسرح والتوهج الخارجي : Lines [22 to 50]
* 2. Profile Photo High-Z Layer / طبقة صورة المصور العليا  : Lines [52 to 68]
* 3. Aperture Blades Style / تصميم شفرات العدسة الواقعية    : Lines [72 to 92]
* 4. Lens Markings Ring / علامات وأرقام العدسة الدوارة    : Lines [100 to 125]
* 5. Scale Duration (2400ms) / سرعة تكبير العدسة           : Line [165]
* 6. Aperture Open Duration (1800ms) / سرعة انفتاح الشفرات : Line [166]
================================================================================
*/
class CameraIntro extends HTMLElement {
    constructor() {
        super();
        this.root = this.attachShadow({ mode: "open" });

        this.root.innerHTML = `
        <style>
            :host { 
                display: block; 
                width: 100%; 
                height: 100%; 
                min-height: 420px; 
                overflow: visible; 
                background: transparent; 
                position: relative;
            }
            .camera-intro-stage { 
                position: relative; 
                width: 100%; 
                height: 100%; 
                min-height: 420px; 
                overflow: visible; 
                perspective: 1200px; 
                display: flex; 
                align-items: center; 
                justify-content: center; 
            }
            .camera-intro-lens { 
                position: relative; 
                width: clamp(260px, 34vw, 400px); 
                height: clamp(260px, 34vw, 400px); 
                border-radius: 50%; 
                background: radial-gradient(circle at 38% 32%, #666c70 0%, #363b3e 18%, #1b1e20 42%, #090b0c 76%, #25292b 100%); 
                border: 3px solid #000; 
                box-shadow: 0 30px 65px rgba(0,0,0,.5), inset 0 3px 5px rgba(255,255,255,.18), inset 0 -12px 22px rgba(0,0,0,.75); 
                transform-style: preserve-3d; 
                will-change: transform; 
                transform: scale(0); 
            }
            
            .camera-intro-outer-glow { 
                z-index: -1; 
                position: absolute; 
                inset: -24px; 
                border-radius: 50%; 
                opacity: 0; 
                will-change: transform, opacity; 
                background: conic-gradient(from 0deg, #ff0055, #00ffaa, #00aaff, #ff0055); 
                filter: blur(28px); 
            }
            
            .camera-intro-inner-housing { 
                z-index: 1; 
                position: absolute; 
                inset: 13.5%; 
                border-radius: 50%; 
                background: radial-gradient(circle, #202528 0%, #0c0f10 58%, #181c1e 100%); 
                box-shadow: inset 0 0 25px rgba(0,0,0,.95); 
            }
            
            .camera-intro-image { 
                z-index: 20; 
                position: absolute; 
                inset: 17%; 
                border-radius: 50%; 
                overflow: hidden; 
                background: #090b0c; 
                opacity: 0; 
                transform: scale(.08); 
                will-change: transform, opacity; 
                box-shadow: 0 0 25px rgba(0,0,0,0.85); 
            }
            #photographer-profile-image { 
                width: 100%; 
                height: 100%; 
                display: block; 
                object-fit: cover; 
                object-position: center; 
                border-radius: 50%; 
            }
            
            .camera-intro-inner-rgb { 
                z-index: 22; 
                position: absolute; 
                inset: 17%; 
                border-radius: 50%; 
                opacity: 0; 
                pointer-events: none; 
            }
            .camera-intro-inner-rgb::before { 
                content: ""; 
                position: absolute; 
                inset: 0; 
                border-radius: 50%; 
                background: conic-gradient(from 0deg, #ff0055, #00ffaa, #00aaff, #ff0055); 
                -webkit-mask: radial-gradient(transparent 98.4%, #000 99.2%); 
                mask: radial-gradient(transparent 98.4%, #000 99.2%); 
                opacity: 0.6; 
            }
            
            .camera-intro-aperture { 
                z-index: 10; 
                position: absolute; 
                inset: 13.5%; 
                border-radius: 50%; 
                overflow: hidden; 
                pointer-events: none; 
            }
            .camera-intro-blade { 
                position: absolute; 
                left: 50%; 
                top: 50%; 
                width: 55%; 
                height: 40%; 
                margin-top: -20%; 
                transform-origin: 0% 50%; 
                will-change: transform, opacity; 
                clip-path: polygon(0 50%, 15% 5%, 85% 0, 100% 25%, 80% 85%, 15% 95%); 
                background: linear-gradient(135deg, #858b8f 0%, #4a4f52 15%, #24282a 42%, #0b0d0e 78%, #414649 100%); 
                filter: drop-shadow(-2px 3px 5px rgba(0,0,0,.85)); 
            }
            
            .camera-intro-rotating-ring { 
                z-index: 6; 
                position: absolute; 
                inset: 5.5%; 
                border-radius: 50%; 
                background: transparent; 
                border: 10px solid #17191b; 
                box-shadow: inset 0 2px 4px rgba(255,255,255,.18), 0 3px 7px rgba(0,0,0,.4); 
                will-change: transform; 
            }
            .camera-intro-ticks { 
                z-index: 7; 
                position: absolute; 
                inset: 5.5%; 
                border-radius: 50%; 
                pointer-events: none; 
                opacity: 0.8; 
            }
            .camera-intro-ticks::before { 
                content: ""; 
                position: absolute; 
                inset: 0; 
                border-radius: 50%; 
                background: repeating-conic-gradient(from 0deg, rgba(255,255,255,0.4) 0deg 0.2deg, transparent 0.2deg 2deg); 
                -webkit-mask: radial-gradient(transparent 96%, #000 97%); 
                mask: radial-gradient(transparent 96%, #000 97%); 
            }
            .camera-intro-markings { 
                z-index: 8; 
                position: absolute; 
                inset: 0; 
                border-radius: 50%; 
                color: rgba(255, 255, 255, 0.95); 
                font: 600 clamp(7px, 1vw, 10px) 'Orbitron', sans-serif; 
                pointer-events: none; 
                will-change: transform; 
            }
            .camera-intro-mark { position: absolute; white-space: nowrap; text-align: center; }
            
            .camera-intro-mark-tr  { left: 80%; top: 20%; transform: translate(-50%, -50%) rotate(45deg); }
            .camera-intro-mark-r   { left: 92.5%; top: 50%; transform: translate(-100%, -50%) rotate(-90deg); } 
            .camera-intro-mark-br  { left: 80%; top: 80%; transform: translate(-50%, -50%) rotate(-45deg); }
            .camera-intro-mark-bot { left: 50%; top: 92.5%; transform: translate(-50%, -100%); }
            .camera-intro-mark-bl  { left: 20%; top: 80%; transform: translate(-50%, -50%) rotate(45deg); }
            .camera-intro-mark-l   { left: 7.5%; top: 50%; transform: translate(0, -50%) rotate(90deg); } 
            .camera-intro-mark-tl  { left: 20%; top: 20%; transform: translate(-50%, -50%) rotate(-45deg); }
            .camera-intro-outer-rim { z-index: 9; position: absolute; inset: 2%; border-radius: 50%; border: 2px solid rgba(255,255,255,.17); pointer-events: none; }
        </style>

        <section class="camera-intro-stage">
            <div class="camera-intro-lens">
                <div class="camera-intro-outer-glow"></div>
                <div class="camera-intro-outer-rim"></div>

                <div class="camera-intro-markings">
                    <span class="camera-intro-mark camera-intro-mark-tr">1:1.4</span>
                    <span class="camera-intro-mark camera-intro-mark-r">50mm</span>
                    <span class="camera-intro-mark camera-intro-mark-br">CYBER</span>
                    <span class="camera-intro-mark camera-intro-mark-bot">∞</span>
                    <span class="camera-intro-mark camera-intro-mark-bl">AF</span>
                    <span class="camera-intro-mark camera-intro-mark-l">MF</span>
                    <span class="camera-intro-mark camera-intro-mark-tl">82mm</span>
                </div>
                <div class="camera-intro-ticks"></div>
                <div class="camera-intro-rotating-ring"></div>
                <div class="camera-intro-inner-housing"></div>
                
                <div class="camera-intro-image">
                    <img id="photographer-profile-image" src="assets/images/profile.jpg" alt="Photographer Profile Photo">
                </div>
                
                <div class="camera-intro-inner-rgb"></div>
                <div class="camera-intro-aperture"></div>
            </div>
        </section>
        `;

        this.lens = this.root.querySelector(".camera-intro-lens");
        this.aperture = this.root.querySelector(".camera-intro-aperture");
        this.image = this.root.querySelector(".camera-intro-image");
        this.rotatingRing = this.root.querySelector(".camera-intro-rotating-ring");
        this.innerRgb = this.root.querySelector(".camera-intro-inner-rgb");
        this.outerGlow = this.root.querySelector(".camera-intro-outer-glow");
        this.markingsText = this.root.querySelector(".camera-intro-markings");
        this.stage = this.root.querySelector(".camera-intro-stage");

        this.currentScale = 0; this.targetRotX = 0; this.targetRotY = 0; this.currentRotX = 0; this.currentRotY = 0;

        this.blades = [];
        for (let i = 0; i < 10; i++) {
            const blade = document.createElement("div");
            blade.className = "camera-intro-blade";
            this.aperture.appendChild(blade);
            this.blades.push(blade);
        }

        const handleInteraction = (clientX, clientY) => {
            if (this.currentScale < 1) return; 
            const rect = this.stage.getBoundingClientRect();
            const x = clientX - rect.left; const y = clientY - rect.top;
            const centerX = rect.width / 2; const centerY = rect.height / 2;
            this.targetRotX = ((centerY - y) / centerY) * 10; 
            this.targetRotY = ((x - centerX) / centerX) * 10; 
        };

        this.stage.addEventListener('mousemove', (e) => handleInteraction(e.clientX, e.clientY));
        this.start();
    }

    start() {
        const startTime = performance.now();
        const scaleDuration = 2400; 
        const openDuration = 1800;  

        const frame = (now) => {
            const elapsed = now - startTime;

            if (elapsed <= scaleDuration) {
                let t = elapsed / scaleDuration;
                this.currentScale = this.easeOutBack(t); 
                this.lens.style.transform = `scale(${this.currentScale})`;
                requestAnimationFrame(frame);
                return;
            }

            this.currentScale = 1; 
            let phase2Elapsed = elapsed - scaleDuration;
            let t = Math.min(1, phase2Elapsed / openDuration);
            const openProgress = 1 - Math.pow(1 - t, 4);

            this.blades.forEach((blade, index) => {
                const baseAngle = index * 36;
                const distance = openProgress * 82;
                const tilt = 10 + (openProgress * 30); 
                const bladeRotation = baseAngle + (openProgress * 65); 
                blade.style.transform = `rotate(${bladeRotation}deg) translateX(${distance}%) rotate(${tilt}deg)`;
                blade.style.opacity = t > 0.65 ? Math.max(0, 1 - ((t - 0.65) / 0.35)) : 1;
            });

            let imageProgress = Math.max(0, (t - 0.1) / 0.9);
            imageProgress = 1 - Math.pow(1 - imageProgress, 3);
            this.image.style.transform = `scale(${0.2 + (imageProgress * 0.8)})`;
            this.image.style.opacity = imageProgress;

            let ringRot = openProgress * 360; 
            let innerRot = openProgress * -360; 
            
            this.rotatingRing.style.transform = `rotate(${ringRot}deg)`;
            this.markingsText.style.transform = `rotate(${ringRot}deg)`;

            let rgbProgress = Math.max(0, (t - 0.3) / 0.7);
            this.innerRgb.style.opacity = rgbProgress;
            this.outerGlow.style.opacity = rgbProgress * 0.8;
            this.innerRgb.style.transform = `rotate(${innerRot}deg)`;
            this.outerGlow.style.transform = `rotate(${ringRot * -0.5}deg) scale(${1 + rgbProgress * 0.05})`;

            if (t < 1) {
                this.lens.style.transform = `scale(1) perspective(1200px) rotateX(${this.currentRotX}deg) rotateY(${this.currentRotY}deg)`;
                requestAnimationFrame(frame);
            } else {
                this.finalRotation(ringRot, innerRot);
            }
        };
        requestAnimationFrame(frame);
    }

    finalRotation(currentRingAngle, currentInnerAngle) {
        let last = performance.now();
        let ringRotation = currentRingAngle;
        let innerRotation = currentInnerAngle;

        const rotate = (now) => {
            const delta = now - last; last = now;
            ringRotation += delta * 0.01;           
            innerRotation -= delta * 0.02;         
            
            this.rotatingRing.style.transform = `rotate(${ringRotation}deg)`;
            this.markingsText.style.transform = `rotate(${ringRotation}deg)`;
            this.innerRgb.style.transform = `rotate(${innerRotation}deg)`;
            
            this.currentRotX += (this.targetRotX - this.currentRotX) * 0.08;
            this.currentRotY += (this.targetRotY - this.currentRotY) * 0.08;
            this.lens.style.transform = `scale(1) perspective(1200px) rotateX(${this.currentRotX}deg) rotateY(${this.currentRotY}deg)`;

            requestAnimationFrame(rotate);
        };
        requestAnimationFrame(rotate);
    }
    easeOutBack(t) { return 1 + 2.2 * Math.pow(t - 1, 3) + 1.2 * Math.pow(t - 1, 2); }
}
customElements.define("camera-intro", CameraIntro);