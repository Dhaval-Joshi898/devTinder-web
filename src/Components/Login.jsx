import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { isLogout } from "../utils/logoutSlice";

const Login = () => {
  const [emailId, setEmailId] = useState("dhaval@gmail.com");
  const [password, setPassword] = useState("Dhaval@123");
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((Store) => Store.user);
  const logoutStatus = useSelector((store) => store.logout);
  const navigate = useNavigate();

  useEffect(() => {
    if (logoutStatus) {
      const timerLogout = setTimeout(() => {
        dispatch(isLogout(false));
      }, 6000);

      return () => clearTimeout(timerLogout);
    }
  }, [logoutStatus]);

  const handleLoginClick = async () => {
    try {
      const response = await axios.post(
        "http://localhost:9999/login",
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );

      // console.log(response.data);
      dispatch(addUser(response.data));
      navigate("/");

    } catch (err) {
      // console.log("ERROR", err);
      setErrorMessage(err?.response?.data)
    }
  };

  return (
    <>
      {logoutStatus && (
        <div
          role="alert"
          className="alert alert-success max-w-sm  w-full mx-auto mt-16 shadow-lg "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="font-bold">Logged Out Successfully!</span>
        </div>
      )}
      <div className="flex justify-center mt-28">
        <div className="card bg-base-300 w-96 shadow-sm ">
          <div className="card-body">
            <h2 className="card-title justify-center text-2xl mb-3">Login</h2>
            <fieldset className="fieldset">
              <legend className="fieldset-legend text-sm font-normal">
                Email Id
              </legend>
              <input
                type="text"
                value={emailId}
                className="input mb-2"
                placeholder="Enter your email"
                onChange={(e) => setEmailId(e.target.value)}
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend text-sm font-normal">
                Password
              </legend>
              <input
                type="text"
                value={password}
                className="input mb-2"
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
              
              />
            </fieldset>
            <p className="text-red-500">{errorMessage}</p>
            <div className="card-actions justify-center p-2 ">
              <button
                className="btn btn-primary px-9"
                onClick={handleLoginClick}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
