// ----=  HANDS  =----
let halo;
let rightHorn;
let leftHorn;

let angel = true;


let OutlineThickness = (5);
let GestureDetection = (true);
let Mario = (true);
let Luigi = (false);
  let skinColour = [255, 198, 157];
  let mustacheColour = [99, 59, 7];

function prepareInteraction() {
 
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
    let whatGesture = detectHandGesture(hand);

    //colours on hands to tell what gesture is aciavted
    if (GestureDetection){
    push ();
      strokeWeight (OutlineThickness);
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
        rect(hand.middle_finger_mcp.x, hand.middle_finger_mcp.y, 100)
      }
      if (hand.handedness === "Left") {
      ellipse(hand.middle_finger_mcp.x, hand.middle_finger_mcp.y, 100)
      }
    pop ();
    }


    if (whatGesture == "Peace") { //mario
      Mario = (true);
      Luigi = (false);
    }
    if (whatGesture == "Thumbs Up") { //luigi
      Mario = (false);
      Luigi = (true);
    }
    // if (whatGesture == "Open Palm") {
    //   Mario = (false);
    //   Luigi = (false);
    // }
    // if (whatGesture == "Fist") {
    //   Mario = (false);
    //   Luigi = (false);
    // }

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

    //rotation code from tutorial class
    let rotateAmount; 
    let dx = (face.leftEye.centerX - face.rightEye.centerX);
    let dy = (face.leftEye.centerY - face.rightEye.centerY);
    rotateAmount = Math.atan2(dy, dx);

    /*
    Start drawing on the face here
    */

    let faceWidth = (face.faceOval.width);
    let faceHeight = (face.faceOval.height);

    let noseWidth = (face.faceOval.width/3.5);

    let hatCentreX = (0)  //made 0 so hat is drawn at top left corner to canvas so rotationg aligns properly
    let hatCentreY = (0)
    let realHatCentreX = (face.keypoints[10].x) //used to translate hat to correct spot of face when using command to make hat rotate with face
    let realHatCentreY = (face.keypoints[10].y)

    let hatRightEndX = (hatCentreX+(faceWidth)/2.2);
    let hatLeftEndX = (hatCentreX-(faceWidth)/2.2);
    let hatHeight = (faceHeight-20);
    let hatLogoWidth = (face.faceOval.width/3)

    if (Luigi) {
    push ();
    //variables for only luigi
    let hatColour = [0, 148, 66];

    let mustacheCentreX = (face.keypoints[4].x);
    let mustacheCentreY = ((face.keypoints[4].y)+10);
    let mustacheRightEndX = (face.keypoints[352].x);
    let mustacheRightEndY = (face.keypoints[352].y);
    let mustacheLeftEndX = (face.keypoints[123].x);
    let mustacheLeftEndY = ((face.keypoints[123].y));
    let mustacheThicknessY = (face.faceOval.height/4.5);
    let mustacheThicknessX = (face.faceOval.width/15);

    // mustache
      stroke (0, 0, 0);
      strokeWeight (OutlineThickness);
      fill (mustacheColour);
      beginShape ();
      vertex (mustacheCentreX, mustacheCentreY);
      quadraticVertex ((mustacheCentreX+mustacheRightEndX)/2, mustacheCentreY+20, mustacheRightEndX, mustacheRightEndY);
      quadraticVertex (((mustacheCentreX+mustacheRightEndX)/2)+mustacheThicknessX, mustacheCentreY+mustacheThicknessY, mustacheCentreX, mustacheCentreY+(mustacheThicknessY)/1.6); //middle
      quadraticVertex (((mustacheCentreX+mustacheLeftEndX)/2)-mustacheThicknessX, mustacheCentreY+mustacheThicknessY, mustacheLeftEndX, mustacheLeftEndY);
      quadraticVertex ((mustacheCentreX+mustacheLeftEndX)/2, mustacheCentreY+20, mustacheCentreX, mustacheCentreY);
      endShape ();

    //nose
      stroke (0, 0, 0);
      strokeWeight (OutlineThickness);
      fill (skinColour);
      ellipse (face.keypoints[4].x, face.keypoints[4].y, noseWidth, noseWidth);
    
    //hat
    push ();
    angleMode (RADIANS);
    translate (realHatCentreX, realHatCentreY); //moves hat cenre from 0,0 to face point at middle, top of face
    rotate(rotateAmount);

      stroke (0, 0, 0);
      strokeWeight (OutlineThickness);
      fill (hatColour);

      //top
      push ();
      angleMode (DEGREES);
      arc (hatCentreX, hatCentreY, faceWidth+30, hatHeight*1.1, 175, 5);
      pop ();

    
      // beginShape (); //top part of hat attempt using shape, needs more work to be good but using arc for now as it is simpler. might revisit if enough time left
      // vertex (hatLeftEndX-30, hatCentreY+20);
      // quadraticVertex (hatLeftEndX-150, hatCentreY-40, hatLeftEndX-60, hatCentreY-100);
      // quadraticVertex (hatLeftEndX+ faceWidth/3, hatCentreY-200, hatCentreX, hatCentreY-175);
      // quadraticVertex (hatRightEndX- faceWidth/3, hatCentreY-175, hatRightEndX+30, hatCentreY+20);
      // endShape ();


      //logo
      push ();
      fill (255, 255, 255);
      ellipse (hatCentreX, hatCentreY-(hatHeight/4), hatLogoWidth)
      pop ();
      push ();
      rectMode (CENTER);
      textSize (hatLogoWidth-20);
      text ('L', hatCentreX, hatCentreY-(hatHeight/4)+5);
      pop ();

      //rim
      beginShape ();
      vertex (hatLeftEndX, hatCentreY);
      quadraticVertex (hatCentreX, hatCentreY-30, hatRightEndX, hatCentreY); //lower line (1st=centre)
      quadraticVertex (hatRightEndX+32, hatCentreY+5, hatRightEndX+35, hatCentreY+20)
      quadraticVertex (hatRightEndX+32, hatCentreY+35, hatRightEndX, hatCentreY+30);
      quadraticVertex (hatCentreX, hatCentreY, hatLeftEndX, hatCentreY+30); //lower line (1st=centre)
      quadraticVertex (hatLeftEndX-32, hatCentreY+35, hatLeftEndX-35, hatCentreY+20);
      quadraticVertex (hatLeftEndX-32, hatCentreY+5, hatLeftEndX, hatCentreY);
      endShape ();
    pop (); //hat

    pop (); //luigi
    }

    if (Mario) {
    push ();
    //variables for only mario
    let hatColour = [198, 25, 8];

    let mustacheCentreX = (face.keypoints[4].x);
    let mustacheCentreY = ((face.keypoints[4].y)+10);
    let mustacheRightEndX = (face.keypoints[352].x);
    let mustacheRightEndY = (face.keypoints[352].y);
    let rightSwoopMiddle = dist (mustacheCentreX, mustacheCentreY, mustacheRightEndX, mustacheRightEndY);
    let mustacheLeftEndX = (face.keypoints[123].x);
    let mustacheLeftEndY = ((face.keypoints[123].y));
    let mustacheThicknessY = (face.faceOval.height/4.5);

    // mustache
      stroke (0, 0, 0);
      strokeWeight (OutlineThickness);
      fill (mustacheColour);

      beginShape ();
      vertex (mustacheCentreX, mustacheCentreY); //top middle
      quadraticVertex (mustacheCentreX+(rightSwoopMiddle/2), mustacheCentreY+20, mustacheRightEndX, mustacheRightEndY); //right end
      quadraticVertex (mustacheRightEndX, mustacheCentreY+(mustacheThicknessY/3), mustacheRightEndX-(rightSwoopMiddle/4), mustacheCentreY+(mustacheThicknessY/4));
      quadraticVertex (mustacheCentreX+(rightSwoopMiddle/1.5), mustacheCentreY+(mustacheThicknessY/1.5), mustacheCentreX+(rightSwoopMiddle/2.5), mustacheCentreY+(mustacheThicknessY/2));
      quadraticVertex (mustacheCentreX+(rightSwoopMiddle/4), mustacheCentreY+(mustacheThicknessY/1.1), mustacheCentreX, mustacheCentreY+(mustacheThicknessY)/1.6);
      endShape ();
      //(mustacheRightEndX-(rightSwoopMiddle/4))

      // beginShape ();
      // vertex (mustacheCentreX, mustacheCentreY); //top middle
      // quadraticVertex ((mustacheCentreX+mustacheRightEndX)/2, mustacheCentreY+20, mustacheRightEndX, mustacheRightEndY); //right end
      // quadraticVertex (((mustacheCentreX+mustacheRightEndX)/2)+mustacheThicknessX, mustacheCentreY+mustacheThicknessY, mustacheCentreX, mustacheCentreY+(mustacheThicknessY)/1.6); //bottom middle
      // quadraticVertex (((mustacheCentreX+mustacheLeftEndX)/2)-mustacheThicknessX, mustacheCentreY+mustacheThicknessY, mustacheLeftEndX, mustacheLeftEndY); //left end
      // quadraticVertex ((mustacheCentreX+mustacheLeftEndX)/2, mustacheCentreY+20, mustacheCentreX, mustacheCentreY);
      // endShape ();

    //nose
      stroke (0, 0, 0);
      strokeWeight (OutlineThickness);
      fill (skinColour);
      ellipse (face.keypoints[4].x, face.keypoints[4].y, noseWidth*1.1, noseWidth);
    
    //hat
    push ();
    angleMode (RADIANS);
    translate (realHatCentreX, realHatCentreY); //moves hat cenre from 0,0 to face point at middle, top of face
    rotate(rotateAmount);

      stroke (0, 0, 0);
      strokeWeight (OutlineThickness);
      fill (hatColour);

      //top
      push ();
      angleMode (DEGREES);
      arc (hatCentreX, hatCentreY, faceWidth+30, hatHeight, 175, 5);
      pop ();

    
      // beginShape (); //top part of hat attempt using shape, needs more work to be good but using arc for now as it is simpler. might revisit if enough time left
      // vertex (hatLeftEndX-30, hatCentreY+20);
      // quadraticVertex (hatLeftEndX-150, hatCentreY-40, hatLeftEndX-60, hatCentreY-100);
      // quadraticVertex (hatLeftEndX+ faceWidth/3, hatCentreY-200, hatCentreX, hatCentreY-175);
      // quadraticVertex (hatRightEndX- faceWidth/3, hatCentreY-175, hatRightEndX+30, hatCentreY+20);
      // endShape ();


      //logo
      push ();
      fill (255, 255, 255);
      ellipse (hatCentreX, hatCentreY-(hatHeight/4), hatLogoWidth)
      pop ();
      push ();
      textSize (hatLogoWidth-20);
      text ('M', hatCentreX, hatCentreY-(hatHeight/4)+5);
      pop ();

      //rim
      beginShape ();
      vertex (hatLeftEndX, hatCentreY);
      quadraticVertex (hatCentreX, hatCentreY-30, hatRightEndX, hatCentreY); //lower line (1st=centre)
      quadraticVertex (hatRightEndX+32, hatCentreY+5, hatRightEndX+35, hatCentreY+20)
      quadraticVertex (hatRightEndX+32, hatCentreY+35, hatRightEndX, hatCentreY+30);
      quadraticVertex (hatCentreX, hatCentreY, hatLeftEndX, hatCentreY+30); //lower line (1st=centre)
      quadraticVertex (hatLeftEndX-32, hatCentreY+35, hatLeftEndX-35, hatCentreY+20);
      quadraticVertex (hatLeftEndX-32, hatCentreY+5, hatLeftEndX, hatCentreY);
      endShape ();
    pop (); //hat

    pop (); //mario
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