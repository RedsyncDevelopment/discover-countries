import axios from "axios";
import React, { useContext } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { ThemeContext } from "../Context/ThemeContext";
import { CountriesInterface } from "../HomePage/Countries";
import NotFound from "../UI/404";

function isError(error: unknown): error is Error {
  return error instanceof Error;
}

interface SingleCountryDataProps {
  country: CountriesInterface;
}

const SingleCountryData: React.FC<SingleCountryDataProps> = ({ country }) => {
  const { dark } = useContext(ThemeContext);

  const { data, status, isLoading, error } = useQuery("countrys", () =>
    axios.get("https://restcountries.com/v2/all").then((res) => res.data)
  );

  if (isLoading)
    return (
      <div className="pt-16">
        <div className="flex justify-center items-center">
          <div
            className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"
            role="status"
          ></div>
        </div>
      </div>
    );
  if (!data) return <NotFound></NotFound>;
  if (status === "error") if (isError(error)) return <h1>{error.message}</h1>;

  return (
    <>
      <div className="pt-12 grid lg:grid-cols-2 grid-cols-1 sm:gap-24 gap-16 items-center">
        <img
          src={country.flags.svg}
          alt={`Flag of ${country.name}`}
          className="drop-shadow-md w-full"
        />
        <div className="">
          <h2 className="text-3xl pb-12">
            <strong>{country.name}</strong>
          </h2>
          <div className="grid sm:grid-cols-2 grid-cols-1 gap-6 pb-10">
            <ul className="flex flex-col gap-2">
              <li>
                <h3>
                  <strong>Native Name: </strong>
                  {country.nativeName}
                </h3>
              </li>
              <li>
                <h3>
                  <strong>Population: </strong>
                  {country.population.toLocaleString("en-US", {
                    maximumFractionDigits: 2,
                  })}
                </h3>
              </li>
              <li>
                <h3>
                  <strong>Region: </strong>
                  {country.region}
                </h3>
              </li>
              <li>
                <h3>
                  <strong>Sub Region: </strong>
                  {country.subregion}
                </h3>
              </li>
              <li>
                <h3>
                  <strong>Capital: </strong>
                  {country.capital}
                </h3>
              </li>
            </ul>
            <ul className="flex flex-col gap-2">
              <li>
                <h3>
                  <strong>Top Level Domain: </strong>
                  {country.topLevelDomain?.at(0)}
                </h3>
              </li>
              <li>
                <h3>
                  <strong>Currencies: </strong>
                  {country.currencies.map((currency) => (
                    <p className="pl-2" key={currency.code}>
                      - {currency.name}
                    </p>
                  ))}
                </h3>
              </li>
              <li>
                <h3>
                  <strong>Languages: </strong>
                  {country.languages.map((language) => (
                    <p className="pl-2" key={language.iso639_2}>
                      - {language.name}
                    </p>
                  ))}
                </h3>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="flex gap-8 items-center">
              <strong>Border Countries: </strong>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-center items-center">
                {country.borders?.map((border) => (
                  <Link
                    className={`pl-4 pr-4 pt-1 pb-1 rounded-sm drop-shadow-md ${
                      dark ? "bg-darkBlueDarkMode " : "bg-white"
                    }`}
                    to={`/country/${border.toLowerCase()}`}
                    key={border}
                  >
                    {
                      data?.find(
                        (country: CountriesInterface) =>
                          country.alpha3Code === border
                      ).name
                    }
                  </Link>
                ))}
              </div>
            </h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleCountryData;
