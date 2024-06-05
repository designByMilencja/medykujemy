"use client";
import { useForm } from "react-hook-form";
import { UserRegister } from "@/types";
import Input from "@/components/forms/auth/Input";
import Button from "@/components/shared/Button";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Link from "next/link";

const RegisterForm = () => {
  const [selectedRole, setSelectedRole] = useState<string>("employee");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isDirty, isValid },
  } = useForm<UserRegister>({
    reValidateMode: "onChange",
    mode: "onChange",
    defaultValues: {
      name: "",
      surname: "",
      email: "",
      password: "",
      role: "",
      isVerified: false,
      licenceNumber: "",
      companyName: "",
      city: "",
      occupation: "",
      specialization: "",
      hours: "",
      experience: "",
      contractType: "",
      additional: "",
      responsibilities: "",
      requirements: "",
      brandLink: "",
    },
  });

  useEffect(() => {
    setValue("role", "employee");
  }, []);

  const handleRoleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const role = event.target.value;
    setSelectedRole(role);
    setValue("role", role);
  };

  const handleSubmitForm = async (data: UserRegister) => {
    try {
      const res = await fetch("/api/users/register", {
        method: "POST",
        body: JSON.stringify({
          ...data,
          email: data.email.toLowerCase(),
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        if (res.status === 409) {
          setErrorMessage("Ten adres e-mail został już użyty do rejestracji!");
          return null;
        }
        if (res.status === 400) {
          setErrorMessage("Proszę uzupełnić wszystkie dane!");
          return null;
        } else setErrorMessage("Wystąpił błąd spróbuj ponownie później!");
      } else {
        reset();
        router.refresh();
        router.push("/confirm-registration");
      }
    } catch (error: any) {}
  };

  return (
    <form
      onSubmit={handleSubmit(handleSubmitForm)}
      className="card-wrapper mt-[90px] flex flex-col items-center justify-center rounded-[10px] p-5 dark:text-light-900 sm:px-11"
    >
      <h1 className="p-5 text-center text-xl tracking-wide">Rejestracja</h1>
      <Input
        label="* Imię"
        type="text"
        {...register("name", {
          required: "* Imię jest wymagane!",
          maxLength: {
            value: 20,
            message: "Imię nie powinno przekraczać 20 znaków!",
          },
        })}
        error={errors.name?.message}
      />
      <Input
        label="* Nazwisko"
        type="text"
        {...register("surname", {
          required: "* Nazwisko jest wymagane!",
          maxLength: {
            value: 40,
            message: "Nazwisko nie powinno przekraczać 40 znaków!",
          },
        })}
        error={errors.surname?.message}
      />

      <Input
        label="* Email"
        type="email"
        {...register("email", {
          required: "* Email jest wymagany!",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: '*Adres email musi zawierać "@"!',
          },
        })}
        error={errors.email?.message}
      />
      <Input
        label="* Hasło"
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
      <div className="relative m-3">
        <label className="background-light900_dark200 absolute -top-3 left-5 rounded-xl px-3 dark:text-light-900">
          * Zarejestruj się jako:
        </label>
        <div className="background-light900_dark200 flex w-[300px] gap-2 rounded-xl border border-primary-500 p-5">
          <label
            className={selectedRole === "employee" ? "text-primary-500" : ""}
          >
            <input
              type="radio"
              name="role"
              value="employee"
              checked={selectedRole === "employee"}
              onChange={handleRoleChange}
              className="m-2"
            />
            Pracownik
          </label>
          <label
            className={selectedRole === "employer" ? "text-primary-500" : ""}
          >
            <input
              type="radio"
              name="role"
              value="employer"
              checked={selectedRole === "employer"}
              onChange={handleRoleChange}
              className="m-2"
            />
            Pracodawca
          </label>
        </div>
      </div>
      {selectedRole === "employee" && (
        <Input
          label="* Numer PWZ"
          type="text"
          {...register("licenceNumber", {
            required: "* Numer PWZ jest wymagany!",
            pattern: {
              value: /^\d{7}[PA]$/i,
              message: "* Nieprawidłowy format numeru PWZ!",
              // 'Numer licencji musi składać się z 7 cyfr i zakończony być literą P lub A'
            },
          })}
          error={errors?.licenceNumber?.message || ""}
        />
      )}
      {selectedRole === "employer" && (
        <Input
          label="* Nazwa firmy"
          type="text"
          {...register("companyName", {
            required: "* Nazwa firmy jest wymagana!",
          })}
          error={errors?.companyName?.message || ""}
        />
      )}
      {errorMessage && <p className="warning-message">{errorMessage}</p>}
      <Button
        disabled={!isDirty || !isValid}
        type="submit"
        text="Zarejestruj"
      />
      <div className="flex w-[300px] justify-between text-xs">
        <Link href="/sign-in" className="px-2 hover:text-primary-500">
          Zaloguj się
        </Link>
        <Link href="/reset-confirm" className="px-2 hover:text-primary-500">
          Odzyskaj hasło
        </Link>
      </div>
    </form>
  );
};
export default RegisterForm;
