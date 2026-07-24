// Casa Carlota - Landing Page JavaScript
// Interactividad vanilla JS sin dependencias externas

document.addEventListener('DOMContentLoaded', function() {
    // Variables globales
    const header = document.getElementById('header');
    const menuToggle = document.getElementById('menuToggle');
    const mainNav = document.getElementById('mainNav');
    const menuTabs = document.querySelectorAll('.menu__tab');
    const menuCategories = document.querySelectorAll('.menu__category');
    const animateElements = document.querySelectorAll('[data-animate]');
    
    // 1. Header scroll effect
    function handleHeaderScroll() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', handleHeaderScroll);
    handleHeaderScroll(); // Initial check
    
    // 2. Mobile menu toggle
    function toggleMobileMenu() {
        mainNav.classList.toggle('active');
        menuToggle.classList.toggle('active');
        
        // Animar barras del hamburger
        const bars = menuToggle.querySelectorAll('.menu-toggle__bar');
        if (menuToggle.classList.contains('active')) {
            bars[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            bars[1].style.opacity = '0';
            bars[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        }
    }
    
    if (menuToggle) {
        menuToggle.addEventListener('click', toggleMobileMenu);
    }
    
    // Cerrar menú al hacer clic en un enlace
    const navLinks = mainNav.querySelectorAll('.nav__link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mainNav.classList.contains('active')) {
                toggleMobileMenu();
            }
        });
    });
    
    // 3. Menu tabs functionality
    function switchTab(targetTab) {
        // Actualizar tabs activos
        menuTabs.forEach(tab => {
            tab.classList.remove('menu__tab--active');
            if (tab.getAttribute('data-tab') === targetTab) {
                tab.classList.add('menu__tab--active');
            }
        });
        
        // Mostrar categoría correspondiente
        menuCategories.forEach(category => {
            category.classList.remove('menu__category--active');
            if (category.id === targetTab) {
                category.classList.add('menu__category--active');
            }
        });
    }
    
    menuTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            switchTab(targetTab);
        });
    });
    
    // 4. Scroll animations with Intersection Observer
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                // Opcional: dejar de observar una vez animado
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animateElements.forEach(element => {
        observer.observe(element);
    });
    
    // 5. Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 6. WhatsApp button pulse animation on scroll
    const whatsappFloat = document.querySelector('.whatsapp-float');
    if (whatsappFloat) {
        // Mostrar después de 3 segundos
        setTimeout(() => {
            whatsappFloat.style.opacity = '1';
            whatsappFloat.style.visibility = 'visible';
        }, 3000);
        
        // Pausar animación al pasar el mouse
        whatsappFloat.addEventListener('mouseenter', function() {
            this.style.animation = 'none';
        });
        
        whatsappFloat.addEventListener('mouseleave', function() {
            this.style.animation = 'pulse 2s infinite';
        });
    }
    
    // 7. Gallery hover effect enhancement
    const galleryItems = document.querySelectorAll('.galeria__item');
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.querySelector('img').style.transform = 'scale(1.05)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.querySelector('img').style.transform = 'scale(1)';
        });
    });
    
    // 8. Menu item hover effect
    const menuItems = document.querySelectorAll('.menu__item');
    menuItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // 9. Testimonial cards hover effect
    const testimonialCards = document.querySelectorAll('.testimonio');
    testimonialCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.12)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
        });
    });
    
    // 10. Parallax effect for hero section (subtle)
    function handleParallax() {
        const scrolled = window.pageYOffset;
        const heroImage = document.querySelector('.hero__image');
        
        if (heroImage && scrolled < window.innerHeight) {
            heroImage.style.transform = `scale(1.05) translateY(${scrolled * 0.3}px)`;
        }
    }
    
    window.addEventListener('scroll', handleParallax);
    
    // 11. Form handling (if exists)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obtener valores del formulario
            const formData = new FormData(this);
            const name = formData.get('name') || '';
            const phone = formData.get('phone') || '';
            const date = formData.get('date') || '';
            const time = formData.get('time') || '';
            const guests = formData.get('guests') || '';
            const message = formData.get('message') || '';
            
            // Crear mensaje para WhatsApp
            let whatsappMessage = `Hola! Soy ${name}. `;
            
            if (date && time) {
                whatsappMessage += `Me gustaría reservar para el ${date} a las ${time}. `;
            }
            
            if (guests) {
                whatsappMessage += `Somos ${guests} personas. `;
            }
            
            if (message) {
                whatsappMessage += `Mensaje adicional: ${message} `;
            }
            
            whatsappMessage += `Mi teléfono es ${phone}. ¡Gracias!`;
            
            // Enviar a WhatsApp
            const whatsappUrl = `https://wa.me/5491154056602?text=${encodeURIComponent(whatsappMessage)}`;
            window.open(whatsappUrl, '_blank');
        });
    }
    
    // 12. Dynamic year for copyright
    const copyrightYear = document.querySelector('.footer__copyright');
    if (copyrightYear) {
        const currentYear = new Date().getFullYear();
        copyrightYear.innerHTML = copyrightYear.innerHTML.replace('2026', currentYear);
    }
    
    // 13. Lazy loading for images (native support check)
    if ('loading' in HTMLImageElement.prototype) {
        // Browser supports lazy loading natively
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        lazyImages.forEach(img => {
            if (img.dataset.src) {
                img.src = img.dataset.src;
            }
        });
    } else {
        // Fallback for older browsers
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
        
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // 14. Add ripple effect to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Crear efecto ripple
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
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
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Agregar estilos para el ripple effect
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // 15. Preloader (opcional)
    window.addEventListener('load', function() {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }
    });
    
    // 16. Scroll to top button (if needed)
    const scrollToTopBtn = document.getElementById('scrollToTop');
    if (scrollToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollToTopBtn.style.opacity = '1';
                scrollToTopBtn.style.visibility = 'visible';
            } else {
                scrollToTopBtn.style.opacity = '0';
                scrollToTopBtn.style.visibility = 'hidden';
            }
        });
        
        scrollToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // 17. Dynamic menu highlighting based on scroll position
    function highlightNavOnScroll() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + header.offsetHeight + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remover highlight de todos los enlaces
                navLinks.forEach(link => {
                    link.classList.remove('active');
                });
                
                // Agregar highlight al enlace correspondiente
                const correspondingLink = document.querySelector(`.nav__link[href="#${sectionId}"]`);
                if (correspondingLink) {
                    correspondingLink.classList.add('active');
                }
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavOnScroll);
    
    // 18. Counter animation for stats (if exists)
    const counters = document.querySelectorAll('.counter');
    if (counters.length > 0) {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.getAttribute('data-target'));
                    const duration = 2000; // 2 seconds
                    const step = target / (duration / 16); // 60fps
                    let current = 0;
                    
                    const updateCounter = () => {
                        current += step;
                        if (current < target) {
                            counter.textContent = Math.floor(current);
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.textContent = target;
                        }
                    };
                    
                    updateCounter();
                    counterObserver.unobserve(counter);
                }
            });
        }, { threshold: 0.5 });
        
        counters.forEach(counter => {
            counterObserver.observe(counter);
        });
    }
    
    // 19. Image gallery lightbox (simple version)
    const galleryImages = document.querySelectorAll('.galeria__item img');
    if (galleryImages.length > 0) {
        galleryImages.forEach(image => {
            image.addEventListener('click', function() {
                const overlay = document.createElement('div');
                overlay.style.cssText = `
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.9);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 10000;
                    cursor: pointer;
                    padding: 2rem;
                `;
                
                const img = document.createElement('img');
                img.src = this.src;
                img.alt = this.alt;
                img.style.cssText = `
                    max-width: 90%;
                    max-height: 90%;
                    object-fit: contain;
                    border-radius: 8px;
                `;
                
                overlay.appendChild(img);
                document.body.appendChild(overlay);
                
                overlay.addEventListener('click', function() {
                    this.remove();
                });
            });
        });
    }
    
    // 20. Menu category indicator animation
    const categoryIndicator = document.querySelector('.menu__category-indicator');
    if (categoryIndicator) {
        function updateIndicator() {
            const activeTab = document.querySelector('.menu__tab--active');
            if (activeTab) {
                const tabRect = activeTab.getBoundingClientRect();
                const tabsRect = activeTab.parentElement.getBoundingClientRect();
                
                categoryIndicator.style.width = `${tabRect.width}px`;
                categoryIndicator.style.left = `${tabRect.left - tabsRect.left}px`;
            }
        }
        
        // Update on tab change
        menuTabs.forEach(tab => {
            tab.addEventListener('click', updateIndicator);
        });
        
        // Initial position
        updateIndicator();
        
        // Update on window resize
        window.addEventListener('resize', updateIndicator);
    }
    
    console.log('Casa Carlota landing page initialized successfully');
});