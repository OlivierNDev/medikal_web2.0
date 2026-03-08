/**
 * Medikal Africa - Main JavaScript
 * Clinical Intelligence Infrastructure
 */

// DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initScrollAnimations();
  initHeatmap();
  initResistanceMap();
  initDataFlowAnimation();
  initNavScroll();
});

/**
 * Mobile Menu Toggle
 */
function initMobileMenu() {
  const mobileBtn = document.querySelector('.nav-mobile-btn');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileOverlay = document.querySelector('.mobile-overlay');
  const mobileClose = document.querySelector('.mobile-menu-close');
  const mobileLinks = document.querySelectorAll('.mobile-menu-links a');

  if (!mobileBtn || !mobileMenu) return;

  const toggleMenu = (open) => {
    mobileMenu.classList.toggle('active', open);
    mobileOverlay.classList.toggle('active', open);
    document.body.style.overflow = open ? 'hidden' : '';
  };

  mobileBtn.addEventListener('click', () => toggleMenu(true));
  mobileClose?.addEventListener('click', () => toggleMenu(false));
  mobileOverlay?.addEventListener('click', () => toggleMenu(false));
  
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => toggleMenu(false));
  });
}

/**
 * Scroll-triggered Animations
 */
function initScrollAnimations() {
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        
        // Handle staggered children
        const children = entry.target.querySelectorAll('.fade-up');
        children.forEach((child, index) => {
          setTimeout(() => {
            child.classList.add('visible');
          }, index * 100);
        });
      }
    });
  }, observerOptions);

  // Observe all fade-up elements
  document.querySelectorAll('.fade-up').forEach(el => {
    observer.observe(el);
  });

  // Observe section headers
  document.querySelectorAll('.section-header').forEach(el => {
    el.classList.add('fade-up');
    observer.observe(el);
  });

  // Observe cards
  document.querySelectorAll('.bento-card, .tech-card, .impact-card, .stat-card, .feature-item').forEach((el, index) => {
    el.classList.add('fade-up');
    el.style.transitionDelay = `${index * 0.05}s`;
    observer.observe(el);
  });

  // Pipeline steps
  document.querySelectorAll('.pipeline-step, .detection-step, .security-pipeline-node').forEach((el, index) => {
    el.style.transitionDelay = `${index * 0.15}s`;
    observer.observe(el);
  });

  // Architecture layers
  document.querySelectorAll('.arch-layer, .arch-arrow').forEach((el, index) => {
    el.style.transitionDelay = `${index * 0.1}s`;
    observer.observe(el);
  });

  // Timeline items
  document.querySelectorAll('.timeline-item').forEach((el, index) => {
    el.classList.add('fade-up');
    el.style.transitionDelay = `${index * 0.15}s`;
    observer.observe(el);
  });
}

/**
 * Hero Data Flow Animation
 */
function initDataFlowAnimation() {
  const flowNodes = document.querySelectorAll('.flow-node');
  const flowLines = document.querySelectorAll('.flow-line');
  
  if (flowNodes.length === 0) return;

  let currentIndex = 0;

  const animateFlow = () => {
    // Reset all
    flowNodes.forEach(node => {
      node.style.opacity = '0';
      node.style.transform = 'translateX(-50%) translateY(20px)';
      node.classList.remove('active');
    });
    flowLines.forEach(line => {
      line.style.transform = 'scaleY(0)';
    });

    // Animate sequentially
    const animateNext = (index) => {
      if (index >= flowNodes.length) {
        // Highlight the AI Engine node
        setTimeout(() => {
          flowNodes[2]?.classList.add('active');
        }, 500);
        
        // Restart after delay
        setTimeout(() => {
          currentIndex = 0;
          animateFlow();
        }, 3000);
        return;
      }

      const node = flowNodes[index];
      const line = flowLines[index];

      // Animate node
      node.style.opacity = '1';
      node.style.transform = 'translateX(-50%) translateY(0)';
      node.style.transition = 'all 0.4s ease-out';

      // Animate line after node
      setTimeout(() => {
        if (line) {
          line.style.transform = 'scaleY(1)';
          line.style.transition = 'transform 0.3s ease-out';
        }
        
        // Animate next
        setTimeout(() => {
          animateNext(index + 1);
        }, 200);
      }, 300);
    };

    animateNext(0);
  };

  // Start animation after a short delay
  setTimeout(animateFlow, 500);
}

