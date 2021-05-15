import {
  HomeWrapper,
  Introduce,
  IntroduceBrand,
  IntroduceTitle,
  IntroduceDescription,
  InviteButtonWrapper,
  InviteButton,
  Banner,
  BannerImage,
} from "./styled";

import BannerImageC from "../../assets/banner.png";

const Home = () => {
  return (
    <HomeWrapper>
      <Introduce>
        <IntroduceTitle>{"NEW & IMPROVED"}</IntroduceTitle>
        <IntroduceBrand>You, your friends, and some good tunes</IntroduceBrand>
        <IntroduceDescription>
          Misa makes it possible to listen to your favorite music with all your
          friends. Add it to Discord today and start listening!
        </IntroduceDescription>
        <InviteButtonWrapper
          href="https://discord.com/api/oauth2/authorize?client_id=843003904904134667&permissions=2151079744&scope=bot"
          target="__blank"
        >
          <InviteButton>Invite Misa</InviteButton>
        </InviteButtonWrapper>
      </Introduce>
      <Banner>
        <BannerImage src={BannerImageC} />
      </Banner>
    </HomeWrapper>
  );
};

export default Home;
