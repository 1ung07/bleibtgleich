import React from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { animationPart } from '../animations/animationPart.js';
import useSourceInteractions from '../hooks/useSourceInteractions.js';
import GridBackdrop from '../components/GridBackdrop.jsx';
import Navigation from '../components/Navigation.jsx';
import Preloader from '../components/Preloader.jsx';
import ProjectFooter from '../components/ProjectFooter.jsx';
import { projectData } from '../data.js';

function ProjectGallery({ project }) {
  return (
    <section className="gallery">
      <div className="gallery-inner">
        <div className="w-layout-grid grid">
          <div className="floating-info project-information">
            <div className="floating-info-inner">
              <div className="opacity-0-5">
                <div {...animationPart({ reveal: 'text' }, 'p1')}>Info</div>
              </div>
              <p {...animationPart({ reveal: 'text' }, 'p1')}>
                {project.description}
              </p>
            </div>
            <div className="floating-info-inner">
              <div className="opacity-0-5">
                <div {...animationPart({ reveal: 'text' }, 'p1')}>Services</div>
              </div>
              <div className="info-services-list-wrap w-dyn-list">
                {project.services.length ? (
                  <div role="list" className="info-services-list w-dyn-items">
                    {project.services.map((service) => (
                      <div
                        key={service}
                        role="listitem"
                        {...animationPart({ reveal: 'text' }, 'info-services-item w-dyn-item')}
                      >
                        <p className="p1">{service}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="cms_empty-none w-dyn-empty" />
                )}
              </div>
            </div>
          </div>
          <div className="_w-intro project-introduction">
            <div className="_w-intro-title project-title">
              <h1 {...animationPart({ reveal: 'text' }, 'h1')}>{project.title}</h1>
            </div>
          </div>
          <div className="gallery-list-wrap w-dyn-list project-gallery">
            {project.images.length ? (
              <div role="list" className="gallery-list w-dyn-items">
                {project.images.map((image, index) => (
                  <div
                    key={`${image.src}-${index}`}
                    role="listitem"
                    {...animationPart(
                      { 'prevent-flicker': '' },
                      'gallery-item w-dyn-item w-dyn-repeater-item',
                    )}
                  >
                    <img
                      src={image.src}
                      loading="lazy"
                      alt={image.alt || `${project.title} — image ${index + 1}`}
                      className="img"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <>
                <div role="list" className="gallery-list w-dyn-items w-dyn-hide" />
                <div className="cms_empty-none w-dyn-empty" />
              </>
            )}
          </div>
          {project.awards.length > 0 && (
            <div className="gallery-awards project-awards">
              <div {...animationPart({ reveal: 'text' }, 'p1 is-secondary')}>
                Awards &amp; Recognitions
              </div>
              <div className="gallery-awards-list-wrap w-dyn-list">
                <div
                  role="list"
                  {...animationPart({ award: 'group' }, 'gallery-awards-list w-dyn-items')}
                >
                  {project.awards.map((award, index) => (
                    <div
                      key={`${award.organization}-${award.award}-${index}`}
                      role="listitem"
                      className="gallery-awards-item w-dyn-item"
                    >
                      <div
                        {...animationPart(
                          { reveal: 'div', award: 'item' },
                          'award-item is-flex',
                        )}
                      >
                        <div className="award-item-cell is-grow">
                          <div className="p1">{award.organization}</div>
                          {award.certificate && (
                            <div {...animationPart({ award: 'certificate' }, 'award-item-certificate')}>
                              <img
                                src={award.certificate.src}
                                srcSet={award.certificate.srcSet}
                                sizes="100vw"
                                loading="lazy"
                                alt={award.certificate.alt}
                                className="img"
                              />
                            </div>
                          )}
                        </div>
                        <div className="award-item-cell is-grow">
                          <div className="p1">{award.award}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function ProjectRecommendations({ currentSlug }) {
  const projects = Object.entries(projectData)
    .sort(([, first], [, second]) => first.order - second.order);

  return (
    <section className="more-works">
      <div className="gallery-spacer" />
      <div className="more-works-inner">
        <div className="w-layout-grid grid">
          <div className="heading-group-wrap">
            <h2 {...animationPart({ reveal: 'text' }, 'h1')}>Discover</h2>
            <h2 {...animationPart({ reveal: 'text' }, 'h1 _1-cell-offset')}>
              what’s next
            </h2>
          </div>
          <div className="more-works-list-wrap w-dyn-list">
            <div
              role="list"
              {...animationPart({ reveal: 'div' }, 'more-works-list w-dyn-items')}
            >
              {projects.map(([slug, project]) => (
                <div
                  key={slug}
                  role="listitem"
                  {...animationPart(
                    {
                      haptic: 'medium',
                      'works-item': 'wrap',
                      tilt: 'wrap',
                      'next-entity-item': slug,
                    },
                    'more-works-item w-dyn-item',
                  )}
                >
                  <Link
                    to={`/works/${slug}`}
                    className={`works-item-link-overlay w-inline-block${slug === currentSlug ? ' w--current' : ''}`}
                    aria-current={slug === currentSlug ? 'page' : undefined}
                    aria-label={`View ${project.title}`}
                  />
                  <div {...animationPart({ tilt: 'card' }, 'works-item-image-wrap')}>
                    <div className="works-item-image-inner">
                      <img
                        src={project.cover}
                        loading="lazy"
                        alt=""
                        className="img is-cover-works"
                      />
                    </div>
                  </div>
                  <div className="works-item-meta">
                    <div className="works-type">
                      <div className="p1">{project.type}</div>
                    </div>
                    <div className="p1">{project.title}</div>
                  </div>
                  <div
                    {...animationPart({ 'works-item': 'button' }, 'works-item-button')}
                  >
                    <Link
                      to={`/works/${slug}`}
                      className={`button w-inline-block${slug === currentSlug ? ' w--current' : ''}`}
                      aria-current={slug === currentSlug ? 'page' : undefined}
                    >
                      <div className="link-inner">
                        <div {...animationPart({ link: 'label' }, 'p1')}>Explore</div>
                        <div {...animationPart({ link: 'shadow' }, 'p1 is-2')}>
                          Explore
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Project() {
  const { slug: routeSlug, id } = useParams();
  const slug = routeSlug ?? id;
  const project = projectData[slug];
  useSourceInteractions();

  if (!project) return <Navigate to="/work" replace />;

  return (
    <>
      <GridBackdrop />
      <div {...animationPart({ barba: 'wrapper' }, 'transition-wrapper')}>
        <Navigation currentPage={`/works/${slug}`} />
        <main
          {...animationPart(
            { 'barba-namespace': slug, barba: 'container' },
            'transition-container',
          )}
        >
          <Preloader />
          <ProjectGallery project={project} />
          <ProjectRecommendations currentSlug={slug} />
          <ProjectFooter />
        </main>
        <section className="sticky-name">
          <div {...animationPart({ preloader: 'count' }, 'count')}>0%</div>
          <div className="sticky-name-inner">
            <div {...animationPart({ 'sticky-name': '' }, 'h1')}>bleibt</div>
            <div {...animationPart({ 'sticky-name': '' }, 'h1')}>gleich</div>
          </div>
          <div className="sticky-name-meta">
            <div {...animationPart({ 'prevent-flicker': '', 'sticky-meta': 'text' }, 'p1')}>
              ‘26 © All Right Reserved
            </div>
            <div {...animationPart({ 'prevent-flicker': '', 'sticky-meta': 'text' }, 'p1')}>
              made w/ hate
            </div>
          </div>
        </section>
        <div className="scrollbar-wrap">
          <div {...animationPart({ 'magnetic-strength': '20' }, 'scrollbar-thumb')} />
        </div>
      </div>
      <link rel="stylesheet" href="https://unpkg.com/lenis@1.3.21/dist/lenis.css" />
    </>
  );
}
