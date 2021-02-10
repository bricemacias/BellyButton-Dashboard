import React, { useState, useEffect, useRef } from 'react';

import { Container, Content, MainContent, MainView } from '../../styles/layout';

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

  const windowSize = useWindowSize();

  const sideBarRef = useRef('');

  const burgerRef = useRef('');

  const setOpen = () => {
    setOpenState(!open);
  };

  useEffect(() => {
    setTimeout(function () {
      setWelcome(false);
    }, 5000);
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

  return (
    <OpacityScaleMain>
      <Container>
        <Sidebar open={open} sideBarRef={sideBarRef} width={windowSize.width} />
        <Content>
          <Header open={open} setOpen={setOpen} burgerRef={burgerRef} />
          <MainContent>
            <MainView>{welcome ? <Welcome /> : <AppRoutes />}</MainView>
          </MainContent>
        </Content>
      </Container>
    </OpacityScaleMain>
  );
};

export default Dashboard;
