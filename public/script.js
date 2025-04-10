// JavaScript cho trang web sẽ được thêm vào đây
console.log("VComic script loaded!");

document.addEventListener('DOMContentLoaded', () => {
    console.log("VComic script loaded!");

    // --- Genre Modal --- //
    const genreToggleBtn = document.getElementById('genre-toggle-btn');
    const genreModal = document.getElementById('genre-modal');
    const genreModalOverlay = document.getElementById('genre-modal-overlay');
    const closeGenreModalBtn = document.getElementById('close-genre-modal-btn');

    if (genreToggleBtn && genreModal && genreModalOverlay && closeGenreModalBtn) {
        genreToggleBtn.addEventListener('click', () => {
            genreModal.classList.toggle('open');
            genreToggleBtn.classList.toggle('open');
            // Optional: Add/Remove body class to prevent scrolling when modal is open
             document.body.classList.toggle('modal-open', genreModal.classList.contains('open'));
        });

        const closeModal = () => {
             // Add closing animation class
            if (genreModal.classList.contains('open')) {
                genreModal.style.animation = 'fadeOut 0.3s ease-out forwards';
                genreModal.querySelector('.genre-modal-content').style.animation = 'slideUp 0.4s cubic-bezier(0.25, 0.1, 0.25, 1) forwards';
                
                // Wait for animation to finish before hiding
                setTimeout(() => {
                     genreModal.classList.remove('open');
                     genreToggleBtn.classList.remove('open');
                     document.body.classList.remove('modal-open');
                     // Reset animation styles
                     genreModal.style.animation = '';
                     genreModal.querySelector('.genre-modal-content').style.animation = '';
                }, 400); // Match animation duration
            }
        };

        closeGenreModalBtn.addEventListener('click', closeModal);
        genreModalOverlay.addEventListener('click', closeModal);
        
        // Close modal with Escape key
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && genreModal.classList.contains('open')) {
                closeModal();
            }
        });
    } else {
        console.warn('Genre modal elements not found.');
    }

    // --- Mobile Menu --- //
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileNav = document.getElementById('mobile-nav');
    const closeMobileMenuBtn = document.getElementById('close-mobile-menu-btn');

    if (mobileMenuBtn && mobileNav && closeMobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileNav.classList.add('open');
             mobileNav.style.animation = 'slideInLeft 0.3s ease-out forwards';
             document.body.classList.add('modal-open'); // Prevent body scroll
        });

        const closeMobileMenu = () => {
            mobileNav.style.animation = 'slideOutLeft 0.3s ease-out forwards';
             document.body.classList.remove('modal-open');
             setTimeout(() => {
                 mobileNav.classList.remove('open');
                 mobileNav.style.animation = ''; // Reset animation
            }, 300); // Match animation duration
        };

        closeMobileMenuBtn.addEventListener('click', closeMobileMenu);
        
        // Optional: Close mobile menu when a link is clicked
        mobileNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });

    } else {
        console.warn('Mobile menu elements not found.');
    }

    // --- Carousel --- //
    const slider = document.getElementById('carousel-slider');
    const slides = slider ? slider.querySelectorAll('.carousel-slide') : [];
    const prevBtn = document.getElementById('carousel-prev');
    const nextBtn = document.getElementById('carousel-next');
    const indicatorsContainer = document.getElementById('carousel-indicators');

    if (slider && slides.length > 0 && prevBtn && nextBtn && indicatorsContainer) {
        let currentIndex = 0;
        let indicators = [];
        let autoPlayInterval = null;
        const autoPlayDelay = 5000; // 5 seconds

        function createIndicators() {
            indicatorsContainer.innerHTML = ''; // Clear existing
            indicators = []; // Reset array
            slides.forEach((_, index) => {
                const button = document.createElement('button');
                button.addEventListener('click', () => {
                    goToSlide(index);
                    resetAutoPlay(); // Reset timer when user interacts
                });
                indicatorsContainer.appendChild(button);
                indicators.push(button);
            });
        }

        function updateIndicators() {
            indicators.forEach((button, index) => {
                button.classList.toggle('active', index === currentIndex);
            });
        }

        function updateSlideClasses() {
             slides.forEach((slide, index) => {
                slide.classList.toggle('active', index === currentIndex);
                 // Add classes for adjacent slides if needed for more complex animations
                 // slide.classList.toggle('prev', index === (currentIndex - 1 + slides.length) % slides.length);
                 // slide.classList.toggle('next', index === (currentIndex + 1) % slides.length);
            });
        }

        function goToSlide(index) {
            // Wrap index around
            if (index < 0) {
                index = slides.length - 1;
            } else if (index >= slides.length) {
                index = 0;
            }

            currentIndex = index;
            const offset = -currentIndex * 100;
            slider.style.transform = `translateX(${offset}%)`;
            updateIndicators();
            updateSlideClasses();
        }

        function startAutoPlay() {
             if (autoPlayInterval) clearInterval(autoPlayInterval); // Clear existing interval
             autoPlayInterval = setInterval(() => {
                goToSlide(currentIndex + 1);
            }, autoPlayDelay);
        }

        function resetAutoPlay() {
            clearInterval(autoPlayInterval);
            startAutoPlay();
        }

        // Event Listeners
        prevBtn.addEventListener('click', () => {
            goToSlide(currentIndex - 1);
            resetAutoPlay();
        });

        nextBtn.addEventListener('click', () => {
            goToSlide(currentIndex + 1);
            resetAutoPlay();
        });
        
        // Pause autoplay on hover
        slider.closest('.comic-carousel').addEventListener('mouseenter', () => clearInterval(autoPlayInterval));
        slider.closest('.comic-carousel').addEventListener('mouseleave', startAutoPlay);

        // Initial Setup
        createIndicators();
        goToSlide(0); // Start at the first slide
        startAutoPlay(); // Start auto-play

    } else {
        console.warn('Carousel elements not found or no slides present.');
    }

     // Optional: Add a class to body once JS has loaded for CSS transitions
    document.body.classList.add('js-loaded');
});

// Add this to your CSS to prevent scrollbar jump when modal opens:
/*
body.modal-open {
    overflow: hidden;
    padding-right: 15px; // Adjust based on scrollbar width 
}
*/ 