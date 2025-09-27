// ----=  HANDS  =----
let halo;
let rightHorn;
let leftHorn;

let angel = true;


let Luigi = (true);
  let skinColour = [255, 198, 157];
  let mustacheColour = [99, 59, 7];

function prepareInteraction() {
  marioImage = loadImage('mario.jpg');
}

function drawInteraction(faces, hands) {

  // hands part
  // USING THE GESTURE DETECTORS (check their values in the debug menu)
  // detectHandGesture(hand) returns "Pinch", "Peace", "Thumbs Up", "Pointing", "Open Palm", or "Fist"

  // for loop to capture if there is more than one hand on the screen. This applies the same process to all hands.
  for (let i = 0; i < hands.length; i++) {
    let hand = hands[i];
    if (showKeypoints) {
      drawPoints(hand)
      drawConnections(hand)
    }
    // console.log(hand);
    /*
    Start drawing on the hands here
    */

    let whatGesture = detectHandGesture(hand)
    if (whatGesture == "Thumbs Up") {
      Luigi = true;
    }
    if (whatGesture == "Open Palm") {
      angel = false;
    }

    /*
    Stop drawing on the hands here
    */
  }

  //------------------------------------------------------------
  //facePart
  // for loop to capture if there is more than one face on the screen. This applies the same process to all faces. 
  for (let i = 0; i < faces.length; i++) {
    let face = faces[i]; // face holds all the keypoints of the face
    
    if (showKeypoints) {
      drawPoints(face)
    }
    // console.log(face);
    /*
    Once this program has a face, it knows some things about it.
    This includes how to draw a box around the face, and an oval. 
    It also knows where the key points of the following parts are:
     face.leftEye
     face.leftEyebrow
     face.lips
     face.rightEye
     face.rightEyebrow
    */
    /*
    Start drawing on the face here
    */

    let faceWidth = face.faceOval.width;
    let faceheight = face.faceOval.height;
    let faceCenterX = face.faceOval.centerX;
    let faceCenterY = face.faceOval.centerY;


    let mustacheCentreX = ((face.keypoints[4].x));
    let mustacheCentreY = ((face.keypoints[4].y)+20);
    let mustacheRightEndX = (face.keypoints[352].x);
    let mustacheRightEndY = ((face.keypoints[352].y));
    let mustacheLeftEndX = (face.keypoints[123].x);
    let mustacheLeftEndY = ((face.keypoints[123].y));

    if (Luigi) {
    // mustache
      stroke (0, 0, 0);
      strokeWeight (5);
      fill (mustacheColour);
      beginShape ();
      vertex (mustacheCentreX, mustacheCentreY);
      quadraticVertex ((mustacheCentreX+mustacheRightEndX)/2, mustacheCentreY+20, mustacheRightEndX, mustacheRightEndY);
      quadraticVertex ((mustacheCentreX+mustacheRightEndX)/2, mustacheCentreY+100, mustacheCentreX, mustacheCentreY+50); //middle
      quadraticVertex ((mustacheCentreX+mustacheLeftEndX)/2, mustacheCentreY+100, mustacheLeftEndX, mustacheLeftEndY);
      quadraticVertex ((mustacheCentreX+mustacheLeftEndX)/2, mustacheCentreY+20, mustacheCentreX, mustacheCentreY);
      endShape ();
      // beginShape ();
      // vertex (mustacheCentreX, mustacheCentreY);
      // quadraticVertex (mustacheCentreX +100, mustacheCentreY+20, mustacheCentreX+200, mustacheCentreY-10);
      // quadraticVertex (mustacheCentreX+200, mustacheCentreY+50, mustacheCentreX+150, mustacheCentreY+40);
      // endShape ();

    //nose
      stroke (0, 0, 0);
      strokeWeight (5);
      fill (skinColour);
      ellipse (face.keypoints[4].x, face.keypoints[4].y, 120, 120);
    }
    /*
    Stop drawing on the face here
    */

  }
  //------------------------------------------------------
  // You can make addtional elements here, but keep the face drawing inside the for loop. 
}


function drawConnections(hand) {
  // Draw the skeletal connections
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
    circle(element.x, element.y, 5);
  }
  pop()

}