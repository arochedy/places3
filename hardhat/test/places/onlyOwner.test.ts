import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Places only Owner", function () {
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

  describe("onwly Owner functions check", function () {
    it("erasePixels", async function () {
      const { places, owner, account1 } = await loadFixture(
        deployOneYearLockFixture
      );

      const size = 4;
      const pixelsLength = (size + 1) * (size + 1);

      await expect(
        places.connect(account1).erasePixels(0, size, 0, size)
      ).to.be.revertedWith("Ownable: caller is not the owner");

      const result = await places.connect(owner).erasePixels(0, size, 0, size);
      const events = await result.wait();

      expect(events?.events?.length).to.be.equal(pixelsLength);
    });

    it("addColor", async function () {
      const { places, owner, account1 } = await loadFixture(
        deployOneYearLockFixture
      );

      let colorsBefore = await places.getColors();
      let colorsBeforeLength = colorsBefore.length;

      await expect(
        places.connect(account1).addColor(0, 50, 0)
      ).to.be.revertedWith("Ownable: caller is not the owner");

      const result = await places.connect(owner).addColor(0, 50, 0);
      const events = await result.wait();

      let colors = await places.getColors();

      expect(colors.length).to.be.equal(colorsBeforeLength + 1);
    });

    it("changeMapSize", async function () {
      const { places, owner, account1 } = await loadFixture(
        deployOneYearLockFixture
      );

      await expect(
        places.connect(account1).changeMapSize(300, 500)
      ).to.be.revertedWith("Ownable: caller is not the owner");

      const result = await places.connect(owner).changeMapSize(300, 500);
      const events = await result.wait();

      expect(events?.events?.length).to.be.equal(1);
    });
  });
});
