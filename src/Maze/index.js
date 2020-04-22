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
      mazeArr: MazeArrays(0)[0]
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



  // ====================
  // render 
  // ====================
  render() {

    return (
      <div
        className="mazeIndex">

        <MazeHuman mazeArr={this.state.mazeArr} />

        <MazeCpu mazeArr={this.state.mazeArr} />
      </div>
    )
  }
}


