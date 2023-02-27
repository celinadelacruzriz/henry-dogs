import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getBreedsId } from "../redux/actions/actions";
import loading from "../images/loading.jpg";
import "../styles/detail.css";

export default function Detail(_props) {
  // al usar useParms, props queda obsoleto, se corrige rapido con guin bajo
  const dispatch = useDispatch();
  const breedId = useSelector((state) => state.breedsDetail);

  const { id } = useParams();
  useEffect(() => {
    dispatch(getBreedsId(id));
  }, [id, dispatch]);
  console.log(breedId);
  return (
    <div className="contDetail">
      <div className="nav">
        <Link to="/dogs">
          <button className="button">Home</button>
        </Link>
        <Link to="/newBreed">
          <button className="button ">Create Breed</button>
        </Link>
      </div>
      <div className="back">
        {breedId.length === 0 ? (
          <div>
            <img className="img" src={loading} alt="loading" />{" "}
          </div>
        ) : (
          <div>
            {breedId.map((breedId) => {
              return (
                <div key={breedId.id}>
                  <div className="parr">
                    <img className="img" src={breedId.image} alt="img" />
                    <h3>Name: {breedId.name}</h3>
                    <div>
                      <h4>Weight:</h4>{" "}
                      <p>
                        Min: {breedId.weightMin}/kg - Max: {breedId.weightMax}
                        /kg
                      </p>
                    </div>
                    <div>
                      <h4>Height:</h4>{" "}
                      <p>
                        Min: {breedId.heightMin}/cm - Max: {breedId.heightMax}
                        /cm
                      </p>
                    </div>
                    <div>
                      <h4>Life-Span:</h4>
                      <p>
                        Min: {breedId.life_span_min} - Max:{" "}
                        {breedId.life_span_max}
                      </p>
                    </div>
                    <div>
                      <h4>Temperaments:</h4>
                      <p>{breedId.temperament}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
