import React from "react";
import { shallow } from "enzyme";
import MovieInstance, {
  MovieInstanceWrapper,
  MovieTitle,
  MovieOverview,
  AdditionalInfo,
  AdditionalInfoItem
} from "./MovieInstance";

const props = {
  title: "Avatar",
  overview: "What a great movie!",
  language: "en",
  releaseDate: "2009-12-10",
  posterPath: "path/to/poster/poster.jpg"
};

describe("MovieInstance", () => {
  it("should render MovieInstance component", () => {
    const wrapper = shallow(<MovieInstance {...props} />);
    expect(wrapper.exists()).toBe(true);
  });

  describe("test presentational component styles", () => {
    it("should check styles of MovieInstanceWrapper", () => {
      const wrapper = shallow(<MovieInstanceWrapper />);
      expect(wrapper).toMatchSnapshot();
    });

    it("should check styles of MovieTitle", () => {
      const wrapper = shallow(<MovieTitle />);
      expect(wrapper).toMatchSnapshot();
    });

    it("should check styles of MovieOverview", () => {
      const wrapper = shallow(<MovieOverview />);
      expect(wrapper).toMatchSnapshot();
    });

    it("should check styles of AdditionalInfo", () => {
      const wrapper = shallow(<AdditionalInfo />);
      expect(wrapper).toMatchSnapshot();
    });

    it("should check styles of AdditionalInfoItem", () => {
      const wrapper = shallow(<AdditionalInfoItem />);
      expect(wrapper).toMatchSnapshot();
    });
  });
});
