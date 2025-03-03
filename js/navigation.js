function updateActiveSection() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll('.navbar a[href^="#"]');

  const scrollY = window.pageYOffset;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navLinks.forEach((link) => {
        link.classList.remove("text-yellow-400");
        link.classList.add("text-white");
      });

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

window.addEventListener("scroll", updateActiveSection);
document.addEventListener("DOMContentLoaded", updateActiveSection);
