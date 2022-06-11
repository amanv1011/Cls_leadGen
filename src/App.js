import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.scss";
import AllRoutes from "./components/routing/AllRoutes";
import AlertNotification from "./components/themeComponents/Alerts";
import { closeAlertAction } from "./redux/actions/alertActions";
import Loader from "./components/themeComponents/loader/index.jsx";

function App() {
  const dispatch = useDispatch();

  const snackBarStates = useSelector((state) => state.snackBar);
  const handleClose = () => {
    dispatch(closeAlertAction());
  };
  const LoaderData = useSelector((state) => state.loaderReducer.isLoading);

  return (
    <div className="App">
      <AlertNotification
        isAlertOpen={snackBarStates.open}
        message={snackBarStates.message}
        type={snackBarStates.type}
        handleClose={handleClose}
      />
      {LoaderData && LoaderData === true ? <Loader open={LoaderData} /> : null}
      <Router>
        <AllRoutes />
      </Router>
    </div>
  );
}

export default App;
