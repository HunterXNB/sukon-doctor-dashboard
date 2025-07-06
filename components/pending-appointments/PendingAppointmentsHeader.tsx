import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";
import { getTranslations } from "next-intl/server";

interface PendingAppointmentsHeaderProps {
  pendingCount: number;
}

export default async function PendingAppointmentsHeader({
  pendingCount,
}: PendingAppointmentsHeaderProps) {
  const t = await getTranslations("pendingAppointments");

  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">{t("title")}</h1>
        <p className="text-gray-600 mt-2">{t("description")}</p>
      </div>
      <Badge variant="secondary" className="flex items-center gap-2">
        <Clock className="w-4 h-4" />
        {pendingCount} {t("pendingCount")}
      </Badge>
    </div>
  );
}
