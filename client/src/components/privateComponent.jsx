import React from 'react';
import useAuthStatus from '../hooks/useAuthStatus';
import Loading from '../components/Loading';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateComponent = () => {

  const { loggedIn, checkUser, verified } = useAuthStatus();

  if (checkUser) {
    return <Loading />;
  }

  // not logged in
  if (!loggedIn) {
    return <Navigate to="/login" />;
  }

  // not verified
  if (!verified) {
    return <Navigate to="/verify-otp" />;
  }

  // verified user
  return <Outlet />;
};

export default PrivateComponent;