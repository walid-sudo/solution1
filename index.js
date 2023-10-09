// Function to calculate the grade based on student marks
function calculateGrade(marks) {
  if (marks > 79) {
      return 'A';
  } else if (marks >= 60 && marks <= 79) {
      return 'B';
  } else if (marks >= 50 && marks <= 59) {
      return 'C';
  } else if (marks >= 40 && marks <= 49) {
      return 'D';
  } else {
      return 'E';
  }
}

// Function to prompt the user for input and display the grade
function studentGradeGenerator() {
  var userInput = prompt('Enter the student\'s marks (between 0 and 100):');
  var marks = parseFloat(userInput);

  if (isNaN(marks) || marks < 0 || marks > 100) {
      alert('Invalid input. Please enter a valid number between 0 and 100.');
  } else {
      var grade = calculateGrade(marks);
      alert('Student Grade: ' + grade);
  }
}

// Call the function to start the program
studentGradeGenerator();



