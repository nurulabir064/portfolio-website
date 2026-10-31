// 1. Mobile menu toggle
const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

menuBtn.addEventListener("click", () => {
  const isOpen = mobileMenu.classList.toggle("hidden") === false;
  mobileMenu.classList.toggle("flex", isOpen);
  menuBtn.setAttribute("aria-expanded", isOpen);
});

// Close the menu after clicking a link (mobile)
mobileMenu.querySelectorAll("a").forEach((link) =>
  link.addEventListener("click", () => {
    mobileMenu.classList.add("hidden");
    mobileMenu.classList.remove("flex");
    menuBtn.setAttribute("aria-expanded", false);
  })
);

// Close menu on Escape or when clicking outside
document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeMenu(); });
document.addEventListener("click", (e) => {
  if (!mobileMenu.contains(e.target) && !menuBtn.contains(e.target)) closeMenu();
});
function closeMenu() {
  mobileMenu.classList.add("hidden");
  mobileMenu.classList.remove("flex");
  menuBtn.setAttribute("aria-expanded", false);
}

// Highlight the nav link of the section currently on screen
const navLinks = document.querySelectorAll(".nav-link");
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      navLinks.forEach((l) => l.classList.toggle("active", l.getAttribute("href") === "#" + entry.target.id));
    }
  });
}, { rootMargin: "-40% 0px -55% 0px" });
document.querySelectorAll("main section").forEach((sec) => observer.observe(sec));

// 2. Placeholder image if your real image file is missing
const placeholders = {
  profile: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='400'><rect width='100%' height='100%' fill='%23312e81'/><text x='50%' y='55%' font-size='140' fill='white' text-anchor='middle' font-family='Arial'>NH</text></svg>",
  project: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='600' height='300'><rect width='100%' height='100%' fill='%23334155'/><text x='50%' y='55%' font-size='32' fill='%23cbd5e1' text-anchor='middle' font-family='Arial'>Project Preview</text></svg>",
};
document.querySelectorAll("img[data-fallback]").forEach((img) => {
  const useFallback = () => { img.src = placeholders[img.dataset.fallback]; };
  if (img.complete && img.naturalWidth === 0) useFallback();   // already failed
  else img.addEventListener("error", useFallback, { once: true });
});

// 3. Contact form (frontend only – no backend yet)
document.getElementById("contact-form").addEventListener("submit", (e) => {
  e.preventDefault();
  document.getElementById("form-msg").classList.remove("hidden");
  e.target.reset();
});

// 4. Footer year
document.getElementById("year").textContent = new Date().getFullYear();
