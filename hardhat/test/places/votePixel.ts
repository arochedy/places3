import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Vote pixel function", function () {
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

  describe("votePixel ", function () {
    it("update pixel array", async function () {
      const { places, owner, account1 } = await loadFixture(
        deployOneYearLockFixture
      );

      await places.votePixel(4, 3, 1);
      let pixels = await places.getPixels();

      expect(pixels.length).to.be.equal(1);
      expect(pixels[0].x).to.be.equal(4);
      expect(pixels[0].y).to.be.equal(3);
      expect(pixels[0].colorId).to.be.equal(1);
      let nbvoters = await places.totalVotingUsers();
      let nbVotesCount = await places.totalVoteCount();

      expect(nbvoters).to.be.equal(1);
      expect(nbVotesCount).to.be.equal(1);

      await places.connect(account1).votePixel(0, 0, 1);
      let nbvoters2 = await places.totalVotingUsers();
      let nbVotesCount2 = await places.totalVoteCount();

      expect(nbvoters2).to.be.equal(2);
      expect(nbVotesCount2).to.be.equal(2);

      await places.connect(account1).votePixel(0, 0, 1);
      let nbvoters3 = await places.totalVotingUsers();
      let nbVotesCount3 = await places.totalVoteCount();

      expect(nbvoters3).to.be.equal(2);
      expect(nbVotesCount3).to.be.equal(3);
    });
    it("increase counter", async function () {
      const { places, owner, account1 } = await loadFixture(
        deployOneYearLockFixture
      );

      await places.votePixel(0, 0, 1);
      let nbvoters = await places.totalVotingUsers();
      let nbVotesCount = await places.totalVoteCount();

      expect(nbvoters).to.be.equal(1);
      expect(nbVotesCount).to.be.equal(1);

      await places.connect(account1).votePixel(0, 0, 1);
      let nbvoters2 = await places.totalVotingUsers();
      let nbVotesCount2 = await places.totalVoteCount();

      expect(nbvoters2).to.be.equal(2);
      expect(nbVotesCount2).to.be.equal(2);

      await places.connect(account1).votePixel(0, 0, 1);
      let nbvoters3 = await places.totalVotingUsers();
      let nbVotesCount3 = await places.totalVoteCount();

      expect(nbvoters3).to.be.equal(2);
      expect(nbVotesCount3).to.be.equal(3);
    });

    it("color not existing ", async function () {
      const { places, owner, account1 } = await loadFixture(
        deployOneYearLockFixture
      );

      await expect(places.votePixel(0, 0, 30)).to.be.revertedWith(
        "Color not found"
      );
    });

    it("vote doesn't change color not existing ", async function () {
      const { places, owner, account1 } = await loadFixture(
        deployOneYearLockFixture
      );

      await places.votePixel(0, 0, 1);
      let pixel = await places.pixels(0, 0);
      expect(pixel.colorId).to.be.equal(1);

      await places.connect(account1).votePixel(0, 0, 2);
      pixel = await places.pixels(0, 0);
      expect(pixel.colorId).to.be.equal(1);

      await places.connect(account1).votePixel(0, 0, 2);
      pixel = await places.pixels(0, 0);
      expect(pixel.colorId).to.be.equal(2);
    });

    it("getPixel count", async function () {
      const { places, owner, account1 } = await loadFixture(
        deployOneYearLockFixture
      );

      await places.votePixel(0, 0, 0);
      let pixel = await places.pixels(0, 0);
      expect(pixel.colorId).to.be.equal(0);

      var nbPixel = await places.getPixelCount();
      expect(nbPixel).to.be.equal(1);

      var pixels = await places.getPixels();
      expect(pixels.length).to.be.equal(1);
      expect(pixels[0].colorId).to.be.equal(0);

      //

      await places.connect(account1).votePixel(0, 1, 1);
      nbPixel = await places.getPixelCount();
      expect(nbPixel).to.be.equal(2);

      pixels = await places.getPixels();
      expect(pixels.length).to.be.equal(2);
      expect(pixels[0].colorId).to.be.equal(0);
      expect(pixels[1].colorId).to.be.equal(1);

      await places.connect(account1).votePixel(0, 1, 1);
      nbPixel = await places.getPixelCount();
      expect(nbPixel).to.be.equal(2);

      pixels = await places.getPixels();
      expect(pixels.length).to.be.equal(2);
      expect(pixels[0].colorId).to.be.equal(0);
      expect(pixels[1].colorId).to.be.equal(1);
    });
  });
});
