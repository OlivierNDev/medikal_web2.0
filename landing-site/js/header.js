/**
 * Unified Header JavaScript
 * Handles mobile menu, dropdowns, and scroll behavior
 */

(function() {
    'use strict';

    // DOM Elements
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileCloseBtn = document.getElementById('mobileCloseBtn');
    const mobileNav = document.getElementById('mobileNav');
    const mobileOverlay = document.getElementById('mobileOverlay');
    const mainHeader = document.getElementById('mainHeader');
    const languageSelector = document.getElementById('languageSelector');
    const mobileDropdownToggles = document.querySelectorAll('.mobile-nav-dropdown-toggle');
    const body = document.body;

    // State
    let isMobileMenuOpen = false;

    /**
     * Open mobile menu
     */
    function openMobileMenu() {
        isMobileMenuOpen = true;
        mobileNav.classList.add('active');
        mobileOverlay.classList.add('active');
        mobileMenuBtn.setAttribute('aria-expanded', 'true');
        body.classList.add('mobile-menu-open');
        
        // Prevent scroll
        document.documentElement.style.overflow = 'hidden';
    }

    /**
     * Close mobile menu
     */
    function closeMobileMenu() {
        isMobileMenuOpen = false;
        mobileNav.classList.remove('active');
        mobileOverlay.classList.remove('active');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        body.classList.remove('mobile-menu-open');
        
        // Close all dropdowns
        mobileDropdownToggles.forEach(toggle => {
            const dropdown = toggle.closest('.mobile-nav-dropdown');
            if (dropdown) {
                dropdown.setAttribute('aria-expanded', 'false');
            }
        });
        
        // Restore scroll
        document.documentElement.style.overflow = '';
    }

    /**
     * Toggle mobile menu
     */
    function toggleMobileMenu() {
        if (isMobileMenuOpen) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    }

    /**
     * Handle mobile dropdown toggle
     */
    function handleMobileDropdown(event) {
        event.preventDefault();
        const toggle = event.currentTarget;
        const dropdown = toggle.closest('.mobile-nav-dropdown');
        
        if (!dropdown) return;
        
        const isExpanded = dropdown.getAttribute('aria-expanded') === 'true';
        
        // Close all other dropdowns
        mobileDropdownToggles.forEach(otherToggle => {
            const otherDropdown = otherToggle.closest('.mobile-nav-dropdown');
            if (otherDropdown && otherDropdown !== dropdown) {
                otherDropdown.setAttribute('aria-expanded', 'false');
            }
        });
        
        // Toggle current dropdown
        dropdown.setAttribute('aria-expanded', !isExpanded);
    }

    /**
     * Handle header scroll behavior
     */
    function handleScroll() {
        if (window.scrollY > 10) {
            mainHeader.classList.add('scrolled');
        } else {
            mainHeader.classList.remove('scrolled');
        }
    }

    /**
     * Handle language selector change
     */
    function handleLanguageChange() {
        const selectedLang = languageSelector.value;
        // Store preference
        if (typeof Storage !== 'undefined') {
            localStorage.setItem('preferredLanguage', selectedLang);
            localStorage.setItem('medikal-lang', selectedLang);
        }
        // Trigger translation if available
        if (window.MedikalTranslations && typeof window.MedikalTranslations.translate === 'function') {
            window.MedikalTranslations.translate(selectedLang);
        } else if (typeof translatePage === 'function') {
            translatePage(selectedLang);
        }
    }

    /**
     * Handle window resize
     */
    function handleResize() {
        // Close mobile menu if window is resized to desktop
        if (window.innerWidth > 768 && isMobileMenuOpen) {
            closeMobileMenu();
        }
    }

    /**
     * Handle escape key
     */
    function handleEscape(event) {
        if (event.key === 'Escape' && isMobileMenuOpen) {
            closeMobileMenu();
        }
    }

    /**
     * Initialize
     */
    function init() {
        // Mobile menu button
        if (mobileMenuBtn) {
            mobileMenuBtn.addEventListener('click', toggleMobileMenu);
        }

        // Mobile close button
        if (mobileCloseBtn) {
            mobileCloseBtn.addEventListener('click', closeMobileMenu);
        }

        // Mobile overlay
        if (mobileOverlay) {
            mobileOverlay.addEventListener('click', closeMobileMenu);
        }

        // Mobile dropdown toggles
        mobileDropdownToggles.forEach(toggle => {
            toggle.addEventListener('click', handleMobileDropdown);
            // Initialize aria-expanded
            const dropdown = toggle.closest('.mobile-nav-dropdown');
            if (dropdown) {
                dropdown.setAttribute('aria-expanded', 'false');
            }
        });

        // Scroll handler
        if (mainHeader) {
            window.addEventListener('scroll', handleScroll, { passive: true });
            handleScroll(); // Initial check
        }

        // Language selector
        if (languageSelector) {
            languageSelector.addEventListener('change', handleLanguageChange);
            // Load saved preference
            if (typeof Storage !== 'undefined') {
                const savedLang = localStorage.getItem('preferredLanguage') || localStorage.getItem('medikal-lang') || 'en';
                if (savedLang) {
                    languageSelector.value = savedLang;
                    // Trigger initial translation
                    setTimeout(() => {
                        handleLanguageChange();
                    }, 100);
                }
            }
        }

        // Window resize
        window.addEventListener('resize', handleResize, { passive: true });

        // Escape key
        document.addEventListener('keydown', handleEscape);

        // Close mobile menu when clicking a link
        const mobileNavLinks = document.querySelectorAll('.mobile-nav-list a');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (isMobileMenuOpen) {
                    closeMobileMenu();
                }
            });
        });
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
