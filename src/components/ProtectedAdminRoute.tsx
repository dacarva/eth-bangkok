import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { dbData } from "../data/users";

interface Props {
  children: React.ReactNode;
}

interface User {
  email: string;
  address: string;
  role: string;
}

const ProtectedAdminRoute = ({ children }: Props) => {
  const { user } = useDynamicContext();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAdminRole = () => {
      if (user?.email) {
        console.log("Checking admin role for email:", user.email);
        const users: User[] = dbData.users;
        console.log("Users from db:", users);

        const userFound = users.find(
          (u) => u.email.toLowerCase() === user.email?.toLowerCase()
        );
        console.log("User found:", userFound);

        setIsAdmin(userFound?.role === "admin");
        console.log("Is admin?:", userFound?.role === "admin");
      } else {
        console.log("No user email found");
        setIsAdmin(false);
      }
    };

    checkAdminRole();
  }, [user?.email]);

  if (isAdmin === null) {
    return <div>Loading...</div>;
  }

  if (!user?.email || !isAdmin) {
    console.log(
      "Redirecting to home. User email:",
      user?.email,
      "Is admin:",
      isAdmin
    );
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedAdminRoute;
