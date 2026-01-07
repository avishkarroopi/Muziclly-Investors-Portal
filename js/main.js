/**
 * Muziclly Investor Portal - Main JavaScript
 * Handles interactivity, animations, and navigation
 */

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initAnimations();
  initMobileMenu();
  initSmoothScroll();
});

/**
 * Initialize navigation card click handling
 */
function initNavigation() {
  const navCards = document.querySelectorAll('.nav-card[data-href]');
  
  navCards.forEach(card => {
    card.addEventListener('click', () => {
      const href = card.getAttribute('data-href');
      if (href) {
        window.location.href = href;
      }
    });
    
    // Add keyboard support
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'link');
    card.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const href = card.getAttribute('data-href');
        if (href) {
          window.location.href = href;
        }
      }
    });
  });
}

/**
 * Initialize scroll-triggered animations
 */
function initAnimations() {
  // Intersection Observer for fade-in animations
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fade-in');
        animateOnScroll.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe elements with animation class
  document.querySelectorAll('.nav-card, .info-card, .tier-card, .pillar-card, .timeline-item, .stat-card').forEach(el => {
    el.style.opacity = '0';
    animateOnScroll.observe(el);
  });

  // Header scroll effect
  const header = document.querySelector('.header');
  if (header) {
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;
      
      if (currentScroll <= 0) {
        header.classList.remove('scrolled');
      } else {
        header.classList.add('scrolled');
      }
      
      lastScroll = currentScroll;
    });
  }
}

/**
 * Initialize mobile menu toggle
 */
function initMobileMenu() {
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const nav = document.querySelector('.nav');
  
  if (menuBtn && nav) {
    menuBtn.addEventListener('click', () => {
      nav.classList.toggle('active');
      menuBtn.setAttribute('aria-expanded', nav.classList.contains('active'));
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!nav.contains(e.target) && !menuBtn.contains(e.target)) {
        nav.classList.remove('active');
        menuBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }
}

/**
 * Initialize smooth scrolling for anchor links
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        
        const headerOffset = 100;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/**
 * Utility: Check if co-founder image exists
 * If not, hide the co-founder section
 */
function checkCofounderImage() {
  const cofounderSection = document.querySelector('.cofounder-section');
  const cofounderImg = document.querySelector('.cofounder-section .founder-image');
  
  if (cofounderImg) {
    cofounderImg.onerror = () => {
      if (cofounderSection) {
        cofounderSection.classList.add('hidden');
      }
    };
  }
}

// Run on page load
checkCofounderImage();

/**
 * Utility: Format numbers with commas
 */
function formatNumber(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/**
 * Utility: Animate counter
 */
function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);
  
  const timer = setInterval(() => {
    start += increment;
    if (start >= target) {
      element.textContent = formatNumber(target);
      clearInterval(timer);
    } else {
      element.textContent = formatNumber(Math.floor(start));
    }
  }, 16);
}
