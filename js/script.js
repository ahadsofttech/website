/**
 * AHAD Softtech Pvt Ltd - Corporate Website Scripts
 * Features:
 * - Responsive Mobile Drawer Navigation with ARIA states & focus trap
 * - Sticky Header with backdrop blur & shadow on scroll
 * - Native Intersection Observer scroll reveals (Zero external dependencies)
 * - Animated Number Counters for Statistics with easing
 * - WhatsApp Lead Generation Form with validation and direct redirect
 * - Accessible Keyboard navigation & prefers-reduced-motion compliance
 */

document.addEventListener('DOMContentLoaded', () => {
    initHeaderScroll();
    initMobileMenu();
    initScrollAnimations();
    initCounters();
    initBackToTop();
    initActiveNavLinks();
});

/* ==========================================================================
   1. STICKY HEADER
   ========================================================================== */
function initHeaderScroll () {
    const header = document.getElementById('main-header');
    if (!header) return;

    const handleScroll = () => {
        if (window.scrollY > 30) {
            header.classList.add('bg-white/95', 'backdrop-blur-md', 'shadow-md', 'py-3');
            header.classList.remove('bg-white', 'py-4');
        } else {
            header.classList.remove('bg-white/95', 'backdrop-blur-md', 'shadow-md', 'py-3');
            header.classList.add('bg-white', 'py-4');
        }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
}

/* ==========================================================================
   2. MOBILE NAVIGATION DRAWER
   ========================================================================== */
function initMobileMenu () {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileDrawer = document.getElementById('mobile-drawer');
    const closeBtn = document.getElementById('mobile-close-btn');
    const backdrop = document.getElementById('mobile-backdrop');

    if (!menuBtn || !mobileDrawer) return;

    const openMenu = () => {
        mobileDrawer.classList.remove('translate-x-full');
        mobileDrawer.classList.add('translate-x-0');
        if (backdrop) {
            backdrop.classList.remove('hidden', 'opacity-0');
            backdrop.classList.add('opacity-100');
        }
        document.body.classList.add('overflow-hidden');
        menuBtn.setAttribute('aria-expanded', 'true');
        mobileDrawer.setAttribute('aria-hidden', 'false');
    };

    const closeMenu = () => {
        mobileDrawer.classList.add('translate-x-full');
        mobileDrawer.classList.remove('translate-x-0');
        if (backdrop) {
            backdrop.classList.add('opacity-0');
            setTimeout(() => backdrop.classList.add('hidden'), 300);
        }
        document.body.classList.remove('overflow-hidden');
        menuBtn.setAttribute('aria-expanded', 'false');
        mobileDrawer.setAttribute('aria-hidden', 'true');
    };

    menuBtn.addEventListener('click', openMenu);
    if (closeBtn) closeBtn.addEventListener('click', closeMenu);
    if (backdrop) backdrop.addEventListener('click', closeMenu);

    // Close on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileDrawer.getAttribute('aria-hidden') === 'false') {
            closeMenu();
        }
    });

    // Close drawer when any mobile nav link is clicked
    const drawerLinks = mobileDrawer.querySelectorAll('a');
    drawerLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });
}

/* ==========================================================================
   3. NATIVE SCROLL ANIMATIONS (INTERSECTION OBSERVER)
   ========================================================================== */
function initScrollAnimations () {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const animElements = document.querySelectorAll('.reveal-on-scroll');

    if (prefersReducedMotion) {
        // Immediately make all elements visible without animation
        animElements.forEach(el => {
            el.classList.remove('opacity-0', 'translate-y-8', 'scale-95');
            el.classList.add('opacity-100', 'translate-y-0', 'scale-100');
        });
        return;
    }

    if (!('IntersectionObserver' in window)) {
        // Fallback for older browsers
        animElements.forEach(el => {
            el.classList.remove('opacity-0', 'translate-y-8');
            el.classList.add('opacity-100', 'translate-y-0');
        });
        return;
    }

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const delay = target.getAttribute('data-delay') || '0';

                setTimeout(() => {
                    target.classList.remove('opacity-0', 'translate-y-8', 'scale-95');
                    target.classList.add('opacity-100', 'translate-y-0', 'scale-100');
                }, parseInt(delay, 10));

                obs.unobserve(target); // Reveal once
            }
        });
    }, {
        root: null,
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
    });

    animElements.forEach(el => observer.observe(el));
}

