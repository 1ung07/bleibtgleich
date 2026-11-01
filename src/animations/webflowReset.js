function initResetWebflow(e) {
  let t = new DOMParser().parseFromString(e.next.html, "text/html").querySelector("html").getAttribute("data-wf-page");
  document.documentElement.setAttribute("data-wf-page", t), window.Webflow.destroy(), window.Webflow.ready();
}
