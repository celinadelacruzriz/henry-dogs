import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import Landing from "../components/Landing";

configure({ adapter: new Adapter() });

describe("<Landing /> Component Testing", () => {
      describe("Estructura", () => {
            let wrapper;
            beforeEach(() => {
                  wrapper = shallow(<Landing />);
            });
            it("Renderiza un <Link> a /dogs", () => {
                  expect(wrapper.find("Link")).toHaveLength(1);
            });

      });
})

