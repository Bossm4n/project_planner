// "use client";
import React, { FormEvent } from "react";
import Navbar from "../common_components/navbar";
import LoginForm from "./formclient";

const Login = () => {
  return (
    <div>
      <Navbar />

      <div className="flex flex-row h-60 border mt-3">
        <div className="basis-1/2 text-center px-6">
          <div>Login</div>
          <LoginForm
            login={true}
            elementArray={["Username or Email", "Password"]}
          />
        </div>
        <div className="basis-1/2 text-center px-6">
          <div>Sign up</div>
          <LoginForm
            login={false}
            elementArray={["Username", "Email", "Password"]}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
