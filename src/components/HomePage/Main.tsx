import React, { useContext, useEffect, useRef, useState } from "react";
import SearchIcon from "../../icons/SearchIcon";
import { ThemeContext } from "../../states/context/ThemeContext";
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
          <SearchIcon></SearchIcon>
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
