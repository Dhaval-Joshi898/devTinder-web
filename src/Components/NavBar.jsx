import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import BASE_URL from "../utils/constants";
import { removeUser } from "../utils/userSlice";
import { isLogout } from "../utils/logoutSlice";
import { removeFeed } from "../utils/feedSlice";
import { FiLogOut } from "react-icons/fi";

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const requests = useSelector((store) => store.requests);

  const handleLogoutClick = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      dispatch(isLogout(true));
      dispatch(removeFeed());
      navigate("/login");
    } catch (err) {
      //any error
    }
  };

  return (
    <div className="navbar bg-base-300 shadow-sm fixed top-0 z-[999] ">
      <div className="flex-1 ml-5 ">
        {user ? <Link to="/">🧑🏻‍💻DevTinder</Link> : <a>🧑🏻‍💻DevTinder</a>}
      </div>
      <div className="flex gap-2 hidden  md:flex  ">
        {user && (
          <>
            <p className="mt-2  px-4 py-1  rounded-md transition-colors duration-200 hover:bg-gray-600 font-semibold cursor-pointer">
              {" "}
              <Link to="/profile">My Profile</Link>
            </p>
            <p className="mt-2  px-4 py-1  rounded-md transition-colors duration-200 hover:bg-gray-600 font-semibold cursor-pointer">
              {" "}
              <Link to="/connections">My Connections</Link>
            </p>
            <div className="mt-2 ml-2 indicator cursor-pointer">
              <span className="indicator-item badge badge-secondary size-6">
                {requests?.length}
              </span>
              <Link
                to="/requests"
                className="px-4 py-1 rounded-md transition-colors duration-200 hover:bg-gray-600 font-semibold"
              >
                Requests
              </Link>
            </div>
          </>
        )}
        {/* {user && <p className="mt-3 ml-2 mx-1 ">Welcome, {user.firstName}</p>}
        {user && (
          <div className="dropdown dropdown-end mx-5 ">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full block">
                <img alt="Tailwind CSS Navbar component" src={user?.photoUrl} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li className="text-lg">
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <Link to="/connections">Connections</Link>
              </li>
              <li>
                <Link to="/requests">Requests</Link>
              </li>
              <li>
                <a onClick={handleLogoutClick}>Logout</a>
              </li>
            </ul>
          </div>
        )}{" "} */}
      </div>
      {/* Below this circle avatar will be visble in all screens */}
      {user && <p className="mt-2 ml-3 mx-1 ">Welcome, {user.firstName}</p>}
      {user && (
        <div className="dropdown dropdown-end mx-5  ">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full block">
              <img alt="Tailwind CSS Navbar component" src={user?.photoUrl} />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu dropdown-content bg-base-300 shadow-lg rounded-box z-10 mt-3 w-64 p-4 shadow-lg text-base"
          >
            <li className="text-lg py-2 px-3 hover:bg-transparent bg-base-0 border-b border-gray-500 rounded">
              <Link to="/profile">Profile</Link>
            </li>
            <li className="text-lg py-2 px-3 bg-base-0  border-b border-gray-500 rounded">
              <Link to="/connections">Connections</Link>
            </li>
            <li className="text-lg py-2 px-3 border-b border-gray-500  rounded">
              <Link to="/requests">Requests</Link>
            </li>
            <li className="text-lg py-2 px-3  rounded ">
              <div className="flex justify-between ">
              <a onClick={handleLogoutClick}>Logout</a>
              <FiLogOut className="h-8 ml-4" />
             
              
              </div>
                
            </li>
          </ul>

          {/* <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li className="text-lg">
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <Link to="/connections">Connections</Link>
              </li>
              <li>
                <Link to="/requests">Requests</Link>
              </li>
              <li>
                <a onClick={handleLogoutClick}>Logout</a>
              </li>
            </ul> */}
        </div>
      )}{" "}
    </div>
  );
};

export default NavBar;
