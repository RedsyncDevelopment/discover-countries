import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../Context/ThemeContext";

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
            {dark ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className="w-4 fill-white"
              >
                <path d="M32 256c0-123.8 100.3-224 223.8-224c11.36 0 29.7 1.668 40.9 3.746c9.616 1.777 11.75 14.63 3.279 19.44C245 86.5 211.2 144.6 211.2 207.8c0 109.7 99.71 193 208.3 172.3c9.561-1.805 16.28 9.324 10.11 16.95C387.9 448.6 324.8 480 255.8 480C132.1 480 32 379.6 32 256z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className="w-4 fill-veryDarkBlueLightMode"
              >
                <path d="M421.6 379.9c-.6641 0-1.35 .0625-2.049 .1953c-11.24 2.143-22.37 3.17-33.32 3.17c-94.81 0-174.1-77.14-174.1-175.5c0-63.19 33.79-121.3 88.73-152.6c8.467-4.812 6.339-17.66-3.279-19.44c-11.2-2.078-29.53-3.746-40.9-3.746C132.3 31.1 32 132.2 32 256c0 123.6 100.1 224 223.8 224c69.04 0 132.1-31.45 173.8-82.93C435.3 389.1 429.1 379.9 421.6 379.9zM255.8 432C158.9 432 80 353 80 256c0-76.32 48.77-141.4 116.7-165.8C175.2 125 163.2 165.6 163.2 207.8c0 99.44 65.13 183.9 154.9 212.8C298.5 428.1 277.4 432 255.8 432z" />
              </svg>
            )}

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
