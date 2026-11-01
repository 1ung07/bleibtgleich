function cleanupGooFilters() {
  const e = document.querySelector("svg#goo-defs");
  e && e.querySelectorAll("filter").forEach((e2) => {
    [...document.querySelectorAll(".anim-filter-id")].some(
      (t) => t._animationFilterId === e2.id
    ) || e2.remove();
  });
}
function animateDivReveal(e, t, n) {
  const o = gsap.utils.toArray(e);
  if (o.length)
    switch (t) {
      case "initial":
        gsap.set(o, { opacity: 0, filter: "blur(20px)" });
        break;
      case "reveal":
        gsap.to(o, {
          opacity: 1,
          filter: "blur(0px)",
          duration: durL,
          delay: n ?? delayReveal,
          stagger,
          ease: "power2.out",
          overwrite: true
        });
        break;
      case "hide":
        gsap.to(o, {
          opacity: 0,
          filter: "blur(20px)",
          duration: durS,
          delay: n ?? 0,
          stagger: 0.5 * stagger,
          ease: "power2.in",
          overwrite: true
        });
    }
}
function animateLink(e, t, n, o, i) {
  const r = gsap.utils.toArray(e);
  r.length && r.forEach((e2, r2) => {
    if (e2._split && e2._split.revert(), e2._split = new SplitText(e2, {
      type: "lines,words,chars",
      tag: "span",
      linesClass: "split-line",
      wordsClass: "split-word",
      charsClass: "split-char"
    }), !e2._split.chars?.length)
      return;
    e2._split.lines.forEach((e3) => {
      e3.style.display = "block", e3.style.overflow = "clip";
    }), e2._split.words.forEach((e3) => {
      e3.style.overflow = "clip";
    });
    const a = e2._split.chars, s = o ?? gsap, l = i ?? ">", c = r2 * stagger;
    switch (t) {
      case "reveal":
        gsap.killTweensOf(a), s.fromTo(
          a,
          { yPercent: 100 },
          {
            yPercent: 0,
            duration: durS,
            delay: o ? 0 : (n ?? delayReveal) + c,
            stagger: { amount: 0.075 },
            ease: "InOut",
            overwrite: true
          },
          o ? l : void 0
        );
        break;
      case "hide":
        gsap.killTweensOf(a), s.to(
          a,
          {
            yPercent: -100,
            duration: durS,
            delay: o ? 0 : n ?? 0,
            stagger: { amount: 0.075 },
            ease: "InOut",
            overwrite: true
          },
          o ? l : void 0
        );
        break;
      case "initial":
        gsap.killTweensOf(a), gsap.set(a, { yPercent: 100 });
    }
  });
}
function animateClipReveal(e, t, n, o) {
  const i = gsap.utils.toArray(e);
  if (!i.length) return;
  const r = {
    "top-down": {
      hidden: "inset(0% 0% 100% 0%)",
      visible: "inset(0% 0% 0% 0%)"
    },
    "left-right": {
      hidden: "inset(0% 100% 0% 0%)",
      visible: "inset(0% 0% 0% 0%)"
    },
    "right-left": {
      hidden: "inset(0% 0% 0% 100%)",
      visible: "inset(0% 0% 0% 0%)"
    },
    "down-top": {
      hidden: "inset(100% 0% 0% 0%)",
      visible: "inset(0% 0% 0% 0%)"
    }
  }[t];
  if (r)
    switch (n) {
      case "initial":
        gsap.set(i, { clipPath: r.hidden, webkitClipPath: r.hidden });
        break;
      case "reveal":
        gsap.to(i, {
          clipPath: r.visible,
          webkitClipPath: r.visible,
          duration: durL,
          delay: o ?? delayReveal,
          stagger,
          ease: "power2.out",
          overwrite: true
        });
        break;
      case "hide":
        gsap.to(i, {
          clipPath: r.hidden,
          webkitClipPath: r.hidden,
          duration: durS,
          delay: o ?? 0,
          stagger: 0.5 * stagger,
          ease: "power2.in",
          overwrite: true
        });
    }
}
function initElementsReveal(e = document) {
  const t = e.querySelectorAll(".anim-reveal--text");
  t.length && t.forEach((e2) => {
    gsap.set(e2, { visibility: "visible" }), ScrollTrigger.create({
      trigger: e2,
      start: "top bottom",
      once: true,
      onEnter: () => animateTextReveal(e2, "reveal", 0.1)
    }), animateTextReveal(e2, "initial");
  });
  const n = {
    "clip-down": "top-down",
    "clip-left": "left-right",
    "clip-right": "right-left",
    "clip-top": "down-top"
  };
  Object.entries(n).forEach(([t2, n2]) => {
    const o2 = e.querySelectorAll(`.anim-reveal--${t2}`);
    o2.length && o2.forEach((e2) => {
      gsap.set(e2, { visibility: "visible" }), animateClipReveal(e2, n2, "initial"), ScrollTrigger.create({
        trigger: e2,
        start: "top bottom",
        once: true,
        onEnter: () => animateClipReveal(e2, n2, "reveal", 0.1)
      });
    });
  });
  const o = e.querySelectorAll(".anim-reveal--div");
  o.length && o.forEach((e2) => {
    const t2 = e2.closest(".anim-reveal--w");
    gsap.set(e2, { visibility: "visible" }), ScrollTrigger.create({
      trigger: t2 || e2,
      start: "top bottom",
      once: true,
      onEnter: () => animateDivReveal(e2, "reveal", 0.1)
    }), animateDivReveal(e2, "initial");
  });
  const i = e.querySelectorAll(".anim-contact-reveal--left"), r = e.querySelectorAll(".anim-contact-reveal--right"), a = e.querySelectorAll(".anim-contact-reveal--center"), s = (e2, t2) => e2.forEach((e3) => {
    gsap.killTweensOf(e3), gsap.set(e3, { visibility: "visible", ...t2.from }), ScrollTrigger.create({
      trigger: e3,
      start: "top 88%",
      once: true,
      onEnter: () => gsap.to(e3, t2.to)
    });
  });
  s(i, {
    from: { clipPath: "inset(0 0 0 100%)" },
    to: { clipPath: "inset(0 0 0 0%)", duration: durL, ease: "Out" }
  }), s(r, {
    from: { clipPath: "inset(0 100% 0 0)" },
    to: { clipPath: "inset(0 0% 0 0)", duration: durL, ease: "Out" }
  }), s(a, {
    from: { scale: 0, transformOrigin: "center center" },
    to: { scale: 1, duration: durM, ease: "Out" }
  });
  const l = e.querySelectorAll(".gallery-item");
  if (l.length) {
    const e2 = 12, t2 = 32, n2 = "__gallery-clips", o2 = "http://www.w3.org/2000/svg";
    let i2 = document.getElementById(n2);
    i2 || (i2 = document.createElementNS(o2, "svg"), i2.id = n2, i2.setAttribute(
      "style",
      "position:absolute;width:0;height:0;overflow:hidden"
    ), i2.appendChild(document.createElementNS(o2, "defs")), document.body.appendChild(i2));
    const r2 = i2.querySelector("defs");
    l.forEach((e3, t3) => {
      ["item", "img"].forEach((e4) => {
        if (document.getElementById(`gallery-cp-${e4}-${t3}`)) return;
        const n3 = document.createElementNS(o2, "clipPath");
        n3.id = `gallery-clip-${e4}-${t3}`, n3.setAttribute("clipPathUnits", "userSpaceOnUse");
        const i3 = document.createElementNS(o2, "path");
        i3.id = `gallery-cp-${e4}-${t3}`, n3.appendChild(i3), r2.appendChild(n3);
      });
    }), l.forEach((n3, o3) => {
      const i3 = n3.querySelector("img");
      if (!i3) return;
      gsap.set(n3, { visibility: "visible" });
      const r3 = document.getElementById(`gallery-cp-item-${o3}`), a2 = document.getElementById(`gallery-cp-img-${o3}`), s2 = { progress: 0 }, l2 = { progress: 0 }, c2 = Array.from({ length: e2 }, () => (2 * Math.random() - 1) * t2), d2 = () => ({ w: n3.offsetWidth, h: n3.offsetHeight }), u2 = (t3) => {
        const { w: n4, h: o4 } = d2(), i4 = t3 * o4, r4 = c2.map((e3) => i4 + e3 * Math.sin(t3 * Math.PI));
        let a3 = `M 0 ${r4[0]} C`;
        for (let t4 = 0; t4 < e2 - 1; t4++) {
          const o5 = (t4 + 1) / (e2 - 1) * n4, i5 = (t4 / (e2 - 1) * n4 + o5) / 2;
          a3 += ` ${i5} ${r4[t4]} ${i5} ${r4[t4 + 1]} ${o5} ${r4[t4 + 1]}`;
        }
        return a3 += " V 0 H 0 Z", a3;
      };
      n3.style.clipPath = `url(#gallery-clip-item-${o3})`, i3.style.clipPath = `url(#gallery-clip-img-${o3})`, gsap.set(i3, { visibility: "visible" }), r3.setAttribute("d", u2(0)), a2.setAttribute("d", u2(0)), gsap.killTweensOf([s2, l2]);
      const p = gsap.timeline({
        paused: true,
        defaults: { ease: "InOut", duration: durL }
      });
      p.to(s2, {
        progress: 1,
        onUpdate: () => r3.setAttribute("d", u2(s2.progress))
      }), p.to(
        l2,
        { progress: 1, onUpdate: () => a2.setAttribute("d", u2(l2.progress)) },
        0.1
      ), ScrollTrigger.create({
        trigger: n3,
        start: "top 90%",
        once: true,
        onEnter: () => p.play()
      });
    });
  }
  if (e.querySelector(".anim-barba-namespace--home")) {
    if (!window.__preloaderState.done) return;
    if ("home" === window.__preloaderState.startPage && window.__preloaderState.homeHandled)
      return void (window.__preloaderState.homeHandled = false);
    const t2 = e.querySelector(".anim-preloader--progress"), n2 = e.querySelector(".anim-preloader--text-1"), o2 = e.querySelectorAll(".anim-preloader--text-2");
    return gsap.set(t2, { height: "100%", visibility: "visible" }), gsap.set([n2, ...o2].filter(Boolean), { visibility: "visible" }), n2 && animateTextReveal(n2, "reveal", 0), o2.forEach((e2) => animateTextReveal(e2, "reveal", 0)), void gsap.fromTo(
      t2,
      { opacity: 0 },
      { opacity: 1, duration: durM, ease: "Out" }
    );
  }
  if (!e.querySelector(".anim-barba-namespace--works")) return;
  const c = e.querySelector(".works-overlay");
  if (!c) return;
  window.__holeIntroRunning = true, lenis.stop();
  const d = { progress: 0 }, u = () => {
    c.style.setProperty("--hole-progress", d.progress);
  };
  gsap.fromTo(
    d,
    { progress: 0 },
    {
      progress: 1,
      duration: durL,
      ease: "Out",
      onUpdate: u,
      onComplete: () => {
        window.__holeIntroRunning = false, initWorksIntroMask(e), hasScrollTrigger && ScrollTrigger.refresh(), lenis.start();
      }
    }
  );
}
