function animateAwardCertificate(certificate, clipPath, scale) {
  gsap.killTweensOf(certificate);
  gsap.to(certificate, {
    clipPath,
    scale,
    duration: durS,
    ease: "Out",
    overwrite: "auto",
  });
}

function initAwards(container = document) {
  const awardItems = container.querySelectorAll(".anim-award--item");
  if (!awardItems.length) return;

  let topZIndex = 1;

  awardItems.forEach((awardItem) => {
    if (awardItem._awardInit) return;
    awardItem._awardInit = true;

    const certificate = awardItem.querySelector(".anim-award--certificate");
    if (!certificate) return;

    gsap.set(certificate, {
      display: "block",
      clipPath: "inset(100% 0% 0% 0%)",
      scale: 0.9,
    });

    awardItem.addEventListener("mouseenter", () => {
      topZIndex += 1;
      gsap.set(certificate, { zIndex: topZIndex });
      animateAwardCertificate(
        certificate,
        "inset(0% 0% 0% 0%)",
        1,
      );
    });

    awardItem.addEventListener("mouseleave", () => {
      animateAwardCertificate(
        certificate,
        "inset(0% 0% 100% 0%)",
        0.9,
      );
    });
  });
}
