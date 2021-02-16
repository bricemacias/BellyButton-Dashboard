import React from 'react';
import styled from 'styled-components';
import icons from '../assets/sprite.svg';
import { DomainIcons } from '../components/utils/DomainIcons';

const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 400px;
  height: 500px;
  background-color: transparent;
`;

const AvatarSection = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 130px;
`;

const Avatar = styled.img<any>`
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s;
  width: 100px;
  height: 100px;
  border-radius: 200px;
  border: 4px solid rgba(155, 62, 150, 0.3);
`;

const Platform = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 15px;
  right: 5px;
  background-color: ${(p) => p.theme.colors.grey.light1};
  width: 30px;
  height: 30px;
  border-radius: 50px;
  z-index: 1000;
`;

const PlatformIcon = styled.svg`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  z-index: 2000;
  fill: ${(p) => p.theme.colors.error.main};
`;

const Card = styled.div`
  display: flex;
  background-color: white;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 300px;
  height: 400px;
  transition: all 0.3s;
  /* margin: 12rem auto; */

  border-width: 0;
  border-bottom-width: 0rem;
  border-radius: 70px;
  border-style: solid;
  /* border-image: linear-gradient(to right, #eb2f64, #ff4081); */
  border-image-slice: 1;
  box-shadow: 0rem 1rem 3rem rgba(189, 189, 189, 0.3);
  z-index: 100;

  @media only screen and (max-width: ${(p) => p.theme.screen.smallest}) {
    box-shadow: none;
    border: none;
    margin: '0 auto';
  }

  &:hover {
    width: 305px;
    height: 405px;
  }

  &:hover ${AvatarSection} ${Avatar} {
    width: 105px;
    height: 105px;
    border: 5px solid rgba(155, 62, 150, 0.3);
  }
`;

const Name = styled.div`
  font-size: 20px;
  font-weight: 500;
  color: ${(p) => p.theme.colors.grey.dark1};
  margin-top: -12px;
`;

const Domain = styled.div`
  font-size: 15px;
  font-weight: 400;
  margin-bottom: 15px;
`;

const InformationSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 200px;
  font-size: 12px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const TitleElement = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 40px;
  width: 50%;
  padding-left: 20px;
  font-weight: 500;
  /* text-decoration: underline 1px ${(p) => p.theme.colors.grey.light3}; */
  color: ${(p) => p.theme.colors.primary.main};
`;
const ContentElement = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 40px;
  width: 50%;
  padding-left: 20px;
`;

const Button = styled.button`
  transition: 0.3s;
  margin-top: 20px;
  width: 120px;
  height: 40px;
  border-radius: 50px;
  font-size: 12px;
  font-weight: 400;
  border: none;
  color: white;
  background: ${(p) =>
    p.disabled
      ? 'linear-gradient(90deg, #c1b9ee, #c1b9ee 49%, #c1b9ee)'
      : 'linear-gradient(90deg, #432d9c, #2c34ac 49%, #2736af)'};
  cursor: ${(p) => (p.disabled ? '' : 'pointer')};

  &:hover {
    ${(p) => !p.disabled && 'width: 130px'};
    ${(p) => !p.disabled && 'margin-top: 18px'};
    ${(p) => !p.disabled && 'box-shadow: 0 1rem 2rem #c1b9ee'};
  }
`;

const TalentCard = (props: any) => {
  const openInNewTab = (url: any) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
    if (newWindow) newWindow.opener = null;
  };

  return (
    <CardContainer>
      <Card>
        <AvatarSection>
          <Avatar
            src={props.data && props.data.avatar && props.data.avatar}
            alt="Avatar"
          />
          <Platform>
            <PlatformIcon>
              <use
                xlinkHref={
                  props.data &&
                  props.data.platform &&
                  props.data.platform[0] &&
                  `${icons}#${props.data.platform[0].toLowerCase()}`
                }
              />
            </PlatformIcon>
          </Platform>
        </AvatarSection>
        <Name>{props.data && props.data.name && props.data.name}</Name>
        <Domain>
          {props.data &&
            props.data.domain &&
            `${props.data.domain} ${DomainIcons(props.data.domain)}`}{' '}
        </Domain>
        <InformationSection>
          <Row>
            <TitleElement>Subscribers</TitleElement>
            <ContentElement>
              {props.data &&
                props.data.mostRecentSubscribers &&
                props.data.mostRecentSubscribers.value &&
                props.data.mostRecentSubscribers.value}
            </ContentElement>
          </Row>
          <Row>
            <TitleElement>V30</TitleElement>
            <ContentElement>
              {props.data &&
                props.data.mostRecentV30 &&
                props.data.mostRecentV30.value &&
                props.data.mostRecentV30.value}
            </ContentElement>
          </Row>
          <Row>
            <TitleElement>Price</TitleElement>
            <ContentElement>
              {props.data &&
                props.data.mostRecentPrice &&
                props.data.mostRecentPrice.value &&
                `${props.data.mostRecentPrice.value}€`}
            </ContentElement>
          </Row>
        </InformationSection>
        <Button
          onClick={() =>
            props.data &&
            props.data.youtube &&
            props.data.youtube.link &&
            openInNewTab(props.data.youtube.link)
          }
        >
          Visit Channel
        </Button>
      </Card>
    </CardContainer>
  );
};

export default TalentCard;
