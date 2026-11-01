function getTextFeBlurs(e) {
  return gsap.utils.toArray(e).flatMap(
    (e2) => (e2._split?.lines ?? []).map(
      (e3) => document.querySelector(`#${e3._animationFilterId} feGaussianBlur`)
    ).filter(Boolean)
  );
}
function killTextTweens(e) {
  gsap.killTweensOf(getTextFeBlurs(e));
}
function animateTextReveal(e, t, n) {
  function o() {
    let e2 = document.querySelector("svg#goo-defs");
    return e2 || (e2 = document.createElementNS(a, "svg"), e2.setAttribute("id", "goo-defs"), e2.style.cssText = "position:absolute;width:0;height:0;overflow:hidden;", document.body.prepend(e2)), e2;
  }
  function i(e2) {
    if (e2._animationFilterId) return;
    const t2 = `goo-${Math.random().toString(36).substr(2, 9)}`;
    e2._animationFilterId = t2;
    e2.classList.add("anim-filter-id");
    const n2 = document.createElementNS(a, "filter");
    n2.setAttribute("id", t2), n2.setAttribute("x", "-25%"), n2.setAttribute("y", "-25%"), n2.setAttribute("width", "150%"), n2.setAttribute("height", "150%"), n2.setAttribute("color-interpolation-filters", "sRGB"), n2.innerHTML = `
      <feGaussianBlur in="SourceGraphic" stdDeviation="${s}" result="blur"></feGaussianBlur>
      <feColorMatrix in="blur" mode="matrix" values="${d(l, c)}" result="goo"></feColorMatrix>
    `, o().appendChild(n2), e2.style.filter = `url(#${t2})`;
  }
  const r = gsap.utils.toArray(e);
  if (!r.length) return;
  const a = "http://www.w3.org/2000/svg", s = 50, l = 20, c = -8, d = (e2, t2) => `1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 ${e2} ${t2}`, u = (e2) => document.querySelector(`#${e2._animationFilterId} feGaussianBlur`), p = (e2) => document.querySelector(`#${e2._animationFilterId} feColorMatrix`);
  r.forEach((e2, o2) => {
    "reveal" !== t && "initial" !== t || (e2.style.display = ""), e2._split || (e2._split = new SplitText(e2, { type: "lines" })), e2._split.lines.forEach(i);
    const r2 = o2 * stagger;
    e2._split.lines.length;
    switch (t) {
      case "initial":
        e2._split.lines.forEach((e3) => {
          const t2 = u(e3), n2 = p(e3);
          t2 && t2.setAttribute("stdDeviation", s), n2 && n2.setAttribute("values", d(l, c)), e3.style.filter = `url(#${e3._animationFilterId})`;
        });
        break;
      case "reveal": {
        gsap.set(e2, { autoAlpha: 1 });
        const t2 = gsap.timeline();
        e2._split.lines.forEach((e3, o3) => {
          const i2 = u(e3), a2 = p(e3);
          if (!i2 || !a2) return;
          i2.setAttribute("stdDeviation", s), a2.setAttribute("values", d(l, c)), e3.style.filter = `url(#${e3._animationFilterId})`;
          const m = 0 === o3 ? (n ?? delayReveal) + r2 : 0;
          t2.to(
            i2,
            {
              attr: { stdDeviation: 0 },
              duration: durL,
              delay: m,
              ease: "Out"
            },
            o3 * stagger
          );
          const g = { amp: l, off: c };
          t2.to(
            g,
            {
              amp: 1,
              off: 0,
              duration: 0.35 * durL,
              ease: "none",
              onUpdate: () => a2.setAttribute("values", d(g.amp, g.off)),
              onComplete: () => {
                a2.setAttribute("values", d(1, 0)), e3.style.filter = "";
              }
            },
            ">-" + 0.35 * durL
          );
        });
        break;
      }
      case "hide": {
        const t2 = gsap.timeline({
          onComplete: () => {
            gsap.set(e2, { autoAlpha: 0 }), e2.style.display = "none";
          }
        });
        e2._split.lines.forEach((e3, o3) => {
          const i2 = u(e3), r3 = p(e3);
          if (!i2 || !r3) return;
          i2.setAttribute("stdDeviation", 0), r3.setAttribute("values", d(1, 0)), e3.style.filter = `url(#${e3._animationFilterId})`;
          const a2 = 0 === o3 ? n ?? 0 : 0, m = { amp: 1, off: 0 };
          t2.to(
            m,
            {
              amp: l,
              off: c,
              duration: 0.3 * durS,
              delay: a2,
              ease: "none",
              onUpdate: () => r3.setAttribute("values", d(m.amp, m.off))
            },
            o3 * stagger * 0.5
          ), t2.to(
            i2,
            {
              attr: { stdDeviation: s },
              duration: durS,
              delay: a2,
              ease: "In"
            },
            o3 * stagger * 0.5
          );
        });
        break;
      }
    }
  });
}
