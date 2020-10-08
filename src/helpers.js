export function formatDistanceInKms(distance) {
  if (typeof distance != 'number' || Object.is(distance, NaN)) {
    return NaN;
  }

  const d = Number.parseFloat(distance);

  return (d / 1000).toFixed(2);
}
