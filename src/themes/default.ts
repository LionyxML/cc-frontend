// import logo from "../assets/logo.png";

export type ThemeType = typeof themeProps;

const themeProps = {
  fonts: {
    primary: "Open Sans, sans-serif",
    pre: "Consolas, Liberation Mono, Menlo, Courier, monospace",
    quote: "Georgia, serif",
  },
  // logo: {
  //   img: logo,
  //   height: "78px",
  //   padding: "10px 0px",
  //   align: "center",
  //   show: true,
  // },
  navbar: {
    show: true,
  },
  colors: {
    textDefault: "#000000de",
    textFaded: "rgba(37, 64, 87, 0.5)",
    textDark: "#254057",
    textGray: "rgba(51, 51, 51, 0.6)",
    textWhite: "#FFFFFF",
    textBlack: "#000000",
    textDarkGray: "#333333",
    successBlue: "#1976d2",
    bgPrimary: "white",
    bgSecondary: "gray",
    bgGray: "#F1F3F5",
    selectedBlue: "#09B4FF",
    selectedLightBlue: "#D9F2FF",
    addButtonPrimary: "#254057",
    addButtonSecondary: "rgba(37,64,87,0.48)",
    addButtonText: "#FFFFFF",
    removeButtonPrimary: "#254057",
    removeButtonSecondary: "rgba(223, 11, 11, 0.48)",
    removeButtonText: "#FFFFFF",
  },
};

export const defaultTheme: ThemeType = themeProps;
