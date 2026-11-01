function initFluidReveal(e = document) {
  if (window.matchMedia("(max-width: 991px)").matches) return;
  const t = e.querySelectorAll(".anim-fluid-reveal");
  t.length && t.forEach((e2) => {
    function t2() {
      const e3 = getComputedStyle(I).color.match(/[\d.]+/g);
      e3 && e3.length >= 3 && (q[0] = e3[0] / 255, q[1] = e3[1] / 255, q[2] = e3[2] / 255);
    }
    function n(e3, t3) {
      const n2 = D.createShader(e3);
      return D.shaderSource(n2, t3), D.compileShader(n2), n2;
    }
    function o(e3) {
      const t3 = D.createProgram();
      D.attachShader(t3, B), D.attachShader(t3, n(D.FRAGMENT_SHADER, e3)), D.linkProgram(t3);
      const o2 = {}, i2 = D.getProgramParameter(t3, D.ACTIVE_UNIFORMS);
      for (let e4 = 0; e4 < i2; e4++) {
        const n2 = D.getActiveUniform(t3, e4).name;
        o2[n2] = D.getUniformLocation(t3, n2);
      }
      return { p: t3, uniforms: o2 };
    }
    function i(e3, t3) {
      const n2 = D.createTexture();
      D.activeTexture(D.TEXTURE0), D.bindTexture(D.TEXTURE_2D, n2), D.texParameteri(D.TEXTURE_2D, D.TEXTURE_MIN_FILTER, $), D.texParameteri(D.TEXTURE_2D, D.TEXTURE_MAG_FILTER, $), D.texParameteri(D.TEXTURE_2D, D.TEXTURE_WRAP_S, D.CLAMP_TO_EDGE), D.texParameteri(D.TEXTURE_2D, D.TEXTURE_WRAP_T, D.CLAMP_TO_EDGE), D.texImage2D(
        D.TEXTURE_2D,
        0,
        D.RGBA16F,
        e3,
        t3,
        0,
        D.RGBA,
        D.HALF_FLOAT,
        null
      );
      const o2 = D.createFramebuffer();
      return D.bindFramebuffer(D.FRAMEBUFFER, o2), D.framebufferTexture2D(
        D.FRAMEBUFFER,
        D.COLOR_ATTACHMENT0,
        D.TEXTURE_2D,
        n2,
        0
      ), D.viewport(0, 0, e3, t3), D.clearColor(0, 0, 0, 1), D.clear(D.COLOR_BUFFER_BIT), {
        tex: n2,
        fbo: o2,
        w: e3,
        h: t3,
        attach(e4) {
          return D.activeTexture(D.TEXTURE0 + e4), D.bindTexture(D.TEXTURE_2D, this.tex), e4;
        }
      };
    }
    function r() {
      const e3 = I.width / Math.max(I.height, 1);
      let t3, n2;
      e3 >= 1 ? (n2 = f, t3 = Math.min(Math.round(f * e3), h)) : (t3 = f, n2 = Math.min(Math.round(f / e3), h)), Q && Q.w === t3 && Q.h === n2 || (Q && (D.deleteTexture(Q.tex), D.deleteFramebuffer(Q.fbo), D.deleteTexture(j.tex), D.deleteFramebuffer(j.fbo)), Q = i(t3, n2), j = i(t3, n2), Z.texelX = 1 / t3, Z.texelY = 1 / n2);
    }
    function a(e3) {
      e3 ? (D.bindFramebuffer(D.FRAMEBUFFER, e3.fbo), D.viewport(0, 0, e3.w, e3.h)) : (D.bindFramebuffer(D.FRAMEBUFFER, null), D.viewport(0, 0, I.width, I.height)), D.drawArrays(D.TRIANGLE_STRIP, 0, 4);
    }
    function s(e3, t3) {
      const n2 = performance.now(), o2 = Math.max((n2 - ee) / 1e3, 4e-3);
      ee = n2;
      const i2 = J, r2 = (e3 - i2.left) / i2.width, a2 = 1 - (t3 - i2.top) / i2.height;
      K.init ? (K.px = K.x, K.py = K.y) : (K.px = r2, K.py = a2, K.init = true), K.vx = (r2 - K.px) / o2, K.vy = (a2 - K.py) / o2, K.x = r2, K.y = a2, K.moved = true;
    }
    function l(e3, t3, n2, o2, i2) {
      D.useProgram(X.p), D.uniform1i(X.uniforms.uField, Z.read.attach(0)), D.uniform1f(X.uniforms.aspectRatio, I.width / I.height), D.uniform2f(X.uniforms.point, e3, t3), D.uniform3f(X.uniforms.color, n2, o2, i2), D.uniform1f(X.uniforms.radius, E), a(Z.write), Z.swap();
    }
    function c() {
      const e3 = I.width / Math.max(I.height, 1), t3 = Math.max(-M, Math.min(M, K.vx)) * v, n2 = Math.max(-M, Math.min(M, K.vy)) * v, o2 = Math.hypot((K.x - K.px) * e3, K.y - K.py), i2 = Math.max(1, Math.ceil(o2 / (0.4 * Math.sqrt(E))));
      for (let e4 = 0; e4 < i2; e4++) {
        const o3 = 1 === i2 ? 1 : e4 / (i2 - 1);
        l(K.px + (K.x - K.px) * o3, K.py + (K.y - K.py) * o3, _, t3, n2);
      }
    }
    function d() {
      ae = requestAnimationFrame(d);
      const n2 = performance.now(), o2 = Math.min((n2 - re) / 1e3, 0.033);
      re = n2, D.disable(D.BLEND), K.moved && (R() && c(), K.moved = false), D.useProgram(W.p), D.uniform2f(W.uniforms.texelSize, Z.texelX, Z.texelY), D.uniform1f(W.uniforms.dt, o2), D.uniform1f(W.uniforms.friction, y), D.uniform1f(W.uniforms.spread, w), D.uniform1f(W.uniforms.decay, b), D.uniform1f(W.uniforms.wobble, x), D.uniform1f(W.uniforms.grain, T), D.uniform1f(W.uniforms.time, 1e-3 * n2), D.uniform1i(W.uniforms.uField, Z.read.attach(0)), a(Z.write), Z.swap(), n2 < F && t2(), D.useProgram(Y.p), D.uniform1i(Y.uniforms.uField, Z.read.attach(0)), D.uniform3f(Y.uniforms.maskColor, q[0], q[1], q[2]), D.uniform2f(Y.uniforms.edge, S, k), D.uniform1f(Y.uniforms.bottomFade, A), D.uniform1f(Y.uniforms.time, 1e-3 * n2), a(null), P && !e2._fluidPainted && (e2._fluidPainted = true, P.style.display = "none");
    }
    function u() {
      const t3 = e2.getBoundingClientRect();
      J = t3;
      const n2 = 1;
      I.width = Math.round(t3.width * n2), I.height = Math.round(t3.height * n2), r();
    }
    function p() {
      null === ae && (re = performance.now(), t2(), J = e2.getBoundingClientRect(), d());
    }
    function m() {
      null !== ae && (cancelAnimationFrame(ae), ae = null);
    }
    function g() {
      Q && (D.bindFramebuffer(D.FRAMEBUFFER, Q.fbo), D.viewport(0, 0, Q.w, Q.h), D.clearColor(0, 0, 0, 1), D.clear(D.COLOR_BUFFER_BIT), D.bindFramebuffer(D.FRAMEBUFFER, j.fbo), D.viewport(0, 0, j.w, j.h), D.clear(D.COLOR_BUFFER_BIT), D.useProgram(Y.p), D.uniform1i(Y.uniforms.uField, Z.read.attach(0)), D.uniform3f(Y.uniforms.maskColor, q[0], q[1], q[2]), D.uniform2f(Y.uniforms.edge, S, k), D.uniform1f(Y.uniforms.bottomFade, A), D.uniform1f(Y.uniforms.time, 1e-3 * performance.now()), a(null));
    }
    if (e2._fluidActive) return;
    e2._fluidActive = true;
    const f = 512, h = 1440, v = 1.6, y = 3, w = 0.79, b = 1.5, E = 4e-3, _ = 3.5, x = 2.6, T = 0.7, S = 0.39, k = 0.4, M = 4, A = 0.18, L = "--_colors---background--bg", C = 1200, R = () => window.__preloaderState?.done && !window.__preloaderRunning && !window.__transitionRunning, P = e2.querySelector(".anim-fluid-cover");
    let I = e2.querySelector(".anim-fluid-canvas");
    I || (I = document.createElement("canvas"), setAnimationMarker(I, "fluid-canvas", ""), I.style.cssText = "position:absolute; inset:0; width:100%; height:100%;", e2.appendChild(I)), I.style.color = `var(${L})`;
    const q = [1, 1, 1];
    let F = performance.now() + C;
    t2();
    const O = new MutationObserver(() => {
      F = performance.now() + C;
    });
    O.observe(document.body, { attributes: true, attributeFilter: ["class"] });
    const D = I.getContext("webgl2", { alpha: true, premultipliedAlpha: false });
    if (!D) return void (e2._fluidActive = false);
    D.getExtension("EXT_color_buffer_float");
    const $ = D.getExtension("OES_texture_float_linear") ? D.LINEAR : D.NEAREST, z = "#version 300 es\n      precision highp float;\n      in vec2 aPos;\n      out vec2 vUv;\n      void main () {\n        vUv = aPos * 0.5 + 0.5;\n        gl_Position = vec4(aPos, 0.0, 1.0);\n      }", H = "#version 300 es\n      precision highp float;\n      in vec2 vUv; out vec4 fragColor;\n      uniform sampler2D uField;\n      uniform float aspectRatio;\n      uniform vec3 color;\n      uniform vec2 point;\n      uniform float radius;\n      void main () {\n        vec2 p = vUv - point;\n        p.x *= aspectRatio;\n        float g = exp(-dot(p, p) / radius);\n        vec4 f = texture(uField, vUv);\n        float w = clamp(g * color.x, 0.0, 1.0);\n        fragColor = vec4(\n          f.r + g * color.x,\n          mix(f.g, color.y, w),\n          mix(f.b, color.z, w),\n          1.0\n        );\n      }", U = "#version 300 es\n      precision highp float;\n      in vec2 vUv; out vec4 fragColor;\n      uniform sampler2D uField;\n      uniform vec2 texelSize;\n      uniform float dt;\n      uniform float friction;\n      uniform float spread;\n      uniform float decay;\n      uniform float wobble;\n      uniform float grain;\n      uniform float time;\n\n      float hash(vec2 p) {\n        p = fract(p * vec2(123.34, 456.21));\n        p += dot(p, p + 45.32);\n        return fract(p.x * p.y);\n      }\n      float noise(vec2 p) {\n        vec2 i = floor(p); vec2 f = fract(p);\n        f = f * f * (3.0 - 2.0 * f);\n        return mix(\n          mix(hash(i), hash(i + vec2(1, 0)), f.x),\n          mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), f.x), f.y);\n      }\n      float fbm(vec2 p) {\n        return noise(p) * 0.55 + noise(p * 2.6) * 0.3 + noise(p * 6.3) * 0.15;\n      }\n\n      void main () {\n        vec2 vel = texture(uField, vUv).gb;\n        vec2 coord = vUv - vel * dt;\n        vec4 s = texture(uField, coord);\n\n        float t = time * 0.3;\n        vec2 warp = (vec2(\n          fbm(vUv * 11.0 + t),\n          fbm(vUv * 11.0 + 37.2 - t)\n        ) - 0.5) * 2.0 * wobble * texelSize;\n\n        vec4 nL = texture(uField, coord + vec2(-texelSize.x, 0.0) + warp);\n        vec4 nR = texture(uField, coord + vec2( texelSize.x, 0.0) + warp);\n        vec4 nT = texture(uField, coord + vec2(0.0,  texelSize.y) + warp);\n        vec4 nB = texture(uField, coord + vec2(0.0, -texelSize.y) + warp);\n        float avgD = (nL.r + nR.r + nT.r + nB.r) * 0.25;\n        vec2 avgV = (nL.gb + nR.gb + nT.gb + nB.gb) * 0.25;\n\n        float d = mix(s.r, avgD, spread);\n        vec2 v = mix(s.gb, avgV, spread * 0.5);\n\n        float g = fbm(vUv * 15.0 + 5.1 + t * 0.6);\n        d *= 1.0 / (1.0 + (decay + grain * decay * (g - 0.5) * 2.0) * dt);\n        v *= 1.0 / (1.0 + friction * dt);\n\n        fragColor = vec4(max(d, 0.0), v, 1.0);\n      }", N = "#version 300 es\n      precision highp float;\n      in vec2 vUv; out vec4 fragColor;\n      uniform sampler2D uField;\n      uniform vec3 maskColor;\n      uniform vec2 edge;\n      uniform float bottomFade;\n      uniform float time;\n\n      float hash(vec2 p) {\n        p = fract(p * vec2(123.34, 456.21));\n        p += dot(p, p + 45.32);\n        return fract(p.x * p.y);\n      }\n      float noise(vec2 p) {\n        vec2 i = floor(p); vec2 f = fract(p);\n        f = f * f * (3.0 - 2.0 * f);\n        return mix(\n          mix(hash(i), hash(i + vec2(1, 0)), f.x),\n          mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), f.x), f.y);\n      }\n      float fbm(vec2 p) {\n        return noise(p) * 0.55 + noise(p * 2.6) * 0.3 + noise(p * 6.3) * 0.15;\n      }\n\n      void main () {\n        float d = texture(uField, vUv).r;\n\n        float n = fbm(vec2(vUv.x * 9.0, time * 0.25));\n        float localFade = bottomFade * (0.35 + n * 1.3);\n        d *= smoothstep(0.0, localFade, vUv.y);\n\n        float alpha = 1.0 - smoothstep(edge.x, edge.y, d);\n        fragColor = vec4(maskColor, alpha);\n      }", B = n(D.VERTEX_SHADER, z), X = o(H), W = o(U), Y = o(N), V = D.createVertexArray();
    D.bindVertexArray(V);
    const G = D.createBuffer();
    D.bindBuffer(D.ARRAY_BUFFER, G), D.bufferData(
      D.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      D.STATIC_DRAW
    ), D.enableVertexAttribArray(0), D.vertexAttribPointer(0, 2, D.FLOAT, false, 0, 0);
    let Q = null, j = null;
    const Z = {
      get read() {
        return Q;
      },
      get write() {
        return j;
      },
      swap() {
        const e3 = Q;
        Q = j, j = e3;
      },
      texelX: 1 / f,
      texelY: 1 / f
    }, K = {
      x: 0.5,
      y: 0.5,
      px: 0.5,
      py: 0.5,
      vx: 0,
      vy: 0,
      moved: false,
      init: false
    };
    let J = e2.getBoundingClientRect(), ee = performance.now();
    const te = (e3) => s(e3.clientX, e3.clientY), ne = (e3) => s(e3.touches[0].clientX, e3.touches[0].clientY), oe = () => {
      K.init = false;
    };
    e2.addEventListener("mousemove", te), e2.addEventListener("touchmove", ne, { passive: true }), e2.addEventListener("mouseleave", oe);
    const ie = () => {
      J = e2.getBoundingClientRect();
    };
    lenis?.on && lenis.on("scroll", ie), window.addEventListener("scroll", ie, { passive: true });
    let re = performance.now(), ae = null;
    const se = new ResizeObserver(u);
    se.observe(e2);
    const le = new IntersectionObserver(
      ([e3]) => {
        e3.isIntersecting ? (K.init = false, p()) : (m(), g());
      },
      { threshold: 0 }
    );
    le.observe(e2), u(), p(), e2._destroyFluidReveal = () => {
      m(), e2.removeEventListener("mousemove", te), e2.removeEventListener("touchmove", ne), e2.removeEventListener("mouseleave", oe), lenis?.off && lenis.off("scroll", ie), window.removeEventListener("scroll", ie), se.disconnect(), le.disconnect(), O.disconnect();
      const t3 = D.getExtension("WEBGL_lose_context");
      t3 && t3.loseContext(), e2._fluidActive = false;
    };
  });
}
function destroyFluidReveal(e = document) {
  e.querySelectorAll(".anim-fluid-reveal").forEach((e2) => {
    e2._destroyFluidReveal && e2._destroyFluidReveal();
  });
}
