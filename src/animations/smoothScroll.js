function initLenis() {
  lenis && (lenis.destroy(), lenis = null), lenisTickerFn && (gsap.ticker.remove(lenisTickerFn), lenisTickerFn = null), lenis = new Lenis({
    wrapper: window,
    duration: 1.2,
    smoothWheel: true,
    touchMultiplier: 2,
    easing: (e) => Math.min(1, 1.001 - Math.pow(2, -10 * e)),
    infinite: false
  }), lenis.on("scroll", ScrollTrigger.update), lenisTickerFn = (e) => lenis.raf(1e3 * e), gsap.ticker.add(lenisTickerFn), gsap.ticker.lagSmoothing(0);
}
