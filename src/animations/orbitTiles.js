function initOrbitTiles(e = document) {
  e.querySelectorAll(".anim-orbit-tiles-init").forEach((e2) => {
    function t() {
      return E.reduce(
        (e3, t2, n2) => Math.min(
          ((n2 - t2.progress) % d + d) % d,
          d - ((n2 - t2.progress) % d + d) % d
        ) < Math.min(
          ((e3 - E[e3].progress) % d + d) % d,
          d - ((e3 - E[e3].progress) % d + d) % d
        ) ? n2 : e3,
        0
      );
    }
    function n() {
      const e3 = t();
      e3 !== S && (S = e3, c.forEach((e4, t2) => {
        setAnimationMarker(
          e4,
          "orbit-tiles-item-status",
          t2 === S ? "active" : "not-active"
        );
      }));
    }
    function o() {
      const e3 = c[0].offsetWidth, t2 = e3 * u, o2 = e3 * p, i2 = e3 * m;
      n(), c.forEach((e4, n2) => {
        const r2 = (n2 - E[n2].progress) / d * Math.PI * 2, a2 = (Math.cos(r2) + 1) / 2, s2 = Math.pow(a2, 1.3), l2 = gsap.utils.interpolate(g, 1, s2), c2 = gsap.utils.interpolate(f, 1, s2), u2 = gsap.utils.interpolate(i2, 0, s2), p2 = gsap.utils.interpolate(h, 1, s2);
        gsap.set(e4, {
          x: Math.sin(r2) * t2,
          y: Math.cos(r2) * o2,
          scale: l2,
          opacity: c2,
          filter: `blur(${u2}px) brightness(${p2})`,
          zIndex: Math.round(1e3 * s2)
        });
      });
    }
    function i() {
      if (!T) return;
      const e3 = t(), n2 = E.map((t2, n3) => ({ state: t2, offset: (n3 - e3 + d) % d })).sort(
        (e4, t2) => e4.offset - t2.offset
      );
      _ = gsap.timeline({
        paused: true,
        onComplete: () => {
          T && (x = gsap.delayedCall(y, i));
        }
      }), n2.forEach(({ state: e4 }, t2) => {
        _.to(
          e4,
          {
            progress: e4.progress + 1,
            duration: v,
            ease: "osmo",
            onUpdate: o
          },
          t2 * w
        );
      }), _.play();
    }
    function r() {
      T = false, _ && _.pause(), x && x.pause(), k.forEach((e3) => e3.pause());
    }
    function a() {
      T = true, k.forEach((e3) => e3.play()), _ && _.progress() < 1 ? _.play() : i();
    }
    const s = e2.querySelector(".anim-orbit-tiles-collection") || (e2.matches(".anim-orbit-tiles-collection") ? e2 : null);
    s && gsap.set(s, { display: "flex" });
    const l = e2.querySelector(".anim-orbit-tiles-list"), c = e2.querySelectorAll(".anim-orbit-tiles-item"), d = c.length;
    if (d < 2) return;
    const u = 1, p = 0, m = 0.04, g = 0.2, f = 1, h = 0.3, v = 2.5, y = 0, w = 0.03 * v, b = 24, E = Array.from(c, () => ({ progress: 0 }));
    let _, x, T = false, S = -1;
    const k = l && 0 !== b ? [
      gsap.to(l, {
        rotate: 360,
        duration: b,
        ease: "none",
        repeat: -1,
        paused: true
      }),
      gsap.to(c, {
        rotate: -360,
        duration: b,
        ease: "none",
        repeat: -1,
        paused: true
      })
    ] : [];
    o(), y > 0 && new ResizeObserver(o).observe(e2), ScrollTrigger.create({
      trigger: e2,
      start: "top bottom",
      end: "bottom top",
      onToggle: (e3) => e3.isActive ? a() : r()
    });
  });
}
