import styled from "styled-components";
import { down } from "styled-breakpoints";

export const HeaderWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  padding: 1rem 1rem;
  margin: auto;
  display: flex;
  align-items: center;
`;

export const HeaderLogo = styled.img`
  width: 70px;
  height: 70px;
  margin-right: 20px;
`;

export const HeaderNavLinks = styled.div`
  flex: 1;
  display: flex;

  ${down("sm")} {
    justify-content: center;
  }
`;

export const HeaderNavLink = styled.div<{ currentLocation: boolean }>`
  margin: 0 8px;
  ${(props) => (props.currentLocation ? "text-decoration: underline;" : "")}
  :hover {
    text-decoration: underline;
  }
`;

export const HeaderGithubLogo = styled.img`
  width: 50px;
  height: 50px;
  margin-left: 20px;
`;
