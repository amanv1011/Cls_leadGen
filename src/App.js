import React, { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import "./App.scss";
import AllRoutes from "./components/routing/AllRoutes";
import AlertNotification from "./components/themeComponents/Alerts";
import { closeAlertAction } from "./redux/actions/alertActions";
import Loader from "./components/themeComponents/loader/index.jsx";
import {
  addUserAction,
  getAllUsersAction,
  getLoggedInUserAction,
} from "./redux/actions/usersAction";
import UAParser from "ua-parser-js";
import jwt_decode from "jwt-decode";

console.log('just for development', process.env.REACT_APP_ENV);

const {
  REACT_APP_APPLICATION_LINK
} = process.env

const App = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [searchParams] = useSearchParams();
  const snackBarStates = useSelector((state) => state.snackBar);
  const allUsers = useSelector((state) => state.users.users);

  const LoaderData = useSelector((state) => state.loaderReducer.isLoading);
  const userRole = useSelector(
    (state) => state.getLoggedInUserAction.loggedInUser.user_role_id
  );
  // const userRole = 2;
  const loggedInUser = useSelector(
    (state) => state.getLoggedInUserAction.loggedInUser
  );

  const handleClose = () => {
    dispatch(closeAlertAction());
  };

  useEffect(() => {
    dispatch(getAllUsersAction());
    if (searchParams.get("token")) {
      fetch(
        `${REACT_APP_APPLICATION_LINK}api/auth/verifyToken`,
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
          navigate("/");
        })
        .catch((error) => {
          localStorage.removeItem("token");
          navigate("/unAuthorized");
        });
    } else {
      console.log('checking for token!', localstorage.getItem('token'));
      if (!localStorage.getItem("token")) {
        console.log('token not found');
        navigate("/unAuthorized");
      }
    }
  }, []);

  useEffect(() => {
    if (
      localStorage.getItem("token") &&
      localStorage.getItem("token") !== undefined
    ) {
      const parser = new UAParser();
      if (localStorage.getItem("token")) {
        const decodedToken = jwt_decode(localStorage.getItem("token"));
        if (decodedToken.navigator !== parser.getBrowser().name) {
          localStorage.removeItem("token");
          navigate("/unAuthorized");
        }
      }
      fetch(`${REACT_APP_APPLICATION_LINK}api/auth/getDetail`, {
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
            if (allUsers && allUsers.length) {
              let filtered = allUsers?.filter((user) => {
                return user.userId === data.result[0].id;
              });
              if (!filtered.length) {
                //add user in database here
                let userInfo = {
                  name: `${data.result[0].first_name} ${data.result[0].last_name}`,
                  email: data.result[0].email,
                  userId: data.result[0].id,
                  role: data.result[0].user_role_id,
                  // role: 2,
                };

                dispatch(addUserAction(userInfo));
              }
            }
          }
        })
        .catch((err) => console.log(err));
    }
  }, [token, allUsers]);

  useEffect(() => {
    if (
      localStorage.getItem("token") &&
      localStorage.getItem("token") !== undefined &&
      loggedInUser &&
      loggedInUser.id
    ) {
      fetch(
        `${REACT_APP_APPLICATION_LINK}api/auth/getusertools?id=${loggedInUser.id}`,
        {
          method: "GET",
          mode: "cors",
          cache: "no-cache",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
        .then((res) => res.json())
        .then((res) => {
          const crm = res && res?.filter((element) => element.id === "11");
          if (crm && crm[0] && crm[0].is_active === false) {
            navigate("/unAuthorized");
          }
        });
    }
  }, [token, loggedInUser]);

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
