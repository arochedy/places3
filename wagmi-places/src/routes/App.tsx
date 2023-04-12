import { useAccount } from "wagmi";

import { Account, Connect, NetworkSwitcher } from "../components";
import { Canvas } from "../components/Canvas";
import { Info } from "./Info";

import {
  Heading,
  Center,
  Wrap,
  WrapItem,
  Flex,
  Spacer,
} from "@chakra-ui/react";

export function App() {
  const { isConnected } = useAccount();

  return (
    <>
      <div
       className="header"
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <div></div>
        <Heading as="h1" size="4xl" noOfLines={1}>
          Pl3ces
        </Heading>
        <Connect />
      </div>

      {isConnected ? (
        <>
    
          <Canvas />
        </>
      ) : (
        <Info />
      )}
    </>
  );
}


