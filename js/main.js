// Modern Portfolio Site - Complete Functionality
// Consolidates all interactive features for the redesigned site

class PortfolioSite {
    constructor() {
        this.init();
    }

    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initializeComponents());
        } else {
            this.initializeComponents();
        }
    }

    initializeComponents() {
        this.initNavigation();
        this.initScrollAnimations();
        this.initCertificates();
        this.initPerformanceOptimizations();
        this.initAccessibility();
    }

    // Navigation & Mobile Menu
    initNavigation() {
        const header = document.querySelector('.header');
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        const mobileNav = document.querySelector('.mobile-nav');
        const mobileClose = document.querySelector('.mobile-close');
        const backToTop = document.querySelector('.back-to-top');

        // Header scroll behavior
        let lastScrollY = window.scrollY;
        
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            
            // Header styling based on scroll
            if (currentScrollY > 100) {
                header.style.background = 'rgba(248, 250, 252, 0.95)';
                header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.background = 'rgba(248, 250, 252, 0.8)';
                header.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
            }

            // Auto-hide header on scroll down
            if (currentScrollY > lastScrollY && currentScrollY > 200) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
            
            // Back to top button
            if (backToTop) {
                if (currentScrollY > 500) {
                    backToTop.classList.add('visible');
                } else {
                    backToTop.classList.remove('visible');
                }
            }
            
            lastScrollY = currentScrollY;
        });

        // Mobile menu functionality
        if (mobileToggle && mobileNav) {
            mobileToggle.addEventListener('click', () => {
                mobileNav.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        }

        if (mobileClose && mobileNav) {
            mobileClose.addEventListener('click', () => {
                mobileNav.classList.remove('active');
                document.body.style.overflow = '';
            });
        }

        // Close mobile menu on link click
        const mobileLinks = mobileNav?.querySelectorAll('a');
        mobileLinks?.forEach(link => {
            link.addEventListener('click', () => {
                mobileNav.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Close mobile menu on outside click
        mobileNav?.addEventListener('click', (e) => {
            if (e.target === mobileNav) {
                mobileNav.classList.remove('active');
                document.body.style.overflow = '';
            }
        });

        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = anchor.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const headerHeight = header?.offsetHeight || 0;
                    const targetPosition = targetElement.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Back to top functionality
        if (backToTop) {
            backToTop.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }

        // Active navigation highlighting
        this.initActiveNavigation();
    }

    initActiveNavigation() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-links a[href^="#"], .mobile-nav a[href^="#"]');

        if (sections.length === 0 || navLinks.length === 0) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.id;
                    
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                    });
                    
                    const activeLink = document.querySelector(`a[href="#${sectionId}"]`);
                    if (activeLink) {
                        activeLink.classList.add('active');
                    }
                }
            });
        }, {
            rootMargin: '-20% 0px -70% 0px'
        });

        sections.forEach(section => {
            observer.observe(section);
        });
    }

    // Scroll animations
    initScrollAnimations() {
        const animatedElements = document.querySelectorAll('[data-aos]');

        // Setup initial state
        animatedElements.forEach((element) => {
            const delay = element.getAttribute('data-aos-delay') || 0;
            
            element.style.opacity = '0';
            element.style.transform = this.getInitialTransform(element);
            element.style.transition = `all 0.6s ease ${delay}ms`;
        });

        // Observe elements for animation trigger
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) translateX(0) scale(1)';
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        animatedElements.forEach(element => {
            observer.observe(element);
        });
    }

    getInitialTransform(element) {
        const animation = element.getAttribute('data-aos');
        
        switch (animation) {
            case 'fade-up':
                return 'translateY(30px)';
            case 'fade-down':
                return 'translateY(-30px)';
            case 'fade-left':
                return 'translateX(30px)';
            case 'fade-right':
                return 'translateX(-30px)';
            case 'zoom-in':
                return 'scale(0.9)';
            default:
                return 'translateY(30px)';
        }
    }

    // Certificate functionality
    initCertificates() {
        // Certificate toggle
        const showCertsBtn = document.getElementById('show-certs');
        const certsSection = document.getElementById('certifications');
        
        if (showCertsBtn && certsSection) {
            showCertsBtn.addEventListener('click', (e) => {
                e.preventDefault();
                const isVisible = certsSection.style.display !== 'none';
                
                if (isVisible) {
                    certsSection.style.display = 'none';
                    showCertsBtn.innerHTML = 'View All Certifications <i class="fas fa-chevron-down"></i>';
                } else {
                    certsSection.style.display = 'block';
                    showCertsBtn.innerHTML = 'Hide Certifications <i class="fas fa-chevron-up"></i>';
                    certsSection.scrollIntoView({ behavior: 'smooth' });
                }
            });
        }

        // Certificate filtering
        const filterButtons = document.querySelectorAll('.cert-filter-btn');
        const certCards = document.querySelectorAll('.cert-card');

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const category = button.dataset.category;
                
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // Filter certificates with staggered animation
                certCards.forEach((card, index) => {
                    const shouldShow = category === 'all' || card.dataset.category === category;
                    
                    if (shouldShow) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, index * 50);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });

        // Initialize certificate card transitions
        certCards.forEach(card => {
            card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        });
    }

    // Performance optimizations
    initPerformanceOptimizations() {
        // Lazy loading fallback for older browsers
        if (!('loading' in HTMLImageElement.prototype)) {
            const images = document.querySelectorAll('img[loading="lazy"]');
            
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.classList.remove('lazy');
                            imageObserver.unobserve(img);
                        }
                    }
                });
            });

            images.forEach(img => imageObserver.observe(img));
        }

        // Preload critical assets
        const criticalAssets = ['assets/profile-image.jpg'];
        
        criticalAssets.forEach(asset => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = asset;
            document.head.appendChild(link);
        });

        // Add performance observer for cards
        const performanceObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                } else {
                    entry.target.classList.remove('in-view');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.project-card, .expertise-card, .publication-card').forEach(element => {
            performanceObserver.observe(element);
        });
    }

    // Accessibility enhancements
    initAccessibility() {
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-nav');
            }
            
            // Escape key to close mobile menu
            if (e.key === 'Escape') {
                const mobileNav = document.querySelector('.mobile-nav');
                if (mobileNav?.classList.contains('active')) {
                    mobileNav.classList.remove('active');
                    document.body.style.overflow = '';
                }
            }
        });

        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-nav');
        });

        // Enhanced button interactions
        const interactiveElements = document.querySelectorAll(
            'button, a, [role="button"], [tabindex]:not([tabindex="-1"])'
        );

        interactiveElements.forEach(element => {
            element.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    if (element.tagName === 'BUTTON' || element.role === 'button') {
                        e.preventDefault();
                        element.click();
                    }
                }
            });
        });

        // Respect reduced motion preferences
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        
        if (prefersReducedMotion.matches) {
            document.body.classList.add('reduced-motion');
            
            const style = document.createElement('style');
            style.textContent = `
                .reduced-motion * {
                    animation-duration: 0.01s !important;
                    animation-iteration-count: 1 !important;
                    transition-duration: 0.01s !important;
                }
            `;
            document.head.appendChild(style);
        }

        // Error handling
        window.addEventListener('error', (e) => {
            if (e.target.tagName === 'IMG') {
                e.target.style.display = 'none';
                console.warn('Image failed to load:', e.target.src);
            }
        }, true);
    }
}

// Utility functions
const utils = {
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
    }
};

// Initialize the site
new PortfolioSite();