import axios from "axios";
import { UserLoginDataType, UserRegisterDataType } from "./userHooks";

export const useAPI = (): typeof hookReturn => {
  const api = axios.create({
    baseURL: String(process.env.REACT_APP_API_URL),
    timeout: 60000,
  });

  // eslint-disable-next-line
  const apiRegisterUser = async (
    userData: UserRegisterDataType
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): Promise<any> => {
    try {
      const { data } = await api.post(`users/register/`, userData);

      return data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return {
        status: error.response.data.status,
        msg: error.response.data.msg,
      };
    }
  };

  // eslint-disable-next-line
  const apiLoginUser = async (
    userData: UserLoginDataType
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): Promise<any> => {
    try {
      const { data } = await api.post(`users/login/`, userData);

      return data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return {
        status: error.response.data.status,
        msg: error.response.data.msg,
      };
    }
  };

  const apiSetAuthorization = (token: string): void => {
    api.defaults.headers.common.Authorization = token;
  };

  const hookReturn = {
    apiRegisterUser,
    apiLoginUser,
    apiSetAuthorization,
  };

  return hookReturn;
};
