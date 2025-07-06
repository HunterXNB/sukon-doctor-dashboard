"use client";
import { tokenProvider } from "@/actions/stream";
import { useUser } from "@/context/UserContext";
import { StreamVideoClient, StreamVideo } from "@stream-io/video-react-sdk";
import { Loader2 } from "lucide-react";
import { ReactNode, useEffect, useState } from "react";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY as string;

const StreamClientProvider = ({
  children,
  sessionID,
}: {
  children: ReactNode;
  sessionID: number;
}) => {
  const [videoClient, setVideoClient] = useState<StreamVideoClient>();
  const { avatar, id, first_name, last_name } = useUser();
  useEffect(() => {
    if (!apiKey) throw new Error("Stream API key is missing");
    const client = new StreamVideoClient({
      apiKey,
      user: {
        id: id.toString(),
        name: [first_name, last_name].filter(Boolean).join(" "),
        image: avatar,
      },
      tokenProvider: () => tokenProvider(sessionID),
    });
    setVideoClient(client);
  }, [sessionID, id, first_name, last_name, avatar]);
  if (!videoClient)
    return (
      <div className="h-screen flex w-screen items-center justify-center text-white">
        <Loader2 className="animate-spin" />
      </div>
    );
  return <StreamVideo client={videoClient}>{children}</StreamVideo>;
};
export default StreamClientProvider;
