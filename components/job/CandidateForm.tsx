"use client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { EmployeeSchema } from "@/lib/validation";
import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { editEmployee } from "@/lib/actions/user.action";
import { JobProps } from "@/types";
import ReactQuill from "react-quill";

const CandidateForm = ({ type, userDetails }: JobProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const parsedUserDetails = userDetails && JSON.parse(userDetails || "");

  const form = useForm<z.infer<typeof EmployeeSchema>>({
    resolver: zodResolver(EmployeeSchema),
    defaultValues: {
      city: parsedUserDetails?.city || "",
      occupation: parsedUserDetails?.occupation || "",
      specialization: parsedUserDetails?.specialization || "",
      experience: parsedUserDetails?.experience || "",
      contractType: parsedUserDetails?.contractType || "",
      hours: parsedUserDetails?.hours || "",
      additional: parsedUserDetails?.additional || "",
      role: "employee",
      accept: true,
    },
  });
  async function onSubmit(values: z.infer<typeof EmployeeSchema>) {
    setIsSubmitting(true);
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    try {
      await editEmployee({
        city: values.city,
        hours: values.hours,
        occupation: values.occupation,
        specialization: values.specialization,
        experience: values.experience,
        contractType: values.contractType,
        additional: values.additional,
        accept: true,
        role: "employee",
        userId: parsedUserDetails._id,
        path: pathname,
      });
      if (type === "edit") {
        router.push(`/jobs/${parsedUserDetails._id}`);
      } else {
        router.push("/jobs");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-10"
      >
        <h2 className="paragraph-semibold text-dark400_light800">
          1. Twoje dane
        </h2>
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Miasto <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl className="mt-3.5">
                <Input
                  className="no-focus paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                  placeholder="Warszawa"
                  {...field}
                  required
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <h2 className="paragraph-semibold text-dark400_light800">
          2. Informacje o doświadczeniu zawodowym
        </h2>
        <FormField
          control={form.control}
          name="occupation"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Stanowisko <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl className="mt-3.5">
                <Input
                  className="no-focus paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                  placeholder="Pielęgniarka"
                  {...field}
                  required
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="specialization"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Specjalizacja <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl className="mt-3.5">
                <Input
                  className="no-focus paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                  placeholder="pielęgniarstwo chirurgiczne"
                  {...field}
                  required
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="experience"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Doświadczenie: <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl className="mt-3.5">
                <ReactQuill
                  className="no-focus paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                  {...field}
                />
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Opisz swoje dotychczasowe doświadczenie na tym stanowisku.
              </FormDescription>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="hours"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Wymiar godzinowy <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl className="mt-3.5">
                <Input
                  className="no-focus paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                  placeholder="pełny etat"
                  {...field}
                  required
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="contractType"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Rodzaj umowy <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl className="mt-3.5">
                <Input
                  className="no-focus paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                  placeholder="Umowa o pracę"
                  {...field}
                  required
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="additional"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Informacje dodatkowe
              </FormLabel>
              <FormControl className="mt-3.5">
                <Input
                  {...field}
                  value={field.value ?? ""}
                  className="no-focus paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        {type === "add" && (
          <FormField
            control={form.control}
            name="accept"
            render={({ field }) => (
              <FormItem className="flex w-full items-center">
                <FormControl className="mt-3.5">
                  <div>
                    <input
                      type="checkbox"
                      checked={field.value}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      ref={field.ref}
                      required
                    />
                    <FormLabel className="paragraph-regular text-dark400_light800 ml-2">
                      Oświadczam, że zgadzam się na wyświetlenie moich danych na
                      stronie ogłoszeń
                    </FormLabel>
                  </div>
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
        )}
        <Button
          type="submit"
          className="primary-gradient m-2 min-h-[46px] rounded-lg px-4 py-3 text-light-900"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>{type === "edit" ? "Edytowanie..." : "Publikowanie..."}</>
          ) : (
            <>{type === "edit" ? "Zapisz" : "Dodaj swój profil"}</>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default CandidateForm;
