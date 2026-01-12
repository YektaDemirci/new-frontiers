import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  heroContainer,
  arrowMargin,
  arrowSize,
  heroBackground
} from "../../stylesheets/components/Section/Landing.module.sass";
import Container from "../Util/Container";
import Hero from "../Hero";
import { isIPad13 } from "react-device-detect";
import NoSSR from "react-no-ssr";
import { getRandomInt } from "../../utils/FileManager.utils";
import ArrowAnimation from "../Animations/ArrowAnimation";
import { debounce } from "../../utils/Limitors";

const hero = require("../../data/hero.json");

let windowInnerWidth = 0;

const Landing = ({ id, arrowAnimationReference }) => {
  const handleResize = () => {
    const currentWindowInnerWidth = window.innerWidth;
    if (currentWindowInnerWidth !== windowInnerWidth) {
      windowInnerWidth = currentWindowInnerWidth;
      const windowInnerHeight = window.innerHeight;
      document.documentElement.style.setProperty(
        "--windowInnerHeight",
        `${windowInnerHeight}px`
      );
    }
  };

  if (isIPad13) {
    handleResize();
  }

  useEffect(() => {
    if (isIPad13) {
      window.addEventListener("resize", debounce(handleResize));
    }
    return () => {
      if (isIPad13) {
        window.removeEventListener("resize", debounce(handleResize));
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // oFin vs videoFin
  const basicPrerender = (
    <header
      id={id}
      className={`${heroBackground}`}
      style={{ position: "relative", overflow: "hidden" }}
    >
      <video
        src="/images/hero/vh.webm"
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: -1,
          left: 0,
          top: 0
        }}
      />
      <Container
        className={heroContainer}
        style={{ position: "relative", zIndex: 3 }}
      >
        <Hero introHeading={hero.introHeading} introLeadIn={hero.introLeadIn} />
      </Container>
      <NoSSR>
        <ArrowAnimation
          className={`${arrowMargin} ${arrowSize}`}
          reference={arrowAnimationReference}
        />
      </NoSSR>
    </header>
  );

  return basicPrerender;
};
Landing.propTypes = {
  id: PropTypes.string.isRequired,
  arrowAnimationReference: PropTypes.string.isRequired
};

export default Landing;
