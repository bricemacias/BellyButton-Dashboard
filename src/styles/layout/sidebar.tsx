import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const LogoTitle = styled.h1`
  font-weight: inherit;
  letter-spacing: 0.5rem;
  display: inline-block;
  transition: all 0.5s;

  color: ${(p) => p.theme.colors.primary.main};
  margin: 1.5rem auto 0;
  font-size: 2.8rem;
  font-weight: 300;
  letter-spacing: 0.7rem;

  /* @media only screen and (max-width: ${(p) => p.theme.screen.medium716}) {
    font-size: 1.2rem;
    margin: 2.8rem 0.5rem 2.8rem 1rem;
  } */
`;

export const SideNav = styled.ul`
  font-size: 1.4rem;
  list-style: none;
  margin-top: 3.5rem;
  margin-bottom: 2rem;

  /* @media only screen and (max-width: ${(p) => p.theme.screen.medium716}) {
    margin-top: 0;
  } */
`;

export const SideNavItem = styled.li`
  position: relative;

  &:not(:last-child) {
    margin-bottom: 0.5rem;
  }
`;

export const SideNavLink = styled(NavLink)`
  color: ${(p) => p.theme.colors.grey.light1};
  text-decoration: none;
  text-transform: uppercase;
  padding: 1.5rem 3rem;
  position: relative;
  z-index: 10;

  display: flex;
  align-items: center;

  &:hover {
    color: white;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: linear-gradient(90deg, #432d9c, #2c34ac 49%, #2736af);
    transform: scaleY(0);
    transition: transform 0.3s, width 0.1s cubic-bezier(1, 0, 0, 1) 0.2s,
      background-color 0.3s;
  }

  &:hover::before {
    transform: scaleY(1);
    width: 100%;
  }

  &:active::before {
    background: linear-gradient(90deg, #432d9c, #2c34ac 49%, #2736af);
    width: 100%;
  }

  &.active::before {
    transform: scaleY(1);
    width: 100%;
  }
`;

export const SideNavIcon = styled.svg`
  z-index: 100;
  width: 1.75rem;
  height: 1.75rem;
  margin-right: 2rem;
  fill: currentColor;

  /* @media only screen and (max-width: ${(p) => p.theme.screen.medium716}) {
    margin-right: 0.1rem;
    margin-left: 0;
  } */
`;

export const SideNavText = styled.span`
  z-index: 100;
  @media only screen and (max-width: ${(p) => p.theme.screen.largest}) {
    font-size: 100%;
  }
  @media only screen and (max-width: ${(p) => p.theme.screen.medium}) {
    font-size: 95%;
  }
  @media only screen and (max-width: ${(p) => p.theme.screen.medium800}) {
    font-size: 85%;
  }
  /* @media only screen and (max-width: ${(p) => p.theme.screen.medium716}) {
    display: none;
  } */
`;
