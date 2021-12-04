let faceapi, video, detections;
const target_mouth_x = 400;
const target_mouth_y = 360;
const target_eye_x = 330;
const target_eye_y = 220;
function setup() {
  createCanvas(800, 600);
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();
  faceapi = ml5.faceApi(video, modelReady);
}

function drawFace(color){
  if(color==0){
    noFill();
    stroke(0,0,0);
    strokeWeight(3);
    ellipse(400,250,270,360);
  }
  else{
    noFill();
    stroke(0,255,0);
    strokeWeight(3);
    ellipse(400,250,270,360);
  }
}

function drawEyes(color){
  if(color==0){
    noFill();
    stroke(0,0,0);
    strokeWeight(3);
    arc(330,220,60,20,PI,TWO_PI);
    arc(470,220,60,20,PI,TWO_PI);
  }
  else{
    noFill();
    stroke(0,255,0);
    strokeWeight(3);
    arc(330,220,60,20,PI,TWO_PI);
    arc(470,220,60,20,PI,TWO_PI);
  }
}

function drawMouth(color){
  if(color==0){
    noFill();
    stroke(0,0,0);
    strokeWeight(3);
    arc(400,360,120,60,0,PI);
  }
  else{
    noFill();
    stroke(0,255,0);
    strokeWeight(3);
    arc(400,360,120,60,0,PI);
  }
}
function modelReady() {
  faceapi.detect(gotResults);
}

function gotResults(err, result) {
  detections = result;
  image(video, 0,0, width, height);
  drawFace(0);
  drawEyes(0);
  drawMouth(0);
  if (detections) {
    if (detections.length>0){
      //console.log("detected");
      drawLandmarks(detections);
    }
  }
  faceapi. detect(gotResults);
}

function drawLandmarks(detections){
   for(let i = 0; i < detections.length; i++){
     const mouth = detections[i].parts.mouth;
     const leftEye = detections[i].parts.leftEye;

     const mouth_x = mouth[2]._x;
     const mouth_y = mouth[2]._y;
     const eye_x = leftEye[2]._x;
     const eye_y = leftEye[2]._y;
     if(near(mouth_x,target_mouth_x,mouth_y,target_mouth_y) && near(eye_x,target_eye_x,eye_y,target_eye_y)){
       drawFace(1);
       drawEyes(1);
       drawMouth(1);
     }

  }
}

function drawPart(feature, closed){
  fill(237, 34, 93);
  noStroke();
  beginShape();
  for(let i = 0; i < feature.length; i++){
    const x = feature[i]._x;
    const y = feature[i]._y;
    vertex(x, y);
  }
  if(closed){
    endShape(CLOSE);
  } else {
    endShape();
  }
}

function near(x1,x2,y1,y2){
  if((x1-x2)*(x1-x2)+(y1-y2)*(y1-y2)<1800){
    return true;
  }
  return false;
}
