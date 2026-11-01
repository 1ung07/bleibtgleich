import React, {
  lazy,
  Suspense,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Link, Route, Routes, useLocation } from 'react-router-dom';
import Project from './pages/Project.jsx';
import { pageTitles } from './pages.js';
import './styles.css';
import './source-inline.css';

const Home = lazy(() => import('./pages/Home.jsx'));
const Work = lazy(() => import('./pages/Work.jsx'));
const Archive = lazy(() => import('./pages/Archive.jsx'));
const Contact = lazy(() => import('./pages/Contact.jsx'));

function App() {
  const location = useLocation();

  useEffect(() => {
    document.body.classList.add('body');
    const slug = location.pathname.split('/').filter(Boolean).pop();
    document.title = pageTitles[location.pathname] ?? pageTitles[slug] ?? 'Page not found — bleibtgleich';
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <Suspense fallback={<div className="page-loading" aria-label="Loading page" />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work" element={<Work />} />
          <Route path="/archive" element={<Archive />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/works/:slug" element={<Project />} />
          <Route path="/work/:id" element={<Project />} />
          <Route
            path="*"
            element={(
              <main className="not-found">
                <p>404 — Page not found</p>
                <Link to="/">Back home</Link>
              </main>
            )}
          />
        </Routes>
      </Suspense>
      <RouteTransitionCurtain pathname={location.pathname} />
    </>
  );
}

function RouteTransitionCurtain({ pathname }) {
  const [visible, setVisible] = useState(false);
  const previousPathname = useRef(pathname);

  useLayoutEffect(() => {
    if (previousPathname.current === pathname) return undefined;
    previousPathname.current = pathname;
    setVisible(true);
    const timeout = window.setTimeout(() => setVisible(false), 150);
    return () => window.clearTimeout(timeout);
  }, [pathname]);

  return (
    <div
      className={`route-transition-curtain${visible ? ' is-visible' : ''}`}
      aria-hidden="true"
    />
  );
}

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);
