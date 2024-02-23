"use client";
import React, { FormEvent, FunctionComponent } from "react";
import loginData from "../data/users/all_users.json";
import loginFunc from "./formserver";
import { User } from "../common_components/interfaces";

interface LoginFormProps {
  login: boolean;
  elementArray: string[];
}
// Elemennt for the form to login or signup. 'login' is set to true when the user is logging in and true when it is a signup. 'elementArray' takes in an array of elements that are being evaluated like 'email' and 'password'.
const LoginForm: FunctionComponent<LoginFormProps> = ({
  login,
  elementArray,
}) => {
  // Maps all the different forms for the different elements into one final form
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

  // The login function to validate the users credentials
  const onLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Gets the form ata
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    for (const key in loginData["users"]) {
      const user = loginData["users"][key] as User;
      console.log(`username: ${user.username}\nemail: ${user.email}`);
      if (
        user.username == data["username or email"] ||
        user.email == data["username or email"]
      ) {
        if (user.password == data.password) {
          console.log("Login successful!");
          loginFunc(user, false);
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

    interface SignUpData {
      username: string;
      email: string;
      password: string;
      id?: number;
    }

    const formData = new FormData(e.currentTarget);
    const data: SignUpData = {
      username: formData.get("username") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    if (
      validatePassword(data.password.toString()) &&
      validateEmail(data.email.toString()) &&
      validateUsername(data.username.toString()) &&
      !isUsernameTaken(data.username.toString()) &&
      !isEmailTaken(data.email.toString())
    ) {
      console.log("Sign up successful!");
      loginFunc(data, true);

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

  return (
    <form onSubmit={!login ? onSignUp : onLogin} className="flex flex-col">
      {formElement(elementArray)}
      <button type="submit">Submit</button>
    </form>
  );
};

export default LoginForm;
