function initFooterTime(e = document) {
  const t = e.querySelector(".anim-footer-time--hours"), n = e.querySelector(".anim-footer-time--minutes");
  if (!t && !n) return;
  window.__footerTimeInterval && (clearInterval(window.__footerTimeInterval), window.__footerTimeInterval = null);
  const o = (e2) => String(e2).padStart(2, "0"), i = () => {
    const e2 = /* @__PURE__ */ new Date(), i2 = o(e2.getHours()), r = o(e2.getMinutes());
    t && t.textContent !== i2 && (t.textContent = i2), n && n.textContent !== r && (n.textContent = r);
  };
  i(), window.__footerTimeInterval = setInterval(i, 1e3);
}
