import { Link, useLocation, withRouter } from "react-router-dom";

import {
  HeaderWrapper,
  HeaderLogo,
  HeaderNavLinks,
  HeaderNavLink,
  HeaderGithubLogo,
} from "./styled";

import LogoImage from "../../assets/logo.png";
import GithubLogoImage from "../../assets/github.png";

const Header = () => {
  const location = useLocation();

  return (
    <HeaderWrapper>
      <Link to="/">
        <HeaderLogo src={LogoImage} alt="logo" />
      </Link>
      <HeaderNavLinks>
        <HeaderNavLink currentLocation={location.pathname === "/"}>
          <Link to="/">Home</Link>
        </HeaderNavLink>
        <HeaderNavLink currentLocation={location.pathname === "/docs"}>
          <Link to="/docs">Docs</Link>
        </HeaderNavLink>
      </HeaderNavLinks>
      <a href="https://github.com/Misabot/misabot-discord" target="__blank">
        <HeaderGithubLogo src={GithubLogoImage} alt="github" />
      </a>
    </HeaderWrapper>
  );
};

export default withRouter(Header);
