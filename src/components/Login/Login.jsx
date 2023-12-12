import React, {useState, useContext } from "react";
import "./login.css";
import Input from "../Input/Input";
import { Link } from "react-router-dom";
import axios from "axios";
import { useUserContext } from "../../UserContext";
import { useNavigate} from "react-router-dom";

function Login() {
  
  const { loginInfo, setLoginInfo } = useUserContext(); // Access loginInfo and setLoginInfo
  const navigate = useNavigate();

  const requestBody = {
    username: "",
    password: "",
  };
  const [post, setPost] = useState({
    email: "",
    password: "",
  });

 

  React.useEffect(()=>{},
  [post],console.log(post))

  const host=location.host;
  const protocol = window.location.protocol.split(":")[0]+"://";
  const target="http://localhost:8099/api/v1/auth/login";

  const [response, setResponse] = useState();

  const [loading,setLoading] = useState(false);
  const [errMsg,setErrMsg]=useState("");

  const handleInput = (event) => {
    setPost({ ...post, [event.target.name]: event.target.value });
    console.log(post);
  };

  const handleSubmit = (event) => {
    setErrMsg("")
    setLoading(true)
    event.preventDefault();
    const axiosConfig ={
        method:"post",
        url:target,
        data:{
          username:post.email,
          password:post.password
        }

    }
    axios(axiosConfig)
    .then(response=>{
    console.log(response)
      setLoading(false)
      if(response.status===200){
        // Update loginInfo when login is successful
        console.log(response)
        setLoginInfo({
          token: response.data.token, 
          loggedIn: true,
        });

        const userData = {
          token: response.data.token, 
          loggedIn: true,
        }
        
        localStorage.setItem("userData", JSON.stringify(userData));
        
          // Redirect to the UserProfile page
          navigate("/user/dashboard");
      }else{
        setErrMsg("Invalid Username or password")
      }

    })
    .catch(error=>{
      console.error(error)
      setLoading(false)
      setErrMsg("Invalid Username or password")
    });

  };

  return (
    <>
      <main className="main">
        {response === 200 ? (
          <div
            style={{
              color: "green",
              fontSize: "30px",
              height: "90vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            Logged In successfully
          </div>
        ) : (
          <div className="form-space">
            <div className="form-description mb-4">
              <h2 className="mb-1">Login to your account</h2>
              <p>Please provide your login credentials</p>
            </div>
            <form action="#" onSubmit={handleSubmit}>
              <Input
                name="Email"
                type="email"
                id="email"
                className="email-fieldset"
                onChange={handleInput}
              />
              <Input
                name="Password"
                type="password"
                id="password"
                className="password-fieldset"
                onChange={handleInput}
              />
              <span className="text-primary">{errMsg}</span>
              <Link to="/forgot-password" ><a className="forgot-password mb-3">Forgot Password? </a></Link>
              <button type="submit" className="btn btn-lg mb-3">
                Login 
                {loading&&<i class='fas fa-spinner fa-spin' >  </i> }
              </button>
            </form>
            <div className="create-acc">
              Not registered?{" "}
              <Link to="/signup" > <a className="create-acc-link">Create Account</a> </Link>
            </div>
          </div>
        )}
        <div className="image-space">&nbsp;</div>
      </main>
    </>
  );
}

export default Login;
