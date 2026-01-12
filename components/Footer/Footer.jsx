import Row from "../Util/Row";
import {
  footerStyle,
  footerDarkText,
  footerLightText,
  leftText,
  lineSeparator,
  footerName,
  footerList,
  footerLinks,
  signature,
  footerLeft,
  footerRight,
  footerListDescription,
  footerListContainer,
  footerLocation,
  footerGithubStats,
  footerGithubStatsLink,
  footerGithubStatsDiv,
  footerLogoContainer,
  footerLogoLink,
  footerLogo
} from "../../stylesheets/components/Footer/Footer.module.sass";

import Container from "../Util/Container";

const footer = require("../../data/footer.json");

const Footer = () => (
  <footer className={footerStyle}>
    <Container noPadding>
      <Row>
        <div className={`${footerLeft} ${lineSeparator}`}>
          <div className={footerLogoContainer}>
            <a
              href="https://www.polymtl.ca/en"
              target="_blank"
              rel="noopener noreferrer"
              className={footerLogoLink}
            >
              <img
                src={footer.plyImage}
                alt="Polytechnique Montreal"
                className={footerLogo}
              />
            </a>
            {footer.gramesImage && (
              <a
                href="https://www.grames.polymtl.ca/"
                target="_blank"
                rel="noopener noreferrer"
                className={footerLogoLink}
              >
                <img
                  src={footer.gramesImage}
                  alt="GRAMES"
                  className={footerLogo}
                />
              </a>
            )}
          </div>
        </div>

        <div className={`${footerRight}`}>
          <p className={`${footerLightText} ${footerName}`}>{footer.title}</p>
          <p className={`${footerLightText} ${footerLocation}`}>
            {footer.location}
          </p>
        </div>
      </Row>
    </Container>
  </footer>
);

export default Footer;
