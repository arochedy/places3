import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";
import { any } from "hardhat/internal/core/params/argumentTypes";

describe("DAO", function () {
  async function deployPlaceAndDao() {
    // Contracts are deployed using the first signer/account by default
    const [owner, account1, account2, account3, account4] =
      await ethers.getSigners();

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

    var proposals = await dao.getEraseProposals();
    expect(proposals.length).to.be.equal(1);
    expect(proposals[0].xMax).to.be.equal(50);

    // var proposalsInfos = await dao.getEraseProposalInfos();
    // expect(proposalsInfos.length).to.be.equal(1);
    // expect(proposalsInfos[0].votesFor).to.be.equal(0);
    // expect(proposalsInfos[0].description).to.be.equal(
    //   "virer le logo de l'om, parce que ALLEZ PARIS"
    // );

    const tx = await result.wait();

    return { dao, places, owner, account1, account2, account3, account4 };
  }

  describe("vote proposals", function () {
    it("revert because proposal does not exist ", async function () {
      const { dao, places, owner } = await loadFixture(deployPlaceAndDao);
      await expect(dao.VoteForProposal(13, 0)).to.be.revertedWith(
        "Proposal does not exist"
      );
      // await  expect(dao.VoteForProposal(0, 10, true)).to.be.revertedWith(
      //   "Proposal does not exist"
      // );
    });
    it("revert if voting twice ", async function () {
      const { dao, places, owner } = await loadFixture(deployPlaceAndDao);

      const result = await dao.VoteForProposal(1, 0);

      const tx = await result.wait();

      let event = tx.events?.filter((e) => e.event === "Voted")[0];
      expect(event?.args).not.to.be.equal(undefined);
      if (event?.args === undefined) return;
      expect(event?.args[0]).to.be.equal(1);
      expect(event?.args[1]).to.be.equal(0);
      expect(event?.args[2]).to.be.equal(owner.address);

      expect(event?.args[3]).to.be.equal(1);

      var proposal = await dao.getProposalInfos(1, 0);
      expect(proposal.votesFor).to.be.equal(1);
      expect(proposal.executed).to.be.equal(true);

      var proposalsInfos = await dao.getEraseProposalInfos();
      expect(proposalsInfos.length).to.be.equal(1);
      expect(proposalsInfos[0].votesFor).to.be.equal(1);

      await await expect(dao.VoteForProposal(1, 0)).to.be.revertedWith(
        "You already voted for this proposal"
      );
    });
    it("revert if voting for proposal 0 ", async function () {
      const { dao, places, owner } = await loadFixture(deployPlaceAndDao);

      await expect(dao.VoteForProposal(0, 0)).to.be.revertedWith(
        "Can't vote for proposal 0"
      );
    });
    it("revert if voting for unexisting proposal", async function () {
      const { dao, places, owner } = await loadFixture(deployPlaceAndDao);

      await expect(dao.VoteForProposal(1, 4)).to.be.revertedWithoutReason();
    });

    it("revert if voting for proposal 0 ", async function () {
      const { dao, places, owner, account2 } = await loadFixture(
        deployPlaceAndDao
      );

      const result = await dao.VoteForProposal(1, 0);

      const tx = await result.wait();

      const voteFoColorPixel2 = await places
        .connect(account2)
        .votePixel(0, 0, 3);
      await voteFoColorPixel2.wait();

      await await expect(
        dao.connect(account2).VoteForProposal(1, 0)
      ).to.be.revertedWith("This proposal has already been executed");
    });



    it("vote not enougth to be executed ", async function () {
      const { dao, places, owner, account2, account1, account3, account4 } =
        await loadFixture(deployPlaceAndDao);

      await places.connect(account1).votePixel(0, 0, 3);

      await places.connect(account2).votePixel(0, 0, 3);
      await places.connect(account3).votePixel(0, 0, 3);
      await places.connect(account4).votePixel(0, 0, 3);

      let nbVoters = await places.totalVotingUsers();
      expect(nbVoters).to.be.equal(5);

      const result = await dao.VoteForProposal(1, 0);
      const tx = await result.wait();

      let event = tx.events?.filter((e) => e.event === "Voted")[0];
      expect(event?.args).not.to.be.equal(undefined);
      if (event?.args === undefined) return;

      expect(event?.args[0]).to.be.equal(1);
      expect(event?.args[1]).to.be.equal(0);
      expect(event?.args[2]).to.be.equal(owner.address);
      expect(event?.args[3]).to.be.equal(1);

      var proposal = await dao.getProposalInfos(1, 0);
      expect(proposal.votesFor).to.be.equal(1);
      expect(proposal.executed).to.be.equal(false);

      await dao.connect(account1).VoteForProposal(1, 0);
      nbVoters = await places.totalVotingUsers();
      expect(nbVoters).to.be.equal(5);

      proposal = await dao.getProposalInfos(1, 0);
      expect(proposal.votesFor).to.be.equal(2);
      expect(proposal.executed).to.be.equal(false);

      await dao.connect(account3).VoteForProposal(1, 0);
      proposal = await dao.getProposalInfos(1, 0);

      expect(proposal.votesFor).to.be.equal(3);
      expect(proposal.executed).to.be.equal(false);

      await dao.connect(account2).VoteForProposal(1, 0);

      proposal = await dao.getProposalInfos(1, 0);
      expect(proposal.votesFor).to.be.equal(4);
      expect(proposal.executed).to.be.equal(true);

    });

    it("get proposal infos doesnt exist", async function () {
      const { dao, places, owner, account2 } = await loadFixture(
        deployPlaceAndDao
      );

      await expect(dao.getProposalInfos(12, 0)).to.be.revertedWith(
        "Proposal does not exist"
      );
    });
  });
});
