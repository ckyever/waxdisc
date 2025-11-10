function createSeededRandomiser(seed) {
  return function () {
    // Linear Congruential Generator formula
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
}

function getRandomIntegerFromSeed(seed, min, max) {
  const randomiser = createSeededRandomiser(seed)();
  return Math.floor(randomiser * (max - min + 1)) + min;
}

function getRandomPriceFromSeed(seed, minimumPrice, maximumPrice) {
  const price = getRandomIntegerFromSeed(
    parseInt(seed) * 1000,
    minimumPrice,
    maximumPrice
  );
  const formattedPrice = new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);

  return formattedPrice;
}

export { getRandomPriceFromSeed };
