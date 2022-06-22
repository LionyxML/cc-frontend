/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { UserLoginDataType, UserRegisterDataType } from "./userHooks";

export const useAPI = (): typeof hookReturn => {
  const api = axios.create({
    baseURL: String(process.env.REACT_APP_API_URL),
    timeout: 60000,
  });

  api.interceptors.request.use(
    // eslint-disable-next-line func-names
    function (config) {
      const token = JSON.parse(localStorage.getItem("@cc") as string)
        ?.token as string;
      if (token) {
        /* eslint-disable */
        // @ts-ignore
        config.headers["Authorization"] = token;
      }
      return config;
    },
    // eslint-disable-next-line func-names
    function (error) {
      return Promise.reject(error);
    }
  );

  const apiRegisterUser = async (
    userData: UserRegisterDataType
  ): Promise<any> => {
    try {
      const { data } = await api.post(`users/register/`, userData);

      return data;
    } catch (error: any) {
      return {
        status: error.response.data.status,
        msg: error.response.data.msg,
      };
    }
  };

  const apiLoginUser = async (userData: UserLoginDataType): Promise<any> => {
    try {
      const { data } = await api.post(`users/login/`, userData);

      return data;
    } catch (error: any) {
      return {
        status: error.response.data.status,
        msg: error.response.data.msg,
      };
    }
  };

  const apiSetAuthorization = (token: string): void => {
    api.defaults.headers.common.Authorization = token;
    console.log(">>", api.defaults.headers.common.Authorization);
    console.log(">>token", token);
  };

  const apiListUsersCertificate = async (): Promise<any> => {
    try {
      const { data } = await api.get(`certificates/list`);

      return data;
    } catch (error: any) {
      return {
        status: error.response.data.status,
        msg: error.response.data.msg,
      };
    }
  };

  const apiSendCertificate = async (
    fileName: string,
    certificate: string
  ): Promise<any> => {
    try {
      const { data } = await api.post(`certificates/upload`, {
        fileName,
        certificate,
      });

      return data;
    } catch (error: any) {
      return {
        status: error.response.data.status,
        msg: error.response.data.msg,
      };
    }
  };

  const hookReturn = {
    apiRegisterUser,
    apiLoginUser,
    apiSetAuthorization,
    apiListUsersCertificate,
    apiSendCertificate,
  };

  return hookReturn;
};
