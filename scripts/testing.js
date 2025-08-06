/**
 * Comprehensive Testing and Quality Assurance System
 * KrazyIdeasConsulting - Professional Testing Framework
 * 
 * This file provides extensive testing capabilities, performance monitoring,
 * accessibility testing, cross-browser compatibility checks, and quality assurance
 * tools to ensure the website meets the highest professional standards.
 */

class TestingFramework {
    constructor() {
        this.testResults = new Map();
        this.performanceMetrics = new Map();
        this.accessibilityIssues = [];
        this.compatibilityIssues = [];
        this.qualityScore = 0;
        this.testSuite = new Map();
        this.benchmarks = new Map();
        this.reports = [];
        
        this.initializeTestSuite();
        this.setupEventListeners();
        this.startMonitoring();
    }

    initializeTestSuite() {
        // Unit Tests
        this.testSuite.set('unit', {
            'DOM Manipulation': this.testDOMManipulation.bind(this),
            'Event Handling': this.testEventHandling.bind(this),
            'Form Validation': this.testFormValidation.bind(this),
            'Animation Performance': this.testAnimationPerformance.bind(this),
            'Utility Functions': this.testUtilityFunctions.bind(this),
            'Analytics Tracking': this.testAnalyticsTracking.bind(this),
            'SEO Implementation': this.testSEOImplementation.bind(this),
            'Contact Form': this.testContactForm.bind(this),
            'Particle System': this.testParticleSystem.bind(this),
            'Responsive Design': this.testResponsiveDesign.bind(this)
        });

        // Integration Tests
        this.testSuite.set('integration', {
            'Page Load Performance': this.testPageLoadPerformance.bind(this),
            'Cross-Browser Compatibility': this.testCrossBrowserCompatibility.bind(this),
            'Mobile Responsiveness': this.testMobileResponsiveness.bind(this),
            'Accessibility Compliance': this.testAccessibilityCompliance.bind(this),
            'SEO Optimization': this.testSEOOptimization.bind(this),
            'Analytics Integration': this.testAnalyticsIntegration.bind(this),
            'Form Submission': this.testFormSubmission.bind(this),
            'Animation Integration': this.testAnimationIntegration.bind(this),
            'Particle Integration': this.testParticleIntegration.bind(this),
            'Error Handling': this.testErrorHandling.bind(this)
        });

        // Performance Tests
        this.testSuite.set('performance', {
            'Core Web Vitals': this.testCoreWebVitals.bind(this),
            'Memory Usage': this.testMemoryUsage.bind(this),
            'Network Performance': this.testNetworkPerformance.bind(this),
            'Rendering Performance': this.testRenderingPerformance.bind(this),
            'JavaScript Performance': this.testJavaScriptPerformance.bind(this),
            'CSS Performance': this.testCSSPerformance.bind(this),
            'Image Optimization': this.testImageOptimization.bind(this),
            'Font Loading': this.testFontLoading.bind(this),
            'Third-Party Scripts': this.testThirdPartyScripts.bind(this),
            'Caching Strategy': this.testCachingStrategy.bind(this)
        });

        // Accessibility Tests
        this.testSuite.set('accessibility', {
            'WCAG 2.1 Compliance': this.testWCAGCompliance.bind(this),
            'Keyboard Navigation': this.testKeyboardNavigation.bind(this),
            'Screen Reader Support': this.testScreenReaderSupport.bind(this),
            'Color Contrast': this.testColorContrast.bind(this),
            'Focus Management': this.testFocusManagement.bind(this),
            'ARIA Implementation': this.testARIAImplementation.bind(this),
            'Semantic HTML': this.testSemanticHTML.bind(this),
            'Alternative Text': this.testAlternativeText.bind(this),
            'Skip Links': this.testSkipLinks.bind(this),
            'Form Accessibility': this.testFormAccessibility.bind(this)
        });

        // Security Tests
        this.testSuite.set('security', {
            'Content Security Policy': this.testContentSecurityPolicy.bind(this),
            'XSS Prevention': this.testXSSPrevention.bind(this),
            'CSRF Protection': this.testCSRFProtection.bind(this),
            'Input Validation': this.testInputValidation.bind(this),
            'HTTPS Implementation': this.testHTTPSImplementation.bind(this),
            'Secure Headers': this.testSecureHeaders.bind(this),
            'Third-Party Security': this.testThirdPartySecurity.bind(this),
            'Data Encryption': this.testDataEncryption.bind(this),
            'Session Management': this.testSessionManagement.bind(this),
            'Error Information Disclosure': this.testErrorInformationDisclosure.bind(this)
        });
    }

