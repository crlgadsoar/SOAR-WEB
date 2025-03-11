import React from 'react';
import { useDispatch } from 'react-redux';
import { reAuth } from 'appRedux/reducers/Auth';
import { changeSocketUrl } from 'util/connection/socket_stomp';
import { App } from 'antd';
import { localUIServerInstance, setUrl } from 'util/connection/axios';
/**
 * Initializes the token for authentication.
 */
const TokenInitializer = () => {
  //TODO REMOVE PIPED CODE
  const token = localStorage.getItem('token') || 'T123';
  console.log('called on TokenInitializer refresh token ', token);
  const dispatch = useDispatch();
  const { message } = App.useApp();
  //const navigate = useNavigate();
  const initialization = React.useCallback(async () => {
    console.log('called on TokenInitializer refresh token', token);
    if (token) {
      try {
        //const resultAction = await dispatch(reAuth(token))
        // const originalPromiseResult = unwrapResult(resultAction)
        await dispatch(reAuth(token)).unwrap();
      } catch (configError) {
        console.devLog('configError ', configError);
        message.error({
          content: configError.message,
          key: 'UI',
          duration: 2,
        });
        localStorage.removeItem('token');

        //navigate('/login');
      }
    }
  }, [dispatch, message]);
  //READ CONFIG FILE FROM BACKEND
  const updateBackendUrl = React.useCallback(async () => {
    //console.log('localUIServerInstance', localUIServerInstance);

    //TODO REMOVE
    setUrl('https://127.0.0.1:8443/');
    changeSocketUrl('wss://127.0.0.1:8443/connect/websocket');
    initialization();
    console.log('localUIServerInstance ', localUIServerInstance);
    //TODO UNCOMMENT

    // localUIServerInstance
    //   .get('/getSysConfig')
    //   .then((res) => {
    //     // console.log('localUIServerInstance -> res.data', res.data);
    //     // systemConfigurationInstance.setData(res.data);
    //     //setUrl(res.data.DB_REST_BASE_URL);
    //     //changeSocketUrl(res.data.WS_BASE_URL);
    //     setUrl(
    //       res.data.WCM_REST_PROTOCOL +
    //         '://' +
    //         res.data.WCM_IP +
    //         ':' +
    //         res.data.WCM_PORT +
    //         '/',
    //     );
    //     changeSocketUrl(
    //       res.data.WCM_WS_PROTOCOL +
    //         '://' +
    //         res.data.WCM_IP +
    //         ':' +
    //         res.data.WCM_PORT +
    //         res.data.WCM_WS_URL_SUFFIX,
    //     );
    //     initialization();
    //   })
    //   .catch((err) => {
    //     console.log('ERROR - ', err);
    //     message.error({ content: 'Network is Down', key: 'UI' });
    //   });
  }, [initialization]);
  React.useEffect(() => {
    updateBackendUrl();

    return () => {};
  }, [updateBackendUrl]);

  return <></>;
};

export default TokenInitializer;
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
