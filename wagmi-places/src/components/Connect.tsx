import { useAccount, useConnect, useDisconnect } from "wagmi";
import {
  Button,
  ButtonGroup,
  Wrap,
  WrapItem,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useState } from "react";
import { Account } from "./Account";
import { NetworkSwitcher } from "./NetworkSwitcher";

export function Connect() {
  const { connector, isConnected } = useAccount();

  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();
  const { disconnect } = useDisconnect();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <div>
        {isConnected ? (
          <>
            <Account />
            <div className="row">
              <NetworkSwitcher />
            </div>
            <div className="row" style={{ justifyContent: "space-between" }}>
              <Button
                colorScheme="blue"
                display={"block"}
                onClick={() => disconnect()}
              >
                Logout
              </Button>
              {/* <Button
                display={"block"}
                colorScheme="blue"
                onClick={() => setIsModalOpen(true)}
              >
                Autres moyen de connection
              </Button> */}
              <Button
                display={"block"}
                onClick={() => (location.href = "/dao")}
              >
                DAO
              </Button>
            </div>
          </>
        ) : (
          connectors
            .filter((x) => x.ready && x.id !== connector?.id)
            .map((x) => (
              <Button
                variant="link"
                display={"block"}
                key={x.id}
                onClick={() => connect({ connector: x })}
              >
                {x.name}
                {isLoading && x.id === pendingConnector?.id && " (connecting)"}
              </Button>
            ))
        )}
      </div>

      {error && <div>{error.message}</div>}

      <Modal
        isOpen={isModalOpen}
        closeOnEsc
        onClose={() => setIsModalOpen(false)}
      >
        <ModalContent>
          <ModalBody>
            {connectors
              .filter((x) => x.ready && x.id !== connector?.id)
              .map((x) => (
                <Button
                  variant="link"
                  display={"block"}
                  key={x.id}
                  onClick={() => connect({ connector: x })}
                >
                  {x.name}
                  {isLoading &&
                    x.id === pendingConnector?.id &&
                    " (connecting)"}
                </Button>
              ))}
          </ModalBody>
          <ModalFooter>
            <Button
              mr={3}
              variant="outline"
              onClick={() => setIsModalOpen(false)}
            >
              Fermer
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
