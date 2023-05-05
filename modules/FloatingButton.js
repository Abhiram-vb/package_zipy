import {Alert} from 'react-native';

import {FAB} from 'react-native-elements';
import React from 'react';
import {deleteData, getData} from './SqlHandling';
import { LOGDATA } from '../utils/constants';

const FloatingButton = () => {
  const thisisclicked = async() => {
    console.log('this is clicked');
    req_body = {
      message: {
        key: api_key,
        sdk_ver: SDK_VERSION,
        src: "MOBILE",
        src_tech_stack: TECH_STACK,
        s_id: S_ID,
        event_type: "ANR",
        events: [LOGDATA],
      },
    };
    LOGDATA.push(logData);
    let resp = "";
    await fetch("https://mobileservice.zipy.ai/post", {
      method: "POST",
      headers: new Headers({
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODI2MDc1NDV9.gkx_shFwp_XW6XsqC5ZRXXfSlrN-FjS_Y2o1aciqFP4",
        "Content-Type": "application/json",
      }),
      body: JSON.stringify(req_body),
    })
      .then((response) => response.json())
      .then((json) => {
        resp = json;
        console.log(resp, "this is the resp");
      })
      .catch((error) => console.error(error));
    if (resp.success) {
      LOGDATA.pop();
      console.log("data sent successfully");
    }
    // Here we need to write a code to send logData to backend through a specific event.
  }

    // Alert.alert(
    //   'Do you want to report any bug',
    //   'You clicked floating action button you can do below actions',
    //   [
    //     {
    //       text: 'Get Data',
    //       onPress: () => {
    //         getData();
    //       },
    //     },
    //     {
    //       text: 'Drop Table',
    //       onPress: () => {
    //         deleteData();
    //       },
    //     },
    //     {
    //       text: 'Cancle',
    //       onPress: () => {
    //         console.log('cancle is clicked');
    //       },
    //     },
    //   ],
    //   {cancelable: true, onDismiss: () => console.log('alert popup is closed')},
    // );

  return (
    <>
      <FAB
        title="Report Bug"
        titleStyle={{backgroundColor: 'red'}}
        placement="right"
        upperCase
        color="red"
        onPress={thisisclicked}
      />
    </>
  );
};

export default FloatingButton;
