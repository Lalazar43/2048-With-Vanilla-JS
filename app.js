let rows = 4
let columns = 4
let Board;

(function setGame() {
  Board = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ]
  for(let i = 0; i < rows; i++) {
    for(let j = 0; j < columns; j++) {
      let tile = document.createElement("div")
      tile.id = i.toString() + "-" + j.toString()
      let num = Board[i][j]
      updateTile(tile, num)
      document.getElementById("Board").append(tile)
    }
  }
  setTwo() 
  setTwo() 
})()
function hasEmptyTile() {
    for(let i = 0; i < rows; i++) {
        for(let j = 0; j < columns; j++) {
            if(Board[i][j] == 0) {
                return true
            }
        }
    }
    return false
}
function setTwo() {
    if(!hasEmptyTile()){
        return
    }
    let found = false
    while(!found) {
        let r = Math.floor(Math.random() * rows)
        let c = Math.floor(Math.random() * columns)
        if(Board[r][c] == 0) {
            Board[r][c] = 2
            let tile = document.getElementById(r.toString() + "-" + c.toString())
            tile.innerText = "2"
            tile.classList.add("x2")
            found = true
        }
    }
}
function updateTile(tile, num) {
    tile.innerText = ""
    tile.classList.value = ""
    tile.classList.add("tile")
  if(num > 0) {
    tile.innerText = num
    if(num <= 4096) {
        tile.classList.add("x" + num.toString())
    }else {
        tile.classList.add("x8192")
    }
  }
}

document.addEventListener("keyup", (e) => {
    if(e.code === "ArrowLeft") {
        slideLeft()
        setTwo() 
    }else if(e.code === "ArrowRight") {
        slideRight()
        setTwo() 
    }else if(e.code === "ArrowUp") {
        slideUp()
        setTwo() 
    }else if(e.code === "ArrowDown") {
        slideDown()
        setTwo() 
    }
})
function filterZero(row) {
    return row.filter(num => num != 0)
}
function slide(row) {
    row = filterZero(row) 
    for(let i = 0; i < row.length; i++) {
        if(row[i] == row[i + 1]) {
            row[i] *= 2
            row[i + 1] = 0
        }
    }
    row = filterZero(row) 
    while(row.length < columns) {
        row.push(0)
    }

    return row
}
function slideLeft() {
    for(let i = 0; i < rows; i++) {
        let row = Board[i]
        row = slide(row)
        Board[i] = row
        for(let j = 0; j < columns; j++) {
            let tile = document.getElementById(i.toString() + "-" + j.toString())
            let num = Board[i][j]
            updateTile(tile, num)
        }
    }
}
function slideRight() {
    for(let i = 0; i < rows; i++) {
        let row = Board[i]
        row.reverse()
        row = slide(row)
        row.reverse()
        Board[i] = row
        for(let j = 0; j < columns; j++) {
            let tile = document.getElementById(i.toString() + "-" + j.toString())
            let num = Board[i][j]
            updateTile(tile, num)
        }
    }
}
function slideUp() {
    for(let j = 0; j < columns; j++) {
        let row = [Board[0][j], Board[1][j], Board[2][j], Board[3][j]]
        row = slide(row)
        for(let i = 0; i < rows; i++) {
            Board[i][j] = row[i]
            let tile = document.getElementById(i.toString() + "-" + j.toString())
            let num = Board[i][j]
            updateTile(tile, num)
        }
    }
}
function slideDown() {
    for(let j = 0; j < columns; j++) {
        let row = [Board[0][j], Board[1][j], Board[2][j], Board[3][j]]
        row.reverse()
        row = slide(row)
        row.reverse()
        for(let i = 0; i < rows; i++) {
            Board[i][j] = row[i]
            let tile = document.getElementById(i.toString() + "-" + j.toString())
            let num = Board[i][j]
            updateTile(tile, num)
        }
    }
}