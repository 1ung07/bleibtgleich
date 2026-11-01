function initDevGrid() {
  const e = document.querySelector(".nav-grid"), t = document.querySelector(".grid-wrap"), n = document.querySelectorAll(".grid-column");
  if (!e || !t || !n.length) return;
  const o = gsap.timeline({
    paused: true,
    onStart: () => {
      t.style.display = "flex";
    },
    onReverseComplete: () => {
      t.style.display = "none";
    }
  });
  o.fromTo(
    n,
    { width: 0 },
    { width: "11.25rem", duration: durS, ease: "InOut" }
  );
  const i = () => o.reversed() || o.paused() && 0 === o.progress() ? o.play() : o.reverse();
  return e.addEventListener("click", i), () => {
    e.removeEventListener("click", i), o.kill(), gsap.set(n, { clearProps: "width" }), t.style.display = "none";
  };
}
