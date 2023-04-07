import { useEffect, useState } from "react";
import {
  useContract,
  useContractEvent,
  useContractRead,
  useContractReads,
  useContractWrite,
  usePrepareContractWrite,
  useProvider,
  useWaitForTransaction,
} from "wagmi";
import { BigNumber } from "ethers";
import { placesAbi, placesAddress } from "../abi/places-abi";

import {
  List,
  ListItem,
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Text,
  Stack,
  Heading,
  Box,
  StackDivider,
  Button,
  useToast,
} from "@chakra-ui/react";
import { daoAbi, daoAddress } from "../abi/dao-abi";
import { ProposalExecutedEvent } from "../models/daoEvents";
import {
  AddColorProposal,
  AddColorProposalInfos,
  ChangeMapSizeProposalsInfos,
  ErasePixelsProposalInfos,
} from "../models/daoProposals";

export function DaoProposals() {
  const [proposalExecutedEvents, setProposalExecutedEvents] = useState<any[]>(
    []
  );
  const [votedEvents, setVotedEvents] = useState<any[]>([]);
  const [erasePixelsProposals, setErasePixelsProposals] = useState<
    ErasePixelsProposalInfos[]
  >([]);
  const [addColorProposals, setAddColorProposals] = useState<
    AddColorProposalInfos[]
  >([]);
  const [changeMapSizeProposals, setChangeMapSizeProposals] = useState<
    ChangeMapSizeProposalsInfos[]
  >([]);

  const [selectedProposal, setSelectedProposal] = useState<any>(null);
  const [selectedProposalType, setSelectedProposalType] = useState<0 | 1 | 2>();
  const toast = useToast();
  const provider = useProvider();

  // ErasePixelsProposal[] public erasePixelsProposals;
  // AddColorProposal[] public addColorProposals;
  // ChangeMapSizeProposal[] public changeMapSizeProposals;

  const { data, isError, isLoading, error } = useContractReads({
    watch: true,
    contracts: [
      {
        address: daoAddress,
        abi: daoAbi,
        functionName: "erasePixelsProposalCount",
      },
      {
        address: daoAddress,
        abi: daoAbi,
        functionName: "getEraseProposals",
      },
      {
        address: daoAddress,
        abi: daoAbi,
        functionName: "getEraseProposalInfos",
      },
      {
        address: daoAddress,
        abi: daoAbi,
        functionName: "getAddColorProposals",
      },
      {
        address: daoAddress,
        abi: daoAbi,
        functionName: "getAddColorProposalsInfos",
      },
      {
        address: daoAddress,
        abi: daoAbi,
        functionName: "getChangeMapSizeProposals",
      },
      {
        address: daoAddress,
        abi: daoAbi,
        functionName: "getChangeMapSizeProposalsInfos",
      },
    ],
  });

  useEffect(() => {
    console.log(isLoading);
    console.log(isError, error);
    console.log(data);
    if (data) {
      let proposals: ErasePixelsProposalInfos[] = [];
      let proposalsBack = data[1] as any[];
      let proposalsInfos = data[2] as any[];
      for (let i = 0; i < proposalsBack.length; i++) {
        let newProposal: ErasePixelsProposalInfos = {
          xMin: proposalsBack[i].xMin,
          yMin: proposalsBack[i].yMin,
          xMax: proposalsBack[i].xMax,
          yMax: proposalsBack[i].yMax,
          executed: proposalsInfos[i].executed,
          votesFor: BigNumber.from(proposalsInfos[i].votesFor).toNumber(),
          proposer: proposalsInfos[i].proposer,
          description: proposalsInfos[i].description,
        };
        proposals.push(newProposal);
      }
      setErasePixelsProposals(proposals);

      let addColorproposals: AddColorProposalInfos[] = [];
      let addColorproposalsBack = data[3] as any[];
      let addColorproposalsInfos = data[4] as any[];
      for (let i = 0; i < addColorproposalsBack.length; i++) {
        let newProposal: AddColorProposalInfos = {
          red: addColorproposalsBack[i].red,
          green: addColorproposalsBack[i].green,
          blue: addColorproposalsBack[i].blue,
          executed: addColorproposalsInfos[i].executed,
          votesFor: BigNumber.from(
            addColorproposalsInfos[i].votesFor
          ).toNumber(),
          proposer: addColorproposalsInfos[i].proposer,
          description: addColorproposalsInfos[i].description,
        };
        addColorproposals.push(newProposal);
      }
      setAddColorProposals(addColorproposals);

      let changeMapSizeproposals: ChangeMapSizeProposalsInfos[] = [];
      let changeMapSizeproposalsBack = data[5] as any[];
      let changeMapSizeproposalsInfos = data[6] as any[];
      for (let i = 0; i < changeMapSizeproposalsBack.length; i++) {
        let newProposal: ChangeMapSizeProposalsInfos = {
          newMapHeight: changeMapSizeproposalsBack[i].newMapHeight,
          newMapWidth: changeMapSizeproposalsBack[i].newMapWidth,
          executed: changeMapSizeproposalsInfos[i].executed,
          votesFor: BigNumber.from(
            changeMapSizeproposalsInfos[i].votesFor
          ).toNumber(),
          proposer: changeMapSizeproposalsInfos[i].proposer,
          description: changeMapSizeproposalsInfos[i].description,
        };
        changeMapSizeproposals.push(newProposal);
      }
      setChangeMapSizeProposals(changeMapSizeproposals);
    }
  }, [data]);

  const { config } = usePrepareContractWrite({
    address: daoAddress,
    abi: daoAbi,
    functionName: "VoteForProposal",
    args: [selectedProposal, selectedProposalType],
  });
  const {
    data: dataWriteVote,
    write: writeVote,
    isError: isErrorWriteVote,
    isLoading: isLoadingWriteVote,
    error: errorWriteVote,
  } = useContractWrite(config);

  const {
    isLoading: isLoadingResult,
    isSuccess: isSuccessVote,
    data: dataWriteEnd,
  } = useWaitForTransaction({
    hash: dataWriteVote?.hash,
  });

  useEffect(() => {
    if (isSuccessVote) {
      toast({
        title: "Vote validé",
        description: "Votre vote est validé, bravo !",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  }, [isSuccessVote]);
  useEffect(() => {
    if (isErrorWriteVote) {
      toast({
        title: "Une erreur est survenue",
        description: "Aie votre vote n'a pas été pris en compte. Réessayez !",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  }, [isErrorWriteVote]);
  // useContractEvent({
  //   address: daoAddress,
  //   abi: daoAbi,
  //   eventName: "VoteForColorPixel",

  //   listener(node, label, owner) {
  //     console.log("test");
  //     console.log(node, label, owner);
  //   },
  // });

  const contract = useContract({
    address: daoAddress,
    abi: daoAbi,
    signerOrProvider: provider,
  });

  useEffect(() => {
    if (contract !== null) {
      contract.queryFilter("ProposalExecuted", -10000).then((events) => {
        console.log(events);
        setProposalExecutedEvents(events);
      });

      contract.queryFilter("Voted", -10000).then((events) => {
        console.log(events);
        setVotedEvents(events);
      });
    }
  }, [contract]);

  return (
    <div>
      <div>Propositions</div>

      <Tabs>
        <TabList>
          <Tab>Effacer des pixels</Tab>
          <Tab>Ajouter une couleur</Tab>
          <Tab>Agrandir la carte</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <div>Propositions d'effacement</div>
            {erasePixelsProposals.map((proposal, index) => {
              return (
                <Card
                  key={"eraseProposal" + index}
                  style={{ marginTop: 30 }}
                  onClick={() => {
                    setSelectedProposal(index + 1);
                    setSelectedProposalType(0);
                  }}
                >
                  <CardHeader>
                    <Heading size="md">{proposal.description}</Heading>
                  </CardHeader>

                  <CardBody>
                    <Stack divider={<StackDivider />} spacing="4">
                      <Box>
                        <Heading size="xs" textTransform="uppercase">
                          Pixels
                        </Heading>
                        <Text pt="2" fontSize="sm">
                          Xmin : {proposal.xMin}
                          Ymin : {proposal.yMin}
                          Xmax : {proposal.xMax}
                          Ymax : {proposal.yMax}
                        </Text>
                      </Box>
                      <Box>
                        <Heading size="xs" textTransform="uppercase">
                          Infos sur le vote
                        </Heading>
                        <Text pt="2" fontSize="sm">
                          Nombre de votes pour : {proposal.votesFor}
                          Executé : {proposal.executed ? "Oui" : "Non"}
                        </Text>
                        {!proposal.executed && (
                          <Button onClick={() => writeVote?.()}>Voter</Button>
                        )}
                      </Box>
                    </Stack>
                  </CardBody>
                </Card>
              );
            })}
          </TabPanel>
          <TabPanel>
            <div>Propositions</div>
            {addColorProposals.map((proposal, index) => {
              return (
                <Card
                  key={"addColorProposal" + index}
                  style={{ marginTop: 30 }}
                  onClick={() => {
                    setSelectedProposal(index + 1);
                    setSelectedProposalType(1);
                  }}
                >
                  <CardHeader>
                    <Heading size="md">{proposal.description}</Heading>
                  </CardHeader>

                  <CardBody>
                    <Stack divider={<StackDivider />} spacing="4">
                      <Box>
                        <Heading size="xs" textTransform="uppercase">
                          Infos
                        </Heading>
                        <Text pt="2" fontSize="sm">
                          red : {proposal.red}
                          green : {proposal.green}
                          blue : {proposal.blue}
                        </Text>
                      </Box>
                      <Box>
                        <Heading size="xs" textTransform="uppercase">
                          Infos sur le vote
                        </Heading>
                        <Text pt="2" fontSize="sm">
                          Nombre de votes pour : {proposal.votesFor}
                          Executé : {proposal.executed ? "Oui" : "Non"}
                        </Text>
                        {!proposal.executed && (
                          <Button
                            onClick={() => {
                              setSelectedProposal(index + 1);
                              setSelectedProposalType(1);
                              writeVote?.();
                            }}
                          >
                            Voter
                          </Button>
                        )}
                      </Box>
                    </Stack>
                  </CardBody>
                </Card>
              );
            })}
          </TabPanel>
          <TabPanel>
            <div>Propositions </div>
            {changeMapSizeProposals.map((proposal, index) => {
              return (
                <Card
                  key={"changeMapSize" + index}
                  style={{ marginTop: 30 }}
                  onClick={() => {
                    setSelectedProposal(index + 1);
                    setSelectedProposalType(2);
                  }}
                >
                  <CardHeader>
                    <Heading size="md">{proposal.description}</Heading>
                  </CardHeader>

                  <CardBody>
                    <Stack divider={<StackDivider />} spacing="4">
                      <Box>
                        <Heading size="xs" textTransform="uppercase">
                          Infos
                        </Heading>
                        <Text pt="2" fontSize="sm">
                          Nouvelle Largeur : {proposal.newMapWidth}
                          Nouvelle hauteur : {proposal.newMapHeight}
                        </Text>
                      </Box>
                      <Box>
                        <Heading size="xs" textTransform="uppercase">
                          Infos sur le vote
                        </Heading>
                        <Text pt="2" fontSize="sm">
                          Nombre de votes pour : {proposal.votesFor}
                          Executé : {proposal.executed ? "Oui" : "Non"}
                        </Text>
                        {!proposal.executed && (
                          <Button
                            onClick={() => {
                              setSelectedProposal(index + 1);
                              setSelectedProposalType(2);
                              writeVote?.();
                            }}
                          >
                            Voter
                          </Button>
                        )}
                      </Box>
                    </Stack>
                  </CardBody>
                </Card>
              );
            })}
          </TabPanel>
        </TabPanels>
      </Tabs>
      <div>Historique des votes</div>
      <List>
        {proposalExecutedEvents.map((event: any, index: number) => (
          <ListItem key={"proposalEvent" + index}>
            {JSON.stringify(event.args)}X : {event.args.x} Y {event.args.y}{" "}
            ColorId :{" "}
            {/* {BigNumber.from(event.args.color).toNumber()} voter :{" "} */}
            {event.args.voter}
          </ListItem>
        ))}
      </List>

      <div>Propositions executés</div>
      <List>
        {votedEvents.map((event: any, index: number) => (
          <ListItem key={"voted" + index}>
            {/* {JSON.stringify(event.args)} */}
            {event.args.x} Y {event.args.y} ColorId :{" "}
            {/* {BigNumber.from(event.args.color).toNumber()} Nombre de votes :{" "}
            {BigNumber.from(event.args.voteCount).toNumber()} */}
            {/* X : {event.args.x} Y {event.args.Y} ColorId :{" "}
            {BigNumber.from(event.args.color).toNumber()} voter :{" "}
            {event.args.voter} */}
          </ListItem>
        ))}
      </List>
    </div>
  );
}
