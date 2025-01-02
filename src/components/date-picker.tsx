import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { type PropsWithChildren, useState } from "react";

type Props = {
  onChange: (newDate: Date) => void;
  defaultDate: Date;
};

export function DatePicker({
  children,
  onChange,
  defaultDate,
}: PropsWithChildren<Props>) {
  const [date, setDate] = useState<Date>(defaultDate);

  function handleChange(newDate: Date | undefined) {
    if (!newDate) return;
    setDate(newDate);
    onChange(newDate);
  }

  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(e) => handleChange(e)}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
