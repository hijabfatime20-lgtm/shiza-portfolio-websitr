/**
 * Shiza Shehzad - Premium Web Portfolio (aliaideveloper.site Architecture)
 * Vanilla JavaScript (ES6+) Interactions & Theme Handling
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // =========================================================================
  // 1. THEME TOGGLE (DARK / LIGHT MODE WITH LOCALSTORAGE)
  // =========================================================================
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const htmlElement = document.documentElement;
  const themeIcon = document.getElementById('themeIcon');

  const currentTheme = localStorage.getItem('theme') || 'dark';
  if (currentTheme === 'light') {
    htmlElement.classList.add('light');
    htmlElement.classList.remove('dark');
    if (themeIcon) {
      themeIcon.classList.replace('bi-sun-fill', 'bi-moon-stars-fill');
    }
  } else {
    htmlElement.classList.add('dark');
    htmlElement.classList.remove('light');
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      if (htmlElement.classList.contains('light')) {
        htmlElement.classList.remove('light');
        htmlElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
        if (themeIcon) {
          themeIcon.classList.replace('bi-moon-stars-fill', 'bi-sun-fill');
        }
      } else {
        htmlElement.classList.add('light');
        htmlElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
        if (themeIcon) {
          themeIcon.classList.replace('bi-sun-fill', 'bi-moon-stars-fill');
        }
      }
    });
  }

  // =========================================================================
  // 2. STICKY NAVBAR SCROLL STATE & MOBILE MENU AUTO-CLOSE
  // =========================================================================
  const navbar = document.getElementById('mainNavbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const navbarCollapse = document.getElementById('navbarContent');
  const bsCollapse = navbarCollapse ? new bootstrap.Collapse(navbarCollapse, { toggle: false }) : null;

  const handleNavbarScroll = () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleNavbarScroll, { passive: true });
  handleNavbarScroll();

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navbarCollapse && navbarCollapse.classList.contains('show')) {
        bsCollapse.hide();
      }
    });
  });

  const navCtaBtn = document.querySelector('#navbarContent .gradient-btn-orange');
  if (navCtaBtn) {
    navCtaBtn.addEventListener('click', () => {
      if (navbarCollapse && navbarCollapse.classList.contains('show')) {
        bsCollapse.hide();
      }
    });
  }

  // =========================================================================
  // 3. ACTIVE NAVIGATION INDICATOR (SCROLLSPY)
  // =========================================================================
  const sections = document.querySelectorAll('section[id]');

  const updateActiveNavLink = () => {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 130;
      const sectionId = section.getAttribute('id');
      const targetNavLink = document.querySelector(`.navbar-nav .nav-link[href="#${sectionId}"]`);

      if (targetNavLink) {
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
          navLinks.forEach(item => item.classList.remove('active'));
          targetNavLink.classList.add('active');
        }
      }
    });
  };

  window.addEventListener('scroll', updateActiveNavLink, { passive: true });

  // =========================================================================
  // 4. SKILLS SECTION PROGRESS BARS ANIMATION
  // =========================================================================
  const skillSection = document.getElementById('skills');
  const progressBars = document.querySelectorAll('.progress-bar-fill');
  let animatedSkills = false;

  const animateSkills = () => {
    progressBars.forEach(bar => {
      const targetPercent = bar.getAttribute('data-progress') || '85';
      bar.style.width = `${targetPercent}%`;

      const card = bar.closest('.skill-card-wrap');
      if (card) {
        const pctDisplay = card.querySelector('.skill-pct-val');
        if (pctDisplay) {
          let current = 0;
          const target = parseInt(targetPercent, 10);
          const duration = 1200;
          const stepTime = Math.max(Math.floor(duration / target), 10);

          const counter = setInterval(() => {
            current += 1;
            pctDisplay.textContent = `${current}%`;
            if (current >= target) {
              clearInterval(counter);
              pctDisplay.textContent = `${target}%`;
            }
          }, stepTime);
        }
      }
    });
  };

  if ('IntersectionObserver' in window && skillSection) {
    const skillObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !animatedSkills) {
          animatedSkills = true;
          animateSkills();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.25 });

    skillObserver.observe(skillSection);
  } else {
    setTimeout(animateSkills, 600);
  }

  // =========================================================================
  // 5. WORK / PORTFOLIO FILTERING
  // =========================================================================
  const filterBtns = document.querySelectorAll('.filter-btn-pill');
  const projectItems = document.querySelectorAll('.portfolio-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectItems.forEach(item => {
        const categories = item.getAttribute('data-category') || '';
        if (filterValue === 'all' || categories.includes(filterValue)) {
          item.style.display = 'block';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
          }, 10);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'translateY(15px)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // =========================================================================
  // 6. PROJECT DETAILS DATA & MODAL PREVIEW
  // =========================================================================
  const projectData = {
    'flower-shop': {
      title: 'Flower Shop Website (Blossom & Bloom)',
      category: 'Web Design • eCommerce UI',
      image: 'assets/images/project-flower.svg',
      tech: ['HTML5', 'CSS3', 'Bootstrap 5', 'JavaScript', 'Responsive UI'],
      description: 'Blossom & Bloom is a bespoke luxury floral storefront designed to deliver a graceful, tactile shopping experience. Features handcrafted bouquet catalogs, seasonal arrival filters, and interactive ordering.',
      features: [
        'Editorial typography with modern pastel pink and violet branding',
        'Custom seasonal bouquet catalog with price badges and quick-order',
        'Interactive client reviews carousel with 4.9/5 satisfaction metrics',
        'Optimized for rapid mobile ordering and zero-friction checkout flow'
      ]
    },
    'study-website': {
      title: 'Study Website (EduSphere Learning Portal)',
      category: 'Front-End Development • LMS Portal',
      image: 'assets/images/project-study.svg',
      tech: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap 5', 'CSS Grid'],
      description: 'EduSphere is a student-centric learning platform designed for structured online education. It incorporates curriculum progress bars, interactive video lecture mockups, and sandbox coding modules.',
      features: [
        'Interactive sidebar dashboard with course progress meter (80% completion)',
        'Fluid responsive video player with timestamp navigation',
        'Integrated interactive quiz scoring and grade feedback display',
        'Clean semantic structure tailored for accessibility and screen readers'
      ]
    },
    'home-chef': {
      title: 'Home Chef Website (CraveKitchen Dining)',
      category: 'Web Design • Hospitality Booking',
      image: 'assets/images/project-chef.svg',
      tech: ['HTML5', 'CSS3', 'Bootstrap 5', 'JavaScript', 'UI Design'],
      description: 'CraveKitchen bridges private Michelin-calibre master chefs with food connoisseurs for in-home bespoke dining events. The dark gourmet aesthetic highlights food photography and offers effortless chef scheduling.',
      features: [
        'Atmospheric dark navy and warm amber palette tailored for gourmet dining',
        'Interactive chef profile with credentials and culinary specialty cards',
        'Artisanal dish presentation cards with wine pairing recommendations',
        'Full reservation booking inquiry workflow with mobile-first responsiveness'
      ]
    },
    'snack-food': {
      title: 'Snack Food Website (CrunchWave Bites)',
      category: 'Landing Page Design • D2C eCommerce',
      image: 'assets/images/project-snack.svg',
      tech: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap 5', 'CSS Keyframes'],
      description: 'CrunchWave is a high-energy, vibrant direct-to-consumer landing page for an artisanal baked snack brand. Designed with punchy typography, flavor pill selector, and dynamic call-to-action triggers.',
      features: [
        'Bold, high-contrast visual styling designed for high customer conversion',
        'Interactive flavor switcher (Fiery Chili, Aged Cheddar, Truffle Herb)',
        'Nutrition benefit breakdown: 100% plant-based, baked, zero trans-fat',
        'Subscription and save discount promotion banner with one-click ordering'
      ]
    }
  };

  const projectModalEl = document.getElementById('projectModal');
  const projectModal = projectModalEl ? new bootstrap.Modal(projectModalEl) : null;

  const modalTitle = document.getElementById('modalProjectTitle');
  const modalCategory = document.getElementById('modalProjectCategory');
  const modalImg = document.getElementById('modalProjectImg');
  const modalDesc = document.getElementById('modalProjectDesc');
  const modalFeatures = document.getElementById('modalProjectFeatures');
  const modalBadges = document.getElementById('modalProjectBadges');
  const modalLiveDemoBtn = document.getElementById('modalLiveDemoBtn');

  document.querySelectorAll('[data-project-target]').forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const projectKey = button.getAttribute('data-project-target');
      const project = projectData[projectKey];

      if (project && projectModal) {
        modalTitle.textContent = project.title;
        modalCategory.textContent = project.category;
        modalImg.src = project.image;
        modalImg.alt = project.title;
        modalDesc.textContent = project.description;

        modalBadges.innerHTML = '';
        project.tech.forEach(t => {
          const badge = document.createElement('span');
          badge.className = 'portfolio-badge me-1 mb-1';
          badge.textContent = t;
          modalBadges.appendChild(badge);
        });

        modalFeatures.innerHTML = '';
        project.features.forEach(feat => {
          const li = document.createElement('li');
          li.className = 'mb-2 d-flex align-items-center gap-2';
          li.innerHTML = `<i class="bi bi-check-circle-fill text-orange me-2"></i> ${feat}`;
          modalFeatures.appendChild(li);
        });

        projectModal.show();
      }
    });
  });

  if (modalLiveDemoBtn) {
    modalLiveDemoBtn.addEventListener('click', (e) => {
      e.preventDefault();
      showToastNotification(`Launching live preview for ${modalTitle.textContent}...`);
    });
  }

  // =========================================================================
  // 7. CONTACT FORM CLIENT VALIDATION
  // =========================================================================
  const contactForm = document.getElementById('portfolioContactForm');
  const submitBtn = document.getElementById('submitContactBtn');
  const formSuccessModalEl = document.getElementById('formSuccessModal');
  const formSuccessModal = formSuccessModalEl ? new bootstrap.Modal(formSuccessModalEl) : null;

  if (contactForm) {
    const nameInput = document.getElementById('contactName');
    const emailInput = document.getElementById('contactEmail');
    const subjectInput = document.getElementById('contactSubject');
    const messageInput = document.getElementById('contactMessage');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const setValidationState = (input, isValid, errorMsg = '') => {
      const feedback = input.nextElementSibling;
      if (isValid) {
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');
      } else {
        input.classList.remove('is-valid');
        input.classList.add('is-invalid');
        if (feedback && feedback.classList.contains('invalid-feedback')) {
          feedback.textContent = errorMsg;
        }
      }
      return isValid;
    };

    nameInput.addEventListener('input', () => {
      setValidationState(nameInput, nameInput.value.trim().length >= 2, 'Please enter your full name (minimum 2 characters).');
    });

    emailInput.addEventListener('input', () => {
      setValidationState(emailInput, emailRegex.test(emailInput.value.trim()), 'Please enter a valid email address.');
    });

    subjectInput.addEventListener('input', () => {
      setValidationState(subjectInput, subjectInput.value.trim().length >= 3, 'Please specify a project subject.');
    });

    messageInput.addEventListener('input', () => {
      setValidationState(messageInput, messageInput.value.trim().length >= 10, 'Please enter at least 10 characters detailing your request.');
    });

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const isNameValid = nameInput.value.trim().length >= 2;
      const isEmailValid = emailRegex.test(emailInput.value.trim());
      const isSubjectValid = subjectInput.value.trim().length >= 3;
      const isMsgValid = messageInput.value.trim().length >= 10;

      setValidationState(nameInput, isNameValid, 'Please enter your full name (minimum 2 characters).');
      setValidationState(emailInput, isEmailValid, 'Please enter a valid email address.');
      setValidationState(subjectInput, isSubjectValid, 'Please specify a project subject.');
      setValidationState(messageInput, isMsgValid, 'Please write at least 10 characters detailing your requirements.');

      if (isNameValid && isEmailValid && isSubjectValid && isMsgValid) {
        const originalBtnContent = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
          <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
          Sending Message...
        `;

        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnContent;
          contactForm.reset();

          [nameInput, emailInput, subjectInput, messageInput].forEach(inp => {
            inp.classList.remove('is-valid', 'is-invalid');
          });

          if (formSuccessModal) {
            formSuccessModal.show();
          } else {
            alert('Thank you! Your message has been sent successfully. I will get back to you shortly.');
          }
        }, 1000);
      }
    });
  }

  // =========================================================================
  // 8. TOAST NOTIFICATION HELPER
  // =========================================================================
  function showToastNotification(message) {
    let toastContainer = document.getElementById('portfolioToastContainer');
    if (!toastContainer) {
      toastContainer = document.createElement('div');
      toastContainer.id = 'portfolioToastContainer';
      toastContainer.className = 'toast-container position-fixed bottom-0 end-0 p-3';
      toastContainer.style.zIndex = '1090';
      document.body.appendChild(toastContainer);
    }

    const toastEl = document.createElement('div');
    toastEl.className = 'toast align-items-center text-bg-dark border-0 shadow-lg';
    toastEl.setAttribute('role', 'alert');
    toastEl.setAttribute('aria-live', 'assertive');
    toastEl.setAttribute('aria-atomic', 'true');
    toastEl.innerHTML = `
      <div class="d-flex">
        <div class="toast-body d-flex align-items-center gap-2">
          <i class="bi bi-info-circle-fill text-orange fs-5"></i>
          <span>${message}</span>
        </div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
    `;

    toastContainer.appendChild(toastEl);
    const bsToast = new bootstrap.Toast(toastEl, { delay: 4000 });
    bsToast.show();

    toastEl.addEventListener('hidden.bs.toast', () => {
      toastEl.remove();
    });
  }

  // =========================================================================
  // 9. CV DOWNLOAD & PREVIEW MODAL
  // =========================================================================
  const downloadCvBtns = document.querySelectorAll('.btn-download-cv');
  const cvModalEl = document.getElementById('cvModal');
  const cvModal = cvModalEl ? new bootstrap.Modal(cvModalEl) : null;

  downloadCvBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      if (btn.classList.contains('btn-view-cv') && cvModal) {
        e.preventDefault();
        cvModal.show();
      } else {
        showToastNotification("Starting CV download (PDF format)...");
      }
    });
  });

  // =========================================================================
  // 10. DYNAMIC TYPING ROLE EFFECT (HERO SECTION)
  // =========================================================================
  const dynamicRoleEl = document.getElementById('dynamicRoleText');
  if (dynamicRoleEl) {
    const roles = [
      'Web Designer & Front-End Developer',
      'UI/UX Specialist & Visual Designer',
      'Responsive & Mobile-First Expert',
      'BS Information Technology (VU)',
      'Bootstrap 5 & Clean Code Specialist'
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 85;

    const typeRole = () => {
      const currentRole = roles[roleIndex];
      if (isDeleting) {
        dynamicRoleEl.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 35;
      } else {
        dynamicRoleEl.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 80;
      }

      if (!isDeleting && charIndex === currentRole.length) {
        typingSpeed = 2200; // Pause at end of title
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typingSpeed = 450; // Pause before typing next
      }

      setTimeout(typeRole, typingSpeed);
    };

    setTimeout(typeRole, 600);
  }

  // =========================================================================
  // 11. ANIMATED NUMBER COUNTERS (.count-up)
  // =========================================================================
  const countUpElements = document.querySelectorAll('.count-up');
  let animatedCounters = false;

  const runCounters = () => {
    countUpElements.forEach(el => {
      const targetVal = parseFloat(el.getAttribute('data-target')) || 0;
      const suffix = el.getAttribute('data-suffix') || '';
      const duration = 1800;
      const startTime = performance.now();

      const easeOutQuad = (t) => t * (2 - t);

      const updateCount = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const currentCount = Math.floor(easeOutQuad(progress) * targetVal);

        el.textContent = `${currentCount}${suffix}`;

        if (progress < 1) {
          requestAnimationFrame(updateCount);
        } else {
          el.textContent = `${targetVal}${suffix}`;
        }
      };

      requestAnimationFrame(updateCount);
    });
  };

  const heroSection = document.getElementById('hero');
  if ('IntersectionObserver' in window && heroSection) {
    const counterObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !animatedCounters) {
          animatedCounters = true;
          runCounters();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    counterObserver.observe(heroSection);
  } else {
    setTimeout(runCounters, 400);
  }

  // =========================================================================
  // 12. UNIVERSAL SCROLL REVEAL OBSERVER
  // =========================================================================
  const revealElements = document.querySelectorAll('.reveal-on-scroll, .reveal-left, .reveal-right');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -30px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('is-revealed'));
  }
});

