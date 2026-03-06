"use client";

import React, { useState } from "react";
import { Input } from "./ui/input";

export default function FilterInput({
  placeholder,
  handleFilter,
}: FilterInputProps) {
  const [input, setInput] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const newInput = e.target.value;

    if (!newInput) {
      return;
    }

    setInput(newInput);
    handleFilter(input);
  };

  return (
    <Input
      placeholder={placeholder}
      value={input}
      onChange={handleInputChange}
    />
  );
}

type FilterInputProps = {
  placeholder: string;
  handleFilter: (filterString: string) => void;
};
