const prompt = require('prompt-sync')();

function calculateDemeritPoints(speed) {
  const speedLimit = 70;
  const kmPerDemeritPoint = 5;

  if (speed <= speedLimit) {
    console.log("Ok");
  } else {
    const excessSpeed = speed - speedLimit;
    const demeritPoints = Math.floor(excessSpeed / kmPerDemeritPoint);

    if (demeritPoints > 12) {
      console.log("License suspended");
    } else {
      console.log("Points:", demeritPoints);
    }
  }
}

// Get the speed as input
const carSpeed = parseFloat(prompt("Enter the car speed: "));

if (!isNaN(carSpeed) && carSpeed >= 0) {
  calculateDemeritPoints(carSpeed);
} else {
  console.log("Invalid input. Please enter a valid number for car speed.");
}
