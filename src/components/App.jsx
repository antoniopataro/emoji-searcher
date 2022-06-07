import React, { createContext, useEffect, useState } from "react";

import Header from "./Header";
import Emojis from "./Emojis";
import Footer from "./Footer";
import Help from "./Help";

import "../styles/App.css";

import styled from "styled-components";

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  min-height: 100vh;

  align-items: center;

  color: white;

  background-color: ${(props) => props.theme.background};
`;

const dark = {
  primary: "#303238",
  background: "#1E2023",
  text: "#D9D9D9",
  filter: "invert(50%)",
  hoveredFilter: "invert(100%)",
};
const light = {
  primary: "#FFF",
  background: "#D9D9D9",
  text: "#1E2023",
  filter: "invert(20%)",
  hoveredFilter: "invert(0%)",
};

export const ThemeContext = createContext();
const storagedTheme = JSON.parse(localStorage.getItem("userTheme"));

function App() {
  const [theme, setTheme] = useState(storagedTheme ? storagedTheme : dark);
  const [query, setQuery] = useState("");

  function toggleTheme() {
    theme === dark ? setTheme(light) : setTheme(dark);
  }

  useEffect(() => {
    localStorage.setItem("userTheme", JSON.stringify(theme));
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <AppContainer theme={theme}>
        <Header props={{ query, setQuery }} />
        <Emojis query={query} />
        <Footer />
        <Help />
      </AppContainer>
    </ThemeContext.Provider>
  );
}

export default App;
