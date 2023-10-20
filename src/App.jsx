import "./App.css";
import Room from "./pages/Room";
import LoginPage from "./pages/LoginPage";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import PrivateRoute from "./routes/PrivateRoute";
import { AuthProvider } from "./contexts/AuthContext";

const router = createBrowserRouter([
  {
    element: <PrivateRoute />,
    children: [
      {
        path: "/",
        element: <Room />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
]);

function App() {
  return (
    <AuthProvider>
  
      <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
  );
}

export default App;
