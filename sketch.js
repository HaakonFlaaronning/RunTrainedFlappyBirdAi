let pipes = [];
let counter = 0;
let slider;

let bird;
let brainJSON;

function preload() {
  brainJSON = loadJSON("long_bird1.json");
}
//--------------------------------------------------------------------------------

function setup() {
  createCanvas(600,400);
  slider = createSlider(1, 100, 1);
  let birdBrain = NeuralNetwork.deserialize(brainJSON);
  bird = new Bird(birdBrain);
}
//---------------------------------------------£££@£-----------------------------------

function draw() {

  for(let n = 0; n < slider.value(); n++) {
    if(counter % 350 == 0) {
      pipes.push(new Pipe());
    }
    counter++;

    if(bird.hitWall()) {
      console.log("Hit wall");
    }


    for(var i=pipes.length-1; i >= 0; i--) {
      if(bird.hitPipe(pipes[i])) {
        console.log("collision");
      }
      pipes[i].update();
      if(pipes[i].offscreen()) {
        pipes.splice(i,1);
      }
    }
    //--------------------------------------------------------------------------------

    bird.think(pipes);
    bird.update();
  }

  //All drawing stuff - not logic
  background(0);
  bird.show();
  for(let pipe of pipes) {
    pipe.show();
  }
}

//--------------------------------------------------------------------------------

/*
function keyPressed() {
if(key == ' ') {
bird.up();
}
}*/
