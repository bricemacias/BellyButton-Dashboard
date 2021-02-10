import styled from 'styled-components';

export const UserNav = styled.nav`
  align-self: stretch;

  display: flex;
  align-items: center;

  & > * {
    padding: 0 2rem;
    cursor: pointer;
    height: 100%;
    display: flex;
    align-items: center;
  }

  & > *:hover {
    background-color: ${(p) => p.theme.colors.grey.light2};
  }

  @media only screen and (max-width: ${(p) => p.theme.screen.smallest}) {
    order: 1;
  }
`;

export const UserNavIconBox = styled.div`
  position: relative;

  &:hover {
    fill: ${(p) => p.theme.colors.grey.light1};
  }

  @media only screen and (max-width: ${(p) => p.theme.screen.smallest}) {
    display: none;
  }
`;

export const UserNavIcon = styled.svg`
  height: 2.25rem;
  width: 2.25rem;
  transition: all 0.5s;
  fill: ${(p) => p.theme.colors.grey.dark2};

  &:hover {
    fill: ${(p) => p.theme.colors.blue.dark};
  }
`;

export const UserNavNotification = styled.span`
  font-size: 0.8rem;
  height: 1.75rem;
  width: 1.75rem;
  border-radius: 50%;
  background-color: ${(p) => p.theme.colors.pink.main};
  color: #fff;
  position: absolute;
  top: 1.5rem;
  right: 1.1rem;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const UserNavUser = styled.div`
  @media only screen and (max-width: ${(p) => p.theme.screen.smallest}) {
    order: 1;
  }
`;

export const UserNavUserPhoto = styled.img`
  height: 3.75rem;
  border-radius: 50%;
  margin-right: 1rem;
`;

export const UserNavUserName = styled.span`
  transition: all 0.5s;

  &:hover {
    color: ${(p) => p.theme.colors.blue.dark};
  }

  @media only screen and (max-width: ${(p) => p.theme.screen.smallest}) {
    display: none;
  }
`;