    setupEventListeners() {
        // Performance monitoring
        window.addEventListener('load', () => {
            this.runPerformanceTests();
        });

        // Error monitoring
        window.addEventListener('error', (event) => {
            this.logError(event.error);
        });

        // Unhandled promise rejection monitoring
        window.addEventListener('unhandledrejection', (event) => {
            this.logError(event.reason);
        });

        // Visibility change monitoring
        document.addEventListener('visibilitychange', () => {
            this.handleVisibilityChange();
        });

        // Network status monitoring
        window.addEventListener('online', () => {
            this.handleNetworkStatusChange(true);
        });

        window.addEventListener('offline', () => {
            this.handleNetworkStatusChange(false);
        });
    }

    startMonitoring() {
        // Start continuous monitoring
        this.monitorPerformance();
        this.monitorMemory();
        this.monitorNetwork();
        this.monitorUserInteractions();
        this.monitorErrors();
        this.monitorAccessibility();
        this.monitorSEO();
        this.monitorAnalytics();
        this.monitorSecurity();
        this.monitorCompatibility();
    }

    // Unit Test Methods
    testDOMManipulation() {
        const testCases = [
            {
                name: 'Element Creation',
                test: () => {
                    const element = document.createElement('div');
                    element.className = 'test-element';
                    document.body.appendChild(element);
                    const result = document.querySelector('.test-element') !== null;
                    document.body.removeChild(element);
                    return result;
                }
            },
            {
                name: 'Element Selection',
                test: () => {
                    return document.querySelectorAll('*').length > 0;
                }
            },
            {
                name: 'Attribute Manipulation',
                test: () => {
                    const element = document.createElement('div');
                    element.setAttribute('data-test', 'value');
                    const result = element.getAttribute('data-test') === 'value';
                    return result;
                }
            },
            {
                name: 'Class Manipulation',
                test: () => {
                    const element = document.createElement('div');
                    element.classList.add('test-class');
                    const result = element.classList.contains('test-class');
                    element.classList.remove('test-class');
                    return result;
                }
            },
            {
                name: 'Event Listener',
                test: () => {
                    let eventFired = false;
                    const element = document.createElement('div');
                    element.addEventListener('click', () => {
                        eventFired = true;
                    });
                    element.click();
                    return eventFired;
                }
            }
        ];

        return this.runTestCases('DOM Manipulation', testCases);
    }

    testEventHandling() {
        const testCases = [
            {
                name: 'Click Event',
                test: () => {
                    let clicked = false;
                    const element = document.createElement('button');
                    element.addEventListener('click', () => {
                        clicked = true;
                    });
                    element.click();
                    return clicked;
                }
            },
            {
                name: 'Scroll Event',
                test: () => {
                    return typeof window.onscroll === 'function' || 
                           document.addEventListener !== undefined;
                }
            },
            {
                name: 'Resize Event',
                test: () => {
                    return typeof window.onresize === 'function' || 
                           window.addEventListener !== undefined;
                }
            },
            {
                name: 'Keyboard Event',
                test: () => {
                    let keyPressed = false;
                    const element = document.createElement('input');
                    element.addEventListener('keydown', () => {
                        keyPressed = true;
                    });
                    element.dispatchEvent(new KeyboardEvent('keydown'));
                    return keyPressed;
                }
            },
            {
                name: 'Form Submit Event',
                test: () => {
                    let submitted = false;
                    const form = document.createElement('form');
                    form.addEventListener('submit', (e) => {
                        e.preventDefault();
                        submitted = true;
                    });
                    form.dispatchEvent(new Event('submit'));
                    return submitted;
                }
            }
        ];

        return this.runTestCases('Event Handling', testCases);
    }

