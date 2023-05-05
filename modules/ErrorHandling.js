import {
  setNativeExceptionHandler,
  setJSExceptionHandler,
} from "react-native-exception-handler";
import { Alert } from "react-native";
import { logException } from "./ZipyLogger";
export const ErrorHandling = () => {
  const exceptionHandler = async (error, isFatal) => {
    // const response = await fetch(
    //   'https://apis.ccbp.in/videos/30b642bd-7591-49f4-ac30-5c538f975b15',
    //   {
    //     method: 'GET',
    //     headers: new Headers({
    //       Authorization:
    //         'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJhaHVsIiwicm9sZSI6IlBSSU1FX1VTRVIiLCJpYXQiOjE2MjMwNjU1MzJ9.D13s5wN3Oh59aa_qtXMo3Ec4wojOx0EZh8Xr5C5sRkU',
    //       'Content-Type': 'application/json',
    //     }),
    //   },
    // );
    logException(error.message, error);
    console.log("exception occurred in the code", JSON.stringify(error));
    Alert.alert(JSON.stringify(error));
  };

  setJSExceptionHandler(exceptionHandler,true);
};
