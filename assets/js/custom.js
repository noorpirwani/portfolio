// --- Smooth inverted cursor ---
const cursor = document.createElement("div");
cursor.classList.add("custom-cursor");
document.body.appendChild(cursor);

let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;

// smooth follow effect
function animateCursor() {
  cursorX += (mouseX - cursorX) * 0.15;
  cursorY += (mouseY - cursorY) * 0.15;
  cursor.style.left = cursorX + "px";
  cursor.style.top = cursorY + "px";
  requestAnimationFrame(animateCursor);
}
animateCursor();

// track mouse
window.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

// click animation
window.addEventListener("mousedown", () => {
  cursor.classList.add("active");
});
window.addEventListener("mouseup", () => {
  cursor.classList.remove("active");
});

// detect hover on interactive elements
document.querySelectorAll("a, button, .interactive").forEach((el) => {
  el.addEventListener("mouseenter", () => cursor.classList.add("hover"));
  el.addEventListener("mouseleave", () => cursor.classList.remove("hover"));
});


/* ===========================================================
   TIMELINE LINE SYNC — Instant Jump with Card Expansion
   =========================================================== 

document.addEventListener("DOMContentLoaded", function () {
  const rows = document.querySelectorAll(".timeline-row");

  function updateLines() {
    rows.forEach((row) => {
      const card = row.querySelector(".timeline-card");
      const line = row.querySelector(".timeline-dot .line");
      if (!card || !line) return;

      // Line height directly tied to card height
      const targetHeight = card.offsetHeight - 5;
      line.style.height = `${targetHeight}px`;
    });
  }

  // Initial setup and resize
  updateLines();
  window.addEventListener("resize", updateLines);

  rows.forEach((row) => {
    const card = row.querySelector(".timeline-card");
    const line = row.querySelector(".timeline-dot .line");

    row.addEventListener("mouseenter", () => {
      // instant "jump" sync start
      card.style.transition = "all 0.28s linear";
      line.style.transition = "height 0.05s linear";
      requestAnimationFrame(() => updateLines());
    });

    row.addEventListener("mouseleave", () => {
      // instant "jump" sync shrink
      card.style.transition = "all 0.28s linear";
      line.style.transition = "height 0.02s linear";
      requestAnimationFrame(() => updateLines());
    });

    // Listen to transition end to fix slight offset after animation
    ["transitionend", "transitioncancel"].forEach((evt) =>
      card.addEventListener(evt, () => requestAnimationFrame(updateLines))
    );
  });
});

*/



/* ===========================================================
   UI COLLAGE
   =========================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const filterTags = document.querySelectorAll(".filter-tag");
  const collages = document.querySelectorAll(".ui-collage");

  let activeFilters = ["all"];

  function updateCollages() {
    const normalizedFilters = activeFilters.map(f =>
      f.toLowerCase().trim()
    );

    collages.forEach(collage => {
      const platforms = collage.dataset.platforms
        .split(",")
        .map(p => p.toLowerCase().trim());

      if (normalizedFilters.includes("all")) {
        collage.classList.remove("is-hidden");
        return;
      }

      const match = normalizedFilters.some(f =>
        platforms.includes(f)
      );

      collage.classList.toggle("is-hidden", !match);
    });
        const visibleCount = document.querySelector("#visible-count");
let count = 0;

collages.forEach(collage => {
  if (!collage.classList.contains("is-hidden")) {
    count++;
  }
});

if (visibleCount) {
  visibleCount.textContent = count;
}
  }

  filterTags.forEach(tag => {
    tag.addEventListener("click", () => {
      const filter = tag.dataset.filter.toLowerCase().trim();

      if (filter === "all") {
        activeFilters = ["all"];
        filterTags.forEach(t => t.classList.remove("is-active"));
        tag.classList.add("is-active");
        updateCollages();
        return;
      }

      activeFilters = activeFilters.filter(f => f !== "all");
      document.querySelector('[data-filter="all"]').classList.remove("is-active");

      if (activeFilters.includes(filter)) {
        activeFilters = activeFilters.filter(f => f !== filter);
        tag.classList.remove("is-active");
      } else {
        activeFilters.push(filter);
        tag.classList.add("is-active");
      }

      if (activeFilters.length === 0) {
        activeFilters = ["all"];
        document.querySelector('[data-filter="all"]').classList.add("is-active");
      }

      updateCollages();
    });
  });

  updateCollages();
});