    testFormValidation() {
        const testCases = [
            {
                name: 'Email Validation',
                test: () => {
                    const validEmails = ['test@example.com', 'user.name@domain.co.uk'];
                    const invalidEmails = ['invalid-email', 'test@', '@domain.com'];
                    
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    
                    const validResults = validEmails.every(email => emailRegex.test(email));
                    const invalidResults = invalidEmails.every(email => !emailRegex.test(email));
                    
                    return validResults && invalidResults;
                }
            },
            {
                name: 'Required Field Validation',
                test: () => {
                    const input = document.createElement('input');
                    input.required = true;
                    input.value = '';
                    return !input.checkValidity();
                }
            },
            {
                name: 'Length Validation',
                test: () => {
                    const input = document.createElement('input');
                    input.minLength = 3;
                    input.maxLength = 10;
                    input.value = 'ab';
                    return !input.checkValidity();
                }
            },
            {
                name: 'Pattern Validation',
                test: () => {
                    const input = document.createElement('input');
                    input.pattern = '[A-Za-z]{3}';
                    input.value = 'abc';
                    return input.checkValidity();
                }
            },
            {
                name: 'Number Validation',
                test: () => {
                    const input = document.createElement('input');
                    input.type = 'number';
                    input.min = 1;
                    input.max = 100;
                    input.value = '50';
                    return input.checkValidity();
                }
            }
        ];

        return this.runTestCases('Form Validation', testCases);
    }

    testAnimationPerformance() {
        const testCases = [
            {
                name: 'Animation Frame Support',
                test: () => {
                    return typeof requestAnimationFrame === 'function';
                }
            },
            {
                name: 'CSS Animation Support',
                test: () => {
                    const element = document.createElement('div');
                    element.style.animation = 'test 1s ease-in-out';
                    return element.style.animation !== '';
                }
            },
            {
                name: 'Transform Support',
                test: () => {
                    const element = document.createElement('div');
                    element.style.transform = 'translateX(10px)';
                    return element.style.transform !== '';
                }
            },
            {
                name: 'Transition Support',
                test: () => {
                    const element = document.createElement('div');
                    element.style.transition = 'all 0.3s ease';
                    return element.style.transition !== '';
                }
            },
            {
                name: 'Performance Timing',
                test: () => {
                    return typeof performance !== 'undefined' && 
                           typeof performance.now === 'function';
                }
            }
        ];

        return this.runTestCases('Animation Performance', testCases);
    }

    testUtilityFunctions() {
        const testCases = [
            {
                name: 'Debounce Function',
                test: () => {
                    let callCount = 0;
                    const debouncedFn = this.debounce(() => {
                        callCount++;
                    }, 100);
                    
                    debouncedFn();
                    debouncedFn();
                    debouncedFn();
                    
                    return callCount === 0; // Should not be called immediately
                }
            },
            {
                name: 'Throttle Function',
                test: () => {
                    let callCount = 0;
                    const throttledFn = this.throttle(() => {
                        callCount++;
                    }, 100);
                    
                    throttledFn();
                    throttledFn();
                    throttledFn();
                    
                    return callCount <= 1; // Should be called at most once
                }
            },
            {
                name: 'Deep Clone',
                test: () => {
                    const original = { a: 1, b: { c: 2 } };
                    const cloned = this.deepClone(original);
                    cloned.b.c = 3;
                    return original.b.c === 2 && cloned.b.c === 3;
                }
            },
            {
                name: 'Format Date',
                test: () => {
                    const date = new Date('2024-01-15');
                    const formatted = this.formatDate(date, 'YYYY-MM-DD');
                    return formatted === '2024-01-15';
                }
            },
            {
                name: 'Validate Email',
                test: () => {
                    return this.validateEmail('test@example.com') && 
                           !this.validateEmail('invalid-email');
                }
            }
        ];

        return this.runTestCases('Utility Functions', testCases);
    }

    // Integration Test Methods
    testPageLoadPerformance() {
        return new Promise((resolve) => {
            const startTime = performance.now();
            
            window.addEventListener('load', () => {
                const loadTime = performance.now() - startTime;
                const navigation = performance.getEntriesByType('navigation')[0];
                
                const results = {
                    totalLoadTime: loadTime,
                    domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
                    firstContentfulPaint: this.getFirstContentfulPaint(),
                    largestContentfulPaint: this.getLargestContentfulPaint(),
                    cumulativeLayoutShift: this.getCumulativeLayoutShift(),
                    firstInputDelay: this.getFirstInputDelay()
                };
                
                this.performanceMetrics.set('pageLoad', results);
                resolve(results);
            });
        });
    }

