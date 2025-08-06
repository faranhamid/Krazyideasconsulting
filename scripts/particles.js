// ===== PARTICLE SYSTEM JAVASCRIPT FILE =====

class ParticleSystem {
    constructor(container, options = {}) {
        this.container = container;
        this.particles = [];
        this.options = {
            particleCount: options.particleCount || 50,
            particleSize: options.particleSize || { min: 2, max: 6 },
            particleSpeed: options.particleSpeed || { min: 1, max: 3 },
            particleColor: options.particleColor || '#FFFFFF',
            particleOpacity: options.particleOpacity || { min: 0.1, max: 0.6 },
            connectionDistance: options.connectionDistance || 150,
            connectionColor: options.connectionColor || 'rgba(255, 255, 255, 0.1)',
            connectionWidth: options.connectionWidth || 1,
            mouseInteraction: options.mouseInteraction !== false,
            responsive: options.responsive !== false
        };
        
        this.mouse = { x: 0, y: 0 };
        this.canvas = null;
        this.ctx = null;
        this.animationId = null;
        
        this.init();
    }

    init() {
        this.createCanvas();
        this.createParticles();
        this.bindEvents();
        this.animate();
    }

    createCanvas() {
        this.canvas = document.createElement('canvas');
        this.canvas.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
        `;
        
        this.container.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');
        this.resizeCanvas();
    }

    resizeCanvas() {
        const rect = this.container.getBoundingClientRect();
        this.canvas.width = rect.width;
        this.canvas.height = rect.height;
    }

    createParticles() {
        for (let i = 0; i < this.options.particleCount; i++) {
            this.particles.push(new Particle(this.canvas, this.options));
        }
    }

    bindEvents() {
        // Mouse interaction
        if (this.options.mouseInteraction) {
            this.canvas.addEventListener('mousemove', (e) => {
                const rect = this.canvas.getBoundingClientRect();
                this.mouse.x = e.clientX - rect.left;
                this.mouse.y = e.clientY - rect.top;
            });

            this.canvas.addEventListener('mouseleave', () => {
                this.mouse.x = 0;
                this.mouse.y = 0;
            });
        }

        // Responsive resize
        if (this.options.responsive) {
            window.addEventListener('resize', () => {
                this.resizeCanvas();
                this.particles.forEach(particle => {
                    particle.reset();
                });
            });
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Update and draw particles
        this.particles.forEach(particle => {
            particle.update(this.mouse);
            particle.draw(this.ctx);
        });

        // Draw connections
        this.drawConnections();

        this.animationId = requestAnimationFrame(() => this.animate());
    }

    drawConnections() {
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const particleA = this.particles[i];
                const particleB = this.particles[j];
                
                const distance = this.getDistance(particleA, particleB);
                
                if (distance < this.options.connectionDistance) {
                    const opacity = 1 - (distance / this.options.connectionDistance);
                    this.ctx.strokeStyle = this.options.connectionColor.replace('0.1', opacity.toString());
                    this.ctx.lineWidth = this.options.connectionWidth;
                    this.ctx.beginPath();
                    this.ctx.moveTo(particleA.x, particleA.y);
                    this.ctx.lineTo(particleB.x, particleB.y);
                    this.ctx.stroke();
                }
            }
        }
    }

    getDistance(particleA, particleB) {
        const dx = particleA.x - particleB.x;
        const dy = particleA.y - particleB.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        if (this.canvas && this.canvas.parentNode) {
            this.canvas.parentNode.removeChild(this.canvas);
        }
    }
}

class Particle {
    constructor(canvas, options) {
        this.canvas = canvas;
        this.options = options;
        this.reset();
    }

    reset() {
        this.x = Math.random() * this.canvas.width;
        this.y = Math.random() * this.canvas.height;
        this.vx = (Math.random() - 0.5) * this.options.particleSpeed.max;
        this.vy = (Math.random() - 0.5) * this.options.particleSpeed.max;
        this.size = Math.random() * (this.options.particleSize.max - this.options.particleSize.min) + this.options.particleSize.min;
        this.opacity = Math.random() * (this.options.particleOpacity.max - this.options.particleOpacity.min) + this.options.particleOpacity.min;
        this.originalSize = this.size;
    }

    update(mouse) {
        // Update position
        this.x += this.vx;
        this.y += this.vy;

        // Bounce off edges
        if (this.x < 0 || this.x > this.canvas.width) {
            this.vx = -this.vx;
        }
        if (this.y < 0 || this.y > this.canvas.height) {
            this.vy = -this.vy;
        }

        // Mouse interaction
        if (mouse.x && mouse.y) {
            const dx = mouse.x - this.x;
            const dy = mouse.y - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
                const force = (100 - distance) / 100;
                this.size = this.originalSize + force * 5;
                this.opacity = Math.min(this.options.particleOpacity.max, this.opacity + force * 0.1);
            } else {
                this.size = this.originalSize;
                this.opacity = this.options.particleOpacity.min;
            }
        }

        // Keep particle in bounds
        this.x = Math.max(0, Math.min(this.canvas.width, this.x));
        this.y = Math.max(0, Math.min(this.canvas.height, this.y));
    }

    draw(ctx) {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.options.particleColor;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

// ===== ADVANCED PARTICLE EFFECTS =====

class ExplosionParticle {
    constructor(x, y, color = '#6B46C1') {
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5) * 10;
        this.vy = (Math.random() - 0.5) * 10;
        this.size = Math.random() * 4 + 2;
        this.color = color;
        this.opacity = 1;
        this.gravity = 0.1;
        this.friction = 0.98;
        this.life = 1;
        this.decay = 0.02;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += this.gravity;
        this.vx *= this.friction;
        this.vy *= this.friction;
        this.life -= this.decay;
        this.opacity = this.life;
    }

    draw(ctx) {
        if (this.life > 0) {
            ctx.save();
            ctx.globalAlpha = this.opacity;
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
    }
}

class FireworkParticle {
    constructor(x, y, targetX, targetY, color = '#6B46C1') {
        this.x = x;
        this.y = y;
        this.targetX = targetX;
        this.targetY = targetY;
        this.color = color;
        this.size = 3;
        this.opacity = 1;
        this.speed = 2;
        this.angle = Math.atan2(targetY - y, targetX - x);
        this.vx = Math.cos(this.angle) * this.speed;
        this.vy = Math.sin(this.angle) * this.speed;
        this.exploded = false;
        this.explosionParticles = [];
    }

    update() {
        if (!this.exploded) {
            this.x += this.vx;
            this.y += this.vy;
            
            const distance = Math.sqrt(
                Math.pow(this.targetX - this.x, 2) + 
                Math.pow(this.targetY - this.y, 2)
            );
            
            if (distance < 10) {
                this.explode();
            }
        } else {
            this.explosionParticles.forEach((particle, index) => {
                particle.update();
                if (particle.life <= 0) {
                    this.explosionParticles.splice(index, 1);
                }
            });
        }
    }

    explode() {
        this.exploded = true;
        for (let i = 0; i < 20; i++) {
            this.explosionParticles.push(new ExplosionParticle(this.x, this.y, this.color));
        }
    }

    draw(ctx) {
        if (!this.exploded) {
            ctx.save();
            ctx.globalAlpha = this.opacity;
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        } else {
            this.explosionParticles.forEach(particle => {
                particle.draw(ctx);
            });
        }
    }
}

// ===== PARTICLE EFFECTS MANAGER =====

class ParticleEffectsManager {
    constructor() {
        this.effects = [];
        this.canvas = null;
        this.ctx = null;
        this.init();
    }

    init() {
        this.createCanvas();
        this.animate();
    }

    createCanvas() {
        this.canvas = document.createElement('canvas');
        this.canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 9999;
        `;
        document.body.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');
        this.resizeCanvas();
        
        window.addEventListener('resize', () => this.resizeCanvas());
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createExplosion(x, y, color = '#6B46C1') {
        for (let i = 0; i < 30; i++) {
            this.effects.push(new ExplosionParticle(x, y, color));
        }
    }

    createFirework(startX, startY, endX, endY, color = '#6B46C1') {
        this.effects.push(new FireworkParticle(startX, startY, endX, endY, color));
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.effects.forEach((effect, index) => {
            effect.update();
            effect.draw(this.ctx);
            
            if (effect.exploded && effect.explosionParticles.length === 0) {
                this.effects.splice(index, 1);
            }
        });
        
        requestAnimationFrame(() => this.animate());
    }

    destroy() {
        if (this.canvas && this.canvas.parentNode) {
            this.canvas.parentNode.removeChild(this.canvas);
        }
    }
}

// ===== INITIALIZATION =====

document.addEventListener('DOMContentLoaded', () => {
    // Initialize hero particles
    const heroParticles = document.getElementById('hero-particles');
    if (heroParticles) {
        window.heroParticleSystem = new ParticleSystem(heroParticles, {
            particleCount: 30,
            particleSize: { min: 1, max: 3 },
            particleSpeed: { min: 0.5, max: 1.5 },
            particleColor: 'rgba(255, 255, 255, 0.6)',
            particleOpacity: { min: 0.2, max: 0.8 },
            connectionDistance: 100,
            connectionColor: 'rgba(255, 255, 255, 0.1)',
            connectionWidth: 1,
            mouseInteraction: true,
            responsive: true
        });
    }

    // Initialize effects manager
    window.particleEffectsManager = new ParticleEffectsManager();

    // Add click effects to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            const rect = button.getBoundingClientRect();
            const x = rect.left + rect.width / 2;
            const y = rect.top + rect.height / 2;
            window.particleEffectsManager.createExplosion(x, y, '#6B46C1');
        });
    });

    // Add hover effects to cards
    const cards = document.querySelectorAll('.service-card, .client-card, .insight-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', (e) => {
            const rect = card.getBoundingClientRect();
            const x = rect.left + rect.width / 2;
            const y = rect.top + rect.height / 2;
            
            // Create subtle particle effect on hover
            for (let i = 0; i < 5; i++) {
                setTimeout(() => {
                    window.particleEffectsManager.createExplosion(
                        x + (Math.random() - 0.5) * 50,
                        y + (Math.random() - 0.5) * 50,
                        '#6B46C1'
                    );
                }, i * 100);
            }
        });
    });
});

// ===== UTILITY FUNCTIONS =====

function createParticleTrail(x, y, count = 10) {
    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            window.particleEffectsManager.createExplosion(
                x + (Math.random() - 0.5) * 20,
                y + (Math.random() - 0.5) * 20,
                '#6B46C1'
            );
        }, i * 50);
    }
}

function createFireworkShow() {
    const canvas = window.particleEffectsManager.canvas;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const startX = Math.random() * canvas.width;
            const startY = canvas.height;
            const endX = centerX + (Math.random() - 0.5) * 200;
            const endY = centerY + (Math.random() - 0.5) * 200;
            
            window.particleEffectsManager.createFirework(startX, startY, endX, endY, '#6B46C1');
        }, i * 1000);
    }
}

// ===== EXPORT FOR MODULE SYSTEM =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        ParticleSystem,
        Particle,
        ExplosionParticle,
        FireworkParticle,
        ParticleEffectsManager
    };
} 