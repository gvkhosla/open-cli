export function formatCompactNumber(value: number) {
  return new Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

export function formatMetric(value: number | null, label: string | null) {
  if (value === null || !label) {
    return null;
  }

  return `${formatCompactNumber(value)} ${label}`;
}

export function titleCase(value: string) {
  return value.replace(/(^|\s)\S/g, (char) => char.toUpperCase());
}
