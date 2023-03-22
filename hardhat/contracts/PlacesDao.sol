// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
import {Places} from "./Places.sol";

contract PlacesDao is Places{

   mapping(uint256 => Pixel) public signaledPixel; //on stocke les pixels dans un mapping

    // mapping(address => ) public users; //on stocke les pixels dans un mapping

    function signalPixel(uint256 pixelId) public{

    }


    // function erasePixel(pixelId) public{

    // }
}
