// Select hamburger and menu
const hamburger = document.getElementById("hamburger");
const menu = document.getElementById("menu");

// Toggle menu visibility
hamburger.addEventListener("click", () => {
  menu.classList.toggle("active");
  hamburger.classList.toggle("open");
});

// classes page

document.addEventListener("DOMContentLoaded", () => {
  const ageFilter = document.querySelector(".filters select:nth-child(1)");
  const levelFilter = document.querySelector(".filters select:nth-child(2)");
  const cards = document.querySelectorAll(".card");

  function filterCards() {
    const selectedAge = ageFilter.value;
    const selectedLevel = levelFilter.value;

    cards.forEach((card) => {
      const ageText = card.querySelector("p").textContent.toLowerCase();
      const matchesAge = !selectedAge || ageText.includes(selectedAge);
      const matchesLevel = !selectedLevel || ageText.includes(selectedLevel);

      if (matchesAge && matchesLevel) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  }

  ageFilter.addEventListener("change", filterCards);
  levelFilter.addEventListener("change", filterCards);
});

document.getElementById("monthlyBtn").addEventListener("click", function () {
  toggleMembership("monthly");
});

document.getElementById("yearlyBtn").addEventListener("click", function () {
  toggleMembership("yearly");
});

function toggleMembership(type) {
  const monthlyBtn = document.getElementById("monthlyBtn");
  const yearlyBtn = document.getElementById("yearlyBtn");

  if (type === "monthly") {
    monthlyBtn.classList.add("active");
    yearlyBtn.classList.remove("active");
  } else {
    yearlyBtn.classList.add("active");
    monthlyBtn.classList.remove("active");
  }
}
