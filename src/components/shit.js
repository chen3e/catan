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
  ["topPathRow", "up"],
  ["topVertRow", "vert"],
  ["upperTiltRow", "up"],
  ["upperVertRow", "vert"],
  ["upperMiddleTiltRow", "up"],
  ["middleVertRow", "vert"],
  ["lowerMiddleTiltRow", "down"],
  ["lowerVertRow", "vert"],
  ["lowerTiltRow", "down"],
  ["bottomVertRow", "vert"],
  ["bottomPathRow", "down"]
];
function display (){
    return (
    <div id="pathOverlay">
      {
        rowIDs.map(function(x, index) {
          console.log(x)
          console.log(index)
          return (
            <div id={x[0]} className={"path" + (x[1] == "vert" ? "" : "tiltRow")}>
              {
                numbers[index].map(y => {
                  console.log(y);
                  return <div onClick={props.setupRoad} id={"path"}></div>

                }
                )
              }
            </div>
          )
        })
      }
    </div>
  )
}
console.log(display);