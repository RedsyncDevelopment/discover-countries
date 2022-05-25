import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import NotFound from "../UI/404";
import { ErrorComponent, LoadingComponent } from "../UI/QueryLoadingAndError";
import ScrollToTop from "../UI/ScrollToTop";
import SingleCountryInformation from "./SingleCountryInformation";

function isError(error: unknown): error is Error {
  return error instanceof Error;
}

const Country = () => {
  const { slug } = useParams();
  const { data, isLoading, error, status } = useQuery(`country-${slug}`, () =>
    axios
      .get(`https://restcountries.com/v2/alpha/${slug}`)
      .then((res) => res.data)
  );

  if (isLoading) return <LoadingComponent></LoadingComponent>;
  if (!data) return <NotFound></NotFound>;
  if (status === "error")
    if (isError(error)) return <ErrorComponent></ErrorComponent>;

  return (
    <>
      <ScrollToTop></ScrollToTop>
      <SingleCountryInformation country={data}></SingleCountryInformation>
    </>
  );
};

export default Country;
