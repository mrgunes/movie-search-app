import React from "react";
import PropTypes from "prop-types";
import { Card, Icon } from "@blueprintjs/core";
import styled from "styled-components";
import moment from "moment";
import languages from "../../config/languages";
import { POSTER_BASE_PATH } from "../../config/constants";
import { noDesc, noDate } from "../../config/appConfig";
import utils from "../../utils/utils";

const { getLanguageName } = utils;

/**
 * Extends styles of "Card" component of
 * Blueprintjs using styled-components.
 */
export const MovieInstanceWrapper = styled(Card)`
  width: 700px;
  margin: 20px;
  border-radius: 10px;
  color: rgb(66, 82, 110);
  padding: 12px 24px 24px 24px;

  @media (max-width: 414px) {
    width: 345px;
  }

  @media (max-width: 375px) {
    width: 300px;
  }
`;

/**
 * Creates MovieTitle component with
 * following styles using styled-components.
 */
export const MovieTitle = styled.div`
  font-weight: 600;
  font-size: 28px;
  font-variant-caps: all-petite-caps;
`;

export const MovieOverview = styled.div`
  line-height: 1.5;
`;

export const AdditionalInfo = styled.div`
  display: flex;
  padding: 10px 0px 12px 0px;
  font-weight: 700;
  font-size: 14px;
  color: rgba(66, 82, 110, 0.48);

  @media (max-width: 414px) {
    padding: 16px 0px 16px 0px;
  }
`;

export const AdditionalInfoItem = styled.div`
  padding-right: 40px;
  .infoItemIcon {
    padding-right: 10px;
  }

  @media (max-width: 414px) {
    &:last-child {
      padding-right: 0;
    }
  }
`;

const MovieInstance = ({
  title,
  overview = { noDesc },
  language,
  releaseDate,
  posterPath
}) => {
  return (
    <MovieInstanceWrapper elevation={0} interactive={true}>
      <MovieTitle>{title}</MovieTitle>

      <AdditionalInfo>
        <AdditionalInfoItem>
          <Icon className="infoItemIcon" icon="translate" />
          {getLanguageName(language, languages)}
        </AdditionalInfoItem>
        <AdditionalInfoItem>
          <Icon className="infoItemIcon" icon="calendar" />
          {Number.isNaN(moment(releaseDate, "YYYY-MM-DD").year())
            ? noDate
            : moment(releaseDate, "YYYY-MM-DD").year()}
        </AdditionalInfoItem>
        <AdditionalInfoItem>
          {posterPath ? (
            <a
              href={`${POSTER_BASE_PATH}${posterPath}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Poster
            </a>
          ) : (
            ""
          )}
        </AdditionalInfoItem>
      </AdditionalInfo>

      <MovieOverview>{overview}</MovieOverview>
    </MovieInstanceWrapper>
  );
};

MovieInstance.propTypes = {
  title: PropTypes.string,
  overview: PropTypes.string,
  language: PropTypes.string,
  releaseDate: PropTypes.string,
  posterPath: PropTypes.string
};

export default MovieInstance;
