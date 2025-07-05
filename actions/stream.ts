import { fetchData } from "@/lib/utils";

export const tokenProvider = async (sessionID: number) => {
  const req = await fetchData("/stream/room/token", {
    method: "POST",
    body: JSON.stringify({
      appointment_id: sessionID,
    }),
  });
  const data = (await req.json()) as {
    token: string;
  };
  return data.token;
};
