/**
 * AHAD Softtech Pvt Ltd - Strapi CMS Integration & Configuration
 * 
 * Provides centralized configuration, robust v4/v5 normalization,
 * resilient fetch with timeout, and complete offline fallbacks.
 */

window.STRAPI_CONFIG = {
    // Change this to your production or staging Strapi URL (e.g. 'https://cms.ahadsofttech.com')
    apiUrl: 'http://localhost:1337',
    
    // Collection endpoints to attempt in order
    endpoints: ['/api/jobs', '/api/careers'],
    
    // Request timeout in milliseconds (avoids hanging if local Strapi is stopped)
    timeoutMs: 3500
};

// Built-in Comprehensive Fallback Data (ensures zero broken UI when Strapi is offline)
window.STRAPI_FALLBACK_JOBS = [
    {
        id: 1,
        slug: 'customer-support',
        title: 'Customer Support Executive',
        tagline: 'Voice & Non-Voice Process • Full-Time Permanent Role based in Mysore, Karnataka.',
        department: 'Customer Experience & Support',
        jobType: 'Full-Time',
        location: 'Mysore (On-Site)',
        experience: '0 - 2 Years (Freshers Welcome)',
        shifts: 'Rotational Shifts',
        immediateJoining: true,
        shortDescription: 'Deliver superior customer service via voice, chat, and email channels with empathy and speed for global clients.',
        overview: 'As a Customer Support Executive at AHAD Softtech, you will be the front-line ambassador for our global enterprise clients. You will interact with customers across multichannel touchpoints — voice calls, digital chat, and email — resolving queries with exceptional empathy, precision, and efficiency.\n\nWe welcome enthusiastic freshers with strong communication abilities, as well as experienced customer service professionals looking to accelerate their careers within a thriving, technology-driven BPO organization in Mysore.',
        responsibilities: [
            'Manage inbound and outbound customer inquiries via voice calls, web chat, and email support ticketing systems.',
            'Deliver high First-Contact Resolution (FCR) by actively listening, diagnosing customer pain points, and presenting clear solutions.',
            'Accurately document customer discussions, issue root causes, and resolution notes within client CRM platforms.',
            'Escalate unresolved or complex disputes to tier-2 team leads in accordance with standard operating procedures (SOPs).',
            'Consistently achieve performance metrics including Average Handle Time (AHT), Customer Satisfaction (CSAT), and Quality Assurance (QA) standards.',
            'Maintain customer privacy and strictly adhere to client confidentiality, compliance, and data security mandates.'
        ],
        skills: [
            {
                title: 'Excellent Communication',
                desc: 'Fluent in verbal & written English with neutral accent; Kannada/Hindi proficiency is an added benefit.',
                icon: 'fas fa-comments'
            },
            {
                title: 'Typing Speed & Accuracy',
                desc: 'Keyboard typing speed of 28–35+ WPM with minimum 90% accuracy for fast real-time chat & logging.',
                icon: 'fas fa-keyboard'
            },
            {
                title: 'Empathy & Active Listening',
                desc: 'High emotional quotient, patience, and de-escalation tact when engaging with frustrated callers.',
                icon: 'fas fa-heart'
            },
            {
                title: 'CRM & Multi-tasking',
                desc: 'Ability to navigate CRM dashboards (Zoho/Zendesk/Salesforce) while interacting on calls or chat.',
                icon: 'fas fa-desktop'
            }
        ],
        qualifications: {
            education: 'Any Graduate (B.Com, BBA, BA, B.Sc, BCA, B.Tech) or 10+2 / 3-year Diploma with sound spoken communication skills.',
            experience: '0 to 2 Years. Freshers with good English verbal skills are strongly encouraged to apply. Prior voice BPO experience is a plus.',
            shifts: 'Rotational day and night shifts (with shift allowances and safety transport where applicable).'
        }
    },
    {
        id: 2,
        slug: 'technical-support',
        title: 'Technical Support Executive',
        tagline: 'Customer Technical Assistance & IT Helpdesk • Full-Time Permanent Role in Mysore.',
        department: 'Technical Services & IT Support',
        jobType: 'Full-Time',
        location: 'Mysore (On-Site)',
        experience: '0 - 3 Years (Tech Graduates Welcome)',
        shifts: 'Rotational / 24x7 Shifts',
        immediateJoining: true,
        shortDescription: 'Provide troubleshooting, hardware/software assistance, networking diagnostics, and helpdesk ticket resolution.',
        overview: 'As a Technical Support Executive at AHAD Softtech, you will be responsible for providing tier-1 and tier-2 customer technical assistance, troubleshooting hardware/software incidents, diagnosing network connectivity faults, and ensuring rapid helpdesk resolution for global clients.\n\nThis role offers rich exposure to enterprise IT tools, remote desktop diagnostics, ticketing workflows, and career progression toward systems administration, cloud operations, and specialized technical escalation engineering.',
        responsibilities: [
            'Receive, triage, and record technical support requests logged via ticketing software, inbound lines, and remote portals.',
            'Perform methodical troubleshooting for Windows/macOS operating systems, Microsoft 365, email clients, and desktop applications.',
            'Conduct secure remote desktop access sessions (TeamViewer, AnyDesk, RDP) to diagnose software installation conflicts and configurations.',
            'Assist users with user account setups, password resets, Active Directory authentication, and VPN connection errors.',
            'Track ticket lifecycles against contractual Service Level Agreements (SLAs), maintaining detailed resolution histories.',
            'Author and refine internal Knowledge Base articles for recurring incidents to accelerate future issue resolutions.'
        ],
        skills: [
            {
                title: 'Networking Fundamentals',
                desc: 'Foundational understanding of TCP/IP, DNS, DHCP, routers, switches, LAN/WAN, and VPN protocols.',
                icon: 'fas fa-network-wired'
            },
            {
                title: 'OS & Helpdesk Systems',
                desc: 'Hands-on knowledge of Windows 10/11, macOS, and familiarity with Jira Service Desk, ServiceNow, or Freshdesk.',
                icon: 'fas fa-server'
            },
            {
                title: 'Structured Troubleshooting',
                desc: 'Logical root-cause isolation techniques with the ability to explain technical steps in simple terms to end users.',
                icon: 'fas fa-search'
            },
            {
                title: 'Security & Access Protocols',
                desc: 'Familiarity with anti-malware utilities, multi-factor authentication (MFA), and secure credential hygiene.',
                icon: 'fas fa-shield-alt'
            }
        ],
        qualifications: {
            education: 'BCA, B.Sc (Computer Science/IT), B.E./B.Tech, Diploma in CS/IT/Electronics, or any degree with technical certification.',
            experience: '0 to 3 Years in L1/L2 Technical Support, Helpdesk operations, or desktop engineering. Tech-savvy freshers welcome.',
            shifts: 'Certifications like CompTIA A+, Network+, CCNA, or Microsoft Azure/365 Fundamentals will be given preference.'
        }
    },
    {
        id: 3,
        slug: 'bpo-associate',
        title: 'BPO Associate',
        tagline: 'Business Process Outsourcing Operations • Full-Time Permanent Role in Mysore.',
        department: 'BPO Operations & Workflow Management',
        jobType: 'Full-Time',
        location: 'Mysore (On-Site)',
        experience: '0 - 2 Years (Freshers Welcome)',
        shifts: 'Day / Rotational Shifts',
        immediateJoining: true,
        shortDescription: 'Support business process workflows, data entry, quality documentation, invoice processing, and operational reporting.',
        overview: 'As a BPO Associate at AHAD Softtech, you will be part of our mission-critical operations division executing business process workflows, data entry, invoice processing, and document verification for global enterprise clients.\n\nWe offer a disciplined, structured workplace environment where precision, speed, and continuous quality adherence are rewarded with fast promotions and skill expansion into team lead and quality analyst tracks.',
        responsibilities: [
            'Execute structured transactional workflows, data processing, records management, and order entries with 99%+ accuracy.',
            'Perform document indexing, optical validation (OCR proofing), and data reconciliation across client ERP portals.',
            'Conduct cross-checks to ensure processed records comply with client Standard Operating Procedures (SOPs).',
            'Maintain target hourly and daily production quotas while upholding rigorous quality benchmarks.',
            'Compile daily throughput and discrepancy logs for review by Operations Team Leaders.',
            'Maintain 100% adherence to information security, clean desk policies, and non-disclosure agreements (NDAs).'
        ],
        skills: [
            {
                title: 'Spreadsheet Proficiency',
                desc: 'Sound working knowledge of Microsoft Excel & Google Sheets (data sorting, filters, basic formulas).',
                icon: 'fas fa-file-excel'
            },
            {
                title: 'Speed & Precision',
                desc: 'Alphanumeric typing speed of 30+ WPM with minimal error rate and keen attention to detail.',
                icon: 'fas fa-tachometer-alt'
            },
            {
                title: 'Quality & Compliance Mindset',
                desc: 'High diligence in catching discrepancies, data mismatch, and adhering to strict process rules.',
                icon: 'fas fa-eye'
            },
            {
                title: 'Dependability & Team Spirit',
                desc: 'Reliable attendance, punctuality, and ability to collaborate effectively in high-volume team sprints.',
                icon: 'fas fa-users'
            }
        ],
        qualifications: {
            education: 'Any Degree (B.Com, BBA, B.Sc, BA, BCA) or Diploma holders with good basic computer operating knowledge.',
            experience: '0 to 2 Years. Freshers with strong computer literacy and fast typing speed are warmly welcomed.',
            shifts: 'General day shifts and rotational shifts based on client operational requirements.'
        }
    }
];

