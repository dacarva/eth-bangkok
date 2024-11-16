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
    <DynamicWidget />
    <Marketplace />
  </DynamicContextProvider>
);

export default App;
