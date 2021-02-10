import React from 'react';
import styled from 'styled-components';

const Burger = ({ open, setOpen, burgerRef }: any) => {
  return (
    <StyledBurger open={open} onClick={setOpen} ref={burgerRef}>
      <span>&nbsp;</span>
    </StyledBurger>
  );
};

const StyledBurger = styled.button<{ open: boolean }>`
  left: 2rem;

  @media (min-width: ${(p) => p.theme.screen.largest}) {
    display: none;
  }
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 1000;
  margin-left: 2em;
  height: 2.7rem;
  width: 2.7rem;
  border-radius: 50%;
  background-color: ${(p) => p.open && `${p.theme.colors.grey.light2}`};

  z-index: 2000;
  text-align: center;
  cursor: pointer;

  &:focus {
    outline: none;
  }

  span {
    position: relative;
    margin-top: 1.3rem;
    margin-left: 0.5rem;

    &,
    &::before,
    &::after {
      width: 2.7rem;
      height: 1px;
      background-color: ${(p) => p.theme.colors.grey.dark3};
      display: inline-block;
    }

    &::before,
    &::after {
      content: '';
      position: absolute;
      left: 0;
      transition: all 0s;
      /* transition-delay: 0.4s; */
    }
  }

  &:hover span::before {
    /* top: ${({ open }) => (!open ? '-1rem' : '-0.8rem')}; */
    ${({ open }) => !open && { top: '-0.9rem' }}
  }

  &:hover span::after {
    /* top: ${({ open }) => (!open ? '1rem' : '0.8rem')}; */
    ${({ open }) => !open && { top: '0.9rem' }}
  }
  & span {
    background-color: ${(p) =>
      p.open ? 'transparent' : `${p.theme.colors.grey.dark3}`};
  }

  & span::before {
    top: ${({ open }) => (open ? '0' : '-0.7rem')};
    transform: ${({ open }) => (open ? 'rotate(45deg)' : 'rotate(0)')};
    background-color: ${(p) =>
      !p.open ? `${p.theme.colors.grey.dark3}` : 'white'};
    width: ${({ open }) => (open ? `1.8rem` : '2.7rem')};
  }
  & span::after {
    top: ${({ open }) => (open ? '0' : '0.7rem')};
    transform: ${({ open }) => (open ? 'rotate(-45deg)' : 'rotate(0)')};
    background-color: ${(p) =>
      !p.open ? `${p.theme.colors.grey.dark3}` : 'white'};
    width: ${({ open }) => (open ? `1.8rem` : '2.7rem')};
  }

  @media only screen and (max-width: ${(p) => p.theme.screen.smallest}) {
    margin-right: 1.2rem;
  }
`;

export default Burger;
