"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check, X, AlertTriangle } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { confirmAppointment, rejectAppointment } from "@/actions/appointments";
import { toast } from "sonner";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  action: "accept" | "reject";
  appointmentId: number;
  patientName: string;
}

export default function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  action,
  appointmentId,
  patientName,
}: ConfirmationModalProps) {
  const t = useTranslations("pendingAppointments.modal");
  const [isLoading, setIsLoading] = useState(false);

  const isAccept = action === "accept";
  const title = isAccept ? t("acceptTitle") : t("rejectTitle");
  const description = isAccept
    ? t("acceptDescription", { patientName })
    : t("rejectDescription", { patientName });
  const confirmText = isAccept ? t("acceptConfirm") : t("rejectConfirm");

  const handleConfirm = async () => {
    setIsLoading(true);
    try {
      const result = isAccept
        ? await confirmAppointment(appointmentId)
        : await rejectAppointment(appointmentId);

      if (result.success) {
        toast.success(result.message);
        onClose();
        onConfirm();
      } else {
        toast.error(result.message);
      }
    } catch {
      toast.error("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div
              className={`p-2 rounded-full ${
                isAccept ? "bg-green-100" : "bg-red-100"
              }`}
            >
              <AlertTriangle
                className={`w-5 h-5 ${
                  isAccept ? "text-green-600" : "text-red-600"
                }`}
              />
            </div>
            <DialogTitle className="text-left">{title}</DialogTitle>
          </div>
          <DialogDescription className="text-left">
            {description}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            {t("cancel")}
          </Button>
          <Button
            onClick={handleConfirm}
            className={isAccept ? "bg-green-600 hover:bg-green-700" : ""}
            variant={isAccept ? "default" : "destructive"}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : isAccept ? (
              <Check className="w-4 h-4 mr-2" />
            ) : (
              <X className="w-4 h-4 mr-2" />
            )}
            {isLoading ? t("processing") : confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
