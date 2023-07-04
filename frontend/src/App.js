import { useState } from "react";
import axios from "axios";
import AppNav from "./components/AppNav";
import AppRoutes from "./routes/AppRoutes";

import "./App.css";

const App = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  axios.defaults.headers.common["Authorization"] = user ? user.jwt : "";

  return (
    <div className="App">
      <AppNav setUser={setUser} user={user} />
      <AppRoutes user={user} setUser={setUser} />
    </div>
  );
};

export default App;
