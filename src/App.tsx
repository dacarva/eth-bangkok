import {
  DynamicContextProvider,
  DynamicWidget,
} from "@dynamic-labs/sdk-react-core";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import AdminDashboard from "./pages/admin-dashboard";
import Marketplace from "./pages/marketplace";

const App = () => (
  <DynamicContextProvider
    settings={{
      environmentId: "46233de9-4c89-4253-b5e0-a2854b2d08ee",
      walletConnectors: [EthereumWalletConnectors],
    }}
  >
    <BrowserRouter>
      <nav className="bg-teal-50 shadow-md">
        <div className="container mx-auto flex justify-between items-center p-4">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold text-teal-700">Social Trade</h1>
            <Link to="/" className="text-teal-600 hover:text-teal-800">
              Marketplace
            </Link>
            <Link to="/admin" className="text-teal-600 hover:text-teal-800">
              Admin
            </Link>
          </div>
          <div className="flex items-center">
            <DynamicWidget />
          </div>
        </div>
      </nav>

      <main className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Marketplace />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </main>
    </BrowserRouter>
  </DynamicContextProvider>
);

export default App;
