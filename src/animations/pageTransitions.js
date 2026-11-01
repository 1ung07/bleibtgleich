function isExcludedPage() {
  const pathname = window.location.pathname.replace(/\/$/, "") || "/";
  const excludedPath = EXCLUDED_PATHS.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`),
  );
  if (excludedPath) return true;

  const pageNamespace = getAnimationMarker(
    document.querySelector(".anim-barba-namespace"),
    "barba-namespace",
  );
  return EXCLUDED_PAGES_NS.includes(pageNamespace);
}

function getSocket() {
  if (!socket) socket = io(SOCKET_URL);
  return socket;
}

function runPageReveals(container = document) {
  if (
    !window.__revealsPending ||
    window.__transitionRunning ||
    window.__preloaderRunning
  ) {
    return;
  }

  window.__revealsPending = false;
  initElementsReveal(container);
  initLogoMorph(container);
  initFluidReveal(container);
  initOrbitTiles(container);
}

function initPreloader(container = document) {
  if (isExcludedPage()) {
    window.__preloaderState.done = true;
    window.__preloaderState.startPage = null;
    window.__preloaderRunning = false;
    document.body.classList.remove("is-preloading");

    const navGrid = container.querySelector(".anim-nav--grid");
    const navButton = container.querySelector(".anim-nav--button");
    const stickyNames = container.querySelectorAll(".anim-sticky-name");
    const preloaderElements = container.querySelectorAll(".anim-preloader");

    if (preloaderElements.length) {
      gsap.set(preloaderElements, { display: "none" });
    }
    if (navGrid) {
      gsap.set(navGrid, { visibility: "visible", x: 0, y: 0 });
    }
    if (navButton) {
      gsap.set(navButton, { visibility: "visible", x: 0, y: 0 });
    }
    if (stickyNames.length) {
      gsap.set(stickyNames, { visibility: "visible" });
    }

    lenis.start();
    window.dispatchEvent(new CustomEvent("lenis:settled"));
    return;
  }

  const progress = container.querySelector(".anim-preloader--progress");
  const count = container.querySelector(".anim-preloader--count");
  const primaryText = container.querySelector(".anim-preloader--text-1");
  const secondaryText = [
    ...container.querySelectorAll(".anim-preloader--text-2"),
  ];
  if (!progress || !count) return;
  const preloader = progress.closest(".preloader-wrap");

  const pageNamespace = getAnimationMarker(
    container.querySelector(".anim-barba-namespace"),
    "barba-namespace",
  );
  const isHomePage = pageNamespace === "home";
  const textElements = [count, primaryText, ...secondaryText].filter(Boolean);
  const navGrid = container.querySelector(".anim-nav--grid");
  const navButton = container.querySelector(".anim-nav--button");
  const stickyNames = container.querySelectorAll(".anim-sticky-name");

  if (window.__preloaderState.done) {
    document.body.classList.remove("is-preloading");
    if (preloader) {
      preloader.classList.remove("is-active");
      preloader.style.display = "none";
    }
    gsap.set([primaryText, ...secondaryText].filter(Boolean), {
      visibility: "visible",
      opacity: 1,
    });
    gsap.set(count, { visibility: "visible", opacity: 0 });
    gsap.set(progress, {
      visibility: "visible",
      height: "100%",
      opacity: 1,
    });
    return;
  }

  window.__preloaderState.startPage = pageNamespace;
  window.__preloaderRunning = true;
  if (preloader) {
    preloader.classList.add("is-active");
    document.body.classList.add("is-preloading");
  }
  lenis.stop();
  gsap.set(textElements, { visibility: "visible", opacity: 1 });
  gsap.set(progress, { visibility: "visible" });

  const navOffset = window.matchMedia("(max-width: 991px)").matches ? 25 : 5;
  if (navGrid) {
    gsap.set(navGrid, {
      visibility: "visible",
      x: `-${navOffset}vw`,
      y: `-${navOffset}vw`,
    });
  }
  if (navButton) {
    gsap.set(navButton, {
      visibility: "visible",
      x: `${navOffset}vw`,
      y: `-${navOffset}vw`,
    });
  }

  animateTextReveal(count, "reveal", 0);
  if (primaryText) animateTextReveal(primaryText, "reveal", 0);
  if (secondaryText.length) {
    animateTextReveal(secondaryText, "reveal", 0);
  }

  const countLine = count._split?.lines?.[0];
  gsap.to(progress, { height: "100%", duration: 4, ease: "InOut" });
  gsap.to(
    { value: 0 },
    {
      value: 100,
      duration: 2,
      ease: "InOut",
      onUpdate() {
        if (countLine) {
          countLine.textContent = `${Math.round(this.targets()[0].value)}%`;
        }
      },
      onComplete() {
        animateTextReveal(count, "hide", 0);
        if (navGrid) {
          gsap.to(navGrid, { x: 0, y: 0, duration: durM, ease: "Out" });
        }
        if (navButton) {
          gsap.to(navButton, { x: 0, y: 0, duration: durM, ease: "Out" });
        }
        if (stickyNames.length) {
          gsap.set(stickyNames, { visibility: "visible" });
          animateTextReveal(stickyNames, "reveal", 0);
        }

        window.__preloaderState.done = true;
        const finishPreloader = () => {
          if (preloader) {
            gsap.set(preloader, { autoAlpha: 0 });
            preloader.classList.remove("is-active");
            preloader.style.display = "none";
            document.body.classList.remove("is-preloading");
          }
          window.__preloaderRunning = false;
          if (isHomePage) window.__preloaderState.homeHandled = true;
          lenis.start();
          runPageReveals();
          window.dispatchEvent(new CustomEvent("lenis:settled"));
        };

        if (isHomePage) {
          gsap.delayedCall(durS + 0.5 * stagger, finishPreloader);
          return;
        }

        if (primaryText) animateTextReveal(primaryText, "hide", 0);
        if (secondaryText.length) {
          animateTextReveal(secondaryText, "hide", 0);
        }
        gsap.to(progress, {
          opacity: 0,
          duration: durS,
          delay: durS,
        });
        gsap.delayedCall(durS + 0.5 * stagger, finishPreloader);
      },
    },
  );
}

function initOnceFunctions() {
  if (onceFunctionsInitialized) return;
  onceFunctionsInitialized = true;

  initHaptics();
  if (!isExcludedPage()) initCursorTracker();
  initMsgChannel();
}

function initBeforeEnterFunctions(container) {
  nextPage = container || document;
}

function initAfterEnterFunctions(container) {
  nextPage = container || document;
  initScripts();
}

function runPageOnceAnimation(container) {
  const timeline = gsap.timeline();
  timeline.call(() => resetPage(container), null, 0);
  return timeline;
}

function prepareForTransition(currentContainer, nextContainer) {
  const scrollY = window.scrollY || 0;
  if (hasScrollTrigger) {
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill(false));
  }

  gsap.set(currentContainer, {
    position: "fixed",
    top: -scrollY,
    left: 0,
    width: "100%",
    zIndex: 91,
    willChange: "opacity",
  });
  gsap.set(nextContainer, { autoAlpha: 0, zIndex: 90 });
  window.scrollTo(0, 0);
}

function settleAfterTransition(currentContainer, nextContainer) {
  currentContainer
    .querySelectorAll(".anim-globe--wrap")
    .forEach((element) => element._globeDestroy?.());
  destroyFluidReveal(currentContainer);
  destroyInfiniteCanvas(currentContainer);
  currentContainer.remove();
  gsap.set(nextContainer, { clearProps: "opacity,visibility,zIndex" });
  window.__transitionRunning = false;

  if (!hasLenis) return;
  requestAnimationFrame(() => {
    lenis.resize();
    runPageReveals();
    if (hasScrollTrigger) ScrollTrigger.refresh();
    if (
      !window.__preloaderRunning &&
      !window.__holeIntroRunning
    ) {
      lenis.start();
    }
    window.dispatchEvent(new CustomEvent("lenis:settled"));
  });
}

function runPageLeaveAnimation(currentContainer, nextContainer) {
  window.__transitionRunning = true;
  prepareForTransition(currentContainer, nextContainer);

  const timeline = gsap.timeline({
    onComplete: () => settleAfterTransition(currentContainer, nextContainer),
    onInterrupt: () => settleAfterTransition(currentContainer, nextContainer),
  });

  if (reducedMotion) {
    timeline.set(currentContainer, { autoAlpha: 0 });
    timeline.set(nextContainer, { autoAlpha: 1 });
    return timeline;
  }

  timeline.set(currentContainer, { filter: "blur(0px)" }, 0);
  timeline.to(
    currentContainer,
    {
      autoAlpha: 0,
      filter: "blur(24px)",
      duration: durM,
      ease: "InOut",
    },
    0,
  );
  timeline.set(nextContainer, { filter: "blur(24px)" }, durM);
  timeline.to(
    nextContainer,
    {
      autoAlpha: 1,
      filter: "blur(0px)",
      duration: durM,
      ease: "InOut",
    },
    durM,
  );
  timeline.set(nextContainer, { clearProps: "filter" });
  timeline.set(currentContainer, { clearProps: "filter" });
  return timeline;
}

function initScripts() {
  const navCleanup = initNavDropdown(nextPage);
  if (navCleanup) pageCleanups.push(navCleanup);

  const linkCleanup = initLinks(nextPage);
  if (linkCleanup) pageCleanups.push(linkCleanup);

  initCustomScrollbar();
  pageCleanups.push(() => window._destroyCustomScrollbar?.());

  initThemeMode();
  initTotemActivation();
  const gridCleanup = initDevGrid();
  if (gridCleanup) pageCleanups.push(gridCleanup);
  const tiltCleanup = initTiltCursor();
  if (tiltCleanup) pageCleanups.push(tiltCleanup);
  initStickyNameReveal(nextPage);
  initAwards(nextPage);
  initFeaturedHeadingWidth(nextPage);
  runPageReveals(nextPage);
  initWorksItemHover(nextPage);
  initContactDial(nextPage);
  initFilterTabs(nextPage);
  initGlobe(nextPage);
  initNextEntity(NEXT_ENTITY_COUNT);
  initCutList(nextPage);
  initFeaturedHeadingHeightMobile(nextPage);
  initInfiniteCanvas(nextPage);
  initFooterTime(nextPage);
  initFooterLogo(nextPage);
  initDialOverlay(nextPage);
  initTextRevealDemo(nextPage);
  initImageRevealDemo(nextPage);
}

function initPage(container = document) {
  nextPage = container;
  window.__revealsPending = true;
  initOnceFunctions();
  initScripts();

  if (hasScrollTrigger) {
    requestAnimationFrame(() => ScrollTrigger.refresh());
  }
}

function destroyPage(container = document) {
  document.body.classList.remove("is-preloading");
  pageCleanups.splice(0).reverse().forEach((cleanup) => cleanup());

  if (hasScrollTrigger) {
    ScrollTrigger.getAll().forEach((trigger) => {
      const triggerElement = trigger.trigger;
      const pinElement = trigger.pin;
      if (
        (triggerElement instanceof Node && container.contains(triggerElement)) ||
        (pinElement instanceof Node && container.contains(pinElement))
      ) {
        trigger.kill();
      }
    });
  }

  container
    .querySelectorAll(".anim-globe--wrap")
    .forEach((element) => element._globeDestroy?.());
  destroyFluidReveal(container);
  destroyInfiniteCanvas(container);

  if (stickyName.scrollHandler) {
    lenis?.off("scroll", stickyName.scrollHandler);
  }
  if (stickyName.settledHandler) {
    window.removeEventListener("lenis:settled", stickyName.settledHandler);
  }
  if (stickyName.waitInterval) clearInterval(stickyName.waitInterval);
  stickyName.tl?.kill();
  stickyName = {
    inner: null,
    tl: null,
    scrollHandler: null,
    settledHandler: null,
    waitInterval: null,
    triggered: false,
    checkBottom: null,
  };
}

function resetPage(container) {
  window.scrollTo(0, 0);
  gsap.set(container, { clearProps: "position,top,left,right" });

  if (
    hasLenis &&
    !window.__preloaderRunning &&
    !window.__transitionRunning &&
    !window.__holeIntroRunning
  ) {
    lenis.resize();
    lenis.start();
  }
}
