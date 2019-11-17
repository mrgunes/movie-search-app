import React from "react";
import { Spinner } from "@blueprintjs/core";
import styled from "styled-components";

import Search from "../components/search/Search";
import MovieListContainer from "./MovieListContainer";
import getData from "../api";
import { API_PATH } from "../config/constants";
import { homepageTitle } from "../config/appConfig";

export const SearchSection = styled.div`
  width: 100%;
  height: 250px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 4rem 4rem;
  background: #8e2de2; /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #4a00e0, #8e2de2);
  background: linear-gradient(to right, #4a00e0, #8e2de2);
`;

export const SmallHeading = styled.h1`
  color: #fff;
  margin-bottom: 38px;
`;

const SpinnerWrapper = styled.div`
  margin: 50px;
`;

class SearchContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.initialState;
  }

  initialState = {
    page: 0,
    totalResults: 0,
    totalPages: 0,
    loading: false,
    searchQuery: "",
    error: false,
    searchResults: []
  };

  /**
   * This function runs whenever user
   *  scrolls to the end of the page.
   */
  querySearchResult = () => {
    this.setState(prevState => ({
      /** Increment this.state.page until it becomes
       * greater than this.state.totalPages
       */
      page:
        prevState.totalPages >= prevState.page
          ? prevState.page + 1
          : prevState.page
    }));

    /**
     * If there are no more pages left to
     *  fetch, do not call API any more.
     */
    if (this.state.totalPages >= this.state.page) {
      this.getSearchResults(this.state.searchQuery, this.state.page);
    }
  };

  /**
   * Calculates scroll position on every scroll event.
   *
   * Detects whenever user hit the bottom of the page.
   * If detected, calls method which further calls API
   * calling method.
   */
  handleOnScroll = () => {
    const scrollTop =
      (document.documentElement && document.documentElement.scrollTop) ||
      document.body.scrollTop;

    const scrollHeight =
      (document.documentElement && document.documentElement.scrollHeight) ||
      document.body.scrollHeight;

    const clientHeight =
      document.documentElement.clientHeight || window.innerHeight;

    const scrolledToBottom =
      Math.ceil(scrollTop + clientHeight) >= scrollHeight;

    /**
     * Calls method to request for "more data" if:
     * a search operation is already conducted, and,
     * some pages already fetched, some are pending, and,
     * user hits the bottom of the page, and,
     * there are no pending requests waiting for API response.
     */
    if (
      this.state.searchQuery &&
      this.state.page &&
      scrolledToBottom &&
      this.state.loading === false
    ) {
      this.querySearchResult();
    }
  };

  componentDidMount() {
    window.addEventListener("scroll", this.handleOnScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleOnScroll);
  }

  /**
   * @param {*} searchQuery search query entered by user
   *
   * Calls movie API
   */
  getSearchResults = (searchQuery, page) => {
    if (searchQuery === "" && page === 1) {
      this.setState(this.initialState);
      return;
    }

    /**
     * page equals to 1 means a new query,
     * therefore, state must reset
     */
    if (page === 1) {
      this.setState({
        ...this.initialState,
        loading: true
      });
    } else {
      this.setState({
        loading: true
      });
    }

    /** Constructing the required URL. */
    const requestUrl = `${API_PATH}${searchQuery}&page=${page}`;

    /** Sends request using GET method and expects promise in response */
    getData(requestUrl).then(response => {
      if (response.statusCode === 200) {
        /**
         * Disabling eslint camelcase rule because property names returned by
         * endpoint are not in camelcase
         */

        /* eslint-disable camelcase */
        const { total_pages, total_results, results } = response.data;
        this.setState(prevState => ({
          searchQuery,
          page,
          totalPages: total_pages,
          totalResults: total_results,
          searchResults: [...prevState.searchResults, ...results],
          loading: false
        }));
      } else {
        this.setState({ loading: false, error: true });
      }
    });
    // }
  };

  /**
   * Show spinner/loader while
   * data is being fetched from API.
   */
  showLoader = (
    <SpinnerWrapper>
      <Spinner size={40} value={null} />
    </SpinnerWrapper>
  );

  render() {
    const { page, totalResults, loading, error, searchResults } = this.state;
    return (
      <>
        <SearchSection>
          <SmallHeading>{homepageTitle}</SmallHeading>
          <Search
            getSearchResults={(searchQuery, pageNumber) =>
              this.getSearchResults(searchQuery, pageNumber)
            }
          />
        </SearchSection>

        {/** Show loader/spinner as soon as request is triggered. 
          Show movie list when data is fetched */}
        {!page && !totalResults && loading ? (
          this.showLoader
        ) : (
          <MovieListContainer
            error={error}
            page={page}
            searchResults={searchResults}
            totalResults={totalResults}
          />
        )}

        {/** Loader/Spinner shows when user hits the bottom of 
          the page and request for more data is triggered */}
        {page && totalResults && loading ? this.showLoader : ""}
      </>
    );
  }
}

export default SearchContainer;
