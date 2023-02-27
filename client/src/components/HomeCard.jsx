import { Link } from "react-router-dom";
import "../styles/homeCard.css";

export default function HomeCard({
  id,
  img,
  name,
  weightMin,
  weightMax,
  temperament,
}) {
  return (
    <div className="cardComp">
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
