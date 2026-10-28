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
    // 4. Copy Code Snippet (Hero Terminal)
    // -------------------------------------------------------------
    const copyCodeBtn = document.getElementById('copy-code-btn');
    const codeText = document.getElementById('code-content');
    if (copyCodeBtn && codeText) {
        copyCodeBtn.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(codeText.innerText);
                const originalHtml = copyCodeBtn.innerHTML;
                copyCodeBtn.innerHTML = `
                    <svg class="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span class="text-xs text-emerald-400 font-mono">Copied!</span>
                `;
                setTimeout(() => {
                    copyCodeBtn.innerHTML = originalHtml;
                }, 2000);
            } catch (err) {
                console.error('Failed to copy code: ', err);
            }
        });
    }

    // -------------------------------------------------------------
    // 5. Copy Email Action with Toast
    // -------------------------------------------------------------
    const copyEmailBtns = document.querySelectorAll('.copy-email-btn');
    const toast = document.getElementById('toast');

    function showToast(message) {
        if (!toast) return;
        toast.textContent = message;
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
                showToast(`✓ Copied ${email} to clipboard!`);
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
});
