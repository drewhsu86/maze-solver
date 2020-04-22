import React, { Component } from 'react'
import MazeDisplay from './MazeDisplay'
import { findEnds, cardinalNeighbors } from './MazeAlgorithms'

export default class MazeHuman extends Component {
  constructor(props) {
    super(props)

    this.state = {
      mazeArr: this.props.mazeArr,
      mazeOrig: [],
      startPos: [],
      currPos: [],
      endPos: [],
      errMsg: '',
      goalReached: false,
      currCount: 0
    }
  }

  // ===============
  // lifecycle events 
  // ===============

  componentDidMount() {
    const newMazeOrig = this.copyArr(this.state.mazeArr)
    const [start, end] = findEnds(this.state.mazeArr, 2, 3)

    this.setState({
      mazeOrig: newMazeOrig,
      startPos: start,
      currPos: start,
      endPos: end,
      canCount: true,
      currCount: 0
    })
  }

  // ===============
  // methods
  // ===============

  // function to copy a nested array (only for 2d)
  copyArr(arr) {
    return arr.map((secondArr) => {
      return secondArr.slice()
    })
  }


  // ===============
  // handlers
  // ===============

  handleClickReset = () => {
    const newMazeArr = this.state.mazeOrig
    const newPos = this.state.startPos
    this.setState({
      mazeArr: newMazeArr,
      goalReached: false,
      currCount: 0,
      currPos: newPos
    })
  }

  handleOnchange = () => {
    console.log('onChange')
  }

  handleKeypress = (e) => {
    // try to move the position to the next position 
    // make the old value 0, make the new value 2
    const [x, y] = this.state.currPos
    const newMazeArr = this.copyArr(this.state.mazeArr)
    const empties = [0, 3]

    let goalReached = false
    let newX, newY
    let currCount = this.state.currCount

    if (!this.state.goalReached) {
      // some keys like arrows on mac don't affect this
      switch (e.key) {
        case 'w':
          console.log('w')
          newX = x
          newY = y - 1
          if (this.tryCoords(newMazeArr, [newX, newY], empties)) {
            // if we can move in here do the swap 
            newMazeArr[newY][newX] = 2
            newMazeArr[y][x] = 0
            currCount++

            // make unable to move if goal reached 
            if (this.state.mazeOrig[newY][newX] === 3) {
              goalReached = true
            }
          } else {
            console.log(`can't move`)
            newX = x
            newY = y
          }

          break
        case 'a':
          console.log('a')
          newX = x - 1
          newY = y
          if (this.tryCoords(newMazeArr, [newX, newY], empties)) {
            // if we can move in here do the swap 
            newMazeArr[newY][newX] = 2
            newMazeArr[y][x] = 0
            currCount++

            // make unable to move if goal reached 
            if (this.state.mazeOrig[newY][newX] === 3) {
              goalReached = true
            }
          } else {
            console.log(`can't move`)
            newX = x
            newY = y
          }
          break
        case 'd':
          console.log('d')
          newX = x + 1
          newY = y
          if (this.tryCoords(newMazeArr, [newX, newY], empties)) {
            // if we can move in here do the swap 
            newMazeArr[newY][newX] = 2
            newMazeArr[y][x] = 0
            currCount++

            // make unable to move if goal reached 
            if (this.state.mazeOrig[newY][newX] === 3) {
              goalReached = true
            }
          } else {
            console.log(`can't move`)
            newX = x
            newY = y
          }
          break
        case 's':
          console.log('s')
          newX = x
          newY = y + 1
          if (this.tryCoords(newMazeArr, [newX, newY], empties)) {
            // if we can move in here do the swap 
            newMazeArr[newY][newX] = 2
            newMazeArr[y][x] = 0
            currCount++

            // make unable to move if goal reached 
            if (this.state.mazeOrig[newY][newX] === 3) {
              goalReached = true
            }
          } else {
            console.log(`can't move`)
            newX = x
            newY = y
          }
          break
      }
    }
    // no default because no movement if not matched 

    this.setState({
      mazeArr: newMazeArr,
      currPos: [newX, newY],
      goalReached,
      currCount
    })
  }

  // helper function to determine if this space can be moved into 
  tryCoords(arr, tryCoord, empties) {
    // if the Y coordinate is within the length of the array
    if (tryCoord[1] >= 0 && tryCoord[1] < arr.length) {
      // if the X coordinate is within the length of the subarray 
      if (tryCoord[0] >= 0 && tryCoord[0] < arr[tryCoord[1]].length) {
        // if the space is considered empty 
        if (empties.includes(arr[tryCoord[1]][tryCoord[0]])) {
          return true
        }
      }
    }
    return false
  }


  // ===============
  // render
  // ===============

  render() {

    const colorCode = this.props.colorCode ? this.props.colorCode : ['white', 'grey', 'green', 'red', 'lightblue', 'lightpink', 'lightyellow']

    return (
      <div className="mazeHuman">

        <MazeDisplay
          colorCode={colorCode}
          mazeArr={this.state.mazeArr}
        />

        <button
          onClick={this.handleClickReset}>
          Reset
        </button>

        <input
          className='controller'
          type='text'
          onChange={this.handleOnchange}
          value='(  ^-^)> Click here and wasd'
          onKeyPress={this.handleKeypress}
          placeholder='Controller'
        />
        <p className='errMsg'>
          Number of steps taken: {this.state.currCount}
        </p>

        <p className='errMsg'>
          {this.state.errMsg ? this.state.errMsg : null}
        </p>

      </div>
    )
  }
}
