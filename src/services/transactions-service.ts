import { urlsToCall } from "../common/api-endpoints";
import { handleMyErrors } from "../common/error-handler";
import { httpServiceInterfaceOauth2 } from "./http-service";

export const callTofetchEkedpTransaction = async () => {
  try {
    const data = await httpServiceInterfaceOauth2.get(
      urlsToCall.urlToFetchEkedpTransactions
    );

    return data;
  } catch (err) {
    return handleMyErrors(err);
  }
};

export const callToExportAsPDF = async (dto?: string) => {
  try {
    const data = await httpServiceInterfaceOauth2.post(
      urlsToCall.urlToExportAsPDF,
      dto
    );

    return data;
  } catch (err) {
    return handleMyErrors(err);
  }
};

export const callToExportAsCSV = async (dto?: string) => {
  try {
    const data = await httpServiceInterfaceOauth2.post(
      urlsToCall.urlToExportAsCSV,
      dto
    );

    return data;
  } catch (err) {
    return handleMyErrors(err);
  }
};
