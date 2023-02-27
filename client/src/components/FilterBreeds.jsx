import { useDispatch } from "react-redux";
import { filterBreed } from "../redux/actions/actions";
import "../styles/filterBreed.css";

export default function FilterBreeds() {
  const dispatch = useDispatch();

  function onFilterBreeds(e) {
    e.preventDefault();
    dispatch(filterBreed(e.target.value));
  }

  return (
    <div>
      <select onChange={onFilterBreeds} className="select">
        <option value="All Breeds" key="All Breeds">
          All Breeds
        </option>
        <option value="Breeds" key="Breeds of API">
          Breeds
        </option>
        <option value="New Breeds" key="New Breeds">
          New Breeds
        </option>
        <option value="Weight -10" key="Weight -10">
          Weigth -10
        </option>
      </select>
    </div>
  );
}
