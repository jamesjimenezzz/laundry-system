"use client";

import { useState } from "react";
import { DateRange } from "react-day-picker";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "./button";

export default function SimpleDateRange() {
  const [range, setRange] = useState<DateRange | undefined>();

  const handleToday = () => {
    const today = new Date();

    setRange({ from: today, to: today });
  };

  const handle7Days = () => {
    const today = new Date();
    const sevenDays = new Date();
    sevenDays.setDate(today.getDate() - 6);

    setRange({ from: sevenDays, to: today });
  };

  const handle30Days = () => {
    const today = new Date();
    const thirthyDays = new Date();
    thirthyDays.setDate(today.getDate() - 31);

    setRange({ from: thirthyDays, to: today });
  };

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button>
            <CalendarIcon />
            {!range ? (
              "No selected dates"
            ) : (
              <div className="flex gap-2 text-sm ">
                <p>
                  {range?.from?.toLocaleDateString("en-US", {
                    month: "long",
                    day: "2-digit",
                    year: "numeric",
                  }) || "No selected date"}
                </p>
                <p>-</p>
                <p>
                  {range?.to?.toLocaleDateString("en-US", {
                    month: "long",
                    day: "2-digit",
                    year: "numeric",
                  })}
                </p>
              </div>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <div className="flex">
            {/* Picker  */}
            <Calendar
              mode="range"
              numberOfMonths={1}
              selected={range}
              onSelect={setRange}
            />
            <div className="w-full flex flex-col gap-3 text-center">
              <Button onClick={handleToday} className="cursor-pointer">
                Today
              </Button>
              <Button onClick={handle7Days} className="cursor-pointer">
                Last 7 days
              </Button>
              <Button onClick={handle30Days} className="cursor-pointer">
                Last 30 days
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
}
