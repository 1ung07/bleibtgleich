function initNavDropdown(container = document) {
  const menuButtons = container.querySelectorAll(".anim-nav--button");
  if (!menuButtons.length) return;
  const cleanups = [];

  menuButtons.forEach((button) => {
    const menu = container.querySelector(".anim-nav--link-group");
    if (!menu) return;

    const links = menu.querySelectorAll(".anim-nav--link");
    if (!links.length) return;

    const archiveLink = menu.querySelector(".anim-nav-link--archive");
    const buttonText = button.querySelectorAll(".link-inner");
    const setButtonText = (text) => {
      buttonText.forEach((element) => {
        if (element._setLinkText) {
          element._setLinkText(text);
          return;
        }

        element
          .querySelectorAll(".anim-nav--label")
          .forEach((label) => (label.textContent = text));
      });
    };
    const isMobile = () => window.matchMedia("(max-width: 991px)").matches;
    const hiddenClipPath = () =>
      isMobile()
        ? "inset(0% 0% 0% 100%)"
        : "inset(0% 0% 100% 0%)";
    const visibleClipPath = "inset(0% 0% 0% 0%)";
    const getAnimatedLinks = () =>
      isMobile() && archiveLink
        ? [...links].filter((link) => link !== archiveLink)
        : [...links];

    gsap.set(menu, { display: "none" });
    gsap.set(getAnimatedLinks(), { clipPath: hiddenClipPath() });
    if (archiveLink) gsap.set(archiveLink, { yPercent: 100 });

    let isOpen = false;
    let menuTimeline = null;
    let lastScrollY = window.scrollY;

    const killMenuAnimation = () => {
      menuTimeline?.kill();
      menuTimeline = null;
      gsap.killTweensOf([...links, archiveLink, menu].filter(Boolean));
    };

    const closeMenu = () => {
      if (!isOpen) return;

      isOpen = false;
      setButtonText("Menu");
      killMenuAnimation();

      const animatedLinks = getAnimatedLinks();
      menuTimeline = gsap.timeline();
      if (archiveLink) {
        menuTimeline.to(
          archiveLink,
          { yPercent: 100, duration: durS, ease: "In" },
          0,
        );
      }
      menuTimeline
        .to(
          animatedLinks,
          {
            clipPath: hiddenClipPath(),
            duration: durS,
            ease: "In",
            stagger: { each: stagger, from: isMobile() ? "end" : "start" },
          },
          0,
        )
        .set(menu, { display: "none" });
    };
    window.closeMenu = closeMenu;

    const handleClick = (event) => {
      event.stopPropagation();
      if (isOpen) {
        closeMenu();
        return;
      }

      isOpen = true;
      lastScrollY = window.scrollY;
      setButtonText("Close");
      killMenuAnimation();

      const animatedLinks = getAnimatedLinks();
      menuTimeline = gsap.timeline();
      menuTimeline.set(menu, { display: "flex" });
      menuTimeline.to(animatedLinks, {
        clipPath: visibleClipPath,
        duration: durM,
        ease: "Out",
        overwrite: "auto",
        stagger: {
          amount: stagger * animatedLinks.length,
          from: isMobile() ? "start" : "end",
        },
      });
      if (archiveLink) {
        menuTimeline.to(
          archiveLink,
          {
            yPercent: 0,
            duration: durM,
            ease: "Out",
            overwrite: "auto",
          },
          `-=${0.5 * durM}`,
        );
      }
    };

    const handleScroll = () => {
      if (isOpen && Math.abs(window.scrollY - lastScrollY) > 10) {
        closeMenu();
      }
    };
    button.addEventListener("click", handleClick);
    window.addEventListener("scroll", handleScroll, { passive: true });

    cleanups.push(() => {
      button.removeEventListener("click", handleClick);
      window.removeEventListener("scroll", handleScroll);
      if (isOpen) {
        isOpen = false;
        menuTimeline?.kill();
        gsap.set(menu, { display: "none" });
        setButtonText("Menu");
      }
      killMenuAnimation();
      if (window.closeMenu === closeMenu) {
        window.closeMenu = undefined;
      }
    });
  });

  return () => cleanups.forEach((cleanup) => cleanup());
}

function updateNavIndicators() {
  const normalizePath = (location) =>
    location.pathname.replace(/\/$/, "") || "/";
  const currentPath = normalizePath(window.location);

  document.querySelectorAll(".anim-nav--link").forEach((link) => {
    const indicator = link.querySelector(".anim-nav--indicator");
    if (!indicator) return;

    const linkPath = normalizePath(
      new URL(link.href, window.location.origin),
    );
    const isCurrent =
      linkPath === "/"
        ? currentPath === "/"
        : currentPath === linkPath || currentPath.startsWith(`${linkPath}/`);
    indicator.classList.toggle("is-current", isCurrent);
  });
}

function initLinks(container = document) {
  const linkContents = gsap.utils.toArray(".link-inner", container);
  if (!linkContents.length) return;

  const initializeLink = (linkContent) => {
    const label = linkContent.querySelector(".anim-link--label");
    const shadow = linkContent.querySelector(".anim-link--shadow");
    if (!label || !shadow) return () => {};

    let timeline;
    const createTimeline = () => {
      gsap.set(shadow, { display: "block" });
      animateLink(shadow, "initial");
      timeline = gsap.timeline({ paused: true });
      animateLink(label, "hide", 0, timeline, 0);
      animateLink(shadow, "reveal", 0, timeline, 0);
    };

    createTimeline();
    const play = () => timeline.play();
    const reverse = () => timeline.reverse();
    const trigger = linkContent.closest(".anim-link-trigger");

    linkContent.addEventListener("mouseenter", play);
    linkContent.addEventListener("mouseleave", reverse);
    trigger?.addEventListener("mouseenter", play);
    trigger?.addEventListener("mouseleave", reverse);

    linkContent._setLinkText = (text) => {
      timeline.kill();
      label._split?.revert();
      delete label._split;
      shadow._split?.revert();
      delete shadow._split;
      label.textContent = text;
      shadow.textContent = text;
      createTimeline();
    };

    return () => {
      linkContent.removeEventListener("mouseenter", play);
      linkContent.removeEventListener("mouseleave", reverse);
      trigger?.removeEventListener("mouseenter", play);
      trigger?.removeEventListener("mouseleave", reverse);
      timeline.kill();
      delete linkContent._setLinkText;
      label._split?.revert();
      delete label._split;
      shadow._split?.revert();
      delete shadow._split;
    };
  };

  const mediaQuery = gsap.matchMedia();
  mediaQuery.add("(min-width: 992px)", () => {
    const cleanups = linkContents.map(initializeLink);
    return () => cleanups.forEach((cleanup) => cleanup());
  });
  return () => mediaQuery.revert();
}
