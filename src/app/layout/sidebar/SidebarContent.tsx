import React from 'react';
import starSVG from '../../../assets/SVG/star.svg';
import listSVG from '../../../assets/SVG/list.svg';
import shieldSVG from '../../../assets/SVG/shield.svg';
import badgeSVG from '../../../assets/SVG/badge.svg';
import barGraphSVG from '../../../assets/SVG/bar-graph.svg';

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
            <SideNavIcon src={starSVG} />
            <SideNavText>Talents</SideNavText>
          </SideNavLink>
        </SideNavItem>
        <SideNavItem>
          <SideNavLink exact to="/Operations">
            <SideNavIcon src={listSVG} />
            <SideNavText>Operations</SideNavText>
          </SideNavLink>
        </SideNavItem>
        <SideNavItem>
          <SideNavLink exact to="/Potential">
            <SideNavIcon src={shieldSVG} />
            <SideNavText>Potential</SideNavText>
          </SideNavLink>
        </SideNavItem>
        <SideNavItem>
          <SideNavLink exact to="/Prospects">
            <SideNavIcon src={badgeSVG} />
            <SideNavText>Prospects</SideNavText>
          </SideNavLink>
        </SideNavItem>
        <SideNavItem>
          <SideNavLink exact to="/Analytics">
            <SideNavIcon src={barGraphSVG} />
            <SideNavText>Analytics</SideNavText>
          </SideNavLink>
        </SideNavItem>
      </SideNav>
    </>
  );
};
