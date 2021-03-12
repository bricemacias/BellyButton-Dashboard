// TODO : REFACTOR -> Components for each page, especially for Talent (TalentCard, Subscribers, V30), auth in app, dashboard out, routes in app
// TODO : Change all SVG to ReactSVG

import React, { useState, useEffect, useRef } from 'react';

import { Container, Content, MainContent, MainView } from '../../styles/layout';

import { ALL_TALENTS } from '../../graphql/app/index';
import talentsReducer from '../../logic/app/talentsReducer';

import { useDispatch } from 'react-redux';
import { useQuery } from '@apollo/client';

import Header from '../layout/header/Header';
import { Sidebar } from '../layout/sidebar/Sidebar';

import Welcome from '../pages/Welcome';

import AppRoutes from '../../routes/AppRoutes';

import { OpacityScaleMain } from '../../animations';

import { useWindowSize } from '../../hooks/useWindowSize';
import { useClickOnElement } from '../../hooks/useClickOnElement';

const Dashboard = () => {
  const [welcome, setWelcome] = useState(true);
  const [open, setOpenState] = useState(false);
  const [mainviewDimensions, setMainviewDimensions] = useState({});

  const windowSize = useWindowSize();

  const sideBarRef = useRef('');

  const mainviewRef = useRef(null);

  const dispatch = useDispatch();
  const updateTalents = talentsReducer.updateTalents;
  const { data, loading, error } = useQuery(ALL_TALENTS);

  useEffect(() => {
    if (data && data.allTalents && data.allTalents.data) {
      dispatch(updateTalents(data.allTalents.data));
    }
    return () => {
      dispatch(updateTalents([]));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, error]);

  const setOpen = () => {
    setOpenState(!open);
  };

  useEffect(() => {
    setTimeout(function () {
      setWelcome(false);
    }, 2500);
  }, []);

  useClickOnElement(
    sideBarRef,
    () => {
      if (
        windowSize.width &&
        windowSize.width <= parseInt('716px', 10) &&
        open
      ) {
        setOpen();
      }
    },
    true
  );

  useEffect(() => {
    if (mainviewRef.current) {
      //@ts-ignore
      setMainviewDimensions({
        //@ts-ignore
        height: mainviewRef.current.offsetHeight,
        //@ts-ignore
        width: mainviewRef.current.offsetWidth,
      });
    }
  }, [windowSize.width]);

  return (
    <OpacityScaleMain>
      <Container>
        <Sidebar open={open} sideBarRef={sideBarRef} width={windowSize.width} />
        <Content>
          <Header open={open} setOpen={setOpen} />
          <MainContent>
            <MainView ref={mainviewRef}>
              {welcome ? (
                <Welcome />
              ) : (
                <AppRoutes
                  mainviewDimensions={mainviewDimensions}
                  windowSize={windowSize}
                />
              )}
            </MainView>
          </MainContent>
        </Content>
      </Container>
    </OpacityScaleMain>
  );
};

export default Dashboard;
