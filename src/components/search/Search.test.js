import React from "react";
import { shallow } from "enzyme";
import { InputGroup, Button, Icon } from "@blueprintjs/core";
import Search from "./Search";

const props = {
  getSearchResults: jest.fn()
};

describe("Search field", () => {
  it("whether the Search component renders", () => {
    const wrapper = shallow(<Search {...props} />);
    expect(wrapper.exists()).toBe(true);
  });

  it("should render one input field", () => {
    const wrapper = shallow(<Search {...props} />);
    const inputField = wrapper.find(InputGroup).length;
    expect(inputField).toBe(1);
  });

  it("should render one search icon", () => {
    const wrapper = shallow(<Search {...props} />);
    const icon = wrapper
      .find(InputGroup)
      .dive()
      .find(Icon).length;
    expect(icon).toBe(1);
  });

  it("should render one button", () => {
    const wrapper = shallow(<Search {...props} />);
    const button = wrapper
      .find(InputGroup)
      .dive()
      .find(Button).length;
    expect(button).toBe(1);
  });

  it("should check whether user can enter data in the search field", () => {
    const wrapper = shallow(<Search {...props} />);
    wrapper.find(InputGroup).simulate("change", {
      target: { value: "batman" }
    });
    const actual = "batman";
    const expected = wrapper.find(InputGroup).props().value;
    expect(expected).toEqual(actual);
  });
});