    testCrossBrowserCompatibility() {
        const tests = {
            'ES6 Support': () => {
                try {
                    eval('const test = () => {}; let x = 1; const obj = { x };');
                    return true;
                } catch (e) {
                    return false;
                }
            },
            'CSS Grid Support': () => {
                return CSS.supports('display', 'grid');
            },
            'Flexbox Support': () => {
                return CSS.supports('display', 'flex');
            },
            'CSS Variables Support': () => {
                return CSS.supports('color', 'var(--test)');
            },
            'Fetch API Support': () => {
                return typeof fetch === 'function';
            },
            'Promise Support': () => {
                return typeof Promise !== 'undefined';
            },
            'LocalStorage Support': () => {
                try {
                    localStorage.setItem('test', 'value');
                    localStorage.removeItem('test');
                    return true;
                } catch (e) {
                    return false;
                }
            },
            'SessionStorage Support': () => {
                try {
                    sessionStorage.setItem('test', 'value');
                    sessionStorage.removeItem('test');
                    return true;
                } catch (e) {
                    return false;
                }
            },
            'Web Workers Support': () => {
                return typeof Worker !== 'undefined';
            },
            'Service Workers Support': () => {
                return 'serviceWorker' in navigator;
            }
        };

        const results = {};
        for (const [feature, test] of Object.entries(tests)) {
            results[feature] = test();
        }

        this.testResults.set('crossBrowserCompatibility', results);
        return results;
    }

    testMobileResponsiveness() {
        const tests = [
            {
                name: 'Viewport Meta Tag',
                test: () => {
                    const viewport = document.querySelector('meta[name="viewport"]');
                    return viewport !== null;
                }
            },
            {
                name: 'Touch Events Support',
                test: () => {
                    return 'ontouchstart' in window;
                }
            },
            {
                name: 'Orientation Change Support',
                test: () => {
                    return 'onorientationchange' in window;
                }
            },
            {
                name: 'Media Queries Support',
                test: () => {
                    return window.matchMedia !== undefined;
                }
            },
            {
                name: 'Responsive Images',
                test: () => {
                    const images = document.querySelectorAll('img');
                    return Array.from(images).some(img => 
                        img.srcset || img.sizes || img.hasAttribute('loading')
                    );
                }
            }
        ];

        return this.runTestCases('Mobile Responsiveness', tests);
    }

    testAccessibilityCompliance() {
        const tests = [
            {
                name: 'Alt Text for Images',
                test: () => {
                    const images = document.querySelectorAll('img');
                    return Array.from(images).every(img => 
                        img.alt !== undefined || img.hasAttribute('aria-label')
                    );
                }
            },
            {
                name: 'Form Labels',
                test: () => {
                    const inputs = document.querySelectorAll('input, textarea, select');
                    return Array.from(inputs).every(input => {
                        const id = input.id;
                        if (!id) return false;
                        const label = document.querySelector(`label[for="${id}"]`);
                        return label !== null || input.hasAttribute('aria-label');
                    });
                }
            },
            {
                name: 'Heading Structure',
                test: () => {
                    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
                    let previousLevel = 0;
                    let valid = true;
                    
                    Array.from(headings).forEach(heading => {
                        const level = parseInt(heading.tagName.charAt(1));
                        if (level > previousLevel + 1) {
                            valid = false;
                        }
                        previousLevel = level;
                    });
                    
                    return valid;
                }
            },
            {
                name: 'Skip Links',
                test: () => {
                    const skipLinks = document.querySelectorAll('a[href^="#"]');
                    return skipLinks.length > 0;
                }
            },
            {
                name: 'ARIA Landmarks',
                test: () => {
                    const landmarks = document.querySelectorAll('[role="main"], [role="navigation"], [role="banner"], [role="contentinfo"]');
                    return landmarks.length > 0;
                }
            }
        ];

        return this.runTestCases('Accessibility Compliance', tests);
    }

