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
import { Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { createCall } from "@/actions/appointments";
import { toast } from "sonner";
import { useRouter } from "@/i18n/routing";

interface CreateCallModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  appointmentId: number;
  patientName: string;
}

export default function CreateCallModal({
  isOpen,
  onClose,
  onConfirm,
  appointmentId,
  patientName,
}: CreateCallModalProps) {
  const t = useTranslations("pendingAppointments.modal.createCall");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleConfirm = async () => {
    setIsLoading(true);
    try {
      const result = await createCall(appointmentId);

      if (result.success) {
        toast.success(result.message);
        onClose();
        onConfirm();

        // Navigate to the session page
        if (result.callId) {
          router.push(`/dashboard/session/${appointmentId}/${result.callId}`);
        }
      } else {
        toast.error(result.message);
      }
    } catch {
      toast.error(t("errorCreatingCall"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-blue-100">
              <Phone className="w-5 h-5 text-blue-600" />
            </div>
            <DialogTitle className="text-left">{t("title")}</DialogTitle>
          </div>
          <DialogDescription className="text-left">
            {t("description", { patientName })}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            {t("cancel")}
          </Button>
          <Button
            onClick={handleConfirm}
            className="bg-blue-600 hover:bg-blue-700"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Phone className="w-4 h-4 mr-2" />
            )}
            {isLoading ? t("processing") : t("createCall")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
