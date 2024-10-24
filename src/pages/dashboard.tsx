import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Logout } from "../components/logout";

export function DashboardPage() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [message, setMessage] = useState("");

  const [loggedInUser, setLoggedInUser] = useState<{
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    created_at: string;
  } | null>(null);

  useEffect(() => {
    setMessage("");
    setLoggedInUser(null);

    async function getMe() {
      const res = await fetch("http://localhost:4000/auth/me", {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) {
        setIsLoggedIn(false);
        setMessage(data.message);
        navigate("/");
        return;
      }
      setIsLoggedIn(true);
      setLoggedInUser(data.data);
    }

    getMe();
  }, [navigate]);

  if (!isLoggedIn) {
    return <div>{message}</div>;
  }

  return (
    <div>
      You can access dashboard
      <div>as {loggedInUser?.email}</div>
      <div>
        <Logout />
      </div>
    </div>
  );
}
