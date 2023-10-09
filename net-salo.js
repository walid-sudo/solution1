const prompt = require('sync-prompt')(); // Import the sync-prompt library

// Function to calculate net salary
function calculateNetSalary(basicSalary, benefits) {
    // Constants for tax rates and deduction values (You may need to update these)
    const taxRates = [
        { lowerLimit: 0, upperLimit: 12298, rate: 0.1 },
        { lowerLimit: 12299, upperLimit: 23885, rate: 0.15 },
        { lowerLimit: 23886, upperLimit: 35472, rate: 0.2 },
        { lowerLimit: 35473, upperLimit: Infinity, rate: 0.25 }
    ];

    const nhifDeduction = 500; // Monthly NHIF Deduction
    const nssfDeductionRate = 0.06; // NSSF Deduction Rate (6% of basic salary)

    // Calculate gross salary
    const grossSalary = basicSalary + benefits;

    // Calculate PAYE (tax) based on tax rates
    let tax = 0;
    for (const rate of taxRates) {
        if (grossSalary > rate.upperLimit) {
            tax += (rate.upperLimit - rate.lowerLimit) * rate.rate;
        } else {
            tax += (grossSalary - rate.lowerLimit) * rate.rate;
            break;
        }
    }

    // Calculate NSSF Deduction
    const nssfDeduction = basicSalary * nssfDeductionRate;

    // Calculate net salary
    const netSalary = grossSalary - tax - nhifDeduction - nssfDeduction;

    return {
        grossSalary,
        tax,
        nhifDeduction,
        nssfDeduction,
        netSalary
    };
}

// Get user inputs for basic salary and benefits
const basicSalary = parseFloat(prompt('Enter Basic Salary: '));
const benefits = parseFloat(prompt('Enter Benefits: '));

// Check if inputs are valid numbers
if (isNaN(basicSalary) || isNaN(benefits)) {
    console.log('Invalid input. Please enter valid numbers.');
} else {
    // Calculate and display salary details
    const result = calculateNetSalary(basicSalary, benefits);

    console.log('Gross Salary:', result.grossSalary);
    console.log('PAYE (Tax):', result.tax);
    console.log('NHIF Deduction:', result.nhifDeduction);
    console.log('NSSF Deduction:', result.nssfDeduction);
    console.log('Net Salary:', result.netSalary);
}
