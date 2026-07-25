interface IRectangle {
  width: number;
  height: number;
}

interface ICircle {
  radius: number;
}

class Rectangle implements IRectangle {
  constructor(public width: number, public height: number) {}

  calculateArea(): number {
    return this.width * this.height;
  }

  calculatePerimeter(): number {
    return 2 * (this.width + this.height);
  }
}

class Circle implements ICircle {
  constructor(public radius: number) {}

  calculateArea(): number {
    return Math.PI * Math.pow(this.radius, 2);
  }

  calculatePerimeter(): number {
    return 2 * Math.PI * this.radius;
  }
}

function addNumbers(a: number, b: number): number {
  return a + b;
}

function multiplyNumbers(a: number, b: number): number {
  return a * b;
}

function capitalizeString(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function filterEvenNumbers(numbers: number[]): number[] {
  return numbers.filter((num) => num % 2 === 0);
}

function findMax(numbers: number[]): number {
  return Math.max(...numbers);
}

function isPalindrome(str: string): boolean {
  const cleanStr: string = str.toLowerCase().replace(/[^a-zA-Z0-9]/g, "");
  const reversedStr: string = cleanStr.split("").reverse().join("");
  return cleanStr === reversedStr;
}

function calculateFactorial(n: number): number {
  if (n === 0 || n === 1) {
    return 1;
  } else {
    return n * calculateFactorial(n - 1);
  }
}

const myRectangle = new Rectangle(5, 8);
const myCircle = new Circle(3);

console.log(`Rectangle Area: ${myRectangle.calculateArea()}, Perimeter: ${myRectangle.calculatePerimeter()}`);
console.log(`Circle Area: ${myCircle.calculateArea().toFixed(2)}, Perimeter: ${myCircle.calculatePerimeter().toFixed(2)}`);

console.log(`Sum: ${addNumbers(5, 3)}`);
console.log(`Multiplication: ${multiplyNumbers(4, 7)}`);
console.log(`Capitalized String: ${capitalizeString("javascript is fun")}`);
console.log(`Even Numbers: ${filterEvenNumbers([1, 2, 3, 4, 5, 6, 7, 8])}`);
console.log(`Max Number: ${findMax([23, 56, 12, 89, 43])}`);
console.log(`Is Palindrome: ${isPalindrome("A man, a plan, a canal, Panama")}`);
console.log(`Factorial: ${calculateFactorial(5)}`);