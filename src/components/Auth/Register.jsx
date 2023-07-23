import { useRef, useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

import useAuth from "../../../hook/useAuth";

import "./Auth.css";

import axios from "../../api/axios";

const LOGIN_URL = "/v1/login";

function Login() {
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ email:user, password: pwd }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
        );
        
        console.log(user)
      const accessToken = response?.data?.accessToken;
      // console.log(accessToken);
      const role = response?.data?.role;
      setAuth({ user, pwd, role, accessToken });

      setUser("");
      setPwd("");
      navigate(from, { replace: true });
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (!err.response?.status === 400) {
        setErrMsg("Missing username or password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unathorized");
      } else {
        setErrMsg("Login failed");
      }
      errRef.current.focus();
    }
  };
  return (
    <div className="cont-login-bg">
      <div className="login-cont">
        <p ref={errRef} className=  {errMsg  ?"errmsg" : 'offscreen' }  aria-live="assertive" >{errMsg}</p>
        <h2 className="title-login__login-cont">Login</h2>
        <form onSubmit={handleSubmit}  encType="application/x-www-form-urlencoded">
          <label htmlFor="email">Email : </label>
          <input
            type="text"
            name="email"
            id="email"
            onChange={(e) => setUser(e.target.value)}
            ref={userRef}
          />
          <div className="password-text-cont__login-cont">
            <label htmlFor="password">Password : </label>
            <a href="#" className="forget-pwd-text__password-text-cont">
              Forget Password?
            </a>
          </div>
          <input
            type="text"
            name="password"
            id="password"
            onChange={(e) => setPwd(e.target.value)}
          />
          <button className="btn-login__login-cont"> Login</button>
        </form>
        <p className="sign-up-text__login-cont">
          Don&#39;t have Account?
          <Link to="register">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
