import { createContext, useState, useEffect, useCallback, ReactNode } from "react";
import { BrowserProviderContractRunner } from "@circles-sdk/adapter-ethers";
import { Sdk } from "@circles-sdk/sdk";
import { CirclesRpc, CirclesData} from "@circles-sdk/data";

interface CirclesSDKContextType {
  sdk: Sdk | null;
  isConnected: boolean;
  setIsConnected: React.Dispatch<React.SetStateAction<boolean>>;
  adapter: BrowserProviderContractRunner | null;
  circlesProvider: any | null;
  circlesAddress: any | null;
  initializeSdk: () => Promise<Sdk | null>;
  disconnectWallet: () => void;
  circlesData: any | null;
}

export const CirclesSDKContext = createContext<CirclesSDKContextType>({
    sdk: null,
    isConnected: false,
    setIsConnected: () => {},
    adapter: null,
    circlesProvider: null,
    circlesAddress: null,
    initializeSdk: async () => null,
    disconnectWallet: () => {},
    circlesData: null,
});

export const CirclesSDKProvider = ({ children }: { children: ReactNode }) => {
  const [sdk, setSdk] = useState<Sdk | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [adapter, setAdapter] = useState<BrowserProviderContractRunner | null>(null);
  const [circlesProvider, setCirclesProvider] = useState<any | null>(null);
  const [circlesAddress, setCirclesAddress] = useState<any | null>(null);
  const [circlesData, setCirclesData] = useState<any | null>(null);

  const chainConfig = {
    circlesRpcUrl: "https://static.94.138.251.148.clients.your-server.de/rpc/",
    v1HubAddress: "0x29b9a7fbb8995b2423a71cc17cf9810798f6c543",
    v2HubAddress: "0x3D61f0A272eC69d65F5CFF097212079aaFDe8267",
    migrationAddress: "0x28141b6743c8569Ad8B20Ac09046Ba26F9Fb1c90",
    nameRegistryAddress: "0x8D1BEBbf5b8DFCef0F7E2039e4106A76Cb66f968",
    profileServiceUrl: "https://static.94.138.251.148.clients.your-server.de/profiles/",
    baseGroupMintPolicy: "0x79Cbc9C7077dF161b92a745345A6Ade3fC626A60",
  };

  const initializeSdk = useCallback(async () => {
    try {
      const newAdapter = new BrowserProviderContractRunner();
      await newAdapter.init();
      setAdapter(newAdapter);

      const provider = newAdapter.provider;
      const address = await newAdapter.address;

      setCirclesProvider(provider);
      setCirclesAddress(address);

      const sdkInstance = new Sdk(newAdapter, chainConfig);
     
      setSdk(sdkInstance);
      setIsConnected(true);
      
      console.log("SDK initialized:", sdkInstance);

      const circlesRpc = new CirclesRpc(
        'https://rpc.aboutcircles.com/'
      );
      const data = new CirclesData(circlesRpc);
      setCirclesData(data);
      console.log(circlesData);
      return sdkInstance;
    } catch (error) {
      console.error("Error initializing SDK:", error);
      setIsConnected(false);
      return null;
    
    }
  }, []);

  useEffect(() => {
    initializeSdk();
  }, [initializeSdk]);
  

  const disconnectWallet = useCallback(() => {
    setIsConnected(false);
    setCirclesAddress(null);
    setSdk(null);
  }, []);

  return (
    <CirclesSDKContext.Provider
      value={{
        sdk,
        isConnected,
        setIsConnected,
        adapter,
        circlesProvider,
        circlesAddress,
        initializeSdk,
        disconnectWallet,
        circlesData,
      }}
    >
      {children}
    </CirclesSDKContext.Provider>
  );
};
