import styled from "styled-components";

export const HomeWrapper = styled.div`
  display: flex;
  align-items: center;
  min-height: 80vh;
  max-width: 1300px;
  padding: 0 1rem;
  margin: auto;
`;

export const Introduce = styled.div`
  width: 60%;
  padding: 0 72px 0 0;
  margin: 0 16px 0 0;
`;

export const IntroduceTitle = styled.div`
  color: #0099ff;
  text-transform: uppercase;
  font-weight: 500;
  font-size: 17px;
  letter-spacing: 1px;
  line-height: 1.25;
`;

export const IntroduceBrand = styled.div`
  color: #eef1f5;
  font-weight: 900;
  font-size: 35px;
  line-height: 1.25;
  margin: 8px 0;
`;

export const IntroduceDescription = styled.p`
  color: #bec3cd;
  font-size: 0.9rem;
  margin-top: 0.75rem;
  margin-bottom: 1.5rem;
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
`;

export const BannerImage = styled.img`
  width: 100%;
`;
