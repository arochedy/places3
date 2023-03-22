import { ethers } from "hardhat";

async function main() {

  const Places = await ethers.getContractFactory("Places");
  const places = await Places.deploy();

  await places.deployed();

  console.log(
    `Places deployed to ${lock.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
