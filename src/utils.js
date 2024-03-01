export function loseEqual(a, b, precision = 0.5) {
  return Math.abs(a - b) <= precision
}

export function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
