import React, { useState } from "react";
import axios from "axios";
import "./ForgotPassword.css";
export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [messageRes, setMessageRes] = useState("");
  const [waitingResp, setWaitingResp] = useState(true);

  const handleCheckEmailClick = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8099/api/v1/auth/forgot-password?username=${email}`
      );

      if (response.status === 200) {
        <p>Please check your inbox for more instructions</p>;
        console.log(response.data);
        setMessageRes(response.data);
        setMessage(response.data.message);
        setWaitingResp(false);
      } else {
        setMessage("An error occurred. Please try again.");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="forgot-password-cont">
      <div className="cont-forgot-password cont1">
        <div className="cont-forgot-password-sub">
          <h1>Forgot Password</h1>
          <p className="mt-2">
            Enter the email associated with your account and we’ll send an email
            with instruction to reset your password
          </p>
          <fieldset className="mt-2">
            <legend>Email</legend>
            <input
              id="cont-password"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </fieldset>
          <div className="btn-check-mail mt-3">
            {waitingResp ? (
              <button
                className="btn-primary btn-check-mail"
                onClick={handleCheckEmailClick}
              >
                Check Mail
              </button>
            ) : (
              <p className="reset-success">{messageRes}</p>
            )}
          </div>
        </div>
      </div>
      <div className="cont-forgot-password ">
        <img
          src="bg2.png"
          alt="backgroung-image"
          className="forgot-password-img"
        />
      </div>
    </div>
  );
}
