import React, { useState } from "react";

import emojis from "./emoji-list.js";

import "./App.css";
import styled from "styled-components";

const light = {
  primary: "#FFF",
  text: "#000",
  filter: "invert(25%)",
  background: "#F3F4F6",
};

const dark = {
  primary: "#303238",
  text: "#FFF",
  filter: "invert(50%)",
  background: "#1E2023",
};

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  min-height: 100vh;

  align-items: center;

  padding: 5vh 10vw;
  gap: 100px;

  background-color: ${(props) => props.theme.background};

  header {
    display: flex;
    flex-direction: row;

    width: 100%;

    justify-content: space-between;

    #search-bar {
      display: flex;
      flex-direction: row;

      width: 50%;
      height: 50px;

      align-items: center;

      padding: 20px;

      border-radius: 20px;

      background-color: ${(props) => props.theme.primary};

      input {
        font-family: "Poppins", sans-serif;
        font-size: 16px;

        border: none;
        outline: none;

        color: ${(props) => props.theme.text};
        background-color: transparent;
      }
    }

    button {
      border: none;
      outline: none;

      cursor: pointer;

      background-color: transparent;
    }
  }

  main {
    display: flex;
    flex-direction: column;

    align-items: center;

    width: 100%;

    gap: 100px;

    #hovered-emoji-display {
      display: flex;
      flex-direction: column;

      width: 150px;
      height: 150px;

      justify-content: center;
      align-items: center;

      gap: 20px;
      padding: 20px;

      outline: 1px solid ${(props) => props.theme.text};

      border-radius: 10px;

      cursor: pointer;

      font-size: 36px;

      #hovered-emoji-display-title {
        font-size: 14px;

        text-align: center;

        color: ${(props) => props.theme.text};
      }
    }

    #emojis-wrapper {
      display: grid;
      grid-template-columns: repeat(20, 1fr);

      width: 100%;

      padding: 1px;

      gap: 5px;

      overflow: scroll;
      white-space: nowrap;

      @media (max-width: 1024px) {
        grid-template-columns: repeat(15, 1fr);
      }

      @media (max-width: 768px) {
        grid-template-columns: repeat(7, 1fr);
      }

      @media (max-width: 375px) {
        grid-template-columns: repeat(5, 1fr);
      }
    }

    .emoji {
      display: flex;

      width: 50px;
      height: 50px;

      align-items: center;
      justify-content: center;

      border-radius: 5px;

      cursor: pointer;

      :hover {
        outline: 1px solid ${(props) => props.theme.text};
      }
    }
  }

  img {
    pointer-events: none;
    filter: ${(props) => props.theme.filter};
  }
`;

import themeIcon from "./assets/themeIcon.svg";
import githubIcon from "./assets/githubIcon.svg";

function App() {
  const [theme, setTheme] = useState(dark);
  const [query, setQuery] = useState("");
  const [hoveredEmoji, setHoveredEmoji] = useState(emojis[0]);

  const handleTheme = () => {
    theme === light ? setTheme(dark) : setTheme(light);
  };

  const filteredEmojis = emojis.filter((emoji) => {
    if (
      emoji.keywords.includes(query) ||
      emoji.symbol === query ||
      query === undefined
    ) {
      return emoji;
    }
    return;
  });

  const handleEmojiClick = (emoji) => {
    navigator.clipboard.writeText(emoji.symbol);
    alert(`Copied ${emoji.symbol} to clipboard!`);
  };

  return (
    <AppContainer theme={theme}>
      <header>
        <div id="search-bar">
          <input
            type="text"
            placeholder="Search for an emoji."
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <button onClick={handleTheme}>
          <img src={themeIcon} alt="Change Theme" width={30} />
        </button>
      </header>
      <main>
        <div
          id="hovered-emoji-display"
          onClick={() => handleEmojiClick(hoveredEmoji)}
        >
          <div>{hoveredEmoji.symbol}</div>
          <div id="hovered-emoji-display-title">{hoveredEmoji.title}</div>
        </div>
        <div id="emojis-wrapper">
          {filteredEmojis.map((emoji, index) => (
            <div
              key={index}
              className="emoji"
              onClick={() => handleEmojiClick(emoji)}
              onMouseOver={() => setHoveredEmoji(emoji)}
            >
              {emoji.symbol}
            </div>
          ))}
        </div>
      </main>
      <footer>
        <a
          href="https://github.com/antoniopataro/emoji-searcher"
          target="_blank"
        >
          <img src={githubIcon} alt="Github" width={30} />
        </a>
      </footer>
    </AppContainer>
  );
}

export default App;
