import { useState } from "react";
import Section from "../Util/Section";
import Container from "../Util/Container";
import Heading from "../Heading";
import {
  publicationsSection,
  publicationsList,
  showMoreButton
} from "../../stylesheets/components/Section/Publications.module.sass";
import PublicationCard from "../PublicationCard";

const publications = require("../../data/publications.json");

const PUBLICATIONS_PER_PAGE = 25;

const Publications = () => {
  const [visibleCount, setVisibleCount] = useState(PUBLICATIONS_PER_PAGE);
  
  const showMore = () => {
    setVisibleCount(prevCount => prevCount + PUBLICATIONS_PER_PAGE);
  };
  
  const visiblePublications = publications.publicationList.slice(0, visibleCount);
  const hasMore = visibleCount < publications.publicationList.length;
  
  return (
    <Section className={publicationsSection}>
      <Container>
        <Heading text="PUBLICATIONS" />
        <div className={publicationsList}>
          {visiblePublications.map((publication, index) => (
            <PublicationCard
              title={publication.title}
              venue={publication.venue}
              authors={publication.authors}
              year={publication.year}
              url={publication.url}
              key={`${publication.title}-${index}`}
            />
          ))}
        </div>
        {hasMore && (
          <button className={showMoreButton} onClick={showMore}>
            Show More Publications
          </button>
        )}
      </Container>
    </Section>
  );
};

export default Publications;
