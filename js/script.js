/**
 * Grace Oyiza - Portfolio Interactive Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    // -------------------------------------------------------------
    // 1. Theme Toggle (Light / Dark)
    // -------------------------------------------------------------
    const lightBtn = document.getElementById('light-btn');
    const darkBtn = document.getElementById('dark-btn');
    const htmlElement = document.documentElement;

    function applyTheme(theme) {
        if (theme === 'dark') {
            htmlElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
            if (darkBtn && lightBtn) {
                darkBtn.classList.add('bg-zinc-800', 'text-white', 'shadow-sm');
                darkBtn.classList.remove('text-zinc-400');
                lightBtn.classList.remove('bg-white', 'text-zinc-900', 'shadow-sm');
                lightBtn.classList.add('text-zinc-400');
            }
        } else {
            htmlElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
            if (darkBtn && lightBtn) {
                lightBtn.classList.add('bg-white', 'text-zinc-900', 'shadow-sm');
                lightBtn.classList.remove('text-zinc-400');
                darkBtn.classList.remove('bg-zinc-800', 'text-white', 'shadow-sm');
                darkBtn.classList.add('text-zinc-400');
            }
        }
    }

    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme ? savedTheme : (prefersDark ? 'dark' : 'light');
    applyTheme(initialTheme);

    if (lightBtn) lightBtn.addEventListener('click', () => applyTheme('light'));
    if (darkBtn) darkBtn.addEventListener('click', () => applyTheme('dark'));

    // Listen for OS theme changes if not overridden
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            applyTheme(e.matches ? 'dark' : 'light');
        }
    });

    // -------------------------------------------------------------
    // 2. Navigation Scroll State
    // -------------------------------------------------------------
    const navbar = document.getElementById('main-nav');
    function handleScroll() {
        if (window.scrollY > 20) {
            navbar.classList.add('bg-white/85', 'dark:bg-zinc-950/85', 'backdrop-blur-md', 'shadow-sm', 'border-zinc-200/80', 'dark:border-zinc-800/80');
            navbar.classList.remove('bg-transparent', 'border-transparent');
        } else {
            navbar.classList.remove('bg-white/85', 'dark:bg-zinc-950/85', 'backdrop-blur-md', 'shadow-sm', 'border-zinc-200/80', 'dark:border-zinc-800/80');
            navbar.classList.add('bg-transparent', 'border-transparent');
        }
    }
    window.addEventListener('scroll', handleScroll);
    handleScroll();

    // -------------------------------------------------------------
    // 3. Mobile Navigation Drawer
    // -------------------------------------------------------------
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    const bar1 = document.getElementById('bar-1');
    const bar2 = document.getElementById('bar-2');
    const bar3 = document.getElementById('bar-3');
    let isMenuOpen = false;

    function toggleMobileMenu(open) {
        isMenuOpen = typeof open === 'boolean' ? open : !isMenuOpen;
        if (isMenuOpen) {
            mobileMenu.classList.remove('translate-x-full', 'pointer-events-none', 'opacity-0');
            document.body.classList.add('overflow-hidden');
            if (bar1 && bar2 && bar3) {
                bar1.classList.add('rotate-45', 'translate-y-2');
                bar2.classList.add('opacity-0');
                bar3.classList.add('-rotate-45', '-translate-y-2');
            }
        } else {
            mobileMenu.classList.add('translate-x-full', 'pointer-events-none', 'opacity-0');
            document.body.classList.remove('overflow-hidden');
            if (bar1 && bar2 && bar3) {
                bar1.classList.remove('rotate-45', 'translate-y-2');
                bar2.classList.remove('opacity-0');
                bar3.classList.remove('-rotate-45', '-translate-y-2');
            }
        }
    }

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => toggleMobileMenu());
    }

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => toggleMobileMenu(false));
    });



    // -------------------------------------------------------------
    // 5. Copy Email Action with Toast
    // -------------------------------------------------------------
    const copyEmailBtns = document.querySelectorAll('.copy-email-btn');
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toast-message');

    function showToast(message) {
        if (!toast) return;
        if (toastMsg) {
            toastMsg.textContent = message;
        } else {
            toast.textContent = message;
        }
        toast.classList.remove('translate-y-20', 'opacity-0', 'pointer-events-none');
        setTimeout(() => {
            toast.classList.add('translate-y-20', 'opacity-0', 'pointer-events-none');
        }, 2800);
    }

    copyEmailBtns.forEach(btn => {
        btn.addEventListener('click', async (e) => {
            e.preventDefault();
            const email = btn.getAttribute('data-email') || 'oyizagrace1@gmail.com';
            try {
                await navigator.clipboard.writeText(email);
                showToast(`Copied ${email} to clipboard!`);
            } catch (err) {
                window.location.href = `mailto:${email}`;
            }
        });
    });

    // -------------------------------------------------------------
    // 6. Certificate Lightbox Modal
    // -------------------------------------------------------------
    const certModal = document.getElementById('cert-modal');
    const certModalImg = document.getElementById('cert-modal-img');
    const certModalTitle = document.getElementById('cert-modal-title');
    const certModalClose = document.getElementById('cert-modal-close');
    const certCards = document.querySelectorAll('.cert-trigger');

    function openCertModal(src, title) {
        if (!certModal || !certModalImg) return;
        certModalImg.src = src;
        certModalImg.alt = title;
        if (certModalTitle) certModalTitle.textContent = title;
        certModal.classList.remove('hidden');
        certModal.classList.add('flex');
        document.body.classList.add('overflow-hidden');
    }

    function closeCertModal() {
        if (!certModal) return;
        certModal.classList.add('hidden');
        certModal.classList.remove('flex');
        document.body.classList.remove('overflow-hidden');
    }

    certCards.forEach(card => {
        card.addEventListener('click', () => {
            const img = card.querySelector('img');
            const title = card.getAttribute('data-cert-title') || (img ? img.alt : 'Certificate');
            if (img) openCertModal(img.src, title);
        });
    });

    if (certModalClose) certModalClose.addEventListener('click', closeCertModal);
    if (certModal) {
        certModal.addEventListener('click', (e) => {
            if (e.target === certModal) closeCertModal();
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeCertModal();
            toggleMobileMenu(false);
        }
    });

    // -------------------------------------------------------------
    // 7. Dynamic Footer Year
    // -------------------------------------------------------------
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // -------------------------------------------------------------
    // 8. Smooth Scroll Reveal (IntersectionObserver)
    // -------------------------------------------------------------
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    
    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            root: null,
            threshold: 0.08,
            rootMargin: '0px 0px -30px 0px'
        });

        revealElements.forEach(el => revealObserver.observe(el));
    } else {
        // Fallback for older browsers
        revealElements.forEach(el => el.classList.add('active'));
    }

    // -------------------------------------------------------------
    // 9. Real-Time Telemetry / Ghana Local Time Clock
    // -------------------------------------------------------------
    const ghanaTimeEl = document.getElementById('ghana-time');
    function updateGhanaTime() {
        if (!ghanaTimeEl) return;
        try {
            const now = new Date();
            const timeString = new Intl.DateTimeFormat('en-US', {
                timeZone: 'Africa/Accra',
                hour: 'numeric',
                minute: '2-digit',
                second: '2-digit',
                hour12: true
            }).format(now);
            ghanaTimeEl.textContent = `${timeString} GMT`;
        } catch (e) {
            ghanaTimeEl.textContent = 'UTC+0';
        }
    }
    updateGhanaTime();
    setInterval(updateGhanaTime, 1000);

    // -------------------------------------------------------------
    // 10. Interactive Project Category Filtering
    // -------------------------------------------------------------
    const filterBtns = document.querySelectorAll('.project-filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');

            // Toggle active pill styles
            filterBtns.forEach(b => {
                b.classList.remove('bg-brand-600', 'text-white', 'shadow-md', 'shadow-brand-500/20');
                b.classList.add('bg-zinc-100', 'dark:bg-zinc-900', 'text-zinc-700', 'dark:text-zinc-300', 'border', 'border-zinc-200', 'dark:border-zinc-800');
            });
            btn.classList.add('bg-brand-600', 'text-white', 'shadow-md', 'shadow-brand-500/20');
            btn.classList.remove('bg-zinc-100', 'dark:bg-zinc-900', 'text-zinc-700', 'dark:text-zinc-300', 'border', 'border-zinc-200', 'dark:border-zinc-800');

            // Filter project cards
            projectCards.forEach(card => {
                const categories = card.getAttribute('data-category') || '';
                if (filter === 'all' || categories.split(' ').includes(filter)) {
                    card.classList.remove('is-hidden');
                    setTimeout(() => {
                        card.classList.add('active');
                    }, 50);
                } else {
                    card.classList.add('is-hidden');
                }
            });
        });
    });
});

