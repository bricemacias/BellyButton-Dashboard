import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { DomainIcons } from '../../../../components/utils/DomainIcons';

import { DateTime } from 'luxon';

import { UPDATE_TALENT_SUBSCRIBERS } from '../../../../graphql/app';
import { useMutation } from '@apollo/client';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../../logic/store';
import talentsReducer from '../../../../logic/app/talentsReducer';

import { useToasts } from 'react-toast-notifications';

import Subscribers from './Subscribers';

import youtubeSvg from '../../../../assets/SVG/youtube.svg';
import triangleUpSvg from '../../../../assets/SVG/triangle-up.svg';
import triangleDownSvg from '../../../../assets/SVG/triangle-down.svg';
import controllerRecordSvg from '../../../../assets/SVG/controller-record.svg';
import checkSvg from '../../../../assets/SVG/check.svg';
import warningSvg from '../../../../assets/SVG/warning.svg';
import hourGlassSvg from '../../../../assets/SVG/hour-glass.svg';

import { ReactSVG } from 'react-svg';

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

const Avatar = styled.img`
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

const PlatformIcon = styled(ReactSVG)`
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

const TitleElement = styled.div<any>`
  transition: all 0.3s;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 40px;
  width: 50%;
  padding-left: 20px;
  font-weight: 500;
  /* text-decoration: underline 1px ${(p) => p.theme.colors.grey.light3}; */
  color: ${(p) => p.theme.colors.primary.main};

  &:hover {
    ${(p) => p.hover && 'padding-bottom: 5px'};
    ${(p) =>
      p.hover && `text-decoration: underline ${p.theme.colors.primary.main}`};
    ${(p) => p.hover && 'cursor: pointer'};
  }
`;
const ContentElement = styled.div`
  transition: all 1s;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 40px;
  width: 50%;
  padding-left: 20px;
`;

const UpdateIndicator = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-left: 10px;
`;

const UpdateIndicatorIcon = styled(ReactSVG)<any>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 10px;
  height: 10px;
  z-index: 2000;
  fill: ${(p) =>
    p.subscriberscount && p.updatedsubscribers === 'true'
      ? p.theme.colors.success
      : p.loading === 'true'
      ? p.theme.colors.primary.main
      : p.theme.colors.warning};
`;

const EvolutionIndicator = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-left: 10px;
`;

const EvolutionIndicatorIcon = styled(ReactSVG)<any>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${(p) =>
    p.subscribersevolutioncondition === 'same' ? '10px' : '18px'};
  height: ${(p) =>
    p.subscribersevolutioncondition === 'same' ? '10px' : '18px'};
  z-index: 2000;
  fill: ${(p) =>
    p.subscribersevolutioncondition === 'up'
      ? p.theme.colors.success
      : p.subscribersevolutioncondition === 'same'
      ? p.theme.colors.info
      : p.theme.colors.error.main};
`;

