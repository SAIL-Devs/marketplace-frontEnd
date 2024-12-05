import React, { useState } from "react";
import axios from "axios";
import { UploadOutlined } from "@ant-design/icons";
import { Button, message, Upload } from "antd";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const Navigate = useNavigate();
  const [loadUserSignIn, setLoadUserSignIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [userAvatar, setUserAvatar] = useState(null);
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    avatar: "",
  });

  const handleFormChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    console.log(e.target.files[0]);
  };

  const props = {
    name: "file",
    beforeUpload: () => false,
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
        setUserAvatar(info.file);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const handleUserSignUp = async (e) => {
    e.preventDefault();
    setLoadUserSignIn(true);
    setErrorMessage("");
    try {
      let formData = new FormData();
      formData.append("avatar", userAvatar);
      formData.append("username", userData.username);
      formData.append("email", userData.email);
      formData.append("password", userData.password);

      let signUserUp = await axios.post(
        "http://localhost:2024/api/v1/user/signup",
        formData
      );
      Navigate("/signin");
    } catch (err) {
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
        {errorMessage.length ? (
          <p className="text-[#ff0000]">{errorMessage}</p>
        ) : (
          ""
        )}
        {errorMessage.length && (
          <p className="text-[#ff0000]">{errorMessage}</p>
        )}
        <form onSubmit={handleUserSignUp}>
          <div className="form-group mb-5">
            <label className="text-black block" htmlFor="email">
              Avatar
            </label>
            <Upload {...props}>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
            {/* <input
              value={userData.avatar}
              onChange={handleFileChange}
              className="w-full bg-white text-black border-2 border-solid border-black px-3 rounded-lg py-4"
              type="file"
              name="username"
            /> */}
          </div>
          <div className="form-group mb-5">
            <label className="text-black block" htmlFor="email">
              Username
            </label>
            <input
              value={userData.username}
              onChange={handleFormChange}
              className="w-full bg-white text-black border-2 border-solid border-black px-3 rounded-lg py-4"
              type="text"
              name="username"
            />
          </div>
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

export default SignUpPage;
