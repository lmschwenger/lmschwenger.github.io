// Modern Navigation & Scroll Behavior

class ModernNavigation {
    constructor() {
        this.header = document.querySelector('.header');
        this.mobileToggle = document.querySelector('.mobile-menu-toggle');
        this.mobileNav = document.querySelector('.mobile-nav');
        this.mobileClose = document.querySelector('.mobile-close');
        this.backToTop = document.querySelector('.back-to-top');
        
        this.init();
    }

    init() {
        this.setupScrollBehavior();
        this.setupMobileMenu();
        this.setupSmoothScroll();
        this.setupBackToTop();
        this.setupActiveNavigation();
    }

    setupScrollBehavior() {
        let lastScrollY = window.scrollY;
        
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            
            // Header visibility and styling
            if (currentScrollY > 100) {
                this.header.style.background = 'rgba(248, 250, 252, 0.95)';
                this.header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
            } else {
                this.header.style.background = 'rgba(248, 250, 252, 0.8)';
                this.header.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
            }

            // Header hide/show on scroll
            if (currentScrollY > lastScrollY && currentScrollY > 200) {
                this.header.style.transform = 'translateY(-100%)';
            } else {
                this.header.style.transform = 'translateY(0)';
            }
            
            lastScrollY = currentScrollY;
        });
    }

    setupMobileMenu() {
        if (this.mobileToggle) {
            this.mobileToggle.addEventListener('click', () => {
                this.openMobileMenu();
            });
        }

        if (this.mobileClose) {
            this.mobileClose.addEventListener('click', () => {
                this.closeMobileMenu();
            });
        }

        // Close mobile menu when clicking on a link
        const mobileLinks = this.mobileNav?.querySelectorAll('a');
        mobileLinks?.forEach(link => {
            link.addEventListener('click', () => {
                this.closeMobileMenu();
            });
        });

        // Close mobile menu when clicking outside
        this.mobileNav?.addEventListener('click', (e) => {
            if (e.target === this.mobileNav) {
                this.closeMobileMenu();
            }
        });

        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.mobileNav?.classList.contains('active')) {
                this.closeMobileMenu();
            }
        });
    }

    openMobileMenu() {
        this.mobileNav?.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeMobileMenu() {
        this.mobileNav?.classList.remove('active');
        document.body.style.overflow = '';
    }

    setupSmoothScroll() {
        // Smooth scroll for all anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = anchor.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const headerHeight = this.header?.offsetHeight || 0;
                    const targetPosition = targetElement.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    setupBackToTop() {
        if (!this.backToTop) return;

        // Show/hide back to top button
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                this.backToTop.classList.add('visible');
            } else {
                this.backToTop.classList.remove('visible');
            }
        });

        // Back to top functionality
        this.backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    setupActiveNavigation() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-links a[href^="#"], .mobile-nav a[href^="#"]');

        if (sections.length === 0 || navLinks.length === 0) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.id;
                    
                    // Remove active class from all nav links
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                    });
                    
                    // Add active class to current section link
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
}

// Scroll Animations
class ScrollAnimations {
    constructor() {
        this.animatedElements = document.querySelectorAll('[data-aos]');
        this.init();
    }

    init() {
        this.setupAnimations();
        this.observeElements();
    }

    setupAnimations() {
        this.animatedElements.forEach((element, index) => {
            const delay = element.getAttribute('data-aos-delay') || 0;
            
            element.style.opacity = '0';
            element.style.transform = this.getInitialTransform(element);
            element.style.transition = `all 0.6s ease ${delay}ms`;
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

    observeElements() {
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

        this.animatedElements.forEach(element => {
            observer.observe(element);
        });
    }
}

// Enhanced Performance & UX
class PerformanceOptimizer {
    constructor() {
        this.init();
    }

    init() {
        this.optimizeImages();
        this.setupPreloading();
        this.setupIntersectionObserver();
    }

    optimizeImages() {
        const images = document.querySelectorAll('img[loading="lazy"]');
        
        if ('loading' in HTMLImageElement.prototype) {
            // Native lazy loading supported
            return;
        }

        // Fallback for browsers without native lazy loading
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

        images.forEach(img => {
            imageObserver.observe(img);
        });
    }

    setupPreloading() {
        // Preload critical assets
        const criticalAssets = [
            'assets/profile-image.jpg'
        ];

        criticalAssets.forEach(asset => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = asset;
            document.head.appendChild(link);
        });
    }

    setupIntersectionObserver() {
        // Generic intersection observer for performance-sensitive elements
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                } else {
                    entry.target.classList.remove('in-view');
                }
            });
        }, {
            threshold: 0.1
        });

        // Observe elements that need performance optimization
        document.querySelectorAll('.project-card, .expertise-card').forEach(element => {
            observer.observe(element);
        });
    }
}

// Theme and Accessibility
class AccessibilityEnhancer {
    constructor() {
        this.init();
    }

    init() {
        this.setupFocusManagement();
        this.setupKeyboardNavigation();
        this.setupReducedMotion();
    }

    setupFocusManagement() {
        // Enhanced focus visibility
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-nav');
            }
        });

        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-nav');
        });
    }

    setupKeyboardNavigation() {
        // Enhanced keyboard navigation for interactive elements
        const interactiveElements = document.querySelectorAll(
            'button, a, input, textarea, select, [tabindex]:not([tabindex="-1"])'
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
    }

    setupReducedMotion() {
        // Respect user's motion preferences
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        
        if (prefersReducedMotion.matches) {
            document.body.classList.add('reduced-motion');
            
            // Disable complex animations
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
    }
}

// Error Handling
class ErrorHandler {
    constructor() {
        this.init();
    }

    init() {
        this.setupGlobalErrorHandling();
        this.setupImageErrorHandling();
    }

    setupGlobalErrorHandling() {
        window.addEventListener('error', (e) => {
            console.warn('Site error:', e.error);
            // Could send to analytics service
        });

        window.addEventListener('unhandledrejection', (e) => {
            console.warn('Unhandled promise rejection:', e.reason);
            e.preventDefault();
        });
    }

    setupImageErrorHandling() {
        document.addEventListener('error', (e) => {
            if (e.target.tagName === 'IMG') {
                e.target.style.display = 'none';
                console.warn('Image failed to load:', e.target.src);
            }
        }, true);
    }
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new ModernNavigation();
    new ScrollAnimations();
    new PerformanceOptimizer();
    new AccessibilityEnhancer();
    new ErrorHandler();
});

// Additional utility functions
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
    },

    isElementInViewport: (el) => {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
};

// Export for potential use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ModernNavigation, ScrollAnimations, utils };
}