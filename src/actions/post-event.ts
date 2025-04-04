"use server";

import * as z from "zod";
import { NewEventSchema } from "@/schemas";
import prisma from "@/lib/db";

export const postEvent = async (values: z.infer<typeof NewEventSchema>) => {
  const validatedFields = NewEventSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Wrong values" };
  }
  const { title, person, date, category, description } = validatedFields.data;

  const eventValues = await prisma.event.create({
    data: {
      title,
      person,
      date,
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
