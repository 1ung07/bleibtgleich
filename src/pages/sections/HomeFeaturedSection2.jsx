import React from 'react';
import { animationPart } from '../../animations/animationPart.js';

export default function HomeFeaturedSection2() {
  return (
    <>
      <section className={"featured"}>
        <div className={"featured-inner"}>
          <div {...animationPart({"featured":"heading"}, "featured-heading-wrap")}>
            <div {...animationPart({"featured":"text","reveal":"text"}, "h1")}>
              {"Work"}
            </div>
            <div {...animationPart({"featured":"text","reveal":"text"}, "h1")}>
              {" 24-26 "}
            </div>
            <div {...animationPart({"featured":"link"}, "featured-link-wrap")}>
              <a href={"/work"} {...animationPart({"haptic":"medium","underline":"wrap"}, "link w-inline-block")}>
                <div {...animationPart({"underline":"text"}, "h1")}>
                  {"All Works"}
                </div>
              </a>
            </div>
          </div>
          <div {...animationPart({"globe":"wrap","featured":"globe"}, "featured-globe")}>
            <div className={"globe-database-wrap w-dyn-list"}>
              <div role={"list"} {...animationPart({"globe":"database"}, "globe-database w-dyn-items")}>
                <div role={"listitem"} {...animationPart({"globe":"img"}, "globe-database-item w-dyn-item")}>
                  <img src={"/media/cdn.prod.website-files.com/6a36a3fb2e061ee276a4e112/6a6ba34a52217319fe1fbd57_img-cover-velor-app.avif"} loading={"eager"} alt={""} className={"img"} />
                </div>
                <div role={"listitem"} {...animationPart({"globe":"img"}, "globe-database-item w-dyn-item")}>
                  <img src={"/media/cdn.prod.website-files.com/6a36a3fb2e061ee276a4e112/6a660df2554cadd26cc0e5f4_img-cover-bleibtgleich-25.avif"} loading={"eager"} alt={""} className={"img"} />
                </div>
                <div role={"listitem"} {...animationPart({"globe":"img"}, "globe-database-item w-dyn-item")}>
                  <img src={"/media/cdn.prod.website-files.com/6a36a3fb2e061ee276a4e112/6a660aa2e419e49ca43e041b_img-work-in-progress-cover.avif"} loading={"eager"} alt={""} className={"img"} />
                </div>
                <div role={"listitem"} {...animationPart({"globe":"img"}, "globe-database-item w-dyn-item")}>
                  <img src={"/media/cdn.prod.website-files.com/6a36a3fb2e061ee276a4e112/6a660aa2e419e49ca43e041b_img-work-in-progress-cover.avif"} loading={"eager"} alt={""} className={"img"} />
                </div>
                <div role={"listitem"} {...animationPart({"globe":"img"}, "globe-database-item w-dyn-item")}>
                  <img src={"/media/cdn.prod.website-files.com/6a36a3fb2e061ee276a4e112/6a660dd9f64b053327a540d1_img-cover-jds.avif"} loading={"eager"} alt={""} className={"img"} />
                </div>
                <div role={"listitem"} {...animationPart({"globe":"img"}, "globe-database-item w-dyn-item")}>
                  <img src={"/media/cdn.prod.website-files.com/6a36a3fb2e061ee276a4e112/6a660aa2e419e49ca43e041b_img-work-in-progress-cover.avif"} loading={"eager"} alt={""} className={"img"} />
                </div>
                <div role={"listitem"} {...animationPart({"globe":"img"}, "globe-database-item w-dyn-item")}>
                  <img src={"/media/cdn.prod.website-files.com/6a36a3fb2e061ee276a4e112/6a660dcf6a5afe2ac40d6100_img-cover-nabil-issa-concept.avif"} loading={"eager"} alt={""} className={"img"} />
                </div>
                <div role={"listitem"} {...animationPart({"globe":"img"}, "globe-database-item w-dyn-item")}>
                  <img src={"/media/cdn.prod.website-files.com/6a36a3fb2e061ee276a4e112/6a660aa2e419e49ca43e041b_img-work-in-progress-cover.avif"} loading={"eager"} alt={""} className={"img"} />
                </div>
                <div role={"listitem"} {...animationPart({"globe":"img"}, "globe-database-item w-dyn-item")}>
                  <img src={"/media/cdn.prod.website-files.com/6a36a3fb2e061ee276a4e112/6a660dfa6a5afe2ac40d6bc7_img-cover-grabl-app.avif"} loading={"eager"} alt={""} className={"img"} />
                </div>
                <div role={"listitem"} {...animationPart({"globe":"img"}, "globe-database-item w-dyn-item")}>
                  <img src={"/media/cdn.prod.website-files.com/6a36a3fb2e061ee276a4e112/6a763729d43e0aa8e4d7f402_mkaan-cover_converted.avif"} loading={"eager"} alt={""} className={"img"} />
                </div>
                <div role={"listitem"} {...animationPart({"globe":"img"}, "globe-database-item w-dyn-item")}>
                  <img src={"/media/cdn.prod.website-files.com/6a36a3fb2e061ee276a4e112/6a660e042e5ac3690957fa67_img-cover-fool-miniapp.avif"} loading={"eager"} alt={""} className={"img"} />
                </div>
                <div role={"listitem"} {...animationPart({"globe":"img"}, "globe-database-item w-dyn-item")}>
                  <img src={"/media/cdn.prod.website-files.com/6a36a3fb2e061ee276a4e112/6a660e0b36062aa76138a9d1_img-cover-metrics-over-aesthetics.avif"} loading={"eager"} alt={""} className={"img"} />
                </div>
                <div role={"listitem"} {...animationPart({"globe":"img"}, "globe-database-item w-dyn-item")}>
                  <img src={"/media/cdn.prod.website-files.com/6a36a3fb2e061ee276a4e112/6a660e1b36062aa76138ac6b_img-cover-do-lorem-ipsum.avif"} loading={"eager"} alt={""} className={"img"} />
                </div>
                <div role={"listitem"} {...animationPart({"globe":"img"}, "globe-database-item w-dyn-item")}>
                  <img src={"/media/cdn.prod.website-files.com/6a36a3fb2e061ee276a4e112/6a660e2312af271ff52c6ab5_img-cover-cybernation.avif"} loading={"eager"} alt={""} className={"img"} />
                </div>
                <div role={"listitem"} {...animationPart({"globe":"img"}, "globe-database-item w-dyn-item")}>
                  <img src={"/media/cdn.prod.website-files.com/6a36a3fb2e061ee276a4e112/6a660e29f6f7472625bc9e17_img-cover-grabl-app-logo.avif"} loading={"eager"} alt={""} className={"img"} />
                </div>
                <div role={"listitem"} {...animationPart({"globe":"img"}, "globe-database-item w-dyn-item")}>
                  <img src={"/media/cdn.prod.website-files.com/6a36a3fb2e061ee276a4e112/6a660e3368a1aa809715cbdd_img-cover-xpm-platform.avif"} loading={"eager"} alt={""} className={"img"} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
