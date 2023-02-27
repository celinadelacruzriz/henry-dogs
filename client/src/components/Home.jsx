import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getBreeds, clean } from "../redux/actions/actions";
import HomeCard from "./HomeCard.jsx";
import Nav from "./Nav.jsx";
import Pagination from "./Pagination.jsx";
import "../styles/home.css";

export default function Breeds() {
  let breeds = useSelector((state) => state.breeds);
  let dispatch = useDispatch();
  //console.log(breeds);

  useEffect(() => {
    dispatch(getBreeds());
    dispatch(clean());
  }, [dispatch]);

  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(8);

  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPosts = breeds.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="home">
      <div>
        <Nav paginate={paginate} />
      </div>
      <div className="center">
        <Pagination
          postPerPage={postPerPage}
          totalPost={breeds.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>
      <div>
        {breeds.length === 0 ? (
          <div>" "</div>
        ) : (
          <div className="homeCard">
            {currentPosts.map((e) => (
              <HomeCard
                key={e.id}
                id={e.id}
                img={e.image}
                name={e.name}
                weightMin={e.weightMin}
                weightMax={e.weightMax}
                temperament={e.temperament}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
