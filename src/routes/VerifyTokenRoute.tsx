import { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';

import { useDispatch } from 'react-redux';

import authReducer from '../logic/auth/authReducer';

import { VERIFY_AUTH } from '../graphql/auth';

import MainApp from '../app/Test';
import RootRoutes from './RootRoutes';

const VerifyTokenRoute = () => {
  const dispatch = useDispatch();
  const updateToken = authReducer.updateToken;
  const [verifyAuth] = useMutation(VERIFY_AUTH);
  const [redirectComponent, setRedirectComponent] = useState(
    <div>Checking Token</div>
  );

  useEffect(() => {
    const handleVerify = async () => {
      try {
        await verifyAuth();
        setRedirectComponent(<MainApp />);
      } catch (error) {
        console.log('error', error);
        localStorage.removeItem('bellybuttonToken');
        dispatch(updateToken(''));
        setRedirectComponent(<RootRoutes />);
      }
    };
    handleVerify();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return redirectComponent;
};

export default VerifyTokenRoute;
