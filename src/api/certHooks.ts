/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useAPI } from "./cc-api";

export const useCertificates = (): typeof hookReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState("");
  const { apiListUsersCertificate } = useAPI();

  const getUserCertificates = async (): Promise<any> => {
    setIsLoading(true);
    const data = await apiListUsersCertificate();
    setResponse(data);
    setIsLoading(false);

    return data;
  };

  const hookReturn = {
    loading: isLoading,
    response,
    fetch: getUserCertificates,
  };

  return hookReturn;
};

export const useSendCertificate = (): typeof hookReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState("");
  const { apiSendCertificate } = useAPI();

  const sendCertificate = async (
    fileName: string,
    certificate: string
  ): Promise<any> => {
    setIsLoading(true);
    const data = await apiSendCertificate(fileName, certificate);
    setResponse(data);
    setIsLoading(false);

    return data;
  };

  const hookReturn = {
    loading: isLoading,
    response,
    send: sendCertificate,
  };

  return hookReturn;
};
