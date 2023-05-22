const { expect } = require("chai")

describe("CentralizedContract", function () {
    let CentralizedContract
    let centralizedContract
    let owner
    let addr1

    beforeEach(async function () {
        CentralizedContract = await ethers.getContractFactory(
            "CentralizedContract"
        )
        ;[owner, addr1] = await ethers.getSigners()

        centralizedContract = await CentralizedContract.deploy()
        await centralizedContract.deployed()
    })

    it("should create a new parcel", async function () {
        await centralizedContract.createParcel("Sender 1", "Recipient 1")

        const parcel = await centralizedContract.getParcel(0)
        expect(parcel.id).to.equal(0)
        expect(parcel.sender).to.equal("Sender 1")
        expect(parcel.recipient).to.equal("Recipient 1")
        expect(parcel.status).to.equal("Created")
    })

    it("should update the status of a parcel", async function () {
        await centralizedContract.createParcel("Sender 1", "Recipient 1")
        await centralizedContract.updateParcelStatus(0, "In Transit")

        const parcel = await centralizedContract.getParcel(0)
        expect(parcel.status).to.equal("In Transit")
    })

    it("should revert when getting details of an invalid parcel ID", async function () {
        await expect(centralizedContract.getParcel(100)).to.be.revertedWith(
            "Invalid parcel ID"
        )
    })
})

describe("HybridContract", function () {
    let HybridContract
    let hybridContract
    let owner
    let addr1

    beforeEach(async function () {
        HybridContract = await ethers.getContractFactory("HybridContract")
        ;[owner, addr1] = await ethers.getSigners()

        hybridContract = await HybridContract.deploy("AGGREGATOR_ADDRESS")
        await hybridContract.deployed()
    })

    it("should create a new parcel", async function () {
        await hybridContract.createParcel("Sender 1", "Recipient 1")

        const parcel = await hybridContract.getParcel(0)
        expect(parcel.id).to.equal(0)
        expect(parcel.sender).to.equal("Sender 1")
        expect(parcel.recipient).to.equal("Recipient 1")
        expect(parcel.status).to.equal("Created")
    })

    it("should update the status of a parcel", async function () {
        await hybridContract.createParcel("Sender 1", "Recipient 1")
        await hybridContract.updateParcelStatus(0, "In Transit")

        const parcel = await hybridContract.getParcel(0)
        expect(parcel.status).to.equal("In Transit")
    })

    it("should revert when getting details of an invalid parcel ID", async function () {
        await expect(hybridContract.getParcel(100)).to.be.revertedWith(
            "Invalid parcel ID"
        )
    })
})
yar
