"use client";

import { NewEventSchema } from "@/schemas";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { postEvent } from "@/actions/post-event";
import { FormError } from "@/components/FormError";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const NewEventPage = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof NewEventSchema>>({
    resolver: zodResolver(NewEventSchema),
    defaultValues: {
      title: "",
      person: "",
      date: new Date("1900-01-01"), // react-hook-form prevents using "undefined"
      category: "",
      description: "",
    },
  });

  function onSubmit(values: z.infer<typeof NewEventSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    startTransition(() => {
      postEvent(values).then((res) => {
        if (res.error) {
          setError(res.error);
        } else {
          router.push("/events");
        }
      });
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col space-y-8"
      >
        <h1 className="text-center font-bold text-xl dark:text-white">
          New Event Details
        </h1>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold dark:text-white">
                Event title
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  className="bg-white"
                  placeholder="Input a name of event"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="person"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold dark:text-white">
                Person
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  className="bg-white"
                  placeholder="Input a name of person involved"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="font-bold dark:text-white">
                Event date
              </FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {format(field.value, "PP") === "Jan 1, 1900" ? (
                        <span className="text-muted-foreground">
                          Pick a date
                        </span>
                      ) : (
                        format(field.value, "PP")
                      )}

                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto p-0"
                  align="start"
                >
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => date < new Date("1900-01-01")}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold dark:text-white">
                Event category
              </FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger
                    className={cn(
                      "bg-white",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    <SelectValue placeholder="Select an event category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="health">Health</SelectItem>
                  <SelectItem value="travel">Travel</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold dark:text-white">
                Event description
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Input all details of event"
                  className="field-sizing-fixed min-h-20 resize-none bg-white pt-1"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="text-lg"
        >
          {isPending ? "Wait...." : "Submit"}
        </Button>
      </form>
      <FormError message={error} />
    </Form>
  );
};
export default NewEventPage;
