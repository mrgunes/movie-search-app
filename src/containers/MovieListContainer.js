import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import UIState from "../components/shared/UIState";
import MovieList from "../components/movieList/MovieList";
import {
  noResultsFoundLabel,
  noResultsFoundDesc,
  initialStateLabel,
  initialStateDesc,
  errorOccurredLabel,
  errorOccurredDesc
} from "../config/appConfig";

const MovieListWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 24px 24px 0 24px;

  @media (max-width: 414px) {
    text-align: center;
  }
`;

/** Placeholder to show when no results found */
const noResultsFound = (
  <UIState
    icon="error"
    iconSize="50"
    intent="warning"
    title={noResultsFoundLabel}
    desc={noResultsFoundDesc}
  />
);

/** Placeholder to show when a network error occurs */
const errorOccurred = (
  <UIState
    icon="error"
    iconSize="50"
    intent="danger"
    title={errorOccurredLabel}
    desc={errorOccurredDesc}
  />
);

/** Placeholder to show after the page loads. */
const initialState = (
  <UIState
    icon="film"
    iconSize="80"
    customcolor="#8A9BA8"
    title={initialStateLabel}
    desc={initialStateDesc}
  />
);

const MovieListContainer = ({ error, page, searchResults, totalResults }) => {
  return (
    <>
      {/** Initial state: When no search operation is done after page load. */}
      {!page && !totalResults && !error ? initialState : ""}

      {/** When a search query yields no results. */}
      {page === 1 && !totalResults && !error ? noResultsFound : ""}

      {/** In case a network error occurs */}
      {error ? errorOccurred : ""}

      {/** When a search query gets matching results. */}
      {searchResults.length > 0 && totalResults > 0 && !error ? (
        <MovieListWrapper>
          <MovieList movieList={searchResults} />
        </MovieListWrapper>
      ) : (
        ""
      )}
    </>
  );
};

MovieListContainer.propTypes = {
  error: PropTypes.bool,
  page: PropTypes.number,
  searchResults: PropTypes.array,
  totalResults: PropTypes.number
};

export default MovieListContainer;
