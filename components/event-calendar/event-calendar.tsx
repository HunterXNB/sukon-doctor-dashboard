"use client";

import {
  // useEffect,
  //  useMemo,
  useState,
} from "react";
import { useCalendarContext } from "./calendar-context";
import {
  // addDays,
  // addMonths,
  // addWeeks,
  // endOfWeek,
  format,
  // isSameMonth,
  // startOfWeek,
  // subMonths,
  // subWeeks,
} from "date-fns";
// import {
//   ChevronDownIcon,
//   ChevronLeftIcon,
//   ChevronRightIcon,
// } from "lucide-react";
import { toast } from "sonner";

import {
  addHoursToDate,
  // AgendaDaysToShow,
  AgendaView,
  CalendarDndProvider,
  CalendarEvent,
  CalendarView,
  DayView,
  // EventDialog,
  EventGap,
  EventHeight,
  MonthView,
  WeekCellsHeight,
  WeekView,
} from "@/components/event-calendar";
// import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuShortcut,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import ThemeToggle from "@/components/theme-toggle";
// import Participants from "@/components/participants";

export interface EventCalendarProps {
  events?: CalendarEvent[];
  onEventAdd?: (event: CalendarEvent) => void;
  onEventUpdate?: (event: CalendarEvent) => void;
  onEventDelete?: (eventId: string) => void;
  className?: string;
  initialView?: CalendarView;
}

