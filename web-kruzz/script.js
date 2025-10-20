// Enhanced Mobile Menu Functionality with Dropdown
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileCloseButton = document.getElementById('mobile-close-button');
const mobileMenu = document.getElementById('mobile-menu');
const menuOverlay = document.getElementById('menu-overlay');

function openMobileMenu() {
    mobileMenu.classList.add('open');
    menuOverlay.classList.add('active');
    document.body.classList.add('menu-open');
    
    // Animate menu items
    const menuItems = document.querySelectorAll('.mobile-nav-link, .mobile-dropdown, .btn-primary');
    menuItems.forEach((item, index) => {
        item.style.animation = `slideInRight 0.5s ease ${index * 0.1 + 0.1}s forwards`;
    });
}

function closeMobileMenu() {
    mobileMenu.classList.remove('open');
    menuOverlay.classList.remove('active');
    document.body.classList.remove('menu-open');
    
    // Reset animations and close all dropdowns
    const menuItems = document.querySelectorAll('.mobile-nav-link, .mobile-dropdown, .btn-primary');
    menuItems.forEach(item => {
        item.style.animation = '';
    });
    
    // Close all dropdowns when menu closes
    closeAllMobileDropdowns();
}

// Mobile Dropdown Functionality
function initMobileDropdowns() {
    const dropdownToggles = document.querySelectorAll('.mobile-dropdown-toggle');
    
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const dropdown = this.parentElement;
            const dropdownMenu = dropdown.querySelector('.mobile-dropdown-menu');
            const isOpen = dropdownMenu.classList.contains('open');
            
            // Close all other dropdowns
            closeAllMobileDropdowns();
            
            if (!isOpen) {
                // Open this dropdown
                dropdownMenu.classList.add('open');
                this.classList.add('active');
                dropdownMenu.style.maxHeight = dropdownMenu.scrollHeight + 'px';
            }
        });
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.mobile-dropdown')) {
            closeAllMobileDropdowns();
        }
    });
    
    // Close dropdowns when clicking on dropdown items
    document.querySelectorAll('.mobile-dropdown-item').forEach(item => {
        item.addEventListener('click', function() {
            setTimeout(closeAllMobileDropdowns, 300);
            closeMobileMenu();
        });
    });
}

function closeAllMobileDropdowns() {
    document.querySelectorAll('.mobile-dropdown-menu').forEach(menu => {
        menu.classList.remove('open');
        menu.style.maxHeight = '0';
    });
    
    document.querySelectorAll('.mobile-dropdown-toggle').forEach(toggle => {
        toggle.classList.remove('active');
    });
}

// Event Listeners for Mobile Menu
mobileMenuButton.addEventListener('click', openMobileMenu);
mobileCloseButton.addEventListener('click', closeMobileMenu);
menuOverlay.addEventListener('click', closeMobileMenu);

// Close menu when clicking on a link
document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        if (!link.classList.contains('btn-primary')) {
            setTimeout(closeMobileMenu, 300);
        }
    });
});

// Close menu on ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
        closeMobileMenu();
    }
});

// Sticky Navigation
window.addEventListener('scroll', function() {
    const header = document.querySelector('.sticky-nav');
    const homeSection = document.getElementById('home');
    
    if (!homeSection) return;
    
    const homeHeight = homeSection.offsetHeight;
    
    if (window.scrollY > homeHeight * 0.1) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Active nav link based on scroll position
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link, .mobile-dropdown-item');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 100)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') && link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerHeight = document.querySelector('.sticky-nav').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            closeMobileMenu();
        }
    });
});

// Animation on Scroll
function checkVisibility() {
    const elements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('visible');
        }
    });
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize mobile dropdowns
    initMobileDropdowns();
    
    // Initialize animations
    window.addEventListener('scroll', checkVisibility);
    window.addEventListener('load', checkVisibility);
    
    console.log('Mobile menu with dropdowns initialized successfully!');
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimized scroll handlers
const debouncedScroll = debounce(() => {
    checkVisibility();
}, 10);

window.addEventListener('scroll', debouncedScroll);

// Export functions for global access
window.KruzzShuttle = {
    openMobileMenu,
    closeMobileMenu,
    initMobileDropdowns,
    closeAllMobileDropdowns
};
  // Animasi khusus untuk hero section
        document.addEventListener('DOMContentLoaded', function() {
            // Reset typing animation after completion
            const typingElement = document.querySelector('.typing-animation');
            if (typingElement) {
                setTimeout(() => {
                    typingElement.style.animation = 'none';
                    setTimeout(() => {
                        typingElement.style.animation = 'typing 3.5s steps(40, end), blink-caret 0.75s step-end infinite';
                    }, 10);
                }, 3500);
            }
            
            // Add scroll-triggered animations
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            }, observerOptions);
            
            // Observe all animated elements
            document.querySelectorAll('.fade-in-up').forEach(el => {
                observer.observe(el);
            });
            
            // Parallax effect for hero background
            window.addEventListener('scroll', function() {
                const scrolled = window.pageYOffset;
                const hero = document.getElementById('home');
                if (hero) {
                    hero.style.backgroundPosition = `center ${scrolled * 0.5}px`;
                }
            });
        });

