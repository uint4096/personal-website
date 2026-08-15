export const formatTime = (date: Date) => {
  const dt = new Date(date);

  const format: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
    year: "numeric",
  };

  return new Intl.DateTimeFormat("en-GB", format).format(dt);
}
