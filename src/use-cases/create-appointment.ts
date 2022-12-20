import { Appointment } from "../entities/appointment";
import { AppointmentsRepository } from "../repositores/appointments-repository";

interface CreateAppoimentRequest {
  customer: string;
  startAt: Date;
  endsAt: Date;
}

type CreateAppoimentResponse = Appointment;

export class CreateAppointment {
  constructor(private appointmentsRepository: AppointmentsRepository) {}

  async execute({
    customer,
    startAt,
    endsAt,
  }: CreateAppoimentRequest): Promise<CreateAppoimentResponse> {
    const overlappingAppointment =
      await this.appointmentsRepository.findOverlappingAppointment(
        startAt,
        endsAt
      );

    if (overlappingAppointment) {
      throw new Error("Overlapping appointment");
    }

    const appointment = new Appointment({ customer, startAt, endsAt });

    await this.appointmentsRepository.create(appointment);
    return appointment;
  }
}
