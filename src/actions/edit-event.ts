"use server";

import * as z from "zod";
import { NewEventSchema } from "@/schemas";
import prisma from "@/lib/db";
import { formatISO } from "date-fns";

export const editEvent = async (
  values: z.infer<typeof NewEventSchema>,
  id: string
) => {
  const validatedFields = NewEventSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Wrong values" };
  }
  const { title, person, date, category, description } = validatedFields.data;

  const eventValues = await prisma.event.update({
    where: { id },
    data: {
      title,
      person,
      datetime: formatISO(date),
      category,
      description,
      period: "future",
    },
  });

  if (!eventValues) {
    return { error: "Ooops! Something wrong happened!" };
  } else {
    return { success: "Event details posted succesfully!" };
  }
};
