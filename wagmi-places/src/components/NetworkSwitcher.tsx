import { useNetwork, useSwitchNetwork } from "wagmi";
import { Button, ButtonGroup } from "@chakra-ui/react";

export function NetworkSwitcher() {
  const { chain } = useNetwork();
  const { chains, error, isLoading, pendingChainId, switchNetwork } =
    useSwitchNetwork();

  if (!chain) return null;

  return (
    <div>
      <div>
        Réseau : {chain?.name ?? chain?.id}
        {chain?.unsupported && " (unsupported)"}
      </div>

      {switchNetwork && (
        <div>
          {chains.map((x) =>
            x.id === chain?.id ? null : (
              <Button
                key={x.id}
                colorScheme="blue"
                onClick={() => switchNetwork(x.id)}
              >
                {x.name}
                {isLoading && x.id === pendingChainId && " (switching)"}
              </Button>
            )
          )}
        </div>
      )}

      <div>{error && error.message}</div>
    </div>
  );
}
