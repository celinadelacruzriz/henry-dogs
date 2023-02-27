import { Link } from "react-router-dom";
import SearchName from "./SearchName";
import FilterTemperaments from "./FilterTemperaments";
import Orders from "./Orders";
import FilterBreeds from "./FilterBreeds";
import "../styles/nav.css";

export default function Nav({ paginate }) {
  return (
    <div className="nav">
      <Link to="/">
        <button className="button">Landing Page</button>
      </Link>
      <button onClick={() => window.location.reload()} className="button">
        Home
      </button>

      <SearchName paginate={paginate} />

      <Orders paginate={paginate} />

      <FilterBreeds paginate={paginate} />

      <FilterTemperaments paginate={paginate} />

      <Link to="/newBreed">
        <button className="button">Add New Breed</button>
      </Link>
    </div>
  );
}
