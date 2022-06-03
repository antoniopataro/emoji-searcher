import React from "react";

import Header from "./Header";
import Emojis from "./Emojis";
import Footer from "./Footer";
import Help from "./Help";

import { useSelector } from "react-redux";

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

function App() {
  const theme = useSelector((state) => state.theme.currentTheme);

  return (
    <AppContainer theme={theme}>
      <Header />
      <Emojis />
      <Footer />
      <Help />
    </AppContainer>
  );
}

export default App;
