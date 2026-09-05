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
    initCareersPage();
    initCareerDetailsPage();
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
    const navLinks = document.querySelectorAll('header nav a, #mobile-drawer a, #mobile-bottom-bar a');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        const isMatch = (href === currentPath) ||
            (currentPath === '' && href === 'index.html') ||
            (currentPath === 'career-details.html' && href === 'careers.html');

        if (isMatch) {
            link.classList.add('text-brand-600', 'font-semibold');
            link.classList.remove('text-slate-500');
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

/* ==========================================================================
   8. STRAPI CMS INTEGRATION: CAREERS & CAREER DETAILS
   ========================================================================== */

/**
 * 8.1 Current Openings Dynamic Loader on careers.html
 */
async function initCareersPage () {
    const grid = document.getElementById('current-openings-grid');
    if (!grid) return;

    if (typeof window.fetchJobsFromStrapi !== 'function') return;

    try {
        const jobs = await window.fetchJobsFromStrapi();
        if (jobs && jobs.length > 0) {
            grid.innerHTML = jobs.map((job, idx) => `
                <div class="bg-slate-50 rounded-3xl p-8 border border-slate-200/80 shadow-sm hover:border-brand-300 hover:shadow-xl transition-all duration-300 flex flex-col justify-between reveal-on-scroll"
                    data-delay="${idx * 100}">
                    <div>
                        <div class="flex items-center justify-between mb-4">
                            <span class="px-3 py-1 rounded-full text-xs font-semibold bg-brand-100 text-brand-700">${escapeHtml(job.jobType || 'Full-Time')}</span>
                            <span class="text-xs text-slate-500">
                                <i class="fas fa-map-marker-alt text-brand-600 mr-1" aria-hidden="true"></i> ${escapeHtml(job.location || 'Mysore')}
                            </span>
                        </div>
                        <h3 class="font-heading text-2xl font-bold text-navy-900 mb-3">
                            ${escapeHtml(job.title)}
                        </h3>
                        <p class="text-slate-600 text-sm font-medium mb-2">
                            ${escapeHtml(job.department || '')}
                        </p>
                        <p class="text-slate-500 text-xs leading-relaxed mb-6">
                            ${escapeHtml(job.shortDescription || '')}
                        </p>
                    </div>
                    <div class="pt-6 border-t border-slate-200/80">
                        <a href="career-details.html?id=${encodeURIComponent(job.id)}&job=${encodeURIComponent(job.slug)}"
                            class="w-full inline-flex items-center justify-center px-5 py-3 rounded-xl font-heading text-sm font-semibold text-white bg-brand-600 hover:bg-brand-700 shadow-md shadow-brand-600/20 transition">
                            <span>Apply</span>
                            <i class="fas fa-arrow-right ml-2 text-xs" aria-hidden="true"></i>
                        </a>
                    </div>
                </div>
            `).join('');

            // Re-trigger scroll animations on newly added elements
            if (typeof initScrollAnimations === 'function') {
                initScrollAnimations();
            }
        }
    } catch (err) {
        console.warn('[Strapi CMS] Error rendering jobs on careers page:', err);
    }
}

/**
 * 8.2 Job Details Dynamic Loader & Switcher on career-details.html
 */
let currentLoadedJobs = [];

async function initCareerDetailsPage () {
    const dynamicPanel = document.getElementById('dynamic-job-panel');
    if (!dynamicPanel) return;

    if (typeof window.fetchJobsFromStrapi !== 'function') return;

    try {
        currentLoadedJobs = await window.fetchJobsFromStrapi();
        if (!currentLoadedJobs || currentLoadedJobs.length === 0) {
            currentLoadedJobs = window.STRAPI_FALLBACK_JOBS;
        }

        // Determine which job to display from query params
        const params = new URLSearchParams(window.location.search);
        const queryId = params.get('id') || params.get('job');

        let activeJob = currentLoadedJobs[0];
        if (queryId) {
            const found = currentLoadedJobs.find(j => 
                String(j.id) === String(queryId) || 
                j.slug.toLowerCase() === String(queryId).toLowerCase()
            );
            if (found) activeJob = found;
        }

        // Render Tabs
        renderJobTabs(currentLoadedJobs, activeJob.id);

        // Render Active Job Details
        renderActiveJobDetails(activeJob);

        // Render Other Openings
        renderOtherOpenings(currentLoadedJobs, activeJob.id);

    } catch (err) {
        console.error('[Strapi CMS] Error initializing career details page:', err);
    }
}

function renderJobTabs (jobs, activeId) {
    const tabsBar = document.getElementById('role-tabs-bar');
    if (!tabsBar) return;

    tabsBar.innerHTML = jobs.map(job => {
        const isActive = String(job.id) === String(activeId);
        const iconClass = getRoleIcon(job.slug || job.title);

        return `
            <button type="button" role="tab" data-job-id="${escapeHtml(String(job.id))}"
                aria-selected="${isActive ? 'true' : 'false'}"
                class="role-tab flex items-center gap-2.5 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-heading ${isActive ? 'font-semibold bg-brand-600 text-white shadow-sm' : 'font-medium text-slate-600 hover:text-brand-600 hover:bg-slate-100'} transition whitespace-nowrap">
                <i class="${iconClass} text-sm" aria-hidden="true"></i>
                <span>${escapeHtml(job.title)}</span>
            </button>
        `;
    }).join('');

    // Attach click listeners to tabs
    tabsBar.querySelectorAll('.role-tab').forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-job-id');
            const targetJob = currentLoadedJobs.find(j => String(j.id) === String(targetId));
            if (targetJob) {
                renderJobTabs(currentLoadedJobs, targetJob.id);
                renderActiveJobDetails(targetJob);
                renderOtherOpenings(currentLoadedJobs, targetJob.id);
            }
        });
    });
}

