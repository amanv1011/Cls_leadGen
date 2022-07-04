import React, { useEffect } from "react";
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

  const snackBarStates = useSelector((state) => state.snackBar);
  const handleClose = () => {
    dispatch(closeAlertAction());
  };
  const LoaderData = useSelector((state) => state.loaderReducer.isLoading);
  const loggedInUser = useSelector((state) => state.getLoggedInUserAction);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  console.log(loggedInUser);
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
    dispatch(
      getLoggedInUserAction({
        name: "Onkar",
        userId: "1234",
        role: 4,
      })
    );
  }, []);

  return (
    <div className="App">
      <AlertNotification
        isAlertOpen={snackBarStates.open}
        message={snackBarStates.message}
        type={snackBarStates.type}
        handleClose={handleClose}
      />
      {LoaderData && LoaderData === true ? <Loader open={LoaderData} /> : null}
      <AllRoutes />
    </div>
  );
};

export default App;
