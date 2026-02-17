/**
 * Load Footer Component
 * Dynamically loads the unified footer into pages
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
    
    // Load footer HTML
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
            
            // Load footer CSS
            const cssLink = document.createElement('link');
            cssLink.rel = 'stylesheet';
            cssLink.href = basePath + 'css/footer.css';
            document.head.appendChild(cssLink);
        })
        .catch(error => {
            console.error('Error loading footer:', error);
            footerPlaceholder.innerHTML = '<!-- Footer failed to load -->';
        });
})();
