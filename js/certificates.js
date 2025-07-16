// Certificate filtering functionality for the modern design
document.addEventListener('DOMContentLoaded', function() {
    // Certificate toggle functionality
    const showCertsBtn = document.getElementById('show-certs');
    const certsSection = document.getElementById('certifications');
    
    if (showCertsBtn && certsSection) {
        showCertsBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const isVisible = certsSection.style.display !== 'none';
            
            if (isVisible) {
                certsSection.style.display = 'none';
                this.innerHTML = 'View All Certifications <i class="fas fa-chevron-down"></i>';
            } else {
                certsSection.style.display = 'block';
                this.innerHTML = 'Hide Certifications <i class="fas fa-chevron-up"></i>';
                certsSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // Certificate filtering
    const filterButtons = document.querySelectorAll('.cert-filter-btn');
    const certCards = document.querySelectorAll('.cert-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.dataset.category;
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter certificates with animation
            certCards.forEach((card, index) => {
                const shouldShow = category === 'all' || card.dataset.category === category;
                
                if (shouldShow) {
                    card.style.display = 'block';
                    // Stagger animation
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, index * 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Initialize certificate cards with transition styles
    certCards.forEach(card => {
        card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    });
});