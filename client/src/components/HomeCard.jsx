import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { delete_dog } from "../redux/actions/actions";
import "../styles/homeCard.css";

export default function HomeCard({
  id,
  img,
  name,
  weightMin,
  weightMax,
  temperament,
}) {
  let dispatch = useDispatch();

  function onClose(id) {
    dispatch(delete_dog(id));
  }
  return (
    <div className="cardComp">
      <div key={id}>
        <button
          onClick={() => {
            onClose(id);
          }}
          className="btnClose">
          X
        </button>
      </div>
      <img src={img} width="150px" height="150px" alt="img" />
      <Link to={`/dogs/${id}`}>
        <h3>{name}</h3>
      </Link>
      <h5 className="typeOfT">
        Weight: Min: {weightMin}/kg - Max: {weightMax}/kg
        <br></br>
        Temperament: {temperament}
      </h5>
    </div>
  );
}
