import { ethers } from "hardhat";

import fs from "fs-extra";
import path from "path";

async function main() {
  const Places = await ethers.getContractFactory("Places");
  const places = await Places.deploy();

  await places.deployed();

  // places.addColor(255, 0, 0);
  // places.addColor(0, 255, 0);
  // places.addColor(0, 0, 255);
  // places.addColor(255, 255, 0);

  const daoFactory = await ethers.getContractFactory("PlacesDao");
  const dao = await daoFactory.deploy(places.address);

  await dao.deployed();

  //Déplacez le fichier JSON du contrat compilé vers le dossier du client
  // const clientDir = path.resolve(__dirname, "../../wagmi-places/src/contracts");
  // const localDir = path.resolve(__dirname, "../artifacts/contracts/Places.sol");

  // const contractFileName = "Places.json";

  // await fs.copyFile(
  //   path.resolve(localDir, contractFileName),
  //   path.resolve(clientDir, contractFileName),
  //   (err) => {
  //     if (err) throw err;
  //     console.log("File was copied to destination");
  //   }
  // );

  // console.log(
  //   `Fichier JSON du contrat déplacé de ${localDir} vers ${clientDir}`
  // );

  console.log(`Places deployed to ${places.address}`);
  /////////////////////////////////////////////////

  // const localDaoFile = path.resolve(
  //   __dirname,
  //   "../artifacts/contracts/PlacesDao.sol"
  // );

  // const contractDaoFileName = "PlacesDao.json";

  // await fs.copyFile(
  //   path.resolve(localDaoFile, contractDaoFileName),
  //   path.resolve(clientDir, contractDaoFileName),
  //   (err) => {
  //     if (err) throw err;
  //     console.log("File was not copied to destination");
  //   }
  // );

  console.log(`DAO deployed to ${dao.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
