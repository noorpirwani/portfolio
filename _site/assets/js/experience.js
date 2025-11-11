document.addEventListener("DOMContentLoaded", function () {
  const dropdowns = document.querySelectorAll(".dropdown-btn");

  dropdowns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const experience = btn.closest(".experience");
      const details = experience.querySelector(".details");

      // Find the parent container (career or education)
      const parentSection = experience.parentElement;

      // Close all open details within the same parent section
      parentSection.querySelectorAll(".details.show").forEach((openDetail) => {
        if (openDetail !== details) {
          openDetail.classList.remove("show");
          const openBtn = openDetail
            .closest(".experience")
            .querySelector(".dropdown-btn");
          if (openBtn) openBtn.classList.remove("active");
        }
      });

      // Toggle current one
      details.classList.toggle("show");
      btn.classList.toggle("active");
    });
  });
});


/* ===========================================================
   FADE-IN ON SCROLL for Invite Card
   =========================================================== */
document.addEventListener("DOMContentLoaded", function () {
  const fadeEls = document.querySelectorAll(".fade-in-on-scroll");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.3 }
  );

  fadeEls.forEach((el) => observer.observe(el));
});
