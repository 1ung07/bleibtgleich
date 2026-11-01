function initHaptics() {
  document.addEventListener("click", (e) => {
    const t = e.target.closest(".anim-haptic");
    t && window._haptics?.trigger(getAnimationMarker(t, "haptic") || "medium");
  });
}
