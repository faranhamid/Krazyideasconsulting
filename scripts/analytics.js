// ===== ANALYTICS JAVASCRIPT FILE =====

// Comprehensive analytics and tracking system for KrazyIdeasConsulting website

class AnalyticsManager {
    constructor() {
        this.events = [];
        this.sessions = [];
        this.userBehavior = {};
        this.performanceMetrics = {};
        this.conversionGoals = {};
        this.init();
    }

    init() {
        this.initSessionTracking();
        this.initEventTracking();
        this.initUserBehaviorTracking();
        this.initPerformanceTracking();
        this.initConversionTracking();
        this.initHeatmapTracking();
        this.initScrollTracking();
        this.initClickTracking();
        this.initFormTracking();
        this.initPageViewTracking();
        this.initErrorTracking();
        this.initCustomDimensions();
        this.initDataExport();
    }

    // ===== SESSION TRACKING =====
    initSessionTracking() {
        this.session = {
            id: this.generateSessionId(),
            startTime: Date.now(),
            userAgent: navigator.userAgent,
            referrer: document.referrer,
            utmParams: this.getUTMParams(),
            deviceInfo: this.getDeviceInfo(),
            location: this.getLocationInfo()
        };

        // Track session start
        this.trackEvent('session_start', {
            session_id: this.session.id,
            referrer: this.session.referrer,
            utm_source: this.session.utmParams.source,
            utm_medium: this.session.utmParams.medium,
            utm_campaign: this.session.utmParams.campaign
        });

        // Track session end on page unload
        window.addEventListener('beforeunload', () => {
            this.trackSessionEnd();
        });

        // Track session duration every 30 seconds
        setInterval(() => {
            this.updateSessionDuration();
        }, 30000);
    }

