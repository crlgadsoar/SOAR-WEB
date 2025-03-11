import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

/**
 * A higher-order component that restricts access to certain routes based on the authentication status of the user.
 * @returns The child components if the user is authenticated, otherwise redirects to the appropriate route.
 */
const RestrictedRoute = ({ children }) => {
  const authUser = useSelector((state) => state.auth.authUser);
  //const state = useSelector((state) => state);
  //console.devLog('RestrictedRoute redux state is ', authUser);
  let location = useLocation();
  let navigate = useNavigate();
  //console.devLog('RestrictedRoute From Location is ', location);
  // const token = localStorage.getItem('token');
  React.useEffect(() => {
    if (!authUser) {
      navigate('/login', {
        state: { from: location },
        replace: true,
      });
    } else if (location.pathname === '/') {
      navigate('/home', {
        state: { from: location },
        replace: true,
      });
    }
  }, [authUser, location, navigate]);

  return children;
};

export default RestrictedRoute;
