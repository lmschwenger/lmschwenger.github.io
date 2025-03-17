document.addEventListener('DOMContentLoaded', function() {
  // Back to Top button functionality
  const backToTopButton = document.getElementById('back-to-top');

  // Show/hide button based on scroll position
  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) { // Show after scrolling 300px
      backToTopButton.classList.add('visible');
    } else {
      backToTopButton.classList.remove('visible');
    }
  });

  // Scroll to top when clicked
  backToTopButton.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Smooth scrolling
    });
  });

  // Mobile navigation toggle
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const mobileNav = document.querySelector('.mobile-nav');

  mobileMenuToggle.addEventListener('click', function() {
    mobileNav.classList.toggle('active');
    document.body.classList.toggle('no-scroll'); // Prevent background scrolling
  });

  // Close mobile menu when a link is clicked
  const mobileNavLinks = document.querySelectorAll('.mobile-nav a');

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', function() {
      mobileNav.classList.remove('active');
      document.body.classList.remove('no-scroll');
    });
  });

  // Add smooth scrolling to all navigation links
  const allNavLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');

  allNavLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();

      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        const headerHeight = document.querySelector('header').offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;

        window.scrollTo({
          top: targetPosition - headerHeight,
          behavior: 'smooth'
        });
      }
    });
  });
});

// Add a small helper class to prevent scrolling when mobile menu is open
document.head.insertAdjacentHTML(
  'beforeend',
  '<style>.no-scroll{overflow:hidden;}</style>'
);