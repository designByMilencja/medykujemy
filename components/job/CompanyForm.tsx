"use client";
import React, { useState } from "react";
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
import { EmployerSchema } from "@/lib/validation";
import { usePathname, useRouter } from "next/navigation";
import { editEmployer } from "@/lib/actions/user.action";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { JobProps } from "@/types";

const CompanyForm = ({ userDetails, type }: JobProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const parsedUserDetails = userDetails && JSON.parse(userDetails || "");

  const form = useForm<z.infer<typeof EmployerSchema>>({
    resolver: zodResolver(EmployerSchema),
    defaultValues: {
      companyName: parsedUserDetails?.companyName || "",
      brandLink: parsedUserDetails?.brandLink || "",
      city: parsedUserDetails?.city || "",
      occupation: parsedUserDetails?.occupation || "",
      specialization: parsedUserDetails?.specialization || "",
      requirements: parsedUserDetails?.requirements || "",
      salary: parsedUserDetails?.salary || "",
      responsibilities: parsedUserDetails?.responsibilities || "",
      contractType: parsedUserDetails?.contractType || "",
      hours: parsedUserDetails?.hours || "",
      additional: parsedUserDetails?.additional || "",
      role: "employer",
      accept: true,
    },
  });

  async function onSubmit(values: z.infer<typeof EmployerSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    setIsSubmitting(true);
    try {
      // make an async call to your API -> create a question
      // contain all form data
      await editEmployer({
        companyName: values.companyName,
        brandLink: values.brandLink,
        city: values.city,
        hours: values.hours,
        occupation: values.occupation,
        specialization: values.specialization,
        requirements: values.requirements,
        responsibilities: values.responsibilities,
        salary: values.salary,
        contractType: values.contractType,
        additional: values.additional,
        accept: true,
        role: "employer",
        userId: parsedUserDetails._id,
        path: pathname,
      });
      if (type === "edit") {
        router.push(`/jobs/${parsedUserDetails._id}`);
      } else {
        router.push("/jobs");
      }
    } catch (error) {
      console.log(error);
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
          1. Dane firmy
        </h2>
        <FormField
          control={form.control}
          name="companyName"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Nazwa firmy <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl className="mt-3.5">
                <Input
                  className="no-focus paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                  placeholder="Firma"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="brandLink"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Link do strony firmy <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl className="mt-3.5">
                <Input
                  className="no-focus paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                  placeholder="Firma"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
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
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <h2 className="paragraph-semibold text-dark400_light800">
          2. Informacje o stanowisku
        </h2>
        <FormField
          control={form.control}
          name="occupation"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Szukane stanowisko <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl className="mt-3.5">
                <Input
                  className="no-focus paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                  placeholder="pielęgniarka"
                  {...field}
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
                Szukana specjalizacja{" "}
                <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl className="mt-3.5">
                <Input
                  className="no-focus paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                  placeholder="pielęgniarka"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="responsibilities"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Zakres obowiązków: <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl className="mt-3.5">
                <ReactQuill
                  className="no-focus paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                  {...field}
                />
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Opisz czym będzie zajmował się pracownik na tym stanowisku.
              </FormDescription>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="requirements"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Wymagania: <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl className="mt-3.5">
                <ReactQuill
                  className="no-focus paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                  {...field}
                />
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Wypisz jakie wymagania są konieczne, a co będzie dodatkowo mile
                widziane.
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
                Wymiar godzin <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl className="mt-3.5">
                <Input
                  className="no-focus paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                  placeholder="example@email.com"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="salary"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Wynagrodzenie: <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl className="mt-3.5">
                <Input
                  className="no-focus paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                  placeholder="5000"
                  {...field}
                />
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Możesz podać widełki cenowe, dla tego stanowiska w
                zł/miesięcznie.
              </FormDescription>
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
                <ReactQuill
                  className="no-focus paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                  {...field}
                  value={field.value || ""}
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
                    <input type="checkbox" {...field} />
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

export default CompanyForm;
