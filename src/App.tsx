import {
  DynamicContextProvider,
  DynamicWidget,
} from "@dynamic-labs/sdk-react-core";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { dbData } from "./data/users";

import AdminDashboard from "./pages/admin-dashboard";
import Marketplace from "./pages/marketplace";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute";

// Componente separado para el Nav para poder usar hooks
const Nav = () => {
  const { user } = useDynamicContext();
  const location = useLocation();

  const isAdmin = user?.email
    ? dbData.users.some(
        (u) =>
          u.email.toLowerCase() === user.email?.toLowerCase() &&
          u.role === "admin"
      )
    : false;

  const linkStyles =
    "px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 flex items-center gap-1.5";

  const getLinkStyles = (path: string) => {
    const isActive = location.pathname === path;
    return isActive
      ? `${linkStyles} bg-teal-100 text-teal-800 border border-teal-200`
      : `${linkStyles} bg-white text-teal-600 border border-teal-200 hover:bg-teal-50 active:bg-teal-100`;
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto flex justify-between items-center py-3 px-4">
        <div className="flex items-center space-x-4">
          <h1 className="text-lg font-bold text-teal-700">Social Trade</h1>
          <div className="flex gap-2">
            <Link to="/" className={getLinkStyles("/")}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
              Marketplace
            </Link>
            {isAdmin && (
              <Link to="/admin" className={getLinkStyles("/admin")}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                    clipRule="evenodd"
                  />
                </svg>
                Admin
              </Link>
            )}
          </div>
        </div>
        <div className="flex items-center">
          <DynamicWidget />
        </div>
      </div>
    </nav>
  );
};

// Componente principal App
const App = () => (
  <DynamicContextProvider
    settings={{
      environmentId: "46233de9-4c89-4253-b5e0-a2854b2d08ee",
      walletConnectors: [EthereumWalletConnectors],
    }}
  >
    <BrowserRouter>
      <Nav />
      <main className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Marketplace />} />
          <Route
            path="/admin"
            element={
              <ProtectedAdminRoute>
                <AdminDashboard />
              </ProtectedAdminRoute>
            }
          />
        </Routes>
      </main>
    </BrowserRouter>
  </DynamicContextProvider>
);

export default App;
