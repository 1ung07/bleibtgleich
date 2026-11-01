gsap.registerPlugin(
  ScrollTrigger,
  CustomEase,
  SplitText,
  MorphSVGPlugin,
  Draggable,
  InertiaPlugin,
);

let nextPage = document;
let onceFunctionsInitialized = false;
let reducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;
let lenis = null;
let lenisTickerFn = null;
let resizeTimeout = null;
let socket = null;
const pageCleanups = [];

const SOCKET_URL =
  "https://webflow-cursor-tracker-production.up.railway.app";
const hasLenis = typeof window.Lenis !== "undefined";
const hasScrollTrigger = typeof window.ScrollTrigger !== "undefined";
const reducedMotionQuery = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
);
const breakPoint = 992;
const EXCLUDED_PAGES_NS = ["error-404", "demo"];
const EXCLUDED_PATHS = ["/404", "/demo"];
const NEXT_ENTITY_COUNT = 2;
let stickyName = {
  inner: null,
  tl: null,
  scrollHandler: null,
  settledHandler: null,
  waitInterval: null,
  triggered: false,
  checkBottom: null,
};

const durXS = 0.2;
const durS = 0.4;
const durM = 0.8;
const durL = 1.2;
const stagger = 0.1;
const delayReveal = 0.2;
const staggerDefault = 0.05;
const durationDefault = 0.6;
const splitWorksDur = 0.9;
const splitWorksStagger = 0.04;

reducedMotionQuery.addEventListener?.(
  "change",
  (event) => (reducedMotion = event.matches),
);
reducedMotionQuery.addListener?.(
  (event) => (reducedMotion = event.matches),
);

window.addEventListener("resize", () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    ScrollTrigger.refresh(true);
  }, 40);
});

CustomEase.create("InOut", "0.76,0,0.24,1");
CustomEase.create("Out", "0.25,1,0.5,1");
CustomEase.create("In", "0.5,0,0.75,0");
CustomEase.create("ease", "0.25,0.1,0.25,1");
CustomEase.create("Write", "0.333,0,0.667,1");
CustomEase.create("osmo", "0.625,0.05,0,1");

history.scrollRestoration = "manual";
window.__preloaderState = {
  done: false,
  startPage: null,
  homeHandled: false,
};
window.__revealsPending = true;

initLenis();
initFluidReveal();
initPreloader();

barba.hooks.beforeEnter((event) => {
  window.closeMenu?.();
  window.__revealsPending = true;
  updateNavIndicators();
  stickyNameOnLeave(event.next.container);
  gsap.set(event.next.container, {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
  });
  lenis?.stop();
  document.body.classList.add("is-transitioning");
  initBeforeEnterFunctions(event.next.container);
});

barba.hooks.afterEnter((event) => {
  try {
    initResetWebflow(event);
    window.__cursorPageSync?.();
    cleanupGooFilters();
    initAfterEnterFunctions(event.next.container);
  } finally {
    document.body.classList.remove("is-transitioning");
  }
});

barba.init({
  prevent: ({ href }) => {
    if (isExcludedPage()) return true;
    if (!href) return false;

    const pathname = new URL(href, location.origin).pathname.replace(/\/$/, "") || "/";
    return EXCLUDED_PATHS.some(
      (excludedPath) =>
        pathname === excludedPath || pathname.startsWith(`${excludedPath}/`),
    );
  },
  debug: false,
  timeout: 7000,
  preventRunning: true,
  transitions: [
    {
      name: "fade",
      sync: true,
      once: async (event) => {
        initOnceFunctions();
        return runPageOnceAnimation(event.next.container);
      },
      leave: async (event) =>
        runPageLeaveAnimation(
          event.current.container,
          event.next.container,
        ),
      async enter(event) {
        resetPage(event.next.container);
      },
    },
  ],
});

window.__bleibtgleichMotion = {
  initPage,
  destroyPage,
};
