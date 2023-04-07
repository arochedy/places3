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
import { DaoProposals } from "./DaoProposals";

export const DaoActions = () => {
  const [description, setDescription] = React.useState<string>();
  const [xMin, setXMin] = React.useState<number>(0);
  const [yMin, setYMin] = React.useState<number>(0);
  const [xMax, setXMax] = React.useState<number>(0);
  const [yMax, setYMax] = React.useState<number>(0);
  const [red, setRed] = React.useState<number>(0);
  const [green, setGreen] = React.useState<number>(0);
  const [blue, setBlue] = React.useState<number>(0);
  const [mapWidth, setMapWidth] = React.useState<number>(0);

  const [mapHeight, setMapHeight] = React.useState<number>(0);

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

  /* change mapSize */
  const { config: configChangeMapSize, isError: isErrorWriteChangeMapSize } =
    usePrepareContractWrite({
      address: daoAddress,
      abi: daoAbi,
      functionName: "addChangeMapSizeProposal",
      args: [description, 400, 405],
      onError: (error) => {
        console.log("ici", error);
      },
    });

  const {
    data: dataWriteChangeMapSize,
    write: writeChangeMapSize,
    // isError: isErrorWriteChangeMapSize,
    isLoading: isLoadingWriteChangeMapSize,
    error: isErrorChangeMapSize,
  } = useContractWrite(configChangeMapSize);

  const {
    isLoading: isLoadingResultChangeMapSize,
    isSuccess: iSuccessMapSize,
    data: dataWriteChnageMapSizeEnd,
  } = useWaitForTransaction({
    hash: dataWriteChangeMapSize?.hash,
  });

  /* end change mapSize */

  /* add color */
  const { config: configAddColor } = usePrepareContractWrite({
    address: daoAddress,
    abi: daoAbi,
    functionName: "addAddColorProposal",
    args: [description, red, green, blue],
    onError: (error) => {
      console.log(error);
    },
  });
  const {
    data: dataWriteAddColor,
    write: writeAddColor,
    isError: isErrorWriteAddColor,
    isLoading: isLoadingWriteAddColor,
    error: isErrorAddColor,
  } = useContractWrite(configAddColor);

  const {
    isLoading: isLoadingAddColor,
    isSuccess: isSuccessAddColor,
    data: dataWriteAddColorEnd,
  } = useWaitForTransaction({
    hash: dataWriteAddColor?.hash,
  });
  /* end add color */

  return (
    <Container>
      <Tabs>
        <TabList>
          <Tab>Effacer des pixels</Tab>
          <Tab>Ajouter une couleur</Tab>
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
              <Heading>Ajouter une couleur</Heading>

              <Heading lineHeight="short" size="xs">
                Vous pouvez proposer d'ajouter une couleur
              </Heading>

              <Input
                placeholder="description"
                onChange={(text) => setDescription(text.target.value)}
              />

              <NumberInput
                defaultValue={0}
                min={0}
                max={255}
                placeholder="Rouge"
                onChange={(value) => setRed(Number(value))}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>

              <NumberInput
                defaultValue={0}
                min={0}
                max={255}
                placeholder="Vert"
                onChange={(value) => setGreen(Number(value))}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>

              <NumberInput
                defaultValue={0}
                min={0}
                max={255}
                placeholder="Bleu"
                onChange={(value) => setBlue(Number(value))}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              <Button onClick={() => writeAddColor?.()}>Valider</Button>
            </div>
          </TabPanel>
          <TabPanel>
            <div>
              <Heading>Changer la taille de la carte</Heading>

              <Heading lineHeight="short" size="xs">
                Vous pouvez proposer d'agrandir la taille de la carte
              </Heading>

              <Input
                placeholder="description"
                onChange={(text) => setDescription(text.target.value)}
              />

              <NumberInput
                defaultValue={250}
                min={250}
                placeholder="Largeur"
                onChange={(value) => setMapWidth(Number(value))}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>

              <NumberInput
                defaultValue={250}
                min={250}
                placeholder="Hauteur"
                onChange={(value) => setMapHeight(Number(value))}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              <Button onClick={() => writeChangeMapSize?.()}>Valider</Button>
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
