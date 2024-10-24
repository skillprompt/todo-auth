import React, { createContext, useContext, useEffect, useState } from "react";

type TUser = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  created_at: string;
};

type TUpdateUserFn = (user: null | TUser) => void;

const AuthCtx = createContext<{
  data: null | TUser;
  updateUser: TUpdateUserFn;
}>({
  data: null,
  updateUser: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<null | TUser>(null);

  useEffect(() => {
    async function getMe() {
      const res = await fetch("http://localhost:4000/auth/me", {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) {
        console.error("failed to get me0", data);
        return;
      }

      setUser(data.data);
    }

    getMe();
  }, []);

  const updateUser: TUpdateUserFn = (user) => {
    setUser(user);
  };

  return (
    <AuthCtx.Provider value={{ data: user, updateUser }}>
      {children}
    </AuthCtx.Provider>
  );
}

export const useAuth = () => useContext(AuthCtx);