export function EventCalendar({
  events = [],
  // onEventAdd,
  onEventUpdate,
  // onEventDelete,
  // className,
  initialView = "month",
}: EventCalendarProps) {
  // Use the shared calendar context instead of local state
  const {
    currentDate,
    // setCurrentDate
  } = useCalendarContext();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [view, setView] = useState<CalendarView>(initialView);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isEventDialogOpen, setIsEventDialogOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(
    null
  );

  // Add keyboard shortcuts for view switching
  // useEffect(() => {
  //   const handleKeyDown = (e: KeyboardEvent) => {
  //     // Skip if user is typing in an input, textarea or contentEditable element
  //     // or if the event dialog is open
  //     if (
  //       isEventDialogOpen ||
  //       e.target instanceof HTMLInputElement ||
  //       e.target instanceof HTMLTextAreaElement ||
  //       (e.target instanceof HTMLElement && e.target.isContentEditable)
  //     ) {
  //       return;
  //     }

  //     switch (e.key.toLowerCase()) {
  //       case "m":
  //         setView("month");
  //         break;
  //       case "w":
  //         setView("week");
  //         break;
  //       case "d":
  //         setView("day");
  //         break;
  //       case "a":
  //         setView("agenda");
  //         break;
  //     }
  //   };

  //   window.addEventListener("keydown", handleKeyDown);

  //   return () => {
  //     window.removeEventListener("keydown", handleKeyDown);
  //   };
  // }, [isEventDialogOpen]);

  const handleEventSelect = (event: CalendarEvent) => {
    console.log("Event selected:", event); // Debug log
    setSelectedEvent(event);
    setIsEventDialogOpen(true);
  };

  const handleEventCreate = (startTime: Date) => {
    console.log("Creating new event at:", startTime); // Debug log

    // Snap to 15-minute intervals
    const minutes = startTime.getMinutes();
    const remainder = minutes % 15;
    if (remainder !== 0) {
      if (remainder < 7.5) {
        // Round down to nearest 15 min
        startTime.setMinutes(minutes - remainder);
      } else {
        // Round up to nearest 15 min
        startTime.setMinutes(minutes + (15 - remainder));
      }
      startTime.setSeconds(0);
      startTime.setMilliseconds(0);
    }

    const newEvent: CalendarEvent = {
      id: "",
      title: "",
      start: startTime,
      end: addHoursToDate(startTime, 1),
      allDay: false,
    };
    setSelectedEvent(newEvent);
    setIsEventDialogOpen(true);
  };

  // const handleEventSave = (event: CalendarEvent) => {
  //   if (event.id) {
  //     onEventUpdate?.(event);
  //     // Show toast notification when an event is updated
  //     toast(`Event "${event.title}" updated`, {
  //       description: format(new Date(event.start), "MMM d, yyyy"),
  //       position: "bottom-left",
  //     });
  //   } else {
  //     onEventAdd?.({
  //       ...event,
  //       id: Math.random().toString(36).substring(2, 11),
  //     });
  //     // Show toast notification when an event is added
  //     toast(`Event "${event.title}" added`, {
  //       description: format(new Date(event.start), "MMM d, yyyy"),
  //       position: "bottom-left",
  //     });
  //   }
  //   setIsEventDialogOpen(false);
  //   setSelectedEvent(null);
  // };

  // const handleEventDelete = (eventId: string) => {
  //   const deletedEvent = events.find((e) => e.id === eventId);
  //   onEventDelete?.(eventId);
  //   setIsEventDialogOpen(false);
  //   setSelectedEvent(null);

  //   // Show toast notification when an event is deleted
  //   if (deletedEvent) {
  //     toast(`Event "${deletedEvent.title}" deleted`, {
  //       description: format(new Date(deletedEvent.start), "MMM d, yyyy"),
  //       position: "bottom-left",
  //     });
  //   }
  // };

  const handleEventUpdate = (updatedEvent: CalendarEvent) => {
    onEventUpdate?.(updatedEvent);

    // Show toast notification when an event is updated via drag and drop
    toast(`Event "${updatedEvent.title}" moved`, {
      description: format(new Date(updatedEvent.start), "MMM d, yyyy"),
      position: "bottom-left",
    });
  };

  // const viewTitle = useMemo(() => {
  //   if (view === "month") {
  //     return format(currentDate, "MMMM yyyy");
  //   } else if (view === "week") {
  //     const start = startOfWeek(currentDate, { weekStartsOn: 0 });
  //     const end = endOfWeek(currentDate, { weekStartsOn: 0 });
  //     if (isSameMonth(start, end)) {
  //       return format(start, "MMMM yyyy");
  //     } else {
  //       return `${format(start, "MMM")} - ${format(end, "MMM yyyy")}`;
  //     }
  //   } else if (view === "day") {
  //     return (
  //       <>
  //         <span className="min-sm:hidden" aria-hidden="true">
  //           {format(currentDate, "MMM d, yyyy")}
  //         </span>
  //         <span className="max-sm:hidden min-md:hidden" aria-hidden="true">
  //           {format(currentDate, "MMMM d, yyyy")}
  //         </span>
  //         <span className="max-md:hidden">
  //           {format(currentDate, "EEE MMMM d, yyyy")}
  //         </span>
  //       </>
  //     );
  //   } else if (view === "agenda") {
  //     // Show the month range for agenda view
  //     const start = currentDate;
  //     const end = addDays(currentDate, AgendaDaysToShow - 1);

  //     if (isSameMonth(start, end)) {
  //       return format(start, "MMMM yyyy");
  //     } else {
  //       return `${format(start, "MMM")} - ${format(end, "MMM yyyy")}`;
  //     }
  //   } else {
  //     return format(currentDate, "MMMM yyyy");
  //   }
  // }, [currentDate, view]);

  return (
    <div
      className="flex has-data-[slot=month-view]:flex-1 flex-col rounded-lg"
      style={
        {
          "--event-height": `${EventHeight}px`,
          "--event-gap": `${EventGap}px`,
          "--week-cells-height": `${WeekCellsHeight}px`,
        } as React.CSSProperties
      }
    >
      <CalendarDndProvider onEventUpdate={handleEventUpdate}>
        <div className="flex flex-1 flex-col overflow-auto no-scrollbar">
          {view === "month" && (
            <MonthView
              currentDate={currentDate}
              events={events}
              onEventSelect={handleEventSelect}
              onEventCreate={handleEventCreate}
            />
          )}
          {view === "week" && (
            <WeekView
              currentDate={currentDate}
              events={events}
              onEventSelect={handleEventSelect}
              onEventCreate={handleEventCreate}
            />
          )}
          {view === "day" && (
            <DayView
              currentDate={currentDate}
              events={events}
              onEventSelect={handleEventSelect}
              onEventCreate={handleEventCreate}
            />
          )}
          {view === "agenda" && (
            <AgendaView
              currentDate={currentDate}
              events={events}
              onEventSelect={handleEventSelect}
            />
          )}
        </div>

        {/* <EventDialog
          event={selectedEvent}
          isOpen={isEventDialogOpen}
          onClose={() => {
            setIsEventDialogOpen(false);
            setSelectedEvent(null);
          }}
          onSave={handleEventSave}
          onDelete={handleEventDelete}
        /> */}
      </CalendarDndProvider>
    </div>
  );
}
