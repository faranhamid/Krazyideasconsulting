// ===== ANIMATIONS JAVASCRIPT FILE =====

// Advanced animation system for KrazyIdeasConsulting website

class AnimationManager {
    constructor() {
        this.animations = new Map();
        this.observers = new Map();
        this.init();
    }

    init() {
        this.initScrollAnimations();
        this.initHoverAnimations();
        this.initTypingAnimations();
        this.initParallaxEffects();
        this.initMorphingAnimations();
        this.initStaggerAnimations();
    }

    // ===== SCROLL ANIMATIONS =====
    initScrollAnimations() {
        const scrollElements = document.querySelectorAll('[data-scroll-animation]');
        
        const scrollObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const animationType = entry.target.dataset.scrollAnimation;
                    this.playScrollAnimation(entry.target, animationType);
                    scrollObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        scrollElements.forEach(el => scrollObserver.observe(el));
    }

    playScrollAnimation(element, type) {
        const animations = {
            'fade-up': () => this.fadeUpAnimation(element),
            'fade-down': () => this.fadeDownAnimation(element),
            'fade-left': () => this.fadeLeftAnimation(element),
            'fade-right': () => this.fadeRightAnimation(element),
            'scale-in': () => this.scaleInAnimation(element),
            'slide-up': () => this.slideUpAnimation(element),
            'slide-down': () => this.slideDownAnimation(element),
            'rotate-in': () => this.rotateInAnimation(element),
            'bounce-in': () => this.bounceInAnimation(element),
            'flip-in': () => this.flipInAnimation(element)
        };

        if (animations[type]) {
            animations[type]();
        }
    }

    // ===== HOVER ANIMATIONS =====
    initHoverAnimations() {
        const hoverElements = document.querySelectorAll('[data-hover-animation]');
        
        hoverElements.forEach(element => {
            const animationType = element.dataset.hoverAnimation;
            
            element.addEventListener('mouseenter', () => {
                this.playHoverAnimation(element, animationType, 'enter');
            });
            
            element.addEventListener('mouseleave', () => {
                this.playHoverAnimation(element, animationType, 'leave');
            });
        });
    }

    playHoverAnimation(element, type, state) {
        const animations = {
            'pulse': () => this.pulseAnimation(element, state),
            'bounce': () => this.bounceAnimation(element, state),
            'shake': () => this.shakeAnimation(element, state),
            'wiggle': () => this.wiggleAnimation(element, state),
            'glow': () => this.glowAnimation(element, state),
            'scale': () => this.scaleAnimation(element, state),
            'rotate': () => this.rotateAnimation(element, state),
            'slide': () => this.slideAnimation(element, state)
        };

        if (animations[type]) {
            animations[type]();
        }
    }

    // ===== TYPING ANIMATIONS =====
    initTypingAnimations() {
        const typingElements = document.querySelectorAll('[data-typing-text]');
        
        typingElements.forEach(element => {
            const text = element.dataset.typingText;
            const speed = parseInt(element.dataset.typingSpeed) || 100;
            this.startTypingAnimation(element, text, speed);
        });
    }

    startTypingAnimation(element, text, speed) {
        element.textContent = '';
        element.classList.add('typing-animation');
        
        let index = 0;
        const typeInterval = setInterval(() => {
            if (index < text.length) {
                element.textContent += text.charAt(index);
                index++;
            } else {
                clearInterval(typeInterval);
                element.classList.remove('typing-animation');
            }
        }, speed);
    }

    // ===== PARALLAX EFFECTS =====
    initParallaxEffects() {
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            
            parallaxElements.forEach(element => {
                const speed = parseFloat(element.dataset.parallax) || 0.5;
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        });
    }

    // ===== MORPHING ANIMATIONS =====
    initMorphingAnimations() {
        const morphElements = document.querySelectorAll('[data-morph]');
        
        morphElements.forEach(element => {
            const targetShape = element.dataset.morph;
            element.addEventListener('click', () => {
                this.morphAnimation(element, targetShape);
            });
        });
    }

    morphAnimation(element, targetShape) {
        element.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        
        switch (targetShape) {
            case 'circle':
                element.style.borderRadius = '50%';
                break;
            case 'square':
                element.style.borderRadius = '0';
                break;
            case 'triangle':
                element.style.clipPath = 'polygon(50% 0%, 0% 100%, 100% 100%)';
                break;
        }
        
        setTimeout(() => {
            element.style.transition = '';
        }, 600);
    }

    // ===== STAGGER ANIMATIONS =====
    initStaggerAnimations() {
        const staggerContainers = document.querySelectorAll('[data-stagger]');
        
        staggerContainers.forEach(container => {
            const children = container.children;
            const delay = parseInt(container.dataset.staggerDelay) || 100;
            
            Array.from(children).forEach((child, index) => {
                child.style.animationDelay = `${index * delay}ms`;
                child.classList.add('stagger-animation');
            });
        });
    }

    // ===== ANIMATION METHODS =====
    
