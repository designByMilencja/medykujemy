"use client";
import React, { useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { EventSchema } from "@/lib/validation";
import { createEvent, editEvent } from "../../lib/actions/event.action";
import { useRouter, usePathname } from "next/navigation";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";

interface Props {
  type?: "edit";
  eventDetails?: string;
}

const CreateEditEvent = ({ type, eventDetails }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const parsedEventDetails = eventDetails && JSON.parse(eventDetails || "");

  const form = useForm<z.infer<typeof EventSchema>>({
    resolver: zodResolver(EventSchema),
    defaultValues: {
      title: parsedEventDetails?.title || "",
      desc: parsedEventDetails?.desc || "",
      time: parsedEventDetails?.time || "",
      date: parsedEventDetails?.date || "",
      src: parsedEventDetails?.src || "",
      location: parsedEventDetails?.location || "",
    },
  });

  async function onSubmit(values: z.infer<typeof EventSchema>) {
    setIsSubmitting(true);
    try {
      // make an async call to your API -> create a question
      // contain all form data

      if (type === "edit") {
        await editEvent({
          title: values.title,
          desc: values.desc,
          time: values.time,
          location: values.location,
          date: values.date,
          src: values.src,
          eventId: parsedEventDetails._id,
          path: pathname,
        });
        router.push("/events");
      } else {
        await createEvent({
          title: values.title,
          desc: values.desc,
          time: values.time,
          location: values.location,
          src: values.src,
          date: values.date,
          path: pathname,
        });
        router.push("/events");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  }

  const heading =
    type === "edit"
      ? "Edytuj informacje dotyczace wydarzenia"
      : "Dodaj informacje dotyczace wydarzenia";

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-10"
      >
        <h2 className="paragraph-semibold text-dark400_light800">{heading}</h2>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Tytuł wydarzenia <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl className="mt-3.5">
                <Input
                  className="no-focus paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="desc"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Krótki opis wydarzenia{" "}
                <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl className="mt-3.5">
                <ReactQuill
                  className="no-focus paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />{" "}
        <FormField
          control={form.control}
          name="src"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Obrazek dla wydarzenia{" "}
                <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl className="mt-3.5">
                <Input
                  className="no-focus paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Data wydarzenia <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl className="mt-3.5">
                <Input
                  className="no-focus paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                  placeholder="15 Luty 2024"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="time"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Godziny wydarzenia <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl className="mt-3.5">
                <Input
                  className="no-focus paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                  placeholder="15:00 - 17:00"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Miejsce wydarzenia <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl className="mt-3.5">
                <Input
                  className="no-focus paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                  placeholder="Platforma Google Meet"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="primary-gradient w-fit !text-light-900"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>{type === "edit" ? "Edytowanie..." : "Publikowanie..."}</>
          ) : (
            <>{type === "edit" ? "Zapisz" : "Opublikuj wydarzenie"}</>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default CreateEditEvent;
