/**
 * Load Header Component
 * Dynamically loads the unified header into pages
 */

(function() {
    'use strict';

    const headerPlaceholder = document.getElementById('header-placeholder');
    
    if (!headerPlaceholder) {
        console.warn('Header placeholder not found');
        return;
    }

    // Determine base path (for news pages in subdirectory)
    const isNewsPage = window.location.pathname.includes('/news/');
    const basePath = isNewsPage ? '../' : '';
    
    // Load header HTML
    fetch(basePath + 'components/header.html')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text();
        })
        .then(html => {
            // Fix image paths for news pages
            if (isNewsPage) {
                html = html.replace(/src="logo\.png"/g, 'src="../logo.png"');
                html = html.replace(/href="index\.html"/g, 'href="../index.html"');
                html = html.replace(/href="([^"]+\.html)"/g, (match, path) => {
                    if (path.startsWith('http') || path.startsWith('#') || path.startsWith('mailto:') || path.startsWith('tel:')) {
                        return match;
                    }
                    return `href="../${path}"`;
                });
            }
            
            headerPlaceholder.innerHTML = html;
            
            // Load header CSS
            const cssLink = document.createElement('link');
            cssLink.rel = 'stylesheet';
            cssLink.href = basePath + 'css/header.css';
            document.head.appendChild(cssLink);
            
            // Load header JS after a short delay to ensure DOM is ready
            setTimeout(() => {
                const script = document.createElement('script');
                script.src = basePath + 'js/header.js';
                script.async = true;
                document.body.appendChild(script);
            }, 100);
        })
        .catch(error => {
            console.error('Error loading header:', error);
            headerPlaceholder.innerHTML = '<!-- Header failed to load -->';
        });
})();
