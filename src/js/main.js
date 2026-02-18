import '../css/style.css'

console.log('Main JS loaded')

// Mobile Menu Logic
const menuBtn = document.getElementById('menu-btn');
const closeMenuBtn = document.getElementById('close-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');

function toggleMenu() {
    const isHidden = mobileMenu.classList.contains('translate-y-full');

    if (isHidden) {
        mobileMenu.classList.remove('translate-y-full'); // Open
        document.body.classList.add('overflow-hidden'); // Prevent scrolling
    } else {
        mobileMenu.classList.add('translate-y-full'); // Close
        document.body.classList.remove('overflow-hidden');
    }
}

menuBtn.addEventListener('click', toggleMenu);
closeMenuBtn.addEventListener('click', toggleMenu);

// Close menu when clicking a link
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('translate-y-full');
        document.body.classList.remove('overflow-hidden');
    });
});

// Optional: Navbar scroll effect (shrinking or styling changes)
// For now, the CSS handling (sticky/fixed with backdrop-blur) is sufficient,
// but we can add more dynamic effects here if needed.

// Client Logo Interaction (Click to toggle color)
const clientLogos = document.querySelectorAll('.client-logo');

clientLogos.forEach(logo => {
    logo.addEventListener('click', () => {
        // Toggle between grayscale and colored
        logo.classList.toggle('grayscale');
        logo.classList.toggle('grayscale-0');

        // Toggle opacity
        logo.classList.toggle('opacity-60');
        logo.classList.toggle('opacity-100');
    });
});

// Counter Animation
const counters = document.querySelectorAll('.counter-animate');

if (counters.length > 0) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = +counter.getAttribute('data-target');
                const duration = 2000; // 2 seconds

                let startTimestamp = null;

                const step = (timestamp) => {
                    if (!startTimestamp) startTimestamp = timestamp;
                    const progress = Math.min((timestamp - startTimestamp) / duration, 1);

                    // Ease-out calculation for smoother effect
                    const easeOut = 1 - Math.pow(1 - progress, 3);

                    const currentCount = Math.floor(easeOut * target);

                    // Format number with dots (e.g. 10.211)
                    counter.innerText = currentCount.toLocaleString('id-ID') + '+';

                    if (progress < 1) {
                        window.requestAnimationFrame(step);
                    } else {
                        counter.innerText = target.toLocaleString('id-ID') + '+';

                        // Slow increment effect (Live feel) - Only if enabled
                        if (counter.getAttribute('data-live') === 'true') {
                            let currentValue = target;
                            setInterval(() => {
                                currentValue++;
                                counter.innerText = currentValue.toLocaleString('id-ID') + '+';
                            }, 2500); // Add +1 every 2.5 seconds
                        }
                    }
                };

                window.requestAnimationFrame(step);
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

// FAQ Accordion Logic
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    item.addEventListener('click', () => {
        // Toggle current item
        const content = item.querySelector('.faq-content');
        const icon = item.querySelector('.faq-icon');
        const isOpen = content.style.maxHeight;

        // Close all other items (Accordion style)
        faqItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.querySelector('.faq-content').style.maxHeight = null;
                otherItem.querySelector('.faq-content').classList.remove('opacity-100');
                otherItem.querySelector('.faq-icon').classList.remove('rotate-180');
            }
        });

        // Toggle state
        if (isOpen) {
            content.style.maxHeight = null;
            content.classList.remove('opacity-100');
            icon.classList.remove('rotate-180');
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
            content.classList.add('opacity-100');
            icon.classList.add('rotate-180');
        }
    });
});

// Smart Navbar (Hide on Scroll, Show on Stop)
let isScrolling;
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    // Only apply if scrolled down a bit to avoid hiding at the very top
    if (window.scrollY > 50) {
        // Hide navbar immediately on scroll
        navbar.classList.add('-translate-y-full');

        // Clear existing timeout
        window.clearTimeout(isScrolling);

        // Set a timeout to run after scrolling ends
        isScrolling = setTimeout(() => {
            // Show navbar when scrolling stops
            navbar.classList.remove('-translate-y-full');
        }, 500); // 250ms delay to detect "stop"
    } else {
        // Always show at top
        navbar.classList.remove('-translate-y-full');
    }
}, { passive: true });
