import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import BASE_URL from "../utils/constants";
import { removeUser } from "../utils/userSlice";
import { isLogout } from "../utils/logoutSlice";
import { removeFeed } from "../utils/feedSlice";

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      <div className="flex-1 ml-5">
        {user ? <Link to="/">🧑🏻‍💻DevTinder</Link> : <a>🧑🏻‍💻DevTinder</a>}
      </div>
      <div className="flex gap-2 ">
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
              <span className="indicator-item badge badge-secondary">12</span>
              <Link
                to="/requests"
                className="px-4 py-1 rounded-md transition-colors duration-200 hover:bg-gray-600 font-semibold"
              >
                Requests
              </Link>
            </div>
          </>
        )}
        {user && <p className="mt-3 ml-2 mx-1 ">Welcome, {user.firstName}</p>}
        {user && (
          <div className="dropdown dropdown-end mx-5">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full ">
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
        )}{" "}
      </div>
    </div>
  );
};

export default NavBar;
