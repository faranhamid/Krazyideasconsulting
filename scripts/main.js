// ===================================
// KRAZYIDEASCONSULTING - LUXURY INTERACTIONS
// Premium JavaScript for Elite Consulting Experience
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    initLuxuryNavigation();
    initSmoothScrolling();
    initAnimationTriggers();
    initCounterAnimations();
    initParallaxEffects();
    initMobileMenu();
    initContactInteractions();
});

/**
 * Luxury Navigation - Scrolled state and smooth transitions
 */
function initLuxuryNavigation() {
    const navbar = document.getElementById('main-nav');
    if (!navbar) return;

    const scrollThreshold = 100;
    let isScrolled = false;

    const handleScroll = () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > scrollThreshold && !isScrolled) {
            navbar.classList.add('scrolled');
            isScrolled = true;
        } else if (currentScroll <= scrollThreshold && isScrolled) {
            navbar.classList.remove('scrolled');
            isScrolled = false;
        }
    };

    // Throttled scroll handler for performance
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });

    // Active nav link highlighting
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    const highlightNavLink = () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;
            
            if (window.pageYOffset >= sectionTop && 
                window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', highlightNavLink, { passive: true });
}

/**
 * Smooth Scrolling for Anchor Links
 */
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            if (href === '#') return;
            
            e.preventDefault();
            
            const target = document.querySelector(href);
            if (!target) return;

            const navHeight = document.getElementById('main-nav')?.offsetHeight || 80;
            const targetPosition = target.offsetTop - navHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            const mobileMenu = document.querySelector('.nav-menu');
            const navToggle = document.querySelector('.nav-toggle');
            if (mobileMenu && navToggle) {
                mobileMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    });
}

/**
 * Animation Triggers - Intersection Observer for scroll animations
 */
function initAnimationTriggers() {
    // Simple AOS-like functionality
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) scale(1)';
                
                // Add stagger delay for grid items
                const parent = entry.target.parentElement;
                if (parent && (parent.classList.contains('services-grid') || 
                              parent.classList.contains('results-grid'))) {
                    const siblings = Array.from(parent.children);
                    const index = siblings.indexOf(entry.target);
                    entry.target.style.transitionDelay = `${index * 100}ms`;
                }
            }
        });
    }, observerOptions);

    // Observe elements that should animate in
    const animateElements = document.querySelectorAll(`
        .service-card,
        .result-card,
        .founder-text,
        .founder-image,
        .section-header,
        .cta-content,
        .client-logo
    `);

    animateElements.forEach(el => {
        // Set initial state
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px) scale(0.95)';
        el.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        
        observer.observe(el);
    });
}

/**
 * Counter Animations for Stats
 */
function initCounterAnimations() {
    const counters = document.querySelectorAll('.stat-number, .result-metric');
    
    const animateCounter = (element) => {
        const target = element.textContent.trim();
        const isNumber = /^\d+$/.test(target);
        
        if (!isNumber) return;
        
        const finalValue = parseInt(target);
        const duration = 2000;
        const steps = 60;
        const stepValue = finalValue / steps;
        const stepDuration = duration / steps;
        
        let current = 0;
        
        const timer = setInterval(() => {
            current += stepValue;
            
            if (current >= finalValue) {
                element.textContent = finalValue;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, stepDuration);
    };

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

/**
 * Parallax Effects for Premium Feel
 */
function initParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.hero-background');
    
    if (!parallaxElements.length) return;
    
    let ticking = false;
    
    const updateParallax = () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.3;
        
        parallaxElements.forEach(element => {
            element.style.transform = `translate3d(0, ${rate}px, 0)`;
        });
        
        ticking = false;
    };

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }, { passive: true });
}

/**
 * Mobile Menu Toggle
 */
function initMobileMenu() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (!navToggle || !navMenu) return;

    navToggle.addEventListener('click', () => {
        const isActive = navMenu.classList.contains('active');
        
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        if (!isActive) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        
        // Update ARIA attributes
        navToggle.setAttribute('aria-expanded', !isActive);
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.style.overflow = '';
            navToggle.setAttribute('aria-expanded', 'false');
        }
    });
}

/**
 * Contact Form and CTA Interactions
 */
function initContactInteractions() {
    // Enhanced button hover effects
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', (e) => {
            const rect = button.getBoundingClientRect();
            const ripple = document.createElement('span');
            
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.1);
                transform: scale(0);
                animation: luxury-ripple 0.6s ease-out;
                left: ${e.clientX - rect.left - 10}px;
                top: ${e.clientY - rect.top - 10}px;
                width: 20px;
                height: 20px;
                pointer-events: none;
            `;
            
            button.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add ripple animation keyframes
    if (!document.querySelector('#luxury-ripple-styles')) {
        const style = document.createElement('style');
        style.id = 'luxury-ripple-styles';
        style.textContent = `
            @keyframes luxury-ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

/**
 * Utility Functions
 */

// Debounce function for performance
function debounce(func, wait) {
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

// Throttle function for scroll events
function throttle(func, limit) {
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

/**
 * Performance Monitoring
 */
function initPerformanceMonitoring() {
    // Monitor Core Web Vitals
    if ('web-vital' in window) {
        // This would integrate with actual web vitals library
        console.log('Performance monitoring initialized');
    }
    
    // Log page load performance
    window.addEventListener('load', () => {
        const perfData = performance.getEntriesByType('navigation')[0];
        if (perfData) {
            console.log(`Page loaded in ${perfData.loadEventEnd - perfData.loadEventStart}ms`);
        }
    });
}

/**
 * Error Handling
 */
window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
    // In production, this would send to error tracking service
});

// Initialize performance monitoring
initPerformanceMonitoring();

/**
 * Export for module systems
 */
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initLuxuryNavigation,
        initSmoothScrolling,
        initAnimationTriggers,
        initCounterAnimations,
        initParallaxEffects,
        initMobileMenu,
        initContactInteractions
    };
}