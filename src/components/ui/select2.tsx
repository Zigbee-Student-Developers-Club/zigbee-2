"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; // Import from your shadcn components
import { cn } from "@/lib/utils";
import { Loader2, PackageX } from "lucide-react"; // For loading spinner

type Option =
  | string
  | {
      value: string;
      label: string;
      disabled?: boolean;
    };

interface Select2Props {
  data: Option[];
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  maxHeight?: number | string;
  emptyMessage?: string;
}

const Select2 = ({
  data,
  label,
  placeholder = "Select an option",
  value,
  onChange,
  disabled = false,
  loading = false,
  className,
  maxHeight = 200,
  emptyMessage = "No options available",
}: Select2Props) => {
  // Helper function to determine if the data is an array of objects
  const isObjectData = (
    item: Option
  ): item is { value: string; label: string; disabled?: boolean } => {
    return typeof item === "object";
  };

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-medium text-foreground">{label}</label>
      )}
      <Select
        value={value}
        onValueChange={onChange}
        disabled={disabled || loading}
      >
        <SelectTrigger className={cn("w-full min-w-60", className)}>
          <SelectValue placeholder={placeholder}>
            {loading ? (
              <div className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Loading...</span>
              </div>
            ) : (
              value &&
              (isObjectData(data[0])
                ? (data as { value: string; label: string }[]).find(
                    (item) => item.value === value
                  )?.label
                : value)
            )}
          </SelectValue>
        </SelectTrigger>
        <SelectContent className="w-full" style={{ maxHeight }}>
          {data?.length > 0 ? (
            data?.map((item, index) => {
              if (isObjectData(item)) {
                return (
                  <SelectItem
                    key={item?.value}
                    value={item?.value}
                    disabled={item?.disabled}
                  >
                    {item?.label}
                  </SelectItem>
                );
              }
              return (
                <SelectItem key={index} value={item}>
                  {item}
                </SelectItem>
              );
            })
          ) : (
            <div className="flex flex-col items-center justify-center gap-2 px-2 py-8 text-sm text-gray-500">
              <PackageX className="h-6 w-6 text-gray-400" />
              {emptyMessage}
            </div>
          )}
        </SelectContent>
      </Select>
    </div>
  );
};

export { Select2 };
