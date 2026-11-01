function initFooterLogo(e = document) {
  const t = e.querySelector(".anim-footer-logo--list");
  if (!t) return;
  const n = e.querySelector(".anim-footer-logo--wrap") || t, o = Array.from(t.querySelectorAll(".anim-footer-logo--item"));
  if (o.length < 2) return;
  window.__footerLogoInterval && (clearInterval(window.__footerLogoInterval), window.__footerLogoInterval = null), n._footerLogoClick && (n.removeEventListener("click", n._footerLogoClick), n._footerLogoClick = null);
  const i = (e2) => {
    e2.style.position = "relative", e2.style.display = "block";
  }, r = (e2) => {
    e2.style.position = "absolute", e2.style.display = "none";
  };
  let a = 0;
  o.forEach((e2, t2) => 0 === t2 ? i(e2) : r(e2));
  const s = (e2) => {
    e2 !== a && (r(o[a]), i(o[e2]), a = e2);
  }, l = () => s((a + 1) % o.length), c = () => {
    window.__footerLogoInterval && clearInterval(window.__footerLogoInterval), window.__footerLogoInterval = setInterval(l, 5e3);
  };
  n._footerLogoClick = () => {
    l(), c();
  }, n.addEventListener("click", n._footerLogoClick), c();
}
