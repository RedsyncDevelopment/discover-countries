import React, { useContext, useEffect, useRef, useState } from "react";
import { ThemeContext } from "../Context/ThemeContext";
import Countries from "./Countries";

const Main = () => {
  const { dark } = useContext(ThemeContext);
  const [continent, setContinent] = useState<string>(
    sessionStorage.getItem("continent") || "filter"
  );
  const [country, setCountry] = useState<string>("");
  const filterRef = useRef<HTMLSelectElement>(null);

  const handleChange = (e: React.SyntheticEvent): void => {
    let target = e.target as HTMLInputElement;
    setContinent(target.value);
  };

  sessionStorage.setItem("continent", continent);

  const handleSearch = (e: React.SyntheticEvent): void => {
    let target = e.target as HTMLInputElement;
    setCountry(target.value);
  };

  useEffect(() => {
    const currentContinent = filterRef.current;
    if (currentContinent?.value) {
      currentContinent.value = sessionStorage.getItem("continent")!;
    }
  }, []);

  return (
    <main
      className={`${"pt-12 sm:p-24 p-6 min-h-screen"} ${
        dark
          ? "bg-veryDarkBlueDarkMode text-white"
          : "bg-veryLightGreyLightMode"
      }`}
    >
      <div className="md:pb-12 pb-16 flex justify-between sm:flex-row flex-col gap-2">
        <label htmlFor="search" className={`relative `}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className={`w-4 absolute top-3 left-4 ${
              dark ? "fill-white" : "fill-darkBlueDarkMode"
            }`}
          >
            <path d="M500.3 443.7l-119.7-119.7c27.22-40.41 40.65-90.9 33.46-144.7C401.8 87.79 326.8 13.32 235.2 1.723C99.01-15.51-15.51 99.01 1.724 235.2c11.6 91.64 86.08 166.7 177.6 178.9c53.8 7.189 104.3-6.236 144.7-33.46l119.7 119.7c15.62 15.62 40.95 15.62 56.57 0C515.9 484.7 515.9 459.3 500.3 443.7zM79.1 208c0-70.58 57.42-128 128-128s128 57.42 128 128c0 70.58-57.42 128-128 128S79.1 278.6 79.1 208z" />
          </svg>
          <input
            id="search"
            placeholder="Search for a Country"
            type="text"
            className={`${"rounded-md pl-12 pb-2 pt-2 md:w-96 w-full"} ${
              dark ? "bg-darkBlueDarkMode" : "bg-white"
            }`}
            onChange={handleSearch}
          />
        </label>
        <select
          name="region"
          id="region"
          className={`${"pl-4 pr-4 pt-2 pb-2 rounded-md max-w-5xl"} ${
            dark ? "bg-darkBlueDarkMode" : "bg-white"
          }`}
          onChange={handleChange}
          ref={filterRef}
          data-dropdown-toggle="dropdown"
        >
          <option value="filter">All Continents</option>
          <option value="Africa">Africa</option>
          <option value="Americas">America</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select>
      </div>

      <div className={`${""}`}>
        <Countries onFilter={continent} onSearch={country}></Countries>
      </div>
    </main>
  );
};

export default Main;
