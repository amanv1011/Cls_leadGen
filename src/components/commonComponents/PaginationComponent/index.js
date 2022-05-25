import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./paginationComponent.scss";
import { setActivePage } from "../../../redux/actions/paginationActions";

function PaginationComponent({
  dataPerPage,
  dataLength,
  pageLimit = 5,
  loader,
}) {
  const dispatch = useDispatch();
  const activePage = useSelector((state) => state.paginationStates.activePage);
  const [currentPage, setCurrentPage] = useState(activePage);
  const pages = Math.ceil(dataLength / dataPerPage);

  useEffect(() => {
    setCurrentPage(activePage);
  }, [activePage]);

  const goToNextPage = () => {
    setCurrentPage((page) => page + 1);
    dispatch(setActivePage(currentPage + 1));
  };

  const goToPreviousPage = () => {
    setCurrentPage((page) => page - 1);
    dispatch(setActivePage(currentPage - 1));
  };

  const changePage = (event) => {
    const pageNumber = Number(event.target.textContent);
    setCurrentPage(pageNumber);
    dispatch(setActivePage(pageNumber));
  };

  const getPaginationGroup = () => {
    let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
    return new Array(pageLimit).fill().map((_, index) => start + index + 1);
  };

  if (loader || pages === 0) {
    return "";
  } else {
    return (
      <div className="pagination">
        <button
          onClick={goToPreviousPage}
          className={`prev ${currentPage === 1 ? "disabled" : ""}`}
          disabled={currentPage === 1 ? true : false}
          style={
            currentPage === 1
              ? {
                  pointerEvents: "auto",
                  cursor: "not-allowed",
                }
              : {}
          }
        >
          prev
        </button>

        {getPaginationGroup().map((item, index) => (
          <button
            key={index}
            onClick={changePage}
            className={`paginationItem ${currentPage === item ? "active" : ""}`}
            disabled={item > pages ? true : false}
            style={
              item > pages
                ? {
                    pointerEvents: "auto",
                    cursor: "not-allowed",
                    border: "none",
                    opacity: 0.5,
                  }
                : {}
            }
          >
            <span>{item}</span>
          </button>
        ))}

        <button
          onClick={goToNextPage}
          className={`next ${currentPage >= pages ? "disabled" : ""}`}
          disabled={currentPage >= pages ? true : false}
          style={
            currentPage >= pages
              ? {
                  pointerEvents: "auto",
                  cursor: "not-allowed",
                }
              : {}
          }
        >
          next
        </button>
      </div>
    );
  }
}
export default PaginationComponent;
