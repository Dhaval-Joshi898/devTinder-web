import NavBar from "./Navbar";
import { Outlet } from "react-router-dom";

const Body = () => {
  return (
    <div>
      <NavBar />
      <Outlet />     {/*To render children components  */}
    
    </div>
  );
};

export default Body;
