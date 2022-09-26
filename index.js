const $canvas = document.querySelector("canvas"),
  $toolBtns = document.querySelectorAll(".tool"),
  $fillColor = document.querySelector("#fill-color"),
  $ctx = $canvas.getContext("2d");

// global variables with default value
let prevMouseX,
  prevMouseY,
  snapshot,
  isDrawing = false,
  selectedTool = "brush",
  brushWidth = 5;

window.addEventListener("load", () => {
  $canvas.width = $canvas.offsetWidth;
  $canvas.height = $canvas.offsetHeight;
});

const drawRect = (e) => {
  if (!$fillColor.checked) {
    return $ctx.strokeRect(
      e.offsetX,
      e.offsetY,
      prevMouseX - e.offsetX,
      prevMouseY - e.offsetY
    );
  }
  $ctx.fillRect(
    e.offsetX,
    e.offsetY,
    prevMouseX - e.offsetX,
    prevMouseY - e.offsetY
  );
};

const startDraw = (e) => {
  isDrawing = true;
  prevMouseX = e.offsetX; // passing current mouseX postion as prevMouseX value
  prevMouseY = e.offsetY; // passing current mouseY postion as prevMouseY value
  $ctx.beginPath(); //cut the path
  $ctx.lineWidth = brushWidth; //passing brushSize as line width
  // copying canvas data and passing as snapshot value.. this avoids dragging the image
  snapshot = $ctx.getImageData(0, 0, $canvas.width, $canvas.height);
};

const drawing = (e) => {
  if (!isDrawing) return; //if isDrawing is false return from here
  $ctx.putImageData(snapshot, 0, 0); // adding copied canvas data on to this canvas

  if (selectedTool === "brush") {
    $ctx.lineTo(e.offsetX, e.offsetY); //creating line according to the mouse pointer
    $ctx.stroke(); // drawing/filing line with color
  } else if (selectedTool === "rectangle") {
    drawRect(e);
  }
};

$toolBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    // adding click event to all tool option
    // removing active class from the previous option and adding on current clicked option
    document.querySelector(".options .active").classList.remove("active");
    btn.classList.add("active");
    selectedTool = btn.id;
    console.log(selectedTool);
  });
});

$canvas.addEventListener("mousedown", startDraw);
$canvas.addEventListener("mousemove", drawing);
$canvas.addEventListener("mouseup", () => (isDrawing = false));
