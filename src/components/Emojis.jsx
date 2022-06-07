import React, { useState, useRef, useContext, useEffect } from "react";
import { ThemeContext } from "./App.jsx";

import emojis from "../emoji-list.js";

import styled from "styled-components";

const EmojisContainer = styled.main`
  width: 60vw;

  #emojis-wrapper {
    position: relative;

    display: grid;
    grid-column: 2;
    grid-template-columns: repeat(auto-fit, minmax(50px, 1fr));

    #highlight {
      position: absolute;

      z-index: 0;

      top: 0;
      left: 0;

      height: 50px;

      border-radius: 4px;

      background: ${(props) => props.theme.primary};

      transition: 0.15s ease;
      transition-property: width, transform, opacity;
    }

    .emoji {
      display: grid;
      place-items: center;

      z-index: 1;

      width: 50px;
      height: 50px;

      border-radius: 4px;

      cursor: pointer;

      font-size: 24px;

      background-color: transparent;

      :hover {
        background-color: ${(props) => props.theme.primary};
      }
    }
  }
`;
const Toast = styled.div`
  position: fixed;

  display: grid;
  place-items: center;

  z-index: 1;

  bottom: 30px;
  right: 30px;

  padding: 20px 40px;

  border-radius: 10px;

  color: ${(props) => props.theme.text};
  background: ${(props) => props.theme.primary};

  opacity: 0;

  transform: translateY(30px);

  transition: 0.15s ease;
  transition-property: opacity, transform;
`;

function Emojis({ query }) {
  const { theme } = useContext(ThemeContext);

  const [newToast, setNewToast] = useState(null);
  const [copiedEmoji, setCopiedEmoji] = useState("");

  const filteredEmojis = emojis.filter((emoji) => {
    if (
      emoji.keywords.includes(query.toLowerCase()) ||
      emoji.symbol.includes(query.toLowerCase())
    ) {
      return emoji;
    }
    return;
  });

  function handleCopyEmoji(emoji) {
    setCopiedEmoji(emoji);
    notifyCopy();
  }

  function notifyCopy() {
    setNewToast(true);

    setTimeout(() => {
      setNewToast(false);
    }, 2000);
  }

  const copyEmojiToUserClipboard = useEffect(() => {
    navigator.clipboard.writeText(copiedEmoji.symbol);
  }, [copiedEmoji]);

  const toastStyles = {};

  if (newToast) {
    toastStyles.opacity = 1;
    toastStyles.transform = `translateY(0px)`;
  }

  return (
    <EmojisContainer theme={theme}>
      <div id="emojis-wrapper">
        {filteredEmojis.map((emoji, index) => (
          <div
            className="emoji"
            title={emoji.title}
            key={index}
            onClick={() => handleCopyEmoji(emoji)}
            data-aos="fade-up"
          >
            {emoji.symbol}
          </div>
        ))}
      </div>
      <Toast style={toastStyles} theme={theme}>
        <div>Emoji {copiedEmoji.symbol} Copied</div>
      </Toast>
    </EmojisContainer>
  );
}

export default Emojis;
