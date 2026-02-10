function generateFibonacci(n) {
  const series = [];
  let a = 0, b = 1;

  for (let i = 0; i < n; i++) {
    series.push(a);
    [a, b] = [b, a + b];
  }

  return series;
}

function isPrime(num) {
  if (num < 2) return false;

  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }

  return true;
}

function gcd(a, b) {
  return b === 0 ? a : gcd(b, a % b);
}

function calculateLCM(arr) {
  return arr.reduce((a, b) => (a * b) / gcd(a, b));
}

function calculateHCF(arr) {
  return arr.reduce((a, b) => gcd(a, b));
}

module.exports = {
  generateFibonacci,
  isPrime,
  calculateLCM,
  calculateHCF,
};
