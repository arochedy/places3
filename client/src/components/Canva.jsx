import React, { Component, useState } from 'react';
import { render } from 'react-dom';
import { Stage, Layer, Rect, Text } from 'react-konva';
import Konva from 'konva';

export function Canvas()  {
    const colors = [
        'red',
        'white',
        'orange',
        'yellow',
        'green',
        'blue',
        'indigo',
        'violet'
    ]
    const [nbRect, setNbRect] = useState(30);
    const [selectedPixel, setSelectedPixel] = useState(null);
    const [rectangles, setRectangles] = useState(generateRectangles());
    const [selectedColor, setSelectedColor] = useState(null);
    //function to generate multiplr rectangles 
    function generateRectangles() {
        const rectangles = [];
        for (let i = 0; i < nbRect; i++) {
            for(let j = 0; j < nbRect; j++)
            {
                rectangles.push(
                    {
                        id: "rect"+ "x"+i + "y"+j,
                        x : i,
                        y : j,
                        color: colors[Math.floor(Math.random() * colors.length)]
    
                    }
                  
                );
            }
        
        }
        return rectangles;
    }

    const onSelectColor = (id,color) => {
        setSelectedColor(color);
        const newRect = [...rectangles];

        const index = newRect.findIndex((rect) => rect.id ===id);
        newRect[index].color = color;
    }
    const  handleClick = (id, color) => {
        // alert('saved');
    }


    const  onSelectPixel = (pixel) => {
        setSelectedPixel(pixel);
        
        
        // const newRect = [...rectangles];
        // const index = newRect.findIndex((rect) => rect.id === id);
        // newRect[index].color = colors[Math.floor(Math.random() * colors.length)]
        // setRectangles(newRect);
    }

    const [rectSize, setRectSize] = useState(50);

   

    // Stage is a div container
    // Layer is actual canvas element (so you may have several canvases in the stage)
    // And then we have canvas shapes inside the Layer
    return (
        <>
        <div>T'ST</div>
        <button type="button" onClick={() => setRectSize(rectSize + 10)}>ZOOM +</button>
        <button type="button" onClick={() => setRectSize(rectSize - 10)}>ZOOM -</button>
        {selectedPixel!=null && (<>
                <div className='row colors'>
                    {colors.map((color) => {
                        return (<div key={color} style={{ width : 50, height : 50, backgroundColor : color}} onClick={() => onSelectColor(selectedPixel.id, color)}></div>)
                    })}
                </div>
            <button type="button" onClick={() => handleClick(selectedPixel.id, selectedColor)}>Validate</button>
        </>
         )}
 
        <div className='row'>
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          <Text text="Try click on rect" />
          {rectangles.map((rect) => {return (<Rect key={rect.id}
        x={rect.x*rectSize}
        y={rect.y*rectSize}
        width={rectSize}
        height={rectSize}
        fill={rect.color}
        stroke={rect.id == selectedPixel?.id ? 'black' : rect.color}
        // strokeWidth={4}
        shadowBlur={rect.id == selectedPixel?.id ? 5 : 0}
        onClick={() => onSelectPixel(rect)}
      />)})}
        </Layer>
        
      </Stage>
    
    </div>
      </>
    );
  
}
