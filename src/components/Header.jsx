import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import headerShortcuts from "../shortcuts/headerShortcuts";

import { setQuery } from "../redux/queryReducer";
import { toggleTheme } from "../redux/themeReducer";

import closeIcon from "../assets/closeIcon.svg";
import themeIcon from "../assets/themeIcon.svg";
import searchIcon from "../assets/searchIcon.svg";

import styled from "styled-components";

const HeaderContainer = styled.header`
  display: flex;
  flex-direction: column;

  width: 60vw;

  align-items: center;
  justify-content: space-between;

  gap: 50px;
  padding: 100px 0;

  #header-top {
    display: grid;
    place-items: center;
    width: 100%;

    #title {
      display: flex;
      flex-direction: row;

      align-items: center;
      justify-content: center;

      gap: 10px;

      color: ${(props) => props.theme.text};

      #logo {
        animation: logoAnimation 1.5s infinite alternate ease-in-out;

        @keyframes logoAnimation {
          100% {
            transform: rotate(-10deg);
          }
          0% {
            transform: rotate(10deg);
          }
        }
      }
    }
  }

  #header-bottom {
    display: flex;
    flex-direction: row;

    width: 100%;

    align-items: center;
    justify-content: space-between;

    #header-left {
      display: flex;
      flex-direction: row;

      align-items: center;

      gap: 20px;

      #search-bar {
        display: flex;
        flex-direction: row;

        width: 400px;
        height: 50px;

        align-items: center;

        gap: 20px;
        padding: 20px;

        border-radius: 10px;

        background-color: ${(props) => props.theme.primary};

        transition: 0.15s ease;
        transition-property: transform;

        :focus-within {
          transform: scale(1.025);
        }

        img {
          pointer-events: none;
          filter: ${(props) => props.theme.filter};
        }

        button {
          border: none;
          outline: none;

          cursor: pointer;

          background-color: transparent;
        }

        input {
          width: 100%;

          border: none;
          outline: none;

          font-family: "Inter", sans-serif;
          font-size: 16px;

          color: ${(props) => props.theme.text};
          background-color: transparent;
        }
      }

      #search-shortcut {
        display: flex;
        flex-direction: row;

        align-items: center;

        gap: 10px;

        #press {
          filter: ${(props) => props.theme.filter};
          color: ${(props) => props.theme.text};
        }

        #key {
          display: grid;
          place-items: center;

          width: fit-content;
          height: 30px;

          padding: 0 8px;

          border-radius: 4px;

          color: ${(props) => props.theme.text};
          background-color: ${(props) => props.theme.primary};
        }
      }
    }
  }

  #toggle-theme {
    width: 50px;
    height: 50px;

    border: none;
    outline: none;

    cursor: pointer;

    border-radius: 4px;
    background-color: transparent;

    transition: 0.15s ease;
    transition-property: background-color;

    :hover {
      background-color: ${(props) => props.theme.primary};
    }

    img {
      pointer-events: none;
      filter: ${(props) => props.theme.filter};
    }
  }
`;

function Header() {
  const dispatch = useDispatch();
  const inputRef = useRef();

  const theme = useSelector((state) => state.theme.currentTheme);
  const query = useSelector((state) => state.query.userQuery);

  function handleQuery(content) {
    dispatch(setQuery(content));
  }

  function changeTheme() {
    const storagedTheme = localStorage.getItem("userTheme");

    if (storagedTheme !== null) {
      dispatch(toggleTheme(storagedTheme === "dark" ? "light" : "dark"));
    } else {
      dispatch(toggleTheme("light"));
    }
  }

  useEffect(() => {
    headerShortcuts(inputRef, handleQuery, changeTheme);
  }, []);

  return (
    <HeaderContainer theme={theme}>
      <div id="header-top">
        <div id="title">
          <div id="logo" style={{ fontSize: "24px" }}>
            🔎
          </div>
          <h1>Emoji Searcher</h1>
        </div>
      </div>
      <div id="header-bottom">
        <div id="header-left">
          <div id="search-bar">
            <img src={searchIcon} alt="Search Emoji" width={20} />
            <input
              ref={inputRef}
              type="text"
              onChange={(e) => handleQuery(e.target.value)}
              value={query}
              placeholder="Search an emoji here."
            />
            <button onClick={() => handleQuery("")}>
              <img src={closeIcon} alt="Clear" width={20} />
            </button>
          </div>
          <div id="search-shortcut">
            <div id="press">Press</div>
            <div id="key">Ctrl + S</div>
          </div>
        </div>
        <button id="toggle-theme" onClick={() => changeTheme()}>
          <img src={themeIcon} alt="Toggle Theme" width={20} />
        </button>
      </div>
    </HeaderContainer>
  );
}

export default Header;
