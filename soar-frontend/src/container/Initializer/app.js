import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { fetchInitConfigData } from 'appRedux/reducers/InitConfig';

import { App } from "antd";
/**
 * Initializes the app by fetching the initial configuration data and handling any errors.
 */
const AppInitializer = () => {
  const dispatch = useDispatch();
  const { message } = App.useApp();
  const navigate = useNavigate();
  const initialization = React.useCallback(async () => {
    //console.devLog('called on AppInitializer');
    // try {
    //   await dispatch(fetchInitConfigData()).unwrap();
    // } catch (configError) {
    //   console.devLog('initConfigError ', configError);
    //   message.error({
    //     content: configError.message,
    //     key: 'UI',
    //     duration: 2,
    //   });
    //   navigate('/no_internet');
    // }
  }, [dispatch, message, navigate]);
  React.useEffect(() => {
    //ONE TIME INITIALIZATION POINT OF APP

    //INIT CONFIG

    initialization();

    return () => {};
  }, [initialization]);

  return <></>;
};

export default AppInitializer;
// dispatch(reAuth(token))
//   .unwrap()
//   .then((resp) => {
//     // handle successful sign-in here
//     //Fetch Init Data on Successful Sign In
//     dispatch(fetchInitConfigData())
//       .unwrap()
//       .then((resp) => {})
//       .catch((configError) => {
//         // handle config initialization error here
//         console.devLog('configError ', configError);
//         message.error({
//           content: configError.message,
//           key: 'UI',
//           duration: 2,
//         });
//       });
//   })
//   .catch((configError) => {
//     // handle config initialization error here
//     console.devLog('configError ', configError);
//     message.error({
//       content: configError.message || 'RE-AUTH FAILED',
//       key: 'UI',
//       duration: 2,
//     });
//     navigate('/no_internet');
//   });

// dispatch(reAuth(token))
//   .unwrap()
//   .then((resp) => {
//     // handle successful sign-in here
//     //Fetch Init Data on Successful Sign In
//     dispatch(fetchInitConfigData())
//       .unwrap()
//       .then((resp) => {})
//       .catch((configError) => {
//         // handle config initialization error here
//         console.devLog('configError ', configError);
//         message.error({
//           content: configError.message,
//           key: 'UI',
//           duration: 2,
//         });
//       });
//     dispatch(fetchThemeConfigData())
//       .unwrap()
//       .then((configData) => {})
//       .catch((configError) => {});
//   })
//   .catch((reAuthError) => {
//     // handle sign-in error here
//     console.devLog('signInError ', reAuthError);
//     message.error({
//       content: reAuthError.message,
//       key: 'UI',
//       duration: 2,
//     });
//     navigate('/no_internet');
//     //window.location.href = '/no_internet';
//   });
