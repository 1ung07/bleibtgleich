function initDialOverlay(e = document) {
  const t = e.querySelector(".anim-contact-dial--overlay");
  if (!t) return;
  const n = e.querySelector(".dial-decor"), o = 60, i = -5;
  let r = null;
  gsap.matchMedia().add(
    `(min-width: ${breakPoint}px)`,
    () => (gsap.set(t, { rotation: 0, transformOrigin: "50% 50%" }), n && gsap.set(n, { rotation: 0, transformOrigin: "50% 50%" }), [r] = Draggable.create(t, {
      type: "rotation",
      inertia: false,
      bounds: { minRotation: 0, maxRotation: o },
      onDrag() {
        n && gsap.set(n, { rotation: this.rotation / o * i });
      },
      onDragEnd() {
        gsap.to(t, {
          rotation: 0,
          duration: durM,
          ease: "Out",
          overwrite: "auto"
        }), n && gsap.to(n, {
          rotation: 0,
          duration: durM,
          ease: "Out",
          overwrite: "auto"
        });
      }
    }), () => {
      r && r.kill(), r = null, gsap.killTweensOf(t), gsap.set(t, { clearProps: "transform" }), n && (gsap.killTweensOf(n), gsap.set(n, { clearProps: "transform" }));
    })
  );
}
