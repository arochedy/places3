import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("DAO - addAddColorProposal", function () {
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
    await places.addColor(10, 11, 12);

    await expect(
      dao.addAddColorProposal("test", 10, 11, 12)
    ).to.be.revertedWith("Color already exist");

    await places.transferOwnership(dao.address);

    const voteFoColorPixel = await places.votePixel(0, 0, 3);
    await voteFoColorPixel.wait();

    return { dao, places, owner, account1, account2 };
  }

  describe("addAddColorProposal requires", function () {
    it("addAddColorProposal - check data updated ", async function () {
      const { dao, places, owner } = await loadFixture(deployPlaceAndDao);

      await dao.addAddColorProposal("grey300", 100, 101, 102);

      var infos = await dao.getProposalInfos(1, 1);
      expect(infos.votesFor).to.be.equal(0);
      expect(infos.description).to.be.equal("grey300");

      var proposals = await dao.getAddColorProposals();
      expect(proposals.length).to.be.equal(1);
      expect(proposals[0].red).to.be.equal(100);
      expect(proposals[0].green).to.be.equal(101);
      expect(proposals[0].blue).to.be.equal(102);

      var proposalsInfos = await dao.getAddColorProposalsInfos();
      expect(proposalsInfos.length).to.be.equal(1);

      expect(proposalsInfos[0].votesFor).to.be.equal(0);
      expect(proposalsInfos[0].description).to.be.equal("grey300");
    });

    it("addAddColorProposal - executed", async function () {
      const { dao, places, owner } = await loadFixture(deployPlaceAndDao);

      var colorsBeforeExecution = await (await places.getColors()).length;
      await dao.addAddColorProposal("grey300", 100, 101, 102);

      await dao.VoteForProposal(1, 1);

      var infos = await dao.getProposalInfos(1, 1);
      expect(infos.votesFor).to.be.equal(2); //2 because the user voted 2 times on the map
      expect(infos.description).to.be.equal("grey300");
      expect(infos.executed).to.be.equal(true);

      var proposals = await dao.getAddColorProposals();
      var proposalsInfos = await dao.getAddColorProposalsInfos();
      expect(proposals.length).to.be.equal(1);
      expect(proposalsInfos.length).to.be.equal(1);
      expect(proposalsInfos[0].votesFor).to.be.equal(2);

      var colorLength = await (await places.getColors()).length;
      expect(colorLength).to.be.equal(colorsBeforeExecution + 1);
    });
  });
});
