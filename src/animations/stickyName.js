function stickyNameOnLeave(e) {
  if (!stickyName.tl || !stickyName.triggered) return;
  const t = !!e.querySelector(".anim-barba-namespace--archive") || "archive" === getAnimationMarker(e, "barba-namespace");
  if (!(e.scrollHeight > window.innerHeight + 2) && !t) return;
  stickyName.triggered = false;
  const n = document.querySelectorAll(".anim-sticky-meta--text");
  killTextTweens(n), animateTextReveal(n, "hide"), stickyName.tl.reverse();
}
function initStickyNameReveal() {
  const e = document.querySelector(".sticky-name-inner"), t = document.querySelectorAll(".anim-sticky-meta--text");
  if (!e) return;
  const n = e.closest(".sticky-name-wrap") || e.parentElement;
  if (!!document.querySelector(".anim-barba-namespace--archive"))
    return gsap.set(n, { position: "fixed", bottom: 0, left: 0, right: 0 }), void requestAnimationFrame(() => lenis.resize());
  if (gsap.set(n, { clearProps: "position,bottom,left,right" }), stickyName.inner === e && stickyName.checkBottom)
    return void gsap.delayedCall(0.15, stickyName.checkBottom);
  stickyName.scrollHandler && lenis.off("scroll", stickyName.scrollHandler), stickyName.settledHandler && window.removeEventListener("lenis:settled", stickyName.settledHandler), stickyName.waitInterval && clearInterval(stickyName.waitInterval), stickyName.tl?.kill(), gsap.killTweensOf(e), gsap.set(e, { clearProps: "width" }), stickyName = {
    inner: e,
    tl: null,
    scrollHandler: null,
    settledHandler: null,
    waitInterval: null,
    triggered: false,
    checkBottom: null
  }, gsap.set(e, { opacity: 0 }), animateTextReveal(t, "hide");
  const o = () => {
    if (!stickyName.tl) return;
    if (window.__transitionRunning || window.__preloaderRunning) return;
    if (document.querySelector(".anim-barba-namespace--archive"))
      return void (stickyName.triggered && (stickyName.triggered = false, killTextTweens(t), animateTextReveal(t, "hide"), stickyName.tl.reverse()));
    const e2 = lenis.limit, n2 = e2 <= 2 || lenis.scroll >= e2 - 2;
    n2 && !stickyName.triggered ? (stickyName.triggered = true, stickyName.tl.play()) : !n2 && stickyName.triggered && (stickyName.triggered = false, killTextTweens(t), animateTextReveal(t, "hide"), stickyName.tl.reverse());
  };
  stickyName.checkBottom = o;
  const i = () => {
    gsap.set(e, { opacity: 1 }), gsap.set(t, { visibility: "visible" }), animateTextReveal(t, "initial"), stickyName.tl = gsap.timeline({
      paused: true,
      onReverseComplete: () => {
        killTextTweens(t), animateTextReveal(t, "initial");
      }
    }).fromTo(
      e,
      { width: "100%" },
      { width: "29.45rem", duration: durM, ease: "InOut" }
    ).fromTo(
      e,
      { opacity: 0.1 },
      { opacity: 1, duration: durS, ease: "InOut" },
      `-=${durS}`
    ).add(() => {
      killTextTweens(t), animateTextReveal(t, "reveal", 0);
    }), stickyName.tl.progress(0).pause(), stickyName.scrollHandler = () => o(), lenis.on("scroll", stickyName.scrollHandler), stickyName.settledHandler = o, window.addEventListener("lenis:settled", stickyName.settledHandler), gsap.delayedCall(0.15, o);
  }, r = () => window.__preloaderState?.done && !window.__transitionRunning;
  r() ? i() : stickyName.waitInterval = setInterval(() => {
    r() && (clearInterval(stickyName.waitInterval), stickyName.waitInterval = null, i());
  }, 50);
}
