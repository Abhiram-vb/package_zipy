// import {setData} from './SqlHandling';
import { api_key, data } from "../index";
import {
  LOGDATA,
  SDK_VERSION,
  SRC,
  S_ID,
  TECH_STACK,
} from "../utils/constants";
export const logMessage = async (
  message,
  jsonArg = null,
  maxLength = 75,
  maxJsonSize = null
) => {
  if (data?.data?.logs_capture) {
    let logMessage = message;
    let jsonString = "";

    if (jsonArg !== null) {
      try {
        jsonString = JSON.stringify(jsonArg);
        if (maxJsonSize !== null && jsonString.length > maxJsonSize) {
          console.warn("JSON argument size exceeds limit.");
          jsonString = jsonString.substring(0, maxJsonSize);
        }
        logMessage += " " + jsonString;
      } catch (error) {
        console.error("Invalid JSON argument: ", error);
      }
    }

    if (logMessage.length > maxLength) {
      console.warn("Log message exceeds length limit.");
      logMessage = logMessage.substring(0, maxLength);
    }
    const logData = {
      timestamp: new Date().toJSON(),
      message: message,
      jsonContent: jsonString,
    };
    // setData(logData.timestamp, logData.message, logData.jsonContent);
    req_body = {
      message: {
        key: api_key,
        sdk_ver: SDK_VERSION,
        src: "MOBILE",
        src_tech_stack: TECH_STACK,
        s_id: S_ID,
        event_type: "LOG",
        events: [logData],
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
  } else {
    console.log("logs_capture is not enabled");
  }
};

export const logException = async (
  message,
  exceptionObject,
  maxLength = 75
) => {
  if (data.data.logs_capture) {
    let msg = message.substring(0, maxLength);
    let stackTrace = exceptionObject.stack;
    if (stackTrace) {
      stackTrace = stackTrace.toString();
    } else {
      stackTrace = "";
    }

    console.error(message, exceptionObject);

    const logData = {
      timestamp: new Date().toJSON(),
      message: msg,
      stackTrace: stackTrace,
    };
    req_body = {
      message: {
        key: api_key,
        sdk_ver: SDK_VERSION,
        src: SRC,
        src_tech_stack: TECH_STACK,
        s_id: S_ID,
        event_type: "LOG",
        events: [logData],
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
    //Here we need to write a code to send logData to backend through a specific event.
  } else {
    console.log("logs_capture is not enabled");
  }
};
