import React from 'react';
import styled from 'styled-components';

import BellyButtonLogo from '../assets/bblogo.png';

import { useWindowSize } from '../hooks/useWindowSize';

import { UpAndDown } from '../animations';

const Container = styled.div<{ height: number | undefined }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: center;
  justify-content: center;
  background-color: white;
  align-self: center;
  justify-self: center;
  height: ${(p) => `${p.height}px`};
`;

const Logo = styled.div`
  height: 70px;
  margin-bottom: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img`
  height: 70px;
`;

const LoadingMessage = styled.p`
  margin-top: 10px;
  font-size: 26px;
  text-align: center;
  color: ${(p) => p.theme.colors.secondary.main};
`;

const Loading = () => {
  const windowSize = useWindowSize();
  console.log(windowSize.height);

  return (
    <Container height={windowSize.height}>
      <Logo>
        <UpAndDown>
          <Image src={BellyButtonLogo} />
        </UpAndDown>
        <LoadingMessage>Loading...</LoadingMessage>
      </Logo>
    </Container>
  );
};

export default Loading;
