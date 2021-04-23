import React, { useEffect, useState } from 'react';
import { Opacity } from '../../../animations';
import styled from 'styled-components';

import { useSelector } from 'react-redux';
import { RootState } from '../../../logic/store';

import { ReactSVG } from 'react-svg';
import plusSvg from '../../../assets/SVG/plus.svg';

import TalentCard from './components/TalentCard';

interface ContainerProps {
  height: number;
  width: number;
  windowSize: { height: number; width: number };
}

const Container = styled.div<ContainerProps>`
  position: relative;
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

const PlusIcon = styled(ReactSVG)`
  transition: all 0.8s;
  fill: ${(p) => p.theme.colors.grey.light4};
  width: 25px;
  height: 25px;
`;

const AddTalentButton = styled.div<any>`
  transition: all 0.5s;
  height: 40px;
  width: 40px;
  border-radius: 50px;
  position: -webkit-sticky;
  position: sticky;
  top: 20px;
  margin-left: ${(p) => `${p.width - 75}px`};
  background-color: white;
  box-shadow: 0rem 1rem 3rem rgba(189, 189, 189, 0.3);
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    height: 45px;
    width: 45px;
  }

  &:hover ${PlusIcon} {
    fill: ${(p) => p.theme.colors.secondary.main};
  }
`;

interface TalentsProps {
  mainviewDimensions: { height: number; width: number };
  windowSize: { height: number; width: number };
}

const Talents = ({ mainviewDimensions, windowSize }: TalentsProps) => {
  const talents = useSelector((state: RootState) => state.talents.data);
  const [searchTalents, setSearchTalents] = useState([]);

  const search = useSelector((state: RootState) => state.search.data);

  useEffect(() => {
    if (search.length > 0) {
      setSearchTalents(
        talents.filter((el) => {
          let name: String = el['name'];
          if (name.toLowerCase().includes(search.toLowerCase())) {
            return true;
          }
          return false;
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  return (
    <Opacity duration={1}>
      <Container
        height={mainviewDimensions.height}
        width={mainviewDimensions.width}
        windowSize={windowSize}
      >
        <AddTalentButton
          width={
            windowSize.width < 1200
              ? windowSize.width
              : mainviewDimensions.width
          }
        >
          <PlusIcon src={plusSvg} />
        </AddTalentButton>
        {search.length > 0
          ? searchTalents.map((el, i) => {
              return <TalentCard key={el['_id']} data={el} number={i} />;
            })
          : talents.map((el, i) => {
              return <TalentCard key={el['_id']} data={el} number={i} />;
            })}
      </Container>
    </Opacity>
  );
};

export default Talents;
