/**
 * Unified Header JavaScript
 * Handles mobile menu, dropdowns, and scroll behavior
 */

(function() {
    'use strict';

    // State
    let isMobileMenuOpen = false;
    let isInitialized = false;

    // DOM Elements (will be set in init)
    let mobileMenuBtn;
    let mobileCloseBtn;
    let mobileNav;
    let mobileOverlay;
    let mainHeader;
    let languageSelector;
    let mobileDropdownToggles;
    const body = document.body;

    /**
     * Get DOM elements
     */
    function getElements() {
        mobileMenuBtn = document.getElementById('mobileMenuBtn');
        mobileCloseBtn = document.getElementById('mobileCloseBtn');
        mobileNav = document.getElementById('mobileNav');
        mobileOverlay = document.getElementById('mobileOverlay');
        mainHeader = document.getElementById('mainHeader');
        languageSelector = document.getElementById('languageSelector');
        mobileDropdownToggles = document.querySelectorAll('.mobile-nav-dropdown-toggle');
    }

    /**
     * Open mobile menu
     */
    function openMobileMenu() {
        if (!mobileNav || !mobileOverlay || !mobileMenuBtn) return;
        
        isMobileMenuOpen = true;
        mobileNav.classList.add('active');
        mobileOverlay.classList.add('active');
        mobileMenuBtn.setAttribute('aria-expanded', 'true');
        body.classList.add('mobile-menu-open');
        
        // Prevent scroll
        document.documentElement.style.overflow = 'hidden';
        document.body.style.overflow = 'hidden';
    }

    /**
     * Close mobile menu
     */
    function closeMobileMenu() {
        if (!mobileNav || !mobileOverlay || !mobileMenuBtn) return;
        
        isMobileMenuOpen = false;
        mobileNav.classList.remove('active');
        mobileOverlay.classList.remove('active');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        body.classList.remove('mobile-menu-open');
        
        // Close all dropdowns
        if (mobileDropdownToggles && mobileDropdownToggles.length > 0) {
            mobileDropdownToggles.forEach(toggle => {
                const dropdown = toggle.closest('.mobile-nav-dropdown');
                if (dropdown) {
                    dropdown.setAttribute('aria-expanded', 'false');
                }
            });
        }
        
        // Restore scroll
        document.documentElement.style.overflow = '';
        document.body.style.overflow = '';
    }

    /**
     * Toggle mobile menu
     */
    function toggleMobileMenu(e) {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        
        if (!mobileNav || !mobileOverlay || !mobileMenuBtn) {
            // Try to get elements if not initialized yet
            getElements();
            if (!mobileNav || !mobileOverlay || !mobileMenuBtn) return;
        }
        
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
        if (mobileDropdownToggles && mobileDropdownToggles.length > 0) {
            mobileDropdownToggles.forEach(otherToggle => {
                const otherDropdown = otherToggle.closest('.mobile-nav-dropdown');
                if (otherDropdown && otherDropdown !== dropdown) {
                    otherDropdown.setAttribute('aria-expanded', 'false');
                }
            });
        }
        
        // Toggle current dropdown
        dropdown.setAttribute('aria-expanded', !isExpanded);
    }

    /**
     * Handle header scroll behavior
     */
    function handleScroll() {
        if (!mainHeader) return;
        
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
        if (!languageSelector) return;
        
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
        // Get DOM elements
        getElements();
        
        // Check if essential elements exist
        if (!mobileMenuBtn || !mobileNav || !mobileOverlay) {
            // Elements not ready yet, try again after a short delay
            if (!isInitialized) {
                setTimeout(init, 100);
            }
            return;
        }
        
        // Prevent multiple initializations
        if (isInitialized) return;
        isInitialized = true;

        // Mobile menu button
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
        mobileMenuBtn.addEventListener('touchend', function(e) {
            e.preventDefault();
            toggleMobileMenu(e);
        }, { passive: false });

        // Mobile close button
        if (mobileCloseBtn) {
            mobileCloseBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                closeMobileMenu();
            });
        }

        // Mobile overlay
        mobileOverlay.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            closeMobileMenu();
        });

        // Mobile dropdown toggles
        if (mobileDropdownToggles && mobileDropdownToggles.length > 0) {
            mobileDropdownToggles.forEach(toggle => {
                toggle.addEventListener('click', handleMobileDropdown);
                // Initialize aria-expanded
                const dropdown = toggle.closest('.mobile-nav-dropdown');
                if (dropdown) {
                    dropdown.setAttribute('aria-expanded', 'false');
                }
            });
        }

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

    // Expose init function globally so it can be called after header loads
    window.initHeader = init;

    // Try to initialize immediately (for pages where header is already in DOM)
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            setTimeout(init, 50);
        });
    } else {
        setTimeout(init, 50);
    }
})();
