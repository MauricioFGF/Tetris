document.addEventListener("DOMContentLoaded",() => {
    const buttonLeft= document.querySelector('#btn-left')
    const buttonRight= document.querySelector('#btn-right')
    const buttonDown= document.querySelector('#btn-down')
    const buttonUp= document.querySelector('#btn-up')
    const buttonLeft2= document.querySelector('#btn-left-2')
    const buttonRight2= document.querySelector('#btn-right-2')
    const buttonDown2= document.querySelector('#btn-down-2')
    const buttonUp2= document.querySelector('#btn-up-2')
    const grid = document.querySelector(".grid")
    let squares = Array.from (document.querySelectorAll(".grid div"))
    const scoreDisplay = document.querySelector("#score")
    const startBtn = document.querySelector("#start-button")
    const resetBtn = document.querySelector("#reset-button")
    const width = 10
    let acabou = false
    let nextRandom = 0
    let timerId
    let score = 0
    const colors = [
        "#a7b7ec",
        "#77dd77",
        "#e34234",
        "#ffe140",
        "#d387d3"
    ]
   

    //The Tetrominoes
    const lTetromino = [
        [1, width+1, width*2+1, 2],
        [width, width+1, width+2, width*2+2],
        [1, width+1, width*2+1, width*2],
        [width, width*2, width*2+1, width*2+2]
    ]

    const zTetromino = [
        [0,width,width+1,width*2+1],
        [width+1, width+2,width*2,width*2+1],
        [0,width,width+1,width*2+1],
        [width+1, width+2,width*2,width*2+1]
    ]
    
    const tTetromino = [
        [1,width,width+1,width+2],
        [1,width+1,width+2,width*2+1],
        [width,width+1,width+2,width*2+1],
        [1,width,width+1,width*2+1]
    ]
    
    const oTetromino = [
        [0,1,width,width+1],
        [0,1,width,width+1],
        [0,1,width,width+1],
        [0,1,width,width+1]
    ]
    
    const iTetromino = [
        [1,width+1,width*2+1,width*3+1],
        [width,width+1,width+2,width+3],
        [1,width+1,width*2+1,width*3+1],
        [width,width+1,width+2,width+3]
    ]

    const theTetrominoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino]
    
    let currentPosition = 4
    let currentRotation = 0
    console.log(theTetrominoes[0][0])  

    //randomly select a Tetromino and its first rotation
    let random = Math.floor(Math.random()* theTetrominoes.length)
    let current = theTetrominoes[random][currentRotation]
        
    //draw the Tetromino
    function draw(){
        current.forEach(index => {
            squares[currentPosition + index]. classList.add("tetromino")
            squares[currentPosition + index].style.backgroundColor = colors[random]
      
        })

    }

    //undraw the Tetromino
    function undraw() {
        current.forEach(index =>{
            squares[currentPosition + index].classList.remove("tetromino")
            squares[currentPosition + index].style.backgroundColor = ""
           
        })
    }
    


    //assign functions to keyCodes
    function control(e) {
        if(e.keyCode === 37 && timerId && acabou === false) {
            moveLeft()
        } else if (e.keyCode === 38 && timerId && acabou === false){
          rotate()
        } else if (e.keyCode === 39 && timerId && acabou === false) {
          moveRight()  
        } else if (e.keyCode === 40 && timerId && acabou === false) {
          moveDown()  
        } 
    }
    document.addEventListener("keydown", control)


    
    //move down function
    function moveDown(){
        undraw()
        currentPosition += width
        draw()
        freeze()
    }

    function tetrominoGenerator() {
        random = nextRandom
        nextRandom = Math.floor(Math.random() * theTetrominoes.length)
        current = theTetrominoes[random][currentRotation]
        currentPosition = 4
        draw()
        displayShape()
        addScore()
        gameOver()
    }

    //freeze function
    function freeze(){
        if(current.some(index => squares[currentPosition + index + width].classList.contains("taken"))) {
        current.forEach(index => squares[currentPosition + index ].classList.add('taken'))
        //start a new tetromino falling
        tetrominoGenerator()
        }
    }

    //move the tetromino left, unless is at the edge or there is blockage
    function moveLeft() {
        undraw()
        const isAtLeftEdge = current.some(index => (currentPosition + index)% width ===0)
        if(!isAtLeftEdge) currentPosition -=1
        if(current.some( index => squares[currentPosition + index].classList.contains("taken"))){
            currentPosition +=1
        }
        draw()
    }


    //move the tetromino right, unless is at the edge or there is a blockage
    function moveRight() {
        undraw()
        const isAtRightEdge = current.some(index => (currentPosition + index) % width === width -1)
        if(!isAtRightEdge) currentPosition +=1
        if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
          currentPosition -=1
        }
        draw()
      }   


    // rotate the tetromino
    function rotate() {
        undraw()
        currentRotation ++
        if(currentRotation === current.length) { // if the current rotation gets to 4, make it go back to 0
            currentRotation = 0    
        }
        current = theTetrominoes[random][currentRotation]
        draw()
    } 



    //show up-next tetromino in min-grid
    const displaySquares = document.querySelectorAll(".mini-grid div")
    const displayWidth = 4
    const displayIndex = 0

    // the Tetrominos without rotations
    const upNextTetrominoes = [
        [1, displayWidth+1, displayWidth*2+1, 2], //lTetromino
        [0, displayWidth, displayWidth+1, displayWidth*2+1], //zTetromino
        [1, displayWidth, displayWidth+1, displayWidth+2], //tTetromino
        [0, 1, displayWidth, displayWidth+1], //oTetromino
        [1, displayWidth+1, displayWidth*2+1, displayWidth*3+1] //iTetromino
    ]


    //display  the shape i the mini-grid display
    function displayShape() {
        //remove any trace of a tetromino form the entire grid
        displaySquares.forEach(square => {
            square.classList.remove('tetromino')
            square.style.backgroundColor = ''
 
        })
        upNextTetrominoes[nextRandom].forEach( index => {
            displaySquares[displayIndex + index].classList.add('tetromino')
            displaySquares[displayIndex + index].style.backgroundColor = colors[nextRandom]
            
            
        })
    }

    function playAndPause() {

        if (timerId) {
            clearInterval(timerId)
            timerId = null
        } else {
            draw()
            timerId = setInterval(moveDown, 500)
            displayShape()
        }
    }
    
    // add functionality to the button
    startBtn.addEventListener("click", () => {
        playAndPause()
    })



    function restartGame() {
        playAndPause()
        squares.forEach((square, i) => {
            square.classList.remove('tetromino');
            squares[i].style.backgroundColor = ''

            if (i < squares.length - width) {
                square.classList.remove('taken');
            }
        })
        tetrominoGenerator()
        timerId = setInterval(moveDown, 500)
    }

    // add functionality to the button restart
    resetBtn.addEventListener("click", () => {
        if (timerId) restartGame();
    })


    // add score
    function addScore() {
        for (let i = 0; i < 199; i += width) {
            const row = [i, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8, i+9]

            if (row.every( index  => squares[index].classList.contains("taken"))) {
                score +=10
                scoreDisplay.innerHTML = score
                row.forEach(index => {
                    squares[index].classList.remove("taken")
                    squares[index].classList.remove("tetromino")
                    squares[index].style.backgroundColor = ""
 
                })
                const squaresRemoved = squares.splice(i,width)
                squares = squaresRemoved.concat(squares)
                squares.forEach(cell => grid.appendChild(cell))
            }
        }
    }


    // game over
    function gameOver() {
        if(current.some( index => squares[currentPosition + index].classList.contains("taken"))) {
            scoreDisplay.innerHTML = "Final: " + score 
            clearInterval(timerId)
            acabou = true
           
        }
    }




    buttonUp.addEventListener("click", () => {
    if (timerId) rotate();
    })

    buttonLeft.addEventListener("click", () => {
    if (timerId) moveLeft();

    })

    buttonRight.addEventListener("click", () => {
    if (timerId) moveRight();
    })

    buttonDown.addEventListener("click", () => {
    if (timerId) moveDown();
    })


    
    buttonUp2.addEventListener("click", () => {
    if (timerId) rotate();
    })

    buttonLeft2.addEventListener("click", () => {
    if (timerId) moveLeft();

    })

    buttonRight2.addEventListener("click", () => {
    if (timerId) moveRight();
    })

    buttonDown2.addEventListener("click", () => {
    if (timerId) moveDown();
    })














})

