import React, { Component } from 'react'
import './Maze.css'


import MazeArrays from './MazeArrays'
import MazeCpu from './MazeCpu'
import MazeHuman from './MazeHuman'



export default class index extends Component {
  constructor() {
    super()
    this.state = {
      colorCode: ['white', 'grey', 'green', 'red', 'lightblue', 'lightpink', 'lightyellow'],
      mazeArr: MazeArrays()
    }
  }

  // ====================
  // lifecycle methods 
  // ====================


  // ====================
  // helper functions 
  // ====================

  // function to copy a nested array (only for 2d)
  // copyArr(arr) {
  //   return arr.map((secondArr) => {
  //     return secondArr.slice()
  //   })
  // }

  // ====================
  // handlers 
  // ====================

  handleClickReload = () => {
    window.location.reload(false)
  }

  // ====================
  // render 
  // ====================
  render() {

    return (
      <div>
        <nav>
          <div onClick={this.handleClickReload}>
            <h2> Refresh to try a random maze! </h2>
          </div>
        </nav>

        <div
          className="mazeIndex">

          <MazeHuman mazeArr={this.state.mazeArr} />

          <MazeCpu mazeArr={this.state.mazeArr} />
        </div>
      </div>
    )
  }
}


