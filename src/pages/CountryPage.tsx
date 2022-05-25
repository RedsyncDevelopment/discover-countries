import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Country from "../components/CountryPage/Country";
import ArrowIcon from "../icons/ArrowIcon";
import { ThemeContext } from "../states/context/ThemeContext";

const CountryPage = () => {
  const { dark } = useContext(ThemeContext);

  return (
    <main
      className={`${"pt-12 md:p-24 p-6 min-h-screen"} ${
        dark
          ? "bg-veryDarkBlueDarkMode text-white"
          : "bg-veryLightGreyLightMode"
      }`}
    >
      <Link to="/">
        <div
          className={`${"w-36 pl-4 pr-4 pt-2 pb-2 rounded-md drop-shadow-md"} ${
            dark ? "bg-darkBlueDarkMode" : "bg-white"
          }`}
        >
          <div className="flex justify-between items-center">
            <ArrowIcon></ArrowIcon>
            <span>Back to All</span>
          </div>
        </div>
      </Link>
      <Country></Country>
    </main>
  );
};

export default CountryPage;
