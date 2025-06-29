import { useState } from "react";
import axios from "axios";

const Login = () => {
  const [emailId, setEmailId] = useState("dhaval@gmail.com");
  const [password, setPassword] = useState("Dhaval@123");

  const handleLoginClick = async () => {
    try {
      const response = await axios.post("http://localhost:9999/login", {
        emailId,
        password,
      },{withCredentials:true});
      
      console.log(response.data.firstName)
     
    } catch (err) {
      console.log("ERROR", err.message);
    }
  };

  return (
    <div className="flex justify-center mt-20">
      <div className="card bg-base-300 w-96 shadow-sm ">
        <div className="card-body">
          <h2 className="card-title justify-center text-2xl mb-3">Login</h2>
          <fieldset className="fieldset">
            <legend className="fieldset-legend text-sm font-normal">Email Id</legend>
            <input
              type="text"
              value={emailId}
              className="input mb-2"
              placeholder="Enter your email"
              onChange={(e) => setEmailId(e.target.value)}
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend text-sm font-normal">Password</legend>
            <input
              type="text"
              value={password}
              className="input mb-2"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </fieldset>
          <div className="card-actions justify-center p-2 ">
            <button className="btn btn-primary px-9" onClick={handleLoginClick}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
