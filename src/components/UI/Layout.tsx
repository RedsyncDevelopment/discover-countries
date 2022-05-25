import React, { useContext } from "react";
import { Link } from "react-router-dom";
import MoonIconDark from "../../icons/MoonIconDark";
import MoonIconLight from "../../icons/MoonIconLight";
import { ThemeContext } from "../../states/context/ThemeContext";

const Header = () => {
  const { dark, toggleTheme } = useContext(ThemeContext);

  return (
    <>
      <div
        className={`${"flex justify-between font-sans items-center"} ${
          dark && "bg-darkBlueDarkMode text-white"
        }`}
      >
        <h1 className="pt-6 pb-6 md:pl-24 pl-6 font-extrabold md:text-2xl text-lg">
          <Link to={"/"}>Where in the world?</Link>
        </h1>
        <div className="pt-6 pb-6 md:pr-24 pr-6">
          <button
            className="flex items-center md:gap-2 gap-1 md:p-2"
            onClick={toggleTheme}
          >
            {dark ? <MoonIconDark /> : <MoonIconLight />}

            {dark ? (
              <span className="md:text-lg text-sm">Light Mode</span>
            ) : (
              <span className="md:text-lg text-sm">Dark Mode</span>
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default Header;
