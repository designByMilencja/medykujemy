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
import { ArticleSchema } from "@/lib/validation";
import Image from "next/image";
import { Badge } from "../ui/badge";
import { createArticle, editArticle } from "@/lib/actions/article.action";
import { useRouter, usePathname } from "next/navigation";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface Props {
  type?: "edit";
  articleDetails?: string;
}

const CreateEditArticle = ({ type, articleDetails }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const parsedArticleDetails =
    articleDetails && JSON.parse(articleDetails || "");

  const groupedTags = parsedArticleDetails?.tags.map((tag: any) => tag.name);
  const form = useForm<z.infer<typeof ArticleSchema>>({
    resolver: zodResolver(ArticleSchema),
    defaultValues: {
      title: parsedArticleDetails?.title || "",
      image: parsedArticleDetails?.image || "",
      desc: parsedArticleDetails?.desc || "",
      description: parsedArticleDetails?.description || "",
      tags: groupedTags || [],
    },
  });

  async function onSubmit(values: z.infer<typeof ArticleSchema>) {
    setIsSubmitting(true);
    try {
      // make an async call to your API -> create a question
      // contain all form data

      if (type === "edit") {
        await editArticle({
          title: values.title,
          image: values.image,
          description: values.description,
          desc: values.desc,
          articleId: parsedArticleDetails._id,
          path: pathname,
        });
        router.push(`/articles/${parsedArticleDetails._id}`);
      } else {
        await createArticle({
          title: values.title,
          image: values.image,
          description: values.description,
          desc: values.desc,
          tags: values.tags,
          path: pathname,
        });
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  }

  const handleInputKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    field: any,
  ) => {
    if (e.key === "Enter" && field.name === "tags") {
      e.preventDefault();
      const tagInput = e.target as HTMLInputElement;
      const tagValue = tagInput.value.trim();
      if (tagValue !== "") {
        if (tagValue.length > 15) {
          return form.setError("tags", {
            type: "required",
            message: "Tag musi miec przynajmniej 3 litery",
          });
        }
        if (!field.value.includes(tagValue as never)) {
          form.setValue("tags", [...field.value, tagValue]);
          tagInput.value = "";
          form.clearErrors("tags");
        }
      } else {
        form.trigger();
      }
    }
  };
  const handleTagRemove = (tag: string, field: any) => {
    const newTags = field.value.filter((t: string) => t !== tag);
    form.setValue("tags", newTags);
  };
  const heading =
    type === "edit"
      ? "Edytuj informacje dotyczace artykułu"
      : "Dodaj informacje dotyczace artykułu";

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
                Tytuł artykułu <span className="text-primary-500">*</span>
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
          name="desc"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Krótki opis artykułu <span className="text-primary-500">*</span>
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
        />{" "}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Treść artykułu <span className="text-primary-500">*</span>
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
          name="tags"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Tagi <span className="text-primary-500">*</span>
              </FormLabel>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Dodaj maksymalnie trzy tagi dotyczące artykułu, oddzielając je
                spacjami.
              </FormDescription>
              <FormControl className="mt-3.5">
                <>
                  <Input
                    disabled={type === "edit"}
                    className="no-focus paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                    onKeyDown={(e) => handleInputKeyDown(e, field)}
                  />
                  {field.value.length > 0 && (
                    <div className="flex-start mt-2.5 gap-2.5">
                      {field.value.map((tag: any) => (
                        <Badge
                          className="subtle-medium background-light800_dark300 text-light400_light500 flex items-center justify-center gap-2 rounded-md border-none px-4 py-2 capitalize"
                          key={tag}
                          onClick={() =>
                            type !== "edit"
                              ? handleTagRemove(tag, field as any)
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
                        </Badge>
                      ))}
                    </div>
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
            <>{type === "edit" ? "Zapisz" : "Opublikuj artykuł"}</>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default CreateEditArticle;
