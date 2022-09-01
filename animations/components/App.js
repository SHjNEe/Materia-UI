import React from "react";
import Header from "./ui/Header";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./ui/Theme";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import HomePage from "./HomePage";
import Services from "./Services";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Services />} />
          <Route path="/info" element={<Services />} />
          <Route path="/profile" element={<Services />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
