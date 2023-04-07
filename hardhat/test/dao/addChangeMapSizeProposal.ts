import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("DAO - addChangeMapSizeProposal", function () {
  async function deployPlaceAndDao() {
    // Contracts are deployed using the first signer/account by default
    const [owner, account1, account2] = await ethers.getSigners();

    const Places = await ethers.getContractFactory("Places");
    const places = await Places.deploy();
    await places.deployed();

    const DaoContract = await ethers.getContractFactory("PlacesDao");

    const dao = await DaoContract.deploy(places.address);
    await dao.deployed();

    await places.votePixel(0, 0, 3);
    // await places.addMa(10, 11, 12);

    await places.transferOwnership(dao.address);

    const voteFoColorPixel = await places.votePixel(0, 0, 3);
    await voteFoColorPixel.wait();

    return { dao, places, owner, account1, account2 };
  }

  describe("addChangeMapSizeProposal", function () {
    it("addChangeMapSizeProposal - check data updated ", async function () {
      const { dao, places, owner } = await loadFixture(deployPlaceAndDao);
      await expect(
        dao.addChangeMapSizeProposal("10*10pixels", 10, 10)
      ).to.be.revertedWith("newMapWidth must be > mapWidth");
      await expect(
        dao.addChangeMapSizeProposal("10*10pixels", 300, 10)
      ).to.be.revertedWith("newMapHeight must be > mapHeight");

      await dao.addChangeMapSizeProposal("300*250pix", 300, 250);

      var infos = await dao.getProposalInfos(1, 2);
      expect(infos.votesFor).to.be.equal(0);
      expect(infos.description).to.be.equal("300*250pix");

      var proposals = await dao.getChangeMapSizeProposals();
      expect(proposals.length).to.be.equal(1);
      expect(proposals[0].newMapWidth).to.be.equal(300);
      expect(proposals[0].newMapHeight).to.be.equal(250);

      var proposalsInfos = await dao.getChangeMapSizeProposalsInfos();
      expect(proposalsInfos.length).to.be.equal(1);

      expect(proposalsInfos[0].votesFor).to.be.equal(0);
      expect(proposalsInfos[0].description).to.be.equal("300*250pix");
    });

    it("ChangeMapSize - executed", async function () {
      const { dao, places, owner } = await loadFixture(deployPlaceAndDao);

      await dao.addChangeMapSizeProposal("300*250pix", 300, 250);

      var infos = await dao.getProposalInfos(1, 2);
      expect(infos.votesFor).to.be.equal(0);
      expect(infos.description).to.be.equal("300*250pix");

      var proposals = await dao.getChangeMapSizeProposals();
      expect(proposals.length).to.be.equal(1);
      expect(proposals[0].newMapWidth).to.be.equal(300);
      expect(proposals[0].newMapHeight).to.be.equal(250);

      var proposalsInfos = await dao.getChangeMapSizeProposalsInfos();
      expect(proposalsInfos.length).to.be.equal(1);

      expect(proposalsInfos[0].votesFor).to.be.equal(0);
      expect(proposalsInfos[0].description).to.be.equal("300*250pix");

      await dao.VoteForProposal(1, 2);

      infos = await dao.getProposalInfos(1, 2);
      expect(infos.votesFor).to.be.equal(2); //2 because the user voted 2 times on the map
      expect(infos.description).to.be.equal("300*250pix");
      expect(infos.executed).to.be.equal(true);

      proposals = await dao.getChangeMapSizeProposals();
      proposalsInfos = await dao.getChangeMapSizeProposalsInfos();
      expect(proposals.length).to.be.equal(1);
      expect(proposalsInfos.length).to.be.equal(1);
      expect(proposalsInfos[0].votesFor).to.be.equal(2);

      var mapWidth = await places.mapWidth();
      expect(mapWidth).to.be.equal(300);

      var mapHeight = await places.mapHeight();
      expect(mapHeight).to.be.equal(250);
    });
  });
});
