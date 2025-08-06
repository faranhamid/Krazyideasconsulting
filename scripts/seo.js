// ===== SEO JAVASCRIPT FILE =====

// Comprehensive SEO optimization and structured data management for KrazyIdeasConsulting website

class SEOManager {
    constructor() {
        this.structuredData = {};
        this.metaTags = {};
        this.schemaMarkup = {};
        this.init();
    }

    init() {
        this.initStructuredData();
        this.initMetaTags();
        this.initSchemaMarkup();
        this.initOpenGraph();
        this.initTwitterCards();
        this.initCanonicalURLs();
        this.initBreadcrumbs();
        this.initSitemap();
        this.initRobotsTxt();
        this.initPerformanceOptimization();
        this.initAccessibilityFeatures();
        this.initSocialSharing();
        this.initSearchConsole();
        this.initAnalyticsIntegration();
        this.initContentOptimization();
        this.initTechnicalSEO();
    }

    // ===== STRUCTURED DATA =====
    initStructuredData() {
        this.structuredData = {
            organization: {
                "@context": "https://schema.org",
                "@type": "Organization",
                "name": "KrazyIdeasConsulting",
                "url": "https://krazyideasconsulting.com",
                "logo": "https://krazyideasconsulting.com/assets/logo.png",
                "description": "Leading AI-powered strategy consulting firm helping businesses solve complex problems and achieve sustainable growth.",
                "foundingDate": "2024",
                "address": {
                    "@type": "PostalAddress",
                    "addressLocality": "San Francisco",
                    "addressRegion": "CA",
                    "addressCountry": "US"
                },
                "contactPoint": {
                    "@type": "ContactPoint",
                    "telephone": "+1-415-555-0123",
                    "contactType": "customer service",
                    "email": "hello@krazyideasconsulting.com"
                },
                "sameAs": [
                    "https://www.linkedin.com/company/krazyideasconsulting",
                    "https://twitter.com/krazyideasconsulting",
                    "https://www.facebook.com/krazyideasconsulting"
                ],
                "serviceArea": {
                    "@type": "GeoCircle",
                    "geoMidpoint": {
                        "@type": "GeoCoordinates",
                        "latitude": 37.7749,
                        "longitude": -122.4194
                    },
                    "geoRadius": "50000"
                },
                "hasOfferCatalog": {
                    "@type": "OfferCatalog",
                    "name": "Consulting Services",
                    "itemListElement": [
                        {
                            "@type": "Offer",
                            "itemOffered": {
                                "@type": "Service",
                                "name": "AI Strategy Consulting",
                                "description": "Develop comprehensive AI strategies that align with your business objectives."
                            }
                        },
                        {
                            "@type": "Offer",
                            "itemOffered": {
                                "@type": "Service",
                                "name": "Digital Transformation",
                                "description": "Transform your business operations with cutting-edge digital solutions."
                            }
                        },
                        {
                            "@type": "Offer",
                            "itemOffered": {
                                "@type": "Service",
                                "name": "Growth Strategy",
                                "description": "Develop data-driven growth strategies that expand your market presence."
                            }
                        }
                    ]
                }
            },
            website: {
                "@context": "https://schema.org",
                "@type": "WebSite",
                "name": "KrazyIdeasConsulting",
                "url": "https://krazyideasconsulting.com",
                "description": "AI-Powered Strategy Consulting - Helping businesses solve complex problems with cutting-edge technology.",
                "publisher": {
                    "@type": "Organization",
                    "name": "KrazyIdeasConsulting"
                },
                "potentialAction": {
                    "@type": "SearchAction",
                    "target": "https://krazyideasconsulting.com/search?q={search_term_string}",
                    "query-input": "required name=search_term_string"
                }
            },
            localBusiness: {
                "@context": "https://schema.org",
                "@type": "LocalBusiness",
                "name": "KrazyIdeasConsulting",
                "image": "https://krazyideasconsulting.com/assets/office.jpg",
                "description": "AI-powered strategy consulting firm in San Francisco",
                "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "123 Innovation Street",
                    "addressLocality": "San Francisco",
                    "addressRegion": "CA",
                    "postalCode": "94105",
                    "addressCountry": "US"
                },
                "geo": {
                    "@type": "GeoCoordinates",
                    "latitude": 37.7749,
                    "longitude": -122.4194
                },
                "url": "https://krazyideasconsulting.com",
                "telephone": "+1-415-555-0123",
                "openingHoursSpecification": {
                    "@type": "OpeningHoursSpecification",
                    "dayOfWeek": [
                        "Monday",
                        "Tuesday",
                        "Wednesday",
                        "Thursday",
                        "Friday"
                    ],
                    "opens": "09:00",
                    "closes": "18:00"
                },
                "priceRange": "$$",
                "servesCuisine": "Business Consulting",
                "areaServed": {
                    "@type": "GeoCircle",
                    "geoMidpoint": {
                        "@type": "GeoCoordinates",
                        "latitude": 37.7749,
                        "longitude": -122.4194
                    },
                    "geoRadius": "50000"
                }
            },
            faq: {
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": [
                    {
                        "@type": "Question",
                        "name": "What services does KrazyIdeasConsulting offer?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "We offer AI Strategy Consulting, Digital Transformation, Growth Strategy, Operational Excellence, Risk Management, and Organizational Development services."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "How much revenue has KrazyIdeasConsulting generated?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "We have generated over $1M+ in revenue since the beginning of 2024."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "What industries do you serve?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "We serve businesses across all industries including technology, healthcare, finance, retail, manufacturing, and logistics."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "How do you use AI in your consulting services?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "We leverage cutting-edge AI technology including machine learning analytics, natural language processing, computer vision, and process automation to solve complex business problems."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "What is your success rate?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "We maintain a 95% success rate across all our client engagements."
                        }
                    }
                ]
            },
            article: {
                "@context": "https://schema.org",
                "@type": "Article",
                "headline": "The Future of AI in Business Strategy",
                "description": "How artificial intelligence is reshaping strategic decision-making and creating new competitive advantages for forward-thinking organizations.",
                "image": "https://krazyideasconsulting.com/assets/ai-strategy-article.jpg",
                "author": {
                    "@type": "Person",
                    "name": "KrazyIdeasConsulting Team"
                },
                "publisher": {
                    "@type": "Organization",
                    "name": "KrazyIdeasConsulting",
                    "logo": {
                        "@type": "ImageObject",
                        "url": "https://krazyideasconsulting.com/assets/logo.png"
                    }
                },
                "datePublished": "2024-12-15",
                "dateModified": "2024-12-15",
                "mainEntityOfPage": {
                    "@type": "WebPage",
                    "@id": "https://krazyideasconsulting.com/insights/ai-business-strategy"
                }
            },
            breadcrumb: {
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                "itemListElement": [
                    {
                        "@type": "ListItem",
                        "position": 1,
                        "name": "Home",
                        "item": "https://krazyideasconsulting.com"
                    },
                    {
                        "@type": "ListItem",
                        "position": 2,
                        "name": "Services",
                        "item": "https://krazyideasconsulting.com/#services"
                    },
                    {
                        "@type": "ListItem",
                        "position": 3,
                        "name": "AI Strategy Consulting",
                        "item": "https://krazyideasconsulting.com/services/ai-strategy"
                    }
                ]
            }
        };

        this.injectStructuredData();
    }

    injectStructuredData() {
        Object.entries(this.structuredData).forEach(([key, data]) => {
            const script = document.createElement('script');
            script.type = 'application/ld+json';
            script.textContent = JSON.stringify(data);
            document.head.appendChild(script);
        });
    }

    // ===== META TAGS =====
    initMetaTags() {
        this.metaTags = {
            viewport: 'width=device-width, initial-scale=1.0',
            description: 'Leading AI-powered strategy consulting firm helping businesses solve complex problems and achieve sustainable growth. Over $1M+ revenue generated since 2024.',
            keywords: 'strategy consulting, AI consulting, business solutions, digital transformation, McKinsey alternative, San Francisco consulting',
            author: 'KrazyIdeasConsulting',
            robots: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
            language: 'en',
            charset: 'UTF-8',
            themeColor: '#6B46C1',
            msapplicationTileColor: '#6B46C1',
            appleMobileWebAppCapable: 'yes',
            appleMobileWebAppStatusBarStyle: 'default',
            appleMobileWebAppTitle: 'KrazyIdeasConsulting',
            formatDetection: 'telephone=no',
            mobileWebAppCapable: 'yes',
            applicationName: 'KrazyIdeasConsulting',
            msapplicationConfig: '/browserconfig.xml',
            msapplicationTileImage: '/mstile-144x144.png',
            msapplicationTileImageSquare150x150: '/mstile-150x150.png',
            msapplicationTileImageWide310x150: '/mstile-310x150.png',
            msapplicationTileImageSquare310x310: '/mstile-310x310.png'
        };

        this.injectMetaTags();
    }

    injectMetaTags() {
        Object.entries(this.metaTags).forEach(([name, content]) => {
            const meta = document.createElement('meta');
            meta.name = name;
            meta.content = content;
            document.head.appendChild(meta);
        });
    }

    // ===== SCHEMA MARKUP =====
    initSchemaMarkup() {
        this.schemaMarkup = {
            // Service schema
            service: {
                "@context": "https://schema.org",
                "@type": "Service",
                "name": "AI Strategy Consulting",
                "description": "Comprehensive AI strategy development and implementation services",
                "provider": {
                    "@type": "Organization",
                    "name": "KrazyIdeasConsulting"
                },
                "areaServed": {
                    "@type": "Country",
                    "name": "United States"
                },
                "hasOfferCatalog": {
                    "@type": "OfferCatalog",
                    "name": "AI Consulting Services",
                    "itemListElement": [
                        {
                            "@type": "Offer",
                            "itemOffered": {
                                "@type": "Service",
                                "name": "AI Readiness Assessment"
                            }
                        },
                        {
                            "@type": "Offer",
                            "itemOffered": {
                                "@type": "Service",
                                "name": "Technology Roadmap Development"
                            }
                        },
                        {
                            "@type": "Offer",
                            "itemOffered": {
                                "@type": "Service",
                                "name": "Implementation Planning"
                            }
                        }
                    ]
                }
            },
            // Person schema for team members
            person: {
                "@context": "https://schema.org",
                "@type": "Person",
                "name": "Consulting Team",
                "jobTitle": "AI Strategy Consultants",
                "worksFor": {
                    "@type": "Organization",
                    "name": "KrazyIdeasConsulting"
                },
                "knowsAbout": [
                    "Artificial Intelligence",
                    "Business Strategy",
                    "Digital Transformation",
                    "Machine Learning",
                    "Data Analytics"
                ]
            },
            // Review schema
            review: {
                "@context": "https://schema.org",
                "@type": "Review",
                "itemReviewed": {
                    "@type": "Organization",
                    "name": "KrazyIdeasConsulting"
                },
                "reviewRating": {
                    "@type": "Rating",
                    "ratingValue": "5",
                    "bestRating": "5"
                },
                "author": {
                    "@type": "Person",
                    "name": "Client"
                },
                "reviewBody": "Exceptional AI strategy consulting services that delivered measurable results for our business."
            }
        };

        this.injectSchemaMarkup();
    }

    injectSchemaMarkup() {
        Object.entries(this.schemaMarkup).forEach(([key, data]) => {
            const script = document.createElement('script');
            script.type = 'application/ld+json';
            script.textContent = JSON.stringify(data);
            document.head.appendChild(script);
        });
    }

    // ===== OPEN GRAPH =====
    initOpenGraph() {
        const ogTags = {
            'og:title': 'KrazyIdeasConsulting - AI-Powered Strategy Consulting',
            'og:description': 'Leading AI-powered strategy consulting firm helping businesses solve complex problems and achieve sustainable growth. Over $1M+ revenue generated since 2024.',
            'og:type': 'website',
            'og:url': 'https://krazyideasconsulting.com',
            'og:image': 'https://krazyideasconsulting.com/assets/og-image.jpg',
            'og:image:width': '1200',
            'og:image:height': '630',
            'og:image:alt': 'KrazyIdeasConsulting - AI-Powered Strategy Consulting',
            'og:site_name': 'KrazyIdeasConsulting',
            'og:locale': 'en_US',
            'og:locale:alternate': 'en_GB',
            'og:locale:alternate': 'en_CA'
        };

        Object.entries(ogTags).forEach(([property, content]) => {
            const meta = document.createElement('meta');
            meta.property = property;
            meta.content = content;
            document.head.appendChild(meta);
        });
    }

    // ===== TWITTER CARDS =====
    initTwitterCards() {
        const twitterTags = {
            'twitter:card': 'summary_large_image',
            'twitter:site': '@krazyideasconsulting',
            'twitter:creator': '@krazyideasconsulting',
            'twitter:title': 'KrazyIdeasConsulting - AI-Powered Strategy Consulting',
            'twitter:description': 'Leading AI-powered strategy consulting firm helping businesses solve complex problems and achieve sustainable growth.',
            'twitter:image': 'https://krazyideasconsulting.com/assets/twitter-card.jpg',
            'twitter:image:alt': 'KrazyIdeasConsulting - AI-Powered Strategy Consulting'
        };

        Object.entries(twitterTags).forEach(([name, content]) => {
            const meta = document.createElement('meta');
            meta.name = name;
            meta.content = content;
            document.head.appendChild(meta);
        });
    }

    // ===== CANONICAL URLS =====
    initCanonicalURLs() {
        const canonical = document.createElement('link');
        canonical.rel = 'canonical';
        canonical.href = 'https://krazyideasconsulting.com';
        document.head.appendChild(canonical);

        // Add alternate language versions
        const alternateVersions = [
            { hreflang: 'en', href: 'https://krazyideasconsulting.com' },
            { hreflang: 'en-US', href: 'https://krazyideasconsulting.com' },
            { hreflang: 'en-GB', href: 'https://krazyideasconsulting.com' },
            { hreflang: 'x-default', href: 'https://krazyideasconsulting.com' }
        ];

        alternateVersions.forEach(version => {
            const link = document.createElement('link');
            link.rel = 'alternate';
            link.hreflang = version.hreflang;
            link.href = version.href;
            document.head.appendChild(link);
        });
    }

    // ===== BREADCRUMBS =====
    initBreadcrumbs() {
        const breadcrumbData = [
            { name: 'Home', url: '/' },
            { name: 'Services', url: '/#services' },
            { name: 'AI Strategy Consulting', url: '/services/ai-strategy' }
        ];

        const breadcrumbSchema = {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": breadcrumbData.map((item, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "name": item.name,
                "item": `https://krazyideasconsulting.com${item.url}`
            }))
        };

        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(breadcrumbSchema);
        document.head.appendChild(script);
    }

    // ===== SITEMAP =====
    initSitemap() {
        this.sitemapData = {
            pages: [
                { url: '/', priority: '1.0', changefreq: 'weekly' },
                { url: '/about', priority: '0.8', changefreq: 'monthly' },
                { url: '/services', priority: '0.9', changefreq: 'weekly' },
                { url: '/solutions', priority: '0.9', changefreq: 'weekly' },
                { url: '/clients', priority: '0.7', changefreq: 'monthly' },
                { url: '/insights', priority: '0.8', changefreq: 'weekly' },
                { url: '/contact', priority: '0.8', changefreq: 'monthly' }
            ],
            services: [
                { url: '/services/ai-strategy', priority: '0.9', changefreq: 'weekly' },
                { url: '/services/digital-transformation', priority: '0.9', changefreq: 'weekly' },
                { url: '/services/growth-strategy', priority: '0.9', changefreq: 'weekly' },
                { url: '/services/operational-excellence', priority: '0.8', changefreq: 'weekly' },
                { url: '/services/risk-management', priority: '0.8', changefreq: 'weekly' },
                { url: '/services/organizational-development', priority: '0.8', changefreq: 'weekly' }
            ],
            insights: [
                { url: '/insights/ai-business-strategy', priority: '0.8', changefreq: 'monthly' },
                { url: '/insights/digital-transformation-2025', priority: '0.8', changefreq: 'monthly' },
                { url: '/insights/sustainable-growth-strategies', priority: '0.8', changefreq: 'monthly' },
                { url: '/insights/operational-excellence-ai-era', priority: '0.8', changefreq: 'monthly' }
            ]
        };
    }

    // ===== ROBOTS.TXT =====
    initRobotsTxt() {
        this.robotsContent = `User-agent: *
Allow: /
Disallow: /admin/
Disallow: /private/
Disallow: /temp/

Sitemap: https://krazyideasconsulting.com/sitemap.xml

# Crawl-delay for respectful crawling
Crawl-delay: 1`;
    }

    // ===== PERFORMANCE OPTIMIZATION =====
    initPerformanceOptimization() {
        // Preload critical resources
        const preloadLinks = [
            { rel: 'preload', href: '/styles/main.css', as: 'style' },
            { rel: 'preload', href: '/scripts/main.js', as: 'script' },
            { rel: 'preload', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap', as: 'style' },
            { rel: 'preload', href: 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800;900&display=swap', as: 'style' }
        ];

        preloadLinks.forEach(link => {
            const preload = document.createElement('link');
            preload.rel = link.rel;
            preload.href = link.href;
            preload.as = link.as;
            document.head.appendChild(preload);
        });

        // DNS prefetch for external resources
        const dnsPrefetch = [
            'https://fonts.googleapis.com',
            'https://fonts.gstatic.com',
            'https://cdnjs.cloudflare.com'
        ];

        dnsPrefetch.forEach(domain => {
            const prefetch = document.createElement('link');
            prefetch.rel = 'dns-prefetch';
            prefetch.href = domain;
            document.head.appendChild(prefetch);
        });
    }

    // ===== ACCESSIBILITY FEATURES =====
    initAccessibilityFeatures() {
        // Add ARIA labels
        const elements = document.querySelectorAll('[data-aria-label]');
        elements.forEach(element => {
            const ariaLabel = element.getAttribute('data-aria-label');
            element.setAttribute('aria-label', ariaLabel);
        });

        // Add skip links
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.textContent = 'Skip to main content';
        skipLink.className = 'skip-link';
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 6px;
            background: #6B46C1;
            color: white;
            padding: 8px;
            text-decoration: none;
            border-radius: 4px;
            z-index: 10000;
        `;
        document.body.insertBefore(skipLink, document.body.firstChild);

        // Add focus styles
        const style = document.createElement('style');
        style.textContent = `
            .skip-link:focus {
                top: 6px;
            }
            *:focus {
                outline: 2px solid #6B46C1;
                outline-offset: 2px;
            }
        `;
        document.head.appendChild(style);
    }

    // ===== SOCIAL SHARING =====
    initSocialSharing() {
        // Add social sharing meta tags
        const socialMeta = {
            'og:title': 'KrazyIdeasConsulting - AI-Powered Strategy Consulting',
            'og:description': 'Leading AI-powered strategy consulting firm helping businesses solve complex problems and achieve sustainable growth.',
            'og:image': 'https://krazyideasconsulting.com/assets/social-share.jpg',
            'og:url': 'https://krazyideasconsulting.com',
            'twitter:card': 'summary_large_image',
            'twitter:title': 'KrazyIdeasConsulting - AI-Powered Strategy Consulting',
            'twitter:description': 'Leading AI-powered strategy consulting firm helping businesses solve complex problems and achieve sustainable growth.',
            'twitter:image': 'https://krazyideasconsulting.com/assets/social-share.jpg'
        };

        Object.entries(socialMeta).forEach(([property, content]) => {
            const meta = document.createElement('meta');
            if (property.startsWith('og:')) {
                meta.property = property;
            } else {
                meta.name = property;
            }
            meta.content = content;
            document.head.appendChild(meta);
        });
    }

    // ===== SEARCH CONSOLE =====
    initSearchConsole() {
        // Google Search Console verification
        const searchConsole = document.createElement('meta');
        searchConsole.name = 'google-site-verification';
        searchConsole.content = 'your-verification-code';
        document.head.appendChild(searchConsole);

        // Bing Webmaster Tools verification
        const bingWebmaster = document.createElement('meta');
        bingWebmaster.name = 'msvalidate.01';
        bingWebmaster.content = 'your-bing-verification-code';
        document.head.appendChild(bingWebmaster);
    }

    // ===== ANALYTICS INTEGRATION =====
    initAnalyticsIntegration() {
        // Google Analytics 4
        const gtag = document.createElement('script');
        gtag.async = true;
        gtag.src = 'https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID';
        document.head.appendChild(gtag);

        const gtagConfig = document.createElement('script');
        gtagConfig.textContent = `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'GA_MEASUREMENT_ID');
        `;
        document.head.appendChild(gtagConfig);

        // Google Tag Manager
        const gtm = document.createElement('script');
        gtm.textContent = `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-XXXXXXX');
        `;
        document.head.appendChild(gtm);

        // GTM noscript
        const gtmNoscript = document.createElement('noscript');
        gtmNoscript.innerHTML = '<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX" height="0" width="0" style="display:none;visibility:hidden"></iframe>';
        document.body.insertBefore(gtmNoscript, document.body.firstChild);
    }

    // ===== CONTENT OPTIMIZATION =====
    initContentOptimization() {
        // Add semantic HTML elements
        const mainContent = document.querySelector('main') || document.querySelector('.hero-section');
        if (mainContent) {
            mainContent.setAttribute('id', 'main-content');
            mainContent.setAttribute('role', 'main');
        }

        // Add landmarks
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            if (!section.getAttribute('role')) {
                section.setAttribute('role', 'region');
            }
        });

        // Add heading hierarchy
        const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
        headings.forEach((heading, index) => {
            if (!heading.getAttribute('id')) {
                heading.setAttribute('id', `heading-${index + 1}`);
            }
        });
    }

    // ===== TECHNICAL SEO =====
    initTechnicalSEO() {
        // Add language attribute
        document.documentElement.setAttribute('lang', 'en');

        // Add manifest for PWA
        const manifest = document.createElement('link');
        manifest.rel = 'manifest';
        manifest.href = '/manifest.json';
        document.head.appendChild(manifest);

        // Add theme color
        const themeColor = document.createElement('meta');
        themeColor.name = 'theme-color';
        themeColor.content = '#6B46C1';
        document.head.appendChild(themeColor);

        // Add viewport meta tag if not present
        if (!document.querySelector('meta[name="viewport"]')) {
            const viewport = document.createElement('meta');
            viewport.name = 'viewport';
            viewport.content = 'width=device-width, initial-scale=1.0';
            document.head.appendChild(viewport);
        }

        // Add charset if not present
        if (!document.querySelector('meta[charset]')) {
            const charset = document.createElement('meta');
            charset.charset = 'UTF-8';
            document.head.appendChild(charset);
        }
    }

    // ===== UTILITY FUNCTIONS =====
    updateMetaTags(title, description, keywords) {
        // Update title
        document.title = title;

        // Update meta description
        let metaDescription = document.querySelector('meta[name="description"]');
        if (!metaDescription) {
            metaDescription = document.createElement('meta');
            metaDescription.name = 'description';
            document.head.appendChild(metaDescription);
        }
        metaDescription.content = description;

        // Update keywords
        let metaKeywords = document.querySelector('meta[name="keywords"]');
        if (!metaKeywords) {
            metaKeywords = document.createElement('meta');
            metaKeywords.name = 'keywords';
            document.head.appendChild(metaKeywords);
        }
        metaKeywords.content = keywords;

        // Update Open Graph tags
        this.updateOpenGraphTags(title, description);
    }

    updateOpenGraphTags(title, description) {
        const ogTitle = document.querySelector('meta[property="og:title"]');
        if (ogTitle) ogTitle.content = title;

        const ogDescription = document.querySelector('meta[property="og:description"]');
        if (ogDescription) ogDescription.content = description;

        const twitterTitle = document.querySelector('meta[name="twitter:title"]');
        if (twitterTitle) twitterTitle.content = title;

        const twitterDescription = document.querySelector('meta[name="twitter:description"]');
        if (twitterDescription) twitterDescription.content = description;
    }

    generateSitemap() {
        const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${this.sitemapData.pages.map(page => `
  <url>
    <loc>https://krazyideasconsulting.com${page.url}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('')}
${this.sitemapData.services.map(service => `
  <url>
    <loc>https://krazyideasconsulting.com${service.url}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>${service.changefreq}</changefreq>
    <priority>${service.priority}</priority>
  </url>`).join('')}
${this.sitemapData.insights.map(insight => `
  <url>
    <loc>https://krazyideasconsulting.com${insight.url}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>${insight.changefreq}</changefreq>
    <priority>${insight.priority}</priority>
  </url>`).join('')}
</urlset>`;

        return sitemap;
    }

    // ===== EXPORT FUNCTIONS =====
    exportSEOData() {
        const data = {
            structuredData: this.structuredData,
            metaTags: this.metaTags,
            schemaMarkup: this.schemaMarkup,
            sitemapData: this.sitemapData,
            robotsContent: this.robotsContent,
            exportTimestamp: Date.now()
        };

        const blob = new Blob([JSON.stringify(data, null, 2)], {
            type: 'application/json'
        });

        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `seo-data-${Date.now()}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    window.seoManager = new SEOManager();
});

// ===== EXPORT FOR MODULE SYSTEM =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SEOManager;
} 