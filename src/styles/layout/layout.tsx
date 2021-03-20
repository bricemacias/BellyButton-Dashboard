import styled from 'styled-components';

export const Container = styled.div`
  max-width: 120rem;
  margin: 10rem auto;
  background-color: ${(p) => p.theme.colors.grey.light2};
  /* box-shadow: ${(p) => p.theme.shadows.dark}; */
  box-shadow: 0rem 3rem 4rem rgba(149, 170, 187, 0.4);
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  display: flex;

  min-height: 50rem;

  @media only screen and (max-width: ${(p) => p.theme.screen.largest}) {
    margin: 0;
    max-width: 100%;
    width: 100%;
    height: 100vh;
    border-top-right-radius: 0px;
    border-bottom-right-radius: 0px;
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;
  }

  &:not(:last-of-type) {
    margin-bottom: 30rem;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const Header = styled.div`
  font-size: 1.4rem;
  height: 7rem;

  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top-right-radius: 10px;

  @media only screen and (max-width: ${(p) => p.theme.screen.largest}) {
    border-top-right-radius: 0px;
  }

  @media only screen and (max-width: ${(p) => p.theme.screen.smallest}) {
    /* flex-wrap: wrap; */
    height: 10rem;
    align-content: space-between;
    justify-content: center;
  }

  background-color: #fff;
  border-bottom: solid 0.1rem ${(p) => p.theme.colors.grey.light2};
  border-width: 0;
  border-bottom-width: 0.15rem;
  border-style: solid;
  border-image: linear-gradient(
    to right,
    ${(p) => p.theme.colors.secondary.main},
    ${(p) => p.theme.colors.secondary.main},
    ${(p) => p.theme.colors.secondary.main}
  );
  border-image-slice: 1;
  z-index: 100;

  @media only screen and (max-width: ${(p) => p.theme.screen.smallest}) {
    align-content: space-between;
  }
`;

export const Sidebar = styled.nav<{ open: boolean }>`
  background-color: ${(p) => p.theme.colors.tertiary.dark};

  flex: 0 0 18%;

  height: 100%;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0rem 3rem 4rem rgba(149, 170, 187, 0.4);
  /* box-shadow: ${(p) => p.theme.shadows.dark}; */

  transition: margin-left 0.2s ease-in-out;

  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  @media only screen and (max-width: ${(p) => p.theme.screen.largest}) {
    border-top-left-radius: 0px;
    border-bottom-left-radius: 10px;
  }

  @media only screen and (max-width: ${(p) => p.theme.screen.medium716}) {
    flex: 0 0 10%;
    width: 13%;
    margin: 0;
  }

  @media only screen and (max-width: ${(p) => p.theme.screen.small}) {
    flex: 0 0 10%;
    width: 17%;
    margin: 0;
  }

  @media (min-width: ${(p) => p.theme.screen.smallest}) {
    padding-top: 0;
    position: sticky;
    top: 0;
    margin-left: ${(p) => (p.open ? 0 : `-180px`)};
    flex-basis: 180px;
    flex-grow: 0;
    flex-shrink: 0;
    border: 0;
  }

  @media (min-width: ${(p) => p.theme.screen.largest}) {
    margin-left: 0;
  }

  @media (max-width: ${(p) => p.theme.screen.medium716}) {
    margin-left: ${(p) => (p.open ? 0 : `-240px`)};
    position: fixed;
    top: 0;
    left: 0;
    width: 22rem;
  }
`;

export const MainContent = styled.div`
  display: flex;
  flex: 1;
  border-bottom-right-radius: 30px;

  @media only screen and (max-width: ${(p) => p.theme.screen.largest}) {
    border-bottom-right-radius: 0px;
  }
`;

export const MainView = styled.main`
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom-right-radius: 10px;
  flex: 1;

  @media (min-width: ${(p) => p.theme.screen.largest}) {
    height: 539px;
    width: 1016px;
  }
`;
