import Section from "../Util/Section";
import Container from "../Util/Container";
import Link from "next/link";
import styles from "../../stylesheets/components/Section/StartHereShowcase.module.sass";

const startHereData = require("../../data/startHere.json");

const StartHereShowcase = () => (
  <Section>
    <Container className={styles.container}>
      <div className={styles.cardsGrid}>
        {startHereData.sections.map((section) => (
          <Link href="/start" key={section.id} className={styles.card}>
            <div className={styles.titleRow}>
              <span className={styles.titleIcon}>{section.icon}</span>
              <h3 className={styles.title}>{section.title}</h3>
            </div>
            <p className={styles.description}>{section.description}</p>
            <span className={styles.arrow}>→</span>
          </Link>
        ))}
      </div>
    </Container>
  </Section>
);

export default StartHereShowcase;
