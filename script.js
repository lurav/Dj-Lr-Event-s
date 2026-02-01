document.addEventListener('DOMContentLoaded', () => {

    // Header Scroll Effect
    const header = document.getElementById('header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        // Change icon from bars to times
        const icon = mobileMenuBtn.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });

    // Smooth Scroll for Anchor Links (polishing standard behavior)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            const isActive = faqItem.classList.contains('active');

            // Close all other FAQ items
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });

            // Toggle current item
            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
    });
});

// Intersection Observer for Smooth Staggered Reveals
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15 // Slightly higher to ensure element is actually entering
};

const observer = new IntersectionObserver((entries) => {
    let delay = 0;
    entries.forEach((entry) => {
        if (entry.isIntersecting && !entry.target.classList.contains('visible')) {
            // Calculate delay based on whether we are processing a batch
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, delay);
            // Stagger delay for multiple items appearing at once (e.g., grids)
            delay += 150;

            // Allow re-animating if it scrolls way out? No, keep it premium (once loaded, it stays)
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Target sections and grid items
const revealElements = document.querySelectorAll(
    '.section, .service-card, .contact-item, .gallery-item, .equipment-item, .video-item, .timeline-item, .faq-item, .social-card, .badge-item, .about-image, .about-text, .footer-col, .contact-form, .text-center, .service-area-content, .why-item, .hero-content, .footer-bottom'
);

revealElements.forEach(el => observer.observe(el));


// --- PARALLAX EFFECTS ---
const heroSection = document.getElementById('hero');
const heroContent = document.querySelector('.hero-content');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;

    // Hero Parallax
    if (heroSection && scrolled < window.innerHeight) {
        // Background moves slower (0.5 speed)
        // We use background-position-y. Note: This affects gradient too, but usually looks fine.
        heroSection.style.backgroundPositionY = `${scrolled * 0.5}px`;

        // Content moves slightly faster/up (0.3 speed) & fades out
        if (heroContent) {
            heroContent.style.transform = `translateY(${scrolled * 0.2}px)`;
            heroContent.style.opacity = 1 - (scrolled / 700);
        }
    }


});

// Back to Top Button
const backToTopButton = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopButton.classList.add('visible');
    } else {
        backToTopButton.classList.remove('visible');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Contact Form with mailto
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Feedback immediat
            const btn = this.querySelector('button[type="submit"]');
            const originalText = btn.textContent;
            btn.textContent = 'Préparation de l\'email...';
            btn.disabled = true;

            try {
                // Helper to safely get value
                const getValue = (id) => {
                    const el = document.getElementById(id);
                    return el ? el.value : 'Non spécifié';
                };

                // Get form values
                const name = getValue('user_name');
                const email = getValue('user_email');
                const phone = getValue('user_phone');
                const eventType = getValue('event_type');
                const eventDate = getValue('event_date');
                const guestCount = getValue('guest_count');
                const eventLocation = getValue('event_location');

                const message = getValue('message');

                // Format event type
                const eventTypeLabels = {
                    'mariage': '💍 Mariage',
                    'anniversaire': '🎂 Anniversaire',
                    'soiree-privee': '🥂 Soirée Privée',
                    'entreprise': '💼 Événement d\'Entreprise',
                    'autre': '🎉 Autre'
                };
                const eventTypeDisplay = eventTypeLabels[eventType] || eventType;

                // Simple Email Body
                const emailBody = `NOUVELLE DEMANDE: ${eventTypeDisplay}
            
CLIENT
Nom: ${name}
Email: ${email}
Tel: ${phone}

EVENEMENT
Date: ${eventDate}
Lieu: ${eventLocation}
Invités: ${guestCount}


MESSAGE
${message}`;

                // Create link
                const subject = `Devis ${eventTypeDisplay} - ${name}`;
                // Utilisation de window.open pour contourner certains blocages
                const mailtoLink = `mailto:dj.lr.events@icloud.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;

                window.location.href = mailtoLink;

                // Show Custom Modal instead of Alert
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.disabled = false;
                    openContactModal(); // CALL THE NEW MODAL
                }, 1000);

            } catch (error) {
                console.error(error);
                btn.textContent = originalText;
                btn.disabled = false;
                alert("Erreur technique. Merci de nous contacter par téléphone.");
            }
        });
    }
});

// Animated Stats Counter
const statsSection = document.getElementById('stats');
let statsAnimated = false;

const animateCounter = (element) => {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps
    let current = 0;

    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };

    updateCounter();
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !statsAnimated) {
            statsAnimated = true;
            const statNumbers = document.querySelectorAll('.stat-number');
            statNumbers.forEach((stat, index) => {
                setTimeout(() => {
                    animateCounter(stat);
                }, index * 200); // Stagger animation
            });
        }
    });
}, { threshold: 0.5 });

if (statsSection) {
    statsObserver.observe(statsSection);
}

// JavaScript Prestige
window.addEventListener('load', () => {
    const loader = document.getElementById('prestige-loader');
    setTimeout(() => {
        if (loader) {
            loader.classList.add('fade-out');
            document.body.style.overflow = 'auto'; // Réactive le scroll après le chargement
        }
    }, 1500); // Garanti un temps d'affichage minimum pour le prestige
});

// --- AGENCY FINISHES ---

// 1. Lightbox Logic (Cursor Logic Removed)

// 2. Lightbox Logic
// 2. Lightbox Logic
function openLightbox(element) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxVideo = document.getElementById('lightbox-video');

    // Check if it's a video
    const videoSrc = element.getAttribute('data-video-src');
    const img = element.querySelector('img');

    if (lightbox && (lightboxImg || lightboxVideo)) {
        // Trigger Flash Effect
        const flash = document.createElement('div');
        flash.className = 'flash-effect';
        document.body.appendChild(flash);
        setTimeout(() => flash.remove(), 600);

        if (videoSrc) {
            // It's a video
            if (lightboxImg) lightboxImg.style.display = 'none';
            if (lightboxVideo) {
                // Completely reset video state
                lightboxVideo.pause();
                lightboxVideo.removeAttribute('src');
                lightboxVideo.load();

                lightboxVideo.style.display = 'block';
                lightboxVideo.src = videoSrc;
                lightboxVideo.muted = false;
                lightboxVideo.volume = 1.0;

                // Show loader
                const loader = document.getElementById('lightbox-loader');
                if (loader) loader.style.display = 'block';

                // Safety timeout for loader (10 seconds)
                const loaderTimeout = setTimeout(() => {
                    if (loader) loader.style.display = 'none';
                }, 10000);

                lightboxVideo.onplaying = () => {
                    clearTimeout(loaderTimeout);
                    if (loader) loader.style.display = 'none';
                };

                lightboxVideo.oncanplay = () => {
                    lightboxVideo.play().catch(e => console.log("Auto-play blocked", e));
                };

                lightboxVideo.onerror = () => {
                    clearTimeout(loaderTimeout);
                    if (loader) loader.style.display = 'none';
                    console.log("Error loading video");
                };

                lightboxVideo.load();
            }
        } else if (img) {
            // It's an image
            if (lightboxVideo) {
                lightboxVideo.style.display = 'none';
                lightboxVideo.pause();
                lightboxVideo.src = ""; // Clear source
            }
            if (lightboxImg) {
                lightboxImg.style.display = 'block';
                lightboxImg.src = img.src;
            }
        }

        lightbox.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxVideo = document.getElementById('lightbox-video');

    if (lightbox) {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';

        // Stop and COMPLETELY reset video to avoid bugs or audio playing in background
        if (lightboxVideo) {
            lightboxVideo.pause();
            lightboxVideo.removeAttribute('src'); // Stop downloading
            lightboxVideo.load();
            lightboxVideo.oncanplay = null;
            lightboxVideo.onplaying = null;
            lightboxVideo.onerror = null;
        }
    }
}



/* --- 3D TILT EFFECT LOGIC --- */
document.addEventListener('DOMContentLoaded', () => {
    // Add tilt class to cards
    document.querySelectorAll('.service-card, .timeline-content').forEach(card => {
        card.classList.add('tilt-card');

        card.addEventListener('mousemove', handleTilt);
        card.addEventListener('mouseleave', resetTilt);
    });
});

function handleTilt(e) {
    const card = this;
    const cardRect = card.getBoundingClientRect();

    // Calculate mouse position relative to center of card
    const cardCenterX = cardRect.left + cardRect.width / 2;
    const cardCenterY = cardRect.top + cardRect.height / 2;

    const mouseX = e.clientX - cardCenterX;
    const mouseY = e.clientY - cardCenterY;

    // Rotate scaling factor (adjust for sensitivity)
    const rotateX = (mouseY / cardRect.height / 2) * -15; // Max 15 deg tilt
    const rotateY = (mouseX / cardRect.width / 2) * 15;

    card.style.transition = 'none'; // Remove transition for instant follow
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;

    // Add shine effect if not present
    let shine = card.querySelector('.shine-effect');
    if (!shine) {
        shine = document.createElement('div');
        shine.className = 'shine-effect';
        shine.style.position = 'absolute';
        shine.style.top = '0';
        shine.style.left = '0';
        shine.style.width = '100%';
        shine.style.height = '100%';
        shine.style.background = 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 50%)';
        shine.style.pointerEvents = 'none';
        shine.style.zIndex = '10';
        card.appendChild(shine);
    }

    // Move shine
    // ... basic static shine for now, can be dynamic
}

function resetTilt() {
    this.style.transition = 'transform 0.5s ease-out';
    this.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
}

/* --- SCROLL PROGRESS BAR --- */
window.addEventListener('scroll', () => {
    const scrollProgress = document.getElementById('scroll-progress-bar');
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollTop = document.documentElement.scrollTop;

    if (scrollProgress && height > 0) {
        const width = (scrollTop / height) * 100;
        scrollProgress.style.width = `${width}%`;
    }
});

/* --- CUSTOM MODAL HANDLING --- */
function openContactModal() {
    const modal = document.getElementById('contact-modal');
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function closeContactModal() {
    const modal = document.getElementById('contact-modal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Close modal when clicking outside
document.getElementById('contact-modal')?.addEventListener('click', (e) => {
    if (e.target.id === 'contact-modal') {
        closeContactModal();
    }
});

/* --- OVERRIDE CONTACT FORM SUBMIT --- */
// We need to re-attach the event listener to use the modal instead of alert
// This runs after the DOM is fully loaded + previous script execution

/* --- MAGNETIC BUTTON EFFECT --- */
document.addEventListener('DOMContentLoaded', () => {
    const magneticButtons = document.querySelectorAll('.btn, .btn-outline, .social-btn');

    magneticButtons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            // Sensitivity factor (lower is less movement)
            const sensitivity = 0.3;

            btn.style.transform = `translate(${x * sensitivity}px, ${y * sensitivity}px)`;

            // Should also move inner text/icon slightly more for parallax?
            // Optional: let's keep it simple first
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0px, 0px)';
        });
    });
});
