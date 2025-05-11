"use client";
import React from "react";
import { Button } from "../ui/button";
import { Appointment } from "./IncommingAppointments/columns";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Separator } from "../ui/separator";
const data: Appointment[] = [
  {
    id: "1",
    user: {
      name: "Ahmed",
      image: "/avatar-rect.svg",
    },
    type: "استشارة فردية",
    time: new Date(),
  },
  {
    id: "2",
    user: {
      name: "Ahmed",
      image: "/avatar-rect.svg",
    },
    type: "استشارة فردية",
    time: new Date(),
  },
  {
    id: "3",
    user: {
      name: "Ahmed",
      image: "/avatar-rect.svg",
    },
    type: "استشارة فردية",
    time: new Date(),
  },
  {
    id: "4",
    user: {
      name: "Ahmed",
      image: "/avatar-rect.svg",
    },
    type: "استشارة فردية",
    time: new Date(),
  },
  {
    id: "5",
    user: {
      name: "Ahmed",
      image: "/avatar-rect.svg",
    },
    type: "استشارة فردية",
    time: new Date(),
  },
  {
    id: "6",
    user: {
      name: "Ahmed",
      image: "/avatar-rect.svg",
    },
    type: "استشارة فردية",
    time: new Date(),
  },
  {
    id: "7",
    user: {
      name: "Ahmed",
      image: "/avatar-rect.svg",
    },
    type: "استشارة فردية",
    time: new Date(),
  },
  {
    id: "8",
    user: {
      name: "Ahmed",
      image: "/avatar-rect.svg",
    },
    type: "استشارة فردية",
    time: new Date(),
  },
];
function AppointmentsApproval() {
  const t = useTranslations("dashboardHome.appointmentsApproval");
  return (
    <div className="@[900px]:col-span-6 max-h-[400px] @[900px]:max-h-[unset]  flex flex-col gap-4 bg-white rounded-[12px] p-6 ">
      <div className="flex items-center justify-between">
        <h4 className="font-semibold md:text-xl text-secondary-800">
          {t("title")}
        </h4>
        <Button variant={"outline"} size={"sm"}>
          {t("viewAll")}
        </Button>
      </div>
      <div className="flex flex-col overflow-auto gap-4 no-scrollbar">
        {data.map((app) => (
          <AppointmentCard key={app.id} appointment={app} />
        ))}
      </div>
    </div>
  );
}
function AppointmentCard({ appointment }: { appointment: Appointment }) {
  const locale = useLocale();
  const t = useTranslations("dashboardHome.appointmentsApproval");
  return (
    <div className="p-3 flex rounded-[12px] border border-secondary-100 flex-col gap-2">
      <div className="flex gap-2 items-center">
        <div className="relative w-12  aspect-square rounded-[8px] overflow-hidden">
          <Image
            src={appointment.user.image}
            alt={appointment.user.name}
            className="object-cover"
            fill
          />
        </div>
        <div className="flex flex-col flex-1">
          <h5 className="font-medium max-md:text-sm text-secondary-800">
            {appointment.user.name}
          </h5>
          <div className="flex items-center max-md:text-xs justify-between w-full gap-2 text-xs text-gray-500">
            <span className="truncate">
              {appointment.time.toLocaleDateString(locale, {
                year: "numeric",
                day: "numeric",
                weekday: "long",
                month: "long",
              })}
            </span>
            <span className="truncate">{appointment.type}</span>
          </div>
        </div>
      </div>
      <Separator className="bg-secondary-100" />
      <div className="flex items-center gap-2">
        <Button
          variant={"default"}
          className="text-primary bg-primary-50 hover:bg-primary-200 flex-1"
        >
          {t("accept")}
        </Button>
        <Button variant={"destructive-extra"}>{t("reject")}</Button>
      </div>
    </div>
  );
}

export default AppointmentsApproval;
