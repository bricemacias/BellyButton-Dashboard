import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';

import { useDispatch } from 'react-redux';

import styled from 'styled-components';
import { Container, Title, Subtitle } from '../styles/auth';

import { OpacityScaleMedium } from '../animations';

import { useMutation } from '@apollo/client';

import { LOGIN } from '../graphql/auth';

import authReducer from '../logic/auth/authReducer';

import BellyButtonLogo from '../assets/bblogo.png';

// Styles
const Form = styled.form`
  display: grid;
  font-size: 1.7rem;
  grid-template-rows: repeat(4, 50px);
  grid-template-columns: repeat(2, 1fr);
  grid-row-gap: 50px;
  grid-column-gap: 10px;
  margin: 0 1rem;
`;

const Logo = styled.div`
  height: 70px;
  margin-top: 25px;
`;

const Image = styled.img`
  height: 70px;
`;

const Email = styled.div`
  margin-top: 2rem;
  grid-row: 0/1;
  grid-column: 1/3;
`;

const Password = styled.div`
  grid-row: 2/3;
  grid-column: 1/3;
`;

const SigninButton = styled.div`
  grid-row: 3/4;
  grid-column: 1/3;
  justify-self: center;
`;

const TextField = styled.div`
  width: 100%;
  height: 56px;
  border-radius: 4px;
  position: relative;
  background-color: rgba(243, 243, 243, 0.7);
  transition: 0.3s all;

  &:hover {
    background-color: rgba(255, 255, 255, 0.45);
    box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.05);
  }
`;

const TextFieldInput = styled.input`
  width: 100%;
  height: 56px;
  position: relative;
  padding: 0px 16px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 400;
  line-height: normal;
  background-color: transparent;
  color: #282828;
  outline: none;
  box-shadow: 0px 4px 20px 0px transparent;
  transition: 0.3s background-color ease-in-out, 0.3s box-shadow ease-in-out,
    0.1s padding ease-in-out;
  -webkit-appearance: none;
`;

const Button = styled.button`
  transition: 0.3s;
  margin-top: 15px;
  width: 140px;
  height: 50px;
  border-radius: 50px;
  font-size: 15px;
  font-weight: 400;
  border: none;
  color: white;
  background: ${(p) =>
    p.disabled
      ? 'linear-gradient(90deg, #c1b9ee, #c1b9ee 49%, #c1b9ee)'
      : 'linear-gradient(90deg, #432d9c, #2c34ac 49%, #2736af)'};
  cursor: ${(p) => (p.disabled ? '' : 'pointer')};

  &:hover {
    ${(p) => !p.disabled && 'width: 145px'};
    ${(p) => !p.disabled && 'margin-top: 13px'};
    ${(p) => !p.disabled && 'box-shadow: 0 1rem 2rem #c1b9ee'};
  }
`;

// Component

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginUser, { loading, error }] = useMutation(LOGIN);

  const updateToken = authReducer.updateToken;
  const dispatch = useDispatch();

  const { addToast } = useToasts();

  const clearState = () => {
    setEmail('');
    setPassword('');
  };

  const handleSubmit = (e: any, loginUser: any) => {
    e.preventDefault();
    loginUser({
      variables: {
        email: email,
        password: password,
      },
    }).then(async ({ data }: any) => {
      localStorage.setItem('bellybuttonToken', data.loginUser.token);
      dispatch(updateToken(data.loginUser.token));
      clearState();
    });
  };

  const validateForm = () => {
    const isInvalid = !email || !password;

    return isInvalid;
  };

  useEffect(() => {
    error &&
      error.message &&
      addToast(error.message, { appearance: 'error', autoDismiss: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  return (
    <OpacityScaleMedium>
      <Container>
        <Logo>
          <Image src={BellyButtonLogo} />
        </Logo>
        <Title>Dashboard</Title>
        <Subtitle>Please login to you account</Subtitle>
        <Form>
          <Email>
            <TextField>
              <TextFieldInput
                id="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </TextField>
          </Email>
          <Password>
            <TextField>
              <TextFieldInput
                id="password"
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </TextField>
          </Password>
          <SigninButton>
            <Button
              type="submit"
              onClick={(e) => handleSubmit(e, loginUser)}
              disabled={loading || validateForm()}
            >
              Let's go
            </Button>
          </SigninButton>
        </Form>
      </Container>
    </OpacityScaleMedium>
  );
};

export default withRouter(Login);
