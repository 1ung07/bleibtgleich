import { animationMarkerClass } from "./markerHelpers.js";
function animationPart(markers, className = "") {
  const classes = Object.entries(markers).flatMap(([name, value]) => [
    animationMarkerClass(name),
    animationMarkerClass(name, value)
  ]);
  return { className: [...new Set([className, ...classes].filter(Boolean))].join(" ") };
}
export {
  animationPart
};
