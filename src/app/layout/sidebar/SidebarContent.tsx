import React from 'react';
import icons from '../../../assets/sprite.svg';

import {
  SideNav,
  SideNavItem,
  SideNavLink,
  SideNavIcon,
  SideNavText,
} from '../../../styles/layout';

export const SidebarContent = () => {
  return (
    <>
      <SideNav>
        <SideNavItem>
          <SideNavLink exact to="/">
            <SideNavIcon>
              <use xlinkHref={`${icons}#icon-star`} />
            </SideNavIcon>
            <SideNavText>Talents</SideNavText>
          </SideNavLink>
        </SideNavItem>
        <SideNavItem>
          <SideNavLink exact to="/Operations">
            <SideNavIcon>
              <use xlinkHref={`${icons}#icon-list`} />
            </SideNavIcon>
            <SideNavText>Operations</SideNavText>
          </SideNavLink>
        </SideNavItem>
        <SideNavItem>
          <SideNavLink exact to="/Potential">
            <SideNavIcon>
              <use xlinkHref={`${icons}#icon-shield`} />
            </SideNavIcon>
            <SideNavText>Potential</SideNavText>
          </SideNavLink>
        </SideNavItem>
        <SideNavItem>
          <SideNavLink exact to="/Prospects">
            <SideNavIcon>
              <use xlinkHref={`${icons}#icon-badge`} />
            </SideNavIcon>
            <SideNavText>Prospects</SideNavText>
          </SideNavLink>
        </SideNavItem>
        <SideNavItem>
          <SideNavLink exact to="/Analytics">
            <SideNavIcon>
              <use xlinkHref={`${icons}#icon-bar-graph`} />
            </SideNavIcon>
            <SideNavText>Analitycs</SideNavText>
          </SideNavLink>
        </SideNavItem>
      </SideNav>
    </>
  );
};
