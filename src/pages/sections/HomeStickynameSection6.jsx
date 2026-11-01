import React from 'react';
import { animationPart } from '../../animations/animationPart.js';

export default function HomeStickynameSection6() {
  return (
    <>
      <section className={"sticky-name"}>
        <div {...animationPart({"preloader":"count"}, "count")}>
          {"0%"}
        </div>
        <div className={"sticky-name-inner"}>
          <div {...animationPart({"sticky-name":""}, "name-part-wrap is-left")}>
            <div className={"h1"}>
              {"bleibt"}
            </div>
          </div>
          <div {...animationPart({"sticky-name":""}, "name-part-wrap is-right")}>
            <div className={"h1"}>
              {"gleich"}
            </div>
          </div>
        </div>
        <div className={"sticky-name-meta"}>
          <div {...animationPart({"prevent-flicker":"","sticky-meta":"text"}, "p1")}>
            {" ‘26 © All Right Reserved "}
          </div>
          <div {...animationPart({"prevent-flicker":"","sticky-meta":"text"}, "p1")}>
            {" made w/ hate "}
          </div>
        </div>
      </section>
    </>
  );
}
