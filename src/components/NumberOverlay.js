import React from 'react'
import '../css/NumberOverlay.css'

const NumberOverlay = () => {
  const topNumberRow = {
    id: "topNumberRow",
    numbers: [0, 1, 2],
  }
  const upperNumberRow = {
    id: "upperNumberRow",
    numbers: [3, 4, 5, 6],
  }
  const middleNumberRow = {
    id: "middleNumberRow",
    numbers:  [7, 8, 9, 10, 11],
  }
  const lowerNumberRow = {
    id: "lowerNumberRow",
    numbers: [12, 13, 14, 15],
  }
  const bottomNumberRow = {
    id: "bottomNumberRow",
    numbers: [16, 17, 18],
  }

  const rowData = [
    topNumberRow,
    upperNumberRow,
    middleNumberRow,
    lowerNumberRow,
    bottomNumberRow,
  ]


  return (
    <div id="numberOverlay">
      {rowData.map(({ id, numbers }) => (
        <div id={id} className="numberRow">
          {numbers.map(num =>
            <div className="hexNumber" id={`number${num}`} />
          )}
        </div>
      ))}
    </div>
  )
}

export default NumberOverlay