import PropTypes from "prop-types";

import {
  introFont,
  introMargin,
  introHeadingStyle,
  introLeadInStyle,
  box
} from "../stylesheets/components/Hero.module.sass";

const Hero = ({ introHeading, introLeadIn }) => (
  <div className={`${introMargin}`}>
    <div className={`${introHeadingStyle} ${introFont}`}>{introHeading}</div>
  </div>
);

Hero.propTypes = {
  introHeading: PropTypes.string.isRequired,
  introLeadIn: PropTypes.string.isRequired
};

export default Hero;
