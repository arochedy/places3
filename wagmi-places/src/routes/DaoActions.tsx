import React, { useEffect } from "react";
import {
  useContractRead,
  useContractReads,
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
  useContractEvent,
  useAccount,
} from "wagmi";
import { daoAbi, daoAddress } from "../abi/dao-abi";
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Input,
  Container,
  Button,
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
  Heading,
} from "@chakra-ui/react";
import { DaoProposals } from "../components/DaoProposals";

export const DaoActions = () => {
  const [description, setDescription] = React.useState<string>();
  const [xMin, setXMin] = React.useState<number>(0);
  const [yMin, setYMin] = React.useState<number>(0);
  const [xMax, setXMax] = React.useState<number>(0);
  const [yMax, setYMax] = React.useState<number>(0);

  const { isConnected, address } = useAccount();

  const { config } = usePrepareContractWrite({
    address: daoAddress,
    abi: daoAbi,
    functionName: "addEraseProposal",
    args: [description, xMin, yMin, xMax, yMax],
    onError: (error) => {
      console.log(error);
    },
  });

  const {
    data: dataWrite,
    write: writeErasePixel,
    isError: isErrorWrite,
    isLoading: isLoadingWrite,
    error,
  } = useContractWrite(config);

  const {
    isLoading: isLoadingResult,
    isSuccess,
    data: dataWriteEnd,
  } = useWaitForTransaction({
    hash: dataWrite?.hash,
  });

  const {
    data: dataWriteChangeMapSize,
    write: writeChangeMapSize,
    isError: isErrorWriteChangeMapSize,
    isLoading: isLoadingWriteChangeMapSize,
    error: isErrorChangeMapSize,
  } = useContractWrite(config);

  const {
    isLoading: isLoadingResultChangeMapSize,
    isSuccess: iSuccessMapSize,
    data: dataWriteChnageMapSizeEnd,
  } = useWaitForTransaction({
    hash: dataWriteChangeMapSize?.hash,
  });

  return (
    <Container>
      <Tabs>
        <TabList>
          <Tab>Effacer des pixels</Tab>
          <Tab>Agrandir la carte</Tab>
          <Tab>Voter pour une proposition</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <div>
              <Heading lineHeight="tall">Effacer des pixels</Heading>
              <p>
                Vous pouvez proposer d'effacer des pixels sur la carte. Pour
                cela, vous devez indiquer les coordonnées des pixels à effacer.
              </p>
              <Input
                placeholder="description"
                onChange={(text) => setDescription(text.target.value)}
              />
              <NumberInput
                onChange={(value) => setXMin(Number(value))}
                defaultValue={0}
                min={0}
                max={200}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              <NumberInput
                onChange={(value) => setYMin(Number(value))}
                defaultValue={0}
                min={0}
                max={200}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              <NumberInput
                onChange={(value) => setXMax(Number(value))}
                defaultValue={0}
                min={0}
                max={200}
              >
                <NumberInputField placeholder="Xmax" />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              <NumberInput
                onChange={(value) => setYMax(Number(value))}
                defaultValue={0}
                min={0}
                max={200}
              >
                <NumberInputField placeholder="Ymax" />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              <Button onClick={() => writeErasePixel?.()}>Valider</Button>
            </div>
          </TabPanel>
          <TabPanel>
            <div>
              <Heading>Changer la taille de la carte</Heading>

              <Heading lineHeight="short" size="xs">
                Vous pouvez proposer d'agrandir la taille de la carte
              </Heading>

              <Input placeholder="description" />

              <NumberInput defaultValue={15} min={10} max={20}>
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>

              <NumberInput defaultValue={15} min={10} max={20}>
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              <Button onClick={() => console.log("test")}>Valider</Button>
            </div>
          </TabPanel>
          <TabPanel>
            <DaoProposals />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
};
