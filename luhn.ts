#!/usr/bin/env ts-node-script

/* User input via STDIN */
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log("Please enter your credit card number:");

rl.on("line", (line: string): void => {
  process.exit(validityCheck(line.trim()));
});


/* Checks for validity of entered credit card number */
function validityCheck(cardNr: string): number {
  let isValid: boolean = false;

  // Strings of length 1 or less are not valid
  if (cardNr.length > 1) {
    cardNr = cardNr.replace(/\s/g, "");  // remove white spaces

    // Check for non-digits in string
    if (!/\D/g.test(cardNr)) {
      // Split String into array and convert characters to numbers
      var cardDigits: number[] = cardNr.split("").map((digit: string) => Number(digit));
      isValid = checkLuhn(cardDigits);
    }
  }
  return isValid ? 0 : 42;
}


/* The Luhn Algorithm */
function checkLuhn(cardDigits: number[]): boolean {
  // Reverse array
  cardDigits.reverse();

  // Double every second number and subtract 9 if greater than 9
  cardDigits.forEach((digit: number, idx: number) => {
    if ((idx + 1) % 2 === 0) {
      digit *= 2;

      if (digit > 9) {
        digit -= 9;
      }
    }
    cardDigits[idx] = digit;
  });

  // Sum the array
  let sum: number = cardDigits.reduce((a: number, b: number) => a + b);

  // Check for divisibility by 10
  return sum % 10 === 0;
}
