import React from "react";
import PropTypes from "prop-types";

import MovieInstance from "../movieInstance/MovieInstance";

const MovieList = ({ movieList }) => {
  return (
    <>
      {/** Looping through array to generate movie list on page */}
      {Array.isArray(movieList) && movieList.length > 0
        ? movieList.map((movie, index) => {
            return (
              <MovieInstance
                key={index}
                title={movie.original_title}
                overview={movie.overview}
                language={movie.original_language}
                releaseDate={movie.release_date}
                posterPath={movie.poster_path}
              />
            );
          })
        : ""}
    </>
  );
};

MovieList.propTypes = {
  movieList: PropTypes.array
};

export default MovieList;
