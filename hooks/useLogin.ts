import { setAuthToken } from "@/actions/auth";
import { fetchData } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
export default function useLogin() {
  return useMutation({
    mutationKey: ["login"],
    mutationFn: async function login(credentials: {
      email: string;
      type: "Provider";
      is_changed: boolean;
      code: string;
    }): Promise<never | { message: string }> {
      const request = await fetchData(
        `/auth/verify-otp`,
        {
          method: "POST",
          body: JSON.stringify(credentials),
        },
        {
          formData: false,
          fromLogin: true,
        }
      );
      if (!request.ok) {
        throw new Error((await request.json()).message);
      }
      const response = await request.json();
      await setAuthToken(response.data.token);

      return response;
    },
  });
}
