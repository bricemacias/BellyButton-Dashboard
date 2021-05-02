// TODO : implement chart showing all v30 evolution with time
// TODO : implement modal for updating V30
// TODO: add button to update, if it has already been updated during the month, it will only change the value of the current month. If it has not been updated, it will change the most recent, and add a new element on the total vector for the actual month

import React, { useEffect } from 'react';
import styled from 'styled-components';
import { ReactSVG } from 'react-svg';
import { Line } from '@reactchartjs/react-chart.js';
import { DateTime, Info } from 'luxon';

import { useSelector, useDispatch } from 'react-redux';

import { useToasts } from 'react-toast-notifications';

import ModalComponent from '../../../../components/Modal';
import NewTalent from './NewTalent';
import UpdateV30 from './UpdateV30';

import chevronLeftSvg from '../../../../assets/SVG/chevron-left.svg';
// import checkSvg from '../../../../assets/SVG/check.svg';
import hourGlassSvg from '../../../../assets/SVG/hour-glass.svg';
// import warningSvg from '../../../../assets/SVG/warning.svg';
import cycleSvg from '../../../../assets/SVG/cycle.svg';
import { RootState } from '../../../../logic/store';
import notificationsReducer from '../../../../logic/app/notificationsReducer';

const V30Container = styled.div`
  background-color: transparent;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TopBarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding-left: 13px;
  padding-right: 13px;
  height: 23px;
`;

const GoBack = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  width: 30px;
`;

const GoBackIcon = styled(ReactSVG)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  /* z-index: 2000; */
  fill: ${(p) => p.theme.colors.secondary.blue};
  &:hover {
    width: 22px;
    height: 22px;
  }
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 10px;
  /* color: ${(p) => p.theme.colors.grey.dark3}; */
  color: rgba(255, 99, 132, 0.5);
`;

const Update = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
`;

const UpdateIcon = styled(ReactSVG)<any>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 17px;
  height: 17px;
  /* z-index: 2000; */
  fill: ${(p) => p.theme.colors.secondary.blue};
  &:hover {
    width: 18px;
    height: 18px;
  }
  ${(p) => p.update === 'true' && p.isloading === 'false' && 'cursor: pointer'};
`;

const ChartContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: -40px;
`;

interface V30ElementProps {
  value: number;
  date: string;
}

const V30 = (props: any) => {
  const { addToast } = useToasts();

  const v30ModalOpener = useSelector(
    (state: RootState) => state.notifications.v30ModalOpener
  );
  const dispatch = useDispatch();
  const updateV30ModalOpener = notificationsReducer.updateV30ModalOpener;

  // const checkDayV30 = props.data.v30.some((el: any) => {
  //   return DateTime.fromISO(el.date).hasSame(nowDate, 'day');
  // });

  const NowTime = DateTime.now();

  // useEffect qui set openModal en fonction d'un redux qu'il reçoit.si le redux contient le nom du talent et qu'il est set à true, alors open modal se set a true.

  useEffect(() => {
    if (v30ModalOpener.name === props.data.name) {
      if (v30ModalOpener.openModal === true) {
        props.setOpenV30UpdateModal(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [v30ModalOpener]);

  useEffect(() => {
    if (props.openV30UpdateModal === false) {
      if (v30ModalOpener.name === props.data.name) {
        dispatch(
          updateV30ModalOpener({ name: props.data.name, openModal: false })
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.openV30UpdateModal]);

  const data = {
    labels: props.data.v30
      .map((el: V30ElementProps) => {
        let date = DateTime.fromISO(el.date);
        return `${Info.months('long', { locale: 'en-GB' })[date.month - 1]} ${
          date.year
        }`;
      })
      .reverse(),
    datasets: [
      {
        label: 'V30',
        data: props.data.v30
          .map((el: V30ElementProps) => {
            return el.value;
          })
          .reverse(),
        fill: false,
        backgroundColor: 'rgb(255, 183, 199)',
        borderColor: 'rgb(255, 99, 133)',
        // borderColor: 'rgba(255, 99, 132, 0.2)',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      display: false,
    },
    scales: {
      xAxes: [
        {
          ticks: {
            display: true,
            autoSkip: true,
            maxTicksLimit: 4,
            fontSize: 8,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        },
      ],
      yAxes: [
        {
          ticks: {
            display: true,
            autoSkip: true,
            maxTicksLimit: 3,
            fontSize: 7,
          },
          gridLines: {
            display: true,
            drawBorder: false,
          },
        },
      ],
    },
    layout: {
      padding: {
        top: 20,
        left: 50,
        right: 50,
        bottom: 50,
      },
    },
  };

  const updateV30 = async (value: number) => {
    console.log(props.data.v30);
    console.log(props.checkmonth);
    console.log(
      props.data.v30.map((el: any) => {
        if (DateTime.fromISO(el.date).hasSame(NowTime, 'month')) {
          return {
            value: value,
            date: NowTime.toISODate(),
          };
        } else {
          return { value: el.value, date: el.date };
        }
      })
    );
    try {
      await props
        .updatetalent30({
          variables: {
            id: props.data._id,
            name: props.data.name,
            value: value,
            date: NowTime.toISODate(),
            v30: props.checkmonth
              ? props.data.v30.map((el: any) => {
                  if (DateTime.fromISO(el.date).hasSame(NowTime, 'month')) {
                    return {
                      value: value,
                      date: NowTime.toISODate(),
                    };
                  } else {
                    return { value: el.value, date: el.date };
                  }
                })
              : [
                  {
                    value: value,
                    date: NowTime.toISODate(),
                  },
                ].concat(
                  //@ts-ignore
                  props.data.v30.map((el) => {
                    return { value: el.value, date: el.date };
                  })
                ),
          },
        })
        .then((result: any) => {
          let resultCopy = { ...result.data.updateTalent };
          props.setv30count(result.data.updateTalent.mostRecentV30.value);
          let talentsCopy = [...props.talents];
          props.dispatch(
            props.updatetalents(
              talentsCopy.map((el: any) => {
                if (el._id === props.data._id) {
                  return {
                    ...el,
                    mostRecentV30: {
                      ...resultCopy.mostRecentV30,
                    },
                    v30: [...resultCopy.v30],
                  };
                } else {
                  return el;
                }
              })
            )
          );
          addToast('V30 successfully updated', {
            appearance: 'success',
            autoDismiss: true,
          });
          props.setupdatedv30(true);
        });
      if (props.v30error) {
        addToast('GraphQL error in Update Talent V30', {
          appearance: 'error',
          autoDismiss: true,
        });
        console.log(`GraphQL error : ${props.v30error.message}`);
      }
    } catch (error) {
      addToast('GraphQL error in Update Talent V30', {
        appearance: 'error',
        autoDismiss: true,
      });
      console.log(`GraphQL error : ${error.message}`);
    }
  };

  return (
    <V30Container>
      <TopBarContainer>
        <GoBack onClick={props.goBack}>
          <GoBackIcon src={chevronLeftSvg} />
        </GoBack>
        <Title>V30</Title>
        <Update>
          {props.v30loading === 'true' ? (
            <UpdateIcon src={hourGlassSvg} isloading="true" />
          ) : (
            <UpdateIcon
              update={'true'}
              isloading={'false'}
              onClick={() => {
                props.setOpenV30UpdateModal(true);
              }}
              src={cycleSvg}
            />
          )}
          {/* {props.v30loading === 'true' ? (
            <UpdateIcon src={hourGlassSvg} />
          ) : !props.v30error ? (
            <UpdateIcon
              update={checkDayV30 ? 'false' : 'true'}
              isloading={props.v30loading ? 'true' : 'false'}
              onClick={() => {
                checkDayV30 && setOpenModal(true);
              }}
              src={checkDayV30 ? checkSvg : cycleSvg}
            />
          ) : (
            <UpdateIcon
              onClick={() => {
                setOpenModal(true);
              }}
              src={warningSvg}
            />
          )} */}
        </Update>
      </TopBarContainer>
      {data.labels.length > 1 ? (
        <ChartContainer>
          <Line type="line" data={data} options={options} />
        </ChartContainer>
      ) : (
        <NewTalent />
      )}
      <ModalComponent
        openModal={props.openV30UpdateModal}
        setOpenModal={props.setOpenV30UpdateModal}
      >
        <UpdateV30
          {...props}
          updatev30={updateV30}
          setopenmodal={props.setOspenV30UpdateModal}
        />
      </ModalComponent>
    </V30Container>
  );
};

export default V30;
