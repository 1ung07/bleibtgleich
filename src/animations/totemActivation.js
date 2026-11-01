function initTotemActivation(e = document) {
  const t = e.querySelector(".totem-wrap"), n = e.querySelectorAll(".anim-theme-mode");
  if (!t || !n.length) return;
  const o = 10;
  gsap.set(t, {
    transformPerspective: 600,
    transformOrigin: "50% 50%",
    force3D: true
  });
  let i = null;
  const r = () => {
    i && i.kill(), gsap.killTweensOf(t);
    const e2 = { ticks: 40 };
    gsap.set(t, { display: "block", opacity: 1 }), i = gsap.to(e2, {
      ticks: 0,
      duration: 2,
      ease: "none",
      onUpdate: () => {
        const n2 = e2.ticks / 40, i2 = n2 * n2, r2 = n2 * i2, a = (10.25 * r2 * i2 - 24.95 * i2 * i2 + 25.5 * r2 - 13.8 * i2 + 4 * n2) * Math.PI, s = (50 + 175 * Math.sin(a)) / 225, l = 1 - n2, c = o * Math.sin(l * Math.PI * 2) * Math.sin(l * Math.PI);
        gsap.set(t, {
          scale: Math.max(s, 1e-3),
          rotationY: 720 * Math.abs(Math.sin(a)),
          rotationZ: c
        });
      },
      onComplete: () => {
        gsap.set(t, { display: "none", clearProps: "transform,opacity" }), i = null;
      }
    });
  };
  n.forEach((e2) => {
    e2.addEventListener("click", r);
  });
}
