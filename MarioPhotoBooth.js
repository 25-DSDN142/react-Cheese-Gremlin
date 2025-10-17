// ----=  HANDS  =----
let GestureDetection = (false);

let placeSticker = (false);
let drawSticker = (true);

let drawCoinSticker = (false);
let drawFlowerSticker = (false);
let drawGoombaSticker = (false);
let drawPiranhaSticker = (false);
let drawShellSticker = (false);
let drawStarSticker = (false);
let drawTubeSticker = (false);

let infoBox = (false);

let overlay = (true);
let hideOverlay = (false);
let showOverlay = (true);
let overlayScale = (1);
let brickScale = (0.726);
let levelScale = (0.726);
let rainbowScale = (0.72);

let frames = (true);
let drawBrickFrame = (false);
let drawLevelFrame = (false);
let drawRainbowFrame = (false);

let speak = (true);

let OutlineThickness = (5);
let Mario = (true);
let Luigi = (false);
let Toad = (false);
let Peach = (false);
  let skinColour = [255, 198, 157];
  let mustacheColour = [99, 59, 7];


function prepareInteraction() {
 gradientImg = loadImage ('/images/gradient.png')
 Overlay = loadImage ('/images/Overlay.png');
 BrickFrame = loadImage ('/images/BrickFrame.png');
 LevelFrame = loadImage ('/images/LevelFrame.png');
 RainbowFrame = loadImage ('/images/RainbowFrame.png');
 smallBrickFrame = loadImage ('/images/smallBrickFrame.png');
 smallLevelFrame = loadImage ('/images/smallLevelFrame.png');
 smallRainbowFrame = loadImage ('/images/smallRainbowFrame.png');
//sickers
 coinSticker = loadImage ('/images/coin.png');
 flowerSticker = loadImage ('/images/flower.png');
 goombaSticker = loadImage ('/images/goomba.png');
 piranhaSticker = loadImage ('/images/piranha.png');
 shellSticker = loadImage ('/images/shell.png');
 starSticker = loadImage ('/images/star.png');
 tubeSticker = loadImage ('/images/tube.png');
//speak
 marioSpeak = loadImage ('/images/MarioSpeak.png');
 luigiSpeak = loadImage ('/images/LuigiSpeak.png');
 toadSpeak = loadImage ('/images/ToadSpeak.png');
 peachSpeak = loadImage ('/images/PeachSpeak.png');
 
 pixelFont = loadFont ('pixelFont.otf');
 marioFont = loadFont ('SuperMario256.ttf');
}



