import React from "react";

interface Props {
  className?: string;
  placeholder: string;
}

const Input = ({ className, placeholder }: Props) => {
  return (
    <input
      type="text"
      className={`w-full outline rounded-lg px-3 py-1.5 bg-white ${className}`}
      placeholder={`${placeholder}`}
    />
  );
};

export default Input;
