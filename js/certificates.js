document.addEventListener('DOMContentLoaded', function() {
  const categoryButtons = document.querySelectorAll('.cert-category-btn');
  const certCards = document.querySelectorAll('.cert-card');

  // Filter certificates by category
  categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Toggle active state on buttons
      categoryButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      // Get selected category
      const selectedCategory = button.getAttribute('data-category');

      // Show/hide cards based on selected category
      certCards.forEach(card => {
        if (selectedCategory === 'all') {
          card.style.display = 'flex';
        } else {
          if (card.getAttribute('data-category') === selectedCategory) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        }
      });
    });
  });
});