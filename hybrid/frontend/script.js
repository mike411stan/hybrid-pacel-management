import { ethers } from "./ethers-5.6.esm.min.js"

const connectWallet = document.getElementById("connectWallet")
connectWallet.onclick = connectToNetwork

// Add centralized contract ABI here
const centralizedContractABI = [
    {
        inputs: [
            {
                internalType: "string",
                name: "_sender",
                type: "string",
            },
            {
                internalType: "string",
                name: "_recipient",
                type: "string",
            },
        ],
        name: "createParcel",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_id",
                type: "uint256",
            },
        ],
        name: "getParcel",
        outputs: [
            {
                components: [
                    {
                        internalType: "uint256",
                        name: "id",
                        type: "uint256",
                    },
                    {
                        internalType: "string",
                        name: "sender",
                        type: "string",
                    },
                    {
                        internalType: "string",
                        name: "recipient",
                        type: "string",
                    },
                    {
                        internalType: "string",
                        name: "status",
                        type: "string",
                    },
                ],
                internalType: "struct CentralizedContract.Parcel",
                name: "",
                type: "tuple",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "nextId",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        name: "parcels",
        outputs: [
            {
                internalType: "uint256",
                name: "id",
                type: "uint256",
            },
            {
                internalType: "string",
                name: "sender",
                type: "string",
            },
            {
                internalType: "string",
                name: "recipient",
                type: "string",
            },
            {
                internalType: "string",
                name: "status",
                type: "string",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_id",
                type: "uint256",
            },
            {
                internalType: "string",
                name: "_status",
                type: "string",
            },
        ],
        name: "updateParcelStatus",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
]

// Add your hybrid contract ABI here
const hybridContractABI = [
    {
        inputs: [],
        name: "aggregatorAddress",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "string",
                name: "_sender",
                type: "string",
            },
            {
                internalType: "string",
                name: "_recipient",
                type: "string",
            },
        ],
        name: "createParcel",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_id",
                type: "uint256",
            },
        ],
        name: "getParcel",
        outputs: [
            {
                components: [
                    {
                        internalType: "uint256",
                        name: "id",
                        type: "uint256",
                    },
                    {
                        internalType: "string",
                        name: "sender",
                        type: "string",
                    },
                    {
                        internalType: "string",
                        name: "recipient",
                        type: "string",
                    },
                    {
                        internalType: "string",
                        name: "status",
                        type: "string",
                    },
                ],
                internalType: "struct HybridContract.Parcel",
                name: "",
                type: "tuple",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "nextId",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        name: "parcels",
        outputs: [
            {
                internalType: "uint256",
                name: "id",
                type: "uint256",
            },
            {
                internalType: "string",
                name: "sender",
                type: "string",
            },
            {
                internalType: "string",
                name: "recipient",
                type: "string",
            },
            {
                internalType: "string",
                name: "status",
                type: "string",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_id",
                type: "uint256",
            },
        ],
        name: "updateParcelStatus",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
]

async function connectToNetwork() {
    // Check if the browser has Web3 provider (e.g., Metamask)
    if (typeof window.ethereum !== "undefined") {
        try {
            // Request access to user accounts
            await window.ethereum.request({ method: "eth_requestAccounts" })

            // Create a provider with the current Web3 provider
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const signer = provider.getSigner()

            // Instantiate the centralized contract
            const centralizedContractAddress =
                "0xF619d43964e14D8450Ad64CbceBB26835c815423"
            const centralizedContract = new ethers.Contract(
                centralizedContractAddress,
                centralizedContractABI,
                signer
            )

            // Instantiate the hybrid contract
            const hybridContractAddress =
                "0xC61E1DBBD9BCC40aE1d0F58c8Ac1A7e7d6960d9F"
            const hybridContract = new ethers.Contract(
                hybridContractAddress,
                hybridContractABI,
                signer
            )
            return { provider, signer, centralizedContract, hybridContract }
        } catch (error) {
            console.error("Failed to connect to the network:", error)
            return null
        }
        document.getElementById("connectWallet").innerHTML = "Connected !"
    } else {
        // Handle the case when Web3 provider is not available
        alert(
            "Web3 provider not found. Please install and connect to a wallet like Metamask."
        )
        return null
    }
}

async function createParcel(sender, recipient, centralizedContract) {
    try {
        await centralizedContract.createParcel(sender, recipient)
        alert("Parcel created successfully!")
    } catch (error) {
        console.error("Failed to create parcel:", error)
        alert(
            "Failed to create parcel. Please check the console for more details."
        )
    }
}

async function updateParcelStatus(id, status, centralizedContract) {
    try {
        await centralizedContract.updateParcelStatus(id, status)
        alert("Parcel status updated successfully!")
    } catch (error) {
        console.error("Failed to update parcel status:", error)
        alert(
            "Failed to update parcel status. Please check the console for more details."
        )
    }
}

async function getParcelDetails(id, centralizedContract) {
    try {
        const parcel = await centralizedContract.getParcel(id)
        const output = document.getElementById("output")
        output.innerHTML = `Parcel ID: ${parcel.id}<br>Sender: ${parcel.sender}<br>Recipient: ${parcel.recipient}<br>Status: ${parcel.status}`
    } catch (error) {
        console.error("Failed to get parcel details:", error)
        alert(
            "Failed to get parcel details. Please check the console for more details."
        )
    }
}

async function main() {
    const { signer, centralizedContract } = await connectToNetwork()

    // Handle form submission for creating a parcel
    const createParcelForm = document.getElementById("createParcelForm")
    createParcelForm.addEventListener("submit", async (e) => {
        e.preventDefault()

        const senderInput = document.getElementById("senderInput")
        const recipientInput = document.getElementById("recipientInput")

        const sender = senderInput.value
        const recipient = recipientInput.value

        await createParcel(sender, recipient, centralizedContract)

        senderInput.value = ""
        recipientInput.value = ""
    })

    // Handle form submission for updating parcel status
    const updateParcelStatusForm = document.getElementById(
        "updateParcelStatusForm"
    )
    updateParcelStatusForm.addEventListener("submit", async (e) => {
        e.preventDefault()

        const parcelIdInput = document.getElementById("parcelIdInput")
        const statusInput = document.getElementById("statusInput")

        const id = parseInt(parcelIdInput.value)
        const status = statusInput.value

        await updateParcelStatus(id, status, centralizedContract)

        parcelIdInput.value = ""
        statusInput.value = ""
    })

    // Handle form submission for getting parcel details
    const getParcelForm = document.getElementById("getParcelForm")
    getParcelForm.addEventListener("submit", async (e) => {
        e.preventDefault()

        const parcelIdInput = document.getElementById("parcelIdInput")

        const id = parseInt(parcelIdInput.value)

        await getParcelDetails(id, centralizedContract)

        parcelIdInput.value = ""
    })
}

main()

async function connect() {
    if (typeof window.ethereum !== "undefined") {
        try {
            await window.ethereum.request({
                method: "eth_requestAccounts",
            })
            // Create a provider with the current Web3 provider
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const signer = provider.getSigner()
        } catch {
            console.log(error)
        }
        document.getElementById("connectWallet").innerHTML = "Connected !"
    } else {
        document.getElementById("connectWallet").innerHTML =
            "Please install Metamask!"
    }
}
