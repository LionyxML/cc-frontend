import { useState } from "react";
import { useAPI } from "./cc-api";

export interface UserRegisterDataType {
  userName: string;
  password: string;
  passwordConfirmation: string;
  firstName: string;
  lastName: string;
  profilePic: string;
}

export const useRegisterUser = (): typeof hookReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState("");
  const { apiRegisterUser } = useAPI();

  const sendUserRegistration = async (
    userData: UserRegisterDataType
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): Promise<any> => {
    setIsLoading(true);
    const data = await apiRegisterUser(userData);
    setResponse(data);
    setIsLoading(false);

    return data;
  };

  const hookReturn = {
    loading: isLoading,
    response,
    send: sendUserRegistration,
  };

  return hookReturn;
};
