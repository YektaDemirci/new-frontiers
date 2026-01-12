import Section from "../Util/Section";
import { useState, useEffect } from "react";
import {
  publicationsDiv,
  publicationsContainer,
  compactCard,
  compactTitle,
  compactVenue,
  compactAuthors,
  compactLink
} from "../../stylesheets/components/Section/PublicationsShowcase.module.sass";
import BlogShowcaseButton from "../BlogShowcase/BlogShowcaseButton";

const publications = require("../../data/publications.json");

const PublicationsShowcase = () => {
  const [numToShow, setNumToShow] = useState(8);

  useEffect(() => {
    const handleResize = () => {
      setNumToShow(window.innerWidth <= 768 ? 4 : 8);
    };

    handleResize(); // Set initial value
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const showcasePublications = publications.publicationList.slice(0, numToShow);

  return (
    <Section>
      <div className={publicationsDiv}>
        <div className={publicationsContainer}>
          {showcasePublications.map((publication, index) => {
            const displayAuthors = publication.authors.map(author => 
              author === '...' ? 'et al.' : author
            );
            const authorList = displayAuthors.join(", ");
            
            const content = (
              <div className={compactCard}>
                <h4 className={compactTitle}>{publication.title}</h4>
                <p className={compactVenue}>
                  {publication.venue} ({publication.year})
                </p>
                <p className={compactAuthors}>{authorList}</p>
              </div>
            );

            if (publication.url) {
              return (
                <a
                  href={publication.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={compactLink}
                  key={`${publication.title}-${index}`}
                >
                  {content}
                </a>
              );
            }

            return <div key={`${publication.title}-${index}`}>{content}</div>;
          })}
        </div>
        <BlogShowcaseButton
          link="/publications"
          text="View All Publications"
        />
      </div>
    </Section>
  );
};

export default PublicationsShowcase;
