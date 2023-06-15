import { useState } from "react";
import axios from "axios";
import Header from "./components/Header";
import AppRoutes from "./routes/AppRoutes";

import "./App.css";

const App = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  axios.defaults.headers.common["Authorization"] = user ? user.jwt : "";

  return (
    <div className="App">
      <Header />
      <AppRoutes user={user} setUser={setUser} />
    </div>
  );
};

export default App;
