function initContactDial(e = document) {
  const t = e.querySelector(".anim-contact-dial--wrap");
  if (!t) return;
  gsap.matchMedia().add("(min-width: 992px)", () => {
    function e2(e3) {
      gsap.killTweensOf(e3), killTextTweens(e3), e3._split && (e3._split.revert(), delete e3._split);
    }
    function n(e3) {
      e3 && (gsap.killTweensOf(e3), killTextTweens(e3), gsap.to(getTextFeBlurs(e3), {
        attr: { stdDeviation: 50 },
        duration: durM,
        ease: "InOut"
      }), gsap.to(e3, {
        autoAlpha: 0,
        duration: durM,
        ease: "InOut",
        overwrite: "auto"
      }));
    }
    function o(t2, n2) {
      e2(t2), t2.textContent = n2, animateTextReveal(t2, "initial", 0), gsap.set(t2, { autoAlpha: 0 }), requestAnimationFrame(() => {
        g && (gsap.to(getTextFeBlurs(t2), {
          attr: { stdDeviation: 0 },
          duration: durM,
          ease: "InOut"
        }), gsap.to(t2, {
          autoAlpha: 1,
          duration: durM,
          ease: "InOut",
          overwrite: "auto"
        }));
      });
    }
    const i = t.querySelectorAll(".anim-contact-dial-item"), r = t.querySelector(".anim-contact-dial--text"), a = t.querySelector(".anim-contact-dial--logo"), s = t.querySelector(".dial-center");
    if (!r || !a) return;
    const l = {
      theme: "change theme",
      email: "send email",
      instagram: "open instagram",
      behance: "open behance",
      linkedin: "open linkedin"
    }, c = r.parentNode;
    "static" === getComputedStyle(c).position && (c.style.position = "relative");
    const d = r.cloneNode(false);
    removeAnimationMarker(d, "contact-dial"), c.appendChild(d);
    const u = [r, d];
    u.forEach(
      (e3) => gsap.set(e3, {
        display: "block",
        position: "absolute",
        top: "50%",
        left: "50%",
        xPercent: -50,
        yPercent: -50,
        autoAlpha: 0,
        pointerEvents: "none"
      })
    );
    let p = null, m = null, g = false, f = null;
    const h = /* @__PURE__ */ new Map(), v = /* @__PURE__ */ new Map();
    return i.forEach((e3) => {
      const t2 = getAnimationMarker(e3, "contact-dial-item"), r2 = () => {
        if (f && (clearTimeout(f), f = null), g = true, t2 === m && p)
          return;
        m = t2;
        const e4 = p === u[0] ? u[1] : u[0];
        n(p), o(e4, l[t2] ?? ""), p = e4, gsap.to(a, {
          opacity: 0,
          duration: durS,
          ease: "InOut",
          overwrite: "auto"
        });
      }, c2 = (e4) => {
        [...i].some(
          (t3) => t3 === e4.relatedTarget || t3.contains(e4.relatedTarget)
        ) || s && (s === e4.relatedTarget || s.contains(e4.relatedTarget)) || u.some(
          (t3) => t3 === e4.relatedTarget || t3.contains(e4.relatedTarget)
        ) || (f && clearTimeout(f), f = setTimeout(() => {
          f = null, g = false, m = null, n(p), p = null, gsap.to(a, {
            opacity: 1,
            duration: durS,
            ease: "InOut",
            overwrite: "auto"
          });
        }, 100));
      };
      e3.addEventListener("mouseenter", r2), e3.addEventListener("mouseleave", c2), h.set(e3, r2), v.set(e3, c2);
    }), () => {
      f && clearTimeout(f), i.forEach((e3) => {
        e3.removeEventListener("mouseenter", h.get(e3)), e3.removeEventListener("mouseleave", v.get(e3));
      }), u.forEach((e3) => {
        gsap.killTweensOf(e3), killTextTweens(e3), e3._split && (e3._split.revert(), delete e3._split);
      }), d.remove(), gsap.set([r, a], { clearProps: "all" });
    };
  });
}
