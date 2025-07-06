import { Card, CardContent } from "@/components/ui/card";
import { Clock } from "lucide-react";
import { getTranslations } from "next-intl/server";

export default async function PendingAppointmentsEmpty() {
  const t = await getTranslations("pendingAppointments");

  return (
    <Card className="text-center py-12">
      <CardContent>
        <Clock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {t("noPendingTitle")}
        </h3>
        <p className="text-gray-600">{t("noPendingDescription")}</p>
      </CardContent>
    </Card>
  );
}
