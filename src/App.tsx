import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import NotFound from "./components/UI/404";
import ScrollToTop from "./components/UI/ScrollToTop";
import { ThemeProvider } from "./components/Context/ThemeContext";
import Country from "./components/SingleCountry/Country";
import Header from "./components/UI/Header";
import HomePage from "./pages/HomePage";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <ScrollToTop></ScrollToTop>
          <Header></Header>
          <Routes>
            <Route path="*" element={<NotFound></NotFound>}></Route>
            <Route path="/country/:slug" element={<Country />} />
            <Route path="/" element={<HomePage />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
