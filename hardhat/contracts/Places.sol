// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
// import "hardhat/console.sol";

import "@openzeppelin/contracts/access/Ownable.sol";

contract Places is Ownable {
    struct Pixel {
        uint256 voteCount; //on stocke le nombre de votes total (utile ?)
        uint256 currentColorVoteCount; //on stocke le nombre de votes pour la couleur courante
        uint16 x;
        uint16 y;
        uint32 colorId; // on stocke une liste de couleurs plutot
    }

    struct Color {
        uint8 red;
        uint8 green;
        uint8 blue;
    }
    Color[] public colors;

    uint16 public mapWidth = 100;
    uint16 public mapHeight = 100;

    uint256 public totalVoteCount;
    uint256 public totalVotingUsers;

    mapping(address => uint256) public userVoteCount;
    mapping(uint32 => mapping(uint32 => mapping(uint32 => uint256))) voteForColors; //on stocke les vote de chaque couleur dans un mapping de mapping
    // mapping(Coord => mapping(Color => uint256)) voteForColors;
    // mapping(bytes32 => Pixel) public pixelMapping; //on stocke les pixels dans un mapping

    struct Coord {
        uint16 x;
        uint16 y;
    }

    mapping(uint16 => mapping(uint16 => Pixel)) public pixels;
    Coord[] public pixelCoords;

    event PixelChanged(uint16 x, uint16 y, uint256 color, uint256 voteCount);

    event VoteForColorPixel(uint16 x, uint16 y, uint256 color, address voter);
    event MapSizeChanged(uint32 newMapWidth, uint32 newMapHeight);

    constructor() {
        Color memory white = Color(0, 0, 0);
        Color memory red = Color(255, 0, 0);
        Color memory green = Color(0, 255, 0);
        Color memory blue = Color(0, 0, 255);
        Color memory yellow = Color(255, 255, 0);
        Color memory purple = Color(255, 0, 255);
        Color memory cyan = Color(0, 255, 255);
        Color memory black = Color(255, 255, 255);

        colors.push(white);
        colors.push(red);
        colors.push(green);
        colors.push(blue);
        colors.push(yellow);
        colors.push(purple);
        colors.push(cyan);
        colors.push(black);
    }

    function votePixel(uint16 x, uint16 y, uint32 colorId) public {
        require(colorId < colors.length, "Color not found");
        Pixel storage pixel = pixels[x][y];

        // Si le pixel n'existe pas, ajoutez les coordonnées à pixelCoords
        if (pixel.voteCount == 0) {
            pixelCoords.push(Coord(x, y));
        }

        pixel.voteCount++;
        voteForColors[x][y][colorId]++;
        totalVoteCount++;

        if (userVoteCount[msg.sender] == 0) {
            totalVotingUsers++;
        }

        userVoteCount[msg.sender]++;
        if (voteForColors[x][y][colorId] > pixel.currentColorVoteCount) {
            //si la couleur a plus de votes que la couleur courante
            pixel.colorId = colorId; //on change la couleur courante
            pixel.currentColorVoteCount = voteForColors[x][y][colorId]; //on change le nombre de votes pour la couleur courante
            emit PixelChanged(x, y, colorId, pixel.currentColorVoteCount);
        }
        // pixels[x][y] = pixel;
        emit VoteForColorPixel(x, y, colorId, msg.sender);
    }

    // Obtenir le nombre total de pixels
    function getPixelCount() public view returns (uint256) {
        return pixelCoords.length;
    }

    function getPixels() public view returns (Pixel[] memory) {
        Pixel[] memory pixelArray = new Pixel[](pixelCoords.length);
        for (uint256 i = 0; i < pixelCoords.length; i++) {
            Coord memory coord = pixelCoords[i];
            pixelArray[i] = pixels[coord.x][coord.y];
            pixelArray[i].x = coord.x;
            pixelArray[i].y = coord.y;
        }
        return pixelArray;
    }

    /* DAO actions */

    // @title A title that should describe the contract/interface
    /// @notice Explain to an end user what this does
    /// @dev Explain to a developer any extra details

    function addColor(uint8 red, uint8 green, uint8 blue) public onlyOwner {
        Color memory color = Color(red, green, blue);
        colors.push(color);
    }

    function erasePixels(
        uint16 _xMin,
        uint16 _xMax,
        uint16 _yMin,
        uint16 _yMax
    ) public onlyOwner {
        for (uint16 i = _xMin; i <= _xMax; i++) {
            for (uint16 j = _yMin; j <= _yMax; j++) {
                clearPixel(i, j);
            }
        }
    }

    function clearPixel(uint16 _x, uint16 _y) internal {
        uint32 colorId = pixels[_x][_y].colorId;
        voteForColors[_x][_y][colorId] = 0; // on met le nombre de votes pour la couleur courante à 0 => c'est la couleur qu'on veut effacer elle repart à zero
        pixels[_x][_y].colorId = 0; // on met la couleur à blanc
        pixels[_x][_y].voteCount = 0; // on met le nombre de votes à 0
        pixels[_x][_y].currentColorVoteCount = 0; // on met le nombre de votes pour la couleur courante à 0
        emit PixelChanged(_x, _y, 0, 0);
        //faudra attendre le prochain vote qui changera automatiquement la couleur par la couleur voter la prochaine fois
    }

    function changeMapSize(uint16 _newX, uint16 _newY) public onlyOwner {
        mapWidth = _newX;
        mapHeight = _newY;
        emit MapSizeChanged(_newX, _newY);
    }

    function getColors() public view returns (Color[] memory) {
        return colors;
    }
}
