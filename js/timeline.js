// Horizontal Timeline JavaScript
document.addEventListener('DOMContentLoaded', function() {
  // Get timeline elements
  const timelinePoints = document.querySelectorAll('.timeline-point');
  const timelineContentItems = document.querySelectorAll('.timeline-content-item');
  const prevBtn = document.querySelector('.timeline-nav.prev');
  const nextBtn = document.querySelector('.timeline-nav.next');
  const timelineTrack = document.querySelector('.timeline-track');

  let currentIndex = 4; // Starting with the current position (Remote Sensing Specialist)
  const totalPoints = timelinePoints.length;

  // Initialize timeline
  updateTimeline(currentIndex);

  // Add click event to timeline points
  timelinePoints.forEach(point => {
    point.addEventListener('click', function() {
      currentIndex = parseInt(this.getAttribute('data-index'));
      updateTimeline(currentIndex);
    });
  });

  // Navigation button events
  if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', function() {
      if (currentIndex > 0) {
        currentIndex--;
        updateTimeline(currentIndex);
      }
    });

    nextBtn.addEventListener('click', function() {
      if (currentIndex < totalPoints - 1) {
        currentIndex++;
        updateTimeline(currentIndex);
      }
    });
  }

  // Function to update timeline state
  function updateTimeline(index) {
    // Update points
    timelinePoints.forEach(point => {
      point.classList.remove('active');
    });
    timelinePoints[index].classList.add('active');

    // Update content
    timelineContentItems.forEach(item => {
      item.classList.remove('active');
    });
    timelineContentItems[index].classList.add('active');

    // Update progress track
    if (timelineTrack) {
      const progress = index / (totalPoints - 1);
      timelineTrack.style.setProperty('--progress', progress);
    }

    // Update navigation buttons state
    if (prevBtn && nextBtn) {
      prevBtn.style.opacity = index === 0 ? '0.5' : '1';
      prevBtn.style.pointerEvents = index === 0 ? 'none' : 'auto';

      nextBtn.style.opacity = index === totalPoints - 1 ? '0.5' : '1';
      nextBtn.style.pointerEvents = index === totalPoints - 1 ? 'none' : 'auto';
    }
  }
});