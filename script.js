// Fade-in animation on scroll for project cards
document.addEventListener("DOMContentLoaded", () => {
  const projects = document.querySelectorAll(".project");

  // Add initial hidden state
  projects.forEach(project => project.classList.add("reveal"));

  // Observer to reveal elements when in view
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        }
      });
    },
    { threshold: 0.15 }
  );

  projects.forEach(project => observer.observe(project));
});
