"use client";
import { useForm } from "react-hook-form";
import Input from "@/components/forms/auth/Input";
import Button from "@/components/shared/Button";
import React, { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface IResetPassword {
  password: string;
  token: string | null;
}

const ResetPasswordForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const verify = searchParams.get("verified");
  const router = useRouter();

  useEffect(() => {
    if (!token || verify !== "true") {
      router.push("/");
    }
  }, [token, verify, router]);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<IResetPassword>({
    reValidateMode: "onChange",
    mode: "onBlur",
    defaultValues: {
      password: "",
      token: "",
    },
  });
  const handleSubmitForm = async (data: IResetPassword) => {
    try {
      data.token = token;
      const res = await fetch("/api/users/reset-password", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const response = await res.json();

      if (response.status === 201) {
        router.push("/confirm-password-change");
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
      <h1 className="p-5 text-center text-xl tracking-wide">Nowe hasło</h1>
      <Input
        label="* Hasło"
        type="password"
        {...register("password", {
          required: "* Hasło jest wymagane!",
          pattern: {
            value: /^(?=.*[A-Z])(?=.*\W)(.{10,})$/,
            message:
              "* Hasło musi mieć powyżej 10 znaków, zawierać dużą literę i znak specjalny!",
          },
        })}
        error={errors.password?.message}
      />
      <Button
        disabled={!isDirty || !isValid}
        type="submit"
        text="Zmień hasło"
      />
    </form>
  );
};
export default ResetPasswordForm;
