/**
 * Jacobs Lab Website - Main JavaScript File
 * Contains functionality for animations, interactions, and UI enhancements
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initPreloader();
    initSmoothScroll();
    initScrollAnimations();
    initNavbarEffect();
    initContactForm();
    initPublicationFilters();
    initMobileNavToggle();
    initResearchProjectModals();
});

/**
 * Preloader functionality
 * Fades out the preloader once the page has loaded
 */
function initPreloader() {
    const preloader = document.querySelector('.preloader');
    
    if (preloader) {
        window.addEventListener('load', function() {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.visibility = 'hidden';
            }, 500);
        });
    }
}

/**
 * Smooth scrolling for navigation links
 * Ensures smooth transition when clicking on nav links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Offset for fixed header
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const mobileNav = document.querySelector('.nav-links.mobile-active');
                if (mobileNav) {
                    mobileNav.classList.remove('mobile-active');
                }
            }
        });
    });
}

/**
 * Animation on scroll functionality
 * Adds animation classes to elements as they enter the viewport
 */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll(
        '.research-card, .team-member, .publication-card, ' +
        '.contact-item, .stat-item, .hero h1, .hero p, .hero .btn'
    );
    
    function checkPosition() {
        animatedElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('animated');
            }
        });
    }
    
    // Check positions initially
    checkPosition();
    
    // Check on scroll
    window.addEventListener('scroll', checkPosition);
}

/**
 * Navbar effect on scroll
 * Changes navbar appearance when scrolling down
 */
function initNavbarEffect() {
    const header = document.querySelector('header');
    
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
}

/**
 * Contact form validation and submission
 * Handles form validation and simulates submission
 */
function initContactForm() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form fields
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Simple validation
            if (!name || !email || !subject || !message) {
                showFormMessage('Please fill out all fields', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showFormMessage('Please enter a valid email address', 'error');
                return;
            }
            
            // In a real application, you would send data to a server here
            // For demonstration, we'll just show a success message
            showFormMessage('Thank you for your message! We will get back to you soon.', 'success');
            contactForm.reset();
        });
    }
}

/**
 * Display form submission message
 * @param {string} message - The message to display
 * @param {string} type - The message type (success or error)
 */
function showFormMessage(message, type) {
    const formMessage = document.createElement('div');
    formMessage.className = `form-message ${type}`;
    formMessage.textContent = message;
    
    const contactForm = document.querySelector('.contact-form');
    
    // Remove any existing messages
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Add new message
    contactForm.appendChild(formMessage);
    
    // Remove message after 5 seconds
    setTimeout(() => {
        formMessage.remove();
    }, 5000);
}

/**
 * Validate email format
 * @param {string} email - The email to validate
 * @return {boolean} - Whether the email is valid
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Publication filters
 * Allows filtering publications by year, type, etc.
 */
function initPublicationFilters() {
    const filterButtons = document.querySelectorAll('.publication-filter');
    const publicationCards = document.querySelectorAll('.publication-card');
    
    if (filterButtons.length) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                const filter = this.getAttribute('data-filter');
                
                // Show all publications if filter is 'all'
                if (filter === 'all') {
                    publicationCards.forEach(card => {
                        card.style.display = 'block';
                    });
                } else {
                    // Otherwise, filter publications
                    publicationCards.forEach(card => {
                        if (card.classList.contains(filter)) {
                            card.style.display = 'block';
                        } else {
                            card.style.display = 'none';
                        }
                    });
                }
            });
        });
    }
}

/**
 * Mobile navigation toggle
 * Handles the mobile menu toggle button
 */
function initMobileNavToggle() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('mobile-active');
            menuToggle.classList.toggle('active');
        });
    }
}

/**
 * Research project modals
 * Handles the opening and closing of research project detail modals
 */
function initResearchProjectModals() {
    const modalButtons = document.querySelectorAll('.research-card .btn');
    const modalCloseButtons = document.querySelectorAll('.modal-close');
    const modals = document.querySelectorAll('.research-modal');
    const modalOverlay = document.querySelector('.modal-overlay');
    
    if (modalButtons.length && modalOverlay) {
        // Open modal when clicking on Learn More button
        modalButtons.forEach((button, index) => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Show overlay and specific modal
                modalOverlay.classList.add('active');
                modals[index].classList.add('active');
                
                // Prevent body scrolling when modal is open
                document.body.style.overflow = 'hidden';
            });
        });
        
        // Close modal when clicking on close button
        modalCloseButtons.forEach(button => {
            button.addEventListener('click', closeAllModals);
        });
        
        // Close modal when clicking on overlay
        modalOverlay.addEventListener('click', function(e) {
            if (e.target === modalOverlay) {
                closeAllModals();
            }
        });
        
        // Close modal when pressing ESC key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeAllModals();
            }
        });
    }
    
    function closeAllModals() {
        modalOverlay.classList.remove('active');
        modals.forEach(modal => {
            modal.classList.remove('active');
        });
        
        // Restore body scrolling
        document.body.style.overflow = '';
    }
}

/**
 * Counter animation for statistics
 * Animates the number counters in the stats section
 */
function animateCounters() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(number => {
        const target = parseInt(number.textContent);
        const duration = 2000; // Animation duration in milliseconds
        const step = target / (duration / 16); // 60 FPS
        
        let current = 0;
        const timer = setInterval(() => {
            current += step;
            
            if (current >= target) {
                number.textContent = target;
                clearInterval(timer);
            } else {
                number.textContent = Math.floor(current);
            }
        }, 16);
    });
}

// Initialize counter animation when stats section is visible
const statsSection = document.querySelector('.stats-section');
if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.unobserve(entry.target);
            }
        });
    });
    
    observer.observe(statsSection);
}
