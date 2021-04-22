import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { DomainIcons } from '../../../../components/utils/DomainIcons';

import { DateTime } from 'luxon';

import {
  UPDATE_TALENT_SUBSCRIBERS,
  UPDATE_TALENT_V30,
} from '../../../../graphql/app';
import { useMutation } from '@apollo/client';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../../logic/store';
import talentsReducer from '../../../../logic/app/talentsReducer';
import notificationsReducer from '../../../../logic/app/notificationsReducer';

import { useToasts } from 'react-toast-notifications';

import Subscribers from './Subscribers';
import V30 from './V30';

import youtubeSvg from '../../../../assets/SVG/youtube.svg';
import triangleUpSvg from '../../../../assets/SVG/triangle-up.svg';
import triangleDownSvg from '../../../../assets/SVG/triangle-down.svg';
import controllerRecordSvg from '../../../../assets/SVG/controller-record.svg';
import checkSvg from '../../../../assets/SVG/check.svg';
import warningSvg from '../../../../assets/SVG/warning.svg';
import hourGlassSvg from '../../../../assets/SVG/hour-glass.svg';

import { RoundShape } from 'react-placeholder/lib/placeholders';

import 'react-placeholder/lib/reactPlaceholder.css';
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
  /* z-index: 1000; */
`;

const PlatformIcon = styled(ReactSVG)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  /* z-index: 2000; */
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
  /* z-index: 100; */

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
  /* z-index: 2000; */
  fill: ${(p) =>
    p.count && p.updated === 'true'
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
  width: ${(p) => (p.evolutioncondition === 'same' ? '10px' : '18px')};
  height: ${(p) => (p.evolutioncondition === 'same' ? '10px' : '18px')};
  /* z-index: 2000; */
  fill: ${(p) =>
    p.evolutioncondition === 'up'
      ? p.theme.colors.success
      : p.evolutioncondition === 'same'
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
  /* z-index: 200; */
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
  number: number;
}

const TalentCard = (props: TalentCardProps) => {
  const talents = useSelector((state: RootState) => state.talents.data);
  const notifications: any = useSelector(
    (state: RootState) => state.notifications.data
  );
  const v30ModalOpener = useSelector(
    (state: RootState) => state.notifications.v30ModalOpener
  );

  const dispatch = useDispatch();
  const notificationsDispatch = useDispatch();
  const updateTalents = talentsReducer.updateTalents;
  const updateNotificationsData = notificationsReducer.updateNotificationsData;
  const addNotifications = notificationsReducer.addNotifications;

  const { addToast } = useToasts();
  const [subscribersClick, setSubscribersClick] = useState<Boolean>(false);
  const [v30Click, setV30Click] = useState<Boolean>(false);
  const [openV30UpdateModal, setOpenV30UpdateModal] = useState<Boolean>(false);

  const [
    updateTalentSubscribers,
    { loading: loadingSubscribers, error: errorSubscribers },
  ] = useMutation(UPDATE_TALENT_SUBSCRIBERS);

  const [
    updateTalentV30,
    { loading: loadingV30, error: v30Error },
  ] = useMutation(UPDATE_TALENT_V30);

  const [subscribersCount, setSubscribersCount] = useState<Number>(
    props.data &&
      props.data.mostRecentSubscribers &&
      props.data.mostRecentSubscribers.value &&
      props.data.mostRecentSubscribers.value
  );

  const [v30Count, setV30Count] = useState<Number>(
    props.data &&
      props.data.mostRecentV30 &&
      props.data.mostRecentV30.value &&
      props.data.mostRecentV30.value
  );

  const NowTime = DateTime.now();

  const checkMonthSubscribers = props.data.subscribers.some((el: any) => {
    return DateTime.fromISO(el.date).hasSame(NowTime, 'month');
  });
  const checkMonthV30 = props.data.v30.some((el: any) => {
    return DateTime.fromISO(el.date).hasSame(NowTime, 'month');
  });

  const [updatedSubscribers, setUpdatedSubscribers] = useState<Boolean>(
    checkMonthSubscribers
  );

  const [updatedV30, setUpdatedV30] = useState<Boolean>(checkMonthV30);

  const SubscribersEvolutionCondition =
    props.data.subscribers.length <= 1
      ? 'same'
      : checkMonthSubscribers
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

  const V30EvolutionCondition =
    props.data.v30.length <= 1
      ? 'same'
      : checkMonthV30
      ? props.data.mostRecentV30.value > props.data.v30[1].value
        ? 'up'
        : props.data.mostRecentV30.value === props.data.v30[1].value
        ? 'same'
        : 'down'
      : subscribersCount > props.data.v30[0].value
      ? 'up'
      : subscribersCount === props.data.v30[0].value
      ? 'same'
      : 'down';

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
                  subscribers: checkMonthSubscribers
                    ? props.data.subscribers.map((el: any) => {
                        if (
                          DateTime.fromISO(el.date).hasSame(NowTime, 'month')
                        ) {
                          return {
                            value: parseInt(
                              result &&
                                result.items &&
                                result.items[0].statistics.subscriberCount
                            ),
                            date: NowTime.toISODate(),
                          };
                        } else {
                          return { value: el.value, date: el.date };
                        }
                      })
                    : [
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
              if (errorSubscribers) {
                addToast('GraphQL error in Update Talent Subscribers', {
                  appearance: 'error',
                  autoDismiss: true,
                });
                console.log(`GraphQL error : ${errorSubscribers.message}`);
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

  useEffect(() => {
    if (updatedV30 === false) {
      if (
        !notifications.some((el: any) => {
          console.log(el.title);
          let element: any = el;
          return (
            element.title &&
            element.title === `V30 of ${props.data.name} needs to be updated`
          );
        })
      ) {
        let updatedNotifications = [...notifications];
        console.log(updatedNotifications);
        notificationsDispatch(
          addNotifications({
            title: `V30 of ${props.data.name} needs to be updated`,
            read: false,
            type: 'V30Update',
            talent: props.data.name,
          })
        );
      }
    } else {
      if (
        notifications.some(
          (el: any) =>
            el.title === `V30 of ${props.data.name} needs to be updated`
        )
      ) {
        let updatedNotifications = [...notifications].filter((el: any) => {
          if (el.title === `V30 of ${props.data.name} needs to be updated`) {
            return false;
          } else {
            return true;
          }
        });
        notificationsDispatch(updateNotificationsData(updatedNotifications));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updatedV30]);

  useEffect(() => {
    console.log('useEffect', notifications);
  }, [notifications]);

  const [avatarLoaded, setAvatarLoaded] = useState(false);
  const avatar = (display: boolean) => (
    <Avatar
      src={props.data && props.data.avatar && props.data.avatar}
      onLoad={() => setAvatarLoaded(true)}
      style={{ display: display ? 'visible' : 'none' }}
      alt="Avatar"
    />
  );

  useEffect(() => {
    if (v30ModalOpener.name === props.data.name) {
      if (v30ModalOpener.openModal === true) {
        setV30Click(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [v30ModalOpener]);

  useEffect(() => {
    if (openV30UpdateModal === false) {
      if (v30ModalOpener.name === props.data.name) {
        if (v30ModalOpener.openModal === false) {
          setTimeout(function () {
            setV30Click(false);
          }, 1000);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [v30ModalOpener]);

  return (
    <CardContainer>
      <Card>
        <AvatarSection>
          {avatar(avatarLoaded)}
          {avatarLoaded ? (
            avatar(true)
          ) : (
            <RoundShape color="#f7F7F7" style={{ width: 100, height: 100 }} />
          )}

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
            fetchsubscribers={fetchSubscribers}
            loading={loadingSubscribers}
            error={errorSubscribers}
          />
        ) : v30Click ? (
          <V30
            {...props}
            goBack={() => setV30Click(false)}
            updatetalent30={updateTalentV30}
            updatedv30={updatedV30.toString()}
            setupdatedv30={setUpdatedV30}
            v30count={v30Count}
            setv30count={setV30Count}
            checkmonth={checkMonthV30}
            dispatch={dispatch}
            updatetalents={updateTalents}
            talents={talents}
            // v30count={v30Count}
            // fetchv30={fetchV30}
            v30loading={loadingV30.toString()}
            v30error={v30Error}
            setv30click={setV30Click}
            openV30UpdateModal={openV30UpdateModal}
            setOpenV30UpdateModal={setOpenV30UpdateModal}
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
                {loadingSubscribers ? '...' : subscribersCount}
                <EvolutionIndicator>
                  {!loadingSubscribers && (
                    <EvolutionIndicatorIcon
                      evolutioncondition={SubscribersEvolutionCondition}
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
                    count={subscribersCount}
                    updated={updatedSubscribers.toString()}
                    requestloading={loadingSubscribers.toString()}
                    src={
                      subscribersCount &&
                      updatedSubscribers.toString() === 'true'
                        ? checkSvg
                        : loadingSubscribers.toString() === 'true'
                        ? hourGlassSvg
                        : warningSvg
                    }
                  />
                </UpdateIndicator>
              </ContentElement>
            </Row>
            <Row>
              <TitleElement
                onClick={() => {
                  setV30Click(true);
                }}
                hover={true}
              >
                V30
              </TitleElement>
              <ContentElement>
                {props.data &&
                  props.data.mostRecentV30 &&
                  props.data.mostRecentV30.value &&
                  props.data.mostRecentV30.value}
                <EvolutionIndicator>
                  {!loadingV30 && (
                    <EvolutionIndicatorIcon
                      evolutioncondition={V30EvolutionCondition}
                      src={
                        V30EvolutionCondition === 'up'
                          ? triangleUpSvg
                          : V30EvolutionCondition === 'same'
                          ? controllerRecordSvg
                          : triangleDownSvg
                      }
                    />
                  )}
                </EvolutionIndicator>
                <UpdateIndicator>
                  <UpdateIndicatorIcon
                    count={v30Count}
                    updated={updatedV30.toString()}
                    requestloading={loadingV30.toString()}
                    src={
                      v30Count && updatedV30.toString() === 'true'
                        ? checkSvg
                        : loadingV30.toString() === 'true'
                        ? hourGlassSvg
                        : warningSvg
                    }
                  />
                </UpdateIndicator>
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
