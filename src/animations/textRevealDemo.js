function initTextRevealDemo(e = document) {
  const t = [...e.querySelectorAll(".anim-demo-tab")], n = [...e.querySelectorAll(".anim-demo")].filter(
    (e2) => ["reveal", "hide"].includes(getAnimationMarker(e2, "demo"))
  ), o = [...e.querySelectorAll(".anim-demo-content")];
  if (!t.length || !o.length) return;
  const i = new Map(o.map((e2) => [getAnimationMarker(e2, "demo-content"), e2])), r = new Map([...i.keys()].map((e2) => [e2, true])), a = (e2, t2, n2 = 0) => {
    const o2 = i.get(e2);
    if (!o2) return;
    const a2 = "reveal" === t2;
    r.get(e2) !== a2 && (r.set(e2, a2), animateTextReveal(o2, t2, n2));
  };
  let s = getAnimationMarker(
    t.find((e2) => e2.classList.contains("is-active")) || t[0],
    "demo-tab"
  );
  const l = (e2) => {
    if (!i.has(e2) || e2 === s) return;
    const n2 = s;
    s = e2, t.forEach(
      (t2) => t2.classList.toggle(
        "is-active",
        getAnimationMarker(t2, "demo-tab") === e2
      )
    ), a(n2, "hide", 0), a(e2, "reveal", 0);
  }, c = (e2) => l(getAnimationMarker(e2.currentTarget, "demo-tab")), d = (e2) => a(s, getAnimationMarker(e2.currentTarget, "demo"), 0);
  t.forEach((e2) => {
    e2.classList.toggle("is-active", getAnimationMarker(e2, "demo-tab") === s), e2.addEventListener("click", c);
  }), n.forEach((e2) => e2.addEventListener("click", d)), i.forEach((e2, t2) => {
    t2 !== s && (r.set(t2, false), animateTextReveal(e2, "hide", 0));
  }), regRoute(() => {
    t.forEach((e2) => e2.removeEventListener("click", c)), n.forEach((e2) => e2.removeEventListener("click", d)), i.clear(), r.clear();
  });
}
