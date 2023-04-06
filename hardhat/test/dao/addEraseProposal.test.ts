import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("DAO - addEraseProposal require", function () {
  async function deployPlaceAndDao() {
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

    return { dao, places, owner, account1, account2 };
  }

  describe("addEraseProposal requires", function () {
    it("addEraseProposal size error ", async function () {
      const { dao, places, owner } = await loadFixture(deployPlaceAndDao);

      await expect(
        dao.addEraseProposal("virer le logo", 10, 10, 3, 50)
      ).to.be.revertedWith("xMin must be <= xMax");

      await expect(
        dao.addEraseProposal("virer le logo", 10, 10, 12, 3)
      ).to.be.revertedWith("yMin must be <= yMax");

      await expect(
        dao.addEraseProposal("virer le logo", 200, 200, 200, 200)
      ).to.be.revertedWith("xMax out of Map");

      await expect(
        dao.addEraseProposal("virer le logo", 10, 200, 10, 200)
      ).to.be.revertedWith("yMax out of Map");
    });

    it("addEraseProposal - check data updated ", async function () {
      const { dao, places, owner } = await loadFixture(deployPlaceAndDao);

      await dao.addEraseProposal(
        "virer le logo de l'om, parce que ALLEZ PARIS",
        0,
        0,
        50,
        50
      );

      var proposals = await dao.getEraseProposals();
      expect(proposals.length).to.be.equal(1);
      expect(proposals[0].xMax).to.be.equal(50);

      var proposalsInfos = await dao.getEraseProposalInfos();
      expect(proposalsInfos.length).to.be.equal(1);
      expect(proposalsInfos[0].votesFor).to.be.equal(0);
      expect(proposalsInfos[0].description).to.be.equal(
        "virer le logo de l'om, parce que ALLEZ PARIS"
      );

    });
  });
});
