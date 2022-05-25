import create from "zustand";
import createCountriesSlice, { CountriesSlice } from "./createCountriesSlice";

export type StoreState = CountriesSlice;

const useStore = create<StoreState>((set, get) => ({
  ...createCountriesSlice(set, get),
}));

export default useStore;
