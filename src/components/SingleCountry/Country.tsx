import axios from "axios";
import React, { useContext } from "react";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import { ThemeContext } from "../Context/ThemeContext";
import NotFound from "../UI/404";
import ScrollToTop from "../UI/ScrollToTop";
import SingleCountryData from "./SingleCountryData";

function isError(error: unknown): error is Error {
  return error instanceof Error;
}

const SingleCountry = () => {
  const { slug } = useParams();
  const { data, isLoading, error, status } = useQuery(`country-${slug}`, () =>
    axios
      .get(`https://restcountries.com/v2/alpha/${slug}`)
      .then((res) => res.data)
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
      <ScrollToTop></ScrollToTop>
      <SingleCountryData country={data}></SingleCountryData>
    </>
  );
};

const Country = () => {
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className={`${"w-4"} ${
                dark ? "fill-white" : "fill-darkBlueDarkMode"
              }`}
            >
              <path d="M512 256C512 273.7 497.7 288 480 288H160.1l0 72c0 9.547-5.66 18.19-14.42 22c-8.754 3.812-18.95 2.077-25.94-4.407l-112.1-104c-10.24-9.5-10.24-25.69 0-35.19l112.1-104c6.992-6.484 17.18-8.218 25.94-4.406C154.4 133.8 160.1 142.5 160.1 151.1L160.1 224H480C497.7 224 512 238.3 512 256z" />
            </svg>
            <span>Back to All</span>
          </div>
        </div>
      </Link>
      <SingleCountry></SingleCountry>
    </main>
  );
};

export default Country;