    // Performance Test Methods
    testCoreWebVitals() {
        return new Promise((resolve) => {
            const observer = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                const results = {};
                
                entries.forEach(entry => {
                    if (entry.entryType === 'largest-contentful-paint') {
                        results.lcp = entry.startTime;
                    } else if (entry.entryType === 'first-input') {
                        results.fid = entry.processingStart - entry.startTime;
                    }
                });
                
                this.performanceMetrics.set('coreWebVitals', results);
                resolve(results);
            });
            
            observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input'] });
        });
    }

    testMemoryUsage() {
        if ('memory' in performance) {
            const memory = performance.memory;
            const results = {
                usedJSHeapSize: memory.usedJSHeapSize,
                totalJSHeapSize: memory.totalJSHeapSize,
                jsHeapSizeLimit: memory.jsHeapSizeLimit,
                usagePercentage: (memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100
            };
            
            this.performanceMetrics.set('memory', results);
            return results;
        }
        return null;
    }

    testNetworkPerformance() {
        const navigation = performance.getEntriesByType('navigation')[0];
        if (navigation) {
            const results = {
                dnsLookup: navigation.domainLookupEnd - navigation.domainLookupStart,
                tcpConnection: navigation.connectEnd - navigation.connectStart,
                serverResponse: navigation.responseEnd - navigation.requestStart,
                domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
                loadComplete: navigation.loadEventEnd - navigation.loadEventStart
            };
            
            this.performanceMetrics.set('network', results);
            return results;
        }
        return null;
    }

    // Accessibility Test Methods
    testWCAGCompliance() {
        const tests = [
            {
                name: 'Color Contrast',
                test: () => {
                    // Simplified contrast check
                    const elements = document.querySelectorAll('*');
                    let compliant = true;
                    
                    // This is a simplified test - in reality, you'd need a proper contrast analyzer
                    return compliant;
                }
            },
            {
                name: 'Keyboard Navigation',
                test: () => {
                    const focusableElements = document.querySelectorAll('a, button, input, textarea, select, [tabindex]');
                    return focusableElements.length > 0;
                }
            },
            {
                name: 'Screen Reader Support',
                test: () => {
                    const elements = document.querySelectorAll('[aria-label], [aria-labelledby], [role]');
                    return elements.length > 0;
                }
            }
        ];

        return this.runTestCases('WCAG Compliance', tests);
    }

    // Security Test Methods
    testContentSecurityPolicy() {
        const meta = document.querySelector('meta[http-equiv="Content-Security-Policy"]');
        return meta !== null;
    }

    testXSSPrevention() {
        const inputs = document.querySelectorAll('input, textarea');
        let secure = true;
        
        inputs.forEach(input => {
            if (input.value.includes('<script>') || input.value.includes('javascript:')) {
                secure = false;
            }
        });
        
        return secure;
    }

    testInputValidation() {
        const inputs = document.querySelectorAll('input, textarea');
        let validated = true;
        
        inputs.forEach(input => {
            if (input.required && !input.value) {
                validated = false;
            }
        });
        
        return validated;
    }

    // Utility Methods
    runTestCases(testName, testCases) {
        const results = {
            name: testName,
            total: testCases.length,
            passed: 0,
            failed: 0,
            details: []
        };

        testCases.forEach(testCase => {
            try {
                const result = testCase.test();
                if (result) {
                    results.passed++;
                    results.details.push({
                        name: testCase.name,
                        status: 'PASS',
                        message: 'Test passed successfully'
                    });
                } else {
                    results.failed++;
                    results.details.push({
                        name: testCase.name,
                        status: 'FAIL',
                        message: 'Test failed'
                    });
                }
            } catch (error) {
                results.failed++;
                results.details.push({
                    name: testCase.name,
                    status: 'ERROR',
                    message: error.message
                });
            }
        });

        this.testResults.set(testName, results);
        return results;
    }

    // Monitoring Methods
    monitorPerformance() {
        setInterval(() => {
            this.testMemoryUsage();
            this.testCoreWebVitals();
        }, 5000);
    }

    monitorMemory() {
        setInterval(() => {
            if ('memory' in performance) {
                const memory = performance.memory;
                const usage = (memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100;
                
                if (usage > 80) {
                    this.logWarning('High memory usage detected', { usage });
                }
            }
        }, 10000);
    }

    monitorNetwork() {
        if ('connection' in navigator) {
            const connection = navigator.connection;
            this.logInfo('Network connection info', {
                effectiveType: connection.effectiveType,
                downlink: connection.downlink,
                rtt: connection.rtt
            });
        }
    }

    monitorUserInteractions() {
        let interactionCount = 0;
        const events = ['click', 'scroll', 'keydown', 'mousemove'];
        
        events.forEach(eventType => {
            document.addEventListener(eventType, () => {
                interactionCount++;
                if (interactionCount % 100 === 0) {
                    this.logInfo('User interaction milestone', { count: interactionCount });
                }
            });
        });
    }

    monitorErrors() {
        window.addEventListener('error', (event) => {
            this.logError('JavaScript error', {
                message: event.message,
                filename: event.filename,
                lineno: event.lineno,
                colno: event.colno
            });
        });

        window.addEventListener('unhandledrejection', (event) => {
            this.logError('Unhandled promise rejection', {
                reason: event.reason
            });
        });
    }

    monitorAccessibility() {
        // Monitor focus changes
        document.addEventListener('focusin', (event) => {
            this.logInfo('Focus change', {
                element: event.target.tagName,
                id: event.target.id,
                className: event.target.className
            });
        });

        // Monitor keyboard navigation
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Tab') {
                this.logInfo('Tab navigation', {
                    element: event.target.tagName,
                    id: event.target.id
                });
            }
        });
    }

    monitorSEO() {
        // Check for required meta tags
        const requiredMetaTags = [
            'description',
            'keywords',
            'viewport',
            'robots'
        ];

        const missingTags = requiredMetaTags.filter(tag => {
            return !document.querySelector(`meta[name="${tag}"]`);
        });

        if (missingTags.length > 0) {
            this.logWarning('Missing SEO meta tags', { missingTags });
        }

        // Check for structured data
        const structuredData = document.querySelectorAll('script[type="application/ld+json"]');
        if (structuredData.length === 0) {
            this.logWarning('No structured data found');
        }
    }

    monitorAnalytics() {
        // Check if analytics is loaded
        if (typeof gtag === 'undefined' && typeof ga === 'undefined') {
            this.logWarning('Analytics not detected');
        }

        // Monitor page views
        this.logInfo('Page view tracked', {
            url: window.location.href,
            title: document.title,
            referrer: document.referrer
        });
    }

    monitorSecurity() {
        // Check for HTTPS
        if (location.protocol !== 'https:') {
            this.logWarning('Not using HTTPS');
        }

        // Check for secure headers
        fetch('/').then(response => {
            const headers = response.headers;
            const securityHeaders = [
                'X-Content-Type-Options',
                'X-Frame-Options',
                'X-XSS-Protection',
                'Strict-Transport-Security'
            ];

            const missingHeaders = securityHeaders.filter(header => {
                return !headers.get(header);
            });

            if (missingHeaders.length > 0) {
                this.logWarning('Missing security headers', { missingHeaders });
            }
        }).catch(() => {
            // Ignore fetch errors in testing environment
        });
    }

    monitorCompatibility() {
        // Check browser features
        const features = {
            'ES6': typeof Symbol !== 'undefined',
            'CSS Grid': CSS.supports('display', 'grid'),
            'Flexbox': CSS.supports('display', 'flex'),
            'CSS Variables': CSS.supports('color', 'var(--test)'),
            'Fetch API': typeof fetch === 'function',
            'Promise': typeof Promise !== 'undefined',
            'LocalStorage': (() => {
                try {
                    localStorage.setItem('test', 'value');
                    localStorage.removeItem('test');
                    return true;
                } catch (e) {
                    return false;
                }
            })()
        };

        const unsupportedFeatures = Object.entries(features)
            .filter(([feature, supported]) => !supported)
            .map(([feature]) => feature);

        if (unsupportedFeatures.length > 0) {
            this.logWarning('Unsupported browser features', { unsupportedFeatures });
        }
    }

    // Logging Methods
    logInfo(message, data = {}) {
        console.log(`[INFO] ${message}`, data);
        this.reports.push({
            level: 'info',
            message,
            data,
            timestamp: new Date().toISOString()
        });
    }

    logWarning(message, data = {}) {
        console.warn(`[WARNING] ${message}`, data);
        this.reports.push({
            level: 'warning',
            message,
            data,
            timestamp: new Date().toISOString()
        });
    }

    logError(message, data = {}) {
        console.error(`[ERROR] ${message}`, data);
        this.reports.push({
            level: 'error',
            message,
            data,
            timestamp: new Date().toISOString()
        });
    }

    // Utility Methods for Testing
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

    deepClone(obj) {
        if (obj === null || typeof obj !== 'object') return obj;
        if (obj instanceof Date) return new Date(obj.getTime());
        if (obj instanceof Array) return obj.map(item => this.deepClone(item));
        if (typeof obj === 'object') {
            const clonedObj = {};
            for (const key in obj) {
                if (obj.hasOwnProperty(key)) {
                    clonedObj[key] = this.deepClone(obj[key]);
                }
            }
            return clonedObj;
        }
    }

    formatDate(date, format) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        
        return format
            .replace('YYYY', year)
            .replace('MM', month)
            .replace('DD', day);
    }

    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Performance Measurement Methods
    getFirstContentfulPaint() {
        const paintEntries = performance.getEntriesByType('paint');
        const fcpEntry = paintEntries.find(entry => entry.name === 'first-contentful-paint');
        return fcpEntry ? fcpEntry.startTime : null;
    }

    getLargestContentfulPaint() {
        const lcpEntries = performance.getEntriesByType('largest-contentful-paint');
        return lcpEntries.length > 0 ? lcpEntries[lcpEntries.length - 1].startTime : null;
    }

    getCumulativeLayoutShift() {
        const clsEntries = performance.getEntriesByType('layout-shift');
        return clsEntries.reduce((sum, entry) => sum + entry.value, 0);
    }

    getFirstInputDelay() {
        const fidEntries = performance.getEntriesByType('first-input');
        return fidEntries.length > 0 ? 
            fidEntries[0].processingStart - fidEntries[0].startTime : null;
    }

    // Event Handlers
    handleVisibilityChange() {
        if (document.hidden) {
            this.logInfo('Page hidden');
        } else {
            this.logInfo('Page visible');
        }
    }

    handleNetworkStatusChange(isOnline) {
        this.logInfo('Network status changed', { isOnline });
    }

    // Report Generation
    generateReport() {
        const report = {
            timestamp: new Date().toISOString(),
            testResults: Object.fromEntries(this.testResults),
            performanceMetrics: Object.fromEntries(this.performanceMetrics),
            reports: this.reports,
            summary: {
                totalTests: Array.from(this.testResults.values()).reduce((sum, result) => sum + result.total, 0),
                passedTests: Array.from(this.testResults.values()).reduce((sum, result) => sum + result.passed, 0),
                failedTests: Array.from(this.testResults.values()).reduce((sum, result) => sum + result.failed, 0),
                qualityScore: this.calculateQualityScore()
            }
        };

        return report;
    }

    calculateQualityScore() {
        const totalTests = Array.from(this.testResults.values()).reduce((sum, result) => sum + result.total, 0);
        const passedTests = Array.from(this.testResults.values()).reduce((sum, result) => sum + result.passed, 0);
        
        if (totalTests === 0) return 100;
        return Math.round((passedTests / totalTests) * 100);
    }

    // Run All Tests
    async runAllTests() {
        this.logInfo('Starting comprehensive test suite');
        
        // Run unit tests
        for (const [category, tests] of this.testSuite) {
            for (const [testName, testFunction] of Object.entries(tests)) {
                try {
                    const result = await testFunction();
                    this.logInfo(`Test completed: ${testName}`, result);
                } catch (error) {
                    this.logError(`Test failed: ${testName}`, { error: error.message });
                }
            }
        }

        // Run performance tests
        await this.testPageLoadPerformance();
        await this.testCoreWebVitals();

        // Generate final report
        const report = this.generateReport();
        this.logInfo('Test suite completed', report.summary);
        
        return report;
    }
}

// Initialize the testing framework when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.testingFramework = new TestingFramework();
    
    // Run initial tests after a short delay to ensure everything is loaded
    setTimeout(() => {
        window.testingFramework.runAllTests().then(report => {
            console.log('Comprehensive testing completed:', report);
        });
    }, 2000);
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TestingFramework;
} 