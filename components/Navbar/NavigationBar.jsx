import { useEffect, useState } from "react";
import NavbarItem from "./NavbarItem";
import {
  brand,
  brandContainer,
  customNavbar,
  mobileNavbar,
  mobileNavbarLinksCollapsed,
  mobileNavbarLinksExpanded,
  navbarFlagLarge,
  navbarFlagSmall,
  navbarContainer,
  navbarLinks,
  navbarToggle,
  topNavCollapse,
  topNavExpand,
  whiteLink
} from "../../stylesheets/components/Navbar/NavigationBar.module.sass";
import Container from "../Util/Container";
import NavbarToggle from "./NavbarToggle";
import { debounce, throttle } from "../../utils/Limitors";
import BrandingLogo from "../Animations/BrandingLogo";

const flags = require("../../data/flags.json");
const content = require("../../data/navbar.json");

const NavigationBar = ({ forceBackground = false }) => {
  const linkClass = whiteLink;
  const [navbarExpanded, setNavbarExpanded] = useState(true);
  const [mobileNavbarCollapsed, setMobileNavbarCollapsed] = useState(true);
  const [transparency, setTransparency] = useState(forceBackground ? 1.0 : 0.0);

  function handleScroll() {
    if (forceBackground) {
      // Keep the background solid when forceBackground is enabled
      setTransparency(1.0);
      return;
    }

    if (window.scrollY > 50) {
      setNavbarExpanded(false);
    } else if (window.scrollY < 50) {
      setNavbarExpanded(true);
    }

    if (window.scrollY > 500) {
      setTransparency(1);
    } else {
      setTransparency(window.scrollY / 500.0);
    }

    setMobileNavbarCollapsed(true);
  }

  useEffect(() => {
    /*  Safari does not call the scroll listener function if the user navigates back to the page.
        For example, a user can scroll all the way to the bottom of the page, click one of the links
        in the footer, then click the back button on the browser window. The scroll position will be
        remembered but the navigation bar style won't be updated to reflect the new state
        (blurred background). This is why we have to call the handleScroll function at least once
        when the component is mounted. */
    handleScroll();
    window.addEventListener("scroll", throttle(debounce(handleScroll)));
    return () =>
      window.removeEventListener("scroll", throttle(debounce(handleScroll)));
  }, []);

  return (
    <nav
      style={
        mobileNavbarCollapsed
          ? {
              backgroundColor: `rgba(27, 27, 27, ${transparency * 0.85})`,
              backdropFilter: `blur(${transparency * 5}px)`
            }
          : {
              backgroundColor: `rgba(27, 27, 27, 0.85)`,
              backdropFilter: `blur(${transparency * 5}px)`
            }
      }
      className={`${customNavbar} ${
        navbarExpanded ? topNavExpand : topNavCollapse
      }`}
    >
      <Container className={navbarContainer}>
        <div className={mobileNavbar}>
          <NavbarItem className={brandContainer} href="/">
            <img src="/images/brand.png" alt="Brand Logo" className={brand} />
            {/* <BrandingLogo
              className={brand}
              fillColor={"#F0F0F0"}
              strokeColor={"#F0F0F0"}
            /> */}
          </NavbarItem>

          <div className={navbarFlagSmall}>
            {flags.items.map((item) => (
              <NavbarItem
                reference={item.reference}
                href={item.href}
                className={linkClass}
                key={item.title}
              >
                {item.icon && item.icon.endsWith(".png") ? (
                  <img
                    src={item.icon}
                    alt={item.title}
                    style={{ height: 20, verticalAlign: "middle" }}
                  />
                ) : (
                  item.title
                )}
              </NavbarItem>
            ))}
            <NavbarToggle
              onClickMethod={setMobileNavbarCollapsed}
              collapsed={mobileNavbarCollapsed}
              className={navbarToggle}
            />
          </div>
        </div>

        <div style={{ display: "flex" }}>
          <div className={navbarFlagLarge}>
            {flags.items.map((item) => (
              <NavbarItem
                reference={item.reference}
                href={item.href}
                className={linkClass}
                key={item.title}
              >
                {item.icon && item.icon.endsWith(".png") ? (
                  <img
                    src={item.icon}
                    alt={item.title}
                    style={{ height: 20, verticalAlign: "middle" }}
                  />
                ) : (
                  item.title
                )}
              </NavbarItem>
            ))}
          </div>

          <div
            className={`${navbarLinks} ${
              mobileNavbarCollapsed
                ? mobileNavbarLinksCollapsed
                : mobileNavbarLinksExpanded
            }`}
          >
            {content.items.map((item) => (
              <NavbarItem
                reference={item.reference}
                href={item.href}
                className={linkClass}
                key={item.title}
              >
                {item.icon && item.icon.endsWith(".png") ? (
                  <img
                    src={item.icon}
                    alt={item.title}
                    style={{ height: 20, verticalAlign: "middle" }}
                  />
                ) : (
                  item.title
                )}
              </NavbarItem>
            ))}
          </div>
        </div>
      </Container>
    </nav>
  );
};

export default NavigationBar;
