import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.scss";
import AllRoutes from "./components/routing/AllRoutes";

function App() {
  return (
    <div className="App">
      <Router>
        <AllRoutes />
      </Router>
    </div>
  );
}

export default App;
