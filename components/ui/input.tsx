import { Search } from "lucide-react";
import React from "react";

interface Props {
  query: string;
  setQuery: (value: string) => void;
  className?: string;
}

const Input = ({ query, setQuery, className }: Props) => {
  return (
    <div className="relative w-full">
      <Search
        className=" absolute ml-3  bottom-2 text-muted-foreground"
        size={15}
      />
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className={`bg-white w-full outline-gray-200 outline text-sm pl-8 rounded-lg py-1.5${className}`}
        type="text"
      />
    </div>
  );
};

export default Input;
