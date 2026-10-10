/* ===================================================================
   Site interactions — one continuous cinematic world
   - Scroll-spy: active nav link + red underline tracks the section
   - Sticky nav becomes compact/darker after the hero
   - Hero content dissolves as you descend
   - Journey: red line travels as the timeline scrolls through view
   - Reveal-on-scroll for chapter content
   - Mobile menu
   =================================================================== */
(function () {
  "use strict";

  var nav        = document.getElementById("nav");
  var burger     = document.getElementById("navBurger");
  var links      = Array.prototype.slice.call(document.querySelectorAll(".nav__link"));
  var linkMap    = {};
  links.forEach(function (a) { linkMap[a.getAttribute("href").slice(1)] = a; });

  var hero        = document.getElementById("home");
  var heroContent = document.getElementById("heroContent");
  var sections    = Array.prototype.slice.call(document.querySelectorAll("section[id]"));
  var timeline    = document.getElementById("timeline");
  var timelineFill= document.getElementById("timelineFill");
  var navLinksEl  = document.querySelector(".nav__links");

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Mobile menu ---------- */
  if (burger) {
    burger.addEventListener("click", function () {
      var open = navLinksEl.classList.toggle("is-open");
      burger.setAttribute("aria-expanded", String(open));
    });
    navLinksEl.addEventListener("click", function (e) {
      if (e.target.closest(".nav__link")) {
        navLinksEl.classList.remove("is-open");
        burger.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---------- Scroll-spy (active section) ---------- */
  var spy = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) setActive(en.target.id);
    });
  }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });
  sections.forEach(function (s) { spy.observe(s); });

  function setActive(id) {
    links.forEach(function (a) { a.classList.remove("is-active"); });
    if (linkMap[id]) linkMap[id].classList.add("is-active");
  }

  /* ---------- Reveal-on-scroll ---------- */
  var revealEls = Array.prototype.slice.call(document.querySelectorAll(".reveal"));
  if (reduceMotion) {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  } else {
    var revObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("is-visible"); revObs.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -12% 0px", threshold: 0.12 });
    revealEls.forEach(function (el) { revObs.observe(el); });
  }

  /* ---------- Scroll-driven effects (rAF-throttled) ---------- */
  var ticking = false;
  function onScroll() {
    if (!ticking) { window.requestAnimationFrame(update); ticking = true; }
  }

  function update() {
    ticking = false;
    var y = window.pageYOffset || document.documentElement.scrollTop;
    var vh = window.innerHeight;

    // nav compact/dark after leaving the hero
    nav.classList.toggle("is-scrolled", y > vh * 0.6);

    // hero content dissolves as you descend into the world
    if (heroContent && y < vh) {
      var t = Math.min(y / (vh * 0.7), 1);
      heroContent.style.opacity = String(1 - t);
      heroContent.style.transform = "translateY(" + (-t * 40) + "px)";
    }

    // journey: fill the red line based on how far the timeline has scrolled through view
    if (timeline && timelineFill) {
      var r = timeline.getBoundingClientRect();
      var start = vh * 0.75;          // begin filling when top passes 75% of viewport
      var span = r.height + start - vh * 0.4;
      var p = (start - r.top) / span;
      p = Math.max(0, Math.min(1, p));
      timelineFill.style.height = (p * 100) + "%";
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
  update();
})();
