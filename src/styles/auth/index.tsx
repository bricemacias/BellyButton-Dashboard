import styled from 'styled-components';

export const Test = styled.div`
  display: flex;
  flex-direction: column;
  width: 500px;
  @media only screen and (max-width: ${(p) => p.theme.screen.smallest}) {
    height: 100vh;
  }
`;

export const Container = styled.div`
  display: flex;
  background-color: white;

  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 500px;
  margin: 12rem auto;

  border-width: 0;
  border-bottom-width: 0rem;
  border-radius: 70px;
  border-style: solid;
  /* border-image: linear-gradient(to right, #eb2f64, #ff4081); */
  border-image-slice: 1;
  box-shadow: 0rem 1rem 3rem rgba(149, 170, 187, 0.3);
  z-index: 100;

  @media only screen and (max-width: ${(p) => p.theme.screen.smallest}) {
    box-shadow: none;
    border: none;
    margin: '0 auto';
  }
`;

export const Title = styled.h2`
  color: ${(p) => p.theme.colors.secondary.main};
  font-weight: 500;
  font-size: 3rem;
  letter-spacing: 0.5rem;
  margin: 1rem auto 1rem;
`;

export const Subtitle = styled.h3`
  color: ${(p) => p.theme.colors.grey.dark3};
  font-weight: 500;
  letter-spacing: 0.1rem;
  font-size: 1.2rem;
  margin: 0rem auto 2rem;
  text-align: center;
`;
