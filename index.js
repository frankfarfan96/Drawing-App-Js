const $canvas = document.querySelector("canvas"),
  $ctx = $canvas.getContext("2d");

let isDrawing = false;

window.addEventListener("load", () => {
  $canvas.width = $canvas.offsetWidth;
  $canvas.height = $canvas.offsetHeight;
});

const startDraw = () => {
  isDrawing = true;
  $ctx.beginPath(); //cut the path
};

const drawing = (e) => {
  if (!isDrawing) return; //if isDrawing is false return from here
  $ctx.lineTo(e.offsetX, e.offsetY); //creating line according to the mouse pointer
  $ctx.stroke(); // drawing/filing line with color
};

$canvas.addEventListener("mousedown", startDraw);
$canvas.addEventListener("mousemove", drawing);
$canvas.addEventListener("mouseup", () => (isDrawing = false));
