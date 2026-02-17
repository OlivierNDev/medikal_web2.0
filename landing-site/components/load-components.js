// Load shared header and footer components
(function() {
    'use strict';
    
    function initMobileMenuAfterLoad() {
        // Wait for DOM to settle, then initialize mobile menu
        setTimeout(function() {
            if (typeof initMobileMenu === 'function') {
                initMobileMenu();
            } else if (window.mobileMenuInitialized !== true) {
                // Load mobile-menu.js if not already loaded
                const script = document.createElement('script');
                script.src = 'mobile-menu.js';
                script.defer = true;
                script.onload = function() {
                    if (typeof initMobileMenu === 'function') {
                        initMobileMenu();
                    }
                };
                document.head.appendChild(script);
            }
        }, 100);
    }
    
    // Load header
    const headerPlaceholder = document.getElementById('header-placeholder');
    if (headerPlaceholder) {
        fetch('components/header.html')
            .then(response => {
                if (!response.ok) throw new Error('Header not found');
                return response.text();
            })
            .then(html => {
                headerPlaceholder.innerHTML = html;
                // Hide legacy header if it exists
                const legacyHeader = document.querySelector('.medikal-header:not(#header-placeholder .medikal-header)');
                if (legacyHeader) legacyHeader.style.display = 'none';
                initMobileMenuAfterLoad();
            })
            .catch(err => {
                console.warn('Header component not loaded, using fallback:', err);
            });
    }
    
    // Load footer
    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (footerPlaceholder) {
        fetch('components/footer.html')
            .then(response => {
                if (!response.ok) throw new Error('Footer not found');
                return response.text();
            })
            .then(html => {
                footerPlaceholder.innerHTML = html;
                // Hide legacy footer if it exists
                const legacyFooter = document.querySelector('.medikal-footer:not(#footer-placeholder .medikal-footer)');
                if (legacyFooter) legacyFooter.style.display = 'none';
            })
            .catch(err => {
                console.warn('Footer component not loaded, using fallback:', err);
            });
    }
})();