function renderActiveJobDetails (job) {
    // 1. Hero & Badges
    const titleEl = document.getElementById('hero-job-title');
    const taglineEl = document.getElementById('hero-job-tagline');
    const deptEl = document.getElementById('hero-badge-department');
    const locEl = document.getElementById('hero-meta-location');
    const expEl = document.getElementById('hero-meta-experience');
    const shiftsEl = document.getElementById('hero-meta-shifts');
    const breadcrumbRole = document.getElementById('breadcrumb-current-role');
    const applicantRoleInput = document.getElementById('applicant-role');

    if (titleEl) titleEl.textContent = job.title;
    if (taglineEl) taglineEl.textContent = job.tagline || `${job.department || ''} • Full-Time Permanent Role based in Mysore, Karnataka.`;
    if (deptEl) deptEl.textContent = job.department || 'Operations';
    if (locEl) locEl.textContent = job.location || 'Mysore (On-Site)';
    if (expEl) expEl.textContent = job.experience || '0 - 2 Years';
    if (shiftsEl) shiftsEl.textContent = job.shifts || 'Rotational Shifts';
    if (breadcrumbRole) breadcrumbRole.textContent = job.title;
    if (applicantRoleInput) applicantRoleInput.value = job.title;

    // 2. Role Overview
    const overviewContainer = document.getElementById('role-overview-content');
    if (overviewContainer) {
        const paragraphs = (job.overview || '').split(/\r?\n\r?\n/).filter(Boolean);
        if (paragraphs.length > 0) {
            overviewContainer.innerHTML = paragraphs.map(p => `<p class="leading-relaxed">${escapeHtml(p)}</p>`).join('');
        } else {
            overviewContainer.innerHTML = `<p class="leading-relaxed">${escapeHtml(job.shortDescription || 'Exciting career opportunity at AHAD Softtech Pvt Ltd.')}</p>`;
        }
    }

    // 3. Responsibilities (JD)
    const respList = document.getElementById('job-responsibilities-list');
    if (respList) {
        respList.innerHTML = (job.responsibilities || []).map(r => `
            <li class="flex items-start gap-3">
                <i class="fas fa-check-circle text-brand-600 mt-1 text-sm flex-shrink-0" aria-hidden="true"></i>
                <span>${escapeHtml(r)}</span>
            </li>
        `).join('');
    }

    // 4. Skills & Competencies
    const skillsContainer = document.getElementById('job-skills-container');
    if (skillsContainer) {
        skillsContainer.innerHTML = (job.skills || []).map(s => `
            <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200/70">
                <h3 class="font-heading text-sm font-bold text-navy-900 mb-1.5 flex items-center gap-2">
                    <i class="${s.icon || 'fas fa-check-circle'} text-brand-600" aria-hidden="true"></i>
                    <span>${escapeHtml(s.title || s.name || 'Skill')}</span>
                </h3>
                <p class="text-xs text-slate-600">${escapeHtml(s.desc || s.description || '')}</p>
            </div>
        `).join('');
    }

    // 5. Qualifications & Eligibility
    const qualContainer = document.getElementById('job-qualifications-container');
    if (qualContainer) {
        const q = job.qualifications || {};
        qualContainer.innerHTML = `
            <div class="flex items-start gap-3">
                <span class="px-2.5 py-1 rounded-md text-xs font-semibold bg-brand-100 text-brand-700 mt-0.5">Education</span>
                <span>${escapeHtml(q.education || 'Any Graduate / Diploma / 10+2 with good communication.')}</span>
            </div>
            <div class="flex items-start gap-3">
                <span class="px-2.5 py-1 rounded-md text-xs font-semibold bg-brand-100 text-brand-700 mt-0.5">Experience</span>
                <span><strong>${escapeHtml(q.experience || job.experience || '0 - 2 Years')}</strong></span>
            </div>
            <div class="flex items-start gap-3">
                <span class="px-2.5 py-1 rounded-md text-xs font-semibold bg-brand-100 text-brand-700 mt-0.5">Shifts</span>
                <span>${escapeHtml(q.shifts || job.shifts || 'Rotational day and night shifts.')}</span>
            </div>
        `;
    }

    // 6. Update URL query param smoothly without reloading
    if (window.history && window.history.replaceState) {
        const newUrl = `${window.location.pathname}?id=${encodeURIComponent(job.id)}&job=${encodeURIComponent(job.slug)}`;
        window.history.replaceState({ id: job.id, slug: job.slug }, '', newUrl);
    }
}

