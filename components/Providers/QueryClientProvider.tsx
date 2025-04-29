"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { ReactNode, useState } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function TanStackQueryClientProvider({ children }: { children: ReactNode }) {
  const [queryClient] = useState(new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools position="bottom" initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default TanStackQueryClientProvider;
