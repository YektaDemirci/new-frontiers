import NavigationBar from "../components/Navbar/NavigationBar";
import Landing from "../components/Section/Landing";
import PublicationsShowcase from "../components/Section/PublicationsShowcase";
import {
  footerSpacingBackground,
  footerPadding
} from "../stylesheets/Home.module.sass";
import Skills from "../components/Section/Skills";
import Footer from "../components/Footer/Footer";
import StartHereShowcase from "../components/Section/StartHereShowcase";
import getMeta from "../components/Util/MetaGenerator";
import Heading from "../components/Heading";

const content = require("../data/content.json");

export default function Home() {
  const meta = getMeta(
    content.pageTitle,
    content.pageDescription,
    "/images/meta/home.png",
    content.metaImageAlt
  );

  return (
    <>
      {meta}
      <NavigationBar />
      <Landing
        id={content.landingReference}
        arrowAnimationReference={content.publicationsReference}
      />

      <Heading
        id={content.startHereReference}
        text={content.startHereTitle}
      />
      <StartHereShowcase />

      <Heading id={content.publicationsReference} text={content.publicationsTitle} />
      <PublicationsShowcase />




      <div
        id={content.contactReference}
        className={`${footerSpacingBackground} ${footerPadding}`}
      >
        <Footer />
      </div>
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {}
  };
}
