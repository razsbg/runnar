export function formatDistanceInKms(distance) {
  const d = Number.parseFloat(distance);

  return (d / 1000).toFixed(2);
}
