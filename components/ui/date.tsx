"use client";

import * as React from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import { addDays, format, startOfDay, endOfDay } from "date-fns";
import { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type Props = React.HTMLAttributes<HTMLDivElement> & {
  value?: DateRange;
  onChange?: (range: DateRange | undefined) => void;
  allowFuture?: boolean;
};

export function DatePickerWithRange({
  className,
  value,
  onChange,
  allowFuture = true,
}: Props) {
  // Uncontrolled fallback
  const [internal, setInternal] = React.useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 20),
  });

  const range = value ?? internal;

  const handleSelect = (r: DateRange | undefined) => {
    // normalize to start/end of day for consistent backend queries
    const normalized = r?.from
      ? {
          from: startOfDay(r.from),
          to: r.to ? endOfDay(r.to) : undefined,
        }
      : undefined;

    if (onChange) onChange(normalized);
    else setInternal(normalized);
  };

  const clear = () => handleSelect(undefined);

  const setPreset = (days: number) => {
    const today = new Date();
    handleSelect({
      from: startOfDay(addDays(today, -days + 1)),
      to: endOfDay(today),
    });
  };

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal",
              !range && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {range?.from ? (
              range.to ? (
                <>
                  {format(range.from, "LLL dd, y")} -{" "}
                  {format(range.to, "LLL dd, y")}
                </>
              ) : (
                format(range.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-auto p-2" align="start">
          <div className="flex gap-3">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={range?.from}
              selected={range}
              onSelect={handleSelect}
              numberOfMonths={2}
              // Disable future dates if needed
              hidden={{ after: new Date() }}
            />
            <div className="flex w-40 flex-col gap-2">
              <Button variant="secondary" onClick={() => setPreset(1)}>
                Today
              </Button>
              <Button variant="secondary" onClick={() => setPreset(7)}>
                Last 7 days
              </Button>
              <Button variant="secondary" onClick={() => setPreset(30)}>
                Last 30 days
              </Button>
              <Button variant="ghost" onClick={clear}>
                Clear
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
