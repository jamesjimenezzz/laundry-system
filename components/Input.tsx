import React from "react";

interface Props {
  className?: string;
  placeholder: string;
  type: string;
}

const Input = ({ className, placeholder, type }: Props) => {
  return (
    <input
      type={type}
      step={type == "number" ? 0.01 : ""}
      className={`w-full outline rounded-lg px-3 py-1.5 bg-white ${className}`}
      placeholder={`${placeholder}`}
    />
  );
};

export default Input;
