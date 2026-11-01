import pageTransitions from './pageTransitions.js?raw';
import customScrollbar from './customScrollbar.js?raw';
import smoothScroll from './smoothScroll.js?raw';
import haptics from './haptics.js?raw';
import themeMode from './themeMode.js?raw';
import totemActivation from './totemActivation.js?raw';
import footerTime from './footerTime.js?raw';
import footerLogo from './footerLogo.js?raw';
import dialOverlay from './dialOverlay.js?raw';
import webflowReset from './webflowReset.js?raw';
import cursorTracker from './cursorTracker.js?raw';
import messageChannel from './messageChannel.js?raw';
import textReveal from './textReveal.js?raw';
import elementReveals from './elementReveals.js?raw';
import navigation from './navigation.js?raw';
import stickyName from './stickyName.js?raw';
import devGrid from './devGrid.js?raw';
import logoMorph from './logoMorph.js?raw';
import featuredHeading from './featuredHeading.js?raw';
import awards from './awards.js?raw';
import worksIntro from './worksIntro.js?raw';
import filterTabs from './filterTabs.js?raw';
import worksItemHover from './worksItemHover.js?raw';
import tiltCursor from './tiltCursor.js?raw';
import cutList from './cutList.js?raw';
import contactDial from './contactDial.js?raw';
import globeAnimations from './globeAnimations.js?raw';
import fluidReveal from './fluidReveal.js?raw';
import orbitTiles from './orbitTiles.js?raw';
import infiniteCanvas from './infiniteCanvas.js?raw';
import textRevealDemo from './textRevealDemo.js?raw';
import imageRevealDemo from './imageRevealDemo.js?raw';
import sharedRuntime from './sharedRuntime.js?raw';
import {
  getAnimationMarker,
  removeAnimationMarker,
  setAnimationMarker,
} from './markerHelpers.js';

// The original effects share lexical state, so execute their separated source parts in one scope.
const source = [
  pageTransitions,
  customScrollbar,
  smoothScroll,
  haptics,
  themeMode,
  totemActivation,
  footerTime,
  footerLogo,
  dialOverlay,
  webflowReset,
  cursorTracker,
  messageChannel,
  textReveal,
  elementReveals,
  navigation,
  stickyName,
  devGrid,
  logoMorph,
  featuredHeading,
  awards,
  worksIntro,
  filterTabs,
  worksItemHover,
  tiltCursor,
  cutList,
  contactDial,
  globeAnimations,
  fluidReveal,
  orbitTiles,
  infiniteCanvas,
  textRevealDemo,
  imageRevealDemo,
  sharedRuntime,
].join('\n\n');

new Function(
  'getAnimationMarker',
  'removeAnimationMarker',
  'setAnimationMarker',
  `"use strict";\n${source}`,
)(getAnimationMarker, removeAnimationMarker, setAnimationMarker);
