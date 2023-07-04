import { Route, Routes } from "react-router-dom";
import PrivateRoutes from "./PrivateRoutes";
import Authorization from "../views/Authorization";
import Home from "../views/Home";

const AppRoutes = (props) => {
  return (
    <Routes>
      <Route element={<PrivateRoutes user={props.user} />}>
        <Route path="/" element={<Home user={props.user} />} />
      </Route>
      <Route path="/authorization" element={<Authorization setUser={props.setUser} user={props.user} />} />
    </Routes>
  );
};

export default AppRoutes;
