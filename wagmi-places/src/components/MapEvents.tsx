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
import {
  PixelChangedEvent,
  VoteForColorPixelEvent,
} from "../models/placesEvents";

export function MapEvents() {
  const [events, setEvents] = useState<VoteForColorPixelEvent[]>([]);
  const [pixelChangedEvents, setPixelChangedEvents] = useState<
    PixelChangedEvent[]
  >([]);

  useContractEvent({
    address: placesAddress,
    abi: placesAbi,
    eventName: "VoteForColorPixel",

    listener(x, y, color, voter) {
      let colorId = BigNumber.from(color).toNumber();
      let event: VoteForColorPixelEvent = {
        x: Number(x),
        y: Number(y),
        colorId: colorId,
        voter: voter as string,
      };
      setEvents((events) => [...events, event]);
    },
  });

  useContractEvent({
    address: placesAddress,
    abi: placesAbi,
    eventName: "PixelChanged",

    listener(x, y, color, voteCount) {
      let colorId = BigNumber.from(color).toNumber();

      let event: PixelChangedEvent = {
        x: Number(x),
        y: Number(y),
        color: colorId,
        voteCount: BigNumber.from(voteCount).toNumber(),
      };
      setPixelChangedEvents((events) => [...events, event]);
    },
  });

  const provider = useProvider(); // Alchemy

  const contract = useContract({
    address: placesAddress,
    abi: placesAbi,
    signerOrProvider: provider,
  });

  useEffect(() => {
    if (contract !== null) {
      contract.queryFilter("VoteForColorPixel", -10000).then((events) => {
        console.log(events);
        let finalEvents: VoteForColorPixelEvent[] = [];

        events.forEach((event) => {
          let colorId = BigNumber.from(event?.args?.color).toNumber();
          finalEvents.push({
            x: event?.args?.x,
            y: event?.args?.y,
            colorId,
            voter: event?.args?.voter,
          });
        });

        setEvents(finalEvents);
      });

      contract.queryFilter("PixelChanged", -10000).then((events) => {
        let finalEvents: PixelChangedEvent[] = [];

        events.forEach((event) => {
          let colorId = BigNumber.from(event?.args?.color).toNumber();
          finalEvents.push({
            x: event?.args?.x,
            y: event?.args?.y,
            color: colorId,
            voteCount: BigNumber.from(event?.args?.voteCount).toNumber(),
          });
        });
        setPixelChangedEvents(finalEvents);
      });
      // contract
      //   ?.queryFilter("VoteForColorPixel", -1000)
      //   .then((events) => {
      //     console.log(events);
      //   })
      //   .catch((e) => console.log(e));
    }
  }, [contract]);

  return (
    <div>
      <div>Historique des votes</div>
      <List>
        {events.map((event: any) => (
          <ListItem>
            X : {event.x} Y {event.y} ColorId : {event.color} voter :{" "}
            {event.voter}
          </ListItem>
        ))}
      </List>

      <div>Historique des changement de couleur</div>
      <List>
        {pixelChangedEvents.map((event) => (
          <ListItem>
            {event.x} Y {event.y} ColorId :{" "}
            {BigNumber.from(event.color).toNumber()} Nombre de votes :{" "}
            {BigNumber.from(event.voteCount).toNumber()}
          </ListItem>
        ))}
      </List>
    </div>
  );
}
