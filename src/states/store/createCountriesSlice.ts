import axios from "axios";
import { GetState, SetState } from "zustand";
import { StoreState } from "./useStore";

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

export interface CountriesSlice {
  countries: CountriesInterface[];
  getCountries: () => void;
}

const createCountriesSlice = (
  set: SetState<StoreState>,
  get: GetState<StoreState>
) => ({
  countries: [],
  getCountries: async () => {
    const response = await axios.get("https://restcountries.com/v2/all");
    set({
      countries: response.data,
    });
  },
});

export default createCountriesSlice;
