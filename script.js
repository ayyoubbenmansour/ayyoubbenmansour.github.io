// ============================================
// PROFESSIONAL PORTFOLIO - INTERACTIVE FEATURES
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initScrollAnimations();
  initTypingEffect();
  initProjectFiltering();
  initMobileNav();
  initFormValidation();
  updateFooterYear();
});

// ============================================
// NAVIGATION
// ============================================
function initNavigation() {
  const navbar = document.querySelector('.navbar');
  const navLinks = document.querySelectorAll('.nav-links a');
  
  // Scroll effect for navbar
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
  
  // Smooth scroll with active link highlighting
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
        
        // Close mobile menu if open
        const navLinksContainer = document.querySelector('.nav-links');
        navLinksContainer.classList.remove('active');
        document.querySelector('.nav-toggle').classList.remove('active');
      }
    });
  });
  
  // Highlight active section on scroll
  const observerOptions = {
    threshold: 0.5,
    rootMargin: '-80px 0px -50% 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${entry.target.id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, observerOptions);
  
  document.querySelectorAll('section[id]').forEach(section => {
    observer.observe(section);
  });
}

// ============================================
// SCROLL ANIMATIONS
// ============================================
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);
  
  document.querySelectorAll('.slide-up').forEach(el => {
    observer.observe(el);
  });
}

// ============================================
// TYPING EFFECT
// ============================================
function initTypingEffect() {
  const tagline = document.querySelector('.hero-tagline');
  if (!tagline) return;
  
  const texts = [
    'Machine Learning Engineer',
    'Full Stack Developer',
    'AI Enthusiast',
    'Problem Solver'
  ];
  
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;
  
  function type() {
    const currentText = texts[textIndex];
    
    if (isDeleting) {
      tagline.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      tagline.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100;
    }
    
    if (!isDeleting && charIndex === currentText.length) {
      // Pause at end
      typingSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
      typingSpeed = 500;
    }
    
    setTimeout(type, typingSpeed);
  }
  
  // Start typing after initial delay
  setTimeout(type, 1500);
}

// ============================================
// PROJECT FILTERING
// ============================================
function initProjectFiltering() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      const filter = button.getAttribute('data-filter');
      
      projectCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

// ============================================
// MOBILE NAVIGATION
// ============================================
function initMobileNav() {
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navLinks.classList.toggle('active');
    });
  }
}

// ============================================
// FORM VALIDATION
// ============================================
function initFormValidation() {
  const form = document.querySelector('.contact-form');
  
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = form.querySelector('input[name="name"]').value;
      const email = form.querySelector('input[name="email"]').value;
      const message = form.querySelector('textarea[name="message"]').value;
      
      if (!name || !email || !message) {
        alert('Please fill in all fields');
        return;
      }
      
      if (!isValidEmail(email)) {
        alert('Please enter a valid email address');
        return;
      }
      
      // Show success message (in real app, send to backend)
      alert('Thank you for your message! I\'ll get back to you soon.');
      form.reset();
    });
  }
}

function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// ============================================
// UTILITY FUNCTIONS
// ============================================
function updateFooterYear() {
  const yearElement = document.querySelector('.current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

// ============================================
// SMOOTH SCROLL POLYFILL FOR OLDER BROWSERS
// ============================================
if (!('scrollBehavior' in document.documentElement.style)) {
  const script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/npm/smoothscroll-polyfill@0.4.4/dist/smoothscroll.min.js';
  document.head.appendChild(script);
}
