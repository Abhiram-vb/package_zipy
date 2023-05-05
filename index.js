import { useEffect, useState } from "react";
import { ErrorHandling } from "./modules/ErrorHandling";
import FloatingButton from "./modules/FloatingButton";
import Interceptor from "./modules/Interceptor";
import { logException, logMessage } from "./modules/ZipyLogger";
export { ErrorHandling, Interceptor, logException, logMessage, FloatingButton };
let data = null;
let api_key = "";
const Zipy = async(key) => {
  api_key = key;
  await fetch("https://mobileservice.zipy.ai/verify/" + key)
      .then((response) => response.json())
      .then((json) => {
        console.log(json,"this is json")
        data = json;
      })
      .catch((error) => console.error(error));
  
  ErrorHandling();
  Interceptor((start = new Date().getTime()));
};
export default Zipy;
export { data, api_key };
