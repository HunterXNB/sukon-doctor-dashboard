import BigCalendar from "@/components/big-calendar";
import { CalendarProvider } from "@/components/event-calendar/calendar-context";
import React from "react";
import CalendarHeader from "@/components/CalendarHeader";

function page() {
  return (
    <CalendarProvider>
      <CalendarHeader />
      <BigCalendar />
    </CalendarProvider>
  );
}

export default page;
