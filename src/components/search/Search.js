import React from "react";
import PropTypes from "prop-types";
import { InputGroup, Button } from "@blueprintjs/core";
import styled from "styled-components";

/**
 * Creates SearchField from "form" element
 * using styled-components
 */
const SearchField = styled.form`
  width: 450px;

  @media (max-width: 414px) {
    width: 350px;
  }

  @media (max-width: 375px) {
    width: 320px;
  }
`;

class Search extends React.Component {
  constructor(props) {
    super(props);

    /** Initial state */
    this.state = {
      searchQuery: ""
    };
  }

  /**
   * Gets value from movie search input
   * field through onChange event
   */
  getInputValue = e => {
    this.setState(
      {
        searchQuery: e.target.value
      },
      () => {
        /**
         * When the input field is cleared, show the default state
         */
        if (this.state.searchQuery === "") {
          this.props.getSearchResults(this.state.searchQuery, 1);
        }
      }
    );
  };

  triggerSearchRequest = e => {
    e.preventDefault();
    this.props.getSearchResults(this.state.searchQuery, 1);
  };

  /**
   * This button when clicked, triggers
   * a request to movies API
   */
  searchButton = (
    <Button
      intent={"SUCCESS"}
      className="inputSearchField"
      rightIcon="arrow-right"
      text="Search"
      onClick={this.triggerSearchRequest}
    />
  );

  render() {
    return (
      <SearchField onSubmit={this.triggerSearchRequest}>
        <InputGroup
          large={true}
          leftIcon="search"
          onChange={this.getInputValue}
          placeholder="Type movie name here"
          round={true}
          type="search"
          intent="none"
          rightElement={this.searchButton}
          value={this.state.searchQuery}
        />
      </SearchField>
    );
  }
}

Search.propTypes = {
  getSearchResults: PropTypes.func.isRequired
};

export default Search;
