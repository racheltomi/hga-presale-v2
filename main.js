/* HGA Founder's Launch — V2 interactions: deliberately minimal */
(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];

  /* Gentle fade-in on scroll */
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add("in");
      io.unobserve(e.target);
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -5% 0px" });
  $$(".fade").forEach((el) => io.observe(el));

  /* Nav hairline + mobile sticky CTA */
  const nav = $("#nav");
  const sticky = $("#stickyCta");
  const hero = $(".hero");
  const pricing = $("#pricing");
  const onScroll = () => {
    nav.classList.toggle("scrolled", scrollY > 8);
    const pr = pricing.getBoundingClientRect();
    const inPricing = pr.top < innerHeight && pr.bottom > 0;
    sticky.classList.toggle("show", hero.getBoundingClientRect().bottom < 0 && !inPricing);
  };
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* Video modal (placeholder) */
  const modal = $("#videoModal");
  let opener = null;
  const close = () => { modal.hidden = true; document.body.style.overflow = ""; opener && opener.focus(); };
  $$("[data-open-video]").forEach((btn) => btn.addEventListener("click", () => {
    opener = btn;
    modal.hidden = false;
    document.body.style.overflow = "hidden";
    $(".modal-x", modal).focus();
  }));
  $$("[data-close]", modal).forEach((el) => el.addEventListener("click", close));
  addEventListener("keydown", (e) => { if (e.key === "Escape" && !modal.hidden) close(); });
})();
