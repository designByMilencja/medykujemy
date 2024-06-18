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
import { ProcedureSchema } from "@/lib/validation";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { createProcedure, editProcedure } from "@/lib/actions/procedure.action";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

interface Props {
  type?: "edit";
  procedureDetails?: string;
}

const CreateEditProcedure = ({ type, procedureDetails }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const parsedProcedureDetails =
    procedureDetails && JSON.parse(procedureDetails || "");
  const groupedSources = parsedProcedureDetails?.sources.map(
    (tag: any) => tag.name,
  );

  const form = useForm<z.infer<typeof ProcedureSchema>>({
    resolver: zodResolver(ProcedureSchema),
    defaultValues: {
      title: parsedProcedureDetails?.title || "",
      image: parsedProcedureDetails?.image || "",
      video: parsedProcedureDetails?.video || "",
      desc: parsedProcedureDetails?.desc || "",
      description: parsedProcedureDetails?.description || "",
      sources: groupedSources || [],
    },
  });

  async function onSubmit(values: z.infer<typeof ProcedureSchema>) {
    setIsSubmitting(true);
    try {
      if (type === "edit") {
        await editProcedure({
          title: values.title,
          image: values.image,
          desc: values.desc,
          video: values.video,
          description: values.description,
          procedureId: parsedProcedureDetails._id,
          path: pathname,
        });
        router.push(`/procedure/${parsedProcedureDetails._id}`);
      } else {
        await createProcedure({
          title: values.title,
          image: values.image,
          desc: values.desc,
          video: values.video,
          description: values.description,
          sources: values.sources,
          path: pathname,
        });
        router.push("/procedures");
      }
    } catch (error) {
    } finally {
      setIsSubmitting(false);
    }
  }
  const handleInputKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    field: any,
  ) => {
    if (e.key === "Enter" && field.name === "sources") {
      e.preventDefault();
      const sourceInput = e.target as HTMLInputElement;
      const sourceValue = sourceInput.value.trim();
      if (sourceValue !== "") {
        if (!field.value.includes(sourceValue as never)) {
          form.setValue("sources", [...field.value, sourceValue]);
          sourceInput.value = "";
          form.clearErrors("sources");
        }
      } else {
        form.trigger();
      }
    }
  };
  const handleSourceRemove = (source: string, field: any) => {
    const newSources = field.value.filter((t: string) => t !== source);
    form.setValue("sources", newSources);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-10"
      >
        <h2 className="paragraph-semibold text-dark400_light800">
          Dodaj informacje dotyczace procedury
        </h2>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Tytuł procedury <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl className="mt-3.5">
                <Input
                  className="no-focus paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                  placeholder="shadcn"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Link do zdjęcia <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl className="mt-3.5">
                <Input
                  className="no-focus paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                  placeholder="shadcn"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="video"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Link do video <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl className="mt-3.5">
                <Input
                  className="no-focus paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                  placeholder="shadcn"
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
                Krótki opis procedury{" "}
                <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl className="mt-3.5">
                <Input
                  className="no-focus paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                  placeholder="shadcn"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Treść procedury <span className="text-primary-500">*</span>
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
        />

        <FormField
          control={form.control}
          name="sources"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Referencje <span className="text-primary-500">*</span>
              </FormLabel>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Dodaj maksymalnie dziesięć źródeł na podstawie których powstała
                procedura
              </FormDescription>
              <FormControl className="mt-3.5">
                <>
                  <Input
                    disabled={type === "edit"}
                    className="no-focus paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                    onKeyDown={(e) => handleInputKeyDown(e, field)}
                  />
                  {field.value.length > 0 && (
                    <ul className="flex-end mt-2.5 flex flex-col gap-2.5">
                      {field.value.map((tag: any) => (
                        <li
                          className="subtle-medium background-light800_dark300 text-light400_light500 flex  gap-2 rounded-md border-none px-4 py-2 capitalize"
                          key={tag}
                          onClick={() =>
                            type !== "edit"
                              ? handleSourceRemove(tag, field as any)
                              : () => {}
                          }
                        >
                          {tag}
                          {type !== "edit" && (
                            <Image
                              src="assets/icons/close-outline (1).svg"
                              alt="Ikona zamknięcia"
                              width={12}
                              height={12}
                              className="cursor-pointer object-contain invert-0 dark:invert"
                            />
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </>
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
            <>{type === "edit" ? "Zapisz" : "Opublikuj procedurę"}</>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default CreateEditProcedure;
