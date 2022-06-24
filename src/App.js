import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import "./App.scss";
import AllRoutes from "./components/routing/AllRoutes";
import AlertNotification from "./components/themeComponents/Alerts";
import { closeAlertAction } from "./redux/actions/alertActions";
import Loader from "./components/themeComponents/loader/index.jsx";

const App = (props) => {
  const dispatch = useDispatch();

  const snackBarStates = useSelector((state) => state.snackBar);
  const handleClose = () => {
    dispatch(closeAlertAction());
  };
  const LoaderData = useSelector((state) => state.loaderReducer.isLoading);
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  useEffect(async () => {
    if (searchParams.get('token')) {
      fetch('https://stageapp.api.classicinformatics.net/api/auth/verifyToken', {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${searchParams.get('token')}`
        }
      })
        .then(data => {
          localStorage.setItem('token', searchParams.get('token'))
        })
        .catch(error => {
          localStorage.removeItem('token')
          navigate('/unAuthorized')
        })
    } else {
      if (!localStorage.getItem('token')) {
        navigate('/unAuthorized')
      }
    }
  }, [])

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
}

export default App;
