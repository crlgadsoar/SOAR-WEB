import { Client } from '@stomp/stompjs';

export let LOCAL_CLIENT_URL = ''; //'192.168.25.72:8085'; //Will be fetched from server later

export const changeSocketUrl = (_url) => {
  LOCAL_CLIENT_URL = _url;
};

export const getSocketClient = () => {
  if (!LOCAL_CLIENT_URL) {
    return LOCAL_CLIENT_URL;
  }

  const onConnected = () => {
    console.log('STOMP Connected!!');
    client.subscribe('/topic/message', function (message) {
      console.log(`Received: ${message.body}`);
    });
  };

  const onDisconnected = () => {
    console.log('STOMP Disconnected!!');
  };
  const client = new Client({
    brokerURL: LOCAL_CLIENT_URL,
    reconnectDelay: 1000,
    heartbeatIncoming: 1000,
    heartbeatOutgoing: 1000,
    onConnect: onConnected,
    onDisconnect: onDisconnected,
  });

  return client;
};

// export const setAuthenticationTokenForClient = (token) => {
//   console.log('CONNECT');
//   if (client) {
//     client.activate();
//     client.connectHeaders = {
//       authentication: 'Bearer ' + token,
//     };

//     // client.deactivate()
//     client.beforeConnect = () => {
//       console.log('BEFORE CONNECT');
//       if (client)
//         client.configure = (configure) => {
//           configure.connectHeaders = {
//             token: token,
//           };
//         };
//     };

//     client.onConnect = () => {
//       console.log('AFTER CONNECT');
//       if (client) {
//         client.subscribe('/topic/greetings', (message) =>
//           console.log(`Received: ${message.body}`),
//         );
//         client.publish({
//           destination: '/app/form',
//           body: 'First Message 888888',
//         });
//       }
//     };
//   }
// };

// export const setWebSocketClientURL = (url) => {
//   client.configure({
//     brokerURL: url,
//   });
// };

//export default client;
