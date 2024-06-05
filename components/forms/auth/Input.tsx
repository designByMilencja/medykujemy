import React, { forwardRef, useState } from "react";
import Image from "next/image";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, Props>(
  ({ label, error, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false); // Stan określający, czy hasło ma być widoczne
    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword); // Funkcja do przełączania widoczności hasła
    };
    return (
      <div className="relative m-3">
        <label className="background-light900_dark200 absolute -top-3 left-5 flex gap-2 rounded-xl px-3 dark:text-light-900">
          {label}
        </label>
        <div>
          <input
            ref={ref}
            type={showPassword ? "text" : "password"}
            className="background-light900_dark200 w-[300px] rounded-xl border border-primary-500 p-5 text-primary-500"
            {...props}
          />
          {label === "* Hasło" && (
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-[20px] top-[21px] z-20 hover:text-primary-500"
            >
              {" "}
              {showPassword ? (
                <Image
                  alt="icon of eye - to hide password"
                  src="/assets/icons/eye-off.svg"
                  width={23}
                  height={20}
                />
              ) : (
                <Image
                  alt="icon of eye - to see password"
                  src="/assets/icons/eye.svg"
                  width={23}
                  height={20}
                />
              )}
            </button>
          )}
        </div>
        {error && <p className="warning-message">{error}</p>}
      </div>
    );
  },
);
Input.displayName = "Input";
export default Input;
