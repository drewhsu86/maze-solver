import React from 'react'

export default function MazeDisplay(props) {

  // array for mapping a number (0-5) to a color
  // 0 = empty, 1 = wall, 2 = start, 3 = end
  // 4 = human path, 5 = computer path , 6 = computerSearched 
  const colorCode = props.colorCode ? props.colorCode : ['white', 'grey', 'green', 'red', 'lightblue', 'lightpink', 'lightyellow']
  return (
    <div className="mazeDisplay">
      {
        props.mazeArr.map((mazeRow, ind) => {
          return (
            <div className="mazeRow" key={ind}>
              {
                mazeRow.map((mazeTile, idx) => {
                  return (
                    <div className="mazeTile"
                      key={idx}
                      style={{
                        backgroundColor: colorCode[mazeTile]
                      }}
                    >
                      {props.showNum ? mazeTile : null}
                    </div>
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
