import { Route, Routes } from "react-router-dom";
import PrivateRoutes from "./PrivateRoutes";
import Unauthorized from "../views/Unauthorized";
import Home from "../views/Home";

const AppRoutes = (props) => {
  return (
    <Routes>
      <Route element={<PrivateRoutes />}>
        <Route path="/" element={<Home user={props.user} />} />
      </Route>
      <Route path="/unauthorized" element={<Unauthorized setUser={props.setUser} user={props.user} />} />
    </Routes>
  );
};

export default AppRoutes;
