/**
 * Performance Optimization Helper
 * Adds lazy loading for images and other performance enhancements
 */

(function() {
    'use strict';

    // Automatically add lazy loading to images below the fold
    function addLazyLoadingToImages() {
        const images = document.querySelectorAll('img:not([loading]):not(.no-lazy)');
        let aboveFold = true;
        
        images.forEach((img, index) => {
            // Skip first few images (likely above fold)
            if (index < 3) {
                return;
            }
            
            // Check if image is likely above fold
            const rect = img.getBoundingClientRect();
            if (rect.top < window.innerHeight * 1.5) {
                return; // Image is visible or close to visible
            }
            
            // Add lazy loading attribute
            img.loading = 'lazy';
            img.decoding = 'async';
        });
    }

    // Lazy load images using Intersection Observer
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    
                    // Load the image
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    
                    // Handle srcset
                    if (img.dataset.srcset) {
                        img.srcset = img.dataset.srcset;
                        img.removeAttribute('data-srcset');
                    }
                    
                    // Add loaded class for styling
                    img.classList.add('loaded');
                    img.classList.remove('lazy');
                    
                    // Stop observing this image
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px' // Start loading 50px before image is visible
        });

        // Observe all lazy images
        document.addEventListener('DOMContentLoaded', function() {
            addLazyLoadingToImages();
            
            const lazyImages = document.querySelectorAll('img.lazy, img[data-src]');
            lazyImages.forEach(img => {
                imageObserver.observe(img);
            });
        });
    } else {
        // Fallback for browsers without IntersectionObserver
        document.addEventListener('DOMContentLoaded', function() {
            addLazyLoadingToImages();
            
            const lazyImages = document.querySelectorAll('img[data-src]');
            lazyImages.forEach(img => {
                img.src = img.dataset.src;
                if (img.dataset.srcset) {
                    img.srcset = img.dataset.srcset;
                }
            });
        });
    }

    // Preload critical resources on hover/click
    document.addEventListener('mouseover', function(e) {
        const link = e.target.closest('a[href]');
        if (link && link.href && !link.dataset.preloaded) {
            const href = link.getAttribute('href');
            // Only preload same-origin links
            if (href.startsWith('/') || href.startsWith(window.location.origin)) {
                const linkEl = document.createElement('link');
                linkEl.rel = 'prefetch';
                linkEl.href = href;
                document.head.appendChild(linkEl);
                link.dataset.preloaded = 'true';
            }
        }
    }, { passive: true });

    // Optimize scroll performance
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                // Scroll-based animations can go here
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });

    // Defer non-critical scripts
    window.addEventListener('load', function() {
        // Load analytics or other non-critical scripts here
        // Example: Google Analytics, chat widgets, etc.
    });
})();

