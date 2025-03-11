import React from "react";
import { getSocketClient } from "util/connection/socket_stomp";
import { useDispatch, useSelector } from "react-redux";
import {
  updateObKavachData,
  updateRelayData,
  updateSKavachData,
} from "appRedux/reducers/RealTimeDataConfig";
import {
  decoderSignalAndPointStatusByStaticDatabaseData,
  getJsonByMessageId,
} from "./helper";
import { MESSAGE_ID_NAME } from "constants/IRS";
/**
 * A component that provides data from a socket connection.
 */
const SocketDataProvider = () => {
  const client = getSocketClient();
  const dispatch = useDispatch();
  const MAX_QUEUE_LENGTH = 5;
  const previousObKavachDataRef = React.useRef([]);
  const previousSKavachDataRef = React.useRef([]);
  const previousRelayDataRef = React.useRef([]);
  const { stationData, staticSignalData, staticPointData } = useSelector(
    (state) => state.initConfig
  );
  const { obKavachData, sKavachData, relayData } = useSelector(
    (state) => state.realTimeDataConfig
  );

  React.useEffect(() => {
    previousObKavachDataRef.current = obKavachData;
  }, [obKavachData]);

  React.useEffect(() => {
    previousSKavachDataRef.current = sKavachData;
  }, [sKavachData]);

  React.useEffect(() => {
    previousRelayDataRef.current = relayData;
  }, [relayData]);

  React.useEffect(() => {
    if (client) {
      console.log("CLIENT", client);
      client?.activate();
      client.onConnect = () => {
        client?.subscribe("/topic/messages", (message) => {
          console.log("STOMP-MESSAGE HEADERS", message.headers);
          console.log("STOMP-MESSAGE BODY", JSON.parse(message.body));
          let newData = getJsonByMessageId(
            JSON.parse(message.body),
            stationData
          );
          newData.id = message.headers["message-id"];
          console.log("RECEIVED, newData", newData);
          switch (newData.messageId) {
            case MESSAGE_ID_NAME.EICM_DSST_OBKAVACH_INFO:
              {
                let newArray = [...previousObKavachDataRef.current, newData];

                console.log("newArray provider OBKAVACH", newArray);

                if (newArray.length > MAX_QUEUE_LENGTH) {
                  console.log(
                    "newArray length exceeds max limit OBKAVACH",
                    newArray
                  );
                  newArray = newArray.filter((f) => f.readFlag === false);
                  // newArray.splice(0, MAX_QUEUE_LENGTH - 1);
                  console.log("newArray cropped ", newArray);
                }
                dispatch(updateObKavachData(newArray));
              }
              break;

            case MESSAGE_ID_NAME.EICM_DSST_SKAVACH_INFO:
              {
                let newArray;
                let index = previousSKavachDataRef.current.findIndex(
                  (i) => i.stationId === newData.stationId
                );
                if (index === -1) {
                  newArray = [...previousSKavachDataRef.current, newData];
                } else {
                  newArray = [...previousSKavachDataRef.current];
                  newArray.splice(index, 1, newData);
                }
                dispatch(updateSKavachData(newArray));
              }
              break;
            case MESSAGE_ID_NAME.EICM_DSST_RELAY_INFO:
              {
                let newArray = decoderSignalAndPointStatusByStaticDatabaseData(
                  staticSignalData,
                  staticPointData,
                  newData.stationId,
                  newData.countOfRelayStatus,
                  newData.relayStatus
                );
                let index = previousRelayDataRef.current.findIndex(
                  (i) => i.stationId === newArray.stationId
                );
                if (index === -1) {
                  newArray = [...previousRelayDataRef.current, newArray];
                } else {
                  newArray = [...previousRelayDataRef.current];
                }
                dispatch(updateRelayData(newArray));
              }
              break;

            default:
          }
        });
      };
    }
    return client?.deactivate();
  }, [client, dispatch, stationData, staticPointData, staticSignalData]);
  return <></>;
};

export default SocketDataProvider;
