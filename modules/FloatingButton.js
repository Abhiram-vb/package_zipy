import {Alert,View} from 'react-native';

import {FAB} from 'react-native-elements';
import React from 'react';
import {deleteData, getData} from './SqlHandling';
import { api_key } from 'package_zipy';
import { LOGDATA, SDK_VERSION, S_ID, TECH_STACK } from 'package_zipy/utils/constants';

const FloatingButton = () => {
  const thisisclicked = async() => {
    console.log('this is clicked');
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
  return (
    <View>
      <FAB
        title="Report Bug"
        titleStyle={{backgroundColor: 'red'}}
        placement="right"
        upperCase
        color="red"
        onPress={thisisclicked}
      />
    </View>
  );
};

export default FloatingButton;
