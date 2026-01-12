import React from 'react';
import Section from '../Util/Section';
import Container from '../Util/Container';
import Heading from '../Heading';
import PersonCard from '../PersonCard';
import styles from '../../stylesheets/components/Section/People.module.sass';

const roleOrder = [
  { key: 'director', label: 'Director' },
  { key: 'postdoc', label: 'Postdoctoral' },
  { key: 'phd', label: 'Doctoral' },
  { key: 'masters', label: "Master's" },
  { key: 'bachelor', label: 'Bachelor' },
  { key: 'alumni', label: 'Alumni' }
];

const People = ({ people }) => {
  const groupedPeople = roleOrder.reduce((acc, roleInfo) => {
    const filtered = people.filter(person => person.role === roleInfo.key);
    if (filtered.length > 0) {
      acc.push({ ...roleInfo, people: filtered });
    }
    return acc;
  }, []);

  return (
    <Section id="people" className={styles.peopleSection}>
      <Container>
        <Heading text="OUR TEAM" />
        {groupedPeople.map((group) => (
          <div key={group.key} className={styles.roleSection}>
            <h2 className={styles.roleHeading}>{group.label}</h2>
            <div className={styles.peopleList}>
              {group.people.map((person) => (
                <PersonCard key={person.id} person={person} />
              ))}
            </div>
          </div>
        ))}
      </Container>
    </Section>
  );
};

export default People;
