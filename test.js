function calculateDemeritPoints(speed) {
  const speedLimit = 70;
  const kmPerDemeritPoint = 5;

  if (speed < speedLimit) {
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
const speed = 80;

// Calculate and display demerit points
calculateDemeritPoints(speed);
