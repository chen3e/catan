import React from 'react'
import '../css/HexOverlay.css'

const HexOverlay = ({ clickHex }) => {
  const topHexRow = {
    id: "topHexRow",
    numbers: [0, 1, 2],
  }
  const upperHexRow = {
    id: "upperHexRow",
    numbers: [3, 4, 5, 6],
  }
  const middleHexRow = {
    id: "middleHexRow",
    numbers: [7, 8, 9, 10, 11],
  }
  const lowerHexRow = {
    id: "lowerHexRow",
    numbers: [12, 13, 14, 15],
  }
  const bottomHexRow = {
    id: "bottomHexRow",
    numbers: [16, 17, 18],
  }

  const rowData = [
    topHexRow,
    upperHexRow,
    middleHexRow,
    lowerHexRow,
    bottomHexRow,
  ]

  return (
    <div id="hexOverlay">
      {rowData.map(({ id, numbers }) => (
        <div id={id} className="hexRow">
          {numbers.map(num =>
            <div onClick={clickHex} id={`hex${num}`} className="hexagon">
              <div className="hexTop" />
              <div className="hexBottom" />
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default HexOverlay