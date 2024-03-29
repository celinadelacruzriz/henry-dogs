import { useState } from "react";
import { useDispatch } from "react-redux";
import { getBreedsName } from "../redux/actions/actions";
import "../styles/search.css";

export default function SearchBreed({ paginate }) {
  const [search, setSearch] = useState("");
  let dispatch = useDispatch();

  function onSubmit(e) {
    e.preventDefault();
    if (!search) return alert("Breed is require");
    dispatch(getBreedsName(search));
    setSearch("");
  }

  function onInputChange(e) {
    e.preventDefault();
    setSearch(e.target.value);
    paginate(1);
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Search breed"
          onChange={onInputChange}
          value={search}
          className="input"
        />
        <input type="submit" value="Buscar" className="buttonSearch" />
      </form>
    </div>
  );
}
