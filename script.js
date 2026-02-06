document.addEventListener('DOMContentLoaded', () => {
    // --- PERFORMANCE OPTIMIZED SCROLL HANDLING ---
    const header = document.getElementById('header');
    const backToTopButton = document.getElementById('back-to-top');
    const scrollProgressBar = document.getElementById('scroll-progress-bar');
    const heroContent = document.querySelector('.hero-content');

    let lastScrollY = window.scrollY;
    let ticking = false;

    function updateScrollUI() {
        // 1. Header Effect
        if (lastScrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // 2. Back to Top Button
        if (lastScrollY > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }

        // 3. Scroll Progress Bar
        const winHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        if (winHeight > 0 && scrollProgressBar) {
            const width = (lastScrollY / winHeight) * 100;
            scrollProgressBar.style.width = `${width}%`;
        }

        // 4. Lightweight Hero Parallax (Opacity Only - No Repaints)
        if (heroContent && lastScrollY < 600) {
            heroContent.style.opacity = 1 - (lastScrollY / 700);
            heroContent.style.transform = `translate3d(0, ${lastScrollY * 0.2}px, 0)`;
        }
    }

    window.addEventListener('scroll', () => {
        lastScrollY = window.scrollY;
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateScrollUI();
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });


    // Run once on load to ensure state is correct
    updateScrollUI();

    // --- MOBILE MENU ---
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileMenuBtn.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Close menu on link click
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }

    // --- SMOOTH SCROLL (Native + Polyfill fallback) ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- FAQ ACCORDION ---
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            const isActive = faqItem.classList.contains('active');

            // Close others (optional, maybe standard accordion behavior is preferred)
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });

            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
    });

    // --- INTERSECTION OBSERVER (REVEAL ON SCROLL) ---
    const revealObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                obs.unobserve(entry.target); // Stop observing once visible to save resources
            }
        });
    }, {
        rootMargin: '0px',
        threshold: 0.1
    });

    const revealElements = document.querySelectorAll(
        '.section, .service-card, .contact-item, .gallery-item, .equipment-item, .video-item, .timeline-item, .faq-item, .social-card, .badge-item, .about-image, .about-text, .footer-col, .contact-form, .text-center, .service-area-content'
    );
    revealElements.forEach(el => revealObserver.observe(el));


    // --- OPTIMIZED MAGNETIC BUTTONS ---
    const magneticButtons = document.querySelectorAll('.btn, .btn-outline, .social-btn');

    if (window.matchMedia("(hover: hover)").matches) { // Only on devices with hover capability
        magneticButtons.forEach(btn => {
            let interactRect;

            btn.addEventListener('mouseenter', () => {
                interactRect = btn.getBoundingClientRect();
            });

            btn.addEventListener('mousemove', (e) => {
                if (!interactRect) return;

                const x = e.clientX - interactRect.left - interactRect.width / 2;
                const y = e.clientY - interactRect.top - interactRect.height / 2;

                // Throttled visual update via CSS variable or direct transform could be done via RAF, 
                // but for simple buttons direct update is usually fine if light. 
                // Using transform directly.
                requestAnimationFrame(() => {
                    btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
                });
            });

            btn.addEventListener('mouseleave', () => {
                btn.style.transform = 'translate(0, 0)';
                interactRect = null;
            });
        });
    }

    // --- OPTIMIZED 3D TILT EFFECT ---
    const tiltCards = document.querySelectorAll('.service-card, .timeline-content');

    if (window.matchMedia("(hover: hover)").matches) {
        tiltCards.forEach(card => {
            let cardRect;

            card.addEventListener('mouseenter', () => {
                cardRect = card.getBoundingClientRect();
                card.style.transition = 'none'; // Instant movement
            });

            card.addEventListener('mousemove', (e) => {
                if (!cardRect) return;

                const centerX = cardRect.left + cardRect.width / 2;
                const centerY = cardRect.top + cardRect.height / 2;
                const mouseX = e.clientX - centerX;
                const mouseY = e.clientY - centerY;

                const rotateX = (mouseY / (cardRect.height / 2)) * -5; // Limit tilt to 5deg for performance
                const rotateY = (mouseX / (cardRect.width / 2)) * 5;

                requestAnimationFrame(() => {
                    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
                });
            });

            card.addEventListener('mouseleave', () => {
                card.style.transition = 'transform 0.5s ease-out';
                card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
                cardRect = null;
            });
        });
    }

    // --- LIGHTBOX LOGIC ---
    // (Consolidated and Cleaned)
    const lightbox = document.getElementById('lightbox');

    if (lightbox) {
        window.openLightbox = (element) => { // Make global for onclick handlers
            const img = element.querySelector('img');
            const videoSrc = element.getAttribute('data-video-src');
            const lightboxImg = document.getElementById('lightbox-img');
            const lightboxVideo = document.getElementById('lightbox-video');
            const loader = document.getElementById('lightbox-loader');

            if (videoSrc) {
                // Video Mode
                if (lightboxImg) lightboxImg.style.display = 'none';
                if (lightboxVideo) {
                    lightboxVideo.style.display = 'block';
                    lightboxVideo.src = videoSrc;
                    lightboxVideo.muted = false;

                    if (loader) loader.style.display = 'block';

                    lightboxVideo.oncanplay = () => {
                        if (loader) loader.style.display = 'none';
                        lightboxVideo.play().catch(e => console.warn(e));
                    };
                }
            } else if (img) {
                // Image Mode
                if (lightboxVideo) {
                    lightboxVideo.pause();
                    lightboxVideo.style.display = 'none';
                }
                if (lightboxImg) {
                    lightboxImg.style.display = 'block';
                    lightboxImg.src = img.src;
                }
                if (loader) loader.style.display = 'none';
            }

            lightbox.style.display = 'flex';
            document.body.style.overflow = 'hidden';

            // Flash Effect
            const flash = document.createElement('div');
            flash.className = 'flash-effect';
            document.body.appendChild(flash);
            setTimeout(() => flash.remove(), 600);
        };

        window.closeLightbox = () => {
            lightbox.style.display = 'none';
            document.body.style.overflow = 'auto';
            const lightboxVideo = document.getElementById('lightbox-video');
            if (lightboxVideo) {
                lightboxVideo.pause();
                lightboxVideo.src = "";
            }
        };

        // Close on escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') window.closeLightbox();
        });
    }

    // --- CONTACT FORM ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const btn = this.querySelector('button[type="submit"]');
            const originalText = btn.textContent;
            btn.textContent = '...';
            btn.disabled = true;

            // Gather Data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData.entries());

            // Mailto fallback
            const subject = `Demande de Devis - ${document.getElementById('user_name').value}`;
            const body = `Nom: ${document.getElementById('user_name').value}
Email: ${document.getElementById('user_email').value}
Tel: ${document.getElementById('user_phone').value}
Type: ${document.getElementById('event_type').value}
Date: ${document.getElementById('event_date').value}
Lieu: ${document.getElementById('event_location').value}
Message: ${document.getElementById('message').value}`;

            window.location.href = `mailto:dj.lr.events@icloud.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

            setTimeout(() => {
                btn.textContent = originalText;
                btn.disabled = false;
                // Optional: Show modal
                const modal = document.getElementById('contact-modal');
                if (modal) modal.style.display = 'flex';
            }, 1000);
        });
    }

    // Back to top click
    if (backToTopButton) {
        backToTopButton.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Remove Loader
    const loader = document.getElementById('prestige-loader');
    if (loader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                loader.classList.add('fade-out');
                document.body.style.overflow = 'auto';
            }, 1000);
        });
        // Fallback safety
        setTimeout(() => {
            loader.classList.add('fade-out');
            document.body.style.overflow = 'auto';
        }, 5000);
    }
});

// Helper for Modal closing
function closeContactModal() {
    const modal = document.getElementById('contact-modal');
    if (modal) modal.style.display = 'none';
}
