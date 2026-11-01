function initLogoMorph(e = document) {
  const t = e.querySelector(".anim-morph-final");
  if (!t) return;
  let n = t._morphFinal;
  n || (n = t.getAttribute("d"), t._morphFinal = n);
  const o = "M0 0 L95 0 L95 160 L0 160 Z", i = e.querySelector(".icon-wrap");
  i && (gsap.killTweensOf([t, i]), gsap.set(t, { attr: { d: o } }), gsap.set(i, { visibility: "visible", clipPath: "inset(0% 0% 100% 0%)" }), gsap.to(i, {
    clipPath: "inset(0% 0% 0% 0%)",
    duration: durM,
    ease: "Out",
    onComplete: () => {
      gsap.to(t, { morphSVG: n, duration: durL, ease: "Out" });
    }
  }));
}
