import React, { Component } from 'react'
import MazeDisplay from './MazeDisplay'
import MazeAlgorithms from './MazeAlgorithms'

export default class MazeCpu extends Component {
  constructor(props) {
    super(props)

    this.state = {
      mazeArr: this.props.mazeArr,
      mazeOrig: [],
      mazeCpu: [],
      numVisited: null,
      numPathLen: null
    }
  }

  // ===============
  // lifecycle events 
  // ===============

  componentDidMount() {
    // testing that we can find the endpoints of our maze 

    let newMazeCpu = this.copyArr(this.state.mazeArr)

    const sfsResult = MazeAlgorithms(this.state.mazeArr, 'b')

    sfsResult.path.forEach((coord, ind) => {
      if (ind !== 0 && ind < sfsResult.path.length - 2) {
        newMazeCpu[coord[1]][coord[0]] = 5
      }
    })
    this.setState({
      mazeOrig: this.copyArr(this.state.mazeArr),
      mazeCpu: newMazeCpu,

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


  // function to change mazeArr, which is to be displayed 
  // to either mazeOrig or mazeCpu 
  // if alg is defined, always use mazeCpu 
  handleClickMaze = (e, arr, alg) => {
    const newArr = this.copyArr(arr)
    let newNumVisited = null
    let newNumPathLen = null

    // if we use an alg argument, call an algo 
    if (alg) {
      const sfsResult = MazeAlgorithms(this.state.mazeOrig, alg)

      if (!sfsResult) {
        console.log(sfsResult)
        return
      }
      sfsResult.path.forEach((coord, ind) => {
        if (ind !== 0 && ind < sfsResult.path.length - 2) {
          newArr[coord[1]][coord[0]] = 5
        }
      })
      newNumVisited = Object.keys(sfsResult.visited).length
      newNumPathLen = sfsResult.path.length
    }

    this.setState({
      mazeArr: newArr,
      numVisited: newNumVisited,
      numPathLen: newNumPathLen
    })
  }

  // ===============
  // render
  // ===============


  render() {
    const colorCode = this.props.colorCode ? this.props.colorCode : ['white', 'grey', 'green', 'red', 'lightblue', 'lightpink', 'lightyellow']

    return (
      <div className="mazeCpu">
        <h1>Watch the CPU solve!</h1>
        <MazeDisplay
          colorCode={colorCode}
          mazeArr={this.state.mazeArr}
          showNum
        />
        <div className="infoPanel">
          <button
            onClick={e => this.handleClickMaze(e, this.state.mazeOrig)}>
            Reset
        </button>
          <button
            onClick={e => this.handleClickMaze(e, this.state.mazeOrig, 'd')}>
            Computer Solved (DFS)
        </button>
          <button
            onClick={e => this.handleClickMaze(e, this.state.mazeOrig, 'b')}>
            Computer Solved (BFS)
        </button>
        </div>

        <div className="infoPanel">
          <p className="infoBox">
            {typeof this.state.numVisited === 'number' ? `Spaces checked: ${this.state.numVisited} ` : null}
          </p>
          <p className="infoBox">
            {typeof this.state.numPathLen === 'number' ? `Spaces used: ${this.state.numPathLen - 2} ` : null}
          </p>
        </div>

      </div>
    )
  }
}

