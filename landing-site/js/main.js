/**
 * Medikal Africa - Minimal JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initScrollAnimations();
});

// Mobile Menu
function initMobileMenu() {
  const btn = document.querySelector('.nav-mobile-btn');
  const menu = document.querySelector('.mobile-menu');
  const overlay = document.querySelector('.mobile-overlay');
  const close = document.querySelector('.mobile-close');
  const links = document.querySelectorAll('.mobile-menu-links a');

  if (!btn || !menu) return;

  const toggle = (open) => {
    menu.classList.toggle('active', open);
    overlay.classList.toggle('active', open);
    document.body.style.overflow = open ? 'hidden' : '';
  };

  btn.addEventListener('click', () => toggle(true));
  close?.addEventListener('click', () => toggle(false));
  overlay?.addEventListener('click', () => toggle(false));
  links.forEach(link => link.addEventListener('click', () => toggle(false)));
}

// Scroll Animations
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
}
