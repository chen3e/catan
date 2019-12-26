import React from 'react'
import '../css/VertexOverlay.css'

const VertexOverlay = ({ setupSettlement }) => {
  const topVertexRow = {
    id: "topVertexRow",
    numbers: [0, 1, 2, 3, 4, 5, 6],
  }
  const upperVertexRow = {
    id: "upperVertexRow",
    numbers: [7, 8, 9, 10, 11, 12, 13, 14, 15],
  }
  const upperMiddleVertexRow = {
    id: "upperMiddleVertexRow",
    numbers: [16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26],
  }
  const lowerMiddleVertexRow = {
    id: "lowerMiddleVertexRow",
    numbers: [27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37],
  }
  const lowerVertexRow = {
    id: "lowerVertexRow",
    numbers: [38, 39, 40, 41, 42, 43, 44, 45, 46],
  }
  const bottomVertexRow = {
    id: "bottomVertexRow",
    numbers: [47, 48, 49, 50, 51, 52, 53],
  }

  const rowData = [
    topVertexRow,
    upperVertexRow,
    upperMiddleVertexRow,
    lowerMiddleVertexRow,
    lowerVertexRow,
    bottomVertexRow,
  ]

  return (
    <div id="vertexOverlay">
      {rowData.map(({id, numbers}) => (
        <div id={id} className="vertexRow">
          {numbers.map(num =>
            <div onClick={setupSettlement} id={`vertex${num}`} className="vertex" />
          )}
        </div>
      ))}
    </div>
  )
}

export default VertexOverlay