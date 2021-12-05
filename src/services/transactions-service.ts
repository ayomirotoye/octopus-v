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

export const callTofetchEkedpTransactionByDateRange = async (dateRange: any) => {
  try {
    const data = await httpServiceInterfaceOauth2.get(
      urlsToCall.urlToFetchEkedpTransactions?.
        concat("fromDate=", dateRange.fromDate, "&", "toDate=", dateRange.toDate)
    );

    return data;
  } catch (err) {
    return handleMyErrors(err);
  }
};