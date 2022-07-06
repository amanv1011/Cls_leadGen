import React, { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import "./App.scss";
import AllRoutes from "./components/routing/AllRoutes";
import AlertNotification from "./components/themeComponents/Alerts";
import { closeAlertAction } from "./redux/actions/alertActions";
import Loader from "./components/themeComponents/loader/index.jsx";
import {
  getAllUsersAction,
  getLoggedInUserAction,
} from "./redux/actions/usersAction";

const App = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [searchParams] = useSearchParams();
  const snackBarStates = useSelector((state) => state.snackBar);
  const LoaderData = useSelector((state) => state.loaderReducer.isLoading);
  const userRole = useSelector(
    (state) => state.getLoggedInUserAction.loggedInUser.user_role_id
  );

  const handleClose = () => {
    dispatch(closeAlertAction());
  };

  useEffect(() => {
    dispatch(getAllUsersAction());
    if (searchParams.get("token")) {
      fetch(
        "https://stageapp.api.classicinformatics.net/api/auth/verifyToken",
        {
          method: "GET",
          mode: "cors",
          cache: "no-cache",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${searchParams.get("token")}`,
          },
        }
      )
        .then((data) => {
          localStorage.setItem("userName", searchParams.get("uname"));
          localStorage.setItem("token", searchParams.get("token"));
        })
        .catch((error) => {
          localStorage.removeItem("token");
          navigate("/unAuthorized");
        });
      //api for userId
    } else {
      if (!localStorage.getItem("token")) {
        navigate("/unAuthorized");
      }
    }
  }, []);

  useEffect(() => {
    if (
      localStorage.getItem("token") &&
      localStorage.getItem("token") !== undefined
    ) {
      fetch("https://stageapp.api.classicinformatics.net/api/auth/getDetail", {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: localStorage.getItem("token") }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data && data.result && data.result[0]) {
            dispatch(getLoggedInUserAction(data.result[0]));
          }
        })
        .catch((err) => console.log(err));
    }
  }, [token]);

  return (
    <div className="App">
      <AlertNotification
        isAlertOpen={snackBarStates.open}
        message={snackBarStates.message}
        type={snackBarStates.type}
        handleClose={handleClose}
      />
      {LoaderData && LoaderData === true ? <Loader open={LoaderData} /> : null}
      <AllRoutes userRole={userRole} />
    </div>
  );
};

export default memo(App);
