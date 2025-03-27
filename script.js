// Dark Mode Toggle
const darkModeToggle = document.createElement('button');
darkModeToggle.innerHTML = '🌙';
darkModeToggle.className = 'dark-mode-toggle';
document.body.appendChild(darkModeToggle);
console.log('Dark mode toggle button created');

let isDarkMode = false;
darkModeToggle.addEventListener('click', () => {
    isDarkMode = !isDarkMode;
    document.body.classList.toggle('dark-mode');
    darkModeToggle.innerHTML = isDarkMode ? '☀️' : '🌙';
    console.log('Dark mode toggled:', isDarkMode);
});

// Typing Animation
const heroText = document.querySelector('.hero-content h1');
console.log('Hero text found:', heroText);
if (heroText) {
    const originalText = heroText.textContent;
    console.log('Original text:', originalText);
    heroText.textContent = '';
    let i = 0;

    function typeWriter() {
        if (i < originalText.length) {
            heroText.textContent += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }

    // Start typing animation when page loads
    window.addEventListener('load', typeWriter);
}

// Scroll Progress Indicator
const progressBar = document.createElement('div');
progressBar.className = 'scroll-progress';
document.body.appendChild(progressBar);
console.log('Progress bar created');

window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    progressBar.style.width = `${scrolled}%`;
    console.log('Scroll progress:', scrolled + '%');
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background change on scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Form submission handling
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const formObject = {};
        formData.forEach((value, key) => {
            formObject[key] = value;
        });

        // Here you would typically send the form data to a server
        // For now, we'll just show a success message
        alert('Thank you for your message! I will get back to you soon.');
        this.reset();
    });
}

// Add animation to project cards on scroll
const projectCards = document.querySelectorAll('.project-card');
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

projectCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(card);
});

// Multiple Particles with Random Properties and Connections
class Particle {
    constructor(canvas) {
        this.canvas = canvas;
        this.x = Math.random() * canvas.width;  // Random starting position
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;      // Random size between 1-4 pixels
        this.speedX = Math.random() * 2 - 1;    // Random horizontal speed (-1 to 1)
        this.speedY = Math.random() * 2 - 1;    // Random vertical speed (-1 to 1)
        this.color = `rgba(46, 204, 113, ${Math.random() * 0.5 + 0.2})`; // Random opacity
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Bounce off edges
        if (this.x > this.canvas.width || this.x < 0) this.speedX *= -1;
        if (this.y > this.canvas.height || this.y < 0) this.speedY *= -1;
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Initialize multiple particles with connections
function initMultipleParticles() {
    const hero = document.querySelector('.hero');
    const canvas = document.createElement('canvas');
    canvas.className = 'particle-canvas';
    hero.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    const particles = [];

    function resizeCanvas() {
        canvas.width = hero.offsetWidth;
        canvas.height = hero.offsetHeight;
    }

    function createParticles() {
        const particleCount = 20;  // Fixed number of particles for testing
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle(canvas));
        }
    }

    function drawConnections() {
        particles.forEach((particle, i) => {
            particles.slice(i + 1).forEach(otherParticle => {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 100) {  // Only connect particles within 100 pixels
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(46, 204, 113, ${0.2 * (1 - distance / 100)})`;
                    ctx.lineWidth = 1;
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(otherParticle.x, otherParticle.y);
                    ctx.stroke();
                }
            });
        });
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw connections first (so they appear behind particles)
        drawConnections();
        
        // Then draw particles
        particles.forEach(particle => {
            particle.update();
            particle.draw(ctx);
        });

        requestAnimationFrame(animate);
    }

    // Initialize
    resizeCanvas();
    createParticles();
    animate();

    // Handle window resize
    window.addEventListener('resize', () => {
        resizeCanvas();
        particles.length = 0;  // Clear existing particles
        createParticles();     // Create new particles
    });
}

// Start multiple particles when page loads
window.addEventListener('load', initMultipleParticles);

// 3D Hover Effect for Project Cards
function init3DHoverEffect() {
    const cards = document.querySelectorAll('.project-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });
}

// Initialize 3D hover effect when page loads
window.addEventListener('load', init3DHoverEffect); 