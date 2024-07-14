//crating constants for the cube
const COLOUR_BG = "black";
const COLOUR_CUBE = "yellow";
const SPEED_x = 0.05; //rps
const SPEED_y = 0.05; //rps
const SPEED_z = 0.05; //rps
const POINT3D = function(x, y, z) {this.x = x; this.y = y; this.z = z;}

//setting the canvas and context
var canvas = document.createElement("canvas");
document.body.appendChild(canvas);
var ctx = canvas.getContext("2d");

//dimentions
var h = document.documentElement.clientHeight;
var w = document.documentElement.clientWidth;
canvas.height = h;
canvas.width = w;

//colours and lines
ctx.fillStyle = COLOUR_BG;
ctx.strokeStyle = COLOUR_CUBE;
ctx.lineWidth = w/100;
ctx.lineCap = "round";

//cube parameters
var cx = w / 2;
var cy = h / 2;
var cz = 0;
var size = h / 4;
var vertices
 = [
    new POINT3D(cx - size, cy - size, cz - size),
    new POINT3D(cx + size, cy - size, cz - size),
    new POINT3D(cx + size, cy + size, cz - size),
    new POINT3D(cx - size, cy + size, cz - size),
    new POINT3D(cx - size, cy - size, cz + size),
    new POINT3D(cx + size, cy - size, cz + size),
    new POINT3D(cx + size, cy + size, cz + size),
    new POINT3D(cx - size, cy + size, cz + size)
];

var edges = [
    [0, 1], [1, 2], [2, 3], [3, 0], //backface
    [4, 5], [5, 6], [6, 7], [7, 4], //front face
    [0, 4], [1, 5], [2, 6], [3, 7] //connecting faces
]; 

//seting the loop animation
var timedelta, timeLast = 0;
requestAnimationFrame(loop);

function loop(timeNow){
    //ca;culate the time diffrence
    timedelta = timeNow - timeLast;
    timeLast = timeNow;

    //backround
    ctx.fillRect(0, 0, w, h);

    //rotate the cube along the z-axis
    let angle = timedelta * 0.001 * SPEED_z * Math.PI * 2;
    //calculating positions of vertisies
    for (let v of vertices) {
        let dx = v.x -cx;
        let dy = v.y -cy;
        let x = dx * Math.cos(angle) - dy * Math.sin(angle);
        let y = dx * Math.sin(angle) + dy * Math.cos(angle);
        v.x = x + cx;
        v.y = y + cy;
    }
    
    //rotating the cube along the x-axis
    angle = timedelta * 0.001 * SPEED_x * Math.PI * 2;
    for (let v of vertices) {
        let dy = v.x -cx;
        let dz = v.z -cz;
        let y = dy * Math.cos(angle) - dz * Math.sin(angle)
        let z = dy * Math.sin(angle) + dz * Math.cos(angle)
        v.x = y + cx;
        v.z = z + cz;
    }

    //rotaing the cube along the y-axis
    angle = timedelta * 0.001 * SPEED_y * Math.PI * 2;
    for (let v of vertices) {
        let dx = v.y -cy;
        let dz = v.z -cz;
        let x = dx * Math.cos(angle) - dz * Math.sin(angle)
        let z = dx * Math.sin(angle) + dz * Math.cos(angle)
        v.y = x + cy;
        v.z = z + cz;
    }

    //draw each edge
    for(let edge of edges) {
        ctx.beginPath();
        ctx.moveTo(vertices[edge[0]].x, vertices[edge[0]].y);
        ctx.lineTo(vertices[edge[1]].x, vertices[edge[1]].y);
        ctx.stroke();
    }

    //call the next frame
    requestAnimationFrame(loop);
}