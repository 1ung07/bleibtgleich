function initCustomScrollbar() {
  const e = document.querySelector(".scrollbar-wrap"), t = e?.querySelector(".scrollbar-thumb");
  if (!e || !t) return;
  window._destroyCustomScrollbar && window._destroyCustomScrollbar();
  let n = gsap.matchMedia();
  n.add(`(min-width: ${breakPoint}px)`, () => {
    function n2(t2) {
      k !== t2 && (k = t2, gsap.to(e, { autoAlpha: t2 ? 0 : 1, duration: 0.3, overwrite: "auto" }));
    }
    function o() {
      clearTimeout(S), S = setTimeout(() => {
        E || _ || M || n2(true);
      }, A);
    }
    function i() {
      M || (n2(false), o());
    }
    function r() {
      return M = !lenis || lenis.limit <= 0 || lenis.isStopped, M && (clearTimeout(S), n2(true)), M;
    }
    function a() {
      b = e.clientHeight, r() || (w = t.offsetHeight, s());
    }
    function s() {
      if (!lenis || lenis.limit <= 0) return;
      const e2 = gsap.utils.clamp(0, 1, lenis.scroll / lenis.limit) * (b - w);
      E ? gsap.set(t, { y: e2 }) : L(e2);
    }
    function l() {
      window.__transitionRunning || (r(), M || i(), E || s());
    }
    function c(n3, o2) {
      const i2 = e.getBoundingClientRect(), r2 = parseFloat(getComputedStyle(e).paddingTop) || 0, a2 = gsap.utils.clamp(0, b - w, n3 - i2.top - r2 - x), s2 = b - w > 0 ? a2 / (b - w) : 0;
      gsap.set(t, { y: a2 }), lenis.scrollTo(s2 * lenis.limit, { immediate: o2 });
    }
    function d(e2) {
      if (window.__transitionRunning) return;
      if (k) return;
      E = true, clearTimeout(S);
      const n3 = gsap.getProperty(t, "y");
      L(n3, n3);
      const o2 = t.getBoundingClientRect();
      x = e2.clientY - o2.top, t.setPointerCapture(e2.pointerId), document.documentElement.classList.add("is-scrollbar-dragging"), e2.preventDefault();
    }
    function u(e2) {
      E && c(e2.clientY, true);
    }
    function p(e2) {
      if (!E) return;
      E = false, t.releasePointerCapture(e2.pointerId), document.documentElement.classList.remove("is-scrollbar-dragging");
      const n3 = gsap.getProperty(t, "y");
      L(n3, n3), o();
    }
    function m(e2) {
      if (window.__transitionRunning) return;
      if (k) return;
      if (e2.target === t || t.contains(e2.target)) return;
      x = w / 2, c(e2.clientY, false);
      const n3 = gsap.getProperty(t, "y");
      L(n3, n3), i();
    }
    function g() {
      _ = true, M || (clearTimeout(S), n2(false));
    }
    function f() {
      _ = false, E || o();
    }
    function h() {
      clearTimeout(T), T = setTimeout(a, 150);
    }
    function v() {
      a();
    }
    function y() {
      const e2 = M;
      r(), e2 && !M && i();
    }
    let w = 0, b = 0, E = false, _ = false, x = 0, T = null, S = null, k = null, M = false;
    const A = 1e3, L = gsap.quickTo(t, "y", { duration: 0.15, ease: "none" });
    return lenis.on("scroll", l), t.addEventListener("pointerdown", d), t.addEventListener("pointermove", u), t.addEventListener("pointerup", p), t.addEventListener("pointercancel", p), e.addEventListener("pointerdown", m), e.addEventListener("pointerenter", g), e.addEventListener("pointerleave", f), window.addEventListener("resize", h), window.addEventListener("lenis:settled", v), gsap.ticker.add(y), a(), r() || n2(true), () => {
      lenis.off("scroll", l), t.removeEventListener("pointerdown", d), t.removeEventListener("pointermove", u), t.removeEventListener("pointerup", p), t.removeEventListener("pointercancel", p), e.removeEventListener("pointerdown", m), e.removeEventListener("pointerenter", g), e.removeEventListener("pointerleave", f), window.removeEventListener("resize", h), window.removeEventListener("lenis:settled", v), gsap.ticker.remove(y), clearTimeout(T), clearTimeout(S), gsap.killTweensOf(e), document.documentElement.classList.remove("is-scrollbar-dragging");
    };
  }), window._destroyCustomScrollbar = () => {
    n.revert(), window._destroyCustomScrollbar = null;
  };
}
