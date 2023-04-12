import React, { Component, useEffect, useState } from "react";
import { Stage, Layer, Rect, Text } from "react-konva";
import { Button, Spinner } from "@chakra-ui/react";

import { useToast } from "@chakra-ui/react";
import { placesAbi, placesAddress } from "../abi/places-abi";
import {
  useContractReads,
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
  useContractEvent,
} from "wagmi";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  WrapItem,
  Wrap,
} from "@chakra-ui/react";
import { Pixel } from "../models/pixel";
import { Rectangle } from "../models/rectangle";
import { Color } from "../models/color";
import { MapEvents } from "./MapEvents";

export function Canvas() {
  const [colors, setColors] = useState<Color[]>([]);
  const [displayColors, setDisplayColors] = useState<string[]>([]);
  const [selectedPixel, setSelectedPixel] = useState<Rectangle>();
  const [rectangles, setRectangles] = useState<Rectangle[]>([]);
  const [selectedColor, setSelectedColor] = useState<number>();
  const [isOpenColorModal, setIsOpenColorModal] = useState(false);
  const [isActivatedBorder, setIsActivatedBorder] = useState(false);

  const toast = useToast();

  useContractEvent({
    address: placesAddress,
    abi: placesAbi,
    eventName: "VoteForColorPixel",
    listener(node, label, owner) {
      console.log("test");
      console.log(node, label, owner);
    },
  });

  const { data, isError, isLoading } = useContractReads({
    watch: true,
    contracts: [
      {
        address: placesAddress,
        abi: placesAbi,
        functionName: "getColors",
      },
      {
        address: placesAddress,
        abi: placesAbi,
        functionName: "getPixels",
      },
      {
        address: placesAddress,
        abi: placesAbi,
        functionName: "mapWidth",
      },
      {
        address: placesAddress,
        abi: placesAbi,
        functionName: "mapHeight",
      },
    ],
  });

  const { config } = usePrepareContractWrite({
    address: placesAddress,
    abi: placesAbi,
    functionName: "votePixel",
    args: [selectedPixel?.x, selectedPixel?.y, selectedColor],
  });
  const {
    data: dataWrite,
    write,
    isError: isErrorWrite,
    isLoading: isLoadingWrite,
    error,
  } = useContractWrite(config);

  const {
    isLoading: isLoadingResultWrite,
    isSuccess,
    data: dataWriteEnd,
  } = useWaitForTransaction({
    hash: dataWrite?.hash,
  });

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: "Vote validé",
        description: "Votre vote est validé, bravo !",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  }, [isSuccess]);
  useEffect(() => {
    if (isErrorWrite) {
      toast({
        title: "Une erreur est survenue",
        description: "Aie votre vote n'a pas été pris en compte. Réessayez !",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  }, [isErrorWrite]);
  useEffect(() => {
    if (!isLoading && data) {
      const newColors = data[0] as Color[];
      setColors(newColors);
      const newPixels = data[1] as Pixel[];
      let currentMapWidth = data[2] as number;
      let currentMapHeight = data[3] as number;

      setRectSize(window.innerWidth / currentMapWidth);
      generateRectangles(
        newColors,
        newPixels,
        currentMapWidth,
        currentMapHeight
      );
    }
  }, [isLoading, data]);

  //function to generate multiplr rectangles
  function generateRectangles(
    colors: Color[],
    pixels: Pixel[],
    mapWidth: number,
    mapHeight: number
  ) {
    const newRect: Rectangle[] = [];
    for (let i = 0; i < mapWidth; i++) {
      for (let j = 0; j < mapHeight; j++) {
        let pixel = pixels.find(
          (pixel: Pixel) => pixel.x === i && pixel.y === j
        );
        let rect: Rectangle = {
          id: "rect" + "x" + i + "y" + j,
          x: i,
          y: j,
          color:
            pixel == undefined
              ? getColorFromIndex(0, colors)
              : getColorFromIndex(pixel.colorId, colors),
        };
        newRect.push(rect);
      }
    }
    setRectangles(newRect);
    let displayColors: any[] = [];
    colors?.forEach((color, index) => {
      let newColor = getColorFromIndex(index, colors);
      displayColors.push(newColor);
    });
    setDisplayColors(displayColors);
    return rectangles;
  }

  const getColorFromIndex = (index: number | undefined, colors: any[]) => {
    if (colors == undefined || index == undefined || colors?.length < index) {
      return "white";
    }
    let color = `rgb(${colors[index][0]}, ${colors[index][1]}, ${colors[index][2]})`;
    return color;
  };

  const onSelectColor = (colorIndex: number) => {
    setSelectedColor(colorIndex);
  };

  const validateColor = () => {
    write?.();
    closeColorModal();
  };

  const closeColorModal = () => {
    setIsOpenColorModal(false);
    setSelectedPixel(undefined);
    setSelectedColor(undefined);
  };

  // const  handleClick = (id, color) => {

  //     contract.methods.votePixel(0,0,3).call({ from: accounts[0] })
  //     .then(result => {
  //         return contract.methods.votePixel(0,0,3).send({ from: accounts[0] });
  //     })
  //     .then(result => {
  // // toast.success("Le vote pour la proposition " + inputVoteProposalId + " est enregistré", {
  // //   position: toast.POSITION.TOP_LEFT
  // // });
  // console.log('ok')
  //         // setHasVoted(true);
  //     })
  //     .catch(error => {
  // console.log('error')
  //     })
  //     // alert('saved');
  // }

  const getStrokeWidth = (rect: Rectangle) => {
    if (rect.id == selectedPixel?.id) {
      return 3;
    }
    return isActivatedBorder ? 1 : 0;
  };
  const onSelectPixel = (pixel: Rectangle) => {
    setSelectedPixel(pixel);
    setIsOpenColorModal(true);

    // const newRect = [...rectangles];
    // const index = newRect.findIndex((rect) => rect.id === id);
    // newRect[index].color = colors[Math.floor(Math.random() * colors.length)]
    // setRectangles(newRect);
  };

  const [rectSize, setRectSize] = useState(50);

  // Stage is a div container
  // Layer is actual canvas element (so you may have several canvases in the stage)
  // And then we have canvas shapes inside the Layer
  return (
    <>
      {isLoadingResultWrite && <Spinner />}
      <Wrap spacing="30px" style={{ marginTop: 30 }}>
        <WrapItem>
          <Button variant="link" onClick={() => setRectSize(rectSize + 10)}>
            ZOOM +
          </Button>
        </WrapItem>
        <WrapItem>
          <Button variant="link" onClick={() => setRectSize(rectSize - 10)}>
            ZOOM -
          </Button>
        </WrapItem>
        <WrapItem>
          <Button
            variant="link"
            onClick={() => setIsActivatedBorder((border: boolean) => !border)}
          >
            {isActivatedBorder ? "Désactiver" : "Activer"} les bordures
          </Button>
        </WrapItem>
      </Wrap>

      {error && (
        <div>An error occurred preparing the transaction: {error.message}</div>
      )}
      <div className="row" style={{ marginTop: 30 }}>
        {rectangles.length > 0 && (
          <Stage width={window.innerWidth} height={window.innerHeight}>
            <Layer>
              <Text text="Try click on rect" />
              {rectangles.map((rect) => {
                return (
                  <Rect
                    key={rect.id}
                    x={rect.x * rectSize}
                    y={rect.y * rectSize}
                    width={rectSize}
                    height={rectSize}
                    fill={
                      rect.id == selectedPixel?.id
                        ? getColorFromIndex(selectedColor, colors)
                        : rect.color
                    }
                    stroke="black"
                    strokeWidth={getStrokeWidth(rect)}
                    shadowBlur={rect.id == selectedPixel?.id ? 5 : 0}
                    onClick={() => onSelectPixel(rect)}
                    onTouchStart={() => onSelectPixel(rect)}
                  />
                );
              })}
            </Layer>
          </Stage>
        )}
      </div>
      <MapEvents />
      <Modal isOpen={isOpenColorModal} onClose={() => closeColorModal()}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Choisir la couleur pour le pixel x: {selectedPixel?.x} y :{" "}
            {selectedPixel?.y}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <>
              <div className="row colors">
                {displayColors.map((color, index) => {
                  return (
                    <div
                      key={"color" + index}
                      style={{
                        width: 50,
                        height: 50,
                        backgroundColor: color,
                        borderColor: "white",
                        borderWidth: selectedColor == index ? 5 : 0,
                        // : selectedColor == index ? : 0,
                      }}
                      onClick={() => onSelectColor(index)}
                    ></div>
                  );
                })}
              </div>
            </>
          </ModalBody>

          <ModalFooter>
            <Button mr={3} variant="outline" onClick={() => closeColorModal()}>
              Fermer
            </Button>
            <Button
              disabled={selectedColor == undefined}
              colorScheme={selectedColor == undefined ? "gray" : "blue"}
              onClick={() => validateColor()}
            >
              Valider
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
