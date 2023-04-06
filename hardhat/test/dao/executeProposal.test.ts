import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("DAO", function () {
  async function deployOneYearLockFixture() {
    // Contracts are deployed using the first signer/account by default
    const [owner, account1, account2] = await ethers.getSigners();

    const Places = await ethers.getContractFactory("Places");
    const places = await Places.deploy();
    await places.deployed();

    const DaoContract = await ethers.getContractFactory("PlacesDao");

    const dao = await DaoContract.deploy(places.address);
    await dao.deployed();

    await places.transferOwnership(dao.address);

    const voteFoColorPixel = await places.votePixel(0, 0, 3);
    await voteFoColorPixel.wait();

    const result = await dao.addEraseProposal(
      "virer le logo de l'om, parce que ALLEZ PARIS",
      0,
      0,
      50,
      50
    );

    const tx = await result.wait();

    return { dao, places, owner, account1, account2 };
  }

  describe("can only vote once", function () {
    it("revert if voting twice ", async function () {
      const { dao, places, owner } = await loadFixture(
        deployOneYearLockFixture
      );

      const result = await dao.VoteForProposal(1, 0, true);

      const tx = await result.wait();

      let event = tx.events?.filter((e) => e.event === "Voted")[0];
      expect(event?.args).not.to.be.equal(undefined);
      if (event?.args === undefined) return;
      expect(event?.args[0]).to.be.equal(1);
      expect(event?.args[1]).to.be.equal(0);
      expect(event?.args[2]).to.be.equal(owner.address);

      expect(event?.args[3]).to.be.equal(true);
      expect(event?.args[4]).to.be.equal(1);
      expect(event?.args[5]).to.be.equal(0);

      await await expect(dao.VoteForProposal(1, 0, true)).to.be.revertedWith(
        "You already voted for this proposal"
      );
    });
  });
});
