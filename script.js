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

// Intersection Observer for Fade-in Animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Optional: Stop observing once visible if you want it to happen only once
            // observer.unobserve(entry.target); 
        }
    });
}, observerOptions);

// Target all sections, service cards and contact items for animation
document.querySelectorAll('.section, .service-card, .contact-item, .gallery-item, .testimonial-card, .process-step').forEach((el, index) => {
    // Optional: Add staggering delay via inline style if needed, or simple observe
    // Check if it's a card to stagger? 
    // For simplicity, just observe them all. CSS transition handles the look.
    observer.observe(el);
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
                const budgetRange = getValue('budget_range');
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
Budget: ${budgetRange}

MESSAGE
${message}`;

                // Create link
                const subject = `Devis ${eventTypeDisplay} - ${name}`;
                // Utilisation de window.open pour contourner certains blocages
                const mailtoLink = `mailto:dj.lr.events@icloud.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;

                window.location.href = mailtoLink;

                // Reset button logic + Message d'aide
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.disabled = false;
                    alert("Si votre messagerie ne s'est pas ouverte automatiquement, c'est qu'aucun compte n'est configuré.\n\nMerci de nous écrire directement à : dj.lr.events@icloud.com");
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

// 1. Custom Cursor
const cursor = document.getElementById('custom-cursor');
const cursorDot = document.getElementById('custom-cursor-dot');

if (cursor && cursorDot && window.innerWidth > 1024) {
    document.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        cursor.style.left = `${posX}px`;
        cursor.style.top = `${posY}px`;

        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;
    });

    const interactiveElements = document.querySelectorAll('a, button, .btn, .gallery-item, .equipment-item');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('cursor-grow'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('cursor-grow'));
    });
}

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
