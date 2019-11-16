import React from "react";
import { shallow } from "enzyme";
import MovieList from "./MovieList";
import MovieInstance from "../movieInstance/MovieInstance";

const props = {
  movieList: [
    {
      original_title: "avatar",
      overview: "A great movie",
      release_date: "2009-12-10",
      original_language: "en",
      poster_path: "/kmcqlZGaSh20zpTbuoF0Cdn07dT.jpg"
    }
  ]
};

describe("Movie list", () => {
  it("should render MovieList component", () => {
    const wrapper = shallow(<MovieList {...props} />);
    expect(wrapper.exists()).toBe(true);
  });

  it("should render number of items same as length of movieList prop", () => {
    const wrapper = shallow(<MovieList {...props} />);
    expect(wrapper.find(MovieInstance).length).toEqual(props.movieList.length);
  });

  it("should not render any items if movieList prop is not an array", () => {
    const localProps = "a";
    const wrapper = shallow(<MovieList {...localProps} />);
    expect(wrapper.find(MovieInstance).length).toEqual(0);
  });
});
