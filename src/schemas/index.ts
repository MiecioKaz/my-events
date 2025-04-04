import * as z from "zod";

export const NewEventSchema = z.object({
  title: z.string().min(1, {
    message: "Event title required",
  }),
  person: z.string().min(1, {
    message: "Name of person required",
  }),
  // date: z.string().date().min(1, {
  //   message: "Please select a date",
  // }),
  date: z.date().min(new Date("2000-01-01"), { message: "Date is required" }),
  category: z.string().min(1, {
    message: "Event category required",
  }),
  description: z.string().min(1, {
    message: "Event description required",
  }),
});
