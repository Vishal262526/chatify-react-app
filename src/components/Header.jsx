import { useAuth } from "../contexts/AuthContext";
import { LogOut } from "react-feather";

const Header = () => {
  const { user, handleUserLogout } = useAuth();
  return (
    <div id="header--wrapper">
      {user ? (
        <>
          Welcome {user.name}
          <LogOut onClick={handleUserLogout} />
        </>
      ) : (
        <>
          <button>Login</button>
        </>
      )}
    </div>
  );
};

export default Header;
