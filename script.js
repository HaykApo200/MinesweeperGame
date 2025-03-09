addEventListener('DOMContentLoaded', () => {

const canvasElem = document.querySelector("canvas");
const ctx = canvasElem.getContext("2d");

const width = 10;
const bomb = 10;

const bombAnimationOpenSecond = 50;
const loseTime = 1000 * (width / 10);

const side = canvasElem.width / width;
let matrix = [];

const flagMatrix = flagsMatrix()
let matrixOpen = flagsMatrix();
let opens = 0;

const imgBomb = document.createElement('img')
imgBomb.src = 'image/bomb.png' 

const imgCube = new Image();
imgCube.src = 'image/cube.png';

const imgFlag = new Image();
imgFlag.src = 'image/flag.png';

const imgNum1 = new Image();
imgNum1.src = 'image/number_1.svg.png';

const imgNum2 = new Image();
imgNum2.src = 'image/number_2.svg.png';

const imgNum3 = new Image();
imgNum3.src = 'image/number_3.png';

const imgNum4 = new Image();
imgNum4.src = 'image/number_4.png';

const imgNum5 = new Image();
imgNum5.src = 'image/number_5.png';

const imgNum6 = new Image();
imgNum6.src = 'image/number_6.png';

const imgNum7 = new Image();
imgNum7.src = 'image/number_7.png';

const imgNum8 = new Image();
imgNum8.src = 'image/number_8.png';

canvasElem.oncontextmenu = e => {
    e.preventDefault();
    e.stopPropagation();
}
function flagsMatrix(){  
    let flagMatrix = [];
    for(let i = 0; i < width; i++){
        flagMatrix[i] = [];
        for(let j = 0; j < width; j++){
            flagMatrix[i][j] = 0;
        }
    }
    return flagMatrix
}
function createBoard(){
    imgCube.onload = function() {
        for (let i = 0; i < width; i++) {
            for (let j = 0; j < width; j++) {
                ctx.drawImage(imgCube, side * i, side * j, side, side);
            }
        }
    };
}
createBoard();

function createMatrix(){
    for(let i = 0; i < width; i++){
        matrix[i] = [];
        for(let j = 0; j < width; j++){
            matrix[i][j] = 0;
        }
    } 
}
createMatrix();

function fillBomb(){
    let bombs = bomb;
    while(bombs > 0){
        let x = Math.floor(Math.random() * width);
        let y = Math.floor(Math.random() * width); 
        if(matrix[y][x] !== "Bomb"){
            matrix[y][x] = "Bomb";
            bombs -= 1;
        }
    }
}
fillBomb();

function bombsCount(arr,x,y){
    let bomb = 0;

    if(((y-1) >= 0) && ((x - 1) >= 0)){
        if(arr[y-1][x-1] === "Bomb"){
            bomb += 1;
        }
    }

    if((y-1) >= 0){
        if(arr[y-1][x] === "Bomb"){
            bomb += 1;
        }
    }

    if(((y-1) >= 0) && ((x + 1) <= 9)){
        if(arr[y-1][x+1] === "Bomb"){
            bomb += 1;
        }
    }

    if((x - 1) >= 0){
        if(arr[y][x-1] === "Bomb"){
            bomb += 1;
        }
    }

    if((x + 1) <= 9){
        if(arr[y][x+1] === "Bomb"){
            bomb += 1;
        }
    }

    if(((y+1) <= 9) && ((x - 1) >= 0)){
        if(arr[y+1][x-1] === "Bomb"){
            bomb += 1;
        }
    }

    if(((y+1) <= 9)){
        if(arr[y+1][x] === "Bomb"){
            bomb += 1;
        }
    }

    if(((y + 1) <= 9) && ((x + 1) <= 9)){
        if(arr[y+1][x+1] === "Bomb"){
            bomb += 1;
        }
    }

    if(bomb !== 0){
        matrix[y][x] = bomb;
    }
}

function fillNumberMatrix(){
    for(let i = 0; i < width;i++){
        for(let j = 0; j < width;j++){
            if(matrix[i][j] !== "Bomb"){
                bombsCount(matrix,j,i)
            }
        }
    }     
}
fillNumberMatrix();

function getMousePosition(canvas, event) {
    let rect = canvas.getBoundingClientRect();
    let x_cordinate = event.clientX - rect.left;
    let y_cordinate = event.clientY - rect.top;
    let x = ((Math.ceil(x_cordinate/side)) - 1);
    let y = ((Math.ceil(y_cordinate/side)) - 1); 
    let arr = [x,y];
    return arr
} 

function putFlag(arr){
    ctx.drawImage(imgFlag, side * arr[0], side * arr[1], side, side);
    flagMatrix[arr[1]][arr[0]] = "Flag"
}

function paintBombInMatrix(arr){
    if(matrix[arr[1]][arr[0]] === "Bomb"){
        loop(0);
        function loop(i){
            matrix[i].forEach( (val,j) => {
                if(val === "Bomb"){
                    ctx.drawImage(imgCube,j * side,i * side,side,side)
                    ctx.drawImage(imgBomb,arr[0] * side,arr[1] * side,side,side);
                    ctx.drawImage(imgBomb,j * side,i * side,side,side); 
                }
                if(j == (width - 1) && ((i + 1) < width)){
                    setTimeout( () => {
                        return loop(i + 1);
                    },bombAnimationOpenSecond);
                }
            })
        }
    }
    if(matrix[arr[1]][arr[0]] === "Bomb"){
        setTimeout( () => {
            alert("You lose play again");
            for (let i = 0; i < width; i++) {
                for (let j = 0; j < width; j++) {
                    ctx.drawImage(imgCube, side * i, side * j, side, side);
                }
            }
            createMatrix();
            fillBomb();
            fillNumberMatrix()
            matrixOpen = flagsMatrix();
            opens = 0;
        },loseTime)
    }
}

function drawNumbers(num,arr){  
    let x = arr[0] * side; 
    let y = arr[1] * side; 
    switch (num) {
        case 1:
            ctx.drawImage(imgNum1, x, y, side, side);
            matrixOpen[arr[1]][arr[0]] = "Open";
            opens += 1;
            break;
        case 2:
            ctx.drawImage(imgNum2, x, y, side, side);
            matrixOpen[arr[1]][arr[0]] = "Open";
            opens += 1;
            break;
        case 3:
            ctx.drawImage(imgNum3, x, y, side, side);
            matrixOpen[arr[1]][arr[0]] = "Open";
            opens += 1;
            break;
        case 4:
            ctx.drawImage(imgNum4, x, y, side, side);
            matrixOpen[arr[1]][arr[0]] = "Open";
            opens += 1;
            break;
        case 5:
            ctx.drawImage(imgNum5, x, y, side, side);
            matrixOpen[arr[1]][arr[0]] = "Open";
            opens += 1;
            break;
        case 6:
            ctx.drawImage(imgNum6, x, y, side, side);
            matrixOpen[arr[1]][arr[0]] = "Open";
            opens += 1;
            break;
        case 7:
            ctx.drawImage(imgNum7, x, y, side, side);
            matrixOpen[arr[1]][arr[0]] = "Open"
            break;
        case 8:
            ctx.drawImage(imgNum8, x, y, side, side);
            matrixOpen[arr[1]][arr[0]] = "Open";
            opens += 1;
            break;
        case 0:
            let color = "#bbbbbb"
            ctx.fillStyle = color
            ctx.fillRect(x, y, side, side);
            matrixOpen[arr[1]][arr[0]] = "Open";
            opens += 1;
            ctx.fillStyle = "#747474";
            ctx.strokeRect(x, y, side, side);

            break;
        default:
            break;
    }
}
function multiplication(arr){
    
    let x = arr[0];
    let y = arr[1];
    let array1 = [];
    //console.log(array1);

    if((x + 1) < width){
        if((matrix[y][x + 1] !== "Bomb") && (matrixOpen[y][x + 1] !== "Open")){
            let arr1 = [(x + 1),y];
            drawNumbers(matrix[y][x + 1],arr1);
            if(matrix[y][x + 1] === 0){
                array1.push(arr1);
            }
        }
    }

    if((x - 1) >= 0){
        if((matrix[y][x - 1] !== "Bomb" ) && (matrixOpen[y][x - 1] !== "Open")){
            let arr1 = [(x - 1),y];
            drawNumbers(matrix[y][x - 1],arr1);
            if(matrix[y][x - 1] === 0){
                array1.push(arr1);
            }
        }
    }

    if(((y + 1) < width) && ((x + 1) < width)){
        if((matrix[y + 1][x + 1] !== "Bomb") && (matrixOpen[y + 1][x + 1] !== "Open")){
            let arr1 = [(x + 1),(y + 1)];
            drawNumbers(matrix[y + 1][x + 1],arr1);
            if(matrix[y + 1][x + 1] === 0){
                array1.push(arr1);
            }
        }
    }

    if((y + 1) < width){
        if((matrix[y + 1][x] !== "Bomb") && (matrixOpen[y + 1][x] !== "Open")){
            let arr1 = [x,(y + 1)];
            drawNumbers(matrix[y + 1][x],arr1);
            if(matrix[y + 1][x] === 0){
                array1.push(arr1);
            }
        }
    }

    if(((y + 1) < width) && ((x - 1) >= 0)){
        if((matrix[y + 1][x - 1] !== "Bomb") && (matrixOpen[y + 1][x - 1] !== "Open")){
            let arr1 = [(x - 1),(y + 1)];
            drawNumbers(matrix[y + 1][x - 1],arr1);
            if(matrix[y + 1][x - 1] === 0){
                array1.push(arr1);
            }
        }
    }

    if(((y - 1) >= 0) && ((x + 1) < width)){
        if((matrix[y - 1][x + 1] !== "Bomb") && (matrixOpen[y - 1][x + 1] !== "Open")){
            let arr1 = [(x + 1),(y - 1)];
            drawNumbers(matrix[y - 1][x + 1],arr1);
            if(matrix[y - 1][x + 1] === 0){
                array1.push(arr1);
            }
        }
    }

    if((y - 1) >= 0){
        if((matrix[y - 1][x] !== "Bomb") && (matrixOpen[y - 1][x] !== "Open")){
            let arr1 = [x,(y - 1)];
            drawNumbers(matrix[y - 1][x],arr1);
            if(matrix[y - 1][x] === 0){
                array1.push(arr1);
            }
        }
    }

    if(((y - 1) >= 0) && ((x - 1) >= 0)){
        if((matrix[y - 1][x - 1] !== "Bomb")&& (matrixOpen[y - 1][x - 1] !== "Open")){
            let arr1 = [(x - 1),(y - 1)];
            drawNumbers(matrix[y - 1][x - 1],arr1);
            if(matrix[y - 1][x - 1] === 0){
                array1.push(arr1);
            }
        }
    }

    if(array1.length >= 1){
        array1.forEach((val) => {
            multiplication(val);
        })
    }
}

function paintNumbersInMatrix(arr){
    if(matrix[arr[1]][arr[0]] !== "Bomb"){
        drawNumbers(matrix[arr[1]][arr[0]],arr);
        if(matrix[arr[1]][arr[0]] === 0){
            multiplication(arr);
        }
    }
}


console.log(matrix);
canvasElem.addEventListener("mousedown",(e) => {
    let arr = getMousePosition(canvasElem, e);
    
    if(e.button == 0){
        paintBombInMatrix(arr);
        paintNumbersInMatrix(arr);
       
    }
    // console.log(matrix);
    // console.log(matrixOpen);
    // console.log(opens);
    setTimeout(() => {
        if(opens === (width * width - bomb)){
            alert("You Win");
            for (let i = 0; i < width; i++) {
                for (let j = 0; j < width; j++) {
                    ctx.drawImage(imgCube, side * i, side * j, side, side);
                }
            }
            createMatrix();
            fillBomb();
            fillNumberMatrix()
            matrixOpen = flagsMatrix();
            opens = 0;
        }
    },100)
   

    
    if((e.button !== 0) && ( flagMatrix[arr[1]][arr[0]] !== "Flag") && (matrixOpen[arr[1]][arr[0]] !== "Open")){
        putFlag(arr);
    }else if((e.button !== 0) && (matrixOpen[arr[1]][arr[0]] !== "Open")){
        flagMatrix[arr[1]][arr[0]] = 0;
        ctx.drawImage(imgCube, side * arr[0], side * arr[1], side, side);
    }
});

})