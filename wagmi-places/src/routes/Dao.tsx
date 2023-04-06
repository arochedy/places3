import React, { useEffect } from "react";
import { placesAbi, placesAddress } from "../abi/places-abi";
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
} from "@chakra-ui/react";
import { Highlight, Heading } from "@chakra-ui/react";
import { DaoProposals } from "../components/DaoProposals";

enum PropTypes {
  "erase" = 0,
  "changeMapSize" = 1,
}
export const Dao = () => {
  // DAO deployed to
  const [propType, setPropType] = React.useState<PropTypes>();
  const [description, setDescription] = React.useState<string>();
  const [xMin, setXMin] = React.useState<number>();
  const [yMin, setYMin] = React.useState<number>();
  const [xMax, setXMax] = React.useState<number>();
  const [yMax, setYMax] = React.useState<number>();
  const [isVoter, setIsVoter] = React.useState<boolean>(false);
  // useContractEvent({
  //   address: daoAddress,
  //   abi: daoAbi,
  //   eventName: "VoteForColorPixel",
  //   listener(node, label, owner) {
  //     console.log("test");
  //     console.log(node, label, owner);
  //   },
  // });

  // const { data, isError, isLoading } = useContractReads({
  //   contracts: [
  //     {
  //       address: daoAddress,
  //       abi: daoAbi,
  //       functionName: "erasePixelsProposals",
  //     },
  //     // ,
  //     // {
  //     //   address: daoAddress,
  //     //   abi: daoAbi,
  //     //   functionName: "getPixels",
  //     // },
  //     // {
  //     //   address: daoAddress,
  //     //   abi: daoAbi,
  //     //   functionName: "mapWidth",
  //     // },
  //     // {
  //     //   address: daoAddress,
  //     //   abi: daoAbi,
  //     //   functionName: "mapHeight",
  //     // },
  //   ],
  // });
  const { isConnected, address } = useAccount();

  const {
    data: userVoteCountData,
    isError,
    isLoading,
  } = useContractRead({
    address: placesAddress,
    abi: placesAbi,
    functionName: "userVoteCount",
    args: [address],
  });

  useEffect(() => {
    if (userVoteCountData) {
      setIsVoter(userVoteCountData > 0);
    }
  }, [userVoteCountData]);

  const { config } = usePrepareContractWrite({
    address: daoAddress,
    abi: daoAbi,
    functionName: "addEraseProposal",
    args: [description, xMin, yMin, xMax, yMin],
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

  return (
    <Container>
      <Tabs>
        <TabList>
          <Tab> Effacer des pixels</Tab>
          <Tab> Agrandir la carte</Tab>
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
                <Highlight
                  query="agrandir"
                  styles={{ px: "2", py: "1", rounded: "full", bg: "red.100" }}
                >
                  Vous pouvez proposer d'agrandir la taille de la carte
                </Highlight>
              </Heading>
              <p></p>
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
