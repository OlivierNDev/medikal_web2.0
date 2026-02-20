/**
 * Load Footer Component
 * Dynamically loads the unified footer into pages
 * Optimized for faster loading
 */

(function() {
    'use strict';

    const footerPlaceholder = document.getElementById('footer-placeholder');
    
    if (!footerPlaceholder) {
        console.warn('Footer placeholder not found');
        return;
    }

    // Determine base path (for news pages in subdirectory)
    const isNewsPage = window.location.pathname.includes('/news/');
    const basePath = isNewsPage ? '../' : '';
    
    // Preload CSS immediately for faster rendering
    const existingCss = document.querySelector(`link[href="${basePath}css/footer.css"]`);
    if (!existingCss) {
        const preloadLink = document.createElement('link');
        preloadLink.rel = 'preload';
        preloadLink.as = 'style';
        preloadLink.href = basePath + 'css/footer.css';
        document.head.appendChild(preloadLink);
        
        const cssLink = document.createElement('link');
        cssLink.rel = 'stylesheet';
        cssLink.href = basePath + 'css/footer.css';
        document.head.appendChild(cssLink);
    }
    
    // Load footer HTML (footer is below the fold, so we can defer it slightly)
    // Use Intersection Observer to load footer when it's about to be visible
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    observer.disconnect();
                    loadFooter();
                }
            });
        }, {
            rootMargin: '200px' // Start loading 200px before footer is visible
        });
        
        observer.observe(footerPlaceholder);
    } else {
        // Fallback for browsers without IntersectionObserver
        loadFooter();
    }
    
    function loadFooter() {
        fetch(basePath + 'components/footer.html')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.text();
            })
            .then(html => {
                // Replace BASE_PATH placeholder with actual path
                if (isNewsPage) {
                    html = html.replace(/BASE_PATH/g, '../');
                } else {
                    html = html.replace(/BASE_PATH/g, '');
                }
                
                footerPlaceholder.innerHTML = html;
            })
            .catch(error => {
                console.error('Error loading footer:', error);
                footerPlaceholder.innerHTML = '<!-- Footer failed to load -->';
            });
    }
})();
