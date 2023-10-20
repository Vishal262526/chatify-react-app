import { createContext, useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { account } from "../appwrite/config";
const AuthContext = createContext();
import { Comment } from "react-loader-spinner";
import { ID } from "appwrite";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  // const [error, setError] = useState("");

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await account.get();
      setUser(res);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUserLogin = async (email, password) => {
    setLoading(true);
    setError("");

    try {
      const res = await account.createEmailSession(email, password);
      setUser(res);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUserLogout = async () => {
    try {
      setLoading(true);
      setError("");
      await account.deleteSession("current");
      setUser(null);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUserRegister = async (name, email, password) => {
    try {
      setLoading(true);
      setError("");
      await account.create(ID.unique(), email, password, name);
      const res = await account.createEmailSession(email, password);
      setUser(res);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const contextData = {
    user,
    loading,
    error,
    setError,
    handleUserLogin,
    handleUserLogout,
    handleUserRegister,
  };
  return (
    <AuthContext.Provider value={contextData}>
      {loading ? (
        <>
          <div className="loading--wrapper">
            <Comment
              visible={true}
              height="100"
              width="100"
              ariaLabel="comment-loading"
              wrapperStyle={{}}
              wrapperClass="comment-wrapper"
              color="#fff"
              backgroundColor="#DB1A5A"
            />
          </div>
        </>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined)
    return new Error("Auth Context is useed outside of provider");
  return context;
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthContext;
