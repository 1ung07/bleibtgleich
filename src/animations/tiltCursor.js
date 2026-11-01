function initTiltCursor() {
  const e = document.querySelectorAll(".anim-tilt--wrap");
  if (!e.length) return;
  const t = 25, n = 40;
  const mediaQuery = gsap.matchMedia();
  mediaQuery.add("(min-width: 992px)", () => {
    const o = [];
    return e.forEach((e2) => {
      const i = e2.querySelector(".anim-tilt--card");
      if (!i) return;
      gsap.set(i, {
        transformPerspective: 1e3,
        transformStyle: "preserve-3d"
      });
      const r = gsap.quickTo(i, "rotationX", {
        duration: 0.6,
        ease: "power3.out"
      }), a = gsap.quickTo(i, "rotationY", {
        duration: 0.6,
        ease: "power3.out"
      }), s = (o2) => {
        const i2 = e2.getBoundingClientRect(), s2 = (o2.clientX - i2.left) / i2.width, l2 = (o2.clientY - i2.top) / i2.height;
        a(gsap.utils.mapRange(0, 1, -n, n, s2)), r(gsap.utils.mapRange(0, 1, t, -t, l2));
      }, l = () => {
        r(0), a(0);
      };
      e2.addEventListener("mousemove", s), e2.addEventListener("mouseleave", l), o.push(() => {
        e2.removeEventListener("mousemove", s), e2.removeEventListener("mouseleave", l), gsap.set(i, { clearProps: "transform" });
      });
    }), () => o.forEach((e2) => e2());
  });
  return () => mediaQuery.revert();
}
