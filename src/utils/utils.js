const utils = {
  /**
   * @param {string} languageCode The language code of movie
   * received from API.
   *
   * @param {Array.<Object>} languageList List of languages against
   * which language code of each movie is checked and full language
   * name retrieved.
   */
  getLanguageName: (languageCode, languageList) => {
    const languageArr = languageList.filter(
      language => language.code === languageCode
    );
    return languageArr[0] ? languageArr[0].name : languageCode;
  }
};

export default utils;
