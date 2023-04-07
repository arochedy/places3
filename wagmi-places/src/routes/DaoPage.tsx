import React, { useEffect } from "react";
import { placesAbi, placesAddress } from "../abi/places-abi";
import { useContractRead, useAccount } from "wagmi";
import { BigNumber } from "ethers";

import { Container, Button } from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";
import { DaoInfo } from "./DaoInfo";
import { DaoActions } from "./DaoActions";

export const DaoPage = () => {
  const [isVoter, setIsVoter] = React.useState<boolean>(false);

  const { address } = useAccount();

  const {
    data: userVoteCountData,
    isError,
    isLoading,
  } = useContractRead({
    watch: true,
    address: placesAddress,
    abi: placesAbi,
    functionName: "userVoteCount",
    args: [address],
  });

  useEffect(() => {
    if (userVoteCountData) {
      setIsVoter(BigNumber.from(userVoteCountData).toNumber() > 0);
    }
  }, [userVoteCountData]);

  return (
    <Container>
      <Button onClick={() => (location.href = "/")}>Retour à la carte</Button>
      <Heading>DAO</Heading>
      {isVoter ? <DaoActions /> : <DaoInfo />}
    </Container>
  );
};
