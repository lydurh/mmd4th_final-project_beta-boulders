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

// Select all FAQ question buttons
const faqQuestions = document.querySelectorAll(".faq-question");

faqQuestions.forEach((question) => {
  question.addEventListener("click", () => {
    // Toggle active state for the clicked question
    question.classList.toggle("active");

    // Show or hide the answer
    const answer = question.nextElementSibling;
    answer.classList.toggle("show");
  });
});

/*--------------------
Vars
--------------------*/
const $menu = document.querySelector(".menu");
const $items = document.querySelectorAll(".menu--item");
const $images = document.querySelectorAll(".menu--item img");
let menuWidth = $menu.clientWidth;
let itemWidth = $items[0].clientWidth;
let wrapWidth = $items.length * itemWidth;

let scrollSpeed = 0;
let oldScrollY = 0;
let scrollY = 0;
let y = 0;

/*--------------------
Lerp
--------------------*/
const lerp = (v0, v1, t) => {
  return v0 * (1 - t) + v1 * t;
};

/*--------------------
Dispose
--------------------*/
const dispose = (scroll) => {
  gsap.set($items, {
    x: (i) => {
      return i * itemWidth + scroll;
    },
    modifiers: {
      x: (x, target) => {
        const s = gsap.utils.wrap(
          -itemWidth,
          wrapWidth - itemWidth,
          parseInt(x)
        );
        return `${s}px`;
      },
    },
  });
};
dispose(0);

/*--------------------
Wheel
--------------------*/
const handleMouseWheel = (e) => {
  scrollY -= e.deltaY * 0.9;
};

/*--------------------
Touch
--------------------*/
let touchStart = 0;
let touchX = 0;
let isDragging = false;
const handleTouchStart = (e) => {
  touchStart = e.clientX || e.touches[0].clientX;
  isDragging = true;
  $menu.classList.add("is-dragging");
};
const handleTouchMove = (e) => {
  if (!isDragging) return;
  touchX = e.clientX || e.touches[0].clientX;
  scrollY += (touchX - touchStart) * 2.5;
  touchStart = touchX;
};
const handleTouchEnd = () => {
  isDragging = false;
  $menu.classList.remove("is-dragging");
};

/*--------------------
Listeners
--------------------*/
$menu.addEventListener("mousewheel", handleMouseWheel);

$menu.addEventListener("touchstart", handleTouchStart);
$menu.addEventListener("touchmove", handleTouchMove);
$menu.addEventListener("touchend", handleTouchEnd);

$menu.addEventListener("mousedown", handleTouchStart);
$menu.addEventListener("mousemove", handleTouchMove);
$menu.addEventListener("mouseleave", handleTouchEnd);
$menu.addEventListener("mouseup", handleTouchEnd);

$menu.addEventListener("selectstart", () => {
  return false;
});

/*--------------------
Resize
--------------------*/
window.addEventListener("resize", () => {
  menuWidth = $menu.clientWidth;
  itemWidth = $items[0].clientWidth;
  wrapWidth = $items.length * itemWidth;
});

/*--------------------
Render
--------------------*/
const render = () => {
  requestAnimationFrame(render);
  y = lerp(y, scrollY, 0.1);
  dispose(y);

  scrollSpeed = y - oldScrollY;
  oldScrollY = y;

  gsap.to($items, {
    skewX: -scrollSpeed * 0.2,
    rotate: scrollSpeed * 0.01,
    scale: 1 - Math.min(100, Math.abs(scrollSpeed)) * 0.003,
  });
};
render();