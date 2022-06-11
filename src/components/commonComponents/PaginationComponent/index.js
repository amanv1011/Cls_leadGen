import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as paginationActions from "../../../redux/actions/paginationActions";
import "./paginationComponent.scss";

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

  // useEffect(() => {
  //   if (window.location.pathname === "/campaign") {
  //     dispatch(paginationActions.setDataPerPage(10));
  //   }
  //   if (window.location.pathname === "/leads") {
  //     dispatch(paginationActions.setDataPerPage(10));
  //   }
  // }, [
  //   window.location.pathname === "/campaign" ||
  //     window.location.pathname === "/leads",
  // ]);

  const goToNextPage = () => {
    setCurrentPage((page) => page + 1);
    dispatch(paginationActions.setActivePage(currentPage + 1));
  };

  const goToPreviousPage = () => {
    setCurrentPage((page) => page - 1);
    dispatch(paginationActions.setActivePage(currentPage - 1));
  };

  const changePage = (event) => {
    const pageNumber = Number(event.target.textContent);
    setCurrentPage(pageNumber);
    dispatch(paginationActions.setActivePage(pageNumber));
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
        {/* <div>
          <select
            className="card-selects"
            onChange={(event) => {
              dispatch(paginationActions.setDataPerPage(event.target.value));
              dispatch(paginationActions.setActivePage(1));
            }}
            autoComplete="off"
            value={dataPerPage}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div> */}
        <div style={{ display: "flex" }}>
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
              className={`paginationItem ${
                currentPage === item ? "active" : ""
              }`}
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
      </div>
    );
  }
}
export default PaginationComponent;
