export function formatDistanceInKms(distance) {
  if (typeof distance != 'number' || Object.is(distance, NaN)) {
    return NaN;
  }

  const d = Number.parseFloat(distance);

  return (d / 1000).toFixed(2);
}

var dateTimeFormatterOptions = {
  year: '2-digit',
  day: 'numeric',
  month: 'short',
  hour: '2-digit',
  minute: '2-digit',
};
var dateTimeFormatter = new Intl.DateTimeFormat(
  'ro-RO',
  dateTimeFormatterOptions
);

export function formatFirebaseTimestamp(timestamp) {
  var date = timestamp.toDate();

  return dateTimeFormatter.format(date);
}

export function sortByTimestampDesc(timestampKey) {
  return function (doc1, doc2) {
    return doc1[timestampKey].toDate() > doc2[timestampKey].toDate() ? -1 : 1;
  };
}