/**
 * AMR Heatmap Generation
 */
function initHeatmap() {
  const heatmapContainer = document.querySelector('.heatmap-container');
  if (!heatmapContainer) return;

  const rows = 6;
  const cols = 6;
  const colors = {
    susceptible: '#10B981',
    intermediate: '#F59E0B',
    resistant: '#EF4444'
  };

  // Generate mock AMR data
  const generateCell = () => {
    const rand = Math.random();
    if (rand < 0.4) return { color: colors.susceptible, label: 'Susceptible' };
    if (rand < 0.7) return { color: colors.intermediate, label: 'Intermediate' };
    return { color: colors.resistant, label: 'Resistant' };
  };

  // Create cells
  for (let i = 0; i < rows * cols; i++) {
    const cell = document.createElement('div');
    const data = generateCell();
    cell.className = 'heatmap-cell';
    cell.style.backgroundColor = data.color;
    cell.setAttribute('data-value', data.label);
    cell.style.opacity = '0';
    cell.style.transform = 'scale(0)';
    heatmapContainer.appendChild(cell);

    // Animate in
    setTimeout(() => {
      cell.style.transition = 'all 0.3s ease-out';
      cell.style.opacity = '1';
      cell.style.transform = 'scale(1)';
    }, i * 30);
  }
}

/**
 * Resistance Map Grid
 */
function initResistanceMap() {
  const mapGrid = document.getElementById('resistance-map-grid');
  const tooltip = document.getElementById('map-tooltip');
  if (!mapGrid) return;

  const rows = 10;
  const cols = 8;
  const colors = ['#10B981', '#34D399', '#6EE7B7', '#FCD34D', '#FBBF24', '#F59E0B', '#FB923C', '#F97316', '#EF4444', '#DC2626'];
  
  const pathogens = [
    'E. coli: 45% resistance',
    'K. pneumoniae: 67% resistance',
    'S. aureus: 38% resistance',
    'P. aeruginosa: 52% resistance',
    'A. baumannii: 71% resistance',
    'Enterococcus: 29% resistance'
  ];

  for (let i = 0; i < rows * cols; i++) {
    const cell = document.createElement('div');
    cell.className = 'map-cell';
    
    // Create regional patterns
    const row = Math.floor(i / cols);
    const col = i % cols;
    const baseValue = (row * cols + col) % 10;
    const variation = Math.floor(Math.random() * 3) - 1;
    const colorIndex = Math.max(0, Math.min(9, baseValue + variation));
    
    cell.style.backgroundColor = colors[colorIndex];
    cell.style.opacity = '0';
    
    // Tooltip on hover
    cell.addEventListener('mouseenter', () => {
      const pathogen = pathogens[Math.floor(Math.random() * pathogens.length)];
      if (tooltip) {
        tooltip.textContent = pathogen;
        tooltip.classList.add('visible');
      }
    });
    
    cell.addEventListener('mouseleave', () => {
      if (tooltip) {
        tooltip.classList.remove('visible');
      }
    });
    
    mapGrid.appendChild(cell);

    // Animate in
    setTimeout(() => {
      cell.style.transition = 'opacity 0.3s ease-out';
      cell.style.opacity = '1';
    }, i * 15);
  }
}

/**
 * Navigation Scroll Effect
 */
function initNavScroll() {
  const nav = document.querySelector('.nav');
  if (!nav) return;

  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
  }, { passive: true });
}

/**
 * Smooth scroll for anchor links
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

/**
 * Form submission handling
 */
const form = document.querySelector('form');
if (form) {
  form.addEventListener('submit', function(e) {
    const submitBtn = this.querySelector('button[type="submit"]');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation: spin 1s linear infinite;">
          <path d="M21 12a9 9 0 11-6.219-8.56"/>
        </svg>
        Submitting...
      `;
    }
  });
}

// Add spin animation
const style = document.createElement('style');
style.textContent = `
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;
document.head.appendChild(style);
