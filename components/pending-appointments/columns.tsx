"use client";

import type {
  CellContext,
  ColumnDef,
  HeaderContext,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { PendingAppointment } from "@/types/PendingAppointment";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { MoreHorizontal, Phone, Calendar, Clock, Check, X } from "lucide-react";
import { useState } from "react";
import ConfirmationModal from "./ConfirmationModal";
import CreateCallModal from "./CreateCallModal";

export const columns: ColumnDef<PendingAppointment>[] = [
  {
    accessorKey: "patient",
    header: HeaderCell,
    cell: PatientCell,
  },
  {
    accessorKey: "complaint",
    header: HeaderCell,
    cell: ComplaintCell,
  },
  {
    accessorKey: "date",
    header: HeaderCell,
    cell: DateTimeCell,
  },
  {
    accessorKey: "doctor",
    header: HeaderCell,
    cell: DoctorCell,
  },
  {
    accessorKey: "status",
    header: HeaderCell,
    cell: StatusCell,
  },
  {
    accessorKey: "actions",
    header: HeaderCell,
    cell: ActionsCell,
  },
];

function HeaderCell({ header }: HeaderContext<PendingAppointment, unknown>) {
  const t = useTranslations("pendingAppointments.table.header");
  return (
    <p
      className={cn("text-secondary-800 text-xs font-medium", {
        "text-end": header.id === "actions",
      })}
    >
      {t(header.id)}
    </p>
  );
}

function PatientCell({ row }: CellContext<PendingAppointment, unknown>) {
  const appointment = row.original;
  const patient = appointment.patient.user;
  const patientName = `${patient.first_name} ${patient.last_name || ""}`.trim();

  return (
    <div className="flex items-center gap-3">
      <Avatar className="h-8 w-8">
        <AvatarImage src={patient.avatar || "/avatar.svg"} alt={patientName} />
        <AvatarFallback>
          {patientName
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </AvatarFallback>
      </Avatar>
      <div>
        <div className="font-medium">{patientName}</div>
        <div className="flex items-center gap-1 text-sm text-gray-500">
          <Phone className="w-3 h-3" />
          {patient.mobile}
        </div>
      </div>
    </div>
  );
}

function ComplaintCell({ row }: CellContext<PendingAppointment, unknown>) {
  const complaint = row.getValue("complaint") as string;

  if (!complaint) {
    return <div className="text-sm text-gray-400">-</div>;
  }

  return (
    <div className="text-sm text-gray-600 max-w-xs truncate" title={complaint}>
      {complaint}
    </div>
  );
}

function DateTimeCell({ row }: CellContext<PendingAppointment, unknown>) {
  const appointment = row.original;

  return (
    <div className="flex items-center gap-2 text-sm text-gray-600">
      <Calendar className="w-4 h-4" />
      <div>
        <div>{appointment.date}</div>
        <div className="flex items-center gap-1 text-xs text-gray-500">
          <Clock className="w-3 h-3" />
          {appointment.start_time} ({appointment.duration} min)
        </div>
      </div>
    </div>
  );
}

function DoctorCell({ row }: CellContext<PendingAppointment, unknown>) {
  const appointment = row.original;
  const doctor = appointment.doctor;
  const doctorName = `${doctor.first_name} ${doctor.last_name}`;

  return (
    <div className="flex items-center gap-3">
      <Avatar className="h-8 w-8">
        <AvatarImage src={doctor.avatar || "/avatar.svg"} alt={doctorName} />
        <AvatarFallback>
          {doctorName
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </AvatarFallback>
      </Avatar>
      <div>
        <div className="font-medium text-sm">{doctorName}</div>
        <div className="text-xs text-gray-500">{doctor.role}</div>
      </div>
    </div>
  );
}

function StatusCell({ row }: CellContext<PendingAppointment, unknown>) {
  const status = row.getValue("status") as string;

  const getStatusConfig = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return {
          variant: "secondary" as const,
          label: "Pending",
          className: "bg-yellow-100 text-yellow-800 border-yellow-200",
        };
      case "accepted":
        return {
          variant: "default" as const,
          label: "Accepted",
          className: "bg-green-100 text-green-800 border-green-200",
        };
      case "rejected":
        return {
          variant: "destructive" as const,
          label: "Rejected",
          className: "bg-red-100 text-red-800 border-red-200",
        };
      case "ongoing":
        return {
          variant: "default" as const,
          label: "Ongoing",
          className: "bg-purple-100 text-purple-800 border-purple-200",
        };
      case "completed":
        return {
          variant: "default" as const,
          label: "Completed",
          className: "bg-blue-100 text-blue-800 border-blue-200",
        };
      case "cancelled":
        return {
          variant: "destructive" as const,
          label: "Cancelled",
          className: "bg-gray-100 text-gray-800 border-gray-200",
        };
      default:
        return {
          variant: "secondary" as const,
          label: status,
          className: "bg-gray-100 text-gray-800 border-gray-200",
        };
    }
  };

  const statusConfig = getStatusConfig(status);

  return (
    <Badge
      variant={statusConfig.variant}
      className={`capitalize ${statusConfig.className}`}
    >
      {statusConfig.label}
    </Badge>
  );
}

function ActionsCell({ row }: CellContext<PendingAppointment, unknown>) {
  const t = useTranslations("pendingAppointments");
  const appointment = row.original;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState<"accept" | "reject" | null>(
    null
  );
  const [isCreateCallModalOpen, setIsCreateCallModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const patientName = `${appointment.patient.user.first_name} ${
    appointment.patient.user.last_name || ""
  }`.trim();

  const isOngoing = appointment.status.toLowerCase() === "ongoing";

  const handleAction = (action: "accept" | "reject") => {
    setModalAction(action);
    setIsModalOpen(true);
  };

  const handleCreateCall = () => {
    setIsCreateCallModalOpen(true);
  };

  const handleConfirm = () => {
    // Modal will handle the server action directly
    setIsModalOpen(false);
    setModalAction(null);
  };

  const handleCreateCallConfirm = () => {
    setIsCreateCallModalOpen(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalAction(null);
  };

  const handleCloseCreateCallModal = () => {
    setIsCreateCallModalOpen(false);
  };

  return (
    <>
      <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <MoreHorizontal className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {isOngoing ? (
            <DropdownMenuItem
              onPointerDown={(e) => {
                e.preventDefault();
              }}
              onSelect={(e) => {
                e.preventDefault();
                setIsDropdownOpen(false);
                handleCreateCall();
              }}
              className="text-blue-600 focus:text-blue-600"
            >
              <Phone className="mr-2 h-4 w-4" />
              {t("createCall")}
            </DropdownMenuItem>
          ) : (
            <>
              <DropdownMenuItem
                onPointerDown={(e) => {
                  e.preventDefault();
                }}
                onSelect={(e) => {
                  e.preventDefault();
                  setIsDropdownOpen(false);
                  handleAction("accept");
                }}
                className="text-green-600 focus:text-green-600"
              >
                <Check className="mr-2 h-4 w-4" />
                {t("accept")}
              </DropdownMenuItem>
              <DropdownMenuItem
                onPointerDown={(e) => {
                  e.preventDefault();
                }}
                onSelect={(e) => {
                  e.preventDefault();
                  setIsDropdownOpen(false);
                  handleAction("reject");
                }}
                className="text-red-600 focus:text-red-600"
              >
                <X className="mr-2 h-4 w-4" />
                {t("reject")}
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {modalAction && (
        <ConfirmationModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onConfirm={handleConfirm}
          action={modalAction}
          appointmentId={appointment.id}
          patientName={patientName}
        />
      )}

      <CreateCallModal
        isOpen={isCreateCallModalOpen}
        onClose={handleCloseCreateCallModal}
        onConfirm={handleCreateCallConfirm}
        appointmentId={appointment.id}
        patientName={patientName}
      />
    </>
  );
}
