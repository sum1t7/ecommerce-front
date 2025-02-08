"use client";
import { useState } from "react";
import { Input } from "../ui/input";
import { Badge } from "@/components/ui/badge"
 import { X } from "lucide-react";


interface MultiTextProps {
  placeholder: string;
  value: string[];
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
}

const MultiText: React.FC<MultiTextProps> = ({
  placeholder,
  value,
  onChange,
  onRemove,
}) => {
  const [inputValue, setInputValue] = useState("");
  const addvalue = (item: string) => {
    onChange(item);
    setInputValue("");
  };
  return (
    <>
      <Input
        placeholder={placeholder}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            addvalue(inputValue);
          }
        }}
      />
    <div className="flex gap-1 flex-wrap mt-4 ">
        {value.map((value, index) => (
            <Badge key={index} className="bg-grey-1 text-white">{value}
            <button className="ml-2 rounded-full outline-none hover:bg-red-1 " onClick={() => onRemove(value)} >
              <X className="w-3 h-3"/>
            </button>
            </Badge>
        ))}
    </div>
    </>
  );
};

export default MultiText;
