// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Close mobile menu when clicking on links
const mobileLinks = mobileMenu.querySelectorAll('a');
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
    });
});

// Smooth scroll function
function scrollToAccess() {
    document.getElementById('access').scrollIntoView({ 
        behavior: 'smooth' 
    });
}

// AI Avatar speak functionality
const speakBtn = document.getElementById('speakBtn');
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

// Early access form handling
const accessForm = document.getElementById('accessForm');
const successMessage = document.getElementById('successMessage');
const submitText = document.getElementById('submitText');
const submitIcon = document.getElementById('submitIcon');

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

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-slide-up');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('section > div').forEach(el => {
    observer.observe(el);
});

// Cyber glitch effect for hero text (optional)
const heroTitle = document.querySelector('h1');
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

// Particle background effect (lightweight)
function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'fixed w-1 h-1 bg-neon-cyan rounded-full opacity-30 pointer-events-none';
    particle.style.left = Math.random() * window.innerWidth + 'px';
    particle.style.top = window.innerHeight + 'px';
    particle.style.animation = `particleFloat ${3 + Math.random() * 4}s linear forwards`;
    
    document.body.appendChild(particle);
    
    setTimeout(() => {
        particle.remove();
    }, 7000);
}

// Add particle animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes particleFloat {
        to {
            transform: translateY(-${window.innerHeight + 100}px) translateX(${Math.random() * 200 - 100}px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Create particles periodically
setInterval(createParticle, 2000);

// Performance optimization: Reduce particles on mobile
if (window.innerWidth < 768) {
    clearInterval();
    setInterval(createParticle, 5000);
}