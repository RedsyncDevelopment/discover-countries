import React from "react";
import { CountriesInterface } from "./Countries";

interface CountryHomeProps {
  country: CountriesInterface;
}

const CountryHome: React.FC<CountryHomeProps> = ({ country }) => {
  return (
    <>
      <img
        src={country.flags.png}
        className="w-full h-52 rounded-tr-md rounded-tl-md"
        alt={`Flag of ${country.name}`}
      />

      <h1 className="pl-6 text-lg font-bold">{country.name}</h1>
      <div className="pl-6">
        <h3 className="text-base font-medium">
          Population:{" "}
          <span className="font-normal">
            {country.population.toLocaleString("en-US", {
              maximumFractionDigits: 2,
            })}
          </span>
        </h3>
        <h3 className="text-base font-medium">
          Region:
          <span className="font-normal"> {country.region}</span>
        </h3>
        <h3 className="text-base font-medium">
          Capital:
          <span className="font-normal"> {country.capital}</span>
        </h3>
      </div>
    </>
  );
};

export default CountryHome;
