import React from 'react';
import { animationPart } from '../animations/animationPart.js';

const links = [
  { href: '/', label: 'Home', number: '1', type: 'home', className: 'menu-link w-inline-block' },
  {
    href: '/work',
    label: 'Work',
    number: '2',
    type: 'works',
    className: 'menu-link w-variant-a7ffef1a-0b74-cc26-caf1-6c6d6e427a48 w-inline-block',
  },
  {
    href: '/contact',
    label: 'Contact',
    number: '3',
    type: 'contact',
    className: 'menu-link w-variant-33192d68-7f2e-6ac8-f5b1-cf3a9c652efc w-inline-block',
  },
  {
    href: '/archive',
    label: 'Experiments',
    type: 'archive',
    className: 'menu-link is-archive w-inline-block',
  },
];

function NavigationLink({ link, currentPage }) {
  const active =
    currentPage === link.href ||
    (link.href === '/work' && currentPage.startsWith('/works/'));
  const className = `${link.className}${active ? ' w--current' : ''}`;
  const markers = link.type === 'archive'
    ? { haptic: 'medium', nav: 'link', 'link-trigger': '', 'nav-link': 'archive' }
    : {
        haptic: 'medium',
        nav: 'link',
        'link-trigger': '',
        'wf--menu-link--type': link.type,
      };

  return (
    <a
      href={link.href}
      aria-current={active ? 'page' : undefined}
      {...animationPart(markers, className)}
    >
      {link.number && (
        <div {...animationPart({ nav: 'indicator' }, 'menu-indicator')}>
          <div className="p1">{link.number}</div>
        </div>
      )}
      <div className="menu-link-inner">
        <div className="link-inner">
          <div {...animationPart({ link: 'label' }, link.number ? 'h2' : 'p1')}>
            {link.label}
          </div>
          <div {...animationPart(
            { link: 'shadow' },
            link.number ? 'h2 is-2' : 'p1 is-2',
          )}>
            {link.label}
          </div>
        </div>
      </div>
    </a>
  );
}

export default function Navigation({ currentPage }) {
  return (
    <nav className="nav">
      <div className="nav-inner">
        <div {...animationPart({ 'prevent-flicker': '', nav: 'grid' }, 'nav-grid')} />
        <div {...animationPart(
          { haptic: 'medium', nav: 'button', 'prevent-flicker': '' },
          'nav-button',
        )}>
          <div className="link-inner">
            <div {...animationPart({ link: 'label', nav: 'label' }, 'p1')}>Menu</div>
            <div {...animationPart({ link: 'shadow', nav: 'label' }, 'p1 is-2')}>Menu</div>
          </div>
        </div>
        <div {...animationPart({ nav: 'link-group' }, 'nav-menu')}>
          {links.map((link) => (
            <NavigationLink
              key={link.href}
              link={link}
              currentPage={currentPage}
            />
          ))}
        </div>
      </div>
    </nav>
  );
}
