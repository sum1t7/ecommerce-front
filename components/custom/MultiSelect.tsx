"use client";
import { Command } from "cmdk";

import { useState } from "react";
import { Badge } from "../ui/badge";
import { X } from "lucide-react";

interface MultiSelectProps {
  placeholder: string;
  collections: CollectionType[];
  value: string[];
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  placeholder,
  collections,
  value,
  onChange,
  onRemove,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [open, setOpen] = useState(false);

  let selected: CollectionType[];

  if (value.length === 0) {
    selected = [];
  } else {
    selected = value.map((id) =>
      collections.find((collection) => collection._id === id)
    ) as CollectionType[];
  }
  const selectables = collections.filter(
    (collection) => !selected.includes(collection)
  );

   return (
    <Command className="overflow-visible  bg-white ">
      <div className="flex  gap-1 flex-wrap border rounder-md ">
        {selected.map((collection) => (
          <Badge key={collection._id}>
            {collection.title}
            <button className="ml-1 hover:text-red-1">
              <X className="h-3 w-3" onClick={() => onRemove(collection._id)} />
            </button>
          </Badge>
        ))}

        <Command.Input
          placeholder={placeholder}
          value={inputValue}
          onValueChange={setInputValue}
          onBlur={() => setOpen(false)}
          onFocus={() => setOpen(true)}
          className="flex h-10 w-full  border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2  disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
        />
      </div>

      <div className="mt-2 relative">
        {open && (
          <Command.Group className="absolute z-10 w-full bg-white rounded-md shadow-md top-0 border ">
            {selectables.map((collection) => (
              <Command.Item
                key={collection._id}
                className="px-2 py-1 hover:bg-grey-2 cursor-pointer "
                onSelect={() => {
                  onChange(collection._id);
                  setInputValue("");
                }}
                onMouseDown={(e) => e.preventDefault()}
                
              >
                {collection.title}
              </Command.Item>
            ))}
          </Command.Group>
        )}
      </div>
    </Command>
  );
};

export default MultiSelect;
