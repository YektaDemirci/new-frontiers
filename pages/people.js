import React from 'react';
import NavigationBar from '../components/Navbar/NavigationBar';
import Footer from '../components/Footer/Footer';
import People from '../components/Section/People';
import getMeta from '../components/Util/MetaGenerator';
import navbarData from '../data/navbar.json';
import footerData from '../data/footer.json';
import peopleData from '../data/people.json';

const PeoplePage = () => {
  const meta = getMeta(
    'People - Lab Team',
    'Meet our research team members and their areas of expertise',
    '/images/meta/home.png',
    'Lab Team'
  );

  return (
    <>
      {meta}
      <NavigationBar linkStyle="white" forceBackground={true} data={navbarData} />
      <People people={peopleData.people} />
      <Footer data={footerData} />
    </>
  );
};

export default PeoplePage;
