import React, { useContext } from "react";
import { ThemeContext } from "../Context/ThemeContext";

const NotFound = () => {
  const { dark } = useContext(ThemeContext);

  return (
    <>
      <div
        className={`${"flex items-center justify-center pt-6 p-6 lg:p-24 min-h-screen"} ${
          dark
            ? "bg-veryDarkBlueDarkMode text-white"
            : "bg-veryLightGreyLightMode"
        }`}
      >
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-5xl font-bold">404</h2>
          <h3>Page Not Found</h3>
        </div>
      </div>
    </>
  );
};

export default NotFound;
