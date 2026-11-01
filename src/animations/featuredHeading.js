function initFeaturedHeadingWidth(e = document) {
  const t = e.querySelector(".anim-featured--heading"), n = e.querySelector(".anim-featured--globe"), o = e.querySelectorAll(".anim-featured--text"), i = e.querySelectorAll(".anim-featured--link");
  if (!t || !n) return;
  const r = t.scrollWidth, a = t.parentElement.offsetWidth;
  gsap.set(t, { width: r }), gsap.timeline({
    scrollTrigger: {
      trigger: n,
      start: "top 75%",
      end: "bottom 25%",
      scrub: true,
      onUpdate(e2) {
        e2.progress >= 0.99 ? (o.forEach((e3) => e3.style.display = "none"), i.forEach((e3) => e3.style.display = "block"), t.style.flexDirection = "column", t.style.alignItems = "center", t.style.justifyContent = "center") : (o.forEach((e3) => e3.style.display = ""), i.forEach((e3) => e3.style.display = "none"), t.style.flexDirection = "", t.style.alignItems = "", t.style.justifyContent = "space-between");
      }
    }
  }).to(t, { width: a, ease: "none" }).to(t, { width: r, ease: "none" });
}
function initFeaturedHeadingHeightMobile(e = document) {
  const t = e.querySelector(".anim-m-data-featured--wrap"), n = e.querySelector(".anim-m-data-featured--heading"), o = e.querySelector(".anim-m-data-featured--list"), i = e.querySelectorAll(".anim-m-data-featured--text"), r = e.querySelectorAll(".anim-m-data-featured--link");
  if (!t || !n || !o) return;
  const a = n.scrollHeight;
  gsap.set(n, { height: a }), gsap.set(o, { xPercent: 100 }), gsap.fromTo(
    o,
    { xPercent: 100 },
    {
      xPercent: 0,
      ease: "none",
      scrollTrigger: {
        trigger: t,
        start: "top bottom",
        end: "top top",
        scrub: true
      }
    }
  ), gsap.timeline({
    scrollTrigger: {
      trigger: t,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate(e2) {
        e2.progress >= 0.99 ? (i.forEach((e3) => e3.style.display = "none"), r.forEach((e3) => e3.style.display = "block")) : (i.forEach((e3) => e3.style.display = ""), r.forEach((e3) => e3.style.display = "none"));
      }
    }
  }).to(o, { xPercent: -100, duration: 0.8, ease: "none" }, 0).to(n, { height: 0.12 * a, duration: 1, ease: "none" }, 0.28);
}
