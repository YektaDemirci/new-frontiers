import React from "react";
import NavigationBar from "../components/Navbar/NavigationBar";
import Footer from "../components/Footer/Footer";
import Publications from "../components/Section/Publications";
import getMeta from "../components/Util/MetaGenerator";
import navbarData from "../data/navbar.json";
import footerData from "../data/footer.json";

const PublicationsPage = () => {
  const meta = getMeta(
    "Publications",
    "Research papers and publications from our lab",
    "/images/meta/home.png",
    "Publications"
  );

  return (
    <>
      {meta}
      <NavigationBar
        linkStyle="white"
        forceBackground={true}
        data={navbarData}
      />
      <Publications />
      <Footer data={footerData} />
    </>
  );
};

export default PublicationsPage;
