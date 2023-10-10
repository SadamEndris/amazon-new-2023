import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { auth } from "../../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        if (userCredential) {
          navigate("/");
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const register = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // console.log(auth);
        if (userCredential) {
          navigate("/");
        }
        // signin
        // automatically goto to home page
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <div className="login">
      <Link to="/">
        <img
          src="data:image/png;base64,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"
          alt="amazon logo"
          className="login__logo"
        />
      </Link>
      <div className="login__container">
        <h1>Sign-in</h1>
        <form>
          <h5>E-mail</h5>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <h5>Password</h5>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            onClick={signIn}
            className="login__signInButton"
          >
            Sign In
          </button>
        </form>
        <p>
          By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use &
          Sale. Please see our Privacy Notice, our Cookies Notice and our
          Interest-Based Ads Notice.
        </p>
        <button onClick={register} className="login__registerButton">
          Create your Amazon Account
        </button>
      </div>
    </div>
  );
}

export default Login;
