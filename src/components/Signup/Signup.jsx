import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import Input from "../Input/Input";
import axios from "axios";
import { Link } from "react-router-dom";
import { FetchingData } from "../FetchingData";

function Signup() {
  const requestBody = {
    firstName: "",
    lastName: "",
    username: "",
    DOB: "",
    password: "",
    phoneNumber: "",
    role: "ROLE_USER",
  };
  const [post, setPost] = useState({
    firstName: "",
    lastName: "",
    email: "",
    dob: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
  });
  const host=location.host;
  const protocol = window.location.protocol.split(":")[0]+"://";
  const target="http://localhost:8099/api/v1/auth/signup";

  const[loading,setLoading]= useState(false);

  React.useEffect(()=>{

  },[post], console.log(post)
  )

  const [response, setResponse] = useState();

  const [isMatched, setIsMatched] = useState();

  const handleInput = (event) => {
    setPost({ ...post, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true)
    requestBody.firstName = post.firstName;
    requestBody.lastName = post.lastName;
    requestBody.username = post.email;
    requestBody.DOB = post.dob;
    requestBody.password = post.password;
    requestBody.phoneNumber = post.phoneNumber;

 
    fetch(target, {
      headers: {
        "Content-Type": "application/json",
        "No-Auth": "true", 
      },
      method: "POST",
      body: JSON.stringify(requestBody),
    })
      .then((res) => {
        setLoading(false)
        setResponse(res.status);
      })
      .catch((err) => console.log(err));
      
  };

  return (
    <>
      <main className="main">
        {response === 200 ? (
          <div
            style={{
              color: "green",
              fontSize: "26px",
              height: "90vh",
              display: "flex",
              alignItems: "center",
              fontWeight:600,
              justifyContent: "center",
              flexDirection:"column"
            }}
          >
            <div><span>Hurray! your account has been created</span></div> 
            <div style={{
              fontSize: "96px"
            }}><i class='fas fa-clipboard-check'></i></div>
          </div>
        ) : (
          <div className="form-space">
            <div className="form-description mb-4">
              <h2 className="mb-1">Create an account</h2>
              <p>Please fill the form below</p>
            </div>
            <form action="#" onSubmit={handleSubmit}>
              <Input
                name="First Name"
                type="text"
                id="firstName"
                className="mb-2"
                value={post.firstName}
                onChange={handleInput}
              />
              <Input
                name="Last Name"
                type="text"
                id="lastName"
                className="mb-2"
                value={post.lastName}
                onChange={handleInput}
              />
              <Input
                name="Email"
                type="email"
                id="email"
                className="mb-2"
                value={post.email}
                onChange={handleInput}
              />
              <Input
                name="Phone Number"
                type="tel"
                id="phoneNumber"
                className="mb-2"
                value={post.phoneNumber}
                onChange={handleInput}
              />
              <Input
                name="Date of Birth"
                type="date"
                id="dob"
                className="mb-2"
                value={post.DOB}
                onChange={handleInput}
              />
              <Input
                name="Password"
                type="password"
                id="password"
                className="mb-2"
                value={post.password}
                onChange={handleInput}
              />
              <Input
                name="Confirm Password"
                type="password"
                id="confirmPassword"
                value={post.confirmPassword}
                onChange={(e) => {
                  handleInput(e);
                  e.target.value === post.password
                    ? setIsMatched(false)
                    : setIsMatched(true);
                }}
              />
              {isMatched && (
                <p style={{ color: "red", fontSize: "14px" }}>
                  Password does not match
                </p>
              )}
              <button type="submit" className="btn btn-lg mb-3 mt-2">
                Create account
              </button>
            </form>
            <div className="create-acc">
              Already registered?{" "}
              <Link to="/login"> <a className="create-acc-link">Login</a></Link>
            </div>
          </div>
        )}
        <div className="image-space">&nbsp;</div>
      </main>
      {loading && <FetchingData text="Saving user data..."/>}
      
    </>
  );
}
export default Signup;
