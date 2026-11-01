function initWorksIntroMask(e = document, t = null) {
  const n = e.querySelector(".works-overlay"), o = e.querySelector(".anim-works-intro--trigger"), i = e.querySelector(".anim-works-intro--out"), r = e.querySelector(".anim-works-intro--left-text"), a = e.querySelector(".anim-works-intro--right-text");
  if (!n || !o || !i) return;
  const s = window.matchMedia("(max-width: 991px)").matches, l = getComputedStyle(n), c = (e2) => {
    const t2 = document.createElement("div");
    t2.style.width = e2, document.body.appendChild(t2);
    const n2 = parseFloat(getComputedStyle(t2).width);
    return document.body.removeChild(t2), n2;
  };
  let d, u;
  if (s) d = c("60.305rem"), u = c("83.46rem");
  else {
    d = 4 * c(l.getPropertyValue("--_special-units---1-cell").trim()) + 3 * c(l.getPropertyValue("--_special-units---grid-gap").trim()), u = 0.6 * window.innerHeight;
  }
  const p = d / 2, m = u / 2, g = (e2, t2) => {
    n.style.clipPath = `polygon(evenodd, 0% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%, calc(50% - ${e2}px) calc(50% - ${t2}px), calc(50% + ${e2}px) calc(50% - ${t2}px), calc(50% + ${e2}px) calc(50% + ${t2}px), calc(50% - ${e2}px) calc(50% + ${t2}px), calc(50% - ${e2}px) calc(50% - ${t2}px))`;
  }, f = () => n.offsetWidth / 2, h = () => n.offsetHeight / 2, v = () => t ? t.xOff : p, y = () => t ? t.yOff : m, w = (e2) => {
    const t2 = v(), n2 = y();
    g(t2 + (f() - t2) * e2, n2 + (h() - n2) * e2), r && gsap.set(r, { x: -50 * e2 + "vw" }), a && gsap.set(a, { x: 50 * e2 + "vw" });
  }, b = (e2) => {
    g(f() + (p - f()) * e2, h() + (m - h()) * e2);
  };
  ScrollTrigger.create({
    trigger: o,
    start: "center center",
    end: "top top",
    scrub: true,
    onUpdate: (e2) => w(e2.progress)
  }), ScrollTrigger.create({
    trigger: i,
    start: "top bottom",
    end: "bottom bottom",
    scrub: true,
    onUpdate: (e2) => b(e2.progress)
  });
}
