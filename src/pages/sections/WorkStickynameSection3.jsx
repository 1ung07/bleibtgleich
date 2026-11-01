import React from 'react';
import { animationPart } from '../../animations/animationPart.js';

export default function WorkStickynameSection3() {
  return (
    <>
      <section className={"sticky-name"}>
        <div {...animationPart({"preloader":"count"}, "count")}>
          {"0%"}
        </div>
        <div className={"sticky-name-inner"}>
          <div {...animationPart({"sticky-name":""}, "h1")}>
            {"bleibt"}
          </div>
          <div {...animationPart({"sticky-name":""}, "h1")}>
            {"gleich"}
          </div>
        </div>
        <div className={"sticky-name-meta"}>
          <div {...animationPart({"prevent-flicker":"","sticky-meta":"text"}, "p1")}>
            {"‘26 © All Right Reserved"}
          </div>
          <div {...animationPart({"prevent-flicker":"","sticky-meta":"text"}, "p1")}>
            {"made w/ hate"}
          </div>
        </div>
      </section>
    </>
  );
}
