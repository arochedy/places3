export const daoAddress = "0xf0256EB17469eE119683131b4a7Ab8030dE58a93";


export const daoAbi = [
  {
    inputs: [
      {
        internalType: "contract Places",
        name: "_mapContract",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "proposalId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "proposer",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "description",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint8",
        name: "red",
        type: "uint8",
      },
      {
        indexed: false,
        internalType: "uint8",
        name: "green",
        type: "uint8",
      },
      {
        indexed: false,
        internalType: "uint8",
        name: "blue",
        type: "uint8",
      },
    ],
    name: "NewAddColorProposal",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "proposalId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "proposer",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "description",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint16",
        name: "mapWidth",
        type: "uint16",
      },
      {
        indexed: false,
        internalType: "uint16",
        name: "mapHeight",
        type: "uint16",
      },
    ],
    name: "NewChangeMapSizeProposal",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "proposalId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "proposer",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "description",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint8",
        name: "xMin",
        type: "uint8",
      },
      {
        indexed: false,
        internalType: "uint8",
        name: "yMin",
        type: "uint8",
      },
      {
        indexed: false,
        internalType: "uint8",
        name: "xMax",
        type: "uint8",
      },
      {
        indexed: false,
        internalType: "uint8",
        name: "yMax",
        type: "uint8",
      },
    ],
    name: "NewErasePixelsProposal",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "proposalId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "enum PlacesDao.ProposalTypes",
        name: "proposalType",
        type: "uint8",
      },
    ],
    name: "ProposalExecuted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "proposalId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "enum PlacesDao.ProposalTypes",
        name: "proposalType",
        type: "uint8",
      },
      {
        indexed: false,
        internalType: "address",
        name: "voter",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "votesFor",
        type: "uint256",
      },
    ],
    name: "Voted",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_proposalId",
        type: "uint256",
      },
      {
        internalType: "enum PlacesDao.ProposalTypes",
        name: "_proposalType",
        type: "uint8",
      },
    ],
    name: "VoteForProposal",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_description",
        type: "string",
      },
      {
        internalType: "uint8",
        name: "red",
        type: "uint8",
      },
      {
        internalType: "uint8",
        name: "green",
        type: "uint8",
      },
      {
        internalType: "uint8",
        name: "blue",
        type: "uint8",
      },
    ],
    name: "addAddColorProposal",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_description",
        type: "string",
      },
      {
        internalType: "uint16",
        name: "newMapWidth",
        type: "uint16",
      },
      {
        internalType: "uint16",
        name: "newMapHeight",
        type: "uint16",
      },
    ],
    name: "addChangeMapSizeProposal",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "addColorProposalCount",
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
    name: "addColorProposals",
    outputs: [
      {
        internalType: "uint8",
        name: "red",
        type: "uint8",
      },
      {
        internalType: "uint8",
        name: "green",
        type: "uint8",
      },
      {
        internalType: "uint8",
        name: "blue",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_description",
        type: "string",
      },
      {
        internalType: "uint8",
        name: "xMin",
        type: "uint8",
      },
      {
        internalType: "uint8",
        name: "yMin",
        type: "uint8",
      },
      {
        internalType: "uint8",
        name: "xMax",
        type: "uint8",
      },
      {
        internalType: "uint8",
        name: "yMax",
        type: "uint8",
      },
    ],
    name: "addEraseProposal",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "changeMapSizeProposalCount",
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
    name: "changeMapSizeProposals",
    outputs: [
      {
        internalType: "uint16",
        name: "newMapWidth",
        type: "uint16",
      },
      {
        internalType: "uint16",
        name: "newMapHeight",
        type: "uint16",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "erasePixelsProposalCount",
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
    name: "erasePixelsProposals",
    outputs: [
      {
        internalType: "uint8",
        name: "xMin",
        type: "uint8",
      },
      {
        internalType: "uint8",
        name: "yMin",
        type: "uint8",
      },
      {
        internalType: "uint8",
        name: "xMax",
        type: "uint8",
      },
      {
        internalType: "uint8",
        name: "yMax",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getAddColorProposals",
    outputs: [
      {
        components: [
          {
            internalType: "uint8",
            name: "red",
            type: "uint8",
          },
          {
            internalType: "uint8",
            name: "green",
            type: "uint8",
          },
          {
            internalType: "uint8",
            name: "blue",
            type: "uint8",
          },
        ],
        internalType: "struct PlacesDao.AddColorProposal[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getAddColorProposalsInfos",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "proposer",
            type: "address",
          },
          {
            internalType: "string",
            name: "description",
            type: "string",
          },
          {
            internalType: "bool",
            name: "executed",
            type: "bool",
          },
          {
            internalType: "uint256",
            name: "votesFor",
            type: "uint256",
          },
        ],
        internalType: "struct PlacesDao.BaseProposal[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getChangeMapSizeProposals",
    outputs: [
      {
        components: [
          {
            internalType: "uint16",
            name: "newMapWidth",
            type: "uint16",
          },
          {
            internalType: "uint16",
            name: "newMapHeight",
            type: "uint16",
          },
        ],
        internalType: "struct PlacesDao.ChangeMapSizeProposal[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getChangeMapSizeProposalsInfos",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "proposer",
            type: "address",
          },
          {
            internalType: "string",
            name: "description",
            type: "string",
          },
          {
            internalType: "bool",
            name: "executed",
            type: "bool",
          },
          {
            internalType: "uint256",
            name: "votesFor",
            type: "uint256",
          },
        ],
        internalType: "struct PlacesDao.BaseProposal[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getEraseProposalInfos",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "proposer",
            type: "address",
          },
          {
            internalType: "string",
            name: "description",
            type: "string",
          },
          {
            internalType: "bool",
            name: "executed",
            type: "bool",
          },
          {
            internalType: "uint256",
            name: "votesFor",
            type: "uint256",
          },
        ],
        internalType: "struct PlacesDao.BaseProposal[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getEraseProposals",
    outputs: [
      {
        components: [
          {
            internalType: "uint8",
            name: "xMin",
            type: "uint8",
          },
          {
            internalType: "uint8",
            name: "yMin",
            type: "uint8",
          },
          {
            internalType: "uint8",
            name: "xMax",
            type: "uint8",
          },
          {
            internalType: "uint8",
            name: "yMax",
            type: "uint8",
          },
        ],
        internalType: "struct PlacesDao.ErasePixelsProposal[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_proposalId",
        type: "uint256",
      },
      {
        internalType: "enum PlacesDao.ProposalTypes",
        name: "_proposalType",
        type: "uint8",
      },
    ],
    name: "getProposalId",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_proposalId",
        type: "uint256",
      },
      {
        internalType: "enum PlacesDao.ProposalTypes",
        name: "_proposalType",
        type: "uint8",
      },
    ],
    name: "getProposalInfos",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "proposer",
            type: "address",
          },
          {
            internalType: "string",
            name: "description",
            type: "string",
          },
          {
            internalType: "bool",
            name: "executed",
            type: "bool",
          },
          {
            internalType: "uint256",
            name: "votesFor",
            type: "uint256",
          },
        ],
        internalType: "struct PlacesDao.BaseProposal",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
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
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    name: "proposalVotingInfos",
    outputs: [
      {
        internalType: "address",
        name: "proposer",
        type: "address",
      },
      {
        internalType: "string",
        name: "description",
        type: "string",
      },
      {
        internalType: "bool",
        name: "executed",
        type: "bool",
      },
      {
        internalType: "uint256",
        name: "votesFor",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    name: "userVotedForProposal",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    name: "userVotesForProposal",
    outputs: [
      {
        internalType: "bool",
        name: "hasVoted",
        type: "bool",
      },
      {
        internalType: "address",
        name: "voter",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "voters",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
