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
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Get form values
        const name = document.getElementById('user_name').value;
        const email = document.getElementById('user_email').value;
        const phone = document.getElementById('user_phone').value || 'Non renseigné';
        const eventType = document.getElementById('event_type').value;
        const eventDate = document.getElementById('event_date').value;
        const guestCount = document.getElementById('guest_count').value || 'Non renseigné';
        const eventLocation = document.getElementById('event_location').value;
        const budgetRange = document.getElementById('budget_range').value || 'Non défini';
        const message = document.getElementById('message').value || 'Aucun détail supplémentaire';

        // Format event type for display
        const eventTypeLabels = {
            'mariage': '💍 Mariage',
            'anniversaire': '🎂 Anniversaire',
            'soiree-privee': '🥂 Soirée Privée',
            'entreprise': '💼 Événement d\'Entreprise',
            'autre': '🎉 Autre'
        };
        const eventTypeDisplay = eventTypeLabels[eventType] || eventType;

        // Create email body
        const emailBody = `Nouvelle demande de réservation depuis le site Dj Lr Event's

═══════════════════════════════════════
INFORMATIONS CLIENT
═══════════════════════════════════════
Nom: ${name}
Email: ${email}
Téléphone: ${phone}

═══════════════════════════════════════
DÉTAILS DE L'ÉVÉNEMENT
═══════════════════════════════════════
Type d'événement: ${eventTypeDisplay}
Date: ${eventDate}
Lieu: ${eventLocation}
Nombre d'invités: ${guestCount}
Budget estimé: ${budgetRange}

═══════════════════════════════════════
MESSAGE DU CLIENT
═══════════════════════════════════════
${message}

═══════════════════════════════════════
Cette demande nécessite une réponse sous 24h.`;

        // Create mailto link
        const mailtoLink = `mailto:dj.lr.events@icloud.com?subject=Demande de ${eventTypeDisplay} - ${name}&body=${encodeURIComponent(emailBody)}`;

        // Open email client
        window.location.href = mailtoLink;

        // Show success message
        alert('✅ Votre demande a été préparée ! Votre client email va s\'ouvrir. Merci de votre confiance !');

        // Reset form after a short delay
        setTimeout(() => {
            contactForm.reset();
        }, 500);
    });
}

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
