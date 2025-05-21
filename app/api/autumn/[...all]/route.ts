// app/api/autumn/[...all]/route.ts

import { autumnHandler } from "autumn-js/next";
import { auth } from "@/lib/auth";

export const { GET, POST } = autumnHandler({
  identify: async (request) => {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    return {
      customerId: session?.user?.id || "unauthenticated",
      customerData: {
        name: session?.user?.name,
        email: session?.user?.email,
      },
    };
  },
});