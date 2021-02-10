import React from 'react';

import user from '../../../assets/user-6.jpg';
import icons from '../../../assets/sprite.svg';

import { withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import authReducer from '../../../logic/auth/authReducer';

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

const Header = ({ history, setOpen, open }: any) => {
  const updateToken = authReducer.updateToken;
  const dispatch = useDispatch();

  // SIGNOUT FUNCTION TO PUT IN DROPDOWN, NOT HERE !
  const handleSignOut = async () => {
    localStorage.removeItem('bellybuttonToken');
    dispatch(updateToken(''));
    history.push('/');
  };

  return (
    <>
      <HeaderLayout>
        <Burger open={open} setOpen={setOpen} />
        <Search />
        <UserNav>
          <UserNavIconBox>
            <UserNavIcon>
              <use xlinkHref={`${icons}#icon-bell`} />
            </UserNavIcon>
            <UserNavNotification>7</UserNavNotification>
          </UserNavIconBox>
          <UserNavIconBox>
            <UserNavIcon>
              <use xlinkHref={`${icons}#icon-bubbles2`} />
            </UserNavIcon>
            <UserNavNotification>13</UserNavNotification>
          </UserNavIconBox>
          <UserNavUser onClick={handleSignOut}>
            <UserNavUserPhoto src={user} alt="User photo" />
            <UserNavUserName>Sarah</UserNavUserName>
          </UserNavUser>
        </UserNav>
      </HeaderLayout>
    </>
  );
};

export default withRouter(Header);
