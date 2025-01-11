// import { Poppins } from "next/font/google";
import localFont from "next/font/local";

export const GeneralSans = localFont({ src: "./GeneralSans-Variable.ttf" });
export const Poppins = localFont({
  src: [
    { path: "./Poppins/Poppins-Black.ttf", weight: "900" },
    { path: "./Poppins/Poppins-Bold.ttf", weight: "700" },
    { path: "./Poppins/Poppins-Medium.ttf", weight: "500" },
    { path: "./Poppins/Poppins-Regular.ttf", weight: "400" },
    { path: "./Poppins/Poppins-SemiBold.ttf", weight: "600" },
    { path: "./Poppins/Poppins-Thin.ttf", weight: "300" },
    { path: "./Poppins/Poppins-Light.ttf", weight: "200" },
    { path: "./Poppins/Poppins-ExtraLight.ttf", weight: "100" },
    { path: "./Poppins/Poppins-ExtraBold.ttf", weight: "800" },
  ],
});
