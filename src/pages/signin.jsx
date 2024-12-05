import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignInPage = () => {
  const Navigate = useNavigate();
  const [loadUserSignIn, setLoadUserSignIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const handleFormChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUserSignIn = async (e) => {
    e.preventDefault();
    setLoadUserSignIn(true);
    setErrorMessage("");
    try {
      let signUserIn = await axios.post(
        "http://localhost:2024/api/v1/user/signin",
        {
          email: userData.email,
          password: userData.password,
        }
      );
      console.log(signUserIn.data.data);
      let userResponse = signUserIn.data.data;
      localStorage.setItem("ojasignintoken", userResponse.token);
      Navigate("/dashboard");
    } catch (err) {
      console.log(err);
      if (err?.response?.data?.message) {
        setErrorMessage(err?.response?.data?.message);
      } else {
        setErrorMessage(err.response);
      }
      setLoadUserSignIn(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="auth-form bg-white py-5 px-10 rounded-3xl w-[40%]">
        {errorMessage?.length ? (
          <p className="text-[#ff0000]">{errorMessage}</p>
        ) : (
          ""
        )}
        {errorMessage?.length && (
          <p className="text-[#ff0000]">{errorMessage}</p>
        )}
        <form onSubmit={handleUserSignIn}>
          <div className="form-group mb-5">
            <label className="text-black block" htmlFor="email">
              Email address
            </label>
            <input
              value={userData.email}
              onChange={handleFormChange}
              className="w-full bg-white text-black border-2 border-solid border-black px-3 rounded-lg py-4"
              type="email"
              name="email"
            />
          </div>

          <div className="form-group">
            <label className="text-black block" htmlFor="password">
              Password
            </label>
            <input
              value={userData.password}
              onChange={handleFormChange}
              className="w-full bg-white text-black border-2 border-solid border-black px-3 rounded-lg py-4"
              type="password"
              name="password"
            />
          </div>
          <div className="mt-5">
            <button
              disabled={loadUserSignIn ? true : false}
              className="mx-auto block"
            >
              {loadUserSignIn ? "Please wait...." : "Click here to sign in"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignInPage;