const Button = styled.button`
  transition: 0.3s;
  margin-top: 20px;
  width: 120px;
  height: 40px;
  border-radius: 50px;
  font-size: 12px;
  font-weight: 400;
  z-index: 200;
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

interface TalentCardProps {
  key: string;
  data: any;
}

const TalentCard = (props: TalentCardProps) => {
  const talents = useSelector((state: RootState) => state.talents.data);
  const dispatch = useDispatch();
  const updateTalents = talentsReducer.updateTalents;

  const { addToast } = useToasts();
  const [subscribersClick, setSubscribersClick] = useState<Boolean>(false);

  const [updateTalentSubscribers, { loading, error }] = useMutation(
    UPDATE_TALENT_SUBSCRIBERS
  );
  const [subscribersCount, setSubscribersCount] = useState<Number>(
    props.data &&
      props.data.mostRecentSubscribers &&
      props.data.mostRecentSubscribers.value &&
      props.data.mostRecentSubscribers.value
  );

  const NowTime = DateTime.now();

  const checkMonthSubscribers = props.data.subscribers
    //@ts-ignore
    .some((el) => {
      return DateTime.fromISO(el.date).hasSame(NowTime, 'month');
    });

  const [updatedSubscribers, setUpdatedSubscribers] = useState<Boolean>(
    checkMonthSubscribers
  );

  const SubscribersEvolutionCondition = checkMonthSubscribers
    ? props.data.mostRecentSubscribers.value > props.data.subscribers[1].value
      ? 'up'
      : props.data.mostRecentSubscribers.value ===
        props.data.subscribers[1].value
      ? 'same'
      : 'down'
    : subscribersCount > props.data.subscribers[0].value
    ? 'up'
    : subscribersCount === props.data.subscribers[0].value
    ? 'same'
    : 'down';

  // TODO: v30 useState boolean
  // TODO: v30count useState int, updates when modal update
  // TODO: Fauna, make all dates coherent between most recent and all subscribers and V30, changing them to january, adding february in the middle and for more recent, and test the program for march to see if it updates both all and most recent subscribers

  const openInNewTab = (url: string) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
    if (newWindow) newWindow.opener = null;
  };

  const youtubeApiKey = process.env.REACT_APP_YOUTUBE_API_KEY;

  const fetchSubscribers = async () => {
    let url = `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${props.data.youtube.channelId}&key=${youtubeApiKey}`;
    try {
      const fetching = await fetch(url);
      try {
        const result = await fetching.json();
        if (
          result &&
          result.pageInfo &&
          result.pageInfo.totalResults &&
          result.pageInfo.totalResults === 1
        ) {
          if (
            result &&
            result.items &&
            result.items[0].statistics.subscriberCount
          ) {
            try {
              await updateTalentSubscribers({
                variables: {
                  id: props.data._id,
                  name: props.data.name,
                  value: parseInt(
                    result &&
                      result.items &&
                      result.items[0].statistics.subscriberCount
                  ),
                  date: NowTime.toISODate(),
                  subscribers: [
                    {
                      value: parseInt(
                        result &&
                          result.items &&
                          result.items[0].statistics.subscriberCount
                      ),
                      date: NowTime.toISODate(),
                    },
                  ].concat(
                    //@ts-ignore
                    props.data.subscribers.map((el) => {
                      return { value: el.value, date: el.date };
                    })
                  ),
                },
              }).then((result) => {
                let resultCopy = { ...result.data.updateTalent };
                setSubscribersCount(
                  result.data.updateTalent.mostRecentSubscribers.value
                );
                let talentsCopy = [...talents];
                dispatch(
                  updateTalents(
                    talentsCopy.map((el: any) => {
                      if (el._id === props.data._id) {
                        return {
                          ...el,
                          mostRecentSubscribers: {
                            ...resultCopy.mostRecentSubscribers,
                          },
                          subscribers: [...resultCopy.subscribers],
                        };
                      } else {
                        return el;
                      }
                    })
                  )
                );
                setUpdatedSubscribers(true);
              });
              if (error) {
                addToast('GraphQL error in Update Talent Subscribers', {
                  appearance: 'error',
                  autoDismiss: true,
                });
                console.log(`GraphQL error : ${error.message}`);
              }
            } catch (error) {
              addToast('GraphQL error in Update Talent Subscribers', {
                appearance: 'error',
                autoDismiss: true,
              });
              console.log(`GraphQL error : ${error.message}`);
            }
          } else {
            addToast(
              `Youtube API warning : no subscribers count found for ${props.data.name}`,
              {
                appearance: 'warning',
                autoDismiss: true,
              }
            );
          }
        } else if (result && result.error) {
          addToast(`Youtube API error : ${result.error.message}`, {
            appearance: 'error',
            autoDismiss: true,
          });
        } else {
          addToast(
            `Could not resolve Youtube API for ${props.data.name}, please check Channel Id is correct`,
            {
              appearance: 'warning',
              autoDismiss: true,
            }
          );
        }
      } catch (error) {
        addToast(`Error in Youtube API for ${props.data.name}`, {
          appearance: 'error',
          autoDismiss: true,
        });
      }
    } catch (error) {
      addToast(`Error fetching Youtube API for ${props.data.name}`, {
        appearance: 'error',
        autoDismiss: true,
      });
    }
  };

  useEffect(() => {
    if (!checkMonthSubscribers) fetchSubscribers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <CardContainer>
      <Card>
        <AvatarSection>
          <Avatar
            src={props.data && props.data.avatar && props.data.avatar}
            alt="Avatar"
          />
          <Platform>
            <PlatformIcon
              src={
                props.data &&
                props.data.platform &&
                props.data.platform[0] &&
                props.data.platform[0].toLowerCase() === 'youtube' &&
                youtubeSvg
              }
            />
          </Platform>
        </AvatarSection>
        {/* // TODO : if subscribers, show subscribers component, if v30, show v30
              // TODO : component, if !subscribers et !v30, show normal (below) */}
        <Name>{props.data && props.data.name && props.data.name}</Name>
        <Domain>
          {props.data &&
            props.data.domain &&
            `${props.data.domain} ${DomainIcons(props.data.domain)}`}{' '}
        </Domain>
        {subscribersClick ? (
          <Subscribers
            {...props}
            goBack={() => setSubscribersClick(false)}
            updatedsubscribers={updatedSubscribers.toString()}
            checkmonth={checkMonthSubscribers.toString()}
            subscriberscount={subscribersCount}
            loading={loading}
            error={error}
          />
        ) : (
          <InformationSection>
            <Row>
              <TitleElement
                onClick={() => {
                  setSubscribersClick(true);
                }}
                hover={true}
              >
                Subscribers
              </TitleElement>
              <ContentElement>
                {loading ? '...' : subscribersCount}
                <EvolutionIndicator>
                  {!loading && (
                    <EvolutionIndicatorIcon
                      subscribersevolutioncondition={
                        SubscribersEvolutionCondition
                      }
                      src={
                        SubscribersEvolutionCondition === 'up'
                          ? triangleUpSvg
                          : SubscribersEvolutionCondition === 'same'
                          ? controllerRecordSvg
                          : triangleDownSvg
                      }
                    />
                  )}
                </EvolutionIndicator>
                <UpdateIndicator>
                  <UpdateIndicatorIcon
                    subscriberscount={subscribersCount}
                    updatedsubscribers={updatedSubscribers.toString()}
                    requestloading={loading.toString()}
                    src={
                      subscribersCount &&
                      updatedSubscribers.toString() === 'true'
                        ? checkSvg
                        : loading.toString() === 'true'
                        ? hourGlassSvg
                        : warningSvg
                    }
                  />
                </UpdateIndicator>
              </ContentElement>
            </Row>
            <Row>
              <TitleElement>V30</TitleElement>
              {/* // TODO: onclick v30 true */}
              <ContentElement>
                {props.data &&
                  props.data.mostRecentV30 &&
                  props.data.mostRecentV30.value &&
                  props.data.mostRecentV30.value}
              </ContentElement>
              {/* // TODO : put exclamation warning to see if subscribers has not been actualized during the month. put check mark if it has been updated */}
              {/* // TODO : put circle, up or down arrow depending on if the value of tha actual month is the same, bigger or smaller than before */}
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
        )}

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
