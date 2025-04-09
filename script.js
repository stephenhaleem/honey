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
  document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector("header");
    const heroSection = document.getElementById("hero");
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");

    // Function to update header background on scroll
    function updateHeaderBackground() {
      const heroBottom = heroSection.getBoundingClientRect().bottom;

      if (heroBottom > 100) {
        // When the hero section is visible
        header.style.backgroundColor = "transparent";
        header.style.backdropFilter = "none";
      } else {
        // When scrolled past the hero section
        header.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
        header.style.backdropFilter = "blur(10px)";
      }
    }

    // Call the function on page load and scroll
    updateHeaderBackground();
    window.addEventListener("scroll", updateHeaderBackground);

    // Toggle mobile menu
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });

    // Close menu when a link is clicked
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
      });
    });
  });

  // Mobile navigation toggle
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");
  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () =>
      navLinks.classList.toggle("active")
    );
    document.querySelectorAll(".nav-links a").forEach((item) => {
      item.addEventListener("click", () => {
        if (isMobile()) navLinks.classList.remove("active");
      });
    });
  }

  // Section indicators
  const indicators = document.querySelectorAll(".indicator-item");
  const sections = document.querySelectorAll("section");
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
          window.scrollTo({ top: targetSection.offsetTop, behavior: "smooth" });
        }
      });
    });
    window.addEventListener("scroll", updateActiveIndicator);
  }

  // Smooth scroll for footer and header links
  const linkSelectors = [".footer-links a", ".nav-links a"];
  linkSelectors.forEach((selector) => {
    document.querySelectorAll(selector).forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        const targetId = this.getAttribute("href").substring(1);
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
          window.scrollTo({ top: targetSection.offsetTop, behavior: "smooth" });
        }
      });
    });
  });

  // GSAP Animations (with mobile fixes)
  if (!isMobile()) {
    // Only run animations on desktop
    // Hero section animations
    gsap.from(".hero-content", {
      opacity: 0,
      y: 50,
      duration: 1.2,
      ease: "power3.out",
      onComplete: () => gsap.set(".hero-content", { opacity: 1, y: 0 }), // Ensure visibility
    });

    gsap.from(".hero-number", {
      opacity: 0,
      x: 50,
      duration: 1,
      delay: 0.5,
      ease: "power3.out",
      onComplete: () => gsap.set(".hero-number", { opacity: 0.5, x: 0 }),
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
        onComplete: () => gsap.set(header, { opacity: 1, y: 0 }),
      });
    });

    // Featured section animations
    gsap.from(".featured-quote", {
      scrollTrigger: {
        trigger: ".featured-quote",
        start: "top 80%",
        toggleActions: "play none none none",
      },
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: "power3.out",
      onComplete: () => gsap.set(".featured-quote", { opacity: 1, y: 0 }),
    });

    gsap.from(".featured-image", {
      scrollTrigger: {
        trigger: ".featured-image",
        start: "top 80%",
        toggleActions: "play none none none",
      },
      opacity: 0,
      x: 50,
      duration: 1,
      ease: "power3.out",
      onComplete: () => gsap.set(".featured-image", { opacity: 1, x: 0 }),
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
        onComplete: () => gsap.set(item, { opacity: 1, y: 0 }),
      });
    });

    // Project section animations
    gsap.from(".project-text", {
      scrollTrigger: {
        trigger: ".project-text",
        start: "top 80%",
        toggleActions: "play none none none",
      },
      opacity: 0,
      x: -50,
      duration: 0.8,
      ease: "power3.out",
      onComplete: () => gsap.set(".project-text", { opacity: 1, x: 0 }),
    });

    gsap.from(".gallery-image", {
      scrollTrigger: {
        trigger: ".project-gallery",
        start: "top 80%",
        toggleActions: "play none none none",
      },
      opacity: 0,
      y: 50,
      stagger: 0.2,
      duration: 0.8,
      ease: "power3.out",
      onComplete: () => gsap.set(".gallery-image", { opacity: 1, y: 0 }),
    });

    // About section animations
    gsap.from(".about-image", {
      scrollTrigger: {
        trigger: ".about-image",
        start: "top 80%",
        toggleActions: "play none none none",
      },
      opacity: 0,
      x: -50,
      duration: 0.8,
      ease: "power3.out",
      onComplete: () => gsap.set(".about-image", { opacity: 1, x: 0 }),
    });

    gsap.from(".about-text", {
      scrollTrigger: {
        trigger: ".about-text",
        start: "top 80%",
        toggleActions: "play none none none",
      },
      opacity: 0,
      x: 50,
      duration: 0.8,
      ease: "power3.out",
      onComplete: () => gsap.set(".about-text", { opacity: 1, x: 0 }),
    });

    // Contact section animations
    gsap.from(".contact-info", {
      scrollTrigger: {
        trigger: ".contact-info",
        start: "top 80%",
        toggleActions: "play none none none",
      },
      opacity: 0,
      x: -30,
      duration: 0.8,
      ease: "power3.out",
      onComplete: () => gsap.set(".contact-info", { opacity: 1, x: 0 }),
    });

    gsap.from(".contact-form", {
      scrollTrigger: {
        trigger: ".contact-form",
        start: "top 80%",
        toggleActions: "play none none none",
      },
      opacity: 0,
      x: 30,
      duration: 0.8,
      ease: "power3.out",
      onComplete: () => gsap.set(".contact-form", { opacity: 1, x: 0 }),
    });
  } else {
    // On mobile, ensure content is visible by resetting styles
    gsap.set(
      [
        ".hero-content",
        ".hero-number",
        ".section-header",
        ".featured-quote",
        ".featured-image",
        ".portfolio-item",
        ".project-text",
        ".gallery-image",
        ".about-image",
        ".about-text",
        ".contact-info",
        ".contact-form",
      ],
      {
        opacity: 1,
        x: 0,
        y: 0,
        clearProps: "all", // Clear any lingering GSAP styles
      }
    );
  }

  // Form input focus animations (run on all devices)
  const formInputs = document.querySelectorAll(".form-input");
  formInputs.forEach((input) => {
    input.addEventListener("focus", () =>
      gsap.to(input, {
        backgroundColor: "rgba(255, 255, 255, 0.15)",
        duration: 0.3,
      })
    );
    input.addEventListener("blur", () =>
      gsap.to(input, {
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        duration: 0.3,
      })
    );
  });

  // Ensure scrollbar visibility
  document.body.style.overflowY = "auto";
  document.documentElement.style.overflowY = "auto";
});
