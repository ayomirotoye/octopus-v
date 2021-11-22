import { urlsToCall } from "../common/api-endpoints";
import { handleMyErrors } from "../common/error-handler";
import { httpServiceInterfaceOauth2 } from "./http-service";

export const callToUserLogin = async (requestPayload: any) => {
  try {
    const data = await httpServiceInterfaceOauth2.post(
      urlsToCall.urlToUserLogin,
      requestPayload
    );

    return data;
  } catch (err) {
    return handleMyErrors(err);
  }
};
