import React, { useState } from 'react';
import styles from '../stylesheets/components/PersonCard.module.sass';

const PersonCard = ({ person }) => {
  const [imgSrc, setImgSrc] = useState(person.imageUrl);

  const handleImageError = () => {
    setImgSrc('/images/people/person-placeholder.jpg');
  };

  return (
    <div className={styles.personCard}>
      <div className={styles.imageContainer}>
        <img
          src={imgSrc}
          alt={person.name}
          className={styles.personImage}
          width={150}
          height={150}
          onError={handleImageError}
        />
      </div>
      <div className={styles.infoContainer}>
        <h3 className={styles.name}>{person.name}</h3>
        <h4 className={styles.researchTopic}>{person.researchTopic}</h4>
        <p className={styles.description}>{person.description}</p>
        {person.email && (
          <a href={`mailto:${person.email}`} className={styles.email}>
            {person.email}
          </a>
        )}
      </div>
    </div>
  );
};

export default PersonCard;
