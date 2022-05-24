import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import NotFound from "../UI/404";
import Card from "../UI/Card";
import CountryHome from "./CountryHome";

function isError(error: unknown): error is Error {
  return error instanceof Error;
}

export interface CountriesInterface {
  name: string;
  alpha3Code: string;
  flags: {
    svg: string;
    png: string;
  };
  population: number;
  region: string;
  subregion: string;
  capital: string;
  nativeName?: string;
  topLevelDomain?: [];
  currencies: [
    {
      code: string;
      name: string;
    }
  ];
  languages: [
    {
      iso639_2: string;
      name: string;
    }
  ];
  borders?: [string];
}

const Countries: React.FC<{
  onFilter: string;
  onSearch: string;
}> = ({ onFilter, onSearch }) => {
  let keyword = onSearch.toLowerCase();
  const { data, isLoading, error, status } = useQuery(`country`, () =>
    axios.get(`https://restcountries.com/v2/all`).then((res) => res.data)
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
      {onFilter === "filter" ? (
        <div className="grid md:gap-24 gap-20 xl:grid-cols-4 grid-rows-auto lg:grid-cols-3 md:grid-cols-2">
          {data
            .filter((country: CountriesInterface) =>
              country.name.toLowerCase().includes(keyword)
            )
            .map((country: CountriesInterface) => (
              <Link
                key={country.alpha3Code}
                to={`country/${country.alpha3Code.toLowerCase()}`}
              >
                <Card>
                  <CountryHome country={country}></CountryHome>
                </Card>
              </Link>
            ))}
        </div>
      ) : (
        <div className="grid gap-24 xl:grid-cols-4 grid-rows-auto lg:grid-cols-3 md:grid-cols-2">
          {data
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
                  <CountryHome country={country}></CountryHome>
                </Card>
              </Link>
            ))}
        </div>
      )}
    </>
  );
};

export default Countries;
