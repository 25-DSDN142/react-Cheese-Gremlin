// ----=  HANDS  =----
// USING THE GESTURE DETECTORS (check their values in the debug menu)
// detectHandGesture(hand) returns "Pinch", "Peace", "Thumbs Up", "Pointing", "Open Palm", or "Fist"

/* load images here */
function prepareInteraction() {
  paintBrushImage = loadImage ('PaintBrush.png');
  colourMapImage = loadImage ('ColourMap.jpg');
  //bgImage = loadImage('/images/background.png');

}

let wallpaper = (true);
  let backgroundColour = [289, 41, 98, 0.5];
let colourMapImageHeight = (600);
let colourMapImageWidth = (400);
let drawingPageWidth = (600);
let drawingPageHeight = (600);
let px = 0;
let py = 0;
let colors = [];
let Yvalue = 0


function drawInteraction(faces, hands) {
  push ();
  colorMode (HSB);

  let selectedColourHeightMap = map(Yvalue, 110, 660, 0, height);
  let selectedColourMap = map (selectedColourHeightMap, 110, 660, 0, 360);
  let selectedColour = [selectedColourMap, 100, 100];
  //background
  if (wallpaper){
  push();
  
  stroke (0, 0, 0);
  strokeWeight (5);
  fill (backgroundColour);
  rect (0, 0, CaptureWidth, CaptureHeight); //pink rectangle background

  fill (0, 0, 100, 0.5); //white
  rect ((CaptureWidth-((CaptureHeight-drawingPageHeight)/2)-drawingPageWidth), ((CaptureHeight-drawingPageHeight)/2), drawingPageWidth, drawingPageHeight); //drawingPage
  
  image (colourMapImage, (((CaptureWidth-((CaptureHeight-drawingPageHeight)/2)-drawingPageWidth)-colourMapImageWidth)/2), ((CaptureHeight-colourMapImageHeight)/2)); //colourMap image (size:400x600)
  noFill ();
  rect ((((CaptureWidth-((CaptureHeight-drawingPageHeight)/2)-drawingPageWidth)-colourMapImageWidth)/2), ((CaptureHeight-colourMapImageHeight)/2), colourMapImageWidth, colourMapImageHeight);

  pop ();
  }

  //shows selected colour
  push ();
  translate (110, 20);
  fill(selectedColour);
  stroke (0, 0, 0);
  strokeWeight (3);
  rect (100, 60, 50, 50) // shows current colour

  fill (0, 0, 0);
  strokeWeight (0);
  rotate (180);
  text ('Curent Colour', 100, 100);

  pop ();


  // hands part-------------------------------------------------------------------------------------------------------------------------
  // for loop to capture if there is more than one hand on the screen. This applies the same process to all hands.
  for (let i = 0; i < hands.length; i++) {
    let hand = hands[i];
    // console.log(hand);
    if (showKeypoints) { //toggled by K
      drawConnections(hand)
    }
    /*
    Start drawing on the hands here
    */
    if (hand.handedness === "Left") {
      Yvalue = hand.index_finger_tip.y; // this will stay as zer untill the program sees a left hand 
      fill (selectedColour);
      ellipse (hand.index_finger_tip.x, hand.index_finger_tip.y, 10, 10);
    }


    if (hand.handedness === "Right") { // draw when pinching right hand 
      let indexFingerTipX = hand.index_finger_tip.x;
      let indexFingerTipY = hand.index_finger_tip.y;
      let thumbTipX = hand.thumb_tip.x;
      let thumbTipY = hand.thumb_tip.y;

      let x = (indexFingerTipX + thumbTipX) * 0.5; // find half way between the index and thumn
      let y = (indexFingerTipY + thumbTipY) * 0.5;

      let d = dist(indexFingerTipX, indexFingerTipY, thumbTipX, thumbTipY);

      fill(selectedColour)
      ellipse(x, y, 50)

      if (d < 50) {
        painting.stroke(selectedColour);
        painting.strokeWeight(16);
        painting.line(px, py, x, y);
      
      }


      paintBrush.clear();
      paintBrush.image(paintBrushImage, x -50, y -25);



      px = x;
      py = y;

      //pain brush
      push ();
      image (paintBrushImage, x -50, y -25);
      pop ();


    }
    /*
    Stop drawing on the hands here
    */
   
  }
  // You can make addtional elements here, but keep the hand drawing inside the for loop. 
  //------------------------------------------------------


pop ();
}

function drawConnections(hand) {
  // Draw the skeletal connections (red lines when toggling K)
  push()
  for (let j = 0; j < connections.length; j++) {
    let pointAIndex = connections[j][0];
    let pointBIndex = connections[j][1];
    let pointA = hand.keypoints[pointAIndex];
    let pointB = hand.keypoints[pointBIndex];
    stroke(255, 0, 0);
    strokeWeight(2);
    line(pointA.x, pointA.y, pointB.x, pointB.y);
  }
  pop()
}

// This function draw's a dot on all the keypoints. It can be passed a whole face, or part of one. 
function drawPoints(feature) {
  push()
  for (let i = 0; i < feature.keypoints.length; i++) {
    let element = feature.keypoints[i];
    noStroke();
    fill(0, 255, 0);
    circle(element.x, element.y, 10);
  }
  pop()

}