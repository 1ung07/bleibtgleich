function initFilterTabs(e = document) {
  const t = e.querySelectorAll(".anim-filter-tab"), n = e.querySelectorAll(".anim-filter-content");
  if (!t.length || !n.length) return;
  const o = e.querySelector(".anim-globe--wrap"), i = "globe", r = "cards", a = (e2, t2) => {
    gsap.to(e2, { opacity: t2, duration: durS, ease: "Out" });
  }, s = Array.from(n).find((e2) => getAnimationMarker(e2, "filter-content") === r), l = Array.from(n).find((e2) => getAnimationMarker(e2, "filter-content") === i);
  if (s) {
    const e2 = s.querySelector(".anim-tab-content-reval--list");
    if (e2) {
      const t2 = Array.from(
        e2.querySelectorAll(".anim-tab-content-reval--item")
      );
      if (t2.length) {
        const n2 = e2.getBoundingClientRect(), o2 = n2.left + n2.width / 2, i2 = [], r2 = [];
        t2.forEach((e3) => {
          const t3 = e3.getBoundingClientRect();
          (t3.left + t3.width / 2 < o2 ? i2 : r2).push(e3);
        }), s._splitCache = { left: i2, right: r2 };
      }
    }
  }
  if (o && s) {
    const e2 = new IntersectionObserver(
      (t2) => {
        for (const n2 of t2)
          if (n2.isIntersecting) {
            o._globeEnsureInit?.(), e2.disconnect();
            break;
          }
      },
      { rootMargin: "50% 0% 50% 0%" }
    );
    e2.observe(s);
  }
  let c = null;
  const d = (e2, n2 = false) => {
    if (e2 !== c || n2) {
      if (c = e2, t.forEach((t2) => {
        const n3 = getAnimationMarker(t2, "filter-tab") === e2;
        t2.classList.toggle("is-active", n3), t2._isActive = n3, a(t2, n3 ? 1 : 0.4);
      }), n2)
        return e2 === i ? (s && (s.style.display = "none"), animateGlobe(o, "initial"), l && (l.style.display = "block"), requestAnimationFrame(() => animateGlobe(o, "reveal", 0))) : (l && (l.style.display = "none"), s && (s.style.display = "block")), void requestAnimationFrame(() => ScrollTrigger.refresh());
      e2 === i ? (animateGlobe(o, "initial"), l && (l.style.display = "block"), requestAnimationFrame(() => {
        animateGlobe(o, "reveal", 0), animateCardsSplit(s, "hide", 0, () => {
          s && c === i && (s.style.display = "none"), ScrollTrigger.refresh();
        });
      })) : e2 === r && (animateCardsSplit(s, "initial"), s && (s.style.display = "block"), requestAnimationFrame(() => {
        animateCardsSplit(s, "reveal", 0), animateGlobe(o, "hide", 0, () => {
          l && c === r && (l.style.display = "none"), ScrollTrigger.refresh();
        });
      }));
    }
  };
  t.forEach((e2) => {
    const t2 = () => d(getAnimationMarker(e2, "filter-tab")), n2 = () => a(e2, 1), o2 = () => {
      e2._isActive || a(e2, 0.4);
    };
    e2.addEventListener("click", t2), e2.addEventListener("mouseenter", n2), e2.addEventListener("mouseleave", o2), e2._filterHandler = t2, e2._filterEnter = n2, e2._filterLeave = o2;
  }), d(r, true);
}
