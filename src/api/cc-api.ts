import axios from "axios";
import { UserRegisterDataType } from "./hooks";

export const useAPI = (): typeof hookReturn => {
  const api = axios.create({
    baseURL: String(process.env.REACT_APP_API_URL),
    timeout: 60000,
  });

  // eslint-disable-next-line
  const apiRegisterUser = async (userData: UserRegisterDataType): Promise<any> => {
    try {
      const { data } = await api.post(
        `users/register/`,
        JSON.stringify(userData)
      );

      return data;
    } catch {
      return { status: "error", message: "could not reach server" };
    }
  };

  const hookReturn = {
    apiRegisterUser,
  };

  return hookReturn;
};
