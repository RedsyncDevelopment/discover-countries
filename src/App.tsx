import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import NotFound from "./components/UI/404";
import Layout from "./components/UI/Layout";
import ScrollToTop from "./components/UI/ScrollToTop";
import CountryPage from "./pages/CountryPage";
import HomePage from "./pages/HomePage";
import { ThemeProvider } from "./states/context/ThemeContext";

const queryClient = new QueryClient();

function App() {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <ScrollToTop></ScrollToTop>
          <Layout></Layout>
          <Routes>
            <Route path="*" element={<NotFound></NotFound>}></Route>
            <Route path="/country/:slug" element={<CountryPage />} />
            <Route path="/" element={<HomePage />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
