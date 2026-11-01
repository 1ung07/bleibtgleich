function initGlobe(e = document) {
  const t = e.querySelector(".anim-globe--wrap");
  if (!t) return;
  if (window.matchMedia("(max-width: 991px)").matches)
    return t._globeEnsureInit = null, void (t._globeDestroy = () => {
    });
  const n = !!e.querySelector(".anim-filter-tab");
  let o = false, i = null;
  const r = () => {
    o || (o = true, i?.disconnect(), i = null, _initGlobeReal(t, e), n || requestAnimationFrame(() => {
      t._globeAnimate?.("reveal", 0);
    }));
  };
  t._globeEnsureInit = r, n || (i = new IntersectionObserver(
    (e2) => {
      for (const t2 of e2)
        if (t2.isIntersecting) {
          r();
          break;
        }
    },
    { rootMargin: "50% 0% 50% 0%" }
  ), i.observe(t)), t._globeDestroy = () => {
    i?.disconnect();
  };
}
function _initGlobeReal(e, t) {
  function n(e2) {
    const t2 = [], n2 = Math.PI * (3 - Math.sqrt(5));
    for (let o2 = 0; o2 < e2; o2++) {
      const i2 = 1 - o2 / (e2 - 1) * 2, r2 = Math.sqrt(1 - i2 * i2), a2 = n2 * o2;
      t2.push(new h.Vector3(Math.cos(a2) * r2, i2, Math.sin(a2) * r2));
    }
    return t2;
  }
  function o(e2) {
    return 0.5 * (Math.sin(e2 * Math.PI * 2) + 1);
  }
  function i(e2, t2 = 1024) {
    const n2 = e2.srcset || "";
    if (!n2) return e2.src || e2.dataset.src;
    const o2 = n2.split(",").map((e3) => {
      const [t3, n3] = e3.trim().split(/\s+/);
      return { url: t3, w: parseInt(n3) || 0 };
    }).filter((e3) => e3.w > 0).sort((e3, t3) => e3.w - t3.w), i2 = o2.find((e3) => e3.w >= t2) || o2[o2.length - 1];
    return i2 ? i2.url : e2.src || e2.dataset.src;
  }
  function r() {
    for (; ve < $ && he.length; ) {
      const e2 = he.shift();
      ve++, e2(() => {
        ve--, requestAnimationFrame(r);
      });
    }
  }
  function a(e2, t2, n2, o2) {
    e2.anisotropy = Math.min(4, w.capabilities.getMaxAnisotropy()), e2.generateMipmaps = true, e2.minFilter = h.LinearMipmapLinearFilter;
    const i2 = e2.image.width || 1600, r2 = e2.image.height || 900, a2 = _, s2 = _ / (i2 / r2), l2 = t2.clone().multiplyScalar(x), c2 = new h.PlaneGeometry(a2, s2), d2 = new h.MeshBasicMaterial({
      map: e2,
      transparent: true,
      side: h.DoubleSide
    });
    d2.onBeforeCompile = (e3) => {
      e3.fragmentShader = e3.fragmentShader.replace(
        "#include <map_fragment>",
        "\n        vec2 mapUv = vUv;\n        if (!gl_FrontFacing) { mapUv.x = 1.0 - mapUv.x; }\n        vec4 sampledDiffuseColor = texture2D(map, mapUv);\n        diffuseColor *= sampledDiffuseColor;\n        "
      );
    };
    const u2 = new h.Mesh(c2, d2);
    u2.position.copy(l2), u2.lookAt(0, 0, 0), u2.rotateY(Math.PI), u2.frustumCulled = false, u2.scale.setScalar(0), u2.visible = false, te.add(u2);
    try {
      w.initTexture(e2);
    } catch (e3) {
    }
    try {
      w.compile(b, E);
    } catch (e3) {
    }
    const p2 = {
      mesh: u2,
      mat: d2,
      slug: n2,
      origPos: l2.clone(),
      origDir: l2.clone().normalize(),
      origQuat: u2.quaternion.clone(),
      _t: 0,
      liftT: 0,
      pinned: false,
      inOverlay: false,
      snapPos: new h.Vector3(),
      snapQuat: new h.Quaternion(),
      hoverable: false,
      cooldown: 0,
      revealT: 0
    };
    "shown" === Be ? (p2.revealT = 1, p2.mesh.visible = true) : "revealing" === Be && (p2.mesh.visible = true, gsap.to(p2, { revealT: 1, duration: z, ease: "Out", overwrite: true }));
    const m2 = h.Mesh.prototype.raycast;
    u2.raycast = function(e3, t3) {
      p2.hoverable && m2.call(this, e3, t3);
    }, oe.push(p2), ie = oe.map((e3) => e3.mesh), o2();
  }
  function s() {
    const e2 = x + 0.6 * _, t2 = E.fov * Math.PI / 180, n2 = 2 * Math.atan(Math.tan(t2 / 2) * E.aspect);
    E.position.z = 1.08 * Math.max(e2 / Math.tan(t2 / 2), e2 / Math.tan(n2 / 2));
  }
  function l(e2) {
    e2.inOverlay || (e2.mesh.getWorldPosition(e2.snapPos), e2.mesh.getWorldQuaternion(e2.snapQuat), te.remove(e2.mesh), e2.mesh.position.copy(e2.snapPos), e2.mesh.quaternion.copy(e2.snapQuat), e2.mesh.scale.setScalar(1), ne.add(e2.mesh), e2.inOverlay = true);
  }
  function c(e2) {
    e2.inOverlay && (ne.remove(e2.mesh), e2.mesh.position.copy(e2.origPos), e2.mesh.quaternion.copy(e2.origQuat), e2.mesh.scale.setScalar(1), e2.mesh.renderOrder = 0, e2.mat.depthTest = true, e2._t = 0, e2.cooldown = P, te.add(e2.mesh), e2.inOverlay = false);
  }
  function d() {
    we && (we.pinned = false, we = null);
  }
  function u() {
    d(), ce(), Re = 0, Se = 0;
  }
  function p() {
    He = requestAnimationFrame(p);
    const t2 = Math.min($e.getDelta(), 0.05), n2 = Math.min(1, 60 * t2);
    ze += t2 * q, _e || Ae || we ? (Se = 0, Te = 0) : (Se += t2, Se > R / 1e3 && (Te = C)), xe += (Te - xe) * (Ae ? 0.18 : 0.03) * n2, Re *= Math.pow(Ae ? A : L, n2), Pe += (Re + xe) * n2, te.rotation.y = Pe, j.y = Pe, G.setFromEuler(j), Q.copy(G).invert();
    let i2 = null;
    if (_e && !Ae && "shown" === Be && ie.length) {
      be.setFromCamera(Ee, E);
      const e2 = be.intersectObjects(ie, false);
      e2.length && (i2 = oe.find((t3) => t3.mesh === e2[0].object));
    }
    const r2 = Ae ? "grabbing" : i2 ? "pointer" : "grab";
    r2 !== Ue && (e.style.cursor = r2, Ue = r2);
    for (let e2 = 0; e2 < oe.length; e2++) {
      const r3 = oe[e2];
      r3.cooldown > 0 && (r3.cooldown = Math.max(0, r3.cooldown - t2));
      const a2 = r3.revealT, s2 = a2 < 1, d2 = r3 === i2 && !r3.pinned && 0 === r3.cooldown && !s2, u2 = r3.pinned;
      u2 && !r3.inOverlay && l(r3), !u2 && r3.inOverlay && 0 === r3.liftT && c(r3);
      const p2 = u2 ? 1 : 0;
      if (r3.liftT += 0.12 * (p2 - r3.liftT) * n2, 0 === p2 && r3.liftT < 5e-3 ? r3.liftT = 0 : 1 === p2 && r3.liftT > 0.995 && (r3.liftT = 1), r3.inOverlay) {
        const e3 = r3.origPos.y * F, t3 = o(ze + e3) * I;
        B.copy(r3.origPos).addScaledVector(r3.origDir, t3).applyQuaternion(G), Y.copy(r3.origQuat).premultiply(G);
        const i3 = u2 ? r3.snapPos : B, a3 = u2 ? r3.snapQuat : Y;
        X.lerpVectors(i3, J, r3.liftT), r3.mesh.position.copy(X), V.slerpQuaternions(a3, ee, r3.liftT), r3.mesh.quaternion.copy(V);
        const s3 = 1 + (S - 1) * r3.liftT;
        if (r3.mesh.scale.setScalar(s3), r3.mesh.renderOrder = u2 ? O : D, r3.mat.depthTest = false, r3.hoverable = false, u2)
          r3.mat.opacity = 1;
        else {
          Z.copy(K).applyQuaternion(r3.origQuat).applyQuaternion(G), W.copy(E.position).normalize();
          const e4 = Z.dot(W), t4 = e4 > 0.25 ? 1 : e4 > 0 ? 0.1 + e4 / 0.25 * 0.9 : 0.1, o2 = r3.liftT + t4 * (1 - r3.liftT);
          r3.mat.opacity += 0.12 * (o2 - r3.mat.opacity) * n2;
        }
      } else {
        r3._t += 0.1 * ((d2 ? 1 : 0) - r3._t) * n2, r3._t > 1e-3 ? (Y.copy(E.quaternion).premultiply(Q), r3.mesh.quaternion.slerpQuaternions(r3.origQuat, Y, r3._t)) : r3.mesh.quaternion.copy(r3.origQuat);
        const e3 = r3.origPos.y * F, t3 = o(ze + e3) * I;
        B.copy(r3.origPos).addScaledVector(r3.origDir, t3).multiplyScalar(a2), r3.mesh.position.copy(B), r3.mesh.scale.setScalar(a2), r3.mesh.renderOrder = 0, r3.mat.depthTest = true, Z.copy(K).applyQuaternion(r3.mesh.quaternion).applyQuaternion(G), W.copy(E.position).normalize();
        const i3 = Z.dot(W), l2 = (i3 > 0.25 ? 1 : i3 > 0 ? 0.1 + i3 / 0.25 * 0.9 : 0.1) * a2;
        s2 ? (r3.mat.opacity = l2, r3.hoverable = false) : (r3.hoverable = i3 > 0.05 && 0 === r3.cooldown && "shown" === Be, r3.mat.opacity += 0.1 * (l2 - r3.mat.opacity) * n2);
      }
    }
    w.render(b, E);
  }
  function m() {
    null === He && ($e.getDelta(), p());
  }
  function g() {
    null !== He && (cancelAnimationFrame(He), He = null);
  }
  function f() {
    We && (We.kill(), We = null);
  }
  const h = window.THREE;
  if (!h) return;
  const v = () => e.clientWidth, y = () => e.clientHeight, w = new h.WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: "high-performance"
  });
  w.setPixelRatio(Math.min(devicePixelRatio, 2)), w.setClearColor(0, 0), w.setSize(Math.max(v(), 1), Math.max(y(), 1)), e.appendChild(w.domElement), Object.assign(w.domElement.style, {
    position: "absolute",
    inset: "0",
    width: "100%",
    height: "100%",
    display: "block"
  }), e.style.cursor = "grab";
  const b = new h.Scene(), E = new h.PerspectiveCamera(
    48,
    Math.max(v(), 1) / Math.max(y(), 1),
    0.1,
    1e3
  ), _ = 0.4, x = 1.85, T = 1.8, S = 3.2, k = 0.11, M = 0.013, A = 0.9, L = 0.94, C = 3e-3, R = 1e3, P = 0.4, I = 0.1, q = 0.1, F = 1.5, O = 999, D = 500, $ = 3, z = 1.4, H = 0.015, U = 0.6, N = 8e-3, B = new h.Vector3(), X = new h.Vector3(), W = new h.Vector3(), Y = new h.Quaternion(), V = new h.Quaternion(), G = new h.Quaternion(), Q = new h.Quaternion(), j = new h.Euler(0, 0, 0, "YXZ"), Z = new h.Vector3(), K = new h.Vector3(0, 0, 1), J = new h.Vector3(0, 0, T), ee = new h.Quaternion(), te = new h.Group(), ne = new h.Group();
  b.add(te, ne);
  const oe = [];
  let ie = [];
  const re = Array.from(t.querySelectorAll(".anim-works-info")), ae = (e2) => re.find((t2) => (getAnimationMarker(t2, "works-info") || "").trim() === e2);
  animateDivReveal(re, "initial"), re.forEach((e2) => {
    e2.style.display = "none";
  });
  let se = null;
  const le = durS, ce = () => {
    if (!se) return;
    const e2 = se;
    se = null, animateDivReveal(e2, "hide"), gsap.delayedCall(le, () => {
      se !== e2 && (e2.style.display = "none");
    });
  }, de = (e2) => {
    const t2 = ae(e2);
    if (t2) {
      if (se !== t2) {
        if (se) {
          const e3 = se;
          animateDivReveal(e3, "hide"), gsap.delayedCall(le, () => {
            se !== e3 && (e3.style.display = "none");
          });
        }
        se = t2, animateDivReveal(t2, "initial"), t2.style.display = "block", requestAnimationFrame(() => {
          se === t2 && animateDivReveal(t2, "reveal");
        });
      }
    } else ce();
  }, ue = t.querySelector(".anim-globe--database"), pe = ue ? Array.from(ue.querySelectorAll(".anim-globe--img")) : [];
  if (!pe.length) return;
  const me = new h.TextureLoader();
  me.crossOrigin = "anonymous";
  const ge = pe.length, fe = n(Math.ceil(2.5 * ge)).filter((e2) => Math.abs(e2.y) < 0.55).slice(0, ge);
  ue && Object.assign(ue.style, {
    position: "absolute",
    visibility: "hidden",
    pointerEvents: "none",
    width: "0",
    height: "0",
    overflow: "hidden"
  });
  const he = [];
  let ve = 0;
  pe.forEach((e2, t2) => {
    const n2 = fe[t2], o2 = e2.querySelector("img");
    if (!n2 || !o2) return;
    const r2 = (getAnimationMarker(e2, "works-database") || getAnimationMarker(o2, "works-database") || "").trim(), s2 = i(o2, 1024);
    s2 && he.push((e3) => {
      me.load(
        s2,
        (t3) => a(t3, n2, r2, e3),
        void 0,
        () => e3()
      );
    });
  }), r();
  const ye = new ResizeObserver(() => {
    const e2 = v(), t2 = y();
    0 !== e2 && 0 !== t2 && (w.setSize(e2, t2), E.aspect = e2 / t2, E.updateProjectionMatrix(), s());
  });
  ye.observe(e), s();
  let we = null;
  const be = new h.Raycaster(), Ee = new h.Vector2(-9, -9);
  let _e = false, xe = C, Te = C, Se = 0;
  const ke = (t2) => {
    const n2 = e.getBoundingClientRect();
    Ee.x = (t2.clientX - n2.left) / n2.width * 2 - 1, Ee.y = -(t2.clientY - n2.top) / n2.height * 2 + 1, _e = t2.clientX >= n2.left && t2.clientX <= n2.right && t2.clientY >= n2.top && t2.clientY <= n2.bottom;
  }, Me = () => {
    _e = false, Ee.set(-9, -9);
  };
  let Ae = false, Le = false, Ce = 0, Re = 0, Pe = 0;
  const Ie = (e2) => {
    Ae = true, Le = false, Ce = e2.clientX, Re = 0;
  }, qe = () => {
    Ae = false;
  }, Fe = (e2) => {
    if (!Ae) return;
    const t2 = e2.clientX - Ce;
    0 !== t2 && we && u(), Math.abs(t2) > 3 && (Le = true), Re += t2 * M, Re > k ? Re = k : Re < -k && (Re = -k), Ce = e2.clientX;
  }, Oe = () => {
    if (Le) return;
    be.setFromCamera(Ee, E);
    const e2 = be.intersectObjects(ie, false), t2 = e2.length ? oe.find((t3) => t3.mesh === e2[0].object) : null;
    t2 && !t2.pinned ? (we && d(), t2.pinned = true, t2.cooldown = 0, we = t2, de(t2.slug)) : we && u();
  }, De = () => {
    we && u();
  };
  e.addEventListener("mousemove", ke), e.addEventListener("mouseleave", Me), e.addEventListener("mousedown", Ie), e.addEventListener("click", Oe), window.addEventListener("mouseup", qe), window.addEventListener("mousemove", Fe), lenis?.on && lenis.on("scroll", De), window.addEventListener("wheel", De, { passive: true }), window.addEventListener("touchmove", De, { passive: true });
  const $e = new h.Clock();
  let ze = 0, He = null, Ue = "grab", Ne = true, Be = "initial";
  const Xe = new IntersectionObserver(
    (e2) => {
      for (const t2 of e2)
        Ne = t2.isIntersecting, Ne ? m() : "shown" !== Be && "hidden" !== Be && "initial" !== Be || g();
    },
    { threshold: 0 }
  );
  Xe.observe(e);
  let We = null;
  e._globeAnimate = (e2, t2, n2) => {
    switch (e2) {
      case "initial":
        f(), u(), oe.forEach((e3) => {
          e3.revealT = 0, e3.mesh.visible = false, e3.mesh.scale.setScalar(0), e3.mat.opacity = 0, e3.hoverable = false;
        }), Be = "initial";
        try {
          w.render(b, E);
        } catch (e3) {
        }
        n2?.();
        break;
      case "reveal": {
        f(), Be = "revealing";
        const e3 = v(), o2 = y();
        e3 > 0 && o2 > 0 && (w.setSize(e3, o2), E.aspect = e3 / o2, E.updateProjectionMatrix(), s()), m();
        const i2 = oe.map((e4, t3) => t3).sort(() => Math.random() - 0.5).map((e4) => oe[e4]);
        i2.forEach((e4) => {
          e4.mesh.visible = true, e4.revealT = 0;
        }), We = 0 === i2.length ? gsap.delayedCall(z + (t2 ?? 0), () => {
          Be = "shown", We = null, n2?.();
        }) : gsap.to(i2, {
          revealT: 1,
          duration: z,
          delay: t2 ?? 0,
          ease: "Out",
          stagger: H,
          overwrite: true,
          onComplete: () => {
            Be = "shown", We = null, n2?.();
          }
        });
        break;
      }
      case "hide": {
        f(), u(), Be = "hiding", m();
        const e3 = oe.map((e4, t3) => t3).sort(() => Math.random() - 0.5).map((e4) => oe[e4]);
        if (0 === e3.length) {
          Be = "hidden", n2?.();
          break;
        }
        We = gsap.to(e3, {
          revealT: 0,
          duration: U,
          delay: t2 ?? 0,
          ease: "In",
          stagger: N,
          overwrite: true,
          onComplete: () => {
            Be = "hidden", oe.forEach((e4) => {
              e4.mesh.visible = false;
            }), We = null;
            try {
              w.render(b, E);
            } catch (e4) {
            }
            Ne || g(), n2?.();
          }
        });
        break;
      }
    }
  }, e._globeGetDuration = (e2, t2) => {
    const n2 = t2 ?? 0, o2 = Math.max(0, ge - 1);
    return "reveal" === e2 ? n2 + z + H * o2 : "hide" === e2 ? n2 + U + N * o2 : 0;
  }, Be = "initial", m(), e._globeDestroy = () => {
    f(), g(), Xe.disconnect(), ye.disconnect(), he.length = 0, ce(), e.style.cursor = "", e.removeEventListener("mousemove", ke), e.removeEventListener("mouseleave", Me), e.removeEventListener("mousedown", Ie), e.removeEventListener("click", Oe), window.removeEventListener("mouseup", qe), window.removeEventListener("mousemove", Fe), lenis?.off && lenis.off("scroll", De), window.removeEventListener("wheel", De), window.removeEventListener("touchmove", De), oe.forEach((e2) => {
      e2.mesh.geometry.dispose(), e2.mat.map?.dispose(), e2.mat.dispose();
    }), w.dispose(), w.domElement.parentNode === e && e.removeChild(w.domElement);
  };
}
function animateGlobe(e, t, n, o) {
  return e ? (e._globeEnsureInit?.(), e._globeAnimate ? (e._globeAnimate(t, n, o), e._globeGetDuration?.(t, n) ?? 0) : (o?.(), 0)) : (o?.(), 0);
}
function animateCardsSplit(e, t, n, o) {
  if (!e) return o?.(), 0;
  const i = e.querySelector(".anim-tab-content-reval--list");
  if (!i) return o?.(), 0;
  const r = Array.from(i.querySelectorAll(".anim-tab-content-reval--item"));
  if (!r.length) return o?.(), 0;
  if (window.matchMedia("(max-width: 991px)").matches)
    return gsap.killTweensOf(r), gsap.set(r, { clearProps: "x" }), o?.(), 0;
  if (!e._splitCache) {
    const t2 = i.getBoundingClientRect();
    if (0 === t2.width) return o?.(), 0;
    const n2 = t2.left + t2.width / 2, a2 = [], s2 = [];
    r.forEach((e2) => {
      const t3 = e2.getBoundingClientRect();
      (t3.left + t3.width / 2 < n2 ? a2 : s2).push(e2);
    }), e._splitCache = { left: a2, right: s2 };
  }
  const { left: a, right: s } = e._splitCache, l = n ?? 0, c = a.length >= s.length ? a : s;
  let d = false;
  const u = () => {
    d || (d = true, o?.());
  };
  switch (t) {
    case "initial":
      return gsap.killTweensOf(r), gsap.set(a, { x: "-100vw" }), gsap.set(s, { x: "100vw" }), u(), 0;
    case "reveal":
      return gsap.killTweensOf(r), gsap.set(a, { x: "-100vw" }), gsap.set(s, { x: "100vw" }), gsap.to(a, {
        x: 0,
        duration: splitWorksDur,
        delay: l,
        stagger: splitWorksStagger,
        ease: "Out",
        overwrite: true,
        onComplete: c === a ? u : void 0
      }), gsap.to(s, {
        x: 0,
        duration: splitWorksDur,
        delay: l,
        stagger: splitWorksStagger,
        ease: "Out",
        overwrite: true,
        onComplete: c === s ? u : void 0
      }), l + splitWorksDur + splitWorksStagger * Math.max(0, c.length - 1);
    case "hide":
      return gsap.killTweensOf(r), gsap.to(a, {
        x: "-100vw",
        duration: splitWorksDur,
        delay: l,
        stagger: splitWorksStagger,
        ease: "In",
        overwrite: true,
        onComplete: c === a ? u : void 0
      }), gsap.to(s, {
        x: "100vw",
        duration: splitWorksDur,
        delay: l,
        stagger: splitWorksStagger,
        ease: "In",
        overwrite: true,
        onComplete: c === s ? u : void 0
      }), l + splitWorksDur + splitWorksStagger * Math.max(0, c.length - 1);
  }
  return u(), 0;
}
