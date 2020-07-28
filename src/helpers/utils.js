export const convertKelvinTemp = (name, kelvin) => {
  switch (name) {
    case 'F':
      return Math.round((kelvin * 9) / 5 - 459.67);
    case 'C':
      return Math.round(kelvin - 273.15);
    default:
      break;
  }
};

export const getTempColor = (value) => {
  const hue = 30 + (240 * (30 - value)) / 60;

  return `hsl(-${hue}, 80%, 50%)`;
};
