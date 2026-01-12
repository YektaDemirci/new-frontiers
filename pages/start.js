import React, { useState } from "react";
import Head from "next/head";
import styles from "../stylesheets/StartHere.module.sass";
import NavigationBar from "../components/Navbar/NavigationBar";
import Footer from "../components/Footer/Footer";
import Heading from "../components/Heading";
import startHereData from "../data/startHere.json";

const StartHere = () => {
  const [activeSection, setActiveSection] = useState(null);

  const toggleSection = (sectionId) => {
    setActiveSection(activeSection === sectionId ? null : sectionId);
  };

  return (
    <>
      <Head>
        <title>{startHereData.title} - Your Gateway to Research</title>
        <meta name="description" content={startHereData.subtitle} />
      </Head>

      <NavigationBar forceBackground={true} />

      <div className={styles.container}>
        {/* Hero Section */}
        <div className={styles.hero}>
          <h1 className={styles.mainTitle}>{startHereData.title}</h1>
          <p className={styles.subtitle}>{startHereData.subtitle}</p>
          <div className={styles.heroDecoration}>
            <div className={styles.orbit}></div>
            <div className={styles.orbit}></div>
            <div className={styles.orbit}></div>
          </div>
        </div>

        {/* Main Content */}
        <div className={styles.content}>
          {/* Section Navigation */}
          <div className={styles.sectionNav}>
            {startHereData.sections.map((section) => (
              <button
                key={section.id}
                className={`${styles.navButton} ${activeSection === section.id ? styles.active : ""}`}
                onClick={() => toggleSection(section.id)}
              >
                <span className={styles.navIcon}>{section.icon}</span>
                <span className={styles.navText}>{section.title}</span>
              </button>
            ))}
          </div>

          {/* Sections */}
          <div className={styles.sections}>
            {startHereData.sections.map((section) => (
              <div
                key={section.id}
                className={`${styles.section} ${activeSection === section.id || activeSection === null ? styles.visible : styles.hidden}`}
              >
                <div className={styles.sectionHeader}>
                  <span className={styles.sectionIcon}>{section.icon}</span>
                  <div>
                    <h2 className={styles.sectionTitle}>{section.title}</h2>
                    <p className={styles.sectionDescription}>
                      {section.description}
                    </p>
                  </div>
                </div>

                <div className={styles.subsections}>
                  {section.subsections.map((subsection, index) => (
                    <div key={index} className={styles.subsection}>
                      <h3 className={styles.subsectionTitle}>
                        {subsection.title}
                      </h3>
                      <p className={styles.subsectionDescription}>
                        {subsection.description}
                      </p>

                      <div className={styles.links}>
                        {subsection.links.map((link, linkIndex) => (
                          <a
                            key={linkIndex}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.link}
                          >
                            <span className={styles.linkIcon}>🔗</span>
                            <span className={styles.linkText}>{link.text}</span>
                            <span className={styles.linkArrow}>→</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default StartHere;
