// ===== UTILITIES JAVASCRIPT FILE =====

// Comprehensive utility functions and helper classes for KrazyIdeasConsulting website

class Utils {
    constructor() {
        this.cache = new Map();
        this.observers = new Map();
        this.init();
    }

    init() {
        this.initPerformanceMonitoring();
        this.initErrorHandling();
        this.initDataManagement();
        this.initHelperFunctions();
    }

    // ===== PERFORMANCE MONITORING =====
    initPerformanceMonitoring() {
        // Monitor Core Web Vitals
        if ('PerformanceObserver' in window) {
            try {
                const observer = new PerformanceObserver((list) => {
                    for (const entry of list.getEntries()) {
                        this.logPerformanceMetric(entry);
                    }
                });
                observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });
            } catch (e) {
                console.warn('Performance monitoring not supported:', e);
            }
        }

        // Monitor memory usage
        if ('memory' in performance) {
            setInterval(() => {
                this.logMemoryUsage();
            }, 30000); // Every 30 seconds
        }
    }

    logPerformanceMetric(entry) {
        const metric = {
            name: entry.name,
            value: entry.value,
            timestamp: Date.now()
        };
        
        // Store in cache for analysis
        if (!this.cache.has('performance')) {
            this.cache.set('performance', []);
        }
        this.cache.get('performance').push(metric);
        
        // Log to console in development
        if (window.location.hostname === 'localhost') {
            console.log('Performance Metric:', metric);
        }
    }

    logMemoryUsage() {
        const memory = performance.memory;
        const usage = {
            used: Math.round(memory.usedJSHeapSize / 1048576),
            total: Math.round(memory.totalJSHeapSize / 1048576),
            limit: Math.round(memory.jsHeapSizeLimit / 1048576),
            timestamp: Date.now()
        };
        
        if (usage.used > usage.limit * 0.8) {
            console.warn('High memory usage detected:', usage);
        }
    }

    // ===== ERROR HANDLING =====
    initErrorHandling() {
        // Global error handler
        window.addEventListener('error', (e) => {
            this.handleError(e.error || e.message, e.filename, e.lineno);
        });

        // Promise rejection handler
        window.addEventListener('unhandledrejection', (e) => {
            this.handleError(e.reason, 'Promise Rejection', 0);
        });

        // Console error interceptor
        const originalError = console.error;
        console.error = (...args) => {
            this.handleError(args.join(' '), 'Console Error', 0);
            originalError.apply(console, args);
        };
    }

    handleError(message, filename, lineNumber) {
        const error = {
            message,
            filename,
            lineNumber,
            timestamp: Date.now(),
            userAgent: navigator.userAgent,
            url: window.location.href
        };

        // Store error for analysis
        if (!this.cache.has('errors')) {
            this.cache.set('errors', []);
        }
        this.cache.get('errors').push(error);

        // Log in development
        if (window.location.hostname === 'localhost') {
            console.error('Application Error:', error);
        }

        // Could send to error tracking service here
        // this.sendErrorToService(error);
    }

    // ===== DATA MANAGEMENT =====
    initDataManagement() {
        this.initLocalStorage();
        this.initSessionStorage();
        this.initDataValidation();
    }

    initLocalStorage() {
        // Safe localStorage wrapper
        this.storage = {
            get: (key, defaultValue = null) => {
                try {
                    const item = localStorage.getItem(key);
                    return item ? JSON.parse(item) : defaultValue;
                } catch (e) {
                    console.warn('Failed to get from localStorage:', e);
                    return defaultValue;
                }
            },
            set: (key, value) => {
                try {
                    localStorage.setItem(key, JSON.stringify(value));
                    return true;
                } catch (e) {
                    console.warn('Failed to set localStorage:', e);
                    return false;
                }
            },
            remove: (key) => {
                try {
                    localStorage.removeItem(key);
                    return true;
                } catch (e) {
                    console.warn('Failed to remove from localStorage:', e);
                    return false;
                }
            },
            clear: () => {
                try {
                    localStorage.clear();
                    return true;
                } catch (e) {
                    console.warn('Failed to clear localStorage:', e);
                    return false;
                }
            }
        };
    }

    initSessionStorage() {
        // Safe sessionStorage wrapper
        this.session = {
            get: (key, defaultValue = null) => {
                try {
                    const item = sessionStorage.getItem(key);
                    return item ? JSON.parse(item) : defaultValue;
                } catch (e) {
                    console.warn('Failed to get from sessionStorage:', e);
                    return defaultValue;
                }
            },
            set: (key, value) => {
                try {
                    sessionStorage.setItem(key, JSON.stringify(value));
                    return true;
                } catch (e) {
                    console.warn('Failed to set sessionStorage:', e);
                    return false;
                }
            },
            remove: (key) => {
                try {
                    sessionStorage.removeItem(key);
                    return true;
                } catch (e) {
                    console.warn('Failed to remove from sessionStorage:', e);
                    return false;
                }
            }
        };
    }

    initDataValidation() {
        this.validators = {
            email: (email) => {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return emailRegex.test(email);
            },
            phone: (phone) => {
                const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
                return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
            },
            url: (url) => {
                try {
                    new URL(url);
                    return true;
                } catch {
                    return false;
                }
            },
            required: (value) => {
                return value !== null && value !== undefined && value.toString().trim() !== '';
            },
            minLength: (value, min) => {
                return value && value.toString().length >= min;
            },
            maxLength: (value, max) => {
                return value && value.toString().length <= max;
            },
            number: (value) => {
                return !isNaN(value) && isFinite(value);
            },
            integer: (value) => {
                return Number.isInteger(Number(value));
            },
            positive: (value) => {
                return this.validators.number(value) && Number(value) > 0;
            },
            date: (value) => {
                const date = new Date(value);
                return date instanceof Date && !isNaN(date);
            },
            futureDate: (value) => {
                const date = new Date(value);
                return date instanceof Date && !isNaN(date) && date > new Date();
            },
            pastDate: (value) => {
                const date = new Date(value);
                return date instanceof Date && !isNaN(date) && date < new Date();
            }
        };
    }

    // ===== HELPER FUNCTIONS =====
    initHelperFunctions() {
        this.helpers = {
            // DOM manipulation helpers
            createElement: (tag, attributes = {}, children = []) => {
                const element = document.createElement(tag);
                Object.entries(attributes).forEach(([key, value]) => {
                    if (key === 'className') {
                        element.className = value;
                    } else if (key === 'textContent') {
                        element.textContent = value;
                    } else if (key === 'innerHTML') {
                        element.innerHTML = value;
                    } else {
                        element.setAttribute(key, value);
                    }
                });
                children.forEach(child => {
                    if (typeof child === 'string') {
                        element.appendChild(document.createTextNode(child));
                    } else {
                        element.appendChild(child);
                    }
                });
                return element;
            },

            // Event handling helpers
            addEventListeners: (element, events) => {
                Object.entries(events).forEach(([event, handler]) => {
                    element.addEventListener(event, handler);
                });
            },

            // Animation helpers
            animate: (element, properties, duration = 300, easing = 'ease-out') => {
                return new Promise((resolve) => {
                    element.style.transition = `all ${duration}ms ${easing}`;
                    Object.entries(properties).forEach(([property, value]) => {
                        element.style[property] = value;
                    });
                    setTimeout(resolve, duration);
                });
            },

            // Utility functions
            debounce: (func, wait) => {
                let timeout;
                return function executedFunction(...args) {
                    const later = () => {
                        clearTimeout(timeout);
                        func(...args);
                    };
                    clearTimeout(timeout);
                    timeout = setTimeout(later, wait);
                };
            },

            throttle: (func, limit) => {
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
            },

            // String manipulation
            capitalize: (str) => {
                return str.charAt(0).toUpperCase() + str.slice(1);
            },

            camelCase: (str) => {
                return str.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
            },

            kebabCase: (str) => {
                return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
            },

            // Number formatting
            formatNumber: (num, options = {}) => {
                const {
                    locale = 'en-US',
                    currency = 'USD',
                    minimumFractionDigits = 0,
                    maximumFractionDigits = 2
                } = options;

                if (options.currency) {
                    return new Intl.NumberFormat(locale, {
                        style: 'currency',
                        currency,
                        minimumFractionDigits,
                        maximumFractionDigits
                    }).format(num);
                }

                return new Intl.NumberFormat(locale, {
                    minimumFractionDigits,
                    maximumFractionDigits
                }).format(num);
            },

            // Date formatting
            formatDate: (date, options = {}) => {
                const {
                    locale = 'en-US',
                    year = 'numeric',
                    month = 'long',
                    day = 'numeric',
                    hour = '2-digit',
                    minute = '2-digit'
                } = options;

                const dateObj = new Date(date);
                return new Intl.DateTimeFormat(locale, {
                    year,
                    month,
                    day,
                    hour,
                    minute
                }).format(dateObj);
            },

            // Array utilities
            chunk: (array, size) => {
                const chunks = [];
                for (let i = 0; i < array.length; i += size) {
                    chunks.push(array.slice(i, i + size));
                }
                return chunks;
            },

            unique: (array) => {
                return [...new Set(array)];
            },

            shuffle: (array) => {
                const shuffled = [...array];
                for (let i = shuffled.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
                }
                return shuffled;
            },

            // Object utilities
            deepClone: (obj) => {
                if (obj === null || typeof obj !== 'object') return obj;
                if (obj instanceof Date) return new Date(obj.getTime());
                if (obj instanceof Array) return obj.map(item => this.helpers.deepClone(item));
                if (typeof obj === 'object') {
                    const clonedObj = {};
                    for (const key in obj) {
                        if (obj.hasOwnProperty(key)) {
                            clonedObj[key] = this.helpers.deepClone(obj[key]);
                        }
                    }
                    return clonedObj;
                }
            },

            merge: (target, ...sources) => {
                sources.forEach(source => {
                    Object.keys(source).forEach(key => {
                        if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
                            target[key] = target[key] || {};
                            this.helpers.merge(target[key], source[key]);
                        } else {
                            target[key] = source[key];
                        }
                    });
                });
                return target;
            },

            // Browser utilities
            isMobile: () => {
                return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
            },

            isTablet: () => {
                return /iPad|Android(?=.*\bMobile\b)(?=.*\bSafari\b)/i.test(navigator.userAgent);
            },

            isDesktop: () => {
                return !this.helpers.isMobile() && !this.helpers.isTablet();
            },

            getViewportSize: () => {
                return {
                    width: window.innerWidth || document.documentElement.clientWidth,
                    height: window.innerHeight || document.documentElement.clientHeight
                };
            },

            // Network utilities
            isOnline: () => {
                return navigator.onLine;
            },

            getConnectionSpeed: () => {
                if ('connection' in navigator) {
                    const connection = navigator.connection;
                    return {
                        effectiveType: connection.effectiveType,
                        downlink: connection.downlink,
                        rtt: connection.rtt
                    };
                }
                return null;
            },

            // Cookie utilities
            setCookie: (name, value, days = 7) => {
                const expires = new Date();
                expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
                document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
            },

            getCookie: (name) => {
                const nameEQ = name + "=";
                const ca = document.cookie.split(';');
                for (let i = 0; i < ca.length; i++) {
                    let c = ca[i];
                    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
                    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
                }
                return null;
            },

            deleteCookie: (name) => {
                document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/`;
            }
        };
    }

    // ===== OBSERVER PATTERN =====
    createObserver() {
        return {
            events: {},
            on: (event, callback) => {
                if (!this.events[event]) {
                    this.events[event] = [];
                }
                this.events[event].push(callback);
            },
            off: (event, callback) => {
                if (this.events[event]) {
                    this.events[event] = this.events[event].filter(cb => cb !== callback);
                }
            },
            emit: (event, data) => {
                if (this.events[event]) {
                    this.events[event].forEach(callback => {
                        try {
                            callback(data);
                        } catch (e) {
                            this.handleError(e, 'Observer Callback', 0);
                        }
                    });
                }
            }
        };
    }

    // ===== CACHE MANAGEMENT =====
    initCache() {
        this.cacheManager = {
            set: (key, value, ttl = 300000) => { // 5 minutes default
                const item = {
                    value,
                    timestamp: Date.now(),
                    ttl
                };
                this.cache.set(key, item);
            },
            get: (key) => {
                const item = this.cache.get(key);
                if (!item) return null;
                
                if (Date.now() - item.timestamp > item.ttl) {
                    this.cache.delete(key);
                    return null;
                }
                
                return item.value;
            },
            has: (key) => {
                return this.cache.has(key) && this.cacheManager.get(key) !== null;
            },
            delete: (key) => {
                return this.cache.delete(key);
            },
            clear: () => {
                this.cache.clear();
            },
            size: () => {
                return this.cache.size;
            }
        };
    }

    // ===== API HELPERS =====
    initAPIHelpers() {
        this.api = {
            request: async (url, options = {}) => {
                const defaultOptions = {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    timeout: 10000
                };

                const config = this.helpers.merge(defaultOptions, options);
                
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), config.timeout);
                
                try {
                    const response = await fetch(url, {
                        ...config,
                        signal: controller.signal
                    });
                    
                    clearTimeout(timeoutId);
                    
                    if (!response.ok) {
                        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                    }
                    
                    return await response.json();
                } catch (error) {
                    clearTimeout(timeoutId);
                    throw error;
                }
            },

            get: (url, options = {}) => {
                return this.api.request(url, { ...options, method: 'GET' });
            },

            post: (url, data, options = {}) => {
                return this.api.request(url, {
                    ...options,
                    method: 'POST',
                    body: JSON.stringify(data)
                });
            },

            put: (url, data, options = {}) => {
                return this.api.request(url, {
                    ...options,
                    method: 'PUT',
                    body: JSON.stringify(data)
                });
            },

            delete: (url, options = {}) => {
                return this.api.request(url, { ...options, method: 'DELETE' });
            }
        };
    }

    // ===== EXPORT UTILITIES =====
    exportData() {
        const data = {
            cache: Array.from(this.cache.entries()),
            performance: this.cache.get('performance') || [],
            errors: this.cache.get('errors') || [],
            timestamp: Date.now()
        };
        
        const blob = new Blob([JSON.stringify(data, null, 2)], {
            type: 'application/json'
        });
        
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `krazyideasconsulting-data-${Date.now()}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    window.utils = new Utils();
});

// ===== EXPORT FOR MODULE SYSTEM =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Utils;
} 