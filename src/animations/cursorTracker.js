function initCursorTracker() {
  function e(e2) {
    const t2 = document.createRange();
    t2.selectNodeContents(e2), t2.collapse(false);
    const n2 = getSelection();
    n2.removeAllRanges(), n2.addRange(t2);
  }
  function t(e2) {
    w[e2] && (clearTimeout(w[e2].holdTimer), clearTimeout(w[e2].fadeTimer), w[e2].wrap.remove(), delete w[e2]);
  }
  function n() {
    Object.keys(w).forEach(t);
  }
  function o(e2) {
    let t2 = w[e2];
    if (!t2) {
      const n2 = document.createElement("div");
      n2.classList.add("remote-cursor-wrap"), n2.style.cssText = "position:absolute;top:0;left:0;pointer-events:none;";
      const o2 = document.createElement("img");
      o2.classList.add("remote-cursor"), o2.src = "/media/cdn.prod.website-files.com/6a2fcc5552066493ef9a5cf9/6a36b538efe357a44916fd89_cursor.svg", o2.style.cssText = "width:1.25em;height:1.25em;display:block;";
      const i2 = document.createElement("div");
      i2.classList.add("remote-cursor-msg"), i2.style.cssText = "position:absolute;left:14px;top:14px;display:none;opacity:1;";
      const r2 = document.createElement("span");
      r2.classList.add("p1"), i2.appendChild(r2), n2.appendChild(o2), n2.appendChild(i2), T.appendChild(n2), t2 = w[e2] = {
        wrap: n2,
        img: o2,
        bubble: i2,
        textEl: r2,
        lastSeen: 0,
        holdTimer: null,
        fadeTimer: null
      };
    }
    return t2;
  }
  function i(e2) {
    clearTimeout(e2.holdTimer), clearTimeout(e2.fadeTimer), e2.bubble.style.transition = "opacity 120ms ease", e2.bubble.style.opacity = "1", e2.holdTimer = setTimeout(() => {
      e2.bubble.style.transition = `opacity ${y}ms linear`, e2.bubble.style.opacity = "0", e2.fadeTimer = setTimeout(() => {
        e2.bubble.style.display = "none", e2.textEl.textContent = "";
      }, y);
    }, v);
  }
  function r() {
    clearTimeout(A), clearTimeout(L), S.style.transition = "opacity 120ms ease", S.style.opacity = "1", A = setTimeout(() => {
      S.style.transition = `opacity ${y}ms linear`, S.style.opacity = "0", L = setTimeout(() => d(true), y);
    }, v);
  }
  function a() {
    S.style.left = `${_()}px`, S.style.top = `${x()}px`;
  }
  function s() {
    u.emit("cursorMove", {
      userId: p,
      x: _() / document.documentElement.scrollWidth,
      y: x() / document.documentElement.scrollHeight,
      page: b
    });
  }
  function l(e2) {
    u.emit("cursorMessage", { userId: p, text: e2, page: b });
  }
  function c() {
    k || (k = true, S.textContent = "", S.style.display = "block", a(), S.focus(), r(), M = setInterval(s, f));
  }
  function d(e2) {
    k && (k = false, clearTimeout(A), clearTimeout(L), clearInterval(M), M = null, S.style.display = "none", S.style.opacity = "1", S.textContent = "", e2 || l(""));
  }
  if (/Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  ))
    return () => {
    };
  const u = getSocket(), p = localStorage.getItem("cursorUserId") || Math.random().toString(36).substr(2, 9);
  localStorage.setItem("cursorUserId", p);
  const m = 5e3, g = 2e3, f = 2e3, h = 60, v = 8e3, y = 2500, w = {};
  let b = window.location.pathname, E = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  const _ = () => E.x + window.scrollX, x = () => E.y + window.scrollY;
  if (!document.getElementById("cursor-chat-styles")) {
    const e2 = document.createElement("style");
    e2.id = "cursor-chat-styles", e2.textContent = ".cursor-chat-input:empty::before{content:attr(aria-label);opacity:.55;pointer-events:none;}", document.head.appendChild(e2);
  }
  const T = document.createElement("div");
  T.classList.add("cursor-container"), T.style.cssText = "position:absolute;top:0;left:0;width:0;height:0;z-index:9000;pointer-events:none;", document.body.appendChild(T);
  const S = document.createElement("div");
  S.classList.add("cursor-chat-input", "p1"), S.contentEditable = "true", S.spellcheck = false, S.setAttribute("aria-label", "Say something..."), S.style.cssText = "position:absolute;display:none;z-index:99999;transform:translate(14px,14px);opacity:1;", T.appendChild(S);
  let k = false, M = null, A = null, L = null;
  window.__cursorPageSync = () => {
    b = window.location.pathname, n(), d(true);
  };
  const C = (e2) => {
    E = { x: e2.clientX, y: e2.clientY }, k && a(), s();
  }, R = () => {
    k && a(), s();
  }, P = (e2) => {
    null === e2.relatedTarget && (l(""), u.emit("cursorLeave", { userId: p }), d(true));
  }, I = () => {
    document.hidden ? (l(""), u.emit("cursorLeave", { userId: p }), d(true)) : s();
  }, q = () => window.__cursorPageSync(), F = (e2) => e2 && ("INPUT" === e2.tagName || "TEXTAREA" === e2.tagName || e2.isContentEditable && e2 !== S), O = (e2) => {
    k ? "Escape" !== e2.key && "Enter" !== e2.key || (e2.preventDefault(), d(false)) : "Slash" !== e2.code || F(document.activeElement) || e2.metaKey || e2.ctrlKey || e2.altKey || (e2.preventDefault(), c());
  }, D = () => {
    /[\r\n]/.test(S.textContent) && (S.textContent = S.textContent.replace(/[\r\n]+/g, " "), e(S)), S.textContent.length > h && (S.textContent = S.textContent.slice(0, h), e(S)), r(), l(S.textContent);
  }, $ = () => {
    k && requestAnimationFrame(() => {
      k && S.focus();
    });
  }, z = (e2) => {
    k && e2.target !== S && e2.preventDefault();
  };
  document.addEventListener("mousemove", C), window.addEventListener("scroll", R, { passive: true }), document.addEventListener("mouseleave", P), document.addEventListener("visibilitychange", I), document.addEventListener("keydown", O), document.addEventListener("mousedown", z, true), window.addEventListener("popstate", q), S.addEventListener("input", D), S.addEventListener("blur", $);
  const H = (e2) => t(e2.userId), U = (e2) => {
    if (e2.userId === p) return;
    if (e2.page !== b) return t(e2.userId);
    const n2 = o(e2.userId);
    n2.lastSeen = Date.now(), n2.wrap.style.left = e2.x * document.documentElement.scrollWidth + "px", n2.wrap.style.top = e2.y * document.documentElement.scrollHeight + "px";
  }, N = (e2) => {
    if (e2.userId === p) return;
    if (e2.page !== b) return;
    const t2 = o(e2.userId);
    t2.lastSeen = Date.now();
    const n2 = (e2.text || "").trim();
    n2 ? (t2.textEl.textContent = n2, t2.bubble.style.display = "block", i(t2)) : (clearTimeout(t2.holdTimer), clearTimeout(t2.fadeTimer), t2.bubble.style.display = "none", t2.textEl.textContent = "");
  }, B = (e2) => t(e2);
  u.on("cursorLeave", H), u.on("cursorMove", U), u.on("cursorMessage", N), u.on("userDisconnect", B);
  const X = setInterval(() => {
    const e2 = Date.now();
    Object.keys(w).forEach((n2) => {
      e2 - w[n2].lastSeen > m && t(n2);
    });
  }, g);
  return () => {
    clearInterval(X), d(true), document.removeEventListener("mousemove", C), window.removeEventListener("scroll", R), document.removeEventListener("mouseleave", P), document.removeEventListener("visibilitychange", I), document.removeEventListener("keydown", O), document.removeEventListener("mousedown", z, true), window.removeEventListener("popstate", q), S.removeEventListener("input", D), S.removeEventListener("blur", $), u.off("cursorLeave", H), u.off("cursorMove", U), u.off("cursorMessage", N), u.off("userDisconnect", B), n(), T.remove();
    const e2 = document.getElementById("cursor-chat-styles");
    e2 && e2.remove(), window.__cursorPageSync && delete window.__cursorPageSync;
  };
}
