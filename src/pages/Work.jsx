import React from 'react';
import { animationPart } from '../animations/animationPart.js';
import useSourceInteractions from '../hooks/useSourceInteractions.js';
import GridBackdrop from '../components/GridBackdrop.jsx';
import Navigation from '../components/Navigation.jsx';
import Preloader from '../components/Preloader.jsx';
import WorkWorksSection1 from './sections/WorkWorksSection1.jsx';
import WorkFooterSection2 from './sections/WorkFooterSection2.jsx';
import WorkStickynameSection3 from './sections/WorkStickynameSection3.jsx';

export default function Work() {
  useSourceInteractions();
  return (
    <>
    <div {...animationPart({"barba":"wrapper"}, "transition-wrapper")}>
      <GridBackdrop />
      <Navigation currentPage={"/work"} />
      <main {...animationPart({"barba-namespace":"works","barba":"container"}, "transition-container")}>
        <Preloader />
        <WorkWorksSection1 />
        <WorkFooterSection2 />
      </main>
      <WorkStickynameSection3 />
      <div className={"scrollbar-wrap"}>
        <div {...animationPart({"magnetic-strength":"20"}, "scrollbar-thumb")} />
      </div>
    </div>
    <link rel={"stylesheet"} href={"https://unpkg.com/lenis@1.3.21/dist/lenis.css"} />
    </>
  );
}