function renderOtherOpenings (jobs, currentJobId) {
    const container = document.getElementById('other-openings-cards');
    if (!container) return;

    // Filter to other openings if more than 1, otherwise show all
    const others = jobs.filter(j => String(j.id) !== String(currentJobId));
    const displayList = others.length > 0 ? others : jobs;

    container.innerHTML = displayList.map(j => `
        <div class="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-brand-300 transition flex flex-col justify-between">
            <div>
                <span class="text-[11px] font-semibold text-brand-600 uppercase tracking-wider block mb-1">
                    ${escapeHtml(j.department || 'Operations')}
                </span>
                <h3 class="font-heading text-base font-bold text-navy-900 mb-2">
                    ${escapeHtml(j.title)}
                </h3>
                <p class="text-xs text-slate-500 mb-4">
                    ${escapeHtml(j.shortDescription || '')}
                </p>
            </div>
            <button type="button" onclick="selectJobFromOther('${escapeHtml(String(j.id))}')"
                class="inline-flex items-center text-xs font-semibold text-brand-600 hover:text-brand-700">
                <span>View JD & Apply</span>
                <i class="fas fa-arrow-right ml-1.5 text-[10px]" aria-hidden="true"></i>
            </button>
        </div>
    `).join('');
}

window.selectJobFromOther = function (jobId) {
    const target = currentLoadedJobs.find(j => String(j.id) === String(jobId));
    if (target) {
        renderJobTabs(currentLoadedJobs, target.id);
        renderActiveJobDetails(target);
        renderOtherOpenings(currentLoadedJobs, target.id);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
};

window.switchJobRole = function (roleId) {
    const target = currentLoadedJobs.find(j => j.slug === roleId || String(j.id) === String(roleId));
    if (target) {
        renderJobTabs(currentLoadedJobs, target.id);
        renderActiveJobDetails(target);
        renderOtherOpenings(currentLoadedJobs, target.id);
    }
};

function getRoleIcon (slug) {
    const s = String(slug).toLowerCase();
    if (s.includes('tech') || s.includes('software') || s.includes('developer') || s.includes('it')) {
        return 'fas fa-laptop-code';
    }
    if (s.includes('bpo') || s.includes('operation') || s.includes('process') || s.includes('data')) {
        return 'fas fa-tasks';
    }
    return 'fas fa-headset';
}

function escapeHtml (str) {
    if (!str) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

// Quick Job Application via Email
window.submitJobApplication = function () {
    const role = document.getElementById('applicant-role')?.value || 'General Application';
    const name = document.getElementById('applicant-name')?.value.trim() || '';
    const email = document.getElementById('applicant-email')?.value.trim() || '';
    const phone = document.getElementById('applicant-phone')?.value.trim() || '';
    const exp = document.getElementById('applicant-exp')?.value || 'Fresher';
    const edu = document.getElementById('applicant-edu')?.value || 'Graduate';
    const message = document.getElementById('applicant-message')?.value.trim() || 'N/A';

    if (!name || !email || !phone) {
        alert('Please fill out your Full Name, Email, and Phone Number.');
        return;
    }

    const recipient = 'careers.ahadsofttech@gmail.com';
    const cc = 'info@ahadsfottech.com';
    const subject = `Job Application: ${role} - ${name}`;
    const body = `Dear AHAD Softtech Recruitment Team,

I wish to apply for the position of ${role}.

My Candidate Profile:
- Full Name: ${name}
- Email: ${email}
- Phone / WhatsApp: ${phone}
- Experience Level: ${exp}
- Highest Education: ${edu}

Resume / Additional Notes:
${message}

Looking forward to hearing from you.

Best regards,
${name}`;

    const mailtoUrl = `mailto:${recipient}?cc=${encodeURIComponent(cc)}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;
};

// Quick Job Application via WhatsApp
window.submitJobViaWhatsApp = function () {
    const role = document.getElementById('applicant-role')?.value || 'General Application';
    const name = document.getElementById('applicant-name')?.value.trim() || '';
    const email = document.getElementById('applicant-email')?.value.trim() || '';
    const phone = document.getElementById('applicant-phone')?.value.trim() || '';
    const exp = document.getElementById('applicant-exp')?.value || 'Fresher';
    const edu = document.getElementById('applicant-edu')?.value || 'Graduate';
    const message = document.getElementById('applicant-message')?.value.trim() || 'N/A';

    if (!name || !phone) {
        alert('Please enter your Full Name and Phone Number before contacting on WhatsApp.');
        document.getElementById('applicant-name')?.focus();
        return;
    }

    const whatsappNumber = "919538268786";
    const text =
        "💼 *Job Application — AHAD Softtech*\n\n" +
        "🎯 *Position:* " + role + "\n" +
        "👤 *Candidate Name:* " + name + "\n" +
        "📧 *Email:* " + (email || "Provided upon request") + "\n" +
        "📱 *Phone:* " + phone + "\n" +
        "🎓 *Education:* " + edu + "\n" +
        "⏳ *Experience:* " + exp + "\n" +
        "📝 *Resume/Notes:* " + message;

    const url = "https://wa.me/" + whatsappNumber + "?text=" + encodeURIComponent(text);
    window.open(url, "_blank");
};



