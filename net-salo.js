const readline = require('readline-sync');

// Function to calculate net salary
function calculateNetSalary(basicSalary, benefits) {
    // Constants for tax rates and deduction values
    const taxRates = [
        { lowerLimit: 0, upperLimit: 24000, rate: 0.1 },
        { lowerLimit: 24001, upperLimit: 32333, rate: 0.25 },
        { lowerLimit: 32334, upperLimit: 500000, rate: 0.3 },
        { lowerLimit: 500001, upperLimit: 800000, rate: 0.325 },
        { lowerLimit: 800001, upperLimit: Infinity, rate: 0.35 }
    ];

    const nhifDeductions = [
        { lowerLimit: 0, upperLimit: 5999, deduction: 150 },
        { lowerLimit: 6000, upperLimit: 7999, deduction: 300 },
        { lowerLimit: 8000, upperLimit: 11999, deduction: 400 },
        { lowerLimit: 12000, upperLimit: 14999, deduction: 500 },
        { lowerLimit: 15000, upperLimit: 19999, deduction: 600 },
        { lowerLimit: 20000, upperLimit: 24999, deduction: 750 },
        { lowerLimit: 25000, upperLimit: 29999, deduction: 850 },
        { lowerLimit: 30000, upperLimit: 34999, deduction: 900 },
        { lowerLimit: 35000, upperLimit: 39999, deduction: 950 },
        { lowerLimit: 40000, upperLimit: 44999, deduction: 1000 },
        { lowerLimit: 45000, upperLimit: 49999, deduction: 1100 },
        { lowerLimit: 50000, upperLimit: 59999, deduction: 1200 },
        { lowerLimit: 60000, upperLimit: 69999, deduction: 1300 },
        { lowerLimit: 70000, upperLimit: 79999, deduction: 1400 },
        { lowerLimit: 80000, upperLimit: 89999, deduction: 1500 },
        { lowerLimit: 90000, upperLimit: 99999, deduction: 1600 },
        { lowerLimit: 100000, upperLimit: Infinity, deduction: 1700 }
    ];

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

    // Calculate NHIF Deduction
    let nhifDeduction = 0;
    for (const nhifRate of nhifDeductions) {
        if (grossSalary >= nhifRate.lowerLimit && grossSalary <= nhifRate.upperLimit) {
            nhifDeduction = nhifRate.deduction;
            break;
        }
    }

    // Calculate NSSF Deduction
    const nssfDeduction = Math.min(basicSalary * nssfDeductionRate, 18000); // NSSF limit is 18000

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
const basicSalary = parseFloat(readline.question('Enter Basic Salary: '));
const benefits = parseFloat(readline.question('Enter Benefits: '));

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
