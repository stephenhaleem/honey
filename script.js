document.addEventListener("DOMContentLoaded", function () {
  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
    console.error("GSAP or ScrollTrigger failed to load.");
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  // Helper function to check if on mobile
  const isMobile = () => window.innerWidth <= 992;

  // Custom cursor functionality (disabled on mobile)
  const cursor = document.querySelector(".custom-cursor");
  const cursorDot = document.querySelector(".cursor-dot");
  if (cursor && cursorDot && !isMobile()) {
    cursor.style.display = "block";
    cursorDot.style.display = "block";

    document.addEventListener("mousemove", function (e) {
      gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.3 });
      gsap.to(cursorDot, { x: e.clientX, y: e.clientY, duration: 0.1 });
    });

    const interactiveElements = document.querySelectorAll(
      "a, button, .portfolio-item, .form-input, .submit-btn"
    );
    interactiveElements.forEach((element) => {
      element.addEventListener("mouseenter", () =>
        gsap.to(cursor, { scale: 1.5, opacity: 0.7, duration: 0.3 })
      );
      element.addEventListener("mouseleave", () =>
        gsap.to(cursor, { scale: 1, opacity: 0.5, duration: 0.3 })
      );
    });
  }

  // Hamburger menu functionality - Fixed by moving outside the nested event listener
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  // Toggle mobile menu
  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("active");
      hamburger.classList.toggle("active");
    });

    // Close menu when a link is clicked
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        hamburger.classList.remove("active");
      });
    });
  }

  // Section indicators
  const indicators = document.querySelectorAll(".indicator-item");
  const sections = document.querySelectorAll("section");
  const header = document.querySelector("header"); // Added this line to fix the header reference

  if (indicators.length && sections.length) {
    function updateActiveIndicator() {
      let current = "";
      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (window.pageYOffset >= sectionTop - 300) {
          current = section.getAttribute("id");
        }
      });
      indicators.forEach((indicator) => {
        indicator.classList.remove("active");
        if (indicator.getAttribute("data-section") === current) {
          indicator.classList.add("active");
        }
      });
    }

    indicators.forEach((indicator) => {
      indicator.addEventListener("click", function () {
        const targetSection = document.getElementById(
          this.getAttribute("data-section")
        );
        if (targetSection) {
          const headerHeight = header.offsetHeight;
          const targetPosition =
            targetSection.getBoundingClientRect().top + window.scrollY;

          // Scroll to the section
          window.scrollTo({
            top: targetPosition - headerHeight,
            behavior: "smooth",
          });
        }
      });
    });

    // Update the active indicator on scroll
    window.addEventListener("scroll", updateActiveIndicator);

    // Call the function on page load to set the initial active indicator
    updateActiveIndicator();
  }

  // GSAP Animations
  if (!isMobile()) {
    // Hero section animations
    gsap.from(".hero-content", {
      opacity: 0,
      y: 50,
      duration: 1.2,
      ease: "power3.out",
    });

    gsap.from(".hero-number", {
      opacity: 0,
      x: 50,
      duration: 1,
      delay: 0.5,
      ease: "power3.out",
    });

    // Section headers animation
    gsap.utils.toArray(".section-header").forEach((header) => {
      gsap.from(header, {
        scrollTrigger: {
          trigger: header,
          start: "top 80%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out",
      });
    });

    // Portfolio item animations
    gsap.utils.toArray(".portfolio-item").forEach((item, i) => {
      gsap.from(item, {
        scrollTrigger: {
          trigger: item,
          start: "top 85%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        y: 50,
        duration: 0.7,
        delay: i * 0.15,
        ease: "power3.out",
      });
    });
  } else {
    // On mobile, ensure content is visible by resetting styles
    gsap.set(
      [".hero-content", ".hero-number", ".section-header", ".portfolio-item"],
      {
        opacity: 1,
        x: 0,
        y: 0,
        clearProps: "all", // Clear any lingering GSAP styles
      }
    );
  }
});
