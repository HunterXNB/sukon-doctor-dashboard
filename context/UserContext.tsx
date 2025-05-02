"use client";

import { UserProfile } from "@/types/User";
import { createContext, ReactNode, useContext } from "react";
const UserContext = createContext<UserProfile>({} as UserProfile);
export function UserContextProvider({
  children,
  user,
}: {
  children: ReactNode;
  user: UserProfile;
}) {
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

export const useUser = () => useContext(UserContext);
