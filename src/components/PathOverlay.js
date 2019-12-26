import React from 'react'
import '../css/PathOverlay.css'

const PathOverlay = ({ setupRoad }) => {
  const topPathRow = {
    id: "topPathRow",
    numbers: [0, 1, 2, 3, 4, 5],
    orientation: "tiltUp",
  }
  const topVertRow = {
    id: "topVertRow",
    numbers: [6, 7, 8, 9],
    orientation: "vertical",
  }
  const upperTiltRow = {
    id: "upperTiltRow",
    numbers: [10, 11, 12, 13, 14, 15, 16, 17],
    orientation: "tiltUp",
  }
  const upperVertRow = {
    id: "upperVertRow",
    numbers: [18, 19, 20, 21, 22],
    orientation: "vertical",
  }
  const upperMiddleTiltRow = {
    id: "upperMiddleTiltRow",
    numbers: [23, 24, 25, 26, 27, 28, 29, 30, 31, 32],
    orientation: "tiltUp",
  }
  const middleVertRow = {
    id: "middleVertRow",
    numbers: [33, 34, 35, 36, 37, 38],
    orientation: "vertical",
  }
  const lowerMiddleTiltRow = {
    id: "lowerMiddleTiltRow",
    numbers: [39, 40, 41, 42, 43, 44, 45, 46, 47, 48],
    orientation: "tiltDown",
  }
  const lowerVertRow = {
    id: "lowerVertRow",
    numbers: [49, 50, 51, 52, 53],
    orientation: "vertical",
  }
  const lowerTiltRow = {
    id: "lowerTiltRow",
    numbers: [54, 55, 56, 57, 58, 59, 60, 61],
    orientation: "tiltDown",
  }
  const bottomVertRow = {
    id: "bottomVertRow",
    numbers: [62, 63, 64, 65],
    orientation: "vertical",
  }
  const bottomPathRow = {
    id: "bottomPathRow",
    numbers: [66, 67, 68, 69, 70, 71],
    orientation: "tiltDown",
  }

  const rowData = [
    topPathRow,
    topVertRow,
    upperTiltRow,
    upperVertRow,
    upperMiddleTiltRow,
    middleVertRow,
    lowerMiddleTiltRow,
    lowerVertRow,
    lowerTiltRow,
    bottomVertRow,
    bottomPathRow,
  ]

  return (
    <div id="pathOverlay">
      {rowData.map(({ id, numbers, orientation }) => {
        const orientationArr = []
        if (orientation === "tiltDown") {
          numbers.forEach((_, index) => orientationArr.push(index % 2 === 0 ? "tiltDown" : "tiltUp"))
        } else if (orientation === "tiltUp") {
          numbers.forEach((_, index) => orientationArr.push(index % 2 === 0 ? "tiltUp" : "tiltDown"))
        } else if (orientation === "vertical") {
          numbers.forEach(_ => orientationArr.push("vertical"))
        }
        
        return (
          <div id={id} className={"pathRow " + (orientation === "vertical" ? "vertRow" : "tiltRow")}>
            {numbers.map((num, numIndex) =>
              <div onClick={setupRoad} id={`path${num}`} className={"path "+orientationArr[numIndex]} />
            )}
          </div>
        )
      })}
    </div>
  )
}

export default PathOverlay