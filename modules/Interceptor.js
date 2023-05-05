import { api_key, data } from "../index";
import {
  LOGDATA,
  SDK_VERSION,
  S_ID,
  TECH_STACK,
} from "../utils/constants";
export const Interceptor = (start) => {
  console.log("came here ",data)
  if (data?.data?.network_capture) {
    let method = "other";
    const originalFetch = fetch;
    fetch = function () {
      end = new Date().getTime();
      console.log("time taken is ", start, end);
      return originalFetch
        .apply(this, arguments)
        .then(async function (response) {
          const logNetworkRequests = (response) => {
            let type = "other";
            if (response.url.endsWith(".css")) {
              type = "css";
            } else if (response.url.endsWith(".js")) {
              type = "js";
            } else if (
              response.url.endsWith(".woff") ||
              response.url.endsWith(".woff2") ||
              response.url.endsWith(".ttf")
            ) {
              type = "fonts";
            } else if (
              response.url.endsWith(".png") ||
              response.url.endsWith(".jpg") ||
              response.url.endsWith(".jpeg") ||
              response.url.endsWith(".gif")
            ) {
              type = "images";
            } else if (
              response?.headers?.map["content-type"]?.startsWith(
                "application/json"
              )
            ) {
              type = "xhr";
            }
            return type;
          };
          if (response.url.startsWith("https://mobileservice.zipy.ai")) {
            return response;
          }
          let reqData = {
            response_code: response.status,
            method: method,
            url: response.url,
            type: logNetworkRequests(response),
            size: response._bodyBlob._data.size,
            time: end - start,
            headers: response.headers,
          };
          req_body = {
            message: {
              key: api_key,
              sdk_ver: SDK_VERSION,
              src: "MOBILE",
              src_tech_stack: TECH_STACK,
              s_id: S_ID,
              event_type: "NETWORK",
              events: [reqData],
            },
          };
          console.log(reqData, "this is the response data we need to send");
          LOGDATA.push(reqData);
          let resp = "";
          await fetch("https://mobileservice.zipy.ai/post", {
            method: "POST",
            headers: new Headers({
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODI2MDc1NDV9.gkx_shFwp_XW6XsqC5ZRXXfSlrN-FjS_Y2o1aciqFP4",
              "Content-Type": "application/json",
            }),
            body: JSON.stringify(reqData),
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
          return response;
        })
        .catch(function (error) {
          console.log(`[NETWORK INTERCEPTOR] fetch error: `, error, "network");
          throw error;
        });
    };

    const originalXhrSend = XMLHttpRequest.prototype.send;
    XMLHttpRequest.prototype.send = function () {
      method = this._method;
      if (this._url.startsWith("https://mobileservice.zipy.ai")) {
        return originalXhrSend.apply(this, arguments);
      }
      return originalXhrSend.apply(this, arguments);
    };
  } else {
    console.log("network_capture is not enabled");
  }
};
export default Interceptor;
