export const placesAddress = "0xb99C9fD67F56BD755db31AD743A6cad7e85Ef1db";

export const placesAbi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint32",
        name: "newMapWidth",
        type: "uint32",
      },
      {
        indexed: false,
        internalType: "uint32",
        name: "newMapHeight",
        type: "uint32",
      },
    ],
    name: "MapSizeChanged",
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
        internalType: "uint16",
        name: "x",
        type: "uint16",
      },
      {
        indexed: false,
        internalType: "uint16",
        name: "y",
        type: "uint16",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "color",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "voteCount",
        type: "uint256",
      },
    ],
    name: "PixelChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint16",
        name: "x",
        type: "uint16",
      },
      {
        indexed: false,
        internalType: "uint16",
        name: "y",
        type: "uint16",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "color",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "voter",
        type: "address",
      },
    ],
    name: "VoteForColorPixel",
    type: "event",
  },
  {
    inputs: [
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
    name: "addColor",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint16",
        name: "_newX",
        type: "uint16",
      },
      {
        internalType: "uint16",
        name: "_newY",
        type: "uint16",
      },
    ],
    name: "changeMapSize",
    outputs: [],
    stateMutability: "nonpayable",
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
    name: "colors",
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
        internalType: "uint16",
        name: "_xMin",
        type: "uint16",
      },
      {
        internalType: "uint16",
        name: "_xMax",
        type: "uint16",
      },
      {
        internalType: "uint16",
        name: "_yMin",
        type: "uint16",
      },
      {
        internalType: "uint16",
        name: "_yMax",
        type: "uint16",
      },
    ],
    name: "erasePixels",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getColors",
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
        internalType: "struct Places.Color[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getPixelCount",
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
    inputs: [],
    name: "getPixels",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "voteCount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "currentColorVoteCount",
            type: "uint256",
          },
          {
            internalType: "uint16",
            name: "x",
            type: "uint16",
          },
          {
            internalType: "uint16",
            name: "y",
            type: "uint16",
          },
          {
            internalType: "uint32",
            name: "colorId",
            type: "uint32",
          },
        ],
        internalType: "struct Places.Pixel[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "mapHeight",
    outputs: [
      {
        internalType: "uint16",
        name: "",
        type: "uint16",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "mapWidth",
    outputs: [
      {
        internalType: "uint16",
        name: "",
        type: "uint16",
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
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "pixelCoords",
    outputs: [
      {
        internalType: "uint16",
        name: "x",
        type: "uint16",
      },
      {
        internalType: "uint16",
        name: "y",
        type: "uint16",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint16",
        name: "",
        type: "uint16",
      },
      {
        internalType: "uint16",
        name: "",
        type: "uint16",
      },
    ],
    name: "pixels",
    outputs: [
      {
        internalType: "uint256",
        name: "voteCount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "currentColorVoteCount",
        type: "uint256",
      },
      {
        internalType: "uint16",
        name: "x",
        type: "uint16",
      },
      {
        internalType: "uint16",
        name: "y",
        type: "uint16",
      },
      {
        internalType: "uint32",
        name: "colorId",
        type: "uint32",
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
    inputs: [],
    name: "totalVoteCount",
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
    inputs: [],
    name: "totalVotingUsers",
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
    ],
    name: "userVoteCount",
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
        internalType: "uint16",
        name: "x",
        type: "uint16",
      },
      {
        internalType: "uint16",
        name: "y",
        type: "uint16",
      },
      {
        internalType: "uint32",
        name: "colorId",
        type: "uint32",
      },
    ],
    name: "votePixel",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
