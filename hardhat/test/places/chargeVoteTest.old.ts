import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("try to know average gas", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployOneYearLockFixture() {
    // Contracts are deployed using the first signer/account by default
    const [owner, account1, account2] = await ethers.getSigners();

    const Places = await ethers.getContractFactory("Places");
    const places = await Places.deploy();

    return { places, owner, account1, account2 };
  }

  function getRandomIntInclusive(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  describe("votePixel ", function () {
    it("vote pixel lot of votes counter", async function () {
      const { places, owner, account1 } = await loadFixture(
        deployOneYearLockFixture
      );
      const NB_VOTES = 1; //;1000;
      const mapWidth = await places.mapWidth();
      const mapHeight = await places.mapHeight();
      const colorLength = await places.colors.length;
      for (var i = 0; i < NB_VOTES; i++) {
        let x = getRandomIntInclusive(0, mapWidth);
        let y = getRandomIntInclusive(0, mapHeight);
        let color = getRandomIntInclusive(0, colorLength);
        await places.votePixel(x, y, color);
      }
    });

    it("try erase all the map", async function () {
      const { places, owner, account1 } = await loadFixture(
        deployOneYearLockFixture
      );
      const NB_VOTES = 1; //;1000;
      const mapWidth = await places.mapWidth();
      const mapHeight = await places.mapHeight();
      const colorLength = await places.colors.length;
      let xmin = 0;
      let ymin = 0;
      let xmax = mapWidth;
      let ymax = mapHeight;

      await places.erasePixels(xmin, ymin, xmax, ymax);
    });

    it("vote pixel lot of votes and lot of colors", async function () {
      const { places, owner, account1 } = await loadFixture(
        deployOneYearLockFixture
      );
      const NB_VOTES = 1; //1000;
      const NB_COLORS = 3; //3000;

      const mapWidth = await places.mapWidth();
      const mapHeight = await places.mapHeight();

      for (var i = 0; i < NB_COLORS; i++) {
        let red = getRandomIntInclusive(0, 255);
        let green = getRandomIntInclusive(0, 255);

        let blue = getRandomIntInclusive(0, 255);
        await places.addColor(red, blue, green);
      }

      const colorLength = await places.colors.length;

      for (var i = 0; i < NB_VOTES; i++) {
        let x = getRandomIntInclusive(0, mapWidth);
        let y = getRandomIntInclusive(0, mapHeight);
        let color = getRandomIntInclusive(0, colorLength);
        await places.votePixel(x, y, color);
      }
    });
  });
});
