import React from 'react';
import { animationPart } from '../animations/animationPart.js';

export default function Preloader() {
  return (
    <section className="preloader-wrap">
      <div className="w-layout-grid grid">
        <div
          id="w-node-_0ae272af-0aef-ebb8-8f0c-3856a5494c11-a5494c0f"
          className="progress"
        >
          <div {...animationPart({ preloader: 'progress' }, 'progress-wrap')}>
            <div {...animationPart({ preloader: 'text-1' }, 'p1')}>
              Designer
              <br />
              &amp; Developer
            </div>
          </div>
        </div>
        <div
          id="w-node-_0ae272af-0aef-ebb8-8f0c-3856a5494c17-a5494c0f"
          className="hero-heading-wrap"
        >
          <div className="hero-meta">
            <div {...animationPart({ preloader: 'text-2' }, 'p1')}>
              Based in Kyiv
              <br />
            </div>
            <div className="hero-meta-inner">
              <div {...animationPart({ preloader: 'text-2' }, 'p1')}>
                Working w/
                <br />
              </div>
              <a
                href="https://thefirstthelast.agency/?utm_source=bleibtgleich&utm_medium=article&utm_campaign=promo"
                target="_blank"
                {...animationPart({ preloader: 'text-2', 'link-trigger': '' }, 'link-inner events-auto pointer w-inline-block')}
              >
                <div {...animationPart({ link: 'label' }, 'p1')}>TFTL</div>
                <div {...animationPart({ link: 'shadow' }, 'p1 is-2')}>TFTL</div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
