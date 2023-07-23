import { useRef, useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

import useAuth from "../../../hook/useAuth";
import RoleList from "./RoleList";


import "./Auth.css";

import axios from "../../api/axios";

const REGISTER_URL = "/v1/register";
const ROLE_URL = "/v1/roles";

function Register() {
  const { setAuth } = useAuth();
  const [user, setUser] = useState({});
  const [rolesDataFromServer, setRolesDataFromServer] = useState([])
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const nameRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [pwd, setPwd] = useState("");
  const [role, setRole] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect( () => {
    async function getRoles (){
      try {
      const response = await axios.get(ROLE_URL);
      
        // console.log(response.data.data);
        setRolesDataFromServer(response.data.data);
        // return roles.json();
      } catch (error) {
        console.error(error);
      } finally{
        // console.log(rolesDataFromServer);
        // console.log(.json());
      }
    }

    console.log(getRoles());

    

    return () => {};
  }, []);

  useEffect(() => {
    nameRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, pwd, name]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify({ email: email, password: pwd }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      console.log(email);
      const accessToken = response?.data?.accessToken;
      // console.log(accessToken);
      const role = response?.data?.role;
      setAuth({ name, email, pwd, role, accessToken });

      setEmail("");
      setPwd("");
      navigate(from, { replace: true });
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (!err.response?.status === 400) {
        setErrMsg("Missing emailname or password");
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
          <label  htmlFor="name">
            name :{" "}
          </label>
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
          <select
            name="role"
            id="role"
            onChange={(e) => setRole(e.target.value)}
          >
            <option value=""></option>
            <RoleList roles={rolesDataFromServer}></RoleList>
          </select>
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

export default Register;
