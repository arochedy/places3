import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Places", function () {
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

  describe("add Color", function () {
    it("Should initialize colors array with 8 colors", async function () {
      const { places } = await loadFixture(deployOneYearLockFixture);

      const white = await places.colors(0);

      expect(white.red).to.equal(0);
      expect(white.blue).to.equal(0);
      expect(white.green).to.equal(0);

      const black = await places.colors(7);

      expect(black.red).to.equal(255);
    });

    it("get pixel", async function () {
      const { places } = await loadFixture(deployOneYearLockFixture);
      await places.votePixel(0, 0, 0);

      let pixel0 = await places.getPixel(0, 0);
      expect(pixel0.colorId).to.be.equal(0);

      let test = await places.getPixels();
      expect(test.length).to.be.equal(1);
      expect(test[0].x).to.be.equal(0);
      expect(test[0].y).to.be.equal(0);
    });

    it("vote for color", async function () {
      const { places, account1, account2 } = await loadFixture(
        deployOneYearLockFixture
      );

      let tx = await places.connect(account1).votePixel(0, 0, 0);
      let receipt = await tx.wait();

      let event = receipt.events?.filter(
        (e) => e.event === "VoteForColorPixel"
      )[0];
      expect(event?.args[0]).to.be.equal(0);
      expect(event?.args[1]).to.be.equal(0);
      expect(event?.args[2]).to.be.equal(0);
      expect(event?.args[3]).to.be.equal(account1.address);

      let pixelChangedEvent = receipt.events?.filter(
        (e) => e.event === "PixelChanged"
      )[0];
      expect(pixelChangedEvent?.args[0]).to.be.equal(0);
      expect(pixelChangedEvent?.args[1]).to.be.equal(0);
      expect(pixelChangedEvent?.args[2]).to.be.equal(0);
      expect(pixelChangedEvent?.args[3]).to.be.equal(1);

      let tx2 = await places.connect(account1).votePixel(0, 0, 3);
      let receipt2 = await tx2.wait();

      let VoteForColorPixel2 = receipt2.events?.filter(
        (e) => e.event === "VoteForColorPixel"
      )[0];
      expect(VoteForColorPixel2?.args[0]).to.be.equal(0);
      expect(VoteForColorPixel2?.args[1]).to.be.equal(0);
      expect(VoteForColorPixel2?.args[2]).to.be.equal(3);
      expect(VoteForColorPixel2?.args[3]).to.be.equal(account1.address);

      let pixelChangedEventLength = receipt2.events?.filter(
        (e) => e.event === "PixelChanged"
      ).length;
      expect(pixelChangedEventLength).to.be.equal(0);

      let tx3 = await places.connect(account2).votePixel(0, 0, 3);
      let receipt3 = await tx3.wait();

      let VoteForColorPixel3 = receipt3.events?.filter(
        (e) => e.event === "VoteForColorPixel"
      )[0];
      expect(VoteForColorPixel3?.args[0]).to.be.equal(0);
      expect(VoteForColorPixel3?.args[1]).to.be.equal(0);
      expect(VoteForColorPixel3?.args[2]).to.be.equal(3);
      expect(VoteForColorPixel3?.args[3]).to.be.equal(account2.address);

      let pixelChanged3 = receipt3.events?.filter(
        (e) => e.event === "PixelChanged"
      )[0];

      expect(pixelChanged3?.args[0]).to.be.equal(0);
      expect(pixelChanged3?.args[1]).to.be.equal(0);
      expect(pixelChanged3?.args[2]).to.be.equal(3); //nouvelle couleur
      expect(pixelChanged3?.args[3]).to.be.equal(2); //nombre de vote de la nouvelle couleur
    });

    // it("Should set good workflowStatus", async function () {
    //   const { voting } = await loadFixture(deployOneYearLockFixture);

    //   expect(await voting.workflowStatus()).to.equal(0);
    // });
  });
});
