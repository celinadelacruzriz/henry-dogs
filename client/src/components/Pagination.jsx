import React from "react";
import "../styles/pagination.css";

export default function Pagination({
  postPerPage,
  totalPost,
  paginate,
  currentPage,
}) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPost / postPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <button
        className="pageButton"
        onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}>
        PREV
      </button>
      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => paginate(number)}
          className={
            currentPage === number ? `pageButton itemSelected` : `pageButton`
          }>
          {number}
        </button>
        // <button
        //   key={number}
        //   className="page-item"
        //   onClick={() => paginate(number)}>
        //   {number}
        // </button>
      ))}

      <button
        className="pageButton"
        onClick={() =>
          paginate(
            currentPage < pageNumbers.length
              ? currentPage + 1
              : pageNumbers.length
          )
        }>
        NEXT
      </button>
    </div>
  );
}
