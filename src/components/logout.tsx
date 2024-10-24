import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";

export function Logout() {
  const navigate = useNavigate();

  const authCtx = useAuth();

  const handleLogout = async () => {
    const res = await fetch("http://localhost:4000/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    const data = await res.json();

    if (!res.ok) {
      console.error(data.message);
      return;
    }

    console.log("logged out...", data);
    authCtx.updateUser(null);

    navigate("/");
  };

  return (
    <button onClick={handleLogout} type="button">
      Logout
    </button>
  );
}
