/**
 * Load Header Component
 * Dynamically loads the unified header into pages
 * Optimized for faster loading and preventing FOUC
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
    
    // Preload CSS immediately for faster rendering (before any async operations)
    // Check if CSS is already loaded to avoid duplicates
    const existingCss = document.querySelector(`link[href="${basePath}css/header.css"]`);
    if (!existingCss) {
        // Add preload link for faster CSS loading
        const preloadLink = document.createElement('link');
        preloadLink.rel = 'preload';
        preloadLink.as = 'style';
        preloadLink.href = basePath + 'css/header.css';
        document.head.appendChild(preloadLink);
        
        // Load CSS stylesheet
        const cssLink = document.createElement('link');
        cssLink.rel = 'stylesheet';
        cssLink.href = basePath + 'css/header.css';
        document.head.appendChild(cssLink);
    }

    // Add minimal placeholder styling to prevent disappearing effect
    headerPlaceholder.style.minHeight = '80px';
    headerPlaceholder.style.backgroundColor = '#ffffff';
    headerPlaceholder.style.borderBottom = '1px solid #e5e7eb';
    headerPlaceholder.style.position = 'sticky';
    headerPlaceholder.style.top = '0';
    headerPlaceholder.style.zIndex = '1000';
    headerPlaceholder.style.transition = 'opacity 0.2s ease';
    
    // Load header HTML and JS in parallel for better performance
    Promise.all([
        fetch(basePath + 'components/header.html').then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text();
        }),
        // Preload header.js script
        new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = basePath + 'js/header.js';
            script.async = true;
            script.onload = resolve;
            script.onerror = resolve; // Continue even if script fails to load
            document.body.appendChild(script);
        })
    ])
    .then(([html]) => {
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
        
        // Insert HTML
        headerPlaceholder.innerHTML = html;
        
        // Smooth transition - header is already visible via placeholder, so no need to fade in
        // Just ensure it's fully opaque
        headerPlaceholder.style.opacity = '1';
        
        // Initialize translations after header is loaded
        // Use requestAnimationFrame for better timing
        requestAnimationFrame(() => {
            if (window.MedikalTranslations && typeof window.MedikalTranslations.translate === 'function') {
                const savedLang = localStorage.getItem('preferredLanguage') || 'en';
                window.MedikalTranslations.translate(savedLang);
            }
        });
    })
    .catch(error => {
        console.error('Error loading header:', error);
        headerPlaceholder.innerHTML = '<!-- Header failed to load -->';
        headerPlaceholder.style.minHeight = '0';
    });
})();
