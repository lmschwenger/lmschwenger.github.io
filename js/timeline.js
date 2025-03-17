// Function to toggle timeline content visibility
function toggleTimelineContent(header) {
  // Find the content div that follows the header
  const content = header.nextElementSibling;

  // Toggle the expanded class
  if (content.classList.contains('collapsed')) {
    content.classList.remove('collapsed');
    content.classList.add('expanded');
    header.querySelector('.expand-icon i').classList.remove('fa-chevron-down');
    header.querySelector('.expand-icon i').classList.add('fa-chevron-up');
  } else {
    content.classList.remove('expanded');
    content.classList.add('collapsed');
    header.querySelector('.expand-icon i').classList.remove('fa-chevron-up');
    header.querySelector('.expand-icon i').classList.add('fa-chevron-down');
  }
}

// Optional: Open the first timeline item by default when the page loads
document.addEventListener('DOMContentLoaded', function() {
  // Uncomment the following lines if you want the first item to be expanded by default
  /*
  const firstTimelineHeader = document.querySelector('.timeline-header');
  if (firstTimelineHeader) {
    toggleTimelineContent(firstTimelineHeader);
  }
  */
});