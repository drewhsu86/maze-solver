// 2d arrays (each subarray has same length)
// 0 = empty, 1 = wall
// 2 = start, 3 = end 
// 4 = human path, 5 = computer path 

export default function MazeArrays(idx) {
  return [typeof idx === 'number' ? mazes[idx] : mazes[0], mazes.length]
}

const mazes = [
  [
    [1, 1, 2, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 3, 1, 1, 1]
  ]

]
