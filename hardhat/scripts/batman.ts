import { ethers } from "hardhat";

import fs from "fs-extra";
import path from "path";

async function dessinerBatmanLogo(places: any) {
  // Coordonnées x, y des pixels pour le logo de Batman simplifié
  //ligne 1 du lgo :
  const line1 = [
    [0, 0],
    [1, 0],
    [2, 0],
    [3, 0],
    [4, 0],
    [5, 0],
    [6, 0],
    [7, 0],
    [8, 0],
  ];
  const line2 = [
    [1, 1],
    [2, 1],
    [3, 1],
    [4, 1],
    [5, 1],
    [6, 1],
    [7, 1],
    [8, 1],
  ];
  const line1 = [];

  // Couleur du logo
  const couleur = 0;

  // Boucle pour colorier les pixels
  for (let i = 0; i < pixels.length; i++) {
    const x = pixels[i][0];
    const y = pixels[i][1];
    await places.votePixel(x, y, couleur);
  }
}

// Appeler la fonction pour dessiner le logo de Batman

async function main() {
  let placesAddress = "0xb99C9fD67F56BD755db31AD743A6cad7e85Ef1db";
  const places = await ethers.getContractAt("Places", placesAddress);

  dessinerBatmanLogo(places);
}

//  We recommend this pattern to be able to use async/await everywhere
//  and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
