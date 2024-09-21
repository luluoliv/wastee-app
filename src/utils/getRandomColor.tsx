export const getRandomColor = () => {
  const getRandomHex = () => Math.floor(Math.random() * 256);
  let r, g, b;

  do {
      r = getRandomHex();
      g = getRandomHex();
      b = getRandomHex();
  } while ((r * 0.299 + g * 0.587 + b * 0.114) < 186);

  return `rgb(${r}, ${g}, ${b})`;
};
