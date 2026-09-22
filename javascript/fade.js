document.addEventListener("DOMContentLoaded", () => {
  const hero = document.querySelector(".hero");
  const sections = document.querySelectorAll("section:not(.hero)");

  sections.forEach((section) => section.classList.add("fade-section"));

  if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("is-visible", entry.isIntersecting);
        });
      },
      { threshold: 0.12 }
    );

    sections.forEach((section) => sectionObserver.observe(section));
  } else {
    sections.forEach((section) => section.classList.add("is-visible"));
  }

  window.addEventListener("scroll", () => {
    const fadePoint = window.innerHeight * 0.7;
    const scrollY = window.scrollY;

    let opacity = 1 - scrollY / fadePoint;
    if (opacity < 0) opacity = 0;

    hero.style.opacity = opacity;
  });
});
