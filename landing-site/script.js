// Mobile menu toggle - wrapped in DOMContentLoaded for safety
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu is handled in index.html inline script, so we skip it here
    // This prevents conflicts with the existing mobile menu implementation
});

// Smooth scroll function
function scrollToAccess() {
    document.getElementById('access').scrollIntoView({ 
        behavior: 'smooth' 
    });
}

// AI Avatar speak functionality
document.addEventListener('DOMContentLoaded', function() {
    const speakBtn = document.getElementById('speakBtn');
    if (!speakBtn) return; // Exit if element doesn't exist
    
    let isPlaying = false;

    speakBtn.addEventListener('click', () => {
    if (!isPlaying) {
        // Start speaking animation
        isPlaying = true;
        speakBtn.innerHTML = '<i class="fas fa-volume-up mr-2 animate-pulse"></i>Speaking...';
        speakBtn.classList.add('animate-pulse');
        
        // Simulate AI speaking (replace with actual audio/TTS)
        const message = "Welcome to Medikal – Africa's own AI-powered health assistant, fighting Antimicrobial Resistance for safer, smarter healthcare.";
        
        // Use Web Speech API if available
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(message);
            utterance.rate = 0.8;
            utterance.pitch = 1;
            utterance.volume = 1;
            
            utterance.onend = () => {
                isPlaying = false;
                speakBtn.innerHTML = '<i class="fas fa-volume-up mr-2"></i>Click to Speak';
                speakBtn.classList.remove('animate-pulse');
            };
            
            speechSynthesis.speak(utterance);
        } else {
            // Fallback for browsers without speech synthesis
            setTimeout(() => {
                isPlaying = false;
                speakBtn.innerHTML = '<i class="fas fa-volume-up mr-2"></i>Click to Speak';
                speakBtn.classList.remove('animate-pulse');
                alert(message);
            }, 3000);
        }
    } else {
        // Stop speaking
        if ('speechSynthesis' in window) {
            speechSynthesis.cancel();
        }
        isPlaying = false;
        speakBtn.innerHTML = '<i class="fas fa-volume-up mr-2"></i>Click to Speak';
        speakBtn.classList.remove('animate-pulse');
    }
    });
});

// Early access form handling
document.addEventListener('DOMContentLoaded', function() {
    const accessForm = document.getElementById('accessForm');
    const successMessage = document.getElementById('successMessage');
    const submitText = document.getElementById('submitText');
    const submitIcon = document.getElementById('submitIcon');
    
    if (!accessForm) return; // Exit if form doesn't exist

    accessForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const reason = document.getElementById('reason').value;
    
    // Show loading state
    submitText.textContent = 'Submitting...';
    submitIcon.className = 'fas fa-spinner fa-spin ml-2';
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        // Hide form and show success message
        accessForm.style.display = 'none';
        successMessage.classList.remove('hidden');
        successMessage.classList.add('animate-slide-up');
        
        // Store submission (you can replace this with actual API call)
        console.log('Early access request:', { email, reason, timestamp: new Date() });
        
        // You can integrate with services like:
        // - Netlify Forms
        // - Formspree
        // - EmailJS
        // - Your own backend API
        
    }, 2000);
    });
});

// Intersection Observer for animations - optimized
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-slide-up');
                // Unobserve after animation to improve performance
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation - only on desktop for performance
    if (window.innerWidth > 768) {
        document.querySelectorAll('section > div').forEach(el => {
            observer.observe(el);
        });
    }
});

// Cyber glitch effect for hero text (optional) - only on desktop
document.addEventListener('DOMContentLoaded', function() {
    const heroTitle = document.querySelector('h1');
    if (!heroTitle || window.innerWidth <= 768) return; // Skip on mobile
    
    let glitchInterval;

    heroTitle.addEventListener('mouseenter', () => {
    let glitchCount = 0;
    glitchInterval = setInterval(() => {
        if (glitchCount < 3) {
            heroTitle.style.textShadow = '2px 0 #00ffff, -2px 0 #efb291';
            setTimeout(() => {
                heroTitle.style.textShadow = 'none';
            }, 100);
            glitchCount++;
        } else {
            clearInterval(glitchInterval);
        }
    }, 200);
    });
});

// Particle background effect - DISABLED for performance
// Uncomment and optimize if needed, but it's causing performance issues
/*
document.addEventListener('DOMContentLoaded', function() {
    // Only run on desktop and if user prefers reduced motion is off
    if (window.innerWidth < 768 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
    }

    let particleInterval;
    let particleCount = 0;
    const maxParticles = 10; // Limit particles

    function createParticle() {
        if (particleCount >= maxParticles) return;
        
        const particle = document.createElement('div');
        particle.className = 'fixed w-1 h-1 bg-neon-cyan rounded-full opacity-30 pointer-events-none';
        particle.style.left = Math.random() * window.innerWidth + 'px';
        particle.style.top = window.innerHeight + 'px';
        particle.style.animation = `particleFloat ${3 + Math.random() * 4}s linear forwards`;
        
        document.body.appendChild(particle);
        particleCount++;
        
        setTimeout(() => {
            particle.remove();
            particleCount--;
        }, 7000);
    }

    // Add particle animation keyframes only once
    if (!document.getElementById('particle-styles')) {
        const style = document.createElement('style');
        style.id = 'particle-styles';
        style.textContent = `
            @keyframes particleFloat {
                to {
                    transform: translateY(-${window.innerHeight + 100}px) translateX(${Math.random() * 200 - 100}px);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Create particles less frequently
    particleInterval = setInterval(createParticle, 3000);
    
    // Clean up on page unload
    window.addEventListener('beforeunload', () => {
        if (particleInterval) clearInterval(particleInterval);
    });
});
*/