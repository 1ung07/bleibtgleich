function initCutList(e = document) {
  const t = e.querySelectorAll(".anim-cut--list");
  t.length && t.forEach((t2) => {
    let n = null, o = t2.parentElement;
    for (; o && o !== e.parentElement && !n; )
      n = o.querySelector(".anim-cut--counter"), o = o.parentElement;
    const i = Array.from(t2.querySelectorAll(".anim-cut--item"));
    if (!i.length) return;
    const r = parseInt(getAnimationMarker(t2, "cut-max"), 10) || 1, a = i.length - r;
    i.forEach((e2, t3) => {
      t3 >= r && (e2.style.display = "none");
    }), n && a > 0 && (n.textContent = `+${a}`, n.style.setProperty("display", "block", "important"));
  });
}
function initNextEntity(e = 1) {
  const t = document.querySelector(".anim-barba-namespace");
  if (!t) return;
  const n = getAnimationMarker(t, "barba-namespace"), o = [...document.querySelectorAll(".anim-next-entity-item")];
  if (!o.length) return;
  const i = o.findIndex((e2) => getAnimationMarker(e2, "next-entity-item") === n), r = new Set(Array.from({ length: e }, (e2, t2) => o[(i + 1 + t2) % o.length]));
  o.forEach((e2) => {
    r.has(e2) || e2.remove();
  });
}
