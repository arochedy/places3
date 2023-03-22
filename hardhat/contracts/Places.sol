// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Places {
    struct Pixel {
        uint16 x;
        uint16 y;
        uint32 colorId; //a voir si on stocke une liste de couleurs plutot
        uint256 voteCount; //on stocke le nombre de votes
        uint256 currentColorVoteCount; //on stocke le nombre de votes pour la couleur courante
    }

    struct Color {
        uint8 red;
        uint8 green;
        uint8 blue;
    }

    Color[] public colors;
    mapping(uint16 => mapping(uint16 => mapping(uint32 => uint256))) voteForColors; //on stocke les vote de chaque couleur dans un mapping de mapping
    // mapping(bytes32 => Pixel) public pixelMapping; //on stocke les pixels dans un mapping

    struct Coord {
        uint16 x;
        uint16 y;
    }

    mapping(uint16 => mapping(uint16 => Pixel)) public pixels;
    Coord[] public pixelCoords;

    event PixelChanged(uint16 x, uint16 y, uint256 color, uint256 voteCount);

    event VoteForColorPixel(uint16 x, uint16 y, uint256 color, address voter);

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

        // Mettez à jour les propriétés du pixel
        pixel.x = x;
        pixel.y = y;
        pixel.colorId = colorId;
        pixel.voteCount++;
        voteForColors[x][y][colorId]++;

        if (voteForColors[x][y][colorId] > pixel.currentColorVoteCount) {
            //si la couleur a plus de votes que la couleur courante
            pixel.colorId = colorId; //on change la couleur courante
            pixel.currentColorVoteCount = voteForColors[x][y][colorId]; //on change le nombre de votes pour la couleur courante
            emit PixelChanged(x, y, colorId, pixel.currentColorVoteCount); //on emet un evenement
        }
        emit VoteForColorPixel(x, y, colorId, msg.sender); //on emet un evenement
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
        }
        return pixelArray;
    }

    function getPixel(uint16 x, uint16 y) public view returns (Pixel memory) {
        return pixels[x][y];
    }
}
