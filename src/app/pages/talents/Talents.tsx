import React, { useEffect, useState } from 'react';
import { Opacity } from '../../../animations';
import styled from 'styled-components';

import { useSelector } from 'react-redux';
import { RootState } from '../../../logic/store';

import { ReactSVG } from 'react-svg';
import plusSvg from '../../../assets/SVG/plus.svg';
import listSvg from '../../../assets/SVG/list.svg';

import TalentCard from './components/TalentCard';
import AddTalent from './components/AddTalent';

import ModalComponent from '../../../components/Modal';

interface ContainerProps {
  height: number;
  width: number;
  windowSize: { height: number; width: number };
}

const Container = styled.div<ContainerProps>`
  transition: all 0.4s;
  /* position: relative; */
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
  color: ${(p) => p.theme.colors.grey.light4};
  /* position: -webkit-sticky;
  position: sticky;
  top: ${(p) => (p.top ? `${p.top}px` : '10px')};
  margin-left: ${(p) => `${p.width - 75}px`}; */
  background-color: white;
  box-shadow: 0rem 1rem 3rem rgba(189, 189, 189, 0.3);
  ${(p) => !p.open && 'box-shadow: 0rem 0rem 0rem rgba(189, 189, 189, 0.3)'};
  /* box-shadow: ${(p) =>
    p.open
      ? '0rem 1rem 3rem rgba(189, 189, 189, 0.3)'
      : '0rem 0rem 3rem rgba(189, 189, 189, 0.3)'}; */
  cursor: pointer;

  position: absolute;
  top: ${(p) => (p.top ? `${p.top}px` : '30px')};
  right: 20px;

  display: flex;
  justify-content: center;
  align-items: center;

  @media (min-width: ${(p) => p.theme.screen.largest}) {
    right: 40px;
  }

  &:hover {
    height: 45px;
    width: 45px;
    color: ${(p) => p.theme.colors.secondary.main};
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
  const [talentsCopy, setTalentsCopy] = useState([]);
  const [talentsAlphabetical, setTalentsAlphabetical] = useState([]);
  const [sortType, setSortType] = useState(false);
  const [inverseSortDirection, setInverseSortDirection] = useState(false);
  const [openAddTalentModal, setOpenAddTalentModal] = useState<boolean>(false);
  const [openButtonMenu, setOpenButtonMenu] = useState(false);

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

  useEffect(() => {
    let aTalentsCopy = [...talents];
    let sortedTalents = aTalentsCopy.sort((a, b) =>
      //@ts-ignore
      a.name > b.name ? 1 : b.name > a.name ? -1 : 0
    );
    let inversedTalents = [
      ...aTalentsCopy.sort((a, b) =>
        //@ts-ignore
        a.name > b.name ? 1 : b.name > a.name ? -1 : 0
      ),
    ].reverse();
    if (inverseSortDirection === false) {
      setTalentsAlphabetical(sortedTalents);
    } else {
      setTalentsAlphabetical(inversedTalents);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [talents, inverseSortDirection]);

  useEffect(() => {
    let aTalentsCopy = [...talents];
    let invertedTalents = [...aTalentsCopy].reverse();
    if (inverseSortDirection === false) {
      setTalentsCopy(aTalentsCopy);
    } else {
      setTalentsCopy(invertedTalents);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [talents, inverseSortDirection]);

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
          top={openButtonMenu ? 80 : null}
          onClick={() => setOpenAddTalentModal(!openAddTalentModal)}
          open={openButtonMenu}
        >
          <div>New</div>
        </AddTalentButton>
        <AddTalentButton
          width={
            windowSize.width < 1200
              ? windowSize.width
              : mainviewDimensions.width
          }
          top={openButtonMenu ? 130 : null}
          onClick={() => setSortType(!sortType)}
          open={openButtonMenu}
        >
          {sortType === false ? <div>Date</div> : <div>ABC</div>}
        </AddTalentButton>
        <AddTalentButton
          width={
            windowSize.width < 1200
              ? windowSize.width
              : mainviewDimensions.width
          }
          top={openButtonMenu ? 180 : null}
          onClick={() => setInverseSortDirection(!inverseSortDirection)}
          open={openButtonMenu}
        >
          {inverseSortDirection === false ? <div>Up</div> : <div>Down</div>}
        </AddTalentButton>
        <AddTalentButton
          width={
            windowSize.width < 1200
              ? windowSize.width
              : mainviewDimensions.width
          }
          onClick={() => setOpenButtonMenu(!openButtonMenu)}
          open={true}
        >
          <PlusIcon src={openButtonMenu ? listSvg : plusSvg} />
        </AddTalentButton>
        {search.length > 0
          ? searchTalents.map((el, i) => {
              return <TalentCard key={el['_id']} data={el} number={i} />;
            })
          : sortType === false
          ? talentsCopy.map((el, i) => {
              return <TalentCard key={el['_id']} data={el} number={i} />;
            })
          : talentsAlphabetical.map((el, i) => {
              return <TalentCard key={el['_id']} data={el} number={i} />;
            })}
        <ModalComponent
          openModal={openAddTalentModal}
          setOpenModal={setOpenAddTalentModal}
        >
          <AddTalent />
        </ModalComponent>
      </Container>
    </Opacity>
  );
};

export default Talents;
