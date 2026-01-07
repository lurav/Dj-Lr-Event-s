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

    // Optional: Rotation on scroll for badges (subtle)
    const badge = document.querySelector('.new-year-badge');
    if (badge) {
        badge.style.transform = `rotate(${scrolled * 0.02}deg)`;
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
function openLightbox(element) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const img = element.querySelector('img');

    if (lightbox && lightboxImg && img) {
        // Trigger Flash Effect
        const flash = document.createElement('div');
        flash.className = 'flash-effect';
        document.body.appendChild(flash);
        setTimeout(() => flash.remove(), 600);

        lightboxImg.src = img.src;
        lightbox.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

/* --- NEW YEAR THEME EXTRAS --- */
document.addEventListener('DOMContentLoaded', () => {
    initNewYearCountdown();
});

function initNewYearCountdown() {
    const countdownContainer = document.getElementById('new-year-countdown');
    if (!countdownContainer) return;

    // Target Date: Jan 1, 2026 00:00:00
    // Note: Month is 0-indexed in JS Date (0 = Jan)
    const targetDate = new Date(2026, 0, 1, 0, 0, 0).getTime();

    function update() {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance < 0) {
            countdownContainer.innerHTML = '<div class="new-year-message" style="font-size: 2rem; color: var(--color-accent); font-weight: bold;">🎉 BONNE ANNÉE ! 🎉</div>';
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        countdownContainer.innerHTML = `
            <div class="countdown-segment">
                <span class="countdown-number">${days}</span>
                <span class="countdown-label">Jours</span>
            </div>
            <div class="countdown-segment">
                <span class="countdown-number">${hours}</span>
                <span class="countdown-label">Heures</span>
            </div>
            <div class="countdown-segment">
                <span class="countdown-number">${minutes}</span>
                <span class="countdown-label">Min</span>
            </div>
            <div class="countdown-segment">
                <span class="countdown-number">${seconds}</span>
                <span class="countdown-label">Sec</span>
            </div>
        `;
    }

    setInterval(update, 1000);
    update(); // Run immediately
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
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');

    // Remove old listener (by cloning node) or just add new logic
    // Simpler here: we'll hijack the existing submit logic by modifying the previous block or just adding this on top?
    // The previous block uses window.location.href which redirects. 
    // We will let the "mailto" happen, then show the modal.

    if (contactForm) {
        // We can't easily remove the anonymous function from before. 
        // But we can add a listener that runs *after*? 
        // Or better, let's just accept that the previous alert won't show if we replace the file content for that block.
        // Actually, the best way in this context is to UPDATE the previous block in the file.
        // But since I am appending here, I will rely on the previous tool call having updated the file?
        // Wait, I haven't updated the script.js "mailto" block yet. 
        // I should have done a replace on the mailto block.
    }
});
