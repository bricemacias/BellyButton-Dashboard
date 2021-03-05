import React from 'react';
import styled from 'styled-components';
import questionSvg from '../../../assets/SVG/question.svg';
import cogSvg from '../../../assets/SVG/cog.svg';

import {
  Sidebar as SidebarLayout,
  SideNav,
  SideNavItem,
  SideNavLink,
  SideNavIcon,
  SideNavText,
} from '../../../styles/layout';

import BellyButtonLogo from '../../../assets/bb.png';

import { SidebarContent } from './SidebarContent';

const BottomIcons = styled.div<{ width: number }>`
  ${(p) => p.width <= parseInt('1200px', 10) && { marginBottom: '5rem' }}
`;

const Logo = styled.div`
  height: 40px;
  margin-top: 35px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.div`
  font-size: 19px;
  letter-spacing: 1px;
  color: ${(p) => p.theme.colors.grey.light1};
  margin-top: 3px;
`;

const Image = styled.img`
  height: 40px;
`;

export const Sidebar = ({ open, sideBarRef, width }: any) => {
  return (
    <>
      <SidebarLayout open={open} ref={sideBarRef}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Logo>
            <Image src={BellyButtonLogo} />
            <Title>Bellybutton</Title>
          </Logo>
          <SidebarContent />
        </div>

        <BottomIcons width={width}>
          <SideNav>
            <SideNavItem>
              <SideNavLink exact to="/HelpCenter">
                <SideNavIcon src={questionSvg} />
                <SideNavText>Help Center</SideNavText>
              </SideNavLink>
            </SideNavItem>
            <SideNavItem>
              <SideNavLink exact to="/Settings">
                <SideNavIcon src={cogSvg} />
                <SideNavText>Settings</SideNavText>
              </SideNavLink>
            </SideNavItem>
          </SideNav>
        </BottomIcons>
      </SidebarLayout>
    </>
  );
};
