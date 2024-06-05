"use client";
import { useForm } from "react-hook-form";
import { LoginData } from "@/types";
import Input from "@/components/forms/auth/Input";
import Button from "@/components/shared/Button";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useSearchParams } from "next/navigation";

const LoginForm = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const [error, setError] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { isDirty, isValid, errors },
  } = useForm<LoginData>({
    reValidateMode: "onChange",
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmitForm = async (data: LoginData) => {
    try {
      const response = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
        callbackUrl,
      });
      if (response?.ok) {
        window.location.href = callbackUrl; // Użycie window.location.href do przekierowania
      } else {
        if (response?.error === "AccessDenied") {
          setError(
            "Sprawdź swoją skrzynkę odbiorczą i kliknij w link, aby potwierdzić swoje konto. Jeśli nie otrzymałeś jeszcze e-maila, sprawdź folder ze spamem.",
          );
        } else {
          setError("Coś poszło nie tak, spróbuj ponownie później.");
        }
      }
    } catch (error) {
      setError("Wystąpił nieznany błąd podczas logowania.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleSubmitForm)}
      className="card-wrapper mt-[100px] flex flex-col items-center justify-center rounded-[10px] p-5 dark:text-light-900 sm:px-11"
    >
      <h1 className="p-5 text-center text-xl tracking-wide">Logowanie</h1>
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
      <Input
        label="* Hasło"
        {...register("password", {
          required: "Hasło jest wymagane!",
        })}
        error={errors.password?.message}
      />
      {error && <p className="warning-message">{error}</p>}
      <Button disabled={!isDirty || !isValid} type="submit" text="Zaloguj" />
      <div className="flex w-[300px] justify-between text-xs">
        <Link href="/sign-up" className="px-2 hover:text-primary-500">
          Nie masz konta?
        </Link>
        <Link href="/reset-confirm" className="px-2 hover:text-primary-500">
          Zapomniałeś hasło?
        </Link>
      </div>
    </form>
  );
};

export default LoginForm;
