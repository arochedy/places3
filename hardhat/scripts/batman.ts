import { ethers } from "hardhat";

import fs from "fs-extra";
import path from "path";

async function dessinerBatman(xBase: number, yBase: number, places: any) {
  let color = 1;
  // Dessiner la première ligne du logo de Batman
  await places.votePixel(xBase, yBase, color);
  await places.votePixel(xBase + 1, yBase, color);
  await places.votePixel(xBase + 2, yBase, color);
  await places.votePixel(xBase + 3, yBase, color);
  await places.votePixel(xBase + 4, yBase, color);
  await places.votePixel(xBase + 5, yBase, color);
  await places.votePixel(xBase + 6, yBase, color);
  await places.votePixel(xBase + 7, yBase, color);
  await places.votePixel(xBase + 17, yBase, color);
  await places.votePixel(xBase + 18, yBase, color);
  await places.votePixel(xBase + 19, yBase, color);
  await places.votePixel(xBase + 20, yBase, color);
  await places.votePixel(xBase + 21, yBase, color);
  await places.votePixel(xBase + 22, yBase, color);
  await places.votePixel(xBase + 23, yBase, color);
  await places.votePixel(xBase + 24, yBase, color);

  // Dessiner la deuxième ligne du logo de Batman
  await places.votePixel(xBase + 1, yBase + 1, color);
  await places.votePixel(xBase + 2, yBase + 1, color);
  await places.votePixel(xBase + 3, yBase + 1, color);
  await places.votePixel(xBase + 4, yBase + 1, color);
  await places.votePixel(xBase + 5, yBase + 1, color);
  await places.votePixel(xBase + 6, yBase + 1, color);
  await places.votePixel(xBase + 7, yBase + 1, color);
  await places.votePixel(xBase + 8, yBase + 1, color);

  await places.votePixel(xBase + 11, yBase + 1, color);
  await places.votePixel(xBase + 13, yBase + 1, color);

  await places.votePixel(xBase + 16, yBase + 1, color);
  await places.votePixel(xBase + 17, yBase + 1, color);
  await places.votePixel(xBase + 18, yBase + 1, color);
  await places.votePixel(xBase + 19, yBase + 1, color);
  await places.votePixel(xBase + 20, yBase + 1, color);
  await places.votePixel(xBase + 21, yBase + 1, color);
  await places.votePixel(xBase + 22, yBase + 1, color);
  await places.votePixel(xBase + 23, yBase + 1, color);

  // Dessiner la troisième ligne du logo de Batman

  await places.votePixel(xBase + 2, yBase + 2, color);
  await places.votePixel(xBase + 3, yBase + 2, color);
  await places.votePixel(xBase + 4, yBase + 2, color);
  await places.votePixel(xBase + 5, yBase + 2, color);
  await places.votePixel(xBase + 6, yBase + 2, color);
  await places.votePixel(xBase + 7, yBase + 2, color);
  await places.votePixel(xBase + 8, yBase + 2, color);
  await places.votePixel(xBase + 9, yBase + 2, color);

  await places.votePixel(xBase + 11, yBase + 1, color);
  await places.votePixel(xBase + 12, yBase + 1, color);
  await places.votePixel(xBase + 13, yBase + 1, color);

  await places.votePixel(xBase + 15, yBase + 2, color);
  await places.votePixel(xBase + 16, yBase + 2, color);
  await places.votePixel(xBase + 17, yBase + 2, color);
  await places.votePixel(xBase + 18, yBase + 2, color);
  await places.votePixel(xBase + 19, yBase + 2, color);
  await places.votePixel(xBase + 20, yBase + 2, color);
  await places.votePixel(xBase + 21, yBase + 2, color);
  await places.votePixel(xBase + 22, yBase + 2, color);

  // Dessiner la quatrième ligne du logo de Batman
  for (let i = 3; i < 21; i++) {
    await places.votePixel(xBase + i, yBase + 3, color);
  }
  // Dessiner la cinquième ligne du logo de Batman
  for (let i = 3; i < 20; i++) {
    await places.votePixel(xBase + i, yBase + 4, color);
  }
  // Dessiner la 6eme ligne du logo de Batman
  for (let i = 3; i < 20; i++) {
    await places.votePixel(xBase + i, yBase + 5, color);
  }
  // Dessiner la 7eme ligne du logo de Batman
  for (let i = 3; i < 20; i++) {
    await places.votePixel(xBase + i, yBase + 6, color);
  }

  // Dessiner la 8eme ligne du logo de Batman
  for (let i = 6; i < 17; i++) {
    await places.votePixel(xBase + i, yBase + 7, color);
  }
  // Dessiner la 9eme ligne du logo de Batman

  for (let i = 10; i < 13; i++) {
    await places.votePixel(xBase + i, yBase + 8, color);
  }

  // Dessiner la 10eme ligne du logo de Batman

  for (let i = 12; i < 15; i++) {
    await places.votePixel(xBase + i, yBase + 9, color);
  }
  // Dessiner la derniere ligne du logo de Batman
  await places.votePixel(xBase + 13, yBase + 10, color);
}

// async function dessinerBatmanLogo(places: any) {
//   // Coordonnées x, y des pixels pour le logo de Batman simplifié
//   //ligne 1 du lgo :
//   const line1 = [
//     [0, 0],
//     [1, 0],
//     [2, 0],
//     [3, 0],
//     [4, 0],
//     [5, 0],
//     [6, 0],
//     [7, 0],
//     [8, 0],
//   ];
//   const line2 = [
//     [1, 1],
//     [2, 1],
//     [3, 1],
//     [4, 1],
//     [5, 1],
//     [6, 1],
//     [7, 1],
//     [8, 1],
//   ];
//   const line1 = [];

//   // Couleur du logo
//   const couleur = 0;

//   // Boucle pour colorier les pixels
//   for (let i = 0; i < pixels.length; i++) {
//     const x = pixels[i][0];
//     const y = pixels[i][1];
//     await places.votePixel(x, y, couleur);
//   }
// }

// Appeler la fonction pour dessiner le logo de Batman

async function main() {
  let placesAddress = "0xC762E91BD28579575ef758e4cB9F1eA471De99Cc";
  const places = await ethers.getContractAt("Places", placesAddress);

  dessinerBatman(40, 0, places);
}

//  We recommend this pattern to be able to use async/await everywhere
//  and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
