window.addEventListener('scroll', () => {
    document.querySelectorAll('section').forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
            section.classList.add('visible');
        }
    });
});
window.addEventListener('load', () => {
    document.querySelector('.head').classList.add('visible');
});
const menuBar = document.getElementById('menu-bar');
const navbar = document.querySelector('.navbar');

menuBar.addEventListener('click', () => {
    navbar.classList.toggle('active');
    menuBar.classList.toggle('active');
});
const homeSection = document.querySelector('.home');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Add the 'visible' class when the section is in view
            homeSection.classList.add('visible');
        }
    });
}, {
    threshold: 0.5  // Trigger when 50% of the section is visible
});

// Observe the home section
observer.observe(homeSection);
