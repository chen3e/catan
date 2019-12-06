import React, { useState, useEffect, useReducer } from 'react';
import '../css/NumberOverlay.css';

const NumberOverlay = () => {
  const numbers = [[0, 1, 2], [3, 4, 5, 6], [7, 8, 9, 10, 11], [12, 13, 14, 15], [16, 17, 18]];
  const rowIDs = [
    "topNumberRow",
    "upperNumberRow",
    "middleNumberRow",
    "lowerNumberRow",
    "bottomNumberRow"
  ];
  return (
    <div id="numberOverlay">{rowIDs.map(function (x, index) {
        return (
          <div id={x} className="numberRow">
            {
              numbers[index].map(
                y => <div className="hexNumber" id={"number"+y}></div>
              )
            }
          </div>
        )
      }
    )}
    </div>
  )
}

export { NumberOverlay };