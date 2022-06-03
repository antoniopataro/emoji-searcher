import React, { useEffect } from "react";

import generalShortcuts from "../shortcuts/generalShortcuts";

import { useDispatch, useSelector } from "react-redux";
import { toggleModal } from "../redux/modalReducer";

import questionIcon from "../assets/questionIcon.svg";

import styled from "styled-components";

const HelpContainer = styled.div`
  #shortcuts-help {
    position: fixed;

    bottom: 10vh;
    left: 10vw;

    display: grid;
    place-items: center;

    width: 50px;
    height: 50px;

    border: none;
    border-radius: 4px;
    outline: none;

    cursor: pointer;
    background-color: ${(props) => props.theme.primary};

    img {
      filter: ${(props) => props.theme.filter};
    }
  }
`;
const ModalContainer = styled.div`
  position: fixed;

  z-index: 2;

  pointer-events: none;

  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;

  width: 100%;
  height: 100%;

  opacity: 0;

  background: rgba(0, 0, 0, 0.5);

  transition: 0.15s ease;
  transition-property: opacity;
`;
const Modal = styled.div`
  position: absolute;

  display: flex;
  flex-direction: column;

  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;

  width: 600px;
  height: 400px;

  align-items: center;
  justify-content: center;

  gap: 40px;

  transform: scale(1);

  border-radius: 10px;

  color: ${(props) => props.theme.text};
  background: ${(props) => props.theme.primary};

  transition: 0.15s ease;
  transition-property: opacity, transform;

  #close-modal-button {
    position: absolute;

    top: 20px;
    right: 20px;

    border: none;
    outline: none;

    font-family: "Inter", sans-serif;
    font-weight: 500;
    font-size: 14px;

    cursor: pointer;

    color: ${(props) => props.theme.text};
    background-color: transparent;

    filter: invert(20%);

    :hover {
      filter: none;
    }
  }

  #shortcuts {
    display: flex;
    flex-direction: column;

    gap: 20px;

    .shortcut {
      display: flex;
      flex-direction: row;

      align-items: center;

      gap: 10px;
    }

    .shortcut-keys {
      display: grid;
      place-items: center;

      width: 80px;

      padding: 6px 8px;

      border-radius: 4px;

      background-color: ${(props) => props.theme.background};
    }

    color: ${(props) => props.theme.text};
  }
`;

function Help() {
  const dispatch = useDispatch();

  const theme = useSelector((state) => state.theme.currentTheme);
  const modal = useSelector((state) => state.modal.showModal);

  function handleModal(action) {
    switch (action) {
      case "open":
        dispatch(toggleModal(true));
        return;
      case "close":
        dispatch(toggleModal(false));
        return;
    }
  }

  useEffect(() => {
    generalShortcuts(handleModal);
  }, []);

  const modalContainerStyles = {};
  const modalStyles = {};

  if (modal) {
    modalContainerStyles.pointerEvents = "auto";
    modalContainerStyles.opacity = 1;

    modalStyles.opacity = 1;
    modalStyles.transform = `scale(1.1)`;
  }

  return (
    <HelpContainer theme={theme}>
      <button id="shortcuts-help" onClick={() => handleModal("open")}>
        <img src={questionIcon} alt="Shortcuts" width={20} />
      </button>

      <ModalContainer style={modalContainerStyles} theme={theme}>
        <Modal style={modalStyles} theme={theme}>
          <button id="close-modal-button" onClick={() => handleModal("close")}>
            Close
          </button>

          <h2>Shortcuts</h2>

          <div id="shortcuts">
            <div className="shortcut">
              <div className="shortcut-keys">Ctrl + S</div>
              to focus on the input.
            </div>
            <div className="shortcut">
              <div className="shortcut-keys">Ctrl + Q</div>
              to change the theme.
            </div>
            <div className="shortcut">
              <div className="shortcut-keys">Ctrl + L</div>
              to clear the input.
            </div>
          </div>
        </Modal>
      </ModalContainer>
    </HelpContainer>
  );
}

export default Help;
