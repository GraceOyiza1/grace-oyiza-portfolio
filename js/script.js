// Simple Scroll Effect for Navigation
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.classList.add('bg-white/90', 'backdrop-blur-md', 'shadow-sm');
    } else {
        nav.classList.remove('bg-white/90', 'backdrop-blur-md', 'shadow-sm');
    }
});

console.log("Grace Oyiza Portfolio Loaded Successfully!");
