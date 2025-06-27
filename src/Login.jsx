import React from "react";
import { useState } from "react";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginClick = () => {
    console.log("login clicked")
  };

  return (
    <div className="flex justify-center m-20">
      <div className="card bg-base-300 w-96 shadow-sm ">
        <div className="card-body">
          <h2 className="card-title justify-center text-xl mb-2">Login</h2>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Email Id:{emailId}</legend>
            <input
              type="text"
              value={emailId}
              className="input mb-2"
              placeholder="Enter your email"
              onChange={(e) => setEmailId(e.target.value)}
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Password:{password}</legend>
            <input
              type="text"
              value={password}
              className="input mb-2"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </fieldset>
          <div className="card-actions justify-center p-2 ">
            <button className="btn btn-primary px-7" onClick={handleLoginClick}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
