import React from "react";
import {
  updateObKavachData,
  updateTrainData,
  resetRealTimeDataConfigData,
} from "appRedux/reducers/RealTimeDataConfig";
import { useSelector, useDispatch } from "react-redux";
import { MESSAGE_ID_NAME } from "../../../constants/IRS";

/**
 * A component that updates socket data and dispatches actions to update the station data.
 */
const SocketDataUpdater = () => {
  const dispatch = useDispatch();
  const { stationData } = useSelector((state) => state.initConfig);
  const { obKavachData, trainData } = useSelector(
    (state) => state.realTimeDataConfig
  );
  React.useEffect(() => {
    console.log("SocketDataUpdater obKavachData -> ", obKavachData);
    if (obKavachData.length <= 1) {
      return;
    }
    const deqData = obKavachData.find((f) => f.readFlag === false);
    console.log("SocketDataUpdater deqData", deqData);
    if (
      deqData &&
      deqData.messageId === MESSAGE_ID_NAME.EICM_DSST_OBKAVACH_INFO
    ) {
      const newArray = obKavachData?.map((o) => {
        let newObj = { ...o };
        if (o.id === deqData.id) {
          newObj.readFlag = true;
        }
        return newObj;
      });
      console.log("TrainGroup newArray", newArray);
      dispatch(updateObKavachData(newArray));

      let newState = [];
      let index;
      index = trainData.findIndex((f) => f.locoId === deqData.locoId);

      if (index === -1) {
        //new train found
        const newData = {
          locoId: deqData.locoId,
          absolutePos: deqData.absolutePos,
          direction: deqData.direction,
          tinNo: deqData.tinNo,
          lastRfid: deqData.lastRfid,
          stationId: deqData.stationId,
        };
        newState = [...trainData, newData];
      } else {
        //old train but new location
        newState = trainData.map((td) => {
          let newData = { ...td };

          if (td.locoId === deqData.locoId) {
            newData = {
              ...deqData,
            };
          }
          return newData;
        });
      }
      console.log("TrainGroup trainData newState", newState);
      dispatch(updateTrainData(newState));
    }
    return () => {
      resetRealTimeDataConfigData();
    };
  }, [dispatch, obKavachData, trainData, stationData]);
  return <></>;
};

export default SocketDataUpdater;
