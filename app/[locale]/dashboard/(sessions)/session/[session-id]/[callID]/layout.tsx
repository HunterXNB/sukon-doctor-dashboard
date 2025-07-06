import { getUser } from "@/actions/auth";
import { UserContextProvider } from "@/context/UserContext";
import StreamClientProvider from "@/Providers/StreamClientProvider";
import React from "react";
import "@stream-io/video-react-sdk/dist/css/styles.css";

async function SessionsLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ "session-id": string; "call-id": string }>;
}) {
  const { "session-id": sessionID } = await params;
  const user = await getUser();
  return (
    <div className="h-screen w-full bg-black" dir="ltr">
      <UserContextProvider user={user!}>
        <StreamClientProvider sessionID={Number(sessionID)}>
          {children}
        </StreamClientProvider>
      </UserContextProvider>
    </div>
  );
}

export default SessionsLayout;
