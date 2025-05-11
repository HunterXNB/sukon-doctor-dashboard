"use client";

import { ChevronRightIcon } from "lucide-react";
import React from "react";
import { AppHeaderPortal } from "./AppHeader";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { ChevronLeftIcon } from "lucide-react";
import { addWeeks } from "date-fns";
import { subWeeks } from "date-fns";
import { useCalendarContext } from "./event-calendar/calendar-context";

function CalendarHeader() {
  const { currentDate, setCurrentDate } = useCalendarContext();
  const handlePrevious = () => {
    setCurrentDate(subWeeks(currentDate, 1));
  };

  const handleNext = () => {
    setCurrentDate(addWeeks(currentDate, 1));
  };
  const handleToday = () => {
    setCurrentDate(new Date());
  };
  return (
    <AppHeaderPortal>
      <div
        className={cn(
          "flex flex-col sm:flex-row sm:items-center justify-between gap-2 py-5 sm:px-4 max-sm:hidden"
        )}
      >
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center sm:gap-2 max-sm:order-1">
              <Button
                variant="outline"
                size="icon"
                className="max-sm:size-8"
                onClick={handlePrevious}
                aria-label="Previous"
              >
                <ChevronLeftIcon
                  size={16}
                  className="rtl:-scale-x-100"
                  aria-hidden="true"
                />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="max-sm:size-8"
                onClick={handleNext}
                aria-label="Next"
              >
                <ChevronRightIcon
                  size={16}
                  className="rtl:-scale-x-100"
                  aria-hidden="true"
                />
              </Button>
            </div>
            <Button
              variant="outline"
              className="max-sm:h-8 max-sm:px-2.5"
              onClick={handleToday}
            >
              Today
            </Button>
          </div>
        </div>
      </div>
    </AppHeaderPortal>
  );
}

export default CalendarHeader;
