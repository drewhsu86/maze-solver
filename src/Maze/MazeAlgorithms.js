// this function doesn't return jsx
// it returns arrays of steps from having done algorithms
// MazeDisplay must be used to show a maze 
export default function MazeAlgorithms(arr, alg) {

  return somethingFirstSearch(arr, 2, 3, alg === 'd' || alg === 'b' ? alg : 'd')
}

// =============================================================
// helper functions written outside of exported default function 
// =============================================================

// function returns [[sX, sY], [eX, eY]]
// by finding where the start and end coordinates are in an arr 
export function findEnds(arr, sNum, eNum) {
  // add some booleans to quit out early 
  let startFound = false
  let endFound = false
  let results = []
  arr.forEach((row, indY) => {
    row.forEach((val, indX) => {
      if (val === sNum) {
        results.unshift([indX, indY])
        startFound = true
      }
      if (val === eNum) {
        results.push([indX, indY])
        endFound = true
      }
      if (startFound && endFound) {
        return results
      }
    })
  })
  return results
}

// function to return neighbors for 4 cardinal directions 
// and to ignore when outside of arrays 
export function cardinalNeighbors(arr, coord, empties) {
  // cannot go below zero or above arr.length-1 for indY, 
  // or above arr[indY].length-1 for indX
  const [indX, indY] = coord
  let results = []

  // empties is an array that holds numbers we can move over 
  const tryCoords = [
    [indX - 1, indY], [indX + 1, indY], [indX, indY - 1], [indX, indY + 1]
  ]

  // this forEach should only run 4 times to try 4 positions 
  tryCoords.forEach((tryCoord) => {
    // console.log(tryCoord) 

    // Y coordinate is the second element of each item 
    // so its the outer array of the nested array 
    if (tryCoord[1] >= 0 && tryCoord[1] < arr.length) {

      if (tryCoord[0] >= 0 && tryCoord[0] < arr[tryCoord[1]].length) {
        // console.log(empties, '-', arr[tryCoord[1]][tryCoord[0]])
        if (empties.includes(arr[tryCoord[1]][tryCoord[0]])) {
          results.push(tryCoord)
        }
      }
    }
  }) // end of forEach for tryCoord 

  return results
}

// -------------------------------------------------
// start of algorithms 
// -------------------------------------------------

// depth first search and breadth first search 
function somethingFirstSearch(arr, sNum, eNum, alg) {
  // sNum and eNum are the numbers 2 and 3 
  // we iterate through the maze once (not solving)
  // to return the coordinates of where the start and end are 

  // default is dfs, which uses a stack 
  // if our argument starts with b, use bfs 

  const [start, end] = findEnds(arr, sNum, eNum)

  // save visited coords as keys of an object
  // so we can access it quickly (no need to search)
  let visited = {}

  // 'top' of stack is front so we can get things with [0], shift/unshift
  // we start the stack with the object of what we want to use 
  let stack = [
    {
      coord: start,
      path: [start]
    }
  ] // can also be used as a queue 

  // while loop, find neighbors that are empty 
  // this assumes only numbers 0-3 (no marked human or computer numbers)
  const empties = [0, 3]

  while (stack.length > 0) {

    const currNode = stack.shift()
    const currCoord = currNode.coord
    const currPath = currNode.path

    // if this is the destination we can return 
    if (arr[currCoord[1]][currCoord[0]] === eNum) {
      currPath.push(currCoord)
      return {
        coord: currCoord,
        path: currPath,
        visited: visited
      }
    }

    // helper function to return array of valid neighbors 
    const validNeighbors = cardinalNeighbors(arr, currCoord, empties)

    // for each, check if they were already visited 
    // if not add them to the stack and add them to visited 
    // format for keys: indX-indY so we can make a string separated by '-'
    validNeighbors.forEach((coord) => {
      if (!visited[coord[0] + '-' + coord[1]]) {
        visited[coord[0] + '-' + coord[1]] = true
        let newPath = currPath.slice()
        newPath.push(coord)
        // if alg = b, use bfs or else dfs 
        if (alg.toLowerCase() === 'b') {
          stack.push({
            coord: coord,
            path: newPath
          })
        } else {
          stack.unshift({
            coord: coord,
            path: newPath
          })
        } // end of if else for bfs or dfs 
      } // end of if visited 
    }) // end of valid neighbors forEach 

    // console.log('coord', currCoord, ': ', arr[currCoord[1]][currCoord[0]])
    // console.log('stack', stack.slice())
    // console.log('visited', visited)

  } // end of while loop of dfs, bfs  

  // if we empty the stack, end was not found 
  return false

} // end of somethingFirstSearch 

