import React from "react";

interface ButtonProps {
  text: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

const Button: React.FC<ButtonProps> = ({text, disabled, type}) => {
  return (
  <button type={type} disabled={disabled} className={`small-medium m-[20px] mx-auto w-[300px] rounded-lg bg-light-800 px-4 py-3 shadow-none transition-colors dark:bg-dark-400 ${disabled ? "cursor-not-allowed" : "cursor-pointer hover:bg-light-700 dark:hover:bg-dark-300"}`}>
    <span className={`${disabled ? "text-light-400" : "primary-text-gradient"}`}>{text}</span>
  </button>
  );
};

export default Button;
