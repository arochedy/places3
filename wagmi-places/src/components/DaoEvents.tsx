import { useEffect, useState } from "react";
import {
  useContract,
  useContractEvent,
  useContractRead,
  useProvider,
} from "wagmi";
import { BigNumber } from "ethers";
import { placesAbi, placesAddress } from "../abi/places-abi";

import { List, ListItem } from "@chakra-ui/react";
import { daoAbi, daoAddress } from "../abi/dao-abi";

export function DaoEvents() {
  const [proposalExecutedEvents, setProposalExecutedEvents] = useState<any[]>(
    []
  );
  const [votedEvents, setVotedEvents] = useState<any[]>([]);

  // useContractEvent({
  //   address: daoAddress,
  //   abi: daoAbi,
  //   eventName: "VoteForColorPixel",

  //   listener(node, label, owner) {
  //     console.log("test");
  //     console.log(node, label, owner);
  //   },
  // });

  const provider = useProvider(); // Alchemy

  const contract = useContract({
    address: daoAddress,
    abi: daoAbi,
    signerOrProvider: provider,
  });

  useEffect(() => {
    //   event NewErasePixelsProposal(
    //     uint256 proposalId,
    //     address proposer,
    //     string description,
    //     uint8 xMin,
    //     uint8 yMin,
    //     uint8 xMax,
    //     uint8 yMax
    // );

    // event Voted(
    //     uint256 proposalId,
    //     ProposalTypes proposalType,
    //     address voter,
    //     bool voteFor,
    //     uint256 votesFor,
    //     uint256 votesAgainst
    // );

    // event ProposalExecuted(uint256 proposalId, ProposalTypes proposalType);

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
      <div>Historique des votes</div>
      <List>
        {proposalExecutedEvents.map((event: any) => (
          <ListItem>
            X : {event.args.x} Y {event.args.y} ColorId :{" "}
            {BigNumber.from(event.args.color).toNumber()} voter :{" "}
            {event.args.voter}
          </ListItem>
        ))}
      </List>

      <div>Propositions executés</div>
      <List>
        {votedEvents.map((event: any) => (
          <ListItem>
            {/* {JSON.stringify(event.args)} */}
            {event.args.x} Y {event.args.y} ColorId :{" "}
            {BigNumber.from(event.args.color).toNumber()} Nombre de votes :{" "}
            {BigNumber.from(event.args.voteCount).toNumber()}
            {/* X : {event.args.x} Y {event.args.Y} ColorId :{" "}
            {BigNumber.from(event.args.color).toNumber()} voter :{" "}
            {event.args.voter} */}
          </ListItem>
        ))}
      </List>
    </div>
  );
}
