// TODO: add case when there is not enough data, (only one month available), and only take the last 5 months maximum

import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { ReactSVG } from 'react-svg';
import { Line } from '@reactchartjs/react-chart.js';
import { DateTime, Info } from 'luxon';

import chevronLeftSvg from '../../../../assets/SVG/chevron-left.svg';
import checkSvg from '../../../../assets/SVG/check.svg';
import hourGlassSvg from '../../../../assets/SVG/hour-glass.svg';
import warningSvg from '../../../../assets/SVG/warning.svg';
import cycleSvg from '../../../../assets/SVG/cycle.svg';

const SubscribersContainer = styled.div`
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
  z-index: 2000;
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
  z-index: 2000;
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

const NewTalent = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 10px;
  text-align: center;
  padding: 35px 50px 35px;
  color: ${(p) => p.theme.colors.secondary.blue};
`;

interface SubscribersElementProps {
  value: number;
  date: string;
}

const Subscribers = (props: any) => {
  const nowDate = DateTime.now();

  const checkDaySubscribers = props.data.subscribers.some((el: any) => {
    return DateTime.fromISO(el.date).hasSame(nowDate, 'day');
  });

  const data = {
    labels: props.data.subscribers
      .map((el: SubscribersElementProps) => {
        let date = DateTime.fromISO(el.date);
        return `${Info.months('long', { locale: 'en-GB' })[date.month - 1]} ${
          date.year
        }`;
      })
      .reverse(),
    datasets: [
      {
        label: 'Number of Subscribers',
        data: props.data.subscribers
          .map((el: SubscribersElementProps) => {
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

  return (
    <SubscribersContainer>
      <TopBarContainer>
        <GoBack onClick={props.goBack}>
          <GoBackIcon src={chevronLeftSvg} />
        </GoBack>
        <Title>Subscribers</Title>
        <Update>
          {props.loading ? (
            <UpdateIcon src={hourGlassSvg} />
          ) : props.updatedsubscribers === 'true' ? (
            <UpdateIcon
              update={checkDaySubscribers ? 'false' : 'true'}
              isloading={props.loading ? 'true' : 'false'}
              onClick={() => {
                !checkDaySubscribers &&
                  !props.loading &&
                  props.fetchsubscribers();
              }}
              src={checkDaySubscribers ? checkSvg : cycleSvg}
            />
          ) : (
            <UpdateIcon src={warningSvg} />
          )}
        </Update>
      </TopBarContainer>
      {data.labels.length > 1 ? (
        <ChartContainer>
          <Line type="line" data={data} options={options} />
        </ChartContainer>
      ) : (
        <NewTalent
          initial={{ y: '5px' }}
          animate={{ y: '0px' }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          This Talent has not enough history yet, come back next month 🙂
        </NewTalent>
      )}
    </SubscribersContainer>
  );
};

export default Subscribers;
