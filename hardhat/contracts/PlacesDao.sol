// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
import {Places} from "./Places.sol";

// import "hardhat/console.sol";

import "@openzeppelin/contracts/access/Ownable.sol";

contract PlacesDao is Ownable {
    /* proposal definitions */
    constructor(Places _mapContract) {
        mapContract = _mapContract;
    }

    uint8 percentToAccept = 75;

    Places mapContract;
    enum ProposalTypes {
        ErasePixels,
        AddColor,
        ChangeMapSize
    }

    struct BaseProposal {
        address proposer;
        string description;
        bool executed;
        uint256 votesFor;
        uint256 votesAgainst;
    }

    struct ErasePixelsProposal {
        uint8 xMin;
        uint8 yMin;
        uint8 xMax;
        uint8 yMax;
    }

    struct AddColorProposal {
        uint8 red;
        uint8 green;
        uint8 blue;
    }

    struct ChangeMapSizeProposal {
        uint16 newMapWidth;
        uint16 newMapHeight;
    }

    struct UserVote {
        bool hasVoted;
        bool voteFor;
        address voter;
    }

    ErasePixelsProposal[] public erasePixelsProposals;
    AddColorProposal[] public addColorProposals;
    ChangeMapSizeProposal[] public changeMapSizeProposals;

    mapping(bytes32 => BaseProposal) public proposalVotingInfos;
    mapping(address => mapping(bytes32 => bool)) public userVotedForProposal; //a voir si on garde
    mapping(bytes32 => UserVote) public userVotesForProposal;

    uint256 public erasePixelsProposalCount;
    uint256 public addColorProposalCount;
    uint256 public changeMapSizeProposalCount;

    event NewErasePixelsProposal(
        uint256 proposalId,
        address proposer,
        string description,
        uint8 xMin,
        uint8 yMin,
        uint8 xMax,
        uint8 yMax
    );

    event NewAddColorProposal(
        uint256 proposalId,
        address proposer,
        string description,
        uint8 red,
        uint8 green,
        uint8 blue
    );

    event NewChangeMapSizeProposal(
        uint256 proposalId,
        address proposer,
        string description,
        uint16 mapWidth,
        uint16 mapHeight
    );

    event Voted(
        uint256 proposalId,
        ProposalTypes proposalType,
        address voter,
        bool voteFor,
        uint256 votesFor,
        uint256 votesAgainst
    );

    event ProposalExecuted(uint256 proposalId, ProposalTypes proposalType);

    /* END proposal definitions */

    /* Add proposal functions */

    function addEraseProposal(
        string memory _description,
        uint8 xMin,
        uint8 yMin,
        uint8 xMax,
        uint8 yMax
    ) external onlyVoter {
        require(xMax < mapContract.mapWidth(), "xMax out of Map");
        require(yMax < mapContract.mapHeight(), "yMax out of Map");
        require(xMin <= xMax, "xMin must be <= xMax");
        require(yMin <= yMax, "yMin must be <= yMax");
        BaseProposal memory baseProposal = BaseProposal(
            msg.sender,
            _description,
            false,
            0,
            0
        );

        erasePixelsProposalCount++;
        ErasePixelsProposal memory eraseProposal = ErasePixelsProposal(
            xMin,
            yMin,
            xMax,
            yMax
        );

        erasePixelsProposals.push(eraseProposal);
        //attenton un user ne peux voter qu'une fois pour une proposal

        emit NewErasePixelsProposal(
            erasePixelsProposalCount,
            msg.sender,
            _description,
            xMin,
            yMin,
            xMax,
            yMax
        );

        proposalVotingInfos[
            getProposalId(erasePixelsProposalCount, ProposalTypes.ErasePixels)
        ] = baseProposal;
    }

    function addAddColorProposal(
        string memory _description,
        uint8 red,
        uint8 green,
        uint8 blue
    ) external onlyVoter {
        Places.Color[] memory color = mapContract.getColors();

        for (uint i = 0; i < color.length; i++) {
            require(
                color[i].red != red &&
                    color[i].green != green &&
                    color[i].blue != blue,
                "Color already exist"
            );
        }

        BaseProposal memory baseProposal = BaseProposal(
            msg.sender,
            _description,
            false,
            0,
            0
        );

        addColorProposalCount++;
        AddColorProposal memory eraseProposal = AddColorProposal(
            red,
            green,
            blue
        );

        addColorProposals.push(eraseProposal);

        emit NewAddColorProposal(
            erasePixelsProposalCount,
            msg.sender,
            _description,
            red,
            green,
            blue
        );

        proposalVotingInfos[
            getProposalId(addColorProposalCount, ProposalTypes.AddColor)
        ] = baseProposal;
    }

    function addChangeMapSizeProposal(
        string memory _description,
        uint16 newMapWidth,
        uint16 newMapHeight
    ) external onlyVoter {
        require(
            newMapWidth > mapContract.mapWidth(),
            "newMapWidth must be > mapWidth"
        );
        require(
            newMapHeight > mapContract.mapHeight(),
            "newMapHeight must be > mapHeight"
        );
        BaseProposal memory baseProposal = BaseProposal(
            msg.sender,
            _description,
            false,
            0,
            0
        );

        changeMapSizeProposalCount++;
        ChangeMapSizeProposal
            memory changeMapSizeProposal = ChangeMapSizeProposal(
                newMapWidth,
                newMapHeight
            );

        changeMapSizeProposals.push(changeMapSizeProposal);

        emit NewChangeMapSizeProposal(
            erasePixelsProposalCount,
            msg.sender,
            _description,
            newMapWidth,
            newMapHeight
        );

        proposalVotingInfos[
            getProposalId(
                changeMapSizeProposalCount,
                ProposalTypes.ChangeMapSize
            )
        ] = baseProposal;
    }

    /* END Add proposal functions */

    /* Vote functions */
    function VoteForProposal(
        uint256 _proposalId,
        ProposalTypes _proposalType,
        bool _voteFor
    ) external onlyVoter {
        require(_proposalId > 0, "Can't vote for proposal 0");

        bytes32 proposalHash = getProposalId(_proposalId, _proposalType);
        require(
            proposalVotingInfos[proposalHash].proposer != address(0),
            "Proposal does not exist"
        );

        require(
            userVotedForProposal[msg.sender][proposalHash] == false,
            "You already voted for this proposal"
        );
        require(
            proposalVotingInfos[proposalHash].executed == false,
            "This proposal has already been executed"
        );

        if (_voteFor) {
            proposalVotingInfos[proposalHash].votesFor += mapContract
                .userVoteCount(msg.sender);
        } else {
            proposalVotingInfos[proposalHash].votesAgainst += mapContract
                .userVoteCount(msg.sender);
        }

        userVotedForProposal[msg.sender][proposalHash] = true;
        userVotesForProposal[proposalHash] = UserVote(
            true,
            _voteFor,
            msg.sender
        );
        emit Voted(
            _proposalId,
            _proposalType,
            msg.sender,
            _voteFor,
            proposalVotingInfos[proposalHash].votesFor,
            proposalVotingInfos[proposalHash].votesAgainst
        );

        tallyProposalVotes(_proposalId, _proposalType);
    }

    function tallyProposalVotes(
        uint256 proposalId,
        ProposalTypes proposalType
    ) internal {
        bytes32 proposalHash = getProposalId(proposalId, proposalType);
        BaseProposal memory proposal = proposalVotingInfos[proposalHash];

        uint256 voteFor = proposal.votesFor;

        //Calculer le nombre de voix total (et voir si ça va a plus de 50%)
        if (voteFor > proposal.votesAgainst) {
            uint256 totalVoters = mapContract.totalVoteCount();
            uint256 result = (voteFor * 100) / totalVoters;

            if (result > percentToAccept) {
                if (proposalType == ProposalTypes.ErasePixels) {
                    mapContract.erasePixels(
                        erasePixelsProposals[proposalId - 1].xMin,
                        erasePixelsProposals[proposalId - 1].yMin,
                        erasePixelsProposals[proposalId - 1].xMax,
                        erasePixelsProposals[proposalId - 1].yMax
                    );
                } else if (proposalType == ProposalTypes.AddColor) {
                    mapContract.addColor(
                        addColorProposals[proposalId - 1].red,
                        addColorProposals[proposalId - 1].green,
                        addColorProposals[proposalId - 1].blue
                    );
                } else {
                    mapContract.changeMapSize(
                        changeMapSizeProposals[proposalId - 1].newMapWidth,
                        changeMapSizeProposals[proposalId - 1].newMapHeight
                    );
                }

                proposalVotingInfos[proposalHash].executed = true;
                emit ProposalExecuted(proposalId, proposalType);
            }
        }
    }

    /* END Vote functions */

    /* Get proposalInfo functions */

    function getProposalInfos(
        uint256 _proposalId,
        ProposalTypes _proposalType
    ) public view returns (BaseProposal memory) {
        bytes32 proposalHash = keccak256(
            abi.encodePacked(_proposalId, _proposalType)
        );
        require(
            proposalVotingInfos[proposalHash].proposer != address(0),
            "Proposal does not exist"
        );

        return proposalVotingInfos[proposalHash];
    }

    function getProposalId(
        uint256 _proposalId,
        ProposalTypes _proposalType
    ) public pure returns (bytes32) {
        return keccak256(abi.encodePacked(_proposalId, _proposalType));
    }

    function getEraseProposals()
        public
        view
        returns (ErasePixelsProposal[] memory)
    {
        return erasePixelsProposals;
    }

    function getEraseProposalInfos()
        public
        view
        returns (BaseProposal[] memory)
    {
        BaseProposal[] memory result = new BaseProposal[](
            erasePixelsProposals.length
        );

        for (uint i = 0; i < erasePixelsProposals.length; i++) {
            BaseProposal memory test = getProposalInfos(
                i + 1,
                ProposalTypes.ErasePixels
            );
            result[i] = test;
        }
        return result;
    }

    function getAddColorProposals()
        public
        view
        returns (AddColorProposal[] memory)
    {
        return addColorProposals;
    }

    function getAddColorProposalsInfos()
        public
        view
        returns (BaseProposal[] memory)
    {
        BaseProposal[] memory result = new BaseProposal[](
            addColorProposals.length
        );
        for (uint i = 0; i < addColorProposals.length; i++) {
            BaseProposal memory test = getProposalInfos(
                i + 1,
                ProposalTypes.AddColor
            );
            result[i] = test;
        }
        return result;
    }

    function getChangeMapSizeProposals()
        public
        view
        returns (ChangeMapSizeProposal[] memory)
    {
        return changeMapSizeProposals;
    }

    function getChangeMapSizeProposalsInfos()
        public
        view
        returns (BaseProposal[] memory)
    {
        BaseProposal[] memory result = new BaseProposal[](
            changeMapSizeProposals.length
        );
        for (uint i = 0; i < changeMapSizeProposals.length; i++) {
            BaseProposal memory test = getProposalInfos(
                i + 1,
                ProposalTypes.ChangeMapSize
            );
            result[i] = test;
        }
        return result;
    }

    /* END Get proposalInfo functions */

    /* DAO members  */

    mapping(address => bool) public voters;
    modifier onlyVoter() {
        require(
            mapContract.userVoteCount(msg.sender) > 0,
            "You must be a voter to perform this action"
        );
        _;
    }
}
