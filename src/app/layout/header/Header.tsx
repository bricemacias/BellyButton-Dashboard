import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import user from '../../../assets/user-6.jpg';
import bellSvg from '../../../assets/SVG/bell.svg';

import { withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
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

interface HeaderProps extends RouteComponentProps {
  setOpen: () => void;
  open: boolean;
}

const Header = ({ history, setOpen, open }: HeaderProps) => {
  const updateToken = authReducer.updateToken;
  const dispatch = useDispatch();
  const [logoutUser, { loading, error }] = useMutation(LOGOUT);

  const { addToast } = useToasts();

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

  return (
    <>
      <HeaderLayout>
        <Burger open={open} setOpen={setOpen} />
        <Search />
        <UserNav>
          <UserNavIconBox>
            <UserNavIcon src={bellSvg} />
            <UserNavNotification>7</UserNavNotification>
          </UserNavIconBox>
          {/* <UserNavIconBox>
            <UserNavIcon src={bubbleSvg}>
            <UserNavNotification>13</UserNavNotification>
          </UserNavIconBox> */}
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
