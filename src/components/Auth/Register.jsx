import { useRef, useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

import "./Auth.css";

import axios from "../../api/axios";

const REGISTER_URL = "/v1/register";


function Register() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const nameRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [pwd, setPwd] = useState("");

  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    nameRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, pwd, name]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        REGISTER_URL,
        JSON.stringify({ name: name, email: email, password: pwd}),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      setEmail("");
      setPwd("");
      setName("");
      navigate(from, { replace: true });
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (!err.response?.status === 400) {
        setErrMsg("Missing email, name or password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unathorized");
      } else {
        setErrMsg("Register failed");
      }
      errRef.current.focus();
    }
  };
  return (
    <div className="cont-login-bg">
      <div className="login-cont">
        <p
          ref={errRef}
          className={errMsg ? "errmsg" : "offscreen"}
          aria-live="assertive"
        >
          {errMsg}
        </p>
        <h2 className="title-login__login-cont">Register</h2>
        <form
          onSubmit={handleSubmit}
          encType="application/x-www-form-urlencoded"
        >
          <label htmlFor="name">Name : </label>
          <input
            type="text"
            name="name"
            id="name"
            onChange={(e) => setName(e.target.value)}
            ref={nameRef}
          />
          <label htmlFor="email">Email : </label>
          <input
            type="text"
            name="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password">Password : </label>
          <input
            type="text"
            name="password"
            id="password"
            onChange={(e) => setPwd(e.target.value)}
          />
          <button className="btn-login__login-cont"> Register</button>
        </form>
        <p className="sign-up-text__login-cont">
          Already have Account?
          <Link to="/login" replace> Sign In</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
