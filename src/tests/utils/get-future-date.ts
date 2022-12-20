import { setYear, parseISO } from "date-fns";

export function getFutureDate(date: string): Date {
  const parsedDate = parseISO(date);
  return setYear(parsedDate, parsedDate.getFullYear() + 1);
}
