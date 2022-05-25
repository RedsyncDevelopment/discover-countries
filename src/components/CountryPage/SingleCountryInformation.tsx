import React, { useContext } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../states/context/ThemeContext";
import { CountriesInterface } from "../../states/store/createCountriesSlice";
import useStore from "../../states/store/useStore";
import NotFound from "../UI/404";
import { ErrorComponent, LoadingComponent } from "../UI/QueryLoadingAndError";

function isError(error: unknown): error is Error {
  return error instanceof Error;
}

interface SingleCountryInformationProps {
  country: CountriesInterface;
}

const SingleCountryInformation: React.FC<SingleCountryInformationProps> = ({
  country,
}) => {
  const { dark } = useContext(ThemeContext);
  const countries = useStore((state) => state.countries);
  const getCountries = useStore((state) => state.getCountries);
  const { isLoading, status, error } = useQuery(`country`, () =>
    getCountries()
  );

  if (isLoading) return <LoadingComponent></LoadingComponent>;
  if (!countries) return <NotFound></NotFound>;
  if (status === "error")
    if (isError(error)) return <ErrorComponent></ErrorComponent>;

  return (
    <>
      <div className="pt-12 grid lg:grid-cols-2 grid-cols-1 sm:gap-24 gap-16 items-center">
        {
          // Preventing Layout shift while Image is loading
        }
        <div className="relative pt-[50%]">
          <img
            src={country.flags.svg}
            alt={`Flag of ${country.name}`}
            className="absolute drop-shadow-md w-full top-0 left-0 object-cover"
          />
        </div>
        <div>
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
                      countries?.find(
                        (country: CountriesInterface) =>
                          country.alpha3Code === border
                      )?.name
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

export default SingleCountryInformation;
