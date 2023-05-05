import { useEffect, useState } from "react";
import { ErrorHandling } from "./modules/ErrorHandling";
import FloatingButton from "./modules/FloatingButton";
import Interceptor from "./modules/Interceptor";
import { logException, logMessage } from "./modules/ZipyLogger";
export { ErrorHandling, Interceptor, logException, logMessage, FloatingButton };
let data = null;
let api_key = "";
const Zipy = (key) => {
  api_key = key;
  ErrorHandling();
  Interceptor((start = new Date().getTime()));
  useEffect(() => {
    fetch("https://mobileservice.zipy.ai/verify/" + key)
      .then((response) => response.json())
      .then((json) => {
        data = json;
      })
      .catch((error) => console.error(error));
  }, []);
};
export default Zipy;
export { data, api_key };
