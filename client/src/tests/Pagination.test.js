import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import Pagination from "../components/Pagination";



configure({ adapter: new Adapter() });

describe("<Paginate /> Component Testing", () => {
      describe("Estructura", () => {
            let wrapper;
            beforeEach(() => {
                  wrapper = shallow(<Pagination />);
            });
            it("Renderiza un <div> con las paginas a navegar", () => {
                  expect(wrapper.find("div")).toHaveLength(1);
            });

      });
})