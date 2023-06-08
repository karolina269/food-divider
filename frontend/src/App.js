import { useState } from "react";
import Header from "./components/Header";
import Unregistered from "./views/Unregistered";

import "./App.css";

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  return (
    <div className="App">
      <Header />
      <Unregistered user={user} setUser={setUser} />
    </div>
  );
}

export default App;
