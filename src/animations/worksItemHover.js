function initWorksItemHover(e = document) {
  const t = e.querySelectorAll(".anim-works-item--wrap");
  t.length && t.forEach((e2) => {
    const t2 = e2.querySelector(".anim-works-item--button");
    t2 && (gsap.set(t2, { bottom: "-2.222rem" }), e2.addEventListener("mouseenter", () => {
      gsap.to(t2, {
        bottom: "1.111rem",
        duration: durM,
        ease: "InOut",
        overwrite: "auto"
      });
    }), e2.addEventListener("mouseleave", () => {
      gsap.to(t2, {
        bottom: "-2.222rem",
        duration: durM,
        ease: "InOut",
        overwrite: "auto"
      });
    }));
  });
}
