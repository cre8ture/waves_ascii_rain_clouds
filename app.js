const density = "Ñ@#W$9876543210?!abc;:+=-,._ ";
let noiseScale = 0.02;
let hillAmplitude = 50; // Height of the hills
let clouds = []; // Array to hold cloud data
const word = "cloud";
const numberOfWords = word.length;
const clusterRadius = 5;
const spillInterval = 200; // Interval in frames between spills
const spillString = "cloud"; // String to spill from the clouds

function setup() {
  createCanvas(windowWidth, windowHeight);
  textSize(10);

  for (let i = 0; i < 100; i++) { // Create 100 stars
    stars.push(new Star());
  }
  for (let i = 0; i < 5; i++) {
    let wordPositions = [];
    for (let j = 0; j < numberOfWords; j++) {
      let angle = random(TWO_PI);
      let r = random(clusterRadius);
      wordPositions.push({
        xOffset: r * cos(angle),
        yOffset: r * sin(angle)
      });
    }
    clouds.push({
      x: random(width),
      y: random(height / 4),
      speed: random(0.1, 0.3),
      words: wordPositions,
      // spillFrame: -spillInterval,
      spillFrame: -random(60, 200),
      spillInterval: -random(60, 200),
      spillIndex: 0,
      randomSpill: Math.random()
    });
  }
}

function draw() {
  background(255);

  makeClouds();
  textFont("Courier");
  fill(0);

  stars.forEach(star => {
    star.display();
    star.twinkle();
  });

  spillCharacters();
  spillCharacters();

  for (let x = 0; x < width; x += 10) {
    for (let baseY = height / 2; baseY < height; baseY += 10) {
      // Using noise to create undulating hills
      let hillY =
        baseY +
        (noise(x * 0.01, baseY * 0.01, frameCount * 0.01) - 0.5) *
          hillAmplitude;
      hillY = constrain(hillY, height / 2, height);

      let noiseVal = noise(
        x * noiseScale,
        hillY * noiseScale,
        frameCount * 0.01
      );
      let index = floor(map(noiseVal, 0, 1, 0, density.length));
      let char = density.charAt(index);

      // Shading based on noise value
      let shade = map(noiseVal, 0, 1, 0, 255);
      fill(shade);

      // Mouse interaction
      let distToMouse = dist(mouseX, mouseY, x, hillY);
      let pushAmount = max(0, 30 - distToMouse); // Parting effect strength
      let accumulationFactor = 1.5; // Factor to control text accumulation
      let shiftX;

      if (distToMouse < 30) {
        // Accumulate text on either side of the mouse
        if (x < mouseX) {
          shiftX = x - pushAmount * accumulationFactor;
        } else {
          shiftX = x + pushAmount * accumulationFactor;
        }
      } else {
        shiftX = x;
      }

      text(char, shiftX, hillY);
    }
  }
}

function makeClouds() {
  clouds.forEach((cloud) => {
    cloud.words.forEach((word) => {
      text("cloud", cloud.x + word.xOffset, cloud.y + word.yOffset);
    });

    // Move the entire cloud cluster to the right
    cloud.x += cloud.speed;

    // Reset cloud position when it moves off screen
    if (cloud.x > width + clusterRadius) {
      cloud.x = -clusterRadius;
      // Optionally, you can also randomize the cloud's y position
      cloud.y = random(height / 4);
    }
  });
}
class SpilledChar {
    constructor(char, x, y, randomFactor) {
      this.char = char;
      this.x = x;
      this.y = y;
      this.velocity = 1; // Starting velocity
      this.random_spill_height = randomFactor; // This will have a larger range
    }
  
    update() {
      this.y += this.velocity;
      this.velocity += 0.05; // Gravity effect
    }
  
    display() {
      text(this.char, this.x, this.y);
    }
  
    isOffScreen() {
      // Significantly vary the ground level for each character
    //   let groundLevel = height * (0.65 + this.random_spill_height * 0.3);
    let groundLevel = height * this.random_spill_height * 0.3;

    //   console.log(groundLevel, this.random_spill_height);
  
      return this.y > groundLevel;
    }
  }

  class Star {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height / 2; // Only in the upper half of the screen
      this.size = Math.random() * 2;
      this.brightness = Math.random();
    }
  
    display() {
      fill(this.brightness * 255);
      ellipse(this.x, this.y, this.size);
    }
  
    twinkle() {
    this.brightness += Math.random() * 0.05 - 0.025; // Increase the range of brightness changes
      this.brightness = constrain(this.brightness, 0, 1); // Keep brightness between 0 and 1
    }
  }
  
  let stars = [];
  

let spilledChars = []; // Array to hold spilled characters
let lastSpillTime = 0; // Global variable to keep track of the last spill time
let cloud;
let timeForSpill = 1000;
function spillCharacters() {
  let currentTime = millis(); // Get the current time in milliseconds
  if (currentTime - lastSpillTime >= timeForSpill) { // Check if at least one second has passed
    cloud = random(clouds); // Select a random cloud
    lastSpillTime = currentTime; // Update the last spill time
    timeForSpill = random(0, 5000); // Randomize the time for the next spill
    if(Math.random() > 0.7) {
        timeForSpill = 0.1;
    }
  }
  if (cloud) {
    // Check if it's time to spill based on the selected cloud's spillInterval
    if (frameCount - cloud.spillFrame > cloud.spillInterval) {
      let char = spillString.charAt(cloud.spillIndex % spillString.length);
      let spillX = cloud.x + random(-10, 10);
      let spillY = cloud.y;

      // Push a new SpilledChar with a unique random spill height
      spilledChars.push(new SpilledChar(char, spillX, spillY, cloud.randomSpill));

      // Update the cloud's spillFrame and spillIndex for the next spill
      cloud.spillFrame = frameCount;
      cloud.spillIndex++;

    }
  }

  
    // Update and display each spilled character
    for (let i = spilledChars.length - 1; i >= 0; i--) {
      spilledChars[i].update();
      spilledChars[i].display();
  
      // Remove character if it's off-screen
      if (spilledChars[i].isOffScreen()) {
        spilledChars.splice(i, 1);
      }
    }
}
  
