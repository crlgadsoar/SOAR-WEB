import React from 'react';
import { useNavigate } from 'react-router-dom';
const NoInternet = () => {
  const navigate = useNavigate();
  React.useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
    return () => {};
  }, [navigate]);

  return (
    <>
      Looks Like your network is Lost &nbsp;&nbsp;
      <a href='/main/home'>Home</a>
    </>
  );
};

export default NoInternet;
