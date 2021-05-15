import { Link } from "react-router-dom";

import {
  HeaderWrapper,
  HeaderLogo,
  HeaderNavLinks,
  HeaderNavLink,
  HeaderGithubLogo,
} from "./styled";

import LogoImage from "../../assets/logo.png";
import GithubLogoImage from "../../assets/github.png";

const App = () => {
  return (
    <HeaderWrapper>
      <Link to="/">
        <HeaderLogo src={LogoImage} alt="logo" />
      </Link>
      <HeaderNavLinks>
        <HeaderNavLink>
          <Link to="/">Home</Link>
        </HeaderNavLink>
        <HeaderNavLink>
          <Link to="/docs">Docs</Link>
        </HeaderNavLink>
      </HeaderNavLinks>
      <a href="github.com" target="__blank">
        <HeaderGithubLogo src={GithubLogoImage} alt="github" />
      </a>
    </HeaderWrapper>
  );
};

export default App;
