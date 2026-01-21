// Shared Mobile Menu Script for All Pages
// This ensures consistent mobile menu functionality across all pages

(function() {
    'use strict';

    function initMobileMenu() {
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const mobileCloseBtn = document.getElementById('mobileCloseBtn');
        const mobileNav = document.getElementById('mobileNav');
        const mobileOverlay = document.getElementById('mobileOverlay');
        const mobileNavLinks = document.querySelectorAll('.mobile-nav-list a');
        const body = document.body;

        // Check if elements exist
        if (!mobileMenuBtn || !mobileNav || !mobileOverlay) {
            return;
        }

        // Open mobile menu
        function openMobileMenu() {
            if (mobileNav && mobileOverlay) {
                mobileNav.classList.add('active');
                mobileOverlay.classList.add('active');
                body.classList.add('menu-open');
                body.style.overflow = 'hidden';
                
                // Update button icon
                const icon = mobileMenuBtn.querySelector('i');
                if (icon) {
                    icon.className = 'fas fa-times';
                }
            }
        }

        // Close mobile menu
        function closeMobileMenu() {
            if (mobileNav && mobileOverlay) {
                mobileNav.classList.remove('active');
                mobileOverlay.classList.remove('active');
                body.classList.remove('menu-open');
                body.style.overflow = '';
                
                // Update button icon
                const icon = mobileMenuBtn.querySelector('i');
                if (icon) {
                    icon.className = 'fas fa-bars';
                }
            }
        }

        // Toggle mobile menu
        function toggleMobileMenu(e) {
            if (e) {
                e.preventDefault();
                e.stopPropagation();
            }
            if (mobileNav && mobileNav.classList.contains('active')) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        }

        // Remove existing event listeners by cloning
        const newBtn = mobileMenuBtn.cloneNode(true);
        mobileMenuBtn.parentNode.replaceChild(newBtn, mobileMenuBtn);
        const newMobileMenuBtn = document.getElementById('mobileMenuBtn');

        // Event listeners
        if (newMobileMenuBtn) {
            newMobileMenuBtn.addEventListener('click', toggleMobileMenu, { passive: false });
            newMobileMenuBtn.addEventListener('touchend', toggleMobileMenu, { passive: false });
        }

        if (mobileCloseBtn) {
            mobileCloseBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                closeMobileMenu();
            });
        }

        if (mobileOverlay) {
            mobileOverlay.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                closeMobileMenu();
            });
        }

        // Close menu when clicking nav links
        if (mobileNavLinks && mobileNavLinks.length > 0) {
            mobileNavLinks.forEach(link => {
                link.addEventListener('click', function() {
                    closeMobileMenu();
                });
            });
        }

        // Close menu on window resize if open
        let resizeTimer;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function() {
                if (window.innerWidth > 768 && mobileNav && mobileNav.classList.contains('active')) {
                    closeMobileMenu();
                }
            }, 250);
        });

        // Keyboard support (ESC key)
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && mobileNav && mobileNav.classList.contains('active')) {
                closeMobileMenu();
            }
        });

        // Remove duplicate nav links on mobile
        if (window.innerWidth <= 768) {
            const mobileNavList = document.querySelector('.mobile-nav-list');
            if (mobileNavList) {
                const links = mobileNavList.querySelectorAll('a');
                const seen = new Set();
                links.forEach(link => {
                    const href = link.getAttribute('href');
                    const text = link.textContent.trim();
                    const key = href + text;
                    if (seen.has(key)) {
                        const li = link.closest('li');
                        if (li) li.remove();
                    } else {
                        seen.add(key);
                    }
                });
            }
        }
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initMobileMenu);
    } else {
        initMobileMenu();
    }

    // Also initialize on window load (for iOS)
    window.addEventListener('load', function() {
        setTimeout(initMobileMenu, 100);
    });
})();
