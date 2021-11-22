import { ResponseBody } from "../types/ResponseBody";
import { isNullOrUndefined, isObject } from "./helpers";
import { responseMessage } from "./response-message";
import { responseCodes } from "./static-values";

export const handleMyErrors = (err: any) => {
    let finalErrRes: ResponseBody = {
      responseCode: "",
      data: {},
      hasError: true,
    };
    try {
      const errRes = err.response?.data;
      if (
        !isNullOrUndefined(errRes) &&
        errRes.error_description?.toString().includes("change default/initial")
      ) {
        finalErrRes = {
          ...finalErrRes,
          responseCode: responseCodes.CHANGE_PASSWORD,
        };
      } else if (
        !isNullOrUndefined(errRes) &&
        errRes.error?.toString().includes("access_denied")
      ) {
        finalErrRes = {
          ...finalErrRes,
          responseCode: responseCodes.ACCESS_DENIED,
          data: responseMessage.ACCESS_DENIED,
        };
        throw new Error(String(finalErrRes));
      } else if (
        !isNullOrUndefined(errRes) &&
        errRes.error?.toString().includes("invalid_grant")
      ) {
        finalErrRes = {
          ...finalErrRes,
          responseCode: responseCodes.INVALID_GRANT,
          data: responseMessage.INVALID_GRANT,
        };
        throw new Error(String(finalErrRes));
      } else if (err.message?.includes("401")) {
        finalErrRes = {
          ...finalErrRes,
          data: responseMessage.SESSION_EXPIRED,
          responseCode: responseCodes.UNAUTHORIZED,
        };
        // throw new Error(responseMessage.REQUEST_COULD_NOT_BEEN_AUTHENTICATED);
      } else if (err.message?.includes("404")) {
        finalErrRes = {
          ...finalErrRes,
          responseCode: responseCodes.PAGE_NOT_FOUND,
          data: "No response from requested service as it is not found",
        };
      } else if (!isNullOrUndefined(err?.response) && isObject(err?.response)) {
        let errResData = err.response.data || {};
        let errResDataString = "";
        for (const [keys, values] of Object.entries(errResData)) {
          errResDataString += keys !== "responseCode" ? values + "<br/>" : "";
        }
        if (errResDataString.includes("service unavailable")) {
          finalErrRes = {
            ...finalErrRes,
            responseCode: responseCodes.SERVICE_UNAVAILABLE,
            data: responseMessage.SERVICE_UNAVAILABLE,
          };
        } else
          finalErrRes = {
            ...finalErrRes,
            responseCode: responseCodes.BAD_REQUEST,
            data:
              isNullOrUndefined(errResDataString) ||
              errResDataString?.toLowerCase().includes("bad request")
                ? responseMessage.BAD_REQUEST
                : errResDataString,
          };
      } else {
        finalErrRes = {
          ...finalErrRes,
          responseCode: responseCodes.ERROR_OCCURRED,
          data: err.message,
        };
      }
    } catch (err) {
      finalErrRes = {
        ...finalErrRes,
        responseCode: responseCodes.ERROR_OCCURRED,
      };
      console.log("ERROR OCCURRED WHILE PARSING ERRORS=>", err);
    }
    return finalErrRes;
  };
  