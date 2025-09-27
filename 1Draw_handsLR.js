// ----=  HANDS  =----
// USING THE GESTURE DETECTORS (check their values in the debug menu)
// detectHandGesture(hand) returns "Pinch", "Peace", "Thumbs Up", "Pointing", "Open Palm", or "Fist"

/* load images here */
function prepareInteraction() {
  //bgImage = loadImage('/images/background.png');
}

function drawInteraction(faces, hands) {
  // hands part
  // for loop to capture if there is more than one hand on the screen. This applies the same process to all hands.
  for (let i = 0; i < hands.length; i++) {
    let hand = hands[i];
    // console.log(hand);
    if (showKeypoints) {
      drawConnections(hand)
    }

    let middleFingerMcpX = hand.middle_finger_mcp.x;
    let middleFingerMcpY = hand.middle_finger_mcp.y;
    /*
    Start drawing on the hands here
    */

    let whatGesture = detectHandGesture(hand)

    // if (whatGesture == "Pinch") { //struggels with Fist, point, thumbs up
    //   fill(237, 156, 26) // orange
    // }
    // if (whatGesture == "Pointing") { //struggels with thumbs up, fist and pinch
    //   fill(14, 237, 219) // light blue
    // }
    if (whatGesture == "Peace") { //good
      fill(255, 38, 219) // pink
    }
    if (whatGesture == "Thumbs Up") { // struggels slighly with open palm (not too big a deal)
      fill(255, 252, 48) // yellow
    }
    if (whatGesture == "Open Palm") { //good
      fill(87, 245, 66) // green 
    }
    if (whatGesture == "Fist") { //struggels with pinch (good when pich turned off)
      fill(36, 36, 237) // blue
    }


    if (hand.handedness === "Right") {
      rect(middleFingerMcpX, middleFingerMcpY, 100)
    }

    if (hand.handedness === "Left") {
     ellipse(middleFingerMcpX, middleFingerMcpY, 100)
    }
    /*
    Stop drawing on the hands here
    */
  }
  // You can make addtional elements here, but keep the hand drawing inside the for loop. 
  //------------------------------------------------------

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
    circle(element.x, element.y, 10);
  }
  pop()

}