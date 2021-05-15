import { down } from "styled-breakpoints";
import styled from "styled-components";

export const HomeWrapper = styled.div`
  display: flex;
  align-items: center;
  min-height: 80vh;
  max-width: 1300px;
  padding: 0 2rem;
  margin: auto;

  ${down("md")} {
    flex-direction: column-reverse;
    justify-content: flex-end;
  }
`;

export const Introduce = styled.div`
  width: 60%;
  padding: 0 72px 0 0;
  margin: 0 16px 0 0;

  ${down("md")} {
    width: 100%;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

export const IntroduceTitle = styled.div`
  color: #0099ff;
  text-transform: uppercase;
  font-weight: 500;
  font-size: 17px;
  letter-spacing: 1px;
  line-height: 1.25;

  ${down("md")} {
    text-align: center;
  }
`;

export const IntroduceBrand = styled.div`
  color: #eef1f5;
  font-weight: 900;
  font-size: 35px;
  line-height: 1.25;
  margin: 8px 0;

  ${down("md")} {
    font-size: 28px;
    text-align: center;
  }
`;

export const IntroduceDescription = styled.p`
  color: #bec3cd;
  font-size: 0.9rem;
  margin-top: 0.75rem;
  margin-bottom: 1.5rem;

  ${down("md")} {
    text-align: center;
  }
`;

export const InviteButtonWrapper = styled.a``;

export const InviteButton = styled.button`
  background: linear-gradient(
    90deg,
    rgba(0, 149, 238, 1) 0%,
    rgba(0, 212, 255, 1) 100%
  );
  color: #eef1f5;
  padding: 14px 28px;
  border-radius: 4px;
  font-weight: 600;
  display: inline-block;
  transition: color 0.2s ease-in-out, background 0.2s ease-in-out;
  border: none;
  cursor: pointer;
`;

export const Banner = styled.div`
  width: 40%;

  ${down("md")} {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-bottom: 3rem;
  }
`;

export const BannerImage = styled.img`
  width: 100%;

  ${down("md")} {
    width: 70%;
  }
`;
