/**
 * SABARINATHAN C - PORTFOLIO WEBSITE
 * JavaScript for interactivity and animations
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize all components
  initNavigation();
  initScrollEffects();
  initSkillBars();
  initCounterAnimation();
  initContactForm();
  initRevealAnimations();
});

/**
 * Navigation functionality
 */
function initNavigation() {
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Mobile menu toggle
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
      document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });
  }

  // Close menu when clicking nav links
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navToggle?.classList.remove('active');
      navMenu?.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  // Active link on scroll
  const sections = document.querySelectorAll('section[id]');

  function updateActiveLink() {
    const scrollY = window.scrollY;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 100;
      const sectionId = section.getAttribute('id');
      const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => link.classList.remove('active'));
        navLink?.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink);

  // Navbar background on scroll
  function updateNavbar() {
    if (window.scrollY > 50) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', updateNavbar);
}

/**
 * Smooth scroll and scroll effects
 */
function initScrollEffects() {
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

/**
 * Skill bars animation
 */
function initSkillBars() {
  const skillBars = document.querySelectorAll('.skill-progress');

  const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
  };

  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const progress = entry.target.getAttribute('data-progress');
        entry.target.style.width = `${progress}%`;
        skillObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  skillBars.forEach(bar => {
    skillObserver.observe(bar);
  });
}

/**
 * Counter animation for stats
 */
function initCounterAnimation() {
  const counters = document.querySelectorAll('.stat-number');

  const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
  };

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = parseInt(counter.getAttribute('data-target'));
        animateCounter(counter, target);
        counterObserver.unobserve(counter);
      }
    });
  }, observerOptions);

  counters.forEach(counter => {
    counterObserver.observe(counter);
  });
}

function animateCounter(element, target) {
  const duration = 2000;
  const start = 0;
  const startTime = performance.now();

  function updateCounter(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // Easing function for smooth animation
    const easeOutQuart = 1 - Math.pow(1 - progress, 4);
    const current = Math.floor(easeOutQuart * (target - start) + start);

    element.textContent = current;

    if (progress < 1) {
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = target;
    }
  }

  requestAnimationFrame(updateCounter);
}

/**
 * Contact form handling
 */
function initContactForm() {
  const form = document.getElementById('contactForm');

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const submitBtn = form.querySelector('.btn-submit');
      const originalText = submitBtn.textContent;

      // Show loading state
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;

      // Get form data
      const formData = new FormData(form);
      const data = Object.fromEntries(formData);

      // Simulate form submission (replace with actual API call)
      try {
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Success state
        submitBtn.textContent = 'Message Sent!';
        submitBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
        form.reset();

        setTimeout(() => {
          submitBtn.textContent = originalText;
          submitBtn.style.background = '';
          submitBtn.disabled = false;
        }, 3000);

      } catch (error) {
        // Error state
        submitBtn.textContent = 'Error! Try Again';
        submitBtn.style.background = 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)';

        setTimeout(() => {
          submitBtn.textContent = originalText;
          submitBtn.style.background = '';
          submitBtn.disabled = false;
        }, 3000);
      }
    });

    // Input focus animations
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
      input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
      });
      input.addEventListener('blur', () => {
        input.parentElement.classList.remove('focused');
      });
    });
  }
}

/**
 * Reveal animations on scroll
 */
function initRevealAnimations() {
  const revealElements = document.querySelectorAll(
    '.about-text, .about-stats, .skill-item, .project-card, ' +
    '.timeline-item, .education-card, .contact-info, .contact-form'
  );

  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal', 'active');
        revealObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach((element, index) => {
    element.style.transitionDelay = `${index * 0.1}s`;
    element.classList.add('reveal');
    revealObserver.observe(element);
  });
}

/**
 * Typing effect for hero title (optional enhancement)
 */
function initTypingEffect() {
  const element = document.querySelector('.hero-title');
  if (!element) return;

  const text = element.textContent;
  element.textContent = '';
  let i = 0;

  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, 100);
    }
  }

  setTimeout(type, 1000);
}

/**
 * Parallax effect for hero section
 */
function initParallax() {
  const hero = document.querySelector('.hero');
  const heroImage = document.querySelector('.image-wrapper');

  if (hero && heroImage) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      const rate = scrolled * 0.3;

      if (scrolled < window.innerHeight) {
        heroImage.style.transform = `translateY(${rate}px)`;
      }
    });
  }
}

/**
 * Mouse move effect for cards
 */
function initCardHoverEffect() {
  const cards = document.querySelectorAll('.project-card, .stat-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

// Initialize optional effects after page load
window.addEventListener('load', () => {
  // initTypingEffect();
  // initParallax();
  // initCardHoverEffect();
});
