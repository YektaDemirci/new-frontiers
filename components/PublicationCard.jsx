import PropTypes from "prop-types";
import {
  publicationCard,
  publicationTitle,
  publicationVenue,
  publicationAuthors,
  publicationLink
} from "../stylesheets/PublicationCard.module.sass";

const PublicationCard = ({ title, venue, authors, year, url }) => {
  // Check if the last author is "..." and replace with "et al."
  const displayAuthors = authors.map(author => 
    author === '...' ? 'et al.' : author
  );
  const authorList = displayAuthors.join(", ");

  const content = (
    <div className={publicationCard}>
      <h4 className={publicationTitle}>{title}</h4>
      <p className={publicationVenue}>
        {venue} ({year})
      </p>
      <p className={publicationAuthors}>{authorList}</p>
    </div>
  );

  if (url) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={publicationLink}
      >
        {content}
      </a>
    );
  }

  return content;
};

PublicationCard.propTypes = {
  title: PropTypes.string.isRequired,
  venue: PropTypes.string.isRequired,
  authors: PropTypes.arrayOf(PropTypes.string).isRequired,
  year: PropTypes.number.isRequired,
  url: PropTypes.string
};

PublicationCard.defaultProps = {
  url: null
};

export default PublicationCard;
