import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.scss";
import AllRoutes from "./components/routing/AllRoutes";
import AlertNotification from "./components/themeComponents/Alerts";
import { closeAlert } from "./redux/actions/alertActions";

function App() {
  const dispatch = useDispatch();

  const snackBarStates = useSelector((state) => state.snackBar);
  const handleClose = () => {
    dispatch(closeAlert());
  };
  return (
    <div className="App">
      <AlertNotification
        isAlertOpen={snackBarStates.open}
        message={snackBarStates.message}
        type={snackBarStates.type}
        handleClose={handleClose}
      />
      <Router>
        <AllRoutes />
      </Router>
    </div>
  );
}

export default App;
