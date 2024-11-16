import {
  DynamicContextProvider,
  DynamicWidget,
} from "@dynamic-labs/sdk-react-core";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";

import Marketplace from "./components/marketplace";

const App = () => (
  <DynamicContextProvider
    settings={{
      environmentId: "46233de9-4c89-4253-b5e0-a2854b2d08ee",
      walletConnectors: [EthereumWalletConnectors],
    }}
  >
    <nav className="bg-teal-50 shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        <h1 className="text-xl font-bold text-teal-700">Social Trade</h1>
        <div className="flex items-center">
          <DynamicWidget />
        </div>
      </div>
    </nav>
    <Marketplace />
  </DynamicContextProvider>
);

export default App;
