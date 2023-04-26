
export const prepareSearchValue = (str) => {
  const formatSymbols = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/gi;
  const firstArr = str
    .toLowerCase()
    .replaceAll(formatSymbols, " ")
    .replaceAll(/\s\s+/g, " ")
    .split(" ");
  const wordsToRmv = ["la", "del", "en", "de", "por", "al", "nuevo"];
  const finalArr = firstArr.filter((w) => !wordsToRmv.includes(w));
  return finalArr;
};