function drawInteraction(faces, hands) {

  // hands part
  // USING THE GESTURE DETECTORS (check their values in the debug menu)
  // detectHandGesture(hand) returns "Pinch", "Peace", "Thumbs Up", "Pointing", "Open Palm", or "Fist"

  // for loop to capture if there is more than one hand on the screen. This applies the same process to all hands.
  for (let i = 0; i < hands.length; i++) {
    let hand = hands[i];
    let indexFingerTipX = hand.index_finger_tip.x;
    let indexFingerTipY = hand.index_finger_tip.y;
    let stickerPosX = indexFingerTipX
    let stickerPosY = indexFingerTipY

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

    if (hand.handedness === "Left"){ //characters

    if (whatGesture == "Peace") { //mario
      Mario = (true);
      Luigi = (false);
      Toad = (false);
      Peach = (false);
    }
    if (whatGesture == "Thumbs Up") { //luigi
      Mario = (false);
      Luigi = (true);
      Toad = (false);
      Peach = (false);
    }
    if (whatGesture == "Open Palm") { //Toad
      Mario = (false);
      Luigi = (false);
      Toad = (true);
      Peach = (false);
    }
    if (whatGesture == "Fist") { //Peach
      Mario = (false);
      Luigi = (false);
      Toad = (false);
      Peach = (true);
    }

  //place stickers
  if (drawSticker){ //doesnt work as intended but not enough time/ knowledge to fix (is supposed to draw and finger pos and stay there rather than moving with finger)
    push ();
    imageMode (CENTER);
    if (placeSticker){ //places random sticker when s is pressed
      image (sticker, stickerPosX, stickerPosY, 120, 120);
    } //place stickers
    pop ();
  }//drawstickers 

    }// left hand

    if (hand.handedness === "Right"){

    if (whatGesture == "Peace") { //brick
      drawBrickFrame = (true);
      drawLevelFrame = (false);
      drawRainbowFrame = (false);
    }
    if (whatGesture == "Thumbs Up") { //level/ coin
      drawBrickFrame = (false);
      drawLevelFrame = (true);
      drawRainbowFrame = (false);
    }
    if (whatGesture == "Open Palm") { //rainbow
      drawBrickFrame = (false);
      drawLevelFrame = (false);
      drawRainbowFrame = (true);
    }
    if (whatGesture == "Fist") { //no frame
      drawBrickFrame = (false);
      drawLevelFrame = (false);
      drawRainbowFrame = (false);
    }
    } //right hand
    

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

    let hatCentreX = (0)  //made 0 so hat is drawn at top left corner to canvas so rotationg aligns properly
    let hatCentreY = (0)
    let realHatCentreX = (face.keypoints[151].x) //used to translate hat to correct spot of face when using command to make hat rotate with face
    let realHatCentreY = (face.keypoints[151].y)
    let hatRightEndX = (hatCentreX+(faceWidth)/2.2);
    let hatLeftEndX = (hatCentreX-(faceWidth)/2.2);
    let hatHeight = (faceHeight-20);

    //used for both mario and luigi
    let noseCentreX = (face.keypoints[4].x);
    let noseCentreY = (face.keypoints[4].y);
    let noseWidth = (face.faceOval.width/3.5);
    let hatLogoWidth = (face.faceOval.width/3)

    let realMustacheCentreX = (face.keypoints[4].x);
    let realMustacheCentreY = ((face.keypoints[4].y)+10);
    let mustacheCentreX = (0);
    let mustacheCentreY = (0);

    // let mustacheRightEndX = (face.keypoints[352].x);
    // let mustacheRightEndY = (face.keypoints[352].y);
    let mustacheRightEndX = (mustacheCentreX + (faceWidth/2));
    let mustacheRightEndY = (mustacheCentreY - (faceHeight/15));

    // let mustacheLeftEndX = (face.keypoints[123].x);
    // let mustacheLeftEndY = ((face.keypoints[123].y));
    let mustacheLeftEndX = (mustacheCentreX - (faceWidth/2));
    let mustacheLeftEndY = (mustacheCentreY - (faceHeight/15));

    if (Mario) {
    push ();
    //variables for only mario
    let hatColour = [198, 25, 8];
    //let rightSwoopMiddle = dist (mustacheCentreX, mustacheCentreY, mustacheRightEndX, mustacheRightEndY); 
    let rightSwoop3X = ((mustacheCentreX + mustacheRightEndX)/2.5); //left upper point of middle mustache swoop on right hand since
    let rightSwoop1X = ((rightSwoop3X + mustacheRightEndX)/1.99); //left upper point of right most mustache swoop on right hand since
    let rightSwoop2X = ((rightSwoop3X + rightSwoop1X)/1.97);
    let rightSwoop4X = ((mustacheCentreX + rightSwoop3X)/2);
    //let mustacheRightY = (((noseCentreY + mustacheRightEndY)/2)+20);
    let mustacheRightY = (mustacheRightEndY+ (faceHeight/11));

    let leftSwoop3X = ((mustacheCentreX + mustacheLeftEndX)/2.5); //left upper point of middle mustache swoop on left hand since
    let leftSwoop1X = ((leftSwoop3X + mustacheLeftEndX)/1.99); //left upper point of left most mustache swoop on left hand since
    let leftSwoop2X = ((leftSwoop3X + leftSwoop1X)/2.02);
    let leftSwoop4X = ((mustacheCentreX + leftSwoop3X)/2);
    //let mustacheLeftY = (((noseCentreY + mustacheLeftEndY)/2)+20);
    let mustacheLeftY = (mustacheLeftEndY+ (faceHeight/11));

    let mustacheThicknessY = (face.faceOval.height/4.5);
    

    // mustache
    push ();
      stroke (0, 0, 0);
      strokeWeight (OutlineThickness);
      fill (mustacheColour);

      //makes mustache rotate with face 
      angleMode (RADIANS);
      translate (realMustacheCentreX, realMustacheCentreY); //moves mustache centre from 0,0 to face point at middle of face
      rotate(rotateAmount);

      beginShape (); 
      vertex (mustacheCentreX, mustacheCentreY); //top middle
      quadraticVertex (rightSwoop3X, mustacheCentreY+(faceHeight/20), mustacheRightEndX, mustacheRightEndY); //right end
      quadraticVertex (mustacheRightEndX, mustacheRightY+(faceHeight/14), rightSwoop1X, mustacheRightY+(faceHeight/18));
      quadraticVertex (rightSwoop2X, mustacheRightY+(faceHeight/7), rightSwoop3X, mustacheRightY+(faceHeight/9));
      quadraticVertex (rightSwoop4X, mustacheRightY+(faceHeight/5), mustacheCentreX, mustacheCentreY+(faceHeight/7));
      quadraticVertex (leftSwoop4X, mustacheLeftY+(faceHeight/5), leftSwoop3X, mustacheLeftY+(faceHeight/9));
      quadraticVertex (leftSwoop2X, mustacheLeftY+(faceHeight/7), leftSwoop1X, mustacheLeftY+(faceHeight/18));
      quadraticVertex (mustacheLeftEndX, mustacheLeftY+(faceHeight/14), mustacheLeftEndX, mustacheLeftEndY);
      quadraticVertex (leftSwoop3X, mustacheCentreY+(faceHeight/20), mustacheCentreX, mustacheCentreY);
      endShape();

      pop ();//mustache


    


    //nose
      stroke (0, 0, 0);
      strokeWeight (OutlineThickness);
      fill (skinColour);
      ellipse (noseCentreX, noseCentreY, noseWidth*1.1, noseWidth);
    
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

    if (Luigi) {
    push ();
    //variables for only luigi
    let hatColour = [0, 148, 66];

    let mustacheThicknessX = (face.faceOval.width/15);
    let mustacheThicknessY = (face.faceOval.height/4.5);
    

    // mustache
    push ();
      stroke (0, 0, 0);
      strokeWeight (OutlineThickness);
      fill (mustacheColour);

      //makes mustache rotate with face 
      angleMode (RADIANS);
      translate (realMustacheCentreX, realMustacheCentreY); //moves mustache centre from 0,0 to face point at middle of face
      rotate(rotateAmount);

      beginShape ();
      vertex (mustacheCentreX, mustacheCentreY);
      quadraticVertex ((mustacheCentreX+mustacheRightEndX)/2, mustacheCentreY+20, mustacheRightEndX, mustacheRightEndY);
      quadraticVertex (((mustacheCentreX+mustacheRightEndX)/2)+mustacheThicknessX, mustacheCentreY+mustacheThicknessY, mustacheCentreX, mustacheCentreY+(mustacheThicknessY)/1.6); //middle
      quadraticVertex (((mustacheCentreX+mustacheLeftEndX)/2)-mustacheThicknessX, mustacheCentreY+mustacheThicknessY, mustacheLeftEndX, mustacheLeftEndY);
      quadraticVertex ((mustacheCentreX+mustacheLeftEndX)/2, mustacheCentreY+20, mustacheCentreX, mustacheCentreY);
      endShape ();

    pop ();
    //nose
      stroke (0, 0, 0);
      strokeWeight (OutlineThickness);
      fill (skinColour);
      ellipse (noseCentreX, noseCentreY, noseWidth, noseWidth);
    
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

    if (Toad) {
    push ();
    let toadHatRightEndX = (hatCentreX+(faceWidth)/2.2);
    let toadHatLeftEndX = (hatCentreX-(faceWidth)/2.2);
    let spotSize = (faceWidth/2.8)


    angleMode (RADIANS);
    translate (realHatCentreX, realHatCentreY-10); //moves hat cenre from 0,0 to face point at middle, top of face
    rotate(rotateAmount);

    //hat
    stroke (0, 0, 0);
    strokeWeight (OutlineThickness);

    //white fill
    push ();
    fill (255, 255, 255);

    beginShape ();
    vertex (toadHatRightEndX, hatCentreY+50);
    quadraticVertex (hatCentreX, hatCentreY, toadHatLeftEndX, hatCentreY+50);
    quadraticVertex (hatCentreX-(faceWidth)/1.4, hatCentreY, hatCentreX-(faceWidth)/1.9, hatCentreY-(faceHeight/5));
    quadraticVertex (hatCentreX-(faceWidth)/3.5, hatCentreY-(faceHeight/2.3), hatCentreX, hatCentreY-(faceHeight/2.3)); //centre
    quadraticVertex (hatCentreX+(faceWidth)/3.5, hatCentreY-(faceHeight/2.3), hatCentreX+(faceWidth)/1.9, hatCentreY-(faceHeight/5));
    quadraticVertex (hatCentreX+(faceWidth)/1.4, hatCentreY, toadHatRightEndX, hatCentreY+50);
    endShape ();
    pop ();

    //spots
    push ();
    beginClip ();
    beginShape ();
    vertex (toadHatRightEndX, hatCentreY+50);
    quadraticVertex (hatCentreX, hatCentreY, toadHatLeftEndX, hatCentreY+50);
    quadraticVertex (hatCentreX-(faceWidth)/1.4, hatCentreY, hatCentreX-(faceWidth)/1.9, hatCentreY-(faceHeight/5));
    quadraticVertex (hatCentreX-(faceWidth)/3.5, hatCentreY-(faceHeight/2.3), hatCentreX, hatCentreY-(faceHeight/2.3)); //centre
    quadraticVertex (hatCentreX+(faceWidth)/3.5, hatCentreY-(faceHeight/2.3), hatCentreX+(faceWidth)/1.9, hatCentreY-(faceHeight/5));
    quadraticVertex (hatCentreX+(faceWidth)/1.4, hatCentreY, toadHatRightEndX, hatCentreY+50);
    endShape ();
    endClip ();

    fill (198, 25, 8); //red spots
    ellipse (hatCentreX, hatCentreY-(faceHeight/5), spotSize); //centre spot
    ellipse (hatCentreX-(faceWidth)/1.8, hatCentreY-(faceHeight/15), spotSize); //left spot
    ellipse (hatCentreX+(faceWidth)/1.8, hatCentreY-(faceHeight/15), spotSize); //right spot

    //outline
    noFill ();
    beginShape ();
    vertex (toadHatRightEndX, hatCentreY+50);
    quadraticVertex (hatCentreX, hatCentreY, toadHatLeftEndX, hatCentreY+50);
    quadraticVertex (hatCentreX-(faceWidth)/1.4, hatCentreY, hatCentreX-(faceWidth)/1.9, hatCentreY-(faceHeight/5));
    quadraticVertex (hatCentreX-(faceWidth)/3.5, hatCentreY-(faceHeight/2.3), hatCentreX, hatCentreY-(faceHeight/2.3)); //centre
    quadraticVertex (hatCentreX+(faceWidth)/3.5, hatCentreY-(faceHeight/2.3), hatCentreX+(faceWidth)/1.9, hatCentreY-(faceHeight/5));
    quadraticVertex (hatCentreX+(faceWidth)/1.4, hatCentreY, toadHatRightEndX, hatCentreY+50);
    endShape ();

    pop ();
    
    




    pop (); //toad
    }
    
    if (Peach) {
    push ();
    let hairColour = [255, 239, 34];
    let hairTopY = (hatCentreY - (faceHeight /2.7));
    let crownColour = [237, 193, 0];
    let crownCentreY = (hatCentreY - (faceHeight /2.7));
    let crownPointY = (crownCentreY +(faceHeight/1.5));
    let crownLowPointY = (crownCentreY + (faceHeight/1.8));
    let gemY = (crownCentreY - (faceHeight /7.5));

    angleMode (RADIANS);
    translate (realHatCentreX, realHatCentreY+(faceHeight/12)); //moves hat cenre from 0,0 to face point at middle, top of face
    rotate(rotateAmount);

    stroke (0, 0, 0)
    strokeWeight (OutlineThickness);

    //crown
      //fill
      push ();
      fill (crownColour);
      beginShape ();
      vertex (hatCentreX, crownCentreY - crownPointY);
      vertex (hatCentreX - (faceWidth/5), crownCentreY - crownLowPointY);
      vertex (hatCentreX - (faceWidth/2.7), crownCentreY - crownPointY);
      vertex (hatCentreX - (faceWidth/3), crownCentreY);
      vertex (hatCentreX + (faceWidth/3), crownCentreY);
      vertex (hatCentreX + (faceWidth/2.7), crownCentreY - crownPointY);
      vertex (hatCentreX + (faceWidth/5), crownCentreY - crownLowPointY);
      vertex (hatCentreX, crownCentreY - crownPointY);
      vertex ();
      endShape ();
      //gems
        //mask
        beginClip ();
        beginShape ();
        vertex (hatCentreX, crownCentreY - crownPointY);
        vertex (hatCentreX - (faceWidth/5), crownCentreY - crownLowPointY);
        vertex (hatCentreX - (faceWidth/2.7), crownCentreY - crownPointY);
        vertex (hatCentreX - (faceWidth/3), crownCentreY);
        vertex (hatCentreX + (faceWidth/3), crownCentreY);
        vertex (hatCentreX + (faceWidth/2.7), crownCentreY - crownPointY);
        vertex (hatCentreX + (faceWidth/5), crownCentreY - crownLowPointY);
        vertex (hatCentreX, crownCentreY - crownPointY);
        vertex ();
        endShape ();
        endClip ();
        
      fill (198, 25, 8); //red
      ellipse (hatCentreX, gemY, faceWidth/8, faceHeight/6); //centre
      fill (49, 170, 229); //blue
      ellipse (hatCentreX - (faceWidth/2.9), gemY, faceWidth/10, faceHeight/8); //left
      ellipse (hatCentreX + (faceWidth/2.9), gemY, faceWidth/10, faceHeight/8); //right

      //outline
      noFill ();
      beginShape ();
      vertex (hatCentreX, crownCentreY - crownPointY);
      vertex (hatCentreX - (faceWidth/5), crownCentreY - crownLowPointY);
      vertex (hatCentreX - (faceWidth/2.7), crownCentreY - crownPointY);
      vertex (hatCentreX - (faceWidth/3), crownCentreY);
      vertex (hatCentreX + (faceWidth/3), crownCentreY);
      vertex (hatCentreX + (faceWidth/2.7), crownCentreY - crownPointY);
      vertex (hatCentreX + (faceWidth/5), crownCentreY - crownLowPointY);
      vertex (hatCentreX, crownCentreY - crownPointY);
      vertex ();
      endShape ();

      pop (); //crown


    //hair
      push ();
      fill (hairColour);
      beginShape (); //main hair
      vertex (hatCentreX, hatCentreY - (faceHeight/5));
      quadraticVertex (hatCentreX + (faceWidth/2.5), hatCentreY + (faceHeight/8), hatCentreX + (faceWidth/1.7), hatCentreY + (faceHeight/15));
      quadraticVertex (hatCentreX + (faceWidth/2.5), hairTopY - (faceHeight/5), hatCentreX, hairTopY); //centre top
      quadraticVertex (hatCentreX - (faceWidth/2.5), hairTopY - (faceHeight/5), hatCentreX - (faceWidth/1.7), hatCentreY + (faceHeight/15));
      quadraticVertex (hatCentreX - (faceWidth/2.5), hatCentreY + (faceHeight/8), hatCentreX, hatCentreY - (faceHeight/5));
      endShape ();

      beginShape (); //middle tuft
      vertex (hatCentreX - (faceWidth/4.5), hatCentreY - (faceHeight/4));
      quadraticVertex (hatCentreX - (faceWidth/5), hatCentreY - (faceHeight/8), hatCentreX, hatCentreY);
      quadraticVertex (hatCentreX + (faceWidth/5), hatCentreY - (faceHeight/8), hatCentreX + (faceWidth/4.5), hatCentreY - (faceHeight/4));
      endShape ();
      pop (); //hair


    

    pop (); //Peach
    }

    drawFrames (); //draws frame function so "speak" shows above
    drawOverlay (); //draws overlay function so "speak" shows above

    //"speak" displays "catch phrase" for individual characters when mouth open
    let mouthSize = dist (face.keypoints[13].x, face.keypoints[13].y, face.keypoints[14].x, face.keypoints[14].y)
    if (speak){
    push ();
      stroke (0, 0, 0);
      strokeWeight (10);
      fill (255, 255, 255);
      textSize (70);

      scale (1.1); //adjusing where speak sits without having to redraw loaded in image
      translate (0, -70);


      if (Mario && mouthSize>50){
        //text ("its-a me! Mario!", 640, 850);
        image (marioSpeak, 0, 0, 1280, 960);
      }

      if (Luigi && mouthSize>50){
        //text ("Let's-a go!", 640, 850);
        image (luigiSpeak, 0, 0, 1280, 960);
      }
      if (Toad && mouthSize>50){
        //text ("Yahoo!", 640, 850);
        image (toadSpeak, 0, 0, 1280, 960);
      }

      if (Peach && mouthSize>50){
        //text ("Peachy!", 640, 850);
        image (peachSpeak, 0, 0, 1280, 960);
      }
    pop ();
    } //speak



    /*
    Stop drawing on the face here
    */
  }
  //------------------------------------------------------
  // You can make addtional elements here, but keep the face drawing inside the for loop. 

  if (infoBox){
    push ();

    //grey trasnparent background
    push ();
    fill (0, 0, 0, 150);
    rect (0, 0, 1280, 960);
    pop ();

    textAlign (CENTER, CENTER);
    rectMode (CENTER);
    imageMode (CENTER);

    //box
    image (gradientImg, 640, 480, 600, 675);
    strokeWeight (5);
    //fill (206, 138, 255, 255);
    noFill ();
    rect (640, 480, 600, 675);

    //text
    fill (99, 185, 255);
    textFont (marioFont);
    strokeWeight (10);
    textSize (60);
    text ("Information", 640, 200);
    strokeWeight (5);
    textFont (pixelFont);
    textSize (35);
    fill (100, 157, 255);
    text ("To select different characters and frames make the shown gesture with your respective hand to toggle the effect", 640, 310, 530);
    fill (147, 100, 255);
    text ("Open your mouth to show the characters catchphrase", 640, 430, 530);
    fill (167, 99, 255);
    text ("! = screenshot", 640, 510, 530);
    fill (192, 99, 255);
    text ("↓ = hide UI", 640, 550, 530);
    text ("↑ = show UI", 640, 590, 530);
    fill (231, 99, 255);
    text ("s = show sticker on left pointer", 640, 630, 530);
    text ('press s again to randomize sicker', 640, 670, 530);
    text ("r = hide sticker", 640, 710, 530);
    fill (252, 99, 255);
    text ("[ = hide/show info", 640, 760, 530);


    pop ();
  }

} //stop drawing for drawInteraction
    
//frames
function drawFrames (){
  if (drawBrickFrame){
  push ();
  imageMode (CENTER);
  translate (640, 480);

  if (hideOverlay){ //down arrow to hide UI
    if (brickScale<1){ 
    brickScale = brickScale+0.011
    scale (brickScale);
    image (BrickFrame, 0, 0, 1280, 960);
    }
    else {
      image (BrickFrame, 0, 0, 1280, 960);
    }
  }
  if (showOverlay){ //up arrow to show UI
    if (brickScale>0.726) { 
    brickScale = brickScale-0.0105
    scale (brickScale);
    image (BrickFrame, 0, 0, 1280, 960);
    }
    else {
      scale (0.726);
      image (BrickFrame, 0, 0, 1280, 960);
    }
  }
  pop ();
  } //brick frame

  if (drawLevelFrame){
  push ();
  imageMode (CENTER);
  translate (640, 480);

  if (hideOverlay){ //down arrow to hide UI
    if (levelScale<1){ 
    levelScale = levelScale+0.011
    scale (levelScale);
    image (LevelFrame, 0, 0, 1280, 960);
    }
    else {
      image (LevelFrame, 0, 0, 1280, 960);
    }
  }
  if (showOverlay){ //up arrow to show UI
    if (levelScale>0.726) { 
    levelScale = levelScale-0.0105
    scale (levelScale);
    image (LevelFrame, 0, 0, 1280, 960);
    }
    else {
      scale (0.726);
      image (LevelFrame, 0, 0, 1280, 960);
    }
  }
  pop ();
  } //level frame

  if (drawRainbowFrame){
  push ();
  imageMode (CENTER);
  translate (640, 480);

  if (hideOverlay){ //down arrow to hide UI
    if (rainbowScale<1) { 
    rainbowScale = rainbowScale+0.0105 //0.0077
    scale (rainbowScale);
    image (RainbowFrame, 0, 0, 1280, 960);
    }
    else {
      image (RainbowFrame, 0, 0, 1280, 960);
    }
    }
  if (showOverlay){ //up arrow to show UI
    if (rainbowScale>0.72){ 
    rainbowScale = rainbowScale-0.0115
    scale (rainbowScale);
    image (RainbowFrame, 0, 0, 1280, 960);
    }
    else {
      scale (0.72);
      image (RainbowFrame, 0, 0, 1280, 960);
    }
    }
  pop ();
  } //rianbow frame

} //stop drawing frames

//overlay 
function drawOverlay (){
  if (overlay){
  push ();
  imageMode (CENTER);
  translate (640, 480);
  scale (1);

  if (hideOverlay){ //down arrow to hide UI
    if (overlayScale<1.388){ 
    overlayScale = overlayScale+0.015
    scale (overlayScale);
    image (Overlay, 0, 0, 1280, 960);
    }
  }
  if (showOverlay){ //up arrow to show UI
    if (overlayScale>1) { 
    overlayScale = overlayScale-0.015
    scale (overlayScale);
    image (Overlay, 0, 0, 1280, 960);
    }
    else {
      image (Overlay, 0, 0, 1280, 960);
    }
  }
  pop ();
  } //strop drawing overlay
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