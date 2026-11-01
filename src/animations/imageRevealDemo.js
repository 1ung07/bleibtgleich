function initImageRevealDemo(e = document) {
  const t = [...e.querySelectorAll(".demo-content")], n = [...e.querySelectorAll(".anim-demo")].filter(
    (e2) => ["reveal", "hide"].includes(getAnimationMarker(e2, "demo"))
  );
  if (!t.length || !n.length) return;
  window.__demoImageDestroy && window.__demoImageDestroy();
  const o = 12, i = 32, r = "http://www.w3.org/2000/svg", a = "__demo-clips";
  let s = document.getElementById(a);
  s || (s = document.createElementNS(r, "svg"), s.id = a, s.setAttribute(
    "style",
    "position:absolute;width:0;height:0;overflow:hidden"
  ), s.appendChild(document.createElementNS(r, "defs")), document.body.appendChild(s));
  const l = s.querySelector("defs");
  t.forEach((e2, t2) => {
    ["item", "img"].forEach((e3) => {
      if (document.getElementById(`demo-cp-${e3}-${t2}`)) return;
      const n2 = document.createElementNS(r, "clipPath");
      n2.id = `demo-clip-${e3}-${t2}`, n2.setAttribute("clipPathUnits", "userSpaceOnUse");
      const o2 = document.createElementNS(r, "path");
      o2.id = `demo-cp-${e3}-${t2}`, n2.appendChild(o2), l.appendChild(n2);
    });
  });
  const c = [];
  if (t.forEach((e2, t2) => {
    const n2 = e2.querySelector("img");
    if (!n2) return;
    const r2 = document.getElementById(`demo-cp-item-${t2}`), a2 = document.getElementById(`demo-cp-img-${t2}`), s2 = { progress: 0 }, l2 = { progress: 0 }, d2 = Array.from({ length: o }, () => (2 * Math.random() - 1) * i), u2 = (t3) => {
      const n3 = e2.offsetWidth, i2 = e2.offsetHeight, r3 = t3 * i2, a3 = d2.map((e3) => r3 + e3 * Math.sin(t3 * Math.PI));
      let s3 = `M 0 ${a3[0]} C`;
      for (let e3 = 0; e3 < o - 1; e3++) {
        const t4 = (e3 + 1) / (o - 1) * n3, i3 = (e3 / (o - 1) * n3 + t4) / 2;
        s3 += ` ${i3} ${a3[e3]} ${i3} ${a3[e3 + 1]} ${t4} ${a3[e3 + 1]}`;
      }
      return s3 += " V 0 H 0 Z", s3;
    };
    e2.style.clipPath = `url(#demo-clip-item-${t2})`, n2.style.clipPath = `url(#demo-clip-img-${t2})`, gsap.set([e2, n2], { visibility: "visible" }), r2.setAttribute("d", u2(0)), a2.setAttribute("d", u2(0)), gsap.killTweensOf([s2, l2]);
    const p = gsap.timeline({
      paused: true,
      defaults: { ease: "InOut", duration: durL }
    });
    p.to(s2, {
      progress: 1,
      onUpdate: () => r2.setAttribute("d", u2(s2.progress))
    }), p.to(
      l2,
      { progress: 1, onUpdate: () => a2.setAttribute("d", u2(l2.progress)) },
      0.1
    ), p.progress(1).pause(), c.push(p);
  }), !c.length)
    return;
  let d = true;
  const u = (e2) => {
    const t2 = "reveal" === getAnimationMarker(e2.currentTarget, "demo");
    d !== t2 && (d = t2, c.forEach((e3) => t2 ? e3.play() : e3.reverse()));
  };
  n.forEach((e2) => e2.addEventListener("click", u)), window.__demoImageDestroy = () => {
    n.forEach((e2) => e2.removeEventListener("click", u)), c.forEach((e2) => e2.kill()), t.forEach((e2, t2) => {
      e2.style.clipPath = "";
      const n2 = e2.querySelector("img");
      n2 && (n2.style.clipPath = ""), ["item", "img"].forEach((e3) => {
        document.getElementById(`demo-clip-${e3}-${t2}`)?.remove();
      });
    }), window.__demoImageDestroy = null;
  };
}
