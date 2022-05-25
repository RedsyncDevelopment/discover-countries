import React from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { CountriesInterface } from "../../states/store/createCountriesSlice";
import useStore from "../../states/store/useStore";
import NotFound from "../UI/404";
import Card from "../UI/Card";
import { ErrorComponent, LoadingComponent } from "../UI/QueryLoadingAndError";
import CountryInformation from "./CountryInformation";

function isError(error: unknown): error is Error {
  return error instanceof Error;
}

const Countries: React.FC<{
  onFilter: string;
  onSearch: string;
}> = ({ onFilter, onSearch }) => {
  let keyword = onSearch.toLowerCase();

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
      {onFilter === "filter" ? (
        <div className="grid md:gap-24 gap-20 xl:grid-cols-4 grid-rows-auto lg:grid-cols-3 md:grid-cols-2">
          {countries
            .filter((country: CountriesInterface) =>
              country.name.toLowerCase().includes(keyword)
            )
            .map((country: CountriesInterface) => (
              <Link
                key={country.alpha3Code}
                to={`country/${country.alpha3Code.toLowerCase()}`}
              >
                <Card>
                  <CountryInformation country={country}></CountryInformation>
                </Card>
              </Link>
            ))}
        </div>
      ) : (
        <div className="grid gap-24 xl:grid-cols-4 grid-rows-auto lg:grid-cols-3 md:grid-cols-2">
          {countries
            .filter(
              (country: CountriesInterface) => country.region === onFilter
            )
            .filter((country: CountriesInterface) =>
              country.name.toLowerCase().includes(keyword)
            )
            .map((country: CountriesInterface) => (
              <Link
                key={country.alpha3Code}
                to={`country/${country.alpha3Code.toLowerCase()}`}
              >
                <Card>
                  <CountryInformation country={country}></CountryInformation>
                </Card>
              </Link>
            ))}
        </div>
      )}
    </>
  );
};

export default Countries;
