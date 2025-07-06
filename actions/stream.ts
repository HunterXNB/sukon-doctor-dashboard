import { fetchData } from "@/lib/utils";

export const tokenProvider = async (sessionID: number) => {
  const req = await fetchData("/stream/room/token", {
    method: "POST",
    body: JSON.stringify({
      appointment_id: sessionID,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = (await req.json()) as {
    token: {
      token: string;
    };
  };

  return data.token.token;
};