    generateSessionId() {
        return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    getUTMParams() {
        const urlParams = new URLSearchParams(window.location.search);
        return {
            source: urlParams.get('utm_source') || 'direct',
            medium: urlParams.get('utm_medium') || 'none',
            campaign: urlParams.get('utm_campaign') || 'none',
            term: urlParams.get('utm_term') || '',
            content: urlParams.get('utm_content') || ''
        };
    }

    getDeviceInfo() {
        return {
            screen: {
                width: screen.width,
                height: screen.height,
                availWidth: screen.availWidth,
                availHeight: screen.availHeight,
                colorDepth: screen.colorDepth,
                pixelDepth: screen.pixelDepth
            },
            viewport: {
                width: window.innerWidth,
                height: window.innerHeight
            },
            devicePixelRatio: window.devicePixelRatio,
            userAgent: navigator.userAgent,
            language: navigator.language,
            languages: navigator.languages,
            cookieEnabled: navigator.cookieEnabled,
            onLine: navigator.onLine,
            connection: this.getConnectionInfo()
        };
    }

    getConnectionInfo() {
        if ('connection' in navigator) {
            const connection = navigator.connection;
            return {
                effectiveType: connection.effectiveType,
                downlink: connection.downlink,
                rtt: connection.rtt,
                saveData: connection.saveData
            };
        }
        return null;
    }

    getLocationInfo() {
        return {
            href: window.location.href,
            origin: window.location.origin,
            pathname: window.location.pathname,
            search: window.location.search,
            hash: window.location.hash,
            hostname: window.location.hostname,
            port: window.location.port,
            protocol: window.location.protocol
        };
    }

    trackSessionEnd() {
        const sessionDuration = Date.now() - this.session.startTime;
        this.trackEvent('session_end', {
            session_id: this.session.id,
            duration: sessionDuration,
            pages_viewed: this.userBehavior.pagesViewed || 0,
            events_tracked: this.events.length
        });
    }

    updateSessionDuration() {
        const sessionDuration = Date.now() - this.session.startTime;
        this.session.duration = sessionDuration;
    }

    // ===== EVENT TRACKING =====
    initEventTracking() {
        this.eventQueue = [];
        this.maxQueueSize = 100;
        this.flushInterval = 30000; // 30 seconds

        // Flush events periodically
        setInterval(() => {
            this.flushEvents();
        }, this.flushInterval);
    }

    trackEvent(eventName, properties = {}) {
        const event = {
            name: eventName,
            properties: {
                ...properties,
                timestamp: Date.now(),
                session_id: this.session.id,
                page_url: window.location.href,
                user_agent: navigator.userAgent
            },
            id: this.generateEventId()
        };

        this.events.push(event);
        this.eventQueue.push(event);

        // Flush if queue is full
        if (this.eventQueue.length >= this.maxQueueSize) {
            this.flushEvents();
        }

        // Log in development
        if (window.location.hostname === 'localhost') {
            console.log('Analytics Event:', event);
        }
    }

    generateEventId() {
        return 'event_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    flushEvents() {
        if (this.eventQueue.length === 0) return;

        const eventsToSend = [...this.eventQueue];
        this.eventQueue = [];

        // In a real implementation, you would send to your analytics service
        // this.sendToAnalyticsService(eventsToSend);
        
        console.log('Flushing events:', eventsToSend.length);
    }

    // ===== USER BEHAVIOR TRACKING =====
    initUserBehaviorTracking() {
        this.userBehavior = {
            pagesViewed: 0,
            timeOnPage: 0,
            scrollDepth: 0,
            clicks: 0,
            formInteractions: 0,
            errors: 0,
            conversions: 0
        };

        // Track time on page
        this.startTimeOnPage = Date.now();
        setInterval(() => {
            this.updateTimeOnPage();
        }, 1000);

        // Track scroll depth
        this.initScrollDepthTracking();

        // Track clicks
        this.initClickTracking();
    }

    updateTimeOnPage() {
        this.userBehavior.timeOnPage = Date.now() - this.startTimeOnPage;
    }

    initScrollDepthTracking() {
        let maxScrollDepth = 0;
        let scrollEvents = 0;

        window.addEventListener('scroll', this.throttle(() => {
            const scrollTop = window.pageYOffset;
            const documentHeight = document.documentElement.scrollHeight;
            const windowHeight = window.innerHeight;
            const scrollDepth = (scrollTop + windowHeight) / documentHeight * 100;

            if (scrollDepth > maxScrollDepth) {
                maxScrollDepth = scrollDepth;
                this.userBehavior.scrollDepth = maxScrollDepth;

                // Track scroll depth milestones
                if (scrollDepth >= 25 && scrollEvents < 1) {
                    this.trackEvent('scroll_depth_25', { depth: scrollDepth });
                    scrollEvents++;
                } else if (scrollDepth >= 50 && scrollEvents < 2) {
                    this.trackEvent('scroll_depth_50', { depth: scrollDepth });
                    scrollEvents++;
                } else if (scrollDepth >= 75 && scrollEvents < 3) {
                    this.trackEvent('scroll_depth_75', { depth: scrollDepth });
                    scrollEvents++;
                } else if (scrollDepth >= 90 && scrollEvents < 4) {
                    this.trackEvent('scroll_depth_90', { depth: scrollDepth });
                    scrollEvents++;
                }
            }
        }, 100));
    }

    initClickTracking() {
        document.addEventListener('click', (e) => {
            this.userBehavior.clicks++;
            
            const target = e.target;
            const tagName = target.tagName.toLowerCase();
            const className = target.className;
            const id = target.id;
            const text = target.textContent?.substring(0, 50);

            this.trackEvent('click', {
                tag_name: tagName,
                class_name: className,
                element_id: id,
                text_content: text,
                x: e.clientX,
                y: e.clientY,
                page_x: e.pageX,
                page_y: e.pageY
            });
        });
    }

    // ===== PERFORMANCE TRACKING =====
    initPerformanceTracking() {
        // Track page load performance
        window.addEventListener('load', () => {
            setTimeout(() => {
                this.trackPerformanceMetrics();
            }, 1000);
        });

        // Track Core Web Vitals
        if ('PerformanceObserver' in window) {
            try {
                const observer = new PerformanceObserver((list) => {
                    for (const entry of list.getEntries()) {
                        this.trackPerformanceMetric(entry);
                    }
                });
                observer.observe({ 
                    entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] 
                });
            } catch (e) {
                console.warn('Performance tracking not supported:', e);
            }
        }
    }

    trackPerformanceMetrics() {
        const navigation = performance.getEntriesByType('navigation')[0];
        if (navigation) {
            this.trackEvent('page_performance', {
                dom_content_loaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
                load_complete: navigation.loadEventEnd - navigation.loadEventStart,
                dom_interactive: navigation.domInteractive,
                dom_content_loaded_event: navigation.domContentLoadedEventEnd,
                load_event: navigation.loadEventEnd,
                redirect_count: navigation.redirectCount,
                transfer_size: navigation.transferSize,
                encoded_body_size: navigation.encodedBodySize,
                decoded_body_size: navigation.decodedBodySize
            });
        }
    }

    trackPerformanceMetric(entry) {
        this.trackEvent('web_vital', {
            name: entry.name,
            value: entry.value,
            entry_type: entry.entryType,
            start_time: entry.startTime,
            duration: entry.duration
        });
    }

    // ===== CONVERSION TRACKING =====
    initConversionTracking() {
        this.conversionGoals = {
            contact_form_submit: false,
            newsletter_signup: false,
            service_click: false,
            phone_call: false,
            email_click: false,
            social_media_click: false
        };

        // Track form submissions
        const contactForm = document.getElementById('contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', () => {
                this.trackConversion('contact_form_submit');
            });
        }

