import React from 'react';
import { animationPart } from '../animations/animationPart.js';
import useSourceInteractions from '../hooks/useSourceInteractions.js';
import GridBackdrop from '../components/GridBackdrop.jsx';
import Navigation from '../components/Navigation.jsx';
import Preloader from '../components/Preloader.jsx';
import ArchiveStickynameSection1 from './sections/ArchiveStickynameSection1.jsx';

export default function Archive() {
  useSourceInteractions();
  return (
    <>
    <div {...animationPart({"barba":"wrapper"}, "transition-wrapper")}>
      <GridBackdrop />
      <Navigation currentPage={"/archive"} />
      <main {...animationPart({"barba-namespace":"archive","barba":"container"}, "transition-container")}>
        <Preloader />
        <div {...animationPart({"prevent-flicker":"","infinite-canvas-h":""}, "h2 canvas-heading")}>
          {"Experiments"}
        </div>
        <div {...animationPart({"infinite-canvas":""}, "canvas-wrap")} />
        <div className={"canvas-media w-dyn-list"}>
          <div role={"list"} className={"canvas-media-inner w-dyn-items"}>
            <div role={"listitem"} className={"canvas-media-item w-dyn-item"}>
              <img src={"/media/cdn.prod.website-files.com/6a36a3fb2e061ee276a4e112/6a766343c615cf38bc82237f_img-archive-fooddepaux-08_converted.avif"} loading={"lazy"} alt={""} {...animationPart({"canvas-img":""}, "img")} />
            </div>
            <div role={"listitem"} className={"canvas-media-item w-dyn-item"}>
              <img src={"/media/cdn.prod.website-files.com/6a36a3fb2e061ee276a4e112/6a76633c7cf82fedddfdef0e_img-archive-fooddepaux-07_converted.avif"} loading={"lazy"} alt={""} {...animationPart({"canvas-img":""}, "img")} />
            </div>
            <div role={"listitem"} className={"canvas-media-item w-dyn-item"}>
              <img src={"/media/cdn.prod.website-files.com/6a36a3fb2e061ee276a4e112/6a7663337b7bcbabb728c5fc_img-archive-fooddepaux-06_converted.avif"} loading={"lazy"} alt={""} {...animationPart({"canvas-img":""}, "img")} />
            </div>
            <div role={"listitem"} className={"canvas-media-item w-dyn-item"}>
              <img src={"/media/cdn.prod.website-files.com/6a36a3fb2e061ee276a4e112/6a76632cc5a9ccf267ac16c3_img-archive-fooddepaux-05_converted.avif"} loading={"lazy"} alt={""} {...animationPart({"canvas-img":""}, "img")} />
            </div>
            <div role={"listitem"} className={"canvas-media-item w-dyn-item"}>
              <img src={"/media/cdn.prod.website-files.com/6a36a3fb2e061ee276a4e112/6a7663247cf82fedddfdeb6f_img-archive-fooddepaux-04_converted.avif"} loading={"lazy"} alt={""} {...animationPart({"canvas-img":""}, "img")} />
            </div>
            <div role={"listitem"} className={"canvas-media-item w-dyn-item"}>
              <img src={"/media/cdn.prod.website-files.com/6a36a3fb2e061ee276a4e112/6a7663117b7bcbabb728c19c_img-archive-fooddepaux-03_converted.avif"} loading={"lazy"} alt={""} {...animationPart({"canvas-img":""}, "img")} />
            </div>
            <div role={"listitem"} className={"canvas-media-item w-dyn-item"}>
              <img src={"/media/cdn.prod.website-files.com/6a36a3fb2e061ee276a4e112/6a7663067ddbf49c4b175407_img-archive-fooddepaux-01_converted.avif"} loading={"lazy"} alt={""} {...animationPart({"canvas-img":""}, "img")} />
            </div>
            <div role={"listitem"} className={"canvas-media-item w-dyn-item"}>
              <img src={"/media/cdn.prod.website-files.com/6a36a3fb2e061ee276a4e112/6a66115eaaab25ed182e195d_img-archive-cigar_13-08.avif"} loading={"lazy"} alt={""} {...animationPart({"canvas-img":""}, "img")} />
            </div>
            <div role={"listitem"} className={"canvas-media-item w-dyn-item"}>
              <img src={"/media/cdn.prod.website-files.com/6a36a3fb2e061ee276a4e112/6a6611663a0955d8234735da_img-archive-cigar_13-07.avif"} loading={"lazy"} alt={""} {...animationPart({"canvas-img":""}, "img")} />
            </div>
            <div role={"listitem"} className={"canvas-media-item w-dyn-item"}>
              <img src={"/media/cdn.prod.website-files.com/6a36a3fb2e061ee276a4e112/6a66116a1dc0e526f5549fa1_img-archive-cigar_13-06.avif"} loading={"lazy"} alt={""} {...animationPart({"canvas-img":""}, "img")} />
            </div>
            <div role={"listitem"} className={"canvas-media-item w-dyn-item"}>
              <img src={"/media/cdn.prod.website-files.com/6a36a3fb2e061ee276a4e112/6a661175aaab25ed182e1cf2_img-archive-cigar_13-05.avif"} loading={"lazy"} alt={""} {...animationPart({"canvas-img":""}, "img")} />
            </div>
            <div role={"listitem"} className={"canvas-media-item w-dyn-item"}>
              <img src={"/media/cdn.prod.website-files.com/6a36a3fb2e061ee276a4e112/6a66118280acd9f6e6825bd8_img-archive-cigar_13-04.avif"} loading={"lazy"} alt={""} {...animationPart({"canvas-img":""}, "img")} />
            </div>
            <div role={"listitem"} className={"canvas-media-item w-dyn-item"}>
              <img src={"/media/cdn.prod.website-files.com/6a36a3fb2e061ee276a4e112/6a6611893e75b7b2c4c081a4_img-archive-cigar_13-03.avif"} loading={"lazy"} alt={""} {...animationPart({"canvas-img":""}, "img")} />
            </div>
            <div role={"listitem"} className={"canvas-media-item w-dyn-item"}>
              <img src={"/media/cdn.prod.website-files.com/6a36a3fb2e061ee276a4e112/6a66118d098125f51a62c1e2_img-archive-cigar_13-02.avif"} loading={"lazy"} alt={""} {...animationPart({"canvas-img":""}, "img")} />
            </div>
            <div role={"listitem"} className={"canvas-media-item w-dyn-item"}>
              <img src={"/media/cdn.prod.website-files.com/6a36a3fb2e061ee276a4e112/6a661193e419e49ca43f7e24_img-archive-cigar_13-01.avif"} loading={"lazy"} alt={""} {...animationPart({"canvas-img":""}, "img")} />
            </div>
            <div role={"listitem"} className={"canvas-media-item w-dyn-item"}>
              <img src={"/media/cdn.prod.website-files.com/6a36a3fb2e061ee276a4e112/6a6611b56a5afe2ac40e1d8e_img-archive-luxom-03.avif"} loading={"lazy"} alt={""} {...animationPart({"canvas-img":""}, "img")} />
            </div>
            <div role={"listitem"} className={"canvas-media-item w-dyn-item"}>
              <img src={"/media/cdn.prod.website-files.com/6a36a3fb2e061ee276a4e112/6a6611c1f395f8f2067a48de_img-archive-luxom-02.avif"} loading={"lazy"} alt={""} {...animationPart({"canvas-img":""}, "img")} />
            </div>
            <div role={"listitem"} className={"canvas-media-item w-dyn-item"}>
              <img src={"/media/cdn.prod.website-files.com/6a36a3fb2e061ee276a4e112/6a6611c6f395f8f2067a49b0_img-archive-luxom-01.avif"} loading={"lazy"} alt={""} {...animationPart({"canvas-img":""}, "img")} />
            </div>
            <div role={"listitem"} className={"canvas-media-item w-dyn-item"}>
              <img src={"/media/cdn.prod.website-files.com/6a36a3fb2e061ee276a4e112/6a6611cd7d95a8a48470ccb8_img-archive-insta-gallery-03.avif"} loading={"lazy"} alt={""} {...animationPart({"canvas-img":""}, "img")} />
            </div>
            <div role={"listitem"} className={"canvas-media-item w-dyn-item"}>
              <img src={"/media/cdn.prod.website-files.com/6a36a3fb2e061ee276a4e112/6a6611d4bf33efae2ee607d0_img-archive-insta-gallery-02.avif"} loading={"lazy"} alt={""} {...animationPart({"canvas-img":""}, "img")} />
            </div>
            <div role={"listitem"} className={"canvas-media-item w-dyn-item"}>
              <img src={"/media/cdn.prod.website-files.com/6a36a3fb2e061ee276a4e112/6a6611d9ac3bf366798b0a7d_img-archive-insta-gallery-01.avif"} loading={"lazy"} alt={""} {...animationPart({"canvas-img":""}, "img")} />
            </div>
            <div role={"listitem"} className={"canvas-media-item w-dyn-item"}>
              <img src={"/media/cdn.prod.website-files.com/6a36a3fb2e061ee276a4e112/6a6611fd4db67bc41e1ffae3_img-logo-materials-experiment-13.avif"} loading={"lazy"} alt={""} {...animationPart({"canvas-img":""}, "img")} />
            </div>
            <div role={"listitem"} className={"canvas-media-item w-dyn-item"}>
              <img src={"/media/cdn.prod.website-files.com/6a36a3fb2e061ee276a4e112/6a6612086a5afe2ac40e2751_img-logo-materials-experiment-12.avif"} loading={"lazy"} alt={""} {...animationPart({"canvas-img":""}, "img")} />
            </div>
            <div role={"listitem"} className={"canvas-media-item w-dyn-item"}>
              <img src={"/media/cdn.prod.website-files.com/6a36a3fb2e061ee276a4e112/6a66120fe6997e7a1416aed6_img-logo-materials-experiment-11.avif"} loading={"lazy"} alt={""} {...animationPart({"canvas-img":""}, "img")} />
            </div>
            <div role={"listitem"} className={"canvas-media-item w-dyn-item"}>
              <img src={"/media/cdn.prod.website-files.com/6a36a3fb2e061ee276a4e112/6a661218fdb885cdd38f3b7b_img-logo-materials-experiment-10.avif"} loading={"lazy"} alt={""} {...animationPart({"canvas-img":""}, "img")} />
            </div>
            <div role={"listitem"} className={"canvas-media-item w-dyn-item"}>
              <img src={"/media/cdn.prod.website-files.com/6a36a3fb2e061ee276a4e112/6a66122768d93d23da015658_img-logo-materials-experiment-09.avif"} loading={"lazy"} alt={""} {...animationPart({"canvas-img":""}, "img")} />
            </div>
            <div role={"listitem"} className={"canvas-media-item w-dyn-item"}>
              <img src={"/media/cdn.prod.website-files.com/6a36a3fb2e061ee276a4e112/6a66122f151830893c63f389_img-logo-materials-experiment-08.avif"} loading={"lazy"} alt={""} {...animationPart({"canvas-img":""}, "img")} />
            </div>
            <div role={"listitem"} className={"canvas-media-item w-dyn-item"}>
              <img src={"/media/cdn.prod.website-files.com/6a36a3fb2e061ee276a4e112/6a661236098125f51a62decb_img-logo-materials-experiment-07.avif"} loading={"lazy"} alt={""} {...animationPart({"canvas-img":""}, "img")} />
            </div>
            <div role={"listitem"} className={"canvas-media-item w-dyn-item"}>
              <img src={"/media/cdn.prod.website-files.com/6a36a3fb2e061ee276a4e112/6a66124078c2488d88926aca_img-logo-materials-experiment-06.avif"} loading={"lazy"} alt={""} {...animationPart({"canvas-img":""}, "img")} />
            </div>
            <div role={"listitem"} className={"canvas-media-item w-dyn-item"}>
              <img src={"/media/cdn.prod.website-files.com/6a36a3fb2e061ee276a4e112/6a66124af2282dcdfb1208c9_img-logo-materials-experiment-05.avif"} loading={"lazy"} alt={""} {...animationPart({"canvas-img":""}, "img")} />
            </div>
            <div role={"listitem"} className={"canvas-media-item w-dyn-item"}>
              <img src={"/media/cdn.prod.website-files.com/6a36a3fb2e061ee276a4e112/6a661256794e48c4cd999b20_img-logo-materials-experiment-04.avif"} loading={"lazy"} alt={""} {...animationPart({"canvas-img":""}, "img")} />
            </div>
            <div role={"listitem"} className={"canvas-media-item w-dyn-item"}>
              <img src={"/media/cdn.prod.website-files.com/6a36a3fb2e061ee276a4e112/6a66125ee419e49ca43fad66_img-logo-materials-experiment-03.avif"} loading={"lazy"} alt={""} {...animationPart({"canvas-img":""}, "img")} />
            </div>
            <div role={"listitem"} className={"canvas-media-item w-dyn-item"}>
              <img src={"/media/cdn.prod.website-files.com/6a36a3fb2e061ee276a4e112/6a6612664db67bc41e20090a_img-logo-materials-experiment-02.avif"} loading={"lazy"} alt={""} {...animationPart({"canvas-img":""}, "img")} />
            </div>
            <div role={"listitem"} className={"canvas-media-item w-dyn-item"}>
              <img src={"/media/cdn.prod.website-files.com/6a36a3fb2e061ee276a4e112/6a66126ebf33efae2ee61ef4_img-logo-materials-experiment-01.avif"} loading={"lazy"} alt={""} {...animationPart({"canvas-img":""}, "img")} />
            </div>
          </div>
        </div>
      </main>
      <ArchiveStickynameSection1 />
      <div className={"scrollbar-wrap"}>
        <div {...animationPart({"magnetic-strength":"20"}, "scrollbar-thumb")} />
      </div>
    </div>
    <link rel={"stylesheet"} href={"https://unpkg.com/lenis@1.3.21/dist/lenis.css"} />
    </>
  );
}
