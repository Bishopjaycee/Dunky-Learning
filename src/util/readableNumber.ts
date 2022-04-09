export default function readableNumber(rawNumber: number) {
  return rawNumber.toLocaleString(undefined, { minimumFractionDigits: 0 });
}
