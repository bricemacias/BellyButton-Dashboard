import React from 'react';
import { Opacity } from '../../../animations';
import styled from 'styled-components';

import { useSelector } from 'react-redux';
import { RootState } from '../../../logic/store';

import TalentCard from './components/TalentCard';

interface ContainerProps {
  height: number;
  width: number;
  windowSize: { height: number; width: number };
}

const Container = styled.div<ContainerProps>`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  flex: 1;
  background-color: ${(p) => p.theme.colors.lightgrey1};
  height: ${(p) => `${p.height}px`};

  @media (min-width: ${(p) => p.theme.screen.largest}) {
    height: 539px;
    width: 1016px;
  }

  @media (max-width: ${(p) => p.theme.screen.small}) {
    justify-content: center;
  }

  overflow-y: scroll;
`;

interface TalentsProps {
  mainviewDimensions: { height: number; width: number };
  windowSize: { height: number; width: number };
}

const Talents = ({ mainviewDimensions, windowSize }: TalentsProps) => {
  const talents = useSelector((state: RootState) => state.talents.data);

  return (
    <Opacity duration={1}>
      <Container
        height={mainviewDimensions.height}
        width={mainviewDimensions.width}
        windowSize={windowSize}
      >
        {' '}
        {talents.map((el) => {
          return <TalentCard key={el['_id']} data={el} />;
        })}
      </Container>
    </Opacity>
  );
};

export default Talents;
