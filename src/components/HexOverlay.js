import React, { useState, useEffect, useReducer } from 'react';
import '../css/HexOverlay.css'

const HexOverlay = (props) => {
  const numbers = [[0, 1, 2], [3, 4, 5, 6], [7, 8, 9, 10, 11], [12, 13, 14, 15], [16, 17, 18]];
  const rowIDs = [
    "topHexRow",
    "upperHexRow",
    "middleHexRow",
    "lowerHexRow",
    "bottomHexRow"
  ];
  return (
    <div id="hexOverlay">
      {
        rowIDs.map(function(x, index) {
          return (
            <div id={x} className="hexRow">
              {
                numbers[index].map(y =>
                  <div onClick={props.clickHex} id={"hex"+y} className="hexagon">
                    <div className="hexTop"></div>
                    <div className="hexBottom"></div>
                  </div>
                )
              }
            </div>
          )
        })
      }
    </div>
  )
}

export { HexOverlay }