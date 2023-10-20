import { useEffect, useRef } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const LoginPage = () => {
  const { user, handleUserLogin, error, setError } = useAuth();
  const formRef = useRef();
  const navigate = useNavigate();

  console.log("user Data is ..", user);

  useEffect(() => {
    if (error) {
      toast(error);      
    }
    else if (user) {
      navigate("/");
    }
  }, [user, navigate, error,setError]);

  console.log(formRef.current);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUserLogin(
      formRef.current.email.value,
      formRef.current.password.value
    );
  };

  return (
    <>
      <div className="auth--container">
        <div className="form--wrapper">
          {/* {error && <p>{error}</p>} */}
          <form onSubmit={handleSubmit} ref={formRef}>
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
              <input
                className="btn btn--lg btn--main"
                type="submit"
                value={"login"}
              />
            </div>
          </form>
          <p>
            Dont have an account register <Link to="/signup">Here</Link>
          </p>
        </div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />
    </>
  );
};

export default LoginPage;
