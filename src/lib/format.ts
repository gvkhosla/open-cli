export function formatCompactNumber(value: number) {
  return new Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

export function titleCase(value: string) {
  return value.replace(/(^|\s)\S/g, (char) => char.toUpperCase());
}
