import { useState } from "react";
import axios from "axios";
import Header from "./components/Header";
import AppRoutes from "./routes/AppRoutes";

import "./App.css";

const App = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [unit, setUnit] = useState("g");

  axios.defaults.headers.common["Authorization"] = user ? user.jwt : "";

  return (
    <div className="App">
      <Header setUnit={setUnit} unit={unit} />
      <AppRoutes user={user} setUser={setUser} unit={unit} />
    </div>
  );
};

export default App;
