export function msToTime(ms: number) {
  const seconds = Math.floor((ms / 1000) % 60);

  const minutes = Math.floor((ms / 1000 / 60) % 60);

  const hours = Math.floor((ms / 1000 / 60 / 60) % 24);

  const withHours = [
    hours.toString().padStart(2, '0'),
    minutes.toString().padStart(2, '0'),
    seconds.toString().padStart(2, '0'),
  ].join(':');

  const withoutHours = [
    minutes.toString().padStart(2, '0'),
    seconds.toString().padStart(2, '0'),
  ].join(':');

  return hours > 0 ? withHours : withoutHours;
}
