import React, { useState, useRef } from 'react';
import { useClickOnElement } from '../../../hooks/useClickOnElement';

import { RouteComponentProps } from 'react-router-dom';

import styled from 'styled-components';

import { ReactSVG } from 'react-svg';
import logoutSvg from '../../../assets/SVG/log-out.svg';
import user from '../../../assets/user-6.jpg';
import bellSvg from '../../../assets/SVG/bell.svg';

import { withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import authReducer from '../../../logic/auth/authReducer';

import { useMutation } from '@apollo/client';

import { LOGOUT } from '../../../graphql/auth';

import { useToasts } from 'react-toast-notifications';

import {
  UserNav,
  UserNavIconBox,
  UserNavIcon,
  UserNavNotification,
  UserNavUser,
  UserNavUserPhoto,
  UserNavUserName,
} from '../../../styles/layout/header';

import { Header as HeaderLayout } from '../../../styles/layout';

import Search from '../../../components/Search';
import Burger from '../../../components/Burger';
import { RootState } from '../../../logic/store';
import { motion } from 'framer-motion';

interface HeaderProps extends RouteComponentProps {
  setOpen: () => void;
  open: boolean;
}

const Dropdown = styled(motion.div)<any>`
  position: absolute;
  z-index: 10;
  top: 58px;
  max-height: 350px;
  width: ${(p) => (p.size ? `${p.size}px` : '200px')};
  background-color: #f7f7f7;
  color: ${(p) => p.theme.colors.secondary.main};
  border: 1px solid ${(p) => p.theme.colors.secondary.main};
  border-radius: 20px;
  padding: 1rem;
  overflow-x: hidden;
  overflow-y: scroll;
  box-shadow: 0rem 1rem 3rem rgba(189, 189, 189, 0.2);
`;

const Icon = styled(ReactSVG)`
  width: 2rem;
  height: 2rem;
  fill: ${(p) => p.theme.colors.secondary.main};
  margin-right: 5px;
  transition: all 0.4s;
`;

const ReadIcon = styled.div`
  transition: all 0.4s;
  position: absolute;
  top: 0;
  left: 0;
  height: 7px;
  width: 7px;
  border-radius: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(p) => p.theme.colors.secondary.blue};
`;

const Title = styled.div``;

const DropdownItem = styled.div`
  position: relative;
  min-height: 50px;
  display: flex;
  align-items: center;
  border-radius: 15px;
  transition: all 0.4s;
  padding: 0.7rem;
  /* padding-left: 1.4rem; */
  font-size: 1.4rem;
  font-weight: 700;

  &:hover {
    background-color: ${(p) => p.theme.colors.secondary.main};
    color: #f7f7f7;
  }

  &:hover ${Icon} {
    fill: #f7f7f7;
  }

  &:hover ${ReadIcon} {
    background-color: ${(p) => p.theme.colors.tertiary.main};
    height: 8px;
    width: 8px;
  }
`;

const Header = ({ history, setOpen, open }: HeaderProps) => {
  const updateToken = authReducer.updateToken;
  const notifications = useSelector(
    (state: RootState) => state.notifications.data
  );
  const dispatch = useDispatch();
  const [logoutUser, { loading, error }] = useMutation(LOGOUT);

  const { addToast } = useToasts();

  const [openNotifications, setOpenNotifications] = useState(false);
  const [openUserDropdown, setOpenUserDropdown] = useState(false);

  // SIGNOUT FUNCTION TO PUT IN DROPDOWN, NOT HERE !
  const handleSignOut = async () => {
    if (!loading && !error) {
      logoutUser();
      localStorage.removeItem('bellybuttonToken');
      dispatch(updateToken(''));
      history.push('/');
    } else if (error && error.message) {
      addToast(error.message, { appearance: 'error', autoDismiss: true });
    }
  };

  const notificationsRef = useRef(null);
  const userDropdownRef = useRef(null);

  useClickOnElement(
    notificationsRef,
    () => {
      if (openNotifications === true) {
        setOpenNotifications(false);
      }
    },
    false
  );

  useClickOnElement(
    userDropdownRef,
    () => {
      if (openUserDropdown === true) {
        setOpenUserDropdown(false);
      }
    },
    false
  );

  return (
    <>
      <HeaderLayout>
        <Burger open={open} setOpen={setOpen} />
        <Search />
        <UserNav>
          <UserNavIconBox
            ref={notificationsRef}
            onClick={() => setOpenNotifications(!openNotifications)}
          >
            <UserNavIcon src={bellSvg} />
            {notifications.length > 0 && (
              <UserNavNotification>{notifications.length}</UserNavNotification>
            )}
            {openNotifications && (
              <Dropdown
                initial={{ opacity: 0.8, scale: 0.97, x: -58 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {notifications.map((el, i) => (
                  <DropdownItem
                    key={`item${i}`}
                    onClick={() =>
                      el.type === 'V30Update' && console.log('hola')
                    }
                  >
                    {!el.read && <ReadIcon key={`readicon${i}`} />}
                    <Title key={`Title${i}`}>{el.title}</Title>
                  </DropdownItem>
                ))}
              </Dropdown>
            )}
          </UserNavIconBox>
          {/* <UserNavIconBox>
            <UserNavIcon src={bubbleSvg}>
            <UserNavNotification>13</UserNavNotification>
          </UserNavIconBox> */}
          <UserNavUser
            onClick={() => setOpenUserDropdown(!openUserDropdown)}
            ref={userDropdownRef}
          >
            <UserNavUserPhoto src={user} alt="User photo" />
            <UserNavUserName>Sarah</UserNavUserName>
            {openUserDropdown && (
              <Dropdown
                size={120}
                initial={{ opacity: 0.8, scale: 0.97, x: -32 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <DropdownItem onClick={() => handleSignOut()}>
                  <Icon src={logoutSvg} />
                  Logout
                </DropdownItem>
              </Dropdown>
            )}
          </UserNavUser>
        </UserNav>
      </HeaderLayout>
    </>
  );
};

export default withRouter(Header);
