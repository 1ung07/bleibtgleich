function markerClass(name, value) {
  const base = `anim-${name}`;
  if (value === void 0 || value === null || value === "") return base;
  const suffix = String(value).toLowerCase().replace(/[^a-z0-9_-]+/g, "-").replace(/^-+|-+$/g, "");
  return suffix ? `${base}--${suffix}` : base;
}
function getAnimationMarker(element, name) {
  if (!element) return null;
  const base = markerClass(name);
  const valueClass = [...element.classList].find(
    (className) => className.startsWith(`${base}--`)
  );
  return valueClass ? valueClass.slice(base.length + 2) : element.classList.contains(base) ? "" : null;
}
function setAnimationMarker(element, name, value = "") {
  const base = markerClass(name);
  [...element.classList].forEach((className) => {
    if (className === base || className.startsWith(`${base}--`)) {
      element.classList.remove(className);
    }
  });
  element.classList.add(base, markerClass(name, value));
}
function removeAnimationMarker(element, name) {
  const base = markerClass(name);
  [...element.classList].forEach((className) => {
    if (className === base || className.startsWith(`${base}--`)) {
      element.classList.remove(className);
    }
  });
}
function animationMarkerClass(name, value) {
  return markerClass(name, value);
}
export {
  animationMarkerClass,
  getAnimationMarker,
  removeAnimationMarker,
  setAnimationMarker
};
