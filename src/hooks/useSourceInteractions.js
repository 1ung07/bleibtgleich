import { useEffect } from 'react';

export default function useSourceInteractions() {
  useEffect(() => {
    let active = true;
    let initialized = false;

    if (!window.__bleibtgleichMotionStarted) {
      window.__bleibtgleichMotionStarted = true;
      window.barba = {
        hooks: new Proxy({}, { get: () => () => undefined }),
        init: (options) => {
          const once = options.transitions?.[0]?.once;
          if (once) {
            Promise.resolve(
              once({ next: { container: document.body } }),
            ).catch((error) => {
              console.error(
                'Unable to initialize the source page animations.',
                error,
              );
            });
          }
        },
      };
      window.io = () => ({
        on() { return this; },
        off() { return this; },
        emit() { return this; },
        disconnect() {},
      });
    }

    import('../animations/sourceMotion.js')
      .then(() => {
        if (!active) return;
        const motion = window.__bleibtgleichMotion;
        if (!motion) {
          throw new Error('The animation runtime did not expose its page lifecycle.');
        }
        motion.initPage(document);
        initialized = true;
      })
      .catch((error) => {
        console.error('Unable to initialize the source page animations.', error);
      });

    return () => {
      active = false;
      if (initialized) {
        window.__bleibtgleichMotion?.destroyPage(document);
      }
    };
  }, []);
}
