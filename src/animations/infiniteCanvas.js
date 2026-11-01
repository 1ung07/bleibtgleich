function initInfiniteCanvas(e = document) {
  function t() {
    if (He = Ue ? requestAnimationFrame(t) : null, !Ue) return;
    const e2 = performance.now();
    Ne = Ne + 1 & 1, be.focused || ((be.keys.w || be.keys.arrowup) && (be.targetVel.z -= p), (be.keys.s || be.keys.arrowdown) && (be.targetVel.z += p), (be.keys.a || be.keys.arrowleft) && (be.targetVel.x -= p), (be.keys.d || be.keys.arrowright) && (be.targetVel.x += p), be.keys.q && (be.targetVel.y -= p), be.keys.e && (be.targetVel.y += p));
    const n2 = Math.abs(be.velocity.z) > 0.05, o2 = B(be.basePos.z / 50, 0.3, 2), f2 = F * o2, h2 = n2 ? 0.2 : 0.12;
    if (be.focused ? (be.drift.x = X(be.drift.x, 0, 0.25), be.drift.y = X(be.drift.y, 0, 0.25)) : be.isDragging || (N ? (be.drift.x = X(be.drift.x, 0, h2), be.drift.y = X(be.drift.y, 0, h2)) : (be.drift.x = X(be.drift.x, be.mouse.x * f2, h2), be.drift.y = X(be.drift.y, be.mouse.y * f2, h2))), be.focused || (be.targetVel.z += be.scrollAccum, be.scrollAccum *= 0.8, be.targetVel.x = B(be.targetVel.x, -l, l), be.targetVel.y = B(be.targetVel.y, -l, l), be.targetVel.z = B(be.targetVel.z, -l, l), be.velocity.x = X(be.velocity.x, be.targetVel.x, m), be.velocity.y = X(be.velocity.y, be.targetVel.y, m), be.velocity.z = X(be.velocity.z, be.targetVel.z, m), be.basePos.x += be.velocity.x, be.basePos.y += be.velocity.y, be.basePos.z += be.velocity.z, be.targetVel.x *= g, be.targetVel.y *= g, be.targetVel.z *= g), te.position.set(
      be.basePos.x + be.drift.x,
      be.basePos.y + be.drift.y,
      be.basePos.z
    ), i && de && !be.focused) {
      Math.abs(be.velocity.x) + Math.abs(be.velocity.y) + Math.abs(be.velocity.z) > A ? (pe = e2, ue && (ue = false, animateTextReveal(i, "hide", 0))) : !ue && e2 - pe > L && (ue = true, animateTextReveal(i, "reveal", 0));
    }
    const M2 = e2 - be.lastScrollInput < y, R2 = Math.abs(be.velocity.z), P2 = R2 < E ? 0 : B((R2 - E) / (l - E), 0, 1);
    be.bendEnv = P2 > be.bendEnv ? X(be.bendEnv, P2, 0.25) : X(be.bendEnv, P2, 0.04);
    const O2 = M2 && be.bendEnv > 0.02 ? Math.min(1, 0.3 + 0.7 * be.bendEnv) : 0;
    be.bend = X(be.bend, O2, M2 ? w : b);
    const D2 = !ce, z2 = null === le ? -1 : e2 - le;
    D2 && z2 > S + T && (ce = true);
    const U2 = Math.floor(be.basePos.x / r), W2 = Math.floor(be.basePos.y / r), Y2 = Math.floor(be.basePos.z / r);
    if (!be.focused) {
      const t2 = `${U2},${W2},${Y2}`;
      t2 !== be.lastChunkKey && (be.pendingChunk = { cx: U2, cy: W2, cz: Y2 }, be.lastChunkKey = t2);
      const o3 = Math.abs(be.velocity.z) > 1 ? 500 : n2 ? 400 : 100;
      if (be.pendingChunk && e2 - be.lastChunkUpdate >= o3) {
        const t3 = be.pendingChunk;
        be.pendingChunk = null, be.lastChunkUpdate = e2, Te(t3.cx, t3.cy, t3.cz);
      }
    }
    const V2 = Ee.v;
    _e += (V2 - _e) / H;
    const j2 = null !== be.focusMesh || V2 > 1e-4 || _e > 1e-4;
    if (se.length = 0, ve.forEach((t2) => {
      const n3 = Math.max(
        Math.abs(t2.cx - U2),
        Math.abs(t2.cy - W2),
        Math.abs(t2.cz - Y2)
      ), o3 = n3 <= a ? 1 : Math.max(0, 1 - (n3 - a) / s);
      t2.meshes.forEach((t3) => {
        if (!t3.__ready) return;
        if (be.focusMesh === t3) {
          const n5 = Math.sin(e2 * x * t3.__breathRate + t3.__breathPhase) * _, i3 = t3.__baseY + n5, r3 = t3.__baseX - te.position.x, a3 = i3 - te.position.y, s3 = r3 * r3 + a3 * a3, l3 = t3.__baseZ + be.bend * s3 * v, p3 = l3 - be.basePos.z, m3 = Math.sqrt(s3 + p3 * p3);
          let g3;
          if (m3 > d + 50) g3 = 0;
          else {
            const e3 = m3 <= c ? 1 : Math.max(0, 1 - (m3 - c) / (d - c));
            g3 = Math.min(o3, e3 * e3);
          }
          return t3.position.set(
            X(t3.__baseX, be.focusTarget.x, V2),
            X(i3, be.focusTarget.y, V2),
            X(l3, be.focusTarget.z, V2)
          ), t3.scale.set(
            X(t3.__baseScaleX, be.focusTarget.sx, V2),
            X(t3.__baseScaleY, be.focusTarget.sy, V2),
            1
          ), t3.__opacity = g3, t3.material.opacity = X(g3, 1, V2), t3.material.depthWrite = t3.material.opacity > 0.99, void (t3.visible = t3.material.opacity > u);
        }
        let n4 = 1;
        if (t3.__introT < 1) {
          const e3 = z2 < 0 ? 0 : B((z2 - t3.__introDelay) / T, 0, 1);
          t3.__introT = e3, n4 = G(e3);
          const o4 = k + (1 - k) * Q(e3);
          if (t3.scale.set(t3.__baseScaleX * o4, t3.__baseScaleY * o4, 1), 0 === e3)
            return t3.material.opacity = 0, void (t3.visible = false);
        } else
          D2 && t3.scale.x !== t3.__baseScaleX && t3.scale.set(t3.__baseScaleX, t3.__baseScaleY, 1);
        if (1 === n4 && t3.__opacity < u && !t3.visible && 0 === Ne) return;
        const i2 = Math.sin(e2 * x * t3.__breathRate + t3.__breathPhase) * _;
        t3.position.y = t3.__baseY + i2;
        const r2 = t3.position.x - te.position.x, a2 = t3.position.y - te.position.y, s2 = r2 * r2 + a2 * a2;
        t3.position.z = t3.__baseZ + be.bend * s2 * v;
        const l2 = t3.position.z - be.basePos.z, p2 = Math.sqrt(s2 + l2 * l2);
        if (p2 > d + 50)
          return t3.__opacity = 0, t3.material.opacity = 0, t3.material.depthWrite = false, void (t3.visible = false);
        const m2 = p2 <= c ? 1 : Math.max(0, 1 - (p2 - c) / (d - c)), g2 = Math.min(o3, m2 * m2);
        t3.__opacity = g2 < u && t3.__opacity < u ? 0 : X(t3.__opacity, g2, 0.18);
        const f3 = t3.__opacity > 0.99 && n4 > 0.99;
        let h3 = f3 ? 1 : t3.__opacity * n4, y2 = f3;
        if (j2) {
          const e3 = (t3.__focusDelay || 0) * $, n5 = B((_e - e3) / (1 - $), 0, 1);
          h3 *= 1 - n5 * n5 * (3 - 2 * n5), y2 = false;
        }
        t3.material.opacity = h3, t3.material.depthWrite = y2, t3.visible = h3 > u, !N && t3.visible && h3 > I && se.push(t3);
      });
    }), !N)
      if (be.focused || j2)
        "0" !== J.style.opacity && (J.style.opacity = "0"), "default" !== be.cursor && (be.cursor = "default", Se.style.cursor = "default");
      else {
        let e3 = null;
        const t2 = Math.abs(be.velocity.x) + Math.abs(be.velocity.y) + Math.abs(be.velocity.z);
        if (ce && be.pointerActive && !be.isDragging && t2 < q) {
          const t3 = Se.getBoundingClientRect();
          if (be.clientX >= t3.left && be.clientX <= t3.right && be.clientY >= t3.top && be.clientY <= t3.bottom) {
            ie.x = (be.clientX - t3.left) / t3.width * 2 - 1, ie.y = -(be.clientY - t3.top) / t3.height * 2 + 1, oe.setFromCamera(ie, te);
            const n4 = oe.intersectObjects(se, false);
            n4.length && (e3 = n4[0].object);
          }
        }
        if (be.hoveredMesh = e3, e3) {
          const t3 = 0.5 * e3.scale.x, n4 = 0.5 * e3.scale.y;
          re.set(e3.position.x - t3, e3.position.y - n4, e3.position.z).project(te), ae.set(e3.position.x + t3, e3.position.y + n4, e3.position.z).project(te);
          const o3 = Se.clientWidth, i2 = Se.clientHeight, r2 = (0.5 * re.x + 0.5) * o3, a2 = (0.5 * -re.y + 0.5) * i2, s2 = (0.5 * ae.x + 0.5) * o3, l2 = (0.5 * -ae.y + 0.5) * i2, c2 = Math.min(r2, s2), d2 = Math.min(a2, l2), u2 = Math.abs(s2 - r2), p2 = Math.abs(l2 - a2);
          J.style.transform = `translate(calc(${c2}px - ${C}rem), calc(${d2}px - ${C}rem))`, J.style.width = `calc(${u2}px + ${2 * C}rem)`, J.style.height = `calc(${p2}px + ${2 * C}rem)`, J.style.opacity = "1";
        } else "0" !== J.style.opacity && (J.style.opacity = "0");
        const n3 = be.isDragging ? "grabbing" : e3 ? "pointer" : "grab";
        be.cursor !== n3 && (be.cursor = n3, Se.style.cursor = n3);
      }
    K.render(ee, te);
  }
  const n = e.querySelector(".anim-infinite-canvas");
  if (!n || n.__icInit) return;
  n.__icInit = true;
  const o = Array.from(e.querySelectorAll(".anim-canvas-img")).map((e2) => ({
    url: e2.currentSrc || e2.src,
    width: parseInt(e2.getAttribute("width")) || e2.naturalWidth || 0,
    height: parseInt(e2.getAttribute("height")) || e2.naturalHeight || 0
  })).filter((e2) => e2.url);
  if (!o.length) return;
  const i = e.querySelector(".anim-infinite-canvas-h"), r = 110, a = 2, s = 1, l = 3.2, c = 140, d = 260, u = 0.01, p = 0.18, m = 0.16, g = 0.9, f = 50, h = 5, v = 225e-5, y = 220, w = 0.06, b = 0.035, E = 0.12, _ = 1.4, x = 45e-5, T = 900, S = 1100, k = 0.55, M = 1.06, A = 0.015, L = 3e3, C = 0.277, R = 0.0173, P = "currentColor", I = 0.6, q = 0.06, F = 1.5, O = 30, D = 6.66, $ = 0.7, z = 60, H = 2.2, U = 4, N = window.matchMedia("(pointer: coarse)").matches, B = (e2, t2, n2) => Math.max(t2, Math.min(n2, e2)), X = (e2, t2, n2) => e2 + (t2 - e2) * n2, W = (e2) => e2 * (parseFloat(getComputedStyle(document.documentElement).fontSize) || 16), Y = (e2) => {
    const t2 = 1e4 * Math.sin(9999 * e2);
    return t2 - Math.floor(t2);
  }, V = (e2) => {
    let t2 = 0;
    for (let n2 = 0; n2 < e2.length; n2++)
      t2 = (t2 << 5) - t2 + e2.charCodeAt(n2) | 0;
    return Math.abs(t2);
  }, G = (e2) => 1 - Math.pow(1 - e2, 3), Q = (e2) => {
    const t2 = 12 * (M - 1);
    return 1 + (t2 + 1) * Math.pow(e2 - 1, 3) + t2 * Math.pow(e2 - 1, 2);
  }, j = a + s, Z = [];
  for (let e2 = -j; e2 <= j; e2++)
    for (let t2 = -j; t2 <= j; t2++)
      for (let n2 = -j; n2 <= j; n2++)
        Math.max(Math.abs(e2), Math.abs(t2), Math.abs(n2)) > j || Z.push({ dx: e2, dy: t2, dz: n2 });
  const K = new THREE.WebGLRenderer({
    antialias: false,
    alpha: true,
    powerPreference: "high-performance"
  });
  K.setClearColor(0, 0), K.setPixelRatio(Math.min(window.devicePixelRatio || 1, N ? 1.25 : 1.5)), K.setSize(n.clientWidth, n.clientHeight), K.domElement.style.cssText = "position:absolute;inset:0;width:100%;height:100%;display:block;cursor:grab;touch-action:none;", n.appendChild(K.domElement);
  const J = document.createElement("div");
  J.style.cssText = `position:absolute;left:0;top:0;box-sizing:border-box;pointer-events:none;border:${R}rem solid ${P};opacity:0;transition:opacity 0.18s ease;will-change:transform,width,height;`, n.appendChild(J);
  const ee = new THREE.Scene(), te = new THREE.PerspectiveCamera(
    60,
    n.clientWidth / n.clientHeight,
    1,
    500
  );
  te.position.set(0, 0, f);
  const ne = new THREE.PlaneGeometry(1, 1), oe = new THREE.Raycaster(), ie = new THREE.Vector2(), re = new THREE.Vector3(), ae = new THREE.Vector3(), se = [];
  let le = null, ce = false, de = false, ue = false, pe = 0;
  const me = new THREE.TextureLoader(), ge = /* @__PURE__ */ new Map(), fe = (e2, t2) => {
    const n2 = ge.get(e2.url);
    if (n2) return void (n2.__loaded ? t2(n2) : n2.__cbs.push(t2));
    const o2 = me.load(e2.url, (e3) => {
      e3.minFilter = THREE.LinearMipmapLinearFilter, e3.magFilter = THREE.LinearFilter, e3.generateMipmaps = true, e3.anisotropy = 4, e3.colorSpace = THREE.SRGBColorSpace, e3.__loaded = true, e3.__cbs.forEach((t3) => t3(e3)), e3.__cbs = [];
    });
    o2.__loaded = false, o2.__cbs = [t2], ge.set(e2.url, o2);
  }, he = (e2, t2, n2) => {
    const i2 = [], a2 = V(`${e2},${t2},${n2}`);
    for (let s2 = 0; s2 < h; s2++) {
      const l2 = a2 + 1e3 * s2, c2 = (e3) => Y(l2 + e3), d2 = 12 + 8 * c2(4);
      i2.push({
        x: e2 * r + c2(0) * r,
        y: t2 * r + c2(1) * r,
        z: n2 * r + c2(2) * r,
        size: d2,
        mediaIndex: Math.floor(1e6 * c2(5)) % o.length,
        introSeed: c2(7)
      });
    }
    return i2;
  }, ve = /* @__PURE__ */ new Map(), ye = (e2, t2, n2) => {
    const i2 = `${e2},${t2},${n2}`;
    if (ve.has(i2)) return;
    const r2 = new THREE.Group(), a2 = [];
    he(e2, t2, n2).forEach((e3) => {
      const t3 = o[e3.mediaIndex], n3 = new THREE.MeshBasicMaterial({
        transparent: true,
        opacity: 0,
        side: THREE.DoubleSide,
        depthWrite: false
      }), i3 = new THREE.Mesh(ne, n3);
      i3.position.set(e3.x, e3.y, e3.z), i3.__baseX = e3.x, i3.__baseZ = e3.z, i3.__baseY = e3.y, i3.__nativeW = t3.width || 0, i3.__nativeH = t3.height || 0, i3.__breathPhase = Y(e3.x + e3.y + e3.z) * Math.PI * 2, i3.__breathRate = 0.75 + 0.5 * Y(1.7 * e3.x + e3.z), i3.visible = false, i3.__opacity = 0, i3.__ready = false, i3.__baseScaleX = 1, i3.__baseScaleY = 1, i3.__introDelay = ce ? 0 : e3.introSeed * S, i3.__introT = ce ? 1 : 0, fe(t3, (o2) => {
        if (n3.__disposed) return;
        n3.map = o2, n3.needsUpdate = true;
        const r3 = o2.image, a3 = t3.width || r3 && r3.naturalWidth || 0, s2 = t3.height || r3 && r3.naturalHeight || 0;
        i3.__nativeW = a3, i3.__nativeH = s2;
        const l2 = a3 && s2 ? a3 / s2 : 1;
        i3.__baseScaleX = e3.size * l2, i3.__baseScaleY = e3.size;
        const c2 = i3.__introT < 1 ? k : 1;
        i3.scale.set(i3.__baseScaleX * c2, i3.__baseScaleY * c2, 1), i3.__ready = true;
      }), r2.add(i3), a2.push(i3);
    }), ee.add(r2), ve.set(i2, { group: r2, meshes: a2, cx: e2, cy: t2, cz: n2 });
  }, we = (e2) => {
    const t2 = ve.get(e2);
    t2 && (t2.meshes.forEach((e3) => {
      be.hoveredMesh === e3 && (be.hoveredMesh = null), e3.material.__disposed = true, e3.material.dispose();
    }), ee.remove(t2.group), ve.delete(e2));
  }, be = {
    velocity: { x: 0, y: 0, z: 0 },
    targetVel: { x: 0, y: 0, z: 0 },
    basePos: { x: 0, y: 0, z: f },
    drift: { x: 0, y: 0 },
    mouse: { x: 0, y: 0 },
    lastMouse: { x: 0, y: 0 },
    scrollAccum: 0,
    bend: 0,
    bendEnv: 0,
    lastScrollInput: 0,
    isDragging: false,
    lastTouches: [],
    lastTouchDist: 0,
    lastChunkKey: "",
    lastChunkUpdate: 0,
    pendingChunk: null,
    keys: {},
    clientX: 0,
    clientY: 0,
    pointerActive: false,
    cursor: "grab",
    hoveredMesh: null,
    downX: 0,
    downY: 0,
    dragMoved: false,
    focusMesh: null,
    focused: false,
    exiting: false,
    focusTarget: null,
    focusStartOpacity: 1
  }, Ee = { v: 0 };
  let _e = 0;
  const xe = (e2) => {
    if (e2.length < 2) return 0;
    const t2 = e2[0].clientX - e2[1].clientX, n2 = e2[0].clientY - e2[1].clientY;
    return Math.sqrt(t2 * t2 + n2 * n2);
  }, Te = (e2, t2, n2) => {
    const o2 = /* @__PURE__ */ new Set();
    Z.forEach((i2) => {
      const r2 = `${e2 + i2.dx},${t2 + i2.dy},${n2 + i2.dz}`;
      o2.add(r2), ye(e2 + i2.dx, t2 + i2.dy, n2 + i2.dz);
    }), ve.forEach((e3, t3) => {
      o2.has(t3) || we(t3);
    });
  };
  Te(0, 0, 0);
  const Se = K.domElement, ke = (e2) => {
    if (be.focusMesh || !e2 || !e2.__ready) return;
    be.focusMesh = e2, be.focused = true, be.exiting = false, be.focusStartOpacity = e2.material.opacity || 1, be.velocity.x = be.velocity.y = be.velocity.z = 0, be.targetVel.x = be.targetVel.y = be.targetVel.z = 0, be.scrollAccum = 0, be.drift.x = be.drift.y = 0, be.mouse.x = be.mouse.y = 0, i && ue && (ue = false, animateTextReveal(i, "hide", 0)), J.style.opacity = "0", be.hoveredMesh = null;
    const t2 = e2.__baseX, n2 = e2.__baseY, o2 = e2.__baseZ;
    ve.forEach(
      (e3) => e3.meshes.forEach((e4) => {
        const i2 = e4.__baseX - t2, r3 = e4.__baseY - n2, a3 = e4.__baseZ - o2, s3 = Math.sqrt(i2 * i2 + r3 * r3 + a3 * a3);
        e4.__focusDelay = B(s3 / z, 0, 1);
      })
    );
    const r2 = Math.tan(te.fov * Math.PI / 180 / 2), a2 = 2 * O * r2 / Se.clientHeight, s2 = e2.__nativeW, l2 = e2.__nativeH;
    let c2 = s2 && l2 ? s2 * a2 : e2.__baseScaleX, d2 = s2 && l2 ? l2 * a2 : e2.__baseScaleY;
    const u2 = Math.max(1, window.innerHeight - W(D)) * a2;
    if (d2 > u2) {
      const e3 = u2 / d2;
      d2 *= e3, c2 *= e3;
    }
    be.focusTarget = {
      x: be.basePos.x,
      y: be.basePos.y,
      z: be.basePos.z - O,
      sx: c2,
      sy: d2
    }, gsap.to(Ee, { v: 1, duration: durM, ease: "Out", overwrite: true });
  }, Me = () => {
    be.focusMesh && !be.exiting && (be.exiting = true, be.focused = false, gsap.to(Ee, {
      v: 0,
      duration: durM,
      ease: "InOut",
      overwrite: true,
      onComplete: () => {
        be.focusMesh = null, be.focused = false, be.exiting = false, be.focusTarget = null, pe = performance.now();
      }
    }));
  }, Ae = (e2) => {
    be.isDragging = true, be.dragMoved = false, be.downX = e2.clientX, be.downY = e2.clientY, be.lastMouse = { x: e2.clientX, y: e2.clientY };
  }, Le = () => {
    be.isDragging = false;
  }, Ce = () => {
    be.mouse = { x: 0, y: 0 }, be.isDragging = false, be.pointerActive = false, be.hoveredMesh = null, J.style.opacity = "0";
  }, Re = (e2) => {
    be.clientX = e2.clientX, be.clientY = e2.clientY, be.pointerActive = true, be.mouse = {
      x: e2.clientX / window.innerWidth * 2 - 1,
      y: -e2.clientY / window.innerHeight * 2 + 1
    }, be.isDragging && (Math.abs(e2.clientX - be.downX) + Math.abs(e2.clientY - be.downY) > U && (be.dragMoved = true), be.targetVel.x -= 0.025 * (e2.clientX - be.lastMouse.x), be.targetVel.y += 0.025 * (e2.clientY - be.lastMouse.y), be.lastMouse = { x: e2.clientX, y: e2.clientY });
  }, Pe = () => {
    if (N || be.exiting) return;
    const e2 = Se.getBoundingClientRect();
    if (ie.x = (be.clientX - e2.left) / e2.width * 2 - 1, ie.y = -(be.clientY - e2.top) / e2.height * 2 + 1, oe.setFromCamera(ie, te), be.focused) {
      return void (be.focusMesh && oe.intersectObject(be.focusMesh, false).length > 0 || Me());
    }
    if (be.dragMoved) return;
    const t2 = oe.intersectObjects(se, false);
    t2.length && ke(t2[0].object);
  }, Ie = (e2) => {
    e2.preventDefault(), be.focusMesh && !be.exiting && Me(), be.focused || (be.scrollAccum += 6e-3 * e2.deltaY, be.lastScrollInput = performance.now());
  }, qe = (e2) => {
    e2.preventDefault(), be.lastTouches = Array.from(e2.touches), be.lastTouchDist = xe(be.lastTouches);
  }, Fe = (e2) => {
    e2.preventDefault();
    const t2 = Array.from(e2.touches);
    if (1 === t2.length && be.lastTouches.length >= 1)
      be.targetVel.x -= 0.02 * (t2[0].clientX - be.lastTouches[0].clientX), be.targetVel.y += 0.02 * (t2[0].clientY - be.lastTouches[0].clientY);
    else if (2 === t2.length && be.lastTouchDist > 0) {
      const e3 = xe(t2);
      be.scrollAccum += 6e-3 * (be.lastTouchDist - e3), be.lastScrollInput = performance.now(), be.lastTouchDist = e3;
    }
    be.lastTouches = t2;
  }, Oe = (e2) => {
    be.lastTouches = Array.from(e2.touches), be.lastTouchDist = xe(be.lastTouches);
  }, De = (e2) => {
    "Escape" !== e2.key || !be.focusMesh || be.exiting ? be.keys[e2.key.toLowerCase()] = true : Me();
  }, $e = (e2) => {
    be.keys[e2.key.toLowerCase()] = false;
  };
  Se.addEventListener("mousedown", Ae), window.addEventListener("mouseup", Le), window.addEventListener("mousemove", Re), Se.addEventListener("mouseleave", Ce), Se.addEventListener("click", Pe), Se.addEventListener("wheel", Ie, { passive: false }), Se.addEventListener("touchstart", qe, { passive: false }), Se.addEventListener("touchmove", Fe, { passive: false }), Se.addEventListener("touchend", Oe, { passive: false }), window.addEventListener("keydown", De), window.addEventListener("keyup", $e);
  const ze = new ResizeObserver(() => {
    const e2 = n.clientWidth, t2 = n.clientHeight;
    e2 && t2 && (te.aspect = e2 / t2, te.updateProjectionMatrix(), K.setSize(e2, t2));
  });
  ze.observe(n);
  let He = null, Ue = true, Ne = 0;
  const Be = new IntersectionObserver(([e2]) => {
    Ue = e2.isIntersecting, Ue && null === He && (He = requestAnimationFrame(t));
  });
  Be.observe(n), He = requestAnimationFrame(t), gsap.set(Se, { opacity: 0 });
  let Xe = null;
  const We = () => window.__preloaderState?.done && !window.__preloaderRunning && !window.__transitionRunning, Ye = () => {
    gsap.to(Se, {
      opacity: 1,
      duration: durS,
      delay: delayReveal,
      ease: "Out",
      onStart: () => {
        le = performance.now(), i && (animateTextReveal(i, "reveal", 0), ue = true, de = true, pe = performance.now());
      }
    });
  };
  We() ? Ye() : Xe = setInterval(() => {
    We() && (clearInterval(Xe), Xe = null, Ye());
  }, 50), n.__icDestroy = () => {
    Xe && clearInterval(Xe), gsap.killTweensOf(Se), gsap.killTweensOf(Ee), Ue = false, null !== He && cancelAnimationFrame(He), Be.disconnect(), ze.disconnect(), Se.removeEventListener("mousedown", Ae), window.removeEventListener("mouseup", Le), window.removeEventListener("mousemove", Re), Se.removeEventListener("mouseleave", Ce), Se.removeEventListener("click", Pe), Se.removeEventListener("wheel", Ie), Se.removeEventListener("touchstart", qe), Se.removeEventListener("touchmove", Fe), Se.removeEventListener("touchend", Oe), window.removeEventListener("keydown", De), window.removeEventListener("keyup", $e), ve.forEach((e2, t2) => we(t2)), ge.forEach((e2) => e2.dispose()), ge.clear(), ne.dispose(), K.dispose(), J.parentNode && J.parentNode.removeChild(J), Se.parentNode && Se.parentNode.removeChild(Se), n.__icInit = false, n.__icDestroy = null;
  };
}
function destroyInfiniteCanvas(e = document) {
  const t = e.querySelector(".anim-infinite-canvas");
  t && t.__icDestroy && t.__icDestroy();
}