    fadeUpAnimation(element) {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.8s ease-out';
        
        requestAnimationFrame(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        });
    }

    fadeDownAnimation(element) {
        element.style.opacity = '0';
        element.style.transform = 'translateY(-30px)';
        element.style.transition = 'all 0.8s ease-out';
        
        requestAnimationFrame(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        });
    }

    fadeLeftAnimation(element) {
        element.style.opacity = '0';
        element.style.transform = 'translateX(-30px)';
        element.style.transition = 'all 0.8s ease-out';
        
        requestAnimationFrame(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateX(0)';
        });
    }

    fadeRightAnimation(element) {
        element.style.opacity = '0';
        element.style.transform = 'translateX(30px)';
        element.style.transition = 'all 0.8s ease-out';
        
        requestAnimationFrame(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateX(0)';
        });
    }

    scaleInAnimation(element) {
        element.style.opacity = '0';
        element.style.transform = 'scale(0.8)';
        element.style.transition = 'all 0.6s ease-out';
        
        requestAnimationFrame(() => {
            element.style.opacity = '1';
            element.style.transform = 'scale(1)';
        });
    }

    slideUpAnimation(element) {
        element.style.opacity = '0';
        element.style.transform = 'translateY(100px)';
        element.style.transition = 'all 0.8s ease-out';
        
        requestAnimationFrame(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        });
    }

    slideDownAnimation(element) {
        element.style.opacity = '0';
        element.style.transform = 'translateY(-100px)';
        element.style.transition = 'all 0.8s ease-out';
        
        requestAnimationFrame(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        });
    }

    rotateInAnimation(element) {
        element.style.opacity = '0';
        element.style.transform = 'rotate(-180deg) scale(0.5)';
        element.style.transition = 'all 0.8s ease-out';
        
        requestAnimationFrame(() => {
            element.style.opacity = '1';
            element.style.transform = 'rotate(0deg) scale(1)';
        });
    }

    bounceInAnimation(element) {
        element.style.opacity = '0';
        element.style.transform = 'scale(0.3)';
        element.style.transition = 'all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        
        requestAnimationFrame(() => {
            element.style.opacity = '1';
            element.style.transform = 'scale(1)';
        });
    }

    flipInAnimation(element) {
        element.style.opacity = '0';
        element.style.transform = 'perspective(400px) rotateY(90deg)';
        element.style.transition = 'all 0.8s ease-out';
        
        requestAnimationFrame(() => {
            element.style.opacity = '1';
            element.style.transform = 'perspective(400px) rotateY(0deg)';
        });
    }

    // ===== HOVER ANIMATION METHODS =====
    
    pulseAnimation(element, state) {
        if (state === 'enter') {
            element.style.animation = 'pulse 0.6s ease-in-out';
        } else {
            element.style.animation = '';
        }
    }

    bounceAnimation(element, state) {
        if (state === 'enter') {
            element.style.animation = 'bounce 0.6s ease-in-out';
        } else {
            element.style.animation = '';
        }
    }

    shakeAnimation(element, state) {
        if (state === 'enter') {
            element.style.animation = 'shake 0.6s ease-in-out';
        } else {
            element.style.animation = '';
        }
    }

    wiggleAnimation(element, state) {
        if (state === 'enter') {
            element.style.animation = 'wiggle 0.6s ease-in-out';
        } else {
            element.style.animation = '';
        }
    }

    glowAnimation(element, state) {
        if (state === 'enter') {
            element.style.animation = 'glow 2s ease-in-out infinite';
        } else {
            element.style.animation = '';
        }
    }

    scaleAnimation(element, state) {
        if (state === 'enter') {
            element.style.transform = 'scale(1.1)';
        } else {
            element.style.transform = 'scale(1)';
        }
    }

    rotateAnimation(element, state) {
        if (state === 'enter') {
            element.style.transform = 'rotate(5deg)';
        } else {
            element.style.transform = 'rotate(0deg)';
        }
    }

    slideAnimation(element, state) {
        if (state === 'enter') {
            element.style.transform = 'translateX(10px)';
        } else {
            element.style.transform = 'translateX(0)';
        }
    }

    // ===== ADVANCED ANIMATION EFFECTS =====
    
    createRippleEffect(event) {
        const ripple = document.createElement('span');
        const rect = event.currentTarget.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;
        
        event.currentTarget.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    createParticleExplosion(element, count = 20) {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        for (let i = 0; i < count; i++) {
            const particle = document.createElement('div');
            const angle = (i / count) * Math.PI * 2;
            const velocity = 2 + Math.random() * 3;
            const size = 4 + Math.random() * 8;
            
            particle.style.cssText = `
                position: fixed;
                left: ${centerX}px;
                top: ${centerY}px;
                width: ${size}px;
                height: ${size}px;
                background: #6B46C1;
                border-radius: 50%;
                pointer-events: none;
                z-index: 1000;
            `;
            
            document.body.appendChild(particle);
            
            const animation = particle.animate([
                {
                    transform: 'translate(0, 0) scale(1)',
                    opacity: 1
                },
                {
                    transform: `translate(${Math.cos(angle) * 100 * velocity}px, ${Math.sin(angle) * 100 * velocity}px) scale(0)`,
                    opacity: 0
                }
            ], {
                duration: 1000,
                easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            });
            
            animation.onfinish = () => particle.remove();
        }
    }

    // ===== PERFORMANCE OPTIMIZATIONS =====
    
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
}

// ===== INITIALIZATION =====

// Initialize animation manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.animationManager = new AnimationManager();
});

// ===== UTILITY FUNCTIONS =====

// Add ripple effect to buttons
function addRippleEffect() {
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            window.animationManager.createRippleEffect(e);
        });
    });
}

// Add particle explosion to cards
function addParticleExplosion() {
    const cards = document.querySelectorAll('.service-card, .client-card, .insight-card');
    cards.forEach(card => {
        card.addEventListener('click', () => {
            window.animationManager.createParticleExplosion(card);
        });
    });
}

// Initialize utility functions
document.addEventListener('DOMContentLoaded', () => {
    addRippleEffect();
    addParticleExplosion();
});

// ===== EXPORT FOR MODULE SYSTEM =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AnimationManager;
} 