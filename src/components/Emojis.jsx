import React, { useState, useRef } from "react";

import { useSelector } from "react-redux";

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

function Emojis() {
  const theme = useSelector((state) => state.theme.currentTheme);
  const query = useSelector((state) => state.query.userQuery);

  const filteredEmojis = emojis.filter((emoji) => {
    if (
      emoji.keywords.includes(query.toLowerCase()) ||
      emoji.symbol.includes(query.toLowerCase())
    ) {
      return emoji;
    }
    return;
  });

  const [copiedEmoji, setCopiedEmoji] = useState("");

  function handleCopyEmoji(emoji) {
    navigator.clipboard.writeText(emoji.symbol);
    setCopiedEmoji(emoji);
    notifyCopy();
  }

  const [itemBoundingBox, setItemBoundingBox] = useState(null);
  const [wrapperBoundingBox, setWrapperBoundingBox] = useState(null);
  const [highlightedItem, setHighlightedItem] = useState(null);
  const [isHoveredFromNull, setIsHoveredFromNull] = useState(null);

  const highlightRef = useRef(null);
  const wrapperRef = useRef(null);

  const positionHighlight = (e, emoji) => {
    setItemBoundingBox(e.target.getBoundingClientRect());
    setWrapperBoundingBox(wrapperRef.current.getBoundingClientRect());
    setIsHoveredFromNull(!highlightedItem);
    setHighlightedItem(emoji);
  };

  const resetHighlight = () => setHighlightedItem(null);

  const highlightStyles = {};

  if (itemBoundingBox && wrapperBoundingBox) {
    highlightStyles.transitionDuration = isHoveredFromNull ? "0ms" : "150ms";
    highlightStyles.opacity = highlightedItem ? 1 : 0;
    highlightStyles.width = `${itemBoundingBox.width}px`;
    highlightStyles.transform = `translate(${
      itemBoundingBox.left - wrapperBoundingBox.left
    }px) translateY(${itemBoundingBox.top - wrapperBoundingBox.top}px)`;
  }

  const [newToast, setNewToast] = useState(null);

  function notifyCopy() {
    setNewToast(true);

    setTimeout(() => {
      setNewToast(false);
    }, 2000);
  }

  const toastStyles = {};

  if (newToast) {
    toastStyles.opacity = 1;
    toastStyles.transform = `translateY(0px)`;
  }

  if (!newToast) {
    toastStyles.opacity = 0;
    toastStyles.transform = `translateY(30px)`;
  }

  return (
    <EmojisContainer
      theme={theme}
      ref={wrapperRef}
      onMouseLeave={resetHighlight}
    >
      <div id="emojis-wrapper">
        <div id="highlight" ref={highlightRef} style={highlightStyles}></div>
        {filteredEmojis.map((emoji, index) => (
          <div
            className="emoji"
            title={emoji.title}
            key={index}
            onMouseOver={(e) => positionHighlight(e, emoji)}
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
