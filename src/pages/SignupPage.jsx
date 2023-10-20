import { useRef } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const { user, error, handleUserRegister } = useAuth();
  const formRef = useRef();
  const navigate = useNavigate();


  useEffect(() => {
    console.log("in Login page");
    console.log(user);
    if (user) navigate("/");
  }, [user, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = formRef.current.name.value;
    const email = formRef.current.email.value;
    const password = formRef.current.password.value;
    const password2 = formRef.current.password2.value;

    if (password === password2) {
      handleUserRegister(name, email, password);
    }
  };



  return (
    <div className="auth--container">
      <div className="form--wrapper">
        {error && <p>{error}</p>}
        <form onSubmit={handleSubmit} ref={formRef}>
          <div className="field--wrapper">
            <label htmlFor="name">Name</label>
            <input type="text" placeholder="Enter your Name" id="name" />
          </div>
          <div className="field--wrapper">
            <label htmlFor="email">Email</label>
            <input type="email" placeholder="Enter your Email" id="email" />
          </div>
          <div className="field--wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Enter your Password"
              id="password"
            />
          </div>
          <div className="field--wrapper">
            <label htmlFor="password2">Confirm Password</label>
            <input
              type="password"
              placeholder="Enter your Confirm Password"
              id="password2"
            />
          </div>
          <div className="field--wrapper">
            <input
              className="btn btn--lg btn--main"
              type="submit"
              value={"login"}
            />
          </div>
        </form>
        <p>
          If you already have an account <Link to="/login">LOGIN</Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
