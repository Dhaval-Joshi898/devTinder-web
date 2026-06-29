import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { isLogout } from "../utils/logoutSlice";
import BASE_URL from "../utils/constants";
import { addRequestsList } from "../utils/requestsSlice";

const Login = () => {
  const [emailId, setEmailId] = useState("dhaval@gmail.com");
  const [password, setPassword] = useState("Dhaval@123");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const [showOtpInput, setShowOtpInput] = useState(false);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const user = useSelector((Store) => Store.user);
  const logoutStatus = useSelector((store) => store.logout);
  const navigate = useNavigate();

  const fetchRequestsReceived = async () => {
    const response = await axios.get(BASE_URL + "/user/requests/recieved", {
      withCredentials: true,
    });
    console.log(response.data.data);
    dispatch(addRequestsList(response.data.data));
  };

  useEffect(() => {
    if (user) {
      navigate("/", { replace: true }); // already logged in, go to main page
    }
    if (logoutStatus) {
      const timerLogout = setTimeout(() => {
        dispatch(isLogout(false));
      }, 3000);

      return () => clearTimeout(timerLogout);
    }
    fetchRequestsReceived();
  }, [logoutStatus, user]);

  const handleLoginClick = async () => {
    try {
      const response = await axios.post(
        BASE_URL+"/login",
        {
          emailId,
          password,
        },
        { withCredentials: true },
      );

      // console.log(response.data);
      dispatch(addUser(response.data));
      navigate("/");
    } catch (err) {
      // console.log("ERROR", err);
      setErrorMessage(err?.response?.data || "Something went Wrong");
    }
  };

  //click to send otp to mail
  const handleSignUpClick = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        BASE_URL + "/sendotp",
        { emailId },
        { withCredentials: true },
      );
      console.log(response.data.data);
      // toast.success("OTP Sent Successfully");
      setShowOtpInput(true);

      // dispatch(addUser(response.data.data));
      // navigate("/profile");
    } catch (err) {
      setErrorMessage(err?.response?.data || "Something went Wrong");
    } finally {
      setLoading(false);
    }
  };

  //after adding otp and click verify&signup this
  const handleVerifyAndSignup = async () => {
    try {
      const response = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, emailId, password, otp },
        { withCredentials: true },
      );
      console.log(response.data.data);
      dispatch(addUser(response.data.data));
      navigate("/profile");
    } catch (err) {
      setErrorMessage(err?.response?.data || "Something went Wrong");
    }
  };

  const handleSendOTP = async () => {};
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
      {!showOtpInput && (
        <div className="flex justify-center mt-28 ">
          <div className="card bg-base-300 w-96 shadow-lg rounded-2xl ">
            <div className="card-body">
              <h2 className="card-title justify-center text-2xl mb-3 font-semibold">
                {isLogin ? "Login" : "Sign Up"}
              </h2>
              {!isLogin && (
                <>
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend text-sm font-normal">
                      First Name
                    </legend>
                    <input
                      type="text"
                      value={firstName}
                      className="input mb-2"
                      placeholder="Enter your First Name"
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </fieldset>
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend text-sm font-normal">
                      Last Name
                    </legend>
                    <input
                      type="text"
                      value={lastName}
                      className="input mb-2"
                      placeholder="Enter your Last Name"
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </fieldset>{" "}
                </>
              )}
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
                {/* <button
                  className="btn btn-primary px-9"
                  onClick={isLogin ? handleLoginClick : handleSignUpClick}
                >
                  {isLogin ? "Login" : "Sign Up"}
                </button> */}
                <button
                  className="btn btn-primary px-9"
                  disabled={loading}
                  onClick={isLogin ? handleLoginClick : handleSignUpClick}
                >
                  {loading ? (
                    <>
                      <span className="loading loading-spinner loading-sm"></span>
                      Sending OTP...
                    </>
                  ) : isLogin ? (
                    "Login"
                  ) : (
                    "Sign Up"
                  )}
                </button>
              </div>
              <p
                className="text-center mt-3 cursor-pointer text-md font-semibold"
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin ? "New User? Sign Up " : "Already a User? Login"}
              </p>
            </div>
          </div>
        </div>
      )}

      {showOtpInput && (
        <div className="flex justify-center mt-28">
          <div className="card bg-base-300 w-96 shadow-lg rounded-2xl">
            <div className="card-body">
              <h2 className="text-2xl font-bold text-center mb-2">
                Verify OTP
              </h2>

              <p className="text-center text-sm opacity-70 mb-4">
                OTP sent to <span className="font-semibold">{emailId}</span>
              </p>

              {/* OTP INPUT */}

              <fieldset className="fieldset">
                <legend className="fieldset-legend text-sm font-normal">
                  Enter OTP
                </legend>

                <input
                  type="text"
                  value={otp}
                  maxLength={6}
                  className="input input-bordered text-center text-lg tracking-[10px] font-semibold"
                  placeholder="----"
                  onChange={(e) => setOtp(e.target.value)}
                />
              </fieldset>

              {/* ERROR */}

              <p className="text-red-500 text-sm mt-1">{errorMessage}</p>

              {/* VERIFY BUTTON */}

              <div className="card-actions justify-center mt-4">
                <button
                  className="btn btn-primary px-10"
                  onClick={handleVerifyAndSignup}
                >
                  Verify & Sign Up
                </button>
              </div>

              {/* RESEND */}

              <p
                className="text-center mt-4 text-sm cursor-pointer hover:underline"
                onClick={handleSendOTP}
              >
                Resend OTP
              </p>

              {/* BACK BUTTON */}

              <p
                className="text-center mt-2 text-sm cursor-pointer hover:underline"
                onClick={() => setShowOtpInput(false)}
              >
                Back
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
