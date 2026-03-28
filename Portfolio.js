// ===== NAV BAR ACTIVE LINK (CLICK + SCROLL FIX) =====
const navItems = document.querySelectorAll(".navigation .list");
const sections = document.querySelectorAll("section[id]");

let isClickScrolling = false;

navItems.forEach((item) => {
  item.addEventListener("click", function (e) {
    const link = this.querySelector("a");
    const targetId = link.getAttribute("href");

    if (targetId.startsWith("#")) {
      e.preventDefault();

      const targetSection = document.querySelector(targetId);
      if (!targetSection) return;

      // Set active manually
      navItems.forEach((i) => i.classList.remove("active"));
      this.classList.add("active");

      // Prevent observer conflict
      isClickScrolling = true;

      targetSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      // Re-enable observer
      setTimeout(() => {
        isClickScrolling = false;
      }, 800);
    }
  });
});

// ===== FIX INDICATOR POSITION =====
const indicator = document.querySelector(".indicator");

function moveIndicator(element) {
  const index = [...navItems].indexOf(element);
  const width = element.offsetWidth;

  indicator.style.transform = `translateX(${index * width}px)`;
}

// Update on click
navItems.forEach((item) => {
  item.addEventListener("click", () => {
    moveIndicator(item);
  });
});

// Update on scroll
const sectionObserver = new IntersectionObserver(
  (entries) => {
    if (isClickScrolling) return;

    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.id;

        navItems.forEach((item) => {
          item.classList.remove("active");

          const link = item.querySelector("a");
          if (link && link.getAttribute("href") === `#${id}`) {
            item.classList.add("active");
            moveIndicator(item);
          }
        });
      }
    });
  },
  {
    threshold: 0.15,
    rootMargin: "-10% 0px -10% 0px",
  },
);
sections.forEach((sec) => sectionObserver.observe(sec));

// ===== BOTTOM-OF-PAGE GUARD (fixes Contact indicator) =====
window.addEventListener(
  "scroll",
  () => {
    if (isClickScrolling) return;

    const scrolledToBottom =
      window.scrollY + window.innerHeight >=
      document.documentElement.scrollHeight - 60;

    if (scrolledToBottom) {
      const lastNavItem = navItems[navItems.length - 1];
      navItems.forEach((i) => i.classList.remove("active"));
      lastNavItem.classList.add("active");
      moveIndicator(lastNavItem);
    }
  },
  { passive: true },
);

// ===== ROLE TYPING ANIMATION =====
const roles = [
  "Front-End Developer",
  "React.js Developer",
  "UI Developer",
  "JavaScript Developer",
  "Web Developer",
  "MERN Stack Learner",
];

let count = 0;
let index = 0;
let currentText = "";
let letter = "";

function type() {
  if (count === roles.length) count = 0;

  currentText = roles[count];
  letter = currentText.slice(0, ++index);

  document.getElementById("role").textContent = letter;

  if (letter.length === currentText.length) {
    setTimeout(deleteText, 1800);
  } else {
    setTimeout(type, 80);
  }
}

function deleteText() {
  letter = currentText.slice(0, --index);

  document.getElementById("role").textContent = letter;

  if (letter.length === 0) {
    count++;
    setTimeout(type, 500);
  } else {
    setTimeout(deleteText, 40);
  }
}

type();

// ===== HAMBURGER MOBILE NAV =====
const hamburger = document.querySelector(".hamburger");
const mobileNav = document.querySelector(".mobile-nav");

if (hamburger && mobileNav) {
  hamburger.addEventListener("click", () => {
    const isOpen = mobileNav.classList.toggle("open");
    hamburger.classList.toggle("open");
    hamburger.setAttribute("aria-expanded", String(isOpen));
    document.body.style.overflow = isOpen ? "hidden" : "";
  });

  mobileNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("open");
      mobileNav.classList.remove("open");
      hamburger.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    });
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && mobileNav.classList.contains("open")) {
      hamburger.classList.remove("open");
      mobileNav.classList.remove("open");
      hamburger.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
      hamburger.focus();
    }
  });
}

// ===== SCROLL REVEAL ANIMATION =====
const revealTargets = [
  { selector: ".section-title", threshold: 0.3 },
  { selector: ".about-img", threshold: 0.2 },
  { selector: ".about-main", threshold: 0.2 },
  { selector: ".about-edu div", threshold: 0.2 },
  { selector: ".skills-container .skills1", threshold: 0.2 },
  { selector: ".skills-container .skills2", threshold: 0.2 },
  { selector: ".skills-container .skills3", threshold: 0.2 },
  { selector: ".skills-container .skills4", threshold: 0.2 },
  { selector: ".skills-container .skills5", threshold: 0.2 },
  { selector: ".project-card", threshold: 0.1 },
  { selector: ".contact-info-left", threshold: 0.2 },
  { selector: ".contact-info-right", threshold: 0.2 },
];

revealTargets.forEach(({ selector, threshold }) => {
  const els = document.querySelectorAll(selector);
  if (!els.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold },
  );

  els.forEach((el) => observer.observe(el));
});

// ===== HEADER SCROLL SHADOW =====
const header = document.querySelector("header");

window.addEventListener(
  "scroll",
  () => {
    if (!header) return;

    if (window.scrollY > 40) {
      header.style.boxShadow =
        "0 0 40px rgba(225,6,0,0.25), 0 12px 40px rgba(0,0,0,0.7)";
    } else {
      header.style.boxShadow =
        "0 0 30px rgba(225,6,0,0.2), 0 8px 32px rgba(0,0,0,0.6)";
    }
  },
  { passive: true },
);

// ===== ORBIT PAUSE ON HOVER =====
const orbitEl = document.querySelector(".orbit");
const orbitContainer = document.querySelector(".orbit-container");

if (orbitEl && orbitContainer) {
  orbitContainer.addEventListener("mouseenter", () => {
    orbitEl.style.animationPlayState = "paused";
  });

  orbitContainer.addEventListener("mouseleave", () => {
    orbitEl.style.animationPlayState = "running";
  });
}

// ===== SMOOTH SCROLL (SAFE) =====
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (e) => {
    const href = anchor.getAttribute("href");
    if (href === "#") return;

    const target = document.querySelector(href);
    if (!target) return;

    e.preventDefault();

    target.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
});

// ===== HERO TEXT REVEAL =====
window.addEventListener("DOMContentLoaded", () => {
  const heroEls = [
    document.querySelector(".hero-greeting"),
    document.querySelector(".hi"),
    document.querySelector(".main h3"),
    document.querySelector(".main p"),
    document.querySelector(".btn-group"),
  ].filter(Boolean);

  heroEls.forEach((el, i) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = `opacity 0.6s ease ${0.3 + i * 0.1}s, transform 0.6s ease ${0.3 + i * 0.1}s`;

    requestAnimationFrame(() => {
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    });
  });
});

// ===== CONTACT FORM (EMAILJS) =====
const form = document.querySelector(".contact-form");

if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    let parms = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      message: document.getElementById("message").value,
    };

    emailjs
      .send("service_979rx6e", "template_xe7w3bt", parms)
      .then(() => {
        alert("✅ Email Sent Successfully!");
        form.reset();
      })
      .catch((error) => {
        alert("❌ Failed to send email");
        console.log(error);
      });
  });
}
