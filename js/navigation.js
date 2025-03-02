function updateActiveSection() {
  // Get all sections and nav links
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll('.navbar a[href^="#"]');

  // Get current scroll position
  const scrollY = window.pageYOffset;

  // Check each section
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100; // Offset for better UX
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      // Remove active class from all links
      navLinks.forEach((link) => {
        link.classList.remove("text-yellow-400");
        link.classList.add("text-white");
      });

      // Add active class to current section's link
      const activeLink = document.querySelector(
        `.navbar a[href="#${sectionId}"]`
      );
      if (activeLink) {
        activeLink.classList.remove("text-white");
        activeLink.classList.add("text-yellow-400");
      }
    }
  });
}

// Add scroll event listener
window.addEventListener("scroll", updateActiveSection);
// Run on page load
document.addEventListener("DOMContentLoaded", updateActiveSection);
