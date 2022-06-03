import React from "react";

import { useSelector } from "react-redux";

import githubIcon from "../assets/social/githubIcon.svg";
import linkedinIcon from "../assets/social/linkedinIcon.svg";
import instagramIcon from "../assets/social/instagramIcon.svg";

import styled from "styled-components";

const FooterContainer = styled.footer`
  display: grid;
  place-items: center;

  width: 60vw;

  gap: 20px;

  padding: 100px 0;

  #social {
    display: flex;
    flex-direction: row;

    gap: 20px;
  }

  a {
    text-decoration: none;
    color: ${(props) => props.theme.text};

    img {
      filter: ${(props) => props.theme.filter};

      :hover {
        filter: ${(props) => props.theme.hoveredFilter};
      }
    }
  }
`;

function Footer() {
  const theme = useSelector((state) => state.theme.currentTheme);

  return (
    <FooterContainer theme={theme}>
      <div id="social">
        <a href="https://github.com/antoniopataro" target="_blank">
          <img src={githubIcon} alt="Github" width={30} />
        </a>
        <a href="https://www.linkedin.com/in/antoniopataro/" target="_blank">
          <img src={linkedinIcon} alt="LinkedIn" width={30} />
        </a>
        <a href="https://www.instagram.com/antoniopataro/" target="_blank">
          <img src={instagramIcon} alt="Instagram" width={30} />
        </a>
      </div>

      <a href="https://antoniopataro.dev/" target="_blank">
        https://antoniopataro.dev/
      </a>
    </FooterContainer>
  );
}

export default Footer;
