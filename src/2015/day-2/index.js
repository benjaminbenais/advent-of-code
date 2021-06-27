const fs = require('fs');

const puzzleInput = fs.readFileSync('./input.txt', 'utf-8');

const presentsDimensions = puzzleInput.split('\n');

const getSmallest = (...args) => {
  let smallest = args[0];

  for (let i = 1; i < args.length; i++) {
    if (args[i] < smallest) {
      smallest = args[i];
    }
  }

  return smallest;
};

const wrappingPaper = presentsDimensions.reduce((acc, curr) => {
  const [l, w, h] = curr.split('x');

  const sideA = l * w;
  const sideB = w * h;
  const sideC = h * l;

  const surfaceArea = 2 * sideA + 2 * sideB + 2 * sideC;

  const smallestArea = getSmallest(sideA, sideB, sideC);

  return acc + surfaceArea + smallestArea;
}, 0);

const totalRibbon = presentsDimensions.reduce((acc, curr) => {
  const [a, b, c] = curr
    .split('x')
    .map((el) => Number(el))
    .sort((n, m) => n - m);

  const ribbon = a + a + b + b;
  const bow = a * b * c;

  return acc + ribbon + bow;
}, 0);

console.log('wrappingPaper :', wrappingPaper);
console.log('totalRibbon :', totalRibbon);
