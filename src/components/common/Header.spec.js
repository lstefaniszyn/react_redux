import React from "react";
import { shallow, mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import { Header } from "./Header";

// Note how with shallow render you search for the React component tag
it("contains 3 NavLinks via shallow", () => {
  const wrapper = shallow(<Header />);
  console.log(wrapper.debug());
  expect(wrapper.find("NavLink").length).toEqual(3);
});

// Note how with mount you search for the final rendered HTML since it generates the final DOM.
// We also need to pull in React Router's memoryRouter for testing since the Header expects to have React Router's props passed in.
it("contains 3 anchors via mount", () => {
  const wrapper = mount(
    <MemoryRouter>
      <Header />
    </MemoryRouter>
  );
  console.log(wrapper.debug());
  expect(wrapper.find("a").length).toEqual(3);
});
