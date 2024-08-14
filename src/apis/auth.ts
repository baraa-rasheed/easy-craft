import axios from "axios";
import { request } from "./request";
import { useAuthStore } from "../store/useAuthStore";
import { IRoute } from "../types/routes";

const {
  REACT_APP_ID,
  REACT_APP_REDIRECT_URI,
  REACT_APP_CLIENT_SECRET,
  REACT_APP_TOKEN_GRANT_TYPE,
} = process.env;

const pingTokenRequest = axios.create({
  baseURL: process.env.REACT_APP_PING_FEDERATE_ENDPOINT,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization:
      "Basic " + btoa(`${REACT_APP_ID}:${REACT_APP_CLIENT_SECRET}`),
  },
});

export const authApis = {
  pingTokenLogin: ({ code }: { code: string }) => {
    return pingTokenRequest.post(`/as/token.oauth2`, {
      code: code,
      redirect_uri: `${REACT_APP_REDIRECT_URI}`,
      grant_type: `${REACT_APP_TOKEN_GRANT_TYPE}`,
    });
  },
  pingUserInfo: () => {
    return pingTokenRequest.get(`/idp/userinfo.openid`, {
      headers: {
        Authorization: `Bearer ${useAuthStore.getState().pingTokens?.access_token}`,
      },
    });
  },
  login: ({ email }: { email?: string }) => {
    return request.post(`/auth/login`, { email });
  },
  updateRoutes: ({ routes }: { routes: Array<IRoute> }) => {
    return request.post("/config/iot-config", {
      frontend_config: { routes },
      version: 500,
    });
  },
};
