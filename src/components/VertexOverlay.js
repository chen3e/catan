import React, { useState, useEffect, useReducer } from 'react';
import '../css/VertexOverlay.css';

const VertexOverlay = (props) => {
  const numbers = [
    [0, 1, 2, 3, 4, 5, 6],
    [7, 8, 9, 10, 11, 12, 13, 14, 15],
    [16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26],
    [27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37],
    [38, 39, 40, 41, 42, 43, 44, 45, 46],
    [47, 48, 49, 50, 51, 52, 53]
  ];
  const rowIDs = [
    "topVertexRow",
    "upperVertexRow",
    "upperMiddleVertexRow",
    "lowerMiddleVertexRow",
    "lowerVertexRow",
    "bottomVertexRow"
  ];
  return (
    <div id="vertexOverlay">
      {
        rowIDs.map(function(x, index) {
          return (
            <div id={x} className="vertexRow">
              {
                numbers[index].map(y =>
                  <div onClick={props.setupSettlement} id={"vertex"+y} className="vertex"></div>
                )
              }
            </div>
          )
        })
      }
    </div>
  )
}

export { VertexOverlay };