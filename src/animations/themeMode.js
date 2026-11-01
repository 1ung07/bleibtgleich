function initThemeMode(e = document) {
  function t(e2) {
    const t2 = s[e2];
    if (!t2) return;
    const n2 = document.querySelector('link[rel~="icon"]');
    if (n2 && n2.href === t2) return;
    const o2 = t2.endsWith(".svg") ? "image/svg+xml" : t2.endsWith(".ico") ? "image/x-icon" : "image/png";
    document.querySelectorAll('link[rel~="icon"], link[rel="shortcut icon"]').forEach((e3) => e3.remove());
    const i2 = document.createElement("link");
    i2.rel = "icon", i2.type = o2, i2.href = t2, document.head.appendChild(i2);
  }
  function n(e2) {
    const n2 = r[e2];
    n2 && (Object.values(r).forEach((e3) => l.classList.remove(e3)), l.classList.add(n2), t(e2), sessionStorage.setItem(i, e2));
  }
  function o(e2) {
    m.forEach((t2) => {
      gsap.to(t2, {
        borderWidth: t2 === e2 ? d : u,
        duration: durS,
        ease: "Out",
        overwrite: "auto"
      });
    });
  }
  const i = "theme-mode", r = {
    base: "theme-mode-base",
    1: "theme-mode-1",
    2: "theme-mode-2",
    3: "theme-mode-3",
    4: "theme-mode-4"
  }, a = {
    base: "#ffffff",
    1: "#bec1ca",
    2: "#FF633D",
    3: "#919E44",
    4: "#D5312F"
  }, s = {
    base: "/media/cdn.prod.website-files.com/6a2fcc5552066493ef9a5cf9/6a64bda305476e6f0c2ec4e4_favicon-mode_0.svg",
    1: "/media/cdn.prod.website-files.com/6a2fcc5552066493ef9a5cf9/6a64bda35acf1e4ef4b2b360_favicon-mode_1.svg",
    2: "/media/cdn.prod.website-files.com/6a2fcc5552066493ef9a5cf9/6a64bda3da4c3a9156fc8e24_favicon-mode_2.svg",
    3: "/media/cdn.prod.website-files.com/6a2fcc5552066493ef9a5cf9/6a64bda387226e24625a83b8_favicon-mode_3.svg",
    4: "/media/cdn.prod.website-files.com/6a2fcc5552066493ef9a5cf9/6a64bda37f172072e2128b2f_favicon-mode_4.svg"
  }, l = document.body, c = window.matchMedia("(max-width: 991px)").matches, d = c ? "2.0356rem" : "0.555rem", u = c ? "0.0636rem" : "0.0694rem", p = sessionStorage.getItem(i) || "base";
  n(p);
  const m = e.querySelectorAll(".anim-theme-mode");
  if (!m.length) return;
  m.forEach((e2) => gsap.set(e2, { borderWidth: u }));
  const g = e.querySelector(`.anim-theme-mode--${p}`);
  if (g && o(g), !window.__themeLiquid) {
    const e2 = new THREE.WebGLRenderer({ alpha: true, antialias: false });
    e2.setPixelRatio(Math.min(window.devicePixelRatio, 2)), e2.setSize(window.innerWidth, window.innerHeight);
    const t2 = e2.domElement;
    Object.assign(t2.style, {
      position: "fixed",
      inset: "0",
      width: "100%",
      height: "100%",
      zIndex: "0",
      pointerEvents: "none",
      display: "none"
    }), document.body.appendChild(t2);
    const n2 = new THREE.Scene(), o2 = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1), i2 = {
      uProgress: { value: 0 },
      uCenter: { value: new THREE.Vector2(0.5, 0.5) },
      uColor: { value: new THREE.Color("#000000") },
      uAspect: { value: window.innerWidth / window.innerHeight },
      uTime: { value: 0 }
    }, r2 = new THREE.ShaderMaterial({
      transparent: true,
      uniforms: i2,
      vertexShader: "\n        varying vec2 vUv;\n        void main() {\n          vUv = uv;\n          gl_Position = vec4(position, 1.0);\n        }\n      ",
      fragmentShader: "\n        varying vec2 vUv;\n        uniform float uProgress;\n        uniform vec2 uCenter;\n        uniform vec3 uColor;\n        uniform float uAspect;\n        uniform float uTime;\n\n        float hash(vec2 p) {\n          return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);\n        }\n        float noise(vec2 p) {\n          vec2 i = floor(p); vec2 f = fract(p);\n          f = f * f * (3.0 - 2.0 * f);\n          return mix(\n            mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),\n            mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x),\n            f.y\n          );\n        }\n        float fbm(vec2 p) {\n          float v = 0.0; float a = 0.5;\n          for (int i = 0; i < 4; i++) {\n            v += a * noise(p);\n            p *= 2.1;\n            a *= 0.5;\n          }\n          return v;\n        }\n\n        void main() {\n          vec2 uv = vUv;\n          vec2 c = uCenter;\n          uv.x *= uAspect;\n          c.x *= uAspect;\n\n          float d = distance(uv, c);\n          float t = uTime * 0.3;\n\n          float ramp = smoothstep(0.0, 0.5, uProgress);\n\n          vec2 q = vec2(\n            fbm(uv * 3.0 + t),\n            fbm(uv * 3.0 + 37.2 - t)\n          );\n          float n = fbm(uv * 4.0 + q * 1.8) * 0.55 * ramp;\n\n          float g = (fbm(uv * 15.0 + 5.1 + t * 0.6) - 0.5) * 0.12 * ramp;\n\n          float edge = uProgress - n + g;\n          float mask = smoothstep(edge - 0.012, edge, d);\n\n          gl_FragColor = vec4(uColor, mask);\n        }\n      "
    });
    n2.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), r2));
    let a2 = null;
    const s2 = () => {
      i2.uTime.value += 0.016, e2.render(n2, o2), a2 = requestAnimationFrame(s2);
    };
    window.addEventListener("resize", () => {
      e2.setSize(window.innerWidth, window.innerHeight), i2.uAspect.value = window.innerWidth / window.innerHeight;
    }), window.__themeLiquid = {
      tween: null,
      run(e3, n3) {
        this.tween && this.tween.kill(), cancelAnimationFrame(a2);
        const o3 = window.innerWidth / window.innerHeight, r3 = e3.clientX / window.innerWidth, l2 = 1 - e3.clientY / window.innerHeight;
        i2.uCenter.value.set(r3, l2), i2.uColor.value.set(n3), i2.uProgress.value = 0;
        const c2 = [
          [0, 0],
          [o3, 0],
          [0, 1],
          [o3, 1]
        ].reduce(
          (e4, [t3, n4]) => Math.max(e4, Math.hypot(t3 - r3 * o3, n4 - l2)),
          0
        ) + 0.75;
        t2.style.display = "block", s2(), this.tween = gsap.to(i2.uProgress, {
          value: c2,
          duration: 1.5,
          ease: "Out",
          onComplete: () => {
            t2.style.display = "none", cancelAnimationFrame(a2), this.tween = null;
          }
        });
      }
    };
  }
  m.forEach((e2) => {
    e2.addEventListener("click", (t2) => {
      const r2 = getAnimationMarker(e2, "theme-mode"), s2 = sessionStorage.getItem(i) || "base";
      r2 !== s2 && (window.__themeLiquid.run(t2, a[s2] || "#000"), n(r2), o(e2));
    });
  });
}
