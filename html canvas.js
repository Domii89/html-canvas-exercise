const canvas = document.querySelector('#draw');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx.strokeStyle = '#BADA55';
ctx.lineJoin = 'round'; // it determines the shape used to join two line segments where they meet. There are three possible values for this property: "round", "bevel", and "miter". The default is "miter".
ctx.lineCap = 'round'; // it determines the shape used to draw the end points of lines. Options: "butt", "round", "square".
ctx.lineWidth = 30;

let isDrawing = false; // it's set to 'false', but when we click down on canvas, it will be 'true'. When we go off the button (we click up) - it's 'false' again. Making a difference between moving a mouse over the canvas and actually clicking on it.

let lastX = 0; // an ending of a line on X axis
let lastY = 0; // an ending of a line on Y axis
let hue = 0;
let direction = true; // it will be building up

function draw(event){
    if(!isDrawing) return; // stop the function from running when they are not moused down
    console.log(event);
    ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`; // 100% saturation, 50% lightness
    ctx.beginPath(); //start from
    ctx.moveTo(lastX, lastY); // go to
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
    lastX = event.offsetX; 
    lastY = event.offsetY; 
    //shorter version: [lastX, lastY] = [e.offsetX, e.offsetY]
    hue++; // it will increment the hue
    if(hue >= 360){
        hue = 0;
    }
    if(ctx.lineWidth >= 100 || ctx.lineWidth <= 1){
        direction = !direction; //flipping the direction
    }
    if(direction){
        ctx.lineWidth++;
    }else{
        ctx.lineWidth--;
    }
}

canvas.addEventListener('mousedown', (event) => {
    isDrawing = true;
    lastX = event.offsetX; // updating lastX and lastY
    lastY = event.offsetY; 
});
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);