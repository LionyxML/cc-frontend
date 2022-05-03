export const convertFileToBase64 = (
  file: Blob
): Promise<string | null | ArrayBuffer> => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};

export const miliSecondsDelay = (millis: number): Promise<void> =>
  new Promise<void>((resolve): void => {
    setTimeout(() => resolve(), millis);
  });