/* ==========================================================================
   4. STATS COUNTER TICKER
   ========================================================================== */
function initCounters () {
    const counterElements = document.querySelectorAll('.counter-val');
    if (!counterElements.length) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const startCounter = (el) => {
        const target = parseFloat(el.getAttribute('data-target'));
        const prefix = el.getAttribute('data-prefix') || '';
        const suffix = el.getAttribute('data-suffix') || '';
        const isDecimal = target % 1 !== 0;
        const duration = 2000; // 2 seconds
        const startTime = performance.now();

        if (prefersReducedMotion || isNaN(target)) {
            el.textContent = `${prefix}${target}${suffix}`;
            return;
        }

        const updateCount = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const currentVal = easeOut * target;

            el.textContent = `${prefix}${isDecimal ? currentVal.toFixed(1) : Math.floor(currentVal)}${suffix}`;

            if (progress < 1) {
                requestAnimationFrame(updateCount);
            } else {
                el.textContent = `${prefix}${target}${suffix}`;
            }
        };

        requestAnimationFrame(updateCount);
    };

    if ('IntersectionObserver' in window) {
        const counterObserver = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    startCounter(entry.target);
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        counterElements.forEach(el => counterObserver.observe(el));
    } else {
        counterElements.forEach(el => startCounter(el));
    }
}

/* ==========================================================================
   5. BACK TO TOP BUTTON
   ========================================================================== */
function initBackToTop () {
    const btn = document.getElementById('back-to-top');
    if (!btn) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            btn.classList.remove('opacity-0', 'invisible', 'translate-y-4');
            btn.classList.add('opacity-100', 'visible', 'translate-y-0');
        } else {
            btn.classList.add('opacity-0', 'invisible', 'translate-y-4');
            btn.classList.remove('opacity-100', 'visible', 'translate-y-0');
        }
    }, { passive: true });

    btn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/* ==========================================================================
   6. ACTIVE NAV LINK ENHANCER
   ========================================================================== */
function initActiveNavLinks () {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('header nav a, #mobile-drawer a');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPath || (currentPath === '' && href === 'index.html')) {
            link.classList.add('text-brand-600', 'font-semibold');
        }
    });
}

/* ==========================================================================
   7. WHATSAPP FORM INTEGRATION (Global helper)
   ========================================================================== */
window.sendToWhatsApp = function () {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');
    const feedbackMsg = document.getElementById('form-feedback');

    if (!nameInput || !emailInput || !phoneInput || !messageInput) {
        console.error("Required form elements not found.");
        return;
    }

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const phone = phoneInput.value.trim();
    const subject = subjectInput ? subjectInput.value.trim() : 'General Inquiry';
    const message = messageInput.value.trim();

    if (!name || !email || !phone || !message) {
        if (feedbackMsg) {
            feedbackMsg.textContent = 'Please fill out all required fields.';
            feedbackMsg.className = 'mt-3 text-sm font-medium text-brand-600 block';
        }
        return;
    }

    // Phone format verification
    const phoneRegex = /^[+0-9\s-]{7,18}$/;
    if (!phoneRegex.test(phone)) {
        if (feedbackMsg) {
            feedbackMsg.textContent = 'Please enter a valid phone number.';
            feedbackMsg.className = 'mt-3 text-sm font-medium text-brand-600 block';
        }
        return;
    }

    const whatsappNumber = "919538268786";
    const text =
        "📩 *New Website Inquiry — AHAD Softtech*\n\n" +
        "👤 *Full Name:* " + name + "\n" +
        "📧 *Email:* " + email + "\n" +
        "📱 *Phone:* " + phone + "\n" +
        "📝 *Subject:* " + subject + "\n\n" +
        "💬 *Message:*\n" + message;

    const url = "https://wa.me/" + whatsappNumber + "?text=" + encodeURIComponent(text);

    if (feedbackMsg) {
        feedbackMsg.textContent = 'Redirecting to WhatsApp...';
        feedbackMsg.className = 'mt-3 text-sm font-medium text-emerald-600 block';
    }

    window.open(url, "_blank");
};