/**
 * Normalizes a raw Strapi item (handles both v4 and v5) into a uniform job object.
 */
function normalizeStrapiJob(raw) {
    if (!raw) return null;
    
    // Strapi v4 wraps fields in .attributes; Strapi v5 often has flat fields
    const attrs = raw.attributes ? raw.attributes : raw;
    const id = raw.id || raw.documentId || attrs.id || attrs.documentId;
    const title = attrs.title || attrs.jobTitle || attrs.name || 'Job Opening';
    
    // Generate or sanitize slug
    let slug = attrs.slug;
    if (!slug) {
        slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    }

    // Parse responsibilities if string or array
    let responsibilities = [];
    if (Array.isArray(attrs.responsibilities)) {
        responsibilities = attrs.responsibilities.map(r => typeof r === 'string' ? r : (r.text || r.item || JSON.stringify(r)));
    } else if (typeof attrs.responsibilities === 'string') {
        responsibilities = attrs.responsibilities
            .split(/\r?\n/)
            .map(line => line.replace(/^[-*•\d.]+\s*/, '').trim())
            .filter(Boolean);
    } else if (attrs.jobDescription && typeof attrs.jobDescription === 'string') {
        responsibilities = attrs.jobDescription
            .split(/\r?\n/)
            .map(line => line.replace(/^[-*•\d.]+\s*/, '').trim())
            .filter(Boolean);
    }

    if (responsibilities.length === 0) {
        responsibilities = [
            'Deliver quality deliverables in accordance with client SLAs and standard operating procedures.',
            'Collaborate with team members and report daily progress to the operations lead.',
            'Adhere to organizational data privacy, security, and quality compliance mandates.'
        ];
    }

    // Parse skills if string, array of strings, or array of objects
    let skills = [];
    if (Array.isArray(attrs.skills)) {
        skills = attrs.skills.map(s => {
            if (typeof s === 'string') {
                return { title: s, desc: 'Core operational and domain competency required.', icon: 'fas fa-check-circle' };
            }
            return {
                title: s.title || s.name || 'Core Skill',
                desc: s.desc || s.description || 'Proficiency required for this role.',
                icon: s.icon || 'fas fa-check-circle'
            };
        });
    } else if (typeof attrs.skills === 'string') {
        skills = attrs.skills
            .split(/\r?\n|,/)
            .map(s => s.replace(/^[-*•\d.]+\s*/, '').trim())
            .filter(Boolean)
            .map(name => ({ title: name, desc: 'Key competency required for day-to-day operations.', icon: 'fas fa-check-circle' }));
    }

    if (skills.length === 0) {
        skills = [
            { title: 'Effective Communication', desc: 'Good command of English communication for client and team coordination.', icon: 'fas fa-comments' },
            { title: 'Computer Proficiency', desc: 'Working knowledge of digital productivity tools, email, and browsers.', icon: 'fas fa-desktop' },
            { title: 'Attention to Detail', desc: 'High accuracy in execution, documentation, and compliance adherence.', icon: 'fas fa-eye' },
            { title: 'Problem Solving', desc: 'Analytical mindset with ability to resolve issues methodically.', icon: 'fas fa-lightbulb' }
        ];
    }

    // Parse qualifications
    let qualifications = {
        education: attrs.education || (attrs.qualifications && attrs.qualifications.education) || 'Any Graduate / Diploma / 10+2 with good communication.',
        experience: attrs.experience || (attrs.qualifications && attrs.qualifications.experience) || '0 to 2 Years. Freshers and experienced candidates welcome.',
        shifts: attrs.shifts || (attrs.qualifications && attrs.qualifications.shifts) || 'Rotational / General shifts based on client operational requirements.'
    };

    return {
        id: id,
        documentId: raw.documentId || id,
        slug: slug,
        title: title,
        tagline: attrs.tagline || `${attrs.department || 'Operations'} • Full-Time Permanent Role based in Mysore, Karnataka.`,
        department: attrs.department || attrs.category || 'Operations',
        jobType: attrs.jobType || attrs.type || 'Full-Time',
        location: attrs.location || 'Mysore (On-Site)',
        experience: attrs.experience || '0 - 2 Years',
        shifts: attrs.shifts || 'Rotational Shifts',
        immediateJoining: attrs.immediateJoining !== undefined ? attrs.immediateJoining : true,
        shortDescription: attrs.shortDescription || attrs.summary || (attrs.description ? attrs.description.slice(0, 160) + '...' : 'Exciting career opportunity at AHAD Softtech Pvt Ltd in Mysore.'),
        overview: attrs.overview || attrs.description || `Join AHAD Softtech as a ${title}. We offer high-growth enterprise environment, comprehensive training, and competitive compensation.`,
        responsibilities: responsibilities,
        skills: skills,
        qualifications: qualifications
    };
}

