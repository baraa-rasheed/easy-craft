import axios from "axios";
import { useAuthStore } from "../store/useAuthStore";
import { redirect } from "react-router";

const { REACT_APP_API_URL } = process.env;

export const request = axios.create({ baseURL: REACT_APP_API_URL });

request.interceptors.request.use(async (config) => {
  config.headers.setAccept("application/json, text/plain, */*");
  config.headers.setContentType("application/json;charset=UTF-8");
  const { userTokens, pingTokens } = useAuthStore.getState();
  config.headers.setAuthorization(`${pingTokens?.access_token}`);
  config.headers.set("x-auth-token", userTokens?.token);
  config.headers.set("x-csrf-token", userTokens?.csrfToken);
  return config;
});

request.interceptors.response.use(
  (response) => response.data.data || response.data,
  (error) => {
    if (error.response.status === 401) {
      useAuthStore.getState().reset();
      return redirect("/");
    }
    if (error) Promise.reject(error);
  },
);
