import React, { useState, useEffect } from 'react';

import axios from 'axios';

import './ResetPassword.css'; // Import your CSS file here

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import Navbar from './Navbar/Navbar';

import Footer from './Footer/Footer';

 

function ResetPassword() {

  const [newPassword, setNewPassword] = useState('');

  const [confirmPassword, setConfirmPassword] = useState('');

  const [messageRes, setMessageRes] = useState('');

  const [showPassword, setShowPassword] = useState(false);

  const [token, setToken] = useState(null);

 

  useEffect(() => {


    const urlParams = new URLSearchParams(window.location.search);

 

    const tokenFromURL = urlParams.get('token') || '';

    setToken(tokenFromURL);

  }, []);

 

  const isPasswordValid = (value) => {


    const passwordPattern = /^(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-])(?=.*[A-Z])(?=.*\d).{8,20}$/;

    return passwordPattern.test(value);

  };

 

  const handleResetPassword = async () => {

    if (newPassword === confirmPassword && token) {

      if (isPasswordValid(newPassword)) {

        try {

          

          const response = await axios.post(

            `http://localhost:8090/api/v1/auth/resetPassword?token=${token}`,

            { newPassword, token }

          );

        

          if (response.status === 200) {

            setMessageRes('Password reset successful!');

            console.log('Password reset successful!');

          } else {

            setMessageRes('An error occurred. Please try again.');

          
            console.error('An error occurred:', response.data);

          }

        } catch (error) {

          setMessageRes('An error occurred. Please try again.');

      
          console.error('An exception occurred:', error);

        }

      } else {

 

        setMessageRes('Password must be 8-20 characters, contain at least one symbol, one capital letter, and one number.');

        

        console.error('Password must be 8-20 characters, contain at least one symbol, one capital letter, and one number.');

      }

    } else {

   

      setMessageRes('Passwords do not match or token is missing. Please try again with a valid token.');


      console.error('Passwords do not match or token is missing. Please try again with a valid token.');

    }

  };

 

  const togglePasswordVisibility = () => {

    setShowPassword(!showPassword);

  };

 

  const passwordInputType = showPassword ? 'text' : 'password';

 

  return (

    <>

      <Navbar />

      <div className="forgot-password-cont">

        <div className="cont-reset-password cont1">

          <div className="cont-reset-password-sub">

            <h1>Reset Password</h1>

 

            <fieldset className="mt-2">

              <legend>New Password</legend>

              <div className="password-input">

                <input

                  id="new-password"

                  type={passwordInputType}

                  name="newPassword"

                  value={newPassword}

                  onChange={(e) => setNewPassword(e.target.value)}

                  placeholder="Enter new password"

                />

                <button className="password-toggle" onClick={togglePasswordVisibility}>

                  <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />

                </button>

              </div>

            </fieldset>

 

            <fieldset className="mt-2">

              <legend>Confirm Password</legend>

              <div className="password-input">

                <input

                  id="confirm-password"

                  type={passwordInputType}

                  name="confirmPassword"

                  value={confirmPassword}

                  onChange={(e) => setConfirmPassword(e.target.value)}

                  placeholder="Confirm new password"

                />

                <button className="password-toggle" onClick={togglePasswordVisibility}>

                  <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />

                </button>

              </div>

            </fieldset>

 

            <div className="btn-check-mail mt-3">

              <button

                className="btn-primary btn-reset-password"

                onClick={handleResetPassword}

                disabled={!token}

              >

                Reset Password

              </button>

              {messageRes && <p className="reset-success">{messageRes}</p>}

            </div>

          </div>

        </div>

        <div className="cont-reset-password ">

          <img

            src="bg2.png"

            alt="background-image"

            className="reset-password-img"

          />

        </div>

      </div>

      <Footer />

    </>

  );

}

 

export default ResetPassword;