/**
 * Fetch all job openings from Strapi CMS with timeout and fallback.
 */
async function fetchJobsFromStrapi() {
    const config = window.STRAPI_CONFIG;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), config.timeoutMs);

    for (const endpoint of config.endpoints) {
        try {
            const url = `${config.apiUrl}${endpoint}?populate=*&sort=createdAt:desc`;
            const response = await fetch(url, {
                signal: controller.signal,
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                clearTimeout(timeoutId);
                const json = await response.json();
                if (json && Array.isArray(json.data) && json.data.length > 0) {
                    console.info(`[Strapi CMS] Successfully loaded ${json.data.length} openings from ${url}`);
                    return json.data.map(normalizeStrapiJob);
                }
            }
        } catch (err) {
            // endpoint failed or timed out, try next or fallback
        }
    }

    clearTimeout(timeoutId);
    console.info(`[Strapi CMS] Notice: Using fallback openings (Strapi server at ${config.apiUrl} is currently offline or unconfigured).`);
    return window.STRAPI_FALLBACK_JOBS;
}

/**
 * Fetch a single job details by ID or Slug from Strapi CMS with fallback.
 */
async function fetchJobDetailsFromStrapi(identifier) {
    if (!identifier) {
        return window.STRAPI_FALLBACK_JOBS[0];
    }

    const config = window.STRAPI_CONFIG;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), config.timeoutMs);

    // 1. Try direct API calls if Strapi is accessible
    for (const endpoint of config.endpoints) {
        try {
            // First attempt: fetch by ID or filter by slug
            const isNumeric = /^\d+$/.test(identifier);
            const queryUrl = isNumeric
                ? `${config.apiUrl}${endpoint}/${identifier}?populate=*`
                : `${config.apiUrl}${endpoint}?filters[slug][$eq]=${encodeURIComponent(identifier)}&populate=*`;

            const res = await fetch(queryUrl, {
                signal: controller.signal,
                headers: { 'Accept': 'application/json' }
            });

            if (res.ok) {
                clearTimeout(timeoutId);
                const json = await res.json();
                if (json && json.data) {
                    const item = Array.isArray(json.data) ? json.data[0] : json.data;
                    if (item) {
                        console.info(`[Strapi CMS] Loaded job details for "${identifier}" from ${endpoint}`);
                        return normalizeStrapiJob(item);
                    }
                }
            }
        } catch (err) {
            // ignore and try next
        }
    }

    clearTimeout(timeoutId);

    // 2. Offline / Fallback Matcher
    const matched = window.STRAPI_FALLBACK_JOBS.find(j => 
        String(j.id) === String(identifier) || 
        j.slug.toLowerCase() === String(identifier).toLowerCase()
    );

    return matched || window.STRAPI_FALLBACK_JOBS[0];
}

// Export functions to global scope
window.normalizeStrapiJob = normalizeStrapiJob;
window.fetchJobsFromStrapi = fetchJobsFromStrapi;
window.fetchJobDetailsFromStrapi = fetchJobDetailsFromStrapi;

