import React, { useState, useEffect, useReducer } from 'react';
import '../css/PathOverlay.css';

const PathOverlay = (props) => {
  const numbers = [
    [0, 1, 2, 3, 4, 5],
    [6, 7, 8, 9],
    [10, 11, 12, 13, 14, 15, 16, 17],
    [18, 19, 20, 21, 22],
    [23, 24, 25, 26, 27, 28, 29, 30, 31, 32],
    [33, 34, 35, 36, 37, 38],
    [39, 40, 41, 42, 43, 44, 45, 46, 47, 48],
    [49, 50, 51, 52, 53],
    [54, 55, 56, 57, 58, 59, 60, 61],
    [62, 63, 64, 65,],
    [66, 67, 68, 69, 70, 71]
  ];
  const rowIDs = [
    ["topPathRow", "tiltUp"],
    ["topVertRow", "vertical"],
    ["upperTiltRow", "tiltUp"],
    ["upperVertRow", "vertical"],
    ["upperMiddleTiltRow", "tiltUp"],
    ["middleVertRow", "vertical"],
    ["lowerMiddleTiltRow", "tiltDown"],
    ["lowerVertRow", "vertical"],
    ["lowerTiltRow", "tiltDown"],
    ["bottomVertRow", "vertical"],
    ["bottomPathRow", "tiltDown"]
  ];
  return (
    <div id="pathOverlay">
      {
        rowIDs.map(function(x, index) {
          let orientation = [];
          if (x[1] === "vertical") {
            numbers[index].forEach((e, index) => orientation.push("vertical"));
          }
          else if (x[1] === "tiltUp") {
            numbers[index].forEach((e, index) => orientation.push(index%2 === 0 ? "tiltUp" : "tiltDown"));
          }
          else {
            numbers[index].forEach((e, index) => orientation.push(index%2 === 0 ? "tiltDown" : "tiltUp"));
          }
          console.log(x[0]+ " has orientation " + orientation)
          return (
            <div id={x[0]} className={"pathRow " + (x[1] == "vertical" ? "vertRow" : "tiltRow")}>
              {
                numbers[index].map(function(y, yindex) {
                  console.log(yindex);
                  return (
                    <div onClick={props.setupRoad} id={"path"+y} className={"path "+orientation[yindex]}></div>
                  )
                })
              }
            </div>
          )
        })
      }
    </div>
  )
}

export { PathOverlay }