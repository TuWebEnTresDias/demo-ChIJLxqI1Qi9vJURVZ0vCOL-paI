/* ===================================
   Café del Medio - Casa Carlota
   Landing Page Scripts
   =================================== */

document.addEventListener('DOMContentLoaded', function() {
    // --- Header Scroll Effect ---
    const header = document.getElementById('header');
    const hero = document.getElementById('hero');
    
    function handleHeaderScroll() {
        const scrollY = window.scrollY;
        const heroHeight = hero ? hero.offsetHeight : 600;
        
        if (scrollY > 100) {
            header.classList.add('header--scrolled');
        } else {
            header.classList.remove('header--scrolled');
        }
    }
    
    window.addEventListener('scroll', handleHeaderScroll);
    handleHeaderScroll(); // Initial check
    
    // --- Mobile Menu ---
    const hamburger = document.getElementById('hamburger');
    const nav = document.getElementById('nav');
    
    if (hamburger && nav) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            nav.classList.toggle('active');
            document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
        });
        
        // Close menu on link click
        nav.querySelectorAll('.header__nav-link').forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                nav.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }
    
    // --- Menu Tabs ---
    const menuTabs = document.querySelectorAll('.menu__tab');
    const menuCategories = document.querySelectorAll('.menu__category');
    
    menuTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetCategory = this.getAttribute('data-tab');
            
            // Update active tab
            menuTabs.forEach(t => t.classList.remove('menu__tab--active'));
            this.classList.add('menu__tab--active');
            
            // Update active category
            menuCategories.forEach(cat => {
                cat.classList.remove('menu__category--active');
                if (cat.getAttribute('data-category') === targetCategory) {
                    cat.classList.add('menu__category--active');
                }
            });
        });
    });
    
    // --- Scroll Animations (Intersection Observer) ---
    const animatedElements = document.querySelectorAll('[data-animate]');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.1
    };
    
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.getAttribute('data-delay') || 0;
                
                setTimeout(() => {
                    entry.target.classList.add('animated');
                }, parseInt(delay));
                
                animationObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(element => {
        animationObserver.observe(element);
    });
    
    // --- Smooth Scroll for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            
            const target = document.querySelector(href);
            if (target) {
                const headerHeight = header ? header.offsetHeight : 80;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // --- Newsletter Form ---
    const newsletterForm = document.getElementById('newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (email) {
                // Open WhatsApp with newsletter subscription message
                const message = encodeURIComponent(`Hola! Me gustaría suscribirme al newsletter de Café del Medio. Mi email: ${email}`);
                window.open(`https://wa.me/5491154056602?text=${message}`, '_blank');
                
                // Reset form
                this.reset();
                
                // Show success feedback
                const btn = this.querySelector('button[type="submit"]');
                const originalText = btn.textContent;
                btn.textContent = '✓';
                btn.style.backgroundColor = '#25D366';
                btn.style.color = 'white';
                
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.style.backgroundColor = '';
                    btn.style.color = '';
                }, 2000);
            }
        });
    }
    
    // --- Gallery Hover Effect Enhancement ---
    const galleryItems = document.querySelectorAll('.gallery__item');
    
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.zIndex = '10';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.zIndex = '';
        });
    });
    
    // --- Parallax Effect for Hero ---
    let ticking = false;
    
    function updateParallax() {
        const scrollY = window.scrollY;
        const heroImage = document.querySelector('.hero__image');
        
        if (heroImage && scrollY < window.innerHeight) {
            const parallaxValue = scrollY * 0.3;
            heroImage.style.transform = `scale(1.1) translateY(${parallaxValue}px)`;
        }
        
        ticking = false;
    }
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(updateParallax);
            ticking = true;
        }
    });
    
    // --- Testimonial Cards Animation ---
    const testimonials = document.querySelectorAll('.testimonial');
    
    testimonials.forEach((testimonial, index) => {
        testimonial.style.animationDelay = `${index * 0.1}s`;
    });
    
    // --- Active Navigation Highlight ---
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.header__nav-link');
    
    function highlightNav() {
        const scrollY = window.scrollY + 200;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', highlightNav);
    
    // --- Menu Item Hover Sound Effect (Optional - can be removed) ---
    const menuItems = document.querySelectorAll('.menu__item');
    
    menuItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });
    });
    
    // --- WhatsApp Float Animation on Scroll ---
    const whatsappFloat = document.querySelector('.whatsapp-float');
    
    if (whatsappFloat) {
        let lastScrollY = 0;
        
        window.addEventListener('scroll', function() {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY > lastScrollY && currentScrollY > 300) {
                // Scrolling down
                whatsappFloat.style.transform = 'scale(0.9)';
            } else {
                // Scrolling up
                whatsappFloat.style.transform = 'scale(1)';
            }
            
            lastScrollY = currentScrollY;
        });
    }
    
    // --- Lazy Load Images (Native + Fallback) ---
    if ('loading' in HTMLImageElement.prototype) {
        // Browser supports native lazy loading
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        lazyImages.forEach(img => {
            if (img.dataset.src) {
                img.src = img.dataset.src;
            }
        });
    } else {
        // Fallback for browsers that don't support native lazy loading
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                    }
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    }
    
    // --- Page Load Animation ---
    document.body.classList.add('loaded');
    
    // --- Keyboard Navigation for Menu Tabs ---
    menuTabs.forEach((tab, index) => {
        tab.addEventListener('keydown', function(e) {
            let targetIndex;
            
            if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                e.preventDefault();
                targetIndex = (index + 1) % menuTabs.length;
            } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                e.preventDefault();
                targetIndex = (index - 1 + menuTabs.length) % menuTabs.length;
            } else if (e.key === 'Home') {
                e.preventDefault();
                targetIndex = 0;
            } else if (e.key === 'End') {
                e.preventDefault();
                targetIndex = menuTabs.length - 1;
            }
            
            if (targetIndex !== undefined) {
                menuTabs[targetIndex].focus();
                menuTabs[targetIndex].click();
            }
        });
    });
    
    // --- Console Easter Egg ---
    console.log('%c☕ Café del Medio', 'font-size: 24px; font-weight: bold; color: #000;');
    console.log('%cLo que se ve es lo que hay.', 'font-size: 14px; color: #666;');
    console.log('%cMontevideo 960, Recoleta Norte', 'font-size: 12px; color: #999;');
});

// --- Service Worker Registration (PWA Ready) ---
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Only register if sw.js exists
        navigator.serviceWorker.register('/sw.js').catch(() => {
            // Service worker not available, that's ok
        });
    });
}
