"use client";
import React, { FormEvent } from "react";
import Navbar from "../common_components/navbar";
import loginData from "../data/login.json"; // Import login.json

const Login = () => {
  const onLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    for (const key in loginData["users"]) {
      const user = loginData["users"][key];
      if (
        user.username == data.usernameOrEmail ||
        user.email == data.usernameOrEmail
      ) {
        if (user.password == data.password) {
          console.log("Login successful!");
          (e.target as HTMLFormElement).reset();
          return;
        }
      }
    }
    console.log("Login failed!");
    (e.target as HTMLFormElement).reset();
  };

  const onSignUp = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    console.log(data);

    if (
      validatePassword(data.password.toString()) &&
      validateEmail(data.email.toString()) &&
      validateUsername(data.username.toString()) &&
      !isUsernameTaken(data.username.toString()) &&
      !isEmailTaken(data.email.toString())
    ) {
      console.log("Sign up successful!");
      (e.target as HTMLFormElement).reset();
    } else {
      console.log("Sign up failed!");
      (e.target as HTMLFormElement).reset();
    }
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
    return passwordRegex.test(password);
  };

  const validateUsername = (username: string) => {
    const usernameRegex = /^[a-zA-Z0-9]+$/;
    return usernameRegex.test(username);
  };

  const isUsernameTaken = (username: string) => {
    for (const key in loginData["users"]) {
      const user = loginData["users"][key];
      if (user.username == username) {
        return true;
      }
    }
    return false;
  };

  const isEmailTaken = (email: string) => {
    for (const key in loginData["users"]) {
      const user = loginData["users"][key];
      if (user.email == email) {
        return true;
      }
    }
    return false;
  };

  const formElement = (arrayOfFormElements: string[]) => {
    return arrayOfFormElements.map((formElement) => {
      return (
        <>
          <div className="text-left">{formElement}</div>
          <input
            type="text"
            name={formElement.toLowerCase()}
            className="border border-black"
          />
        </>
      );
    });
  };

  return (
    <div>
      <Navbar />

      <div className="flex flex-row h-60 border">
        <div className="basis-1/2 text-center px-6">
          <div>Login</div>
          <form onSubmit={onLogin} className="flex flex-col">
            {formElement(["Username or Email", "Password"])}
            <button type="submit">Submit</button>
          </form>
        </div>
        <div className="basis-1/2 text-center px-6">
          <div>Sign up</div>
          <form onSubmit={onSignUp} className="flex flex-col">
            {formElement(["Username", "Email", "Password"])}
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
