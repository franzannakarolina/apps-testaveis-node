import { expect, test } from "vitest";
import { Appointment } from "./appointment";
import { getFutureDate } from "../tests/utils/get-future-date";

test("create an appointment", () => {
  const appointment = new Appointment({
    customer: "John Doe",
    startAt: new Date("2021-01-01T10:00:00"),
    endsAt: new Date("2021-01-01T11:00:00"),
  });

  expect(appointment).toBeInstanceOf(Appointment);
  expect(appointment.customer).toEqual("John Doe");
});

test("cannot create an appointment with end date before start date", () => {
  const startsAt = getFutureDate("2022-08-10");
  const endsAt = getFutureDate("2022-08-09");

  expect(() => {
    return new Appointment({
      customer: "John Doe",
      startAt: startsAt,
      endsAt: endsAt,
    });
  }).toThrow();
});