        // Track newsletter signups
        const newsletterForm = document.querySelector('.newsletter-form');
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', () => {
                this.trackConversion('newsletter_signup');
            });
        }

        // Track service clicks
        const serviceLinks = document.querySelectorAll('.service-cta');
        serviceLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.trackConversion('service_click', {
                    service: link.closest('.service-card')?.querySelector('h3')?.textContent
                });
            });
        });

        // Track phone clicks
        const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
        phoneLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.trackConversion('phone_call', {
                    phone_number: link.href.replace('tel:', '')
                });
            });
        });

        // Track email clicks
        const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
        emailLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.trackConversion('email_click', {
                    email: link.href.replace('mailto:', '')
                });
            });
        });

        // Track social media clicks
        const socialLinks = document.querySelectorAll('.social-link');
        socialLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.trackConversion('social_media_click', {
                    platform: link.querySelector('i')?.className?.split(' ')[1]?.replace('fa-', '')
                });
            });
        });
    }

    trackConversion(goal, properties = {}) {
        if (!this.conversionGoals[goal]) {
            this.conversionGoals[goal] = true;
            this.userBehavior.conversions++;

            this.trackEvent('conversion', {
                goal: goal,
                session_id: this.session.id,
                time_on_page: this.userBehavior.timeOnPage,
                pages_viewed: this.userBehavior.pagesViewed,
                ...properties
            });
        }
    }

    // ===== HEATMAP TRACKING =====
    initHeatmapTracking() {
        this.heatmapData = {
            clicks: [],
            movements: [],
            scrolls: []
        };

        // Track mouse movements (throttled)
        document.addEventListener('mousemove', this.throttle((e) => {
            this.heatmapData.movements.push({
                x: e.clientX,
                y: e.clientY,
                timestamp: Date.now()
            });

            // Keep only last 1000 movements
            if (this.heatmapData.movements.length > 1000) {
                this.heatmapData.movements = this.heatmapData.movements.slice(-1000);
            }
        }, 100));

        // Track clicks for heatmap
        document.addEventListener('click', (e) => {
            this.heatmapData.clicks.push({
                x: e.clientX,
                y: e.clientY,
                timestamp: Date.now(),
                element: e.target.tagName,
                text: e.target.textContent?.substring(0, 20)
            });

            // Keep only last 100 clicks
            if (this.heatmapData.clicks.length > 100) {
                this.heatmapData.clicks = this.heatmapData.clicks.slice(-100);
            }
        });
    }

    // ===== SCROLL TRACKING =====
    initScrollTracking() {
        let lastScrollTop = 0;
        let scrollDirection = 'down';

        window.addEventListener('scroll', this.throttle(() => {
            const scrollTop = window.pageYOffset;
            scrollDirection = scrollTop > lastScrollTop ? 'down' : 'up';
            lastScrollTop = scrollTop;

            this.trackEvent('scroll', {
                scroll_top: scrollTop,
                scroll_direction: scrollDirection,
                window_height: window.innerHeight,
                document_height: document.documentElement.scrollHeight
            });
        }, 500));
    }

    // ===== FORM TRACKING =====
    initFormTracking() {
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            // Track form focus
            const inputs = form.querySelectorAll('input, textarea, select');
            inputs.forEach(input => {
                input.addEventListener('focus', () => {
                    this.trackEvent('form_field_focus', {
                        form_id: form.id || 'unknown',
                        field_name: input.name || 'unknown',
                        field_type: input.type || 'text'
                    });
                });

                input.addEventListener('blur', () => {
                    this.trackEvent('form_field_blur', {
                        form_id: form.id || 'unknown',
                        field_name: input.name || 'unknown',
                        field_type: input.type || 'text',
                        field_value_length: input.value.length
                    });
                });
            });

            // Track form validation errors
            form.addEventListener('invalid', (e) => {
                e.preventDefault();
                this.trackEvent('form_validation_error', {
                    form_id: form.id || 'unknown',
                    field_name: e.target.name || 'unknown',
                    field_type: e.target.type || 'text',
                    error_message: e.target.validationMessage
                });
            });
        });
    }

    // ===== PAGE VIEW TRACKING =====
    initPageViewTracking() {
        this.userBehavior.pagesViewed++;

        this.trackEvent('page_view', {
            page_url: window.location.href,
            page_title: document.title,
            referrer: document.referrer,
            session_id: this.session.id
        });

        // Track page visibility changes
        document.addEventListener('visibilitychange', () => {
            this.trackEvent('visibility_change', {
                hidden: document.hidden,
                visibility_state: document.visibilityState
            });
        });
    }

    // ===== ERROR TRACKING =====
    initErrorTracking() {
        window.addEventListener('error', (e) => {
            this.userBehavior.errors++;
            this.trackEvent('javascript_error', {
                message: e.message,
                filename: e.filename,
                lineno: e.lineno,
                colno: e.colno,
                error: e.error?.stack || 'No stack trace'
            });
        });

        window.addEventListener('unhandledrejection', (e) => {
            this.userBehavior.errors++;
            this.trackEvent('unhandled_promise_rejection', {
                reason: e.reason,
                promise: e.promise
            });
        });
    }

    // ===== CUSTOM DIMENSIONS =====
    initCustomDimensions() {
        this.customDimensions = {
            user_type: this.getUserType(),
            device_category: this.getDeviceCategory(),
            browser_family: this.getBrowserFamily(),
            os_family: this.getOSFamily(),
            connection_type: this.getConnectionType(),
            page_load_time: this.getPageLoadTime()
        };
    }

    getUserType() {
        // Simple logic to determine user type
        const timeOnPage = this.userBehavior.timeOnPage;
        const pagesViewed = this.userBehavior.pagesViewed;
        
        if (timeOnPage > 300000 && pagesViewed > 3) return 'engaged';
        if (timeOnPage > 60000 && pagesViewed > 1) return 'interested';
        return 'casual';
    }

    getDeviceCategory() {
        const width = window.innerWidth;
        if (width < 768) return 'mobile';
        if (width < 1024) return 'tablet';
        return 'desktop';
    }

    getBrowserFamily() {
        const userAgent = navigator.userAgent;
        if (userAgent.includes('Chrome')) return 'Chrome';
        if (userAgent.includes('Firefox')) return 'Firefox';
        if (userAgent.includes('Safari')) return 'Safari';
        if (userAgent.includes('Edge')) return 'Edge';
        return 'Other';
    }

    getOSFamily() {
        const userAgent = navigator.userAgent;
        if (userAgent.includes('Windows')) return 'Windows';
        if (userAgent.includes('Mac')) return 'macOS';
        if (userAgent.includes('Linux')) return 'Linux';
        if (userAgent.includes('Android')) return 'Android';
        if (userAgent.includes('iOS')) return 'iOS';
        return 'Other';
    }

    getConnectionType() {
        if ('connection' in navigator) {
            return navigator.connection.effectiveType || 'unknown';
        }
        return 'unknown';
    }

    getPageLoadTime() {
        const navigation = performance.getEntriesByType('navigation')[0];
        return navigation ? navigation.loadEventEnd - navigation.loadEventStart : 0;
    }

    // ===== DATA EXPORT =====
    initDataExport() {
        // Export analytics data
        window.exportAnalyticsData = () => {
            const data = {
                session: this.session,
                events: this.events,
                userBehavior: this.userBehavior,
                performanceMetrics: this.performanceMetrics,
                conversionGoals: this.conversionGoals,
                heatmapData: this.heatmapData,
                customDimensions: this.customDimensions,
                exportTimestamp: Date.now()
            };

            const blob = new Blob([JSON.stringify(data, null, 2)], {
                type: 'application/json'
            });

            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `analytics-data-${Date.now()}.json`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        };
    }

    // ===== UTILITY FUNCTIONS =====
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

    // ===== REPORTING =====
    generateReport() {
        return {
            session: {
                id: this.session.id,
                duration: Date.now() - this.session.startTime,
                pagesViewed: this.userBehavior.pagesViewed,
                timeOnPage: this.userBehavior.timeOnPage,
                scrollDepth: this.userBehavior.scrollDepth,
                clicks: this.userBehavior.clicks,
                formInteractions: this.userBehavior.formInteractions,
                errors: this.userBehavior.errors,
                conversions: this.userBehavior.conversions
            },
            events: {
                total: this.events.length,
                byType: this.groupEventsByType(),
                recent: this.events.slice(-10)
            },
            conversions: {
                goals: this.conversionGoals,
                rate: this.calculateConversionRate()
            },
            performance: {
                pageLoadTime: this.getPageLoadTime(),
                customDimensions: this.customDimensions
            }
        };
    }

    groupEventsByType() {
        const grouped = {};
        this.events.forEach(event => {
            if (!grouped[event.name]) {
                grouped[event.name] = 0;
            }
            grouped[event.name]++;
        });
        return grouped;
    }

    calculateConversionRate() {
        const totalGoals = Object.keys(this.conversionGoals).length;
        const achievedGoals = Object.values(this.conversionGoals).filter(Boolean).length;
        return totalGoals > 0 ? (achievedGoals / totalGoals) * 100 : 0;
    }
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    window.analytics = new AnalyticsManager();
});

// ===== EXPORT FOR MODULE SYSTEM =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AnalyticsManager;
} 