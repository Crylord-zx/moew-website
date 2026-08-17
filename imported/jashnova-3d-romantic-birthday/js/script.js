/**
 * BIRTHDAY WEBSITE - INTERACTIVE STEP ENGINE
 * Dedicated to Someone Special ❤️ | Forever & Ever Yours
 */

document.addEventListener('DOMContentLoaded', () => {
  const CONFIG = window.BIRTHDAY_CONFIG || {};
  const chapters = CONFIG.chapters || [];
  let currentStep = 0;
  let autoPlayTimer = null;
  let isAutoPlaying = false;
  let candlesBlown = false;

  // --------------------------------------------------------------------------
  // 00. PASSCODE PROTECTION GATE ENGINE (PIN: 1234)
  // --------------------------------------------------------------------------
  const passcodeScreen = document.getElementById('passcodeScreen');
  const passcodePrompt = document.getElementById('passcodePrompt');
  const pinDisplayBoxes = document.getElementById('pinDisplayBoxes');
  const keypadGrid = document.getElementById('keypadGrid');
  const pinBoxes = document.querySelectorAll('.pin-box');
  const CORRECT_PASSCODE = "1234";
  let enteredPin = "";
  let isUnlocked = false;

  function updatePinBoxes() {
    pinBoxes.forEach((box, index) => {
      if (index < enteredPin.length) {
        box.classList.add('filled');
      } else {
        box.classList.remove('filled');
      }
    });
  }

  function handleKeyInput(val) {
    if (isUnlocked) return;

    if (val === 'del') {
      if (enteredPin.length > 0) {
        enteredPin = enteredPin.slice(0, -1);
        updatePinBoxes();
      }
      return;
    }

    if (val === '*' || enteredPin.length >= 4) return;

    enteredPin += val;
    updatePinBoxes();

    if (enteredPin.length === 4) {
      if (enteredPin === CORRECT_PASSCODE) {
        // SUCCESS UNLOCK
        isUnlocked = true;
        if (pinDisplayBoxes) pinDisplayBoxes.classList.add('success');
        if (passcodePrompt) passcodePrompt.textContent = "✨ Passcode Correct! Opening Birthday Site… 💖";

        if (typeof confetti === 'function') {
          confetti({
            particleCount: 150,
            spread: 90,
            origin: { y: 0.5 },
            colors: ['#e8547a', '#d4956a', '#f9b8cb', '#fff8fb']
          });
        }

        setTimeout(() => {
          if (typeof gsap !== 'undefined' && passcodeScreen) {
            gsap.to(passcodeScreen, {
              opacity: 0,
              scale: 1.08,
              duration: 0.8,
              ease: 'power2.inOut',
              onComplete: () => {
                passcodeScreen.style.display = 'none';
              }
            });
          } else if (passcodeScreen) {
            passcodeScreen.style.display = 'none';
          }
        }, 500);

      } else {
        // ERROR WRONG PIN
        if (pinDisplayBoxes) pinDisplayBoxes.classList.add('error-shake');
        if (passcodePrompt) passcodePrompt.textContent = "Incorrect Passcode! Try 1234 ❤️";

        setTimeout(() => {
          enteredPin = "";
          updatePinBoxes();
          if (pinDisplayBoxes) pinDisplayBoxes.classList.remove('error-shake');
          if (passcodePrompt) passcodePrompt.textContent = "Enter secret passcode to unlock your special surprise ❤️";
        }, 800);
      }
    }
  }

  if (keypadGrid) {
    keypadGrid.addEventListener('click', (e) => {
      const btn = e.target.closest('.key-btn');
      if (btn) {
        const val = btn.getAttribute('data-val');
        handleKeyInput(val);
      }
    });
  }

  // Physical Keyboard listener
  document.addEventListener('keydown', (e) => {
    if (!passcodeScreen || passcodeScreen.style.display === 'none') return;
    if (e.key >= '0' && e.key <= '9') {
      handleKeyInput(e.key);
    } else if (e.key === 'Backspace') {
      handleKeyInput('del');
    }
  });

  // --------------------------------------------------------------------------
  // 0. GIFT LOADER & UNWRAPPING ANIMATION ENGINE
  // --------------------------------------------------------------------------
  const giftLoader = document.getElementById('giftLoader');
  const loaderBar = document.getElementById('loaderBar');
  const giftBoxStage = document.getElementById('giftBoxStage');
  const giftLidGroup = document.getElementById('giftLidGroup');
  const openGiftBtn = document.getElementById('openGiftBtn');
  let isGiftOpened = false;

  // Animate Loader Progress Bar
  if (loaderBar) {
    gsap.to(loaderBar, {
      width: '100%',
      duration: 1.8,
      ease: 'power1.inOut',
      onComplete: () => {
        if (openGiftBtn) openGiftBtn.classList.add('ready');
      }
    });
  }

  function openGiftSurprise() {
    if (isGiftOpened) return;
    isGiftOpened = true;

    // 1. Lid Fly Open Physics
    if (giftLidGroup) {
      gsap.to(giftLidGroup, {
        y: -140,
        x: -20,
        rotation: -35,
        opacity: 0,
        duration: 0.75,
        ease: 'back.out(1.8)'
      });
    }

    // 2. Confetti Cannon Explosions
    if (typeof confetti === 'function') {
      confetti({
        particleCount: 160,
        spread: 90,
        origin: { y: 0.5 },
        colors: ['#e8547a', '#d4956a', '#f9b8cb', '#c2607a', '#fff8fb']
      });
    }

    // 3. Zoom Out Loader Screen & Reveal Hero Cover
    if (giftLoader) {
      gsap.to(giftLoader, {
        scale: 1.15,
        opacity: 0,
        duration: 0.85,
        delay: 0.4,
        ease: 'power3.in',
        onComplete: () => {
          giftLoader.style.display = 'none';
          playAudio();
        }
      });
    }
  }

  if (giftBoxStage) giftBoxStage.addEventListener('click', openGiftSurprise);
  if (openGiftBtn) openGiftBtn.addEventListener('click', openGiftSurprise);

  // --------------------------------------------------------------------------
  // 1. POPULATE INITIAL DYNAMIC CONFIG
  // --------------------------------------------------------------------------
  const dateTagEls = document.querySelectorAll('.dynamic-datetag');
  dateTagEls.forEach(el => el.textContent = CONFIG.dateTag || 'SPECIAL DAY');

  // Populate Dropdown Chapter Select
  const chapterSelect = document.getElementById('chapterSelect');
  if (chapterSelect && chapters.length > 0) {
    chapterSelect.innerHTML = chapters.map((ch, idx) => `
      <option value="${idx}">Chapter ${ch.id}: ${ch.date} — ${ch.title.replace(/<[^>]*>?/gm, '')}</option>
    `).join('');

    chapterSelect.addEventListener('change', (e) => {
      goToStep(parseInt(e.target.value, 10));
    });
  }

  // Populate Step Scrubber Dots
  const stepDotsContainer = document.getElementById('stepDots');
  if (stepDotsContainer && chapters.length > 0) {
    stepDotsContainer.innerHTML = chapters.map((_, idx) => `
      <div class="step-dot ${idx === 0 ? 'active' : ''}" data-index="${idx}" title="Chapter ${idx + 1}"></div>
    `).join('');

    stepDotsContainer.addEventListener('click', (e) => {
      const dot = e.target.closest('.step-dot');
      if (dot) {
        const idx = parseInt(dot.getAttribute('data-index'), 10);
        goToStep(idx);
      }
    });
  }

  // --------------------------------------------------------------------------
  // 2. LIVE TIME CALCULATOR FOR SPECIAL DAY
  // --------------------------------------------------------------------------
  const birthDateStr = CONFIG.birthDate || "2005-08-13T00:00:00";
  const BIRTH_DATE = new Date(birthDateStr);

  function updateLiveReadout() {
    const now = new Date();
    let years = now.getFullYear() - BIRTH_DATE.getFullYear();
    const anniv = new Date(BIRTH_DATE);
    anniv.setFullYear(now.getFullYear());
    if (now < anniv) {
      years--;
      anniv.setFullYear(now.getFullYear() - 1);
    }
    const diffMs = now - anniv;
    const totalSec = Math.floor(diffMs / 1000);
    const days = Math.floor(totalSec / 86400);
    const hours = Math.floor((totalSec % 86400) / 3600);
    const mins = Math.floor((totalSec % 3600) / 60);
    const secs = totalSec % 60;

    const readoutEl = document.getElementById('liveReadout');
    if (readoutEl) {
      readoutEl.textContent = `Endless Love · ${days} Days · ${String(hours).padStart(2, '0')}h : ${String(mins).padStart(2, '0')}m : ${String(secs).padStart(2, '0')}s`;
    }
  }
  updateLiveReadout();
  setInterval(updateLiveReadout, 1000);

  // --------------------------------------------------------------------------
  // 3. STEP ENGINE RENDERER (NO NEED TO SCROLL)
  // --------------------------------------------------------------------------
  const heroCover = document.getElementById('heroCover');
  const storyApp = document.getElementById('storyApp');
  const stepCardWrapper = document.getElementById('stepCardWrapper');

  const stepBadge = document.getElementById('stepBadge');
  const stepDate = document.getElementById('stepDate');
  const stepTitle = document.getElementById('stepTitle');
  const stepSubtitle = document.getElementById('stepSubtitle');
  const stepText = document.getElementById('stepText');
  const stepSignature = document.getElementById('stepSignature');
  const stepPhotoFrame = document.getElementById('stepPhotoFrame');
  const progressBar = document.getElementById('progressBar');
  const chapterProgressBadge = document.getElementById('chapterProgressBadge');

  const prevStepBtn = document.getElementById('prevStepBtn');
  const nextStepBtn = document.getElementById('nextStepBtn');

  function renderStep(index) {
    if (index < 0 || index >= chapters.length) return;
    currentStep = index;
    const ch = chapters[index];

    // GSAP Outward Animation
    gsap.to(stepCardWrapper, {
      opacity: 0,
      y: 20,
      scale: 0.98,
      duration: 0.25,
      ease: 'power2.in',
      onComplete: () => {
        // Update Text Content
        if (stepBadge) stepBadge.textContent = ch.badge || `CHAPTER ${String(ch.id).padStart(2, '0')}`;
        if (stepDate) stepDate.textContent = ch.date || '';
        if (stepTitle) stepTitle.innerHTML = ch.title || '';
        if (stepSubtitle) stepSubtitle.textContent = ch.subtitle || '';
        if (stepText) stepText.innerHTML = ch.text || '';
        if (stepSignature) stepSignature.textContent = ch.signature || 'Forever & Ever Yours ❤️';

        // Update Photos Frame with Featured Image + Interactive Thumbnails
        if (stepPhotoFrame) {
          stepPhotoFrame.innerHTML = '';
          const imgs = (ch.images && ch.images.length > 0) ? ch.images : ["/imported/jashnova-3d-romantic-birthday/images/moonlight.webp"];
          
          // Main featured photo frame
          const mainPhotoDiv = document.createElement('div');
          mainPhotoDiv.className = 'step-photo-item single-photo';
          mainPhotoDiv.innerHTML = `
            <img id="mainStepImg" src="${imgs[0]}" alt="${ch.date} Memory" draggable="false">
            <div class="photo-zoom-hint">🔍 Tap photo to expand full size</div>
          `;
          mainPhotoDiv.addEventListener('click', () => {
            const currentSrc = document.getElementById('mainStepImg')?.src || imgs[0];
            openPhotoModal(currentSrc, `${ch.date} — ${ch.title.replace(/<[^>]*>?/gm, '')}`);
          });
          stepPhotoFrame.appendChild(mainPhotoDiv);

          // Render thumbnail row if multiple photos exist for this chapter
          if (imgs.length > 1) {
            const thumbsRow = document.createElement('div');
            thumbsRow.className = 'chapter-thumbs-row';

            imgs.forEach((imgSrc, idx) => {
              const thumb = document.createElement('div');
              thumb.className = `thumb-item ${idx === 0 ? 'active' : ''}`;
              thumb.innerHTML = `<img src="${imgSrc}" alt="Thumbnail ${idx + 1}" draggable="false">`;
              
              thumb.addEventListener('click', (e) => {
                e.stopPropagation();
                const mainImg = document.getElementById('mainStepImg');
                if (mainImg) {
                  if (typeof gsap !== 'undefined') {
                    gsap.to(mainImg, {
                      opacity: 0,
                      scale: 0.96,
                      duration: 0.15,
                      onComplete: () => {
                        mainImg.src = imgSrc;
                        gsap.to(mainImg, { opacity: 1, scale: 1, duration: 0.25 });
                      }
                    });
                  } else {
                    mainImg.src = imgSrc;
                  }
                }
                const allThumbs = thumbsRow.querySelectorAll('.thumb-item');
                allThumbs.forEach((t, i) => {
                  t.classList.toggle('active', i === idx);
                });
              });
              thumbsRow.appendChild(thumb);
            });
            stepPhotoFrame.appendChild(thumbsRow);
          }
        }

        // Update Navigation & Progress Bar
        const progressPct = ((index + 1) / chapters.length) * 100;
        if (progressBar) progressBar.style.width = `${progressPct}%`;
        if (chapterProgressBadge) chapterProgressBadge.textContent = `Chapter ${index + 1} / ${chapters.length}`;
        if (chapterSelect) chapterSelect.value = index;

        // Update Dots
        const dots = document.querySelectorAll('.step-dot');
        dots.forEach((dot, idx) => {
          dot.classList.toggle('active', idx === index);
        });

        // Update Prev / Next Buttons State
        if (prevStepBtn) prevStepBtn.disabled = index === 0;
        if (nextStepBtn) {
          if (index === chapters.length - 1) {
            nextStepBtn.innerHTML = '<span class="btn-text-desktop">🎂 Blow Birthday Candles! →</span><span class="btn-text-mobile">🎂 Candles!</span>';
            nextStepBtn.classList.add('glow-final-btn');
          } else {
            nextStepBtn.innerHTML = '<span class="btn-text-desktop">Next Chapter →</span><span class="btn-text-mobile">Next →</span>';
            nextStepBtn.classList.remove('glow-final-btn');
          }
        }

        // GSAP Inward Animation
        gsap.fromTo(stepCardWrapper,
          { opacity: 0, y: -20, scale: 0.98 },
          { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: 'power2.out' }
        );
      }
    });
  }

  function goToStep(index) {
    if (index >= chapters.length) {
      openCakeModal();
      return;
    }
    renderStep(index);
  }

  function prevStep() {
    if (currentStep > 0) {
      goToStep(currentStep - 1);
    }
  }

  function nextStep() {
    if (currentStep < chapters.length - 1) {
      goToStep(currentStep + 1);
    } else {
      openCakeModal();
    }
  }

  // Start Button Event
  const startStoryBtn = document.getElementById('startStoryBtn');
  if (startStoryBtn) {
    startStoryBtn.addEventListener('click', () => {
      gsap.to(heroCover, {
        opacity: 0,
        scale: 1.05,
        duration: 0.5,
        ease: 'power2.in',
        onComplete: () => {
          heroCover.style.display = 'none';
          storyApp.style.display = 'flex';
          renderStep(0);
          playAudio();
        }
      });
    });
  }

  // Back to Hero Cover
  const backToHeroBtn = document.getElementById('backToHeroBtn');
  if (backToHeroBtn) {
    backToHeroBtn.addEventListener('click', () => {
      storyApp.style.display = 'none';
      heroCover.style.display = 'flex';
      heroCover.style.opacity = '1';
      heroCover.style.transform = 'scale(1)';
      stopAutoPlay();
    });
  }

  // Controls Event Listeners
  if (prevStepBtn) prevStepBtn.addEventListener('click', prevStep);
  if (nextStepBtn) nextStepBtn.addEventListener('click', nextStep);

  // Keyboard Shortcuts (Arrow keys & Space)
  document.addEventListener('keydown', (e) => {
    if (storyApp && storyApp.style.display !== 'none') {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        nextStep();
      } else if (e.key === 'ArrowLeft') {
        prevStep();
      }
    }
  });

  // Mobile Touch Swipe Support
  let touchStartX = 0;
  let touchEndX = 0;
  if (stepCardWrapper) {
    stepCardWrapper.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    stepCardWrapper.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      if (touchStartX - touchEndX > 50) {
        nextStep();
      } else if (touchEndX - touchStartX > 50) {
        prevStep();
      }
    }, { passive: true });
  }

  // Auto-Play Feature
  const autoPlayBtn = document.getElementById('autoPlayBtn');
  function toggleAutoPlay() {
    if (isAutoPlaying) {
      stopAutoPlay();
    } else {
      startAutoPlay();
    }
  }

  function startAutoPlay() {
    isAutoPlaying = true;
    if (autoPlayBtn) {
      autoPlayBtn.innerHTML = '<span>⏸ Pause Auto</span>';
      autoPlayBtn.classList.add('active');
    }
    autoPlayTimer = setInterval(() => {
      if (currentStep < chapters.length - 1) {
        nextStep();
      } else {
        stopAutoPlay();
        openCakeModal();
      }
    }, 7000);
  }

  function stopAutoPlay() {
    isAutoPlaying = false;
    if (autoPlayTimer) clearInterval(autoPlayTimer);
    if (autoPlayBtn) {
      autoPlayBtn.innerHTML = '<span>▶ Auto Play</span>';
      autoPlayBtn.classList.remove('active');
    }
  }

  if (autoPlayBtn) autoPlayBtn.addEventListener('click', toggleAutoPlay);

  // --------------------------------------------------------------------------
  // 4. PHOTO LIGHTBOX MODAL
  // --------------------------------------------------------------------------
  const photoModal = document.getElementById('photoModal');
  const modalBackdrop = document.getElementById('modalBackdrop');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalImg = document.getElementById('modalImg');
  const modalCaption = document.getElementById('modalCaption');

  function openPhotoModal(src, caption) {
    if (!photoModal || !modalImg) return;
    modalImg.src = src;
    if (modalCaption) modalCaption.textContent = caption || 'Special Memories ❤️';
    photoModal.classList.add('active');
    photoModal.setAttribute('aria-hidden', 'false');
  }

  function closePhotoModal() {
    if (!photoModal) return;
    photoModal.classList.remove('active');
    photoModal.setAttribute('aria-hidden', 'true');
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closePhotoModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closePhotoModal);

  // --------------------------------------------------------------------------
  // 5. SECRET WAX SEAL ENVELOPE MODAL
  // --------------------------------------------------------------------------
  const envelopeModal = document.getElementById('envelopeModal');
  const openLetterModalBtn = document.getElementById('openLetterModalBtn');
  const closeEnvelopeModalBtn = document.getElementById('closeEnvelopeModalBtn');
  const envelopeBackdrop = document.getElementById('envelopeBackdrop');
  const envelopeWrapper = document.getElementById('envelopeWrapper');
  const waxSeal = document.getElementById('waxSeal');
  const foldLetterBtn = document.getElementById('foldLetterBtn');

  function openEnvelopeModal() {
    if (envelopeModal) {
      envelopeModal.classList.add('active');
      envelopeModal.setAttribute('aria-hidden', 'false');
    }
  }

  function closeEnvelopeModal() {
    if (envelopeModal) {
      envelopeModal.classList.remove('active');
      envelopeModal.setAttribute('aria-hidden', 'true');
      if (envelopeWrapper) envelopeWrapper.classList.remove('is-open');
    }
  }

  if (openLetterModalBtn) openLetterModalBtn.addEventListener('click', openEnvelopeModal);
  if (closeEnvelopeModalBtn) closeEnvelopeModalBtn.addEventListener('click', closeEnvelopeModal);
  if (envelopeBackdrop) envelopeBackdrop.addEventListener('click', closeEnvelopeModal);

  if (waxSeal) {
    waxSeal.addEventListener('click', () => {
      if (envelopeWrapper) envelopeWrapper.classList.add('is-open');
    });
  }

  if (foldLetterBtn) {
    foldLetterBtn.addEventListener('click', () => {
      if (envelopeWrapper) envelopeWrapper.classList.remove('is-open');
    });
  }

  // --------------------------------------------------------------------------
  // 6. BIRTHDAY CAKE & CANDLE BLOWING MODAL
  // --------------------------------------------------------------------------
  const cakeModal = document.getElementById('cakeModal');
  const jumpToCakeBtn = document.getElementById('jumpToCakeBtn');
  const closeCakeModalBtn = document.getElementById('closeCakeModalBtn');
  const cakeBackdrop = document.getElementById('cakeBackdrop');
  const blowBtn = document.getElementById('blow-btn');

  function openCakeModal() {
    if (cakeModal) {
      cakeModal.classList.add('active');
      cakeModal.setAttribute('aria-hidden', 'false');
      buildLights();
      flickFlames();
    }
  }

  function closeCakeModal() {
    if (cakeModal) {
      cakeModal.classList.remove('active');
      cakeModal.setAttribute('aria-hidden', 'true');
    }
  }

  if (jumpToCakeBtn) jumpToCakeBtn.addEventListener('click', openCakeModal);
  if (closeCakeModalBtn) closeCakeModalBtn.addEventListener('click', closeCakeModal);
  if (cakeBackdrop) cakeBackdrop.addEventListener('click', closeCakeModal);

  function buildLights() {
    const row = document.getElementById('cake-lights');
    if (!row || row.children.length > 1) return;
    const cols = ['#e8547a', '#d4956a', '#f9b8cb', '#c2607a', '#d4a0c0', '#f5c9a0'];
    for (let i = 0; i < 28; i++) {
      const b = document.createElement('div');
      b.className = 'light-bulb';
      const c = cols[i % cols.length];
      b.style.cssText = `background:${c};color:${c};width:12px;height:16px;animation-delay:${(Math.random() * 2).toFixed(2)}s;animation-duration:${(1 + Math.random()).toFixed(2)}s;`;
      row.appendChild(b);
    }
  }

  function flickFlames() {
    ['fl1', 'fl2', 'fl3'].forEach((id, i) => {
      const el = document.getElementById(id);
      if (!el) return;
      const go = () => {
        if (candlesBlown) return;
        if (typeof gsap !== 'undefined') {
          gsap.to(el, {
            scaleX: 0.75 + Math.random() * 0.5,
            scaleY: 0.8 + Math.random() * 0.35,
            x: (Math.random() - 0.5) * 3,
            duration: 0.12 + Math.random() * 0.18,
            ease: 'power1.inOut',
            onComplete: go
          });
        }
      };
      setTimeout(go, i * 100);
    });
  }

  const soloPhotosList = [
    "/imported/jashnova-3d-romantic-birthday/images/spring.webp",
    "/imported/jashnova-3d-romantic-birthday/images/beach.webp",
    "/imported/jashnova-3d-romantic-birthday/images/coffee.webp",
    "/imported/jashnova-3d-romantic-birthday/images/moonlight.webp",
    "/imported/jashnova-3d-romantic-birthday/images/song.webp",
    "/imported/jashnova-3d-romantic-birthday/images/sunrise.webp",
    "/imported/jashnova-3d-romantic-birthday/images/autumn.webp",
    "/imported/jashnova-3d-romantic-birthday/images/theater.webp"
  ];

  function blowCandles() {
    if (candlesBlown) return;
    candlesBlown = true;

    const flames = document.getElementById('flames');
    if (typeof gsap !== 'undefined') {
      gsap.to(flames, { opacity: 0, scale: 0.2, filter: 'blur(10px)', duration: 0.5, ease: 'power2.in' });
    } else if (flames) {
      flames.style.display = 'none';
    }

    if (blowBtn) {
      blowBtn.textContent = '🌸 Wish Made! Happy Birthday My Special One! 🌸';
      blowBtn.style.background = 'linear-gradient(135deg, #e8547a 0%, #c2607a 100%)';
      blowBtn.style.color = '#fff8fb';
    }

    // 1. Canvas Confetti Cannon Explosions
    if (typeof confetti === 'function') {
      confetti({
        particleCount: 220,
        spread: 110,
        origin: { y: 0.6 },
        colors: ['#e8547a', '#d4956a', '#f9b8cb', '#c2607a', '#d4a0c0', '#fff8fb']
      });

      setTimeout(() => confetti({ particleCount: 120, angle: 60, spread: 75, origin: { x: 0, y: 0.6 }, colors: ['#e8547a', '#d4956a', '#fff8fb'] }), 350);
      setTimeout(() => confetti({ particleCount: 120, angle: 120, spread: 75, origin: { x: 1, y: 0.6 }, colors: ['#f9b8cb', '#c2607a', '#d4956a'] }), 650);
      setTimeout(() => confetti({ particleCount: 180, spread: 130, origin: { y: 0.5 }, colors: ['#e8547a', '#f5c9a0', '#fff8fb'] }), 1000);
    }

    // 2. Bottom-to-Top Floating Solo Image Particles
    for (let i = 0; i < 22; i++) {
      setTimeout(() => {
        const imgSrc = soloPhotosList[i % soloPhotosList.length];
        spawnSoloParticle(imgSrc);
      }, i * 140);
    }

    // 3. Bottom-to-Top Floating Hearts & Sparkles Particles
    for (let i = 0; i < 28; i++) {
      setTimeout(() => spawnHeart(Math.random() * 92, 100), i * 110);
    }
  }

  if (blowBtn) blowBtn.addEventListener('click', blowCandles);

  function spawnSoloParticle(src) {
    const el = document.createElement('div');
    el.className = 'solo-particle-item';
    const leftPx = 5 + Math.random() * 85;
    const sizePx = 42 + Math.random() * 28; // 42px to 70px
    const durSec = 4.2 + Math.random() * 2.8;

    el.style.left = `${leftPx}%`;
    el.style.width = `${sizePx}px`;
    el.style.height = `${sizePx}px`;
    el.style.animationDuration = `${durSec}s`;

    const img = document.createElement('img');
    img.src = src;
    img.alt = 'Special Memory';
    el.appendChild(img);

    document.body.appendChild(el);
    setTimeout(() => el.remove(), durSec * 1000 + 200);
  }

  function spawnHeart(xp, yp) {
    const e = document.createElement('div');
    e.className = 'float-el';
    e.textContent = ['💖', '💕', '💗', '🌸', '✨', '🎂', '👑', '🎉'][Math.floor(Math.random() * 8)];
    const dur = 3.8 + Math.random() * 2.5;
    e.style.cssText = `position:fixed;left:${xp}%;top:${yp}%;font-size:${1.4 + Math.random() * 1.6}rem;z-index:9999;pointer-events:none;animation:floatUp ${dur}s ease-out forwards;`;
    document.body.appendChild(e);
    setTimeout(() => e.remove(), dur * 1000 + 200);
  }

  // --------------------------------------------------------------------------
  // 7. BACKGROUND AUDIO ENGINE & VINYL WIDGET SYNC
  // --------------------------------------------------------------------------
  const audioPill = document.getElementById('audioPill');
  const vinylWidget = document.getElementById('vinylWidget');
  const vinylPlayBtn = document.getElementById('vinylPlayBtn');
  const vinylDisc = document.getElementById('vinylDisc');
  const vinylStatus = document.getElementById('vinylStatus');

  let audioEl = null;
  let isPlaying = false;

  function syncAudioUI(playing) {
    if (audioPill) audioPill.classList.toggle('paused', !playing);
    if (vinylDisc) vinylDisc.classList.toggle('playing', playing);
    if (vinylPlayBtn) vinylPlayBtn.textContent = playing ? '❚❚' : '▶';
    if (vinylStatus) vinylStatus.textContent = playing ? 'Playing 🎵' : 'Tap to play';
  }

  function playAudio() {
    if (audioEl && !isPlaying) {
      audioEl.play().then(() => {
        isPlaying = true;
        syncAudioUI(true);
      }).catch(() => {});
    }
  }

  function toggleMusic() {
    if (!audioEl) return;
    if (isPlaying) {
      audioEl.pause();
      isPlaying = false;
      syncAudioUI(false);
    } else {
      playAudio();
    }
  }

  if (CONFIG.audio && CONFIG.audio.enabled) {
    audioEl = new Audio(CONFIG.audio.src);
    audioEl.loop = true;

    if (audioPill) audioPill.addEventListener('click', toggleMusic);
    if (vinylWidget) vinylWidget.addEventListener('click', toggleMusic);

    document.addEventListener('click', () => {
      playAudio();
    }, { once: true });
  }

  // --------------------------------------------------------------------------
  // 7.1 TYPEWRITER QUOTE ANIMATION LOOP
  // --------------------------------------------------------------------------
  const typingTextEl = document.getElementById('typingText');
  if (typingTextEl) {
    const quotes = [
      "I love you more than words…",
      "Every single moment with you is magic…",
      "You are my safest place and endless joy…",
      "Happy Birthday to my favorite person ❤️"
    ];
    let quoteIdx = 0;
    let charIdx = 0;
    let isDeleting = false;

    function typeLoop() {
      const currentQuote = quotes[quoteIdx];
      if (isDeleting) {
        charIdx--;
        typingTextEl.textContent = currentQuote.substring(0, charIdx);
      } else {
        charIdx++;
        typingTextEl.textContent = currentQuote.substring(0, charIdx);
      }

      let speed = isDeleting ? 35 : 75;

      if (!isDeleting && charIdx === currentQuote.length) {
        speed = 2200;
        isDeleting = true;
      } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        quoteIdx = (quoteIdx + 1) % quotes.length;
        speed = 500;
      }

      setTimeout(typeLoop, speed);
    }
    typeLoop();
  }

  // --------------------------------------------------------------------------
  // 7.2 TOP LUXURY HEADER NAV LINKS
  // --------------------------------------------------------------------------
  const navLetterLink = document.getElementById('navLetterLink');
  const navMomentsLink = document.getElementById('navMomentsLink');
  const navGalleryLink = document.getElementById('navGalleryLink');
  const navCakeLink = document.getElementById('navCakeLink');

  if (navLetterLink) navLetterLink.addEventListener('click', openEnvelopeModal);
  if (navMomentsLink) navMomentsLink.addEventListener('click', () => {
    if (startStoryBtn) startStoryBtn.click();
  });
  if (navGalleryLink) navGalleryLink.addEventListener('click', openGalleryModal);
  if (navCakeLink) navCakeLink.addEventListener('click', openCakeModal);

  // --------------------------------------------------------------------------
  // 8. 4-ROW MOVING PHOTO MARQUEE WALL ENGINE
  // --------------------------------------------------------------------------
  const marqueeGalleryModal = document.getElementById('marqueeGalleryModal');
  const openGalleryModalBtn = document.getElementById('openGalleryModalBtn');
  const closeGalleryModalBtn = document.getElementById('closeGalleryModalBtn');
  const galleryBackdrop = document.getElementById('galleryBackdrop');

  const row1Images = [
    { src: "/imported/jashnova-3d-romantic-birthday/images/spring.webp", caption: "Spring Bloom — Warm Memories" },
    { src: "/imported/jashnova-3d-romantic-birthday/images/coffee.webp", caption: "Cozy Coffee Dates & Conversations" },
    { src: "/imported/jashnova-3d-romantic-birthday/images/sunrise.webp", caption: "Golden Sunrise Together" },
    { src: "/imported/jashnova-3d-romantic-birthday/images/theater.webp", caption: "Movie & Magic Moments" }
  ];

  const row2Images = [
    { src: "/imported/jashnova-3d-romantic-birthday/images/beach.webp", caption: "Sunset Walk By The Sea" },
    { src: "/imported/jashnova-3d-romantic-birthday/images/moonlight.webp", caption: "Starlit Night & Quiet Whispers" },
    { src: "/imported/jashnova-3d-romantic-birthday/images/autumn.webp", caption: "Autumn Breezes & Warm Embraces" },
    { src: "/imported/jashnova-3d-romantic-birthday/images/song.webp", caption: "Melodies of Love & Joy" }
  ];

  const row3Images = [
    { src: "/imported/jashnova-3d-romantic-birthday/images/sunrise.webp", caption: "New Horizons Together" },
    { src: "/imported/jashnova-3d-romantic-birthday/images/spring.webp", caption: "Sweetest Smiles & Laughter" },
    { src: "/imported/jashnova-3d-romantic-birthday/images/theater.webp", caption: "Cherished Times & Fun Memories" },
    { src: "/imported/jashnova-3d-romantic-birthday/images/coffee.webp", caption: "Warmth In Every Sip" }
  ];

  const row4Images = [
    { src: "/imported/jashnova-3d-romantic-birthday/images/moonlight.webp", caption: "Under The Magic Sky" },
    { src: "/imported/jashnova-3d-romantic-birthday/images/beach.webp", caption: "Ocean Waves & Soft Breeze" },
    { src: "/imported/jashnova-3d-romantic-birthday/images/song.webp", caption: "Forever In Harmony" },
    { src: "/imported/jashnova-3d-romantic-birthday/images/autumn.webp", caption: "Warm Golden Days" }
  ];

  function populateMarqueeRow(trackId, imagesList) {
    const track = document.getElementById(trackId);
    if (!track) return;
    track.innerHTML = '';

    const fullList = [...imagesList, ...imagesList, ...imagesList, ...imagesList];

    fullList.forEach(item => {
      const card = document.createElement('div');
      card.className = 'marquee-card-item';
      card.innerHTML = `
        <img src="${item.src}" alt="${item.caption}" loading="lazy" draggable="false">
      `;
      card.addEventListener('click', () => {
        openPhotoModal(item.src, item.caption);
      });
      track.appendChild(card);
    });
  }

  populateMarqueeRow('marqueeTrack1', row1Images);
  populateMarqueeRow('marqueeTrack2', row2Images);
  populateMarqueeRow('marqueeTrack3', row3Images);
  populateMarqueeRow('marqueeTrack4', row4Images);

  function openGalleryModal() {
    if (marqueeGalleryModal) {
      marqueeGalleryModal.classList.add('active');
      marqueeGalleryModal.setAttribute('aria-hidden', 'false');
      setTimeout(initGallery3DHeart, 100);
    }
  }

  function closeGalleryModal() {
    if (marqueeGalleryModal) {
      marqueeGalleryModal.classList.remove('active');
      marqueeGalleryModal.setAttribute('aria-hidden', 'true');
    }
  }

  if (openGalleryModalBtn) openGalleryModalBtn.addEventListener('click', openGalleryModal);
  if (closeGalleryModalBtn) closeGalleryModalBtn.addEventListener('click', closeGalleryModal);
  if (galleryBackdrop) galleryBackdrop.addEventListener('click', closeGalleryModal);

  const cakeGalleryBtn = document.getElementById('cakeGalleryBtn');
  if (cakeGalleryBtn) {
    cakeGalleryBtn.addEventListener('click', () => {
      closeCakeModal();
      openGalleryModal();
    });
  }

  // --------------------------------------------------------------------------
  // 10. REALISTIC 3D SWARM HEART BLAST UNLOCK ENGINE (GALLERY MODAL)
  // --------------------------------------------------------------------------
  let gallery3DHeartInit = false;

  function createSwarmHeartScene(canvas, width, height, scaleFactor = 1.0) {
    if (!canvas || typeof THREE === 'undefined') return null;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 170;

    // Studio Lights
    const ambientLight = new THREE.AmbientLight(0xfff0f5, 0.95);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
    keyLight.position.set(60, 80, 100);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xff7597, 1.8);
    rimLight.position.set(-60, -60, -60);
    scene.add(rimLight);

    const pointLight = new THREE.PointLight(0xea4c75, 3.5, 250);
    pointLight.position.set(0, 0, 80);
    scene.add(pointLight);

    // Parametric 3D Heart Surface Equation
    function getHeartPoint(t, u, scale) {
      const x = 16 * Math.pow(Math.sin(t), 3) * Math.sin(u);
      const y = (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
      const z = 16 * Math.pow(Math.sin(t), 3) * Math.cos(u);
      return new THREE.Vector3(x * scale, y * scale, z * scale);
    }

    // Mini Heart Extruded Mesh Geometry
    const shape = new THREE.Shape();
    const x0 = 0, y0 = 0;
    shape.moveTo(x0 + 2.5, y0 + 2.5);
    shape.bezierCurveTo(x0 + 2.5, y0 + 2.5, x0 + 2, y0, x0, y0);
    shape.bezierCurveTo(x0 - 3, y0, x0 - 3, y0 + 3.5, x0 - 3, y0 + 3.5);
    shape.bezierCurveTo(x0 - 3, y0 + 5.5, x0 - 1, y0 + 7.7, x0 + 2.5, y0 + 9.5);
    shape.bezierCurveTo(x0 + 6, y0 + 7.7, x0 + 8, y0 + 5.5, x0 + 8, y0 + 3.5);
    shape.bezierCurveTo(x0 + 8, y0, x0 + 7, y0, x0 + 5, y0);
    shape.bezierCurveTo(x0 + 3.5, y0, x0 + 2.5, y0 + 2.5, x0 + 2.5, y0 + 2.5);

    const extrudeSettings = {
      depth: 1.8,
      bevelEnabled: true,
      bevelSegments: 4,
      steps: 1,
      bevelSize: 0.6,
      bevelThickness: 0.6
    };
    const miniGeo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    miniGeo.center();

    const miniMat = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      emissive: 0x3d0b17,
      specular: 0xffc2d1,
      shininess: 120,
      flatShading: false
    });

    const count = 540;
    const instancedMesh = new THREE.InstancedMesh(miniGeo, miniMat, count);
    const dummy = new THREE.Object3D();

    const palette = [
      new THREE.Color(0xea4c75),
      new THREE.Color(0xff7597),
      new THREE.Color(0xe8547a),
      new THREE.Color(0xff8da6),
      new THREE.Color(0xffa0b8),
      new THREE.Color(0xc83b60)
    ];

    const basePositions = [];
    const currentPositions = [];
    const rotations = [];
    const scales = [];
    const velocities = [];

    for (let i = 0; i < count; i++) {
      const t = Math.acos(2 * Math.random() - 1);
      const u = (Math.random() - 0.5) * 2 * Math.PI;
      const jitter = 1 + (Math.random() - 0.5) * 0.18;

      const pos = getHeartPoint(t, u, 2.2 * scaleFactor * jitter);
      basePositions.push(pos.clone());
      currentPositions.push(pos.clone());

      const rot = new THREE.Euler(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      rotations.push(rot);

      const sc = 0.55 + Math.random() * 0.55;
      scales.push(sc);

      // High blast velocity vectors
      velocities.push(pos.clone().normalize().multiplyScalar(3.2 + Math.random() * 5.5));

      const col = palette[Math.floor(Math.random() * palette.length)];
      instancedMesh.setColorAt(i, col);

      dummy.position.copy(pos);
      dummy.rotation.copy(rot);
      dummy.scale.set(sc, sc, sc);
      dummy.updateMatrix();
      instancedMesh.setMatrixAt(i, dummy.matrix);
    }

    instancedMesh.instanceMatrix.needsUpdate = true;
    if (instancedMesh.instanceColor) instancedMesh.instanceColor.needsUpdate = true;

    const group = new THREE.Group();
    group.add(instancedMesh);
    scene.add(group);

    return {
      renderer,
      scene,
      camera,
      group,
      instancedMesh,
      dummy,
      count,
      basePositions,
      currentPositions,
      rotations,
      scales,
      velocities
    };
  }

  function initGallery3DHeart() {
    if (gallery3DHeartInit) return;
    const canvas = document.getElementById('galleryThreeCanvas');
    if (!canvas || typeof THREE === 'undefined') return;

    gallery3DHeartInit = true;

    const swarm = createSwarmHeartScene(canvas, 320, 320, 0.95);
    if (!swarm) return;

    const { renderer, scene, camera, group, dummy, count, currentPositions, rotations, scales, velocities } = swarm;

    let isBroken = false;

    function triggerHeartBreak() {
      if (isBroken) return;
      isBroken = true;

      // BLAST CONFETTI EXPLOSION PHYSICS
      if (typeof confetti === 'function') {
        confetti({
          particleCount: 280,
          spread: 150,
          origin: { y: 0.45 },
          colors: ['#ea4c75', '#ff7597', '#ffffff', '#e8547a', '#ff8da6']
        });
      }

      const galleryStage = document.getElementById('galleryHeartStage');
      const galleryWrapper = document.getElementById('galleryContentWrapper');

      if (galleryStage) {
        if (typeof gsap !== 'undefined') {
          gsap.to(galleryStage, {
            opacity: 0,
            scale: 0.8,
            duration: 0.8,
            delay: 0.45,
            onComplete: () => {
              galleryStage.style.display = 'none';
              if (galleryWrapper) {
                galleryWrapper.style.display = 'flex';
                gsap.fromTo(galleryWrapper,
                  { opacity: 0, y: 40 },
                  { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
                );
                gsap.from('.marquee-row', {
                  opacity: 0,
                  y: 35,
                  stagger: 0.12,
                  duration: 0.6,
                  ease: 'power2.out'
                });
              }
            }
          });
        }
      }
    }

    const canvasWrap = document.getElementById('galleryHeartCanvasWrap');
    const promptPill = document.getElementById('heartBreakPromptPill');

    if (canvasWrap) canvasWrap.addEventListener('click', triggerHeartBreak);
    if (promptPill) promptPill.addEventListener('click', triggerHeartBreak);

    let clock = new THREE.Clock();

    function animate() {
      requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      if (!isBroken) {
        group.rotation.y = time * 0.45;
        group.position.y = Math.sin(time * 2) * 5;

        for (let i = 0; i < count; i++) {
          const base = currentPositions[i];
          const sc = scales[i];
          const rot = rotations[i];
          const offset = Math.sin(time * 3 + i) * 1.5;

          dummy.position.set(base.x + offset * 0.15, base.y + offset * 0.8, base.z + offset * 0.15);
          dummy.rotation.set(rot.x + time * 0.4, rot.y + time * 0.4, rot.z);
          dummy.scale.set(sc, sc, sc);
          dummy.updateMatrix();
          swarm.instancedMesh.setMatrixAt(i, dummy.matrix);
        }
      } else {
        // BLAST MINI HEARTS OUTWARD IN 3D
        for (let i = 0; i < count; i++) {
          const pos = currentPositions[i];
          pos.addScaledVector(velocities[i], 0.12);

          rotations[i].x += 0.12;
          rotations[i].y += 0.12;
          scales[i] = Math.max(0, scales[i] - 0.012);

          dummy.position.copy(pos);
          dummy.rotation.copy(rotations[i]);
          dummy.scale.set(scales[i], scales[i], scales[i]);
          dummy.updateMatrix();
          swarm.instancedMesh.setMatrixAt(i, dummy.matrix);
        }
      }

      swarm.instancedMesh.instanceMatrix.needsUpdate = true;
      renderer.render(scene, camera);
    }

    animate();
  }

  // --------------------------------------------------------------------------
  // 11. MULTIPLE 3D FLOATING HEARTS ENGINE (HERO COVER BACKGROUND)
  // --------------------------------------------------------------------------
  function initThreeJSHeart() {
    const canvas = document.getElementById('threeCanvas');
    if (!canvas || typeof THREE === 'undefined') return;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 180;

    // Ambient & Directional Lights
    const ambientLight = new THREE.AmbientLight(0xfff0f5, 0.9);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 1.8);
    dirLight1.position.set(100, 100, 100);
    scene.add(dirLight1);

    const pointLight = new THREE.PointLight(0xea4c75, 3.2, 300);
    pointLight.position.set(-60, -40, 80);
    scene.add(pointLight);

    const pointLight2 = new THREE.PointLight(0xffb5c8, 2.2, 250);
    pointLight2.position.set(60, 60, 60);
    scene.add(pointLight2);

    // 3D Extruded Metallic Heart Geometry
    const heartShape = new THREE.Shape();
    const x = 0, y = 0;
    heartShape.moveTo(x + 25, y + 25);
    heartShape.bezierCurveTo(x + 25, y + 25, x + 20, y, x, y);
    heartShape.bezierCurveTo(x - 30, y, x - 30, y + 35, x - 30, y + 35);
    heartShape.bezierCurveTo(x - 30, y + 55, x - 10, y + 77, x + 25, y + 95);
    heartShape.bezierCurveTo(x + 60, y + 77, x + 80, y + 55, x + 80, y + 35);
    heartShape.bezierCurveTo(x + 80, y, x + 70, y, x + 50, y);
    heartShape.bezierCurveTo(x + 35, y, x + 25, y + 25, x + 25, y + 25);

    const extrudeSettings = {
      depth: 16,
      bevelEnabled: true,
      bevelSegments: 10,
      steps: 3,
      bevelSize: 5,
      bevelThickness: 5
    };

    const geometry = new THREE.ExtrudeGeometry(heartShape, extrudeSettings);
    geometry.center();

    // Screenshot-Matched Vibrant Rose Pink 3D Floating Hearts Configurations
    const heartsConfig = [
      { scale: 0.48, pos: [0, 0, 0], color: 0xea4c75, rotSpeed: 0.45, floatOffset: 0 },
      { scale: 0.22, pos: [-88, 48, -30], color: 0xff7597, rotSpeed: -0.6, floatOffset: 1.2 },
      { scale: 0.25, pos: [92, 42, -40], color: 0xc83b60, rotSpeed: 0.55, floatOffset: 2.5 },
      { scale: 0.18, pos: [-78, -52, -20], color: 0xff8da6, rotSpeed: 0.7, floatOffset: 3.8 },
      { scale: 0.20, pos: [82, -48, -25], color: 0xea4c75, rotSpeed: -0.5, floatOffset: 5.0 },
      { scale: 0.16, pos: [-125, 10, -50], color: 0xff7597, rotSpeed: 0.4, floatOffset: 0.8 },
      { scale: 0.17, pos: [125, -10, -50], color: 0xc83b60, rotSpeed: -0.45, floatOffset: 4.2 }
    ];

    const heartMeshes = [];

    heartsConfig.forEach((cfg) => {
      const material = new THREE.MeshPhongMaterial({
        color: cfg.color,
        emissive: 0x4a0e1c,
        specular: 0xffc2d1,
        shininess: 120,
        flatShading: false
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.scale.set(cfg.scale, cfg.scale, cfg.scale);
      mesh.rotation.x = Math.PI;
      mesh.position.set(cfg.pos[0], cfg.pos[1], cfg.pos[2]);
      scene.add(mesh);
      heartMeshes.push({ mesh, cfg });
    });

    // Ambient 3D Particle Dust
    const particlesCount = 90;
    const particlesGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 350;
      positions[i + 1] = (Math.random() - 0.5) * 350;
      positions[i + 2] = (Math.random() - 0.5) * 220;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 3.5,
      color: 0xffb5c8,
      transparent: true,
      opacity: 0.85
    });

    const particleSystem = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particleSystem);

    let mouseX = 0;
    let mouseY = 0;

    window.addEventListener('mousemove', (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    });

    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    let clock = new THREE.Clock();

    function animate() {
      requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      heartMeshes.forEach(({ mesh, cfg }, index) => {
        mesh.rotation.y = time * cfg.rotSpeed + mouseX * (index === 0 ? 0.45 : 0.25);
        mesh.rotation.x = Math.PI + Math.sin(time * 0.8 + cfg.floatOffset) * 0.15 - mouseY * 0.3;
        mesh.position.y = cfg.pos[1] + Math.sin(time * 1.5 + cfg.floatOffset) * 6;

        if (index === 0) {
          const pulseScale = cfg.scale + Math.sin(time * 3.5) * 0.025;
          mesh.scale.set(pulseScale, pulseScale, pulseScale);
        }
      });

      particleSystem.rotation.y = time * 0.05;
      particleSystem.rotation.x = time * 0.03;

      renderer.render(scene, camera);
    }

    animate();
  }

  initThreeJSHeart();
});
