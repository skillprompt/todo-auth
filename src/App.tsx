import "./App.css";
import { LoginForm } from "./components/login-form";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { DashboardPage } from "./pages/dashboard";
import { AuthProvider } from "./store/auth";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginForm />,
  },
  {
    path: "/dashboard",
    element: <DashboardPage />,
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
