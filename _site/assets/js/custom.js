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
   =========================================================== */

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
