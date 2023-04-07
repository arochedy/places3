import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("DAO", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployOneYearLockFixture() {
    // Contracts are deployed using the first signer/account by default
    const [owner, account1, account2] = await ethers.getSigners();

    const Places = await ethers.getContractFactory("Places");
    const places = await Places.deploy();
    await places.deployed();

    const DaoContract = await ethers.getContractFactory("PlacesDao");

    const dao = await DaoContract.deploy(places.address);
    await dao.deployed();

    return { dao, places, owner, account1, account2 };
  }

  describe("All proposals", function () {
    it("Should be voter to vote ", async function () {
      const { dao, places, owner, account2 } = await loadFixture(
        deployOneYearLockFixture
      );

      await expect(
        dao.addChangeMapSizeProposal(
          "virer le logo de l'om, parce que ALLEZ PARIS",
          0,
          0
        )
      ).to.be.revertedWith("You must be a voter to perform this action");

      await expect(
        dao.addAddColorProposal(
          "virer le logo de l'om, parce que ALLEZ PARIS",
          0,
          0,
          0
        )
      ).to.be.revertedWith("You must be a voter to perform this action");

      await expect(
        dao.addEraseProposal(
          "virer le logo de l'om, parce que ALLEZ PARIS",
          0,
          0,
          50,
          50
        )
      ).to.be.revertedWith("You must be a voter to perform this action");

      //le user vote pour un pixel il devient membre de la DAO
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

      let event = tx.events?.filter(
        (e) => e.event === "NewErasePixelsProposal"
      )[0];
      expect(event?.args).not.to.be.equal(undefined);
      if (event?.args === undefined) return;
      expect(event?.args[0]).to.be.equal(1);
      expect(event?.args[1]).to.be.equal(owner.address);
      expect(event?.args[2]).to.be.equal(
        "virer le logo de l'om, parce que ALLEZ PARIS"
      );
      expect(event?.args[3]).to.be.equal(0);
      expect(event?.args[4]).to.be.equal(0);
      expect(event?.args[5]).to.be.equal(50);
      expect(event?.args[6]).to.be.equal(50);

      const propCount = await dao.erasePixelsProposalCount();
      expect(propCount).to.be.equal(1);
      const proposal = await dao.erasePixelsProposals(0);
      expect(proposal.xMin).to.be.equal(0);
      expect(proposal.yMin).to.be.equal(0);
      expect(proposal.xMax).to.be.equal(50);

      await expect(
        dao.connect(account2).VoteForProposal(1, 0)
      ).to.be.revertedWith("You must be a voter to perform this action");
    });
  });
});
