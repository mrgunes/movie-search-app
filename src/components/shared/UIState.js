import React from "react";
import PropTypes from "prop-types";
import { Icon } from "@blueprintjs/core";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 48px 24px 0 24px;
`;

/**
 * Creating a styled component to add customcolor
 * prop to Blueprint's Icon element.
 */
const StyledIcon = styled(Icon)`
  color: ${props => (props.customcolor ? props.customcolor : "#000")};
`;

const UIState = ({
  icon,
  iconSize,
  intent = "none",
  customcolor = "#000",
  title,
  desc
}) => {
  return (
    <Wrapper>
      <StyledIcon
        icon={icon}
        iconSize={iconSize}
        intent={intent}
        customcolor={customcolor}
      />
      <br />
      <h3>{title}</h3>
      <p>{desc}</p>
    </Wrapper>
  );
};

UIState.propTypes = {
  icon: PropTypes.string,
  iconSize: PropTypes.string,
  intent: PropTypes.string,
  customcolor: PropTypes.string,
  title: PropTypes.string,
  desc: PropTypes.string
};

export default UIState;
