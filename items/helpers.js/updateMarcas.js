export const updateMarcas = (value) => {
  return value.reduce((acc, prod) => {
    if (prod.Marca !== "Otro") {
      return { ...acc, [prod.Marca]: acc[prod.Marca] + 1 || 1 };
    } else return { ...acc };
  }, {});
};
