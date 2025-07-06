"use server";

import { fetchData } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export async function confirmAppointment(appointmentId: number) {
  try {
    const response = await fetchData(
      `/doctor-dashboard/appointments/${appointmentId}/confirm`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to confirm appointment");
    }

    // Revalidate the pending appointments page
    revalidatePath("/dashboard/pending-appointments");

    return {
      success: true,
      message: "Appointment confirmed successfully",
    };
  } catch (error) {
    console.error("Error confirming appointment:", error);
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to confirm appointment",
    };
  }
}

export async function rejectAppointment(appointmentId: number) {
  try {
    const response = await fetchData(
      `/doctor-dashboard/appointments/${appointmentId}/cancel`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to reject appointment");
    }

    // Revalidate the pending appointments page
    revalidatePath("/dashboard/pending-appointments");

    return {
      success: true,
      message: "Appointment rejected successfully",
    };
  } catch (error) {
    console.error("Error rejecting appointment:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to reject appointment",
    };
  }
}

export async function createCall(appointmentId: number) {
  try {
    const response = await fetchData(`/stream/room`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        appointment_id: appointmentId,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to create call");
    }

    const data = await response.json();

    // Revalidate the pending appointments page
    revalidatePath("/dashboard/pending-appointments");

    return {
      success: true,
      message: "Call created successfully",
      callId: data.call_id,
      appointmentId: appointmentId,
    };
  } catch (error) {
    console.error("Error creating call:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to create call",
    };
  }
}
