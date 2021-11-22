import axios, { AxiosInstance } from "axios";
import { handleMyErrors } from "../common/error-handler";
import { encryptStorage, isNullOrUndefined } from "../common/helpers";

const myOauth2Axios: AxiosInstance = axios.create({
  baseURL: "",
});
myOauth2Axios.defaults.headers.post["Content-Type"] = "application/json";
myOauth2Axios.defaults.headers.post["Accept"] = "application/json";
myOauth2Axios.defaults.timeout = 120000;
myOauth2Axios.interceptors.request.use((request) => {
  return request;
});

function setJwt(jwt: string | null) {
  myOauth2Axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
}

function getJwt() {
  let tokenVal: string = myOauth2Axios.defaults.headers.common["Authorization"];

  if (!isNullOrUndefined(tokenVal)) {
    let tokenValSplit = tokenVal.split(" ");
    if (tokenValSplit.length > 1 && tokenValSplit[1].length > 0) {
      return tokenVal;
    } else {
      return null;
    }
  } else {
    return null;
  }
}

const getRefreshToken = () => {
  let tokenVal = encryptStorage.getItem("refreshToken");
  return tokenVal;
};

const doGet = async (url: string, _config?: any) => {
  let resData: any = {};
  try {
   
    const { data } = await myOauth2Axios.get(url);
    return data;
  } catch (err) {
    resData = handleMyErrors(err);
  }
  return resData;
};

const doPost = async (url: string, requestBody: any, config: any = {}) => {
  let resData: any;
  try {
    const { data } = await myOauth2Axios.post(url, requestBody, config);
    return data;
  } catch (err) {
    resData = handleMyErrors(err);
  }
  return resData;
};

const doPut = async (url: string, requestBody: any, config: any = {}) => {
  let resData: any;
  try {
    // await authHttpForUser();
    const { data } = await myOauth2Axios.put(url, requestBody, config);
    return data;
  } catch (err) {
    resData = handleMyErrors(err);
  }
  return resData;
};

export const httpServiceInterfaceOauth2 = {
  myAxios: axios,
  setJwt: setJwt,
  getJwt: getJwt,
  get: doGet,
  post: doPost,
  put: doPut,
};
