// app/api/autumn/[...all]/route.ts

import { auth } from "@/lib/auth"
import { autumnHandler } from "autumn-js/next"

export const { GET, POST } = autumnHandler({
    identify: async (request) => {
        const session = await auth.api.getSession({
            headers: request.headers
        })

        return {
            customerId: session?.user?.id || "unauthenticated",
            customerData: {
                name: session?.user?.name,
                email: session?.user?.email
            }
        }
    }
})
