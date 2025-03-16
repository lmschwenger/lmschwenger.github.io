document.addEventListener('DOMContentLoaded', function() {
  // Initialize the projects slider
  const sliderWrapper = document.querySelector('.slider-wrapper');
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');
  const prevButton = document.querySelector('.prev-button');
  const nextButton = document.querySelector('.next-button');

  let currentSlide = 0;
  const slideCount = slides.length;

  // Set up initial state
  updateSliderPosition();

  // Event listeners for navigation
  prevButton.addEventListener('click', function() {
    goToSlide(currentSlide - 1);
  });

  nextButton.addEventListener('click', function() {
    goToSlide(currentSlide + 1);
  });

  // Set up dot indicators
  dots.forEach((dot, index) => {
    dot.addEventListener('click', function() {
      goToSlide(index);
    });
  });

  // Touch events for mobile swipe
  let touchStartX = 0;
  let touchEndX = 0;

  sliderWrapper.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  sliderWrapper.addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });

  function handleSwipe() {
    // Detect swipe direction (left or right)
    if (touchEndX < touchStartX - 50) {
      // Swiped left - go to next slide
      goToSlide(currentSlide + 1);
    } else if (touchEndX > touchStartX + 50) {
      // Swiped right - go to previous slide
      goToSlide(currentSlide - 1);
    }
  }

  // Keyboard navigation
  document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowLeft') {
      goToSlide(currentSlide - 1);
    } else if (e.key === 'ArrowRight') {
      goToSlide(currentSlide + 1);
    }
  });

  // Functions to control slider
  function goToSlide(index) {
    // Handle wrapping around
    if (index < 0) {
      index = slideCount - 1;
    } else if (index >= slideCount) {
      index = 0;
    }

    currentSlide = index;
    updateSliderPosition();
    updateDots();
  }

  function updateSliderPosition() {
    sliderWrapper.style.transform = `translateX(-${currentSlide * 100}%)`;
  }

  function updateDots() {
    dots.forEach((dot, index) => {
      if (index === currentSlide) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }

  // Optional: Automatic slide change - uncomment if you want auto-rotation
  /*
  const autoSlideInterval = 5000; // 5 seconds

  let slideInterval = setInterval(function() {
    goToSlide(currentSlide + 1);
  }, autoSlideInterval);

  // Pause auto-rotation when user interacts with slider
  sliderWrapper.addEventListener('mouseenter', function() {
    clearInterval(slideInterval);
  });

  sliderWrapper.addEventListener('mouseleave', function() {
    slideInterval = setInterval(function() {
      goToSlide(currentSlide + 1);
    }, autoSlideInterval);
  });
  */
});