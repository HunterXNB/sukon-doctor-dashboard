import StreamClientProvider from "@/Providers/StreamClientProvider";
import React from "react";

async function SessionsLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ sessionID: string }>;
}) {
  const { sessionID } = await params;
  return (
    <StreamClientProvider sessionID={Number(sessionID)}>
      {children}
    </StreamClientProvider>
  );
}

export default SessionsLayout;
