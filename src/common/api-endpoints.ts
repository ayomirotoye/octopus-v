export const apiBaseUrl = `${process.env.REACT_APP_API_BASE_URL}`;

export const urlsToCall={
    urlToFetchEkedpTransactions: apiBaseUrl.concat("/ekedp-transactions"),
    urlToUserLogin: apiBaseUrl.concat("/auth/authenticate"),
    urlToExportAsPDF: apiBaseUrl.concat("/ekedp-transactions/export/pdf"),
    urlToExportAsCSV: apiBaseUrl.concat("/ekedp-transactions/export/csv"),
}