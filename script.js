 // Debounce function for performance optimization
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

        // Navbar scroll effect with performance optimization
        const navbar = document.getElementById('navbar');
        const scrollIndicator = document.querySelector('.scroll-indicator');
        let ticking = false;

        function updateScrollElements() {
            const scrolled = window.pageYOffset;
            
            // Change navbar appearance on scroll
            if (scrolled > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }

            // Update scroll indicator
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolledPercentage = Math.min((winScroll / height) * 100, 100);
            scrollIndicator.style.width = scrolledPercentage + "%";
            scrollIndicator.setAttribute('aria-valuenow', Math.round(scrolledPercentage));

            ticking = false;
        }

        function requestTick() {
            if (!ticking) {
                requestAnimationFrame(updateScrollElements);
                ticking = true;
            }
        }

        window.addEventListener('scroll', requestTick, { passive: true });

        // Mobile menu toggle with accessibility
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('nav-menu');

        function toggleMobileMenu() {
            const isOpen = hamburger.classList.contains('active');
            
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Update ARIA attributes
            hamburger.setAttribute('aria-expanded', !isOpen);
            
            // Prevent body scroll when menu is open
            document.body.style.overflow = isOpen ? 'auto' : 'hidden';
            
            // Focus management
            if (!isOpen) {
                // Menu is opening - focus first menu item
                setTimeout(() => {
                    const firstMenuItem = navMenu.querySelector('.nav-link');
                    if (firstMenuItem) {
                        firstMenuItem.focus();
                    }
                }, 100);
            }
        }

        hamburger.addEventListener('click', toggleMobileMenu);

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                if (navMenu.classList.contains('active')) {
                    toggleMobileMenu();
                }
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (navMenu.classList.contains('active') && 
                !navMenu.contains(e.target) && 
                !hamburger.contains(e.target)) {
                toggleMobileMenu();
            }
        });

        // Escape key to close mobile menu
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                toggleMobileMenu();
                hamburger.focus();
            }
        });

        // Smooth scrolling for navigation links with error handling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const target = document.querySelector(targetId);
                
                if (target) {
                    const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                    
                    // Update URL without triggering scroll
                    history.pushState(null, null, targetId);
                    
                    // Focus target for accessibility
                    target.setAttribute('tabindex', '-1');
                    target.focus();
                    target.addEventListener('blur', () => {
                        target.removeAttribute('tabindex');
                    }, { once: true });
                }
            });
        });

        // Enhanced hover effects with random colors
        const navLinks = document.querySelectorAll('.nav-link');
        const colors = [
            'linear-gradient(45deg, #ff6b6b, #4ecdc4)',
            'linear-gradient(45deg, #667eea, #764ba2)',
            'linear-gradient(45deg, #f093fb, #f5576c)',
            'linear-gradient(45deg, #4facfe, #00f2fe)',
            'linear-gradient(45deg, #43e97b, #38f9d7)',
            'linear-gradient(45deg, #fa709a, #fee140)',
            'linear-gradient(45deg, #a8edea, #fed6e3)'
        ];
        
        navLinks.forEach(link => {
            link.addEventListener('mouseenter', () => {
                if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                    const randomColor = colors[Math.floor(Math.random() * colors.length)];
                    link.style.setProperty('--hover-gradient', randomColor);
                }
            });
        });

        // Intersection Observer for section animations with error handling
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe all sections with error handling
        const sections = document.querySelectorAll('.section');
        sections.forEach(section => {
            if (section) {
                section.style.opacity = '0';
                section.style.transform = 'translateY(30px)';
                section.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                sectionObserver.observe(section);
            }
        });

        // Initialize scroll indicator ARIA attributes
        scrollIndicator.setAttribute('aria-valuemin', '0');
        scrollIndicator.setAttribute('aria-valuemax', '100');
        scrollIndicator.setAttribute('aria-valuenow', '0');

        // Handle hash in URL on page load
        window.addEventListener('load', () => {
            if (window.location.hash) {
                const target = document.querySelector(window.location.hash);
                if (target) {
                    setTimeout(() => {
                        const offsetTop = target.offsetTop - 80;
                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });
                    }, 100);
                }
            }
        });

        // Improve performance by using passive event listeners where possible
        document.addEventListener('touchstart', () => {}, { passive: true });
        document.addEventListener('touchmove', () => {}, { passive: true });