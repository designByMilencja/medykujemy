"use client";
import { useForm } from "react-hook-form";
import { Reset } from "@/types";
import Input from "@/components/forms/auth/Input";
import Button from "@/components/shared/Button";
import { useRouter } from "next/navigation";

const ResetEmailForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<Reset>({
    reValidateMode: "onChange",
    mode: "onBlur",
    defaultValues: {
      email: "",
    },
  });
  const handleSubmitForm = async (data: Reset) => {
    try {
      const res = await fetch("/api/users/reset", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const response = await res.json();
      if (response.success) {
        router.push("/confirm-email");
      } else {
        console.log("error", response?.message);
      }
    } catch (error: any) {
      console.log("error", error?.message);
    }
  };
  return (
    <form
      onSubmit={handleSubmit(handleSubmitForm)}
      className="card-wrapper mt-[100px] flex flex-col items-center justify-center rounded-[10px] p-5 dark:text-light-900 sm:px-11"
    >
      <h1 className="p-5 text-center text-xl tracking-wide">
        Resetowanie hasła
      </h1>
      <Input
        label="* Email"
        type="email"
        {...register("email", {
          required: "*Email jest wymagany!",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Adres email musi zawierać "@"!',
          },
        })}
        error={errors.email?.message}
      />
      <Button disabled={!isDirty || !isValid} type="submit" text="Potwierdź" />
    </form>
  );
};
export default ResetEmailForm;
