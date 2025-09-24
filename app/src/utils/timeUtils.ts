export const generateTimeOptions = () => {
  const times: string[] = [];
  for (let hour = 1; hour <= 12; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const hourStr = hour.toString().padStart(2, '0');
      const minuteStr = minute.toString().padStart(2, '0');
      times.push(`${hourStr}:${minuteStr} AM`);
      times.push(`${hourStr}:${minuteStr} PM`);
    }
  }
  return times;
};