import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { Webhook } from "svix";
import { api } from "./_generated/api";

interface ClerkWebhookEvent {
  type: string;
  data: {
    id: string;
    email_addresses: { email_address: string }[];
    first_name?: string;
    last_name?: string;
    image_url?: string;
  };
}

const CLERK_WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

if (!CLERK_WEBHOOK_SECRET) {
  throw new Error("Missing Clerk Webhook Secret");
}

const http = httpRouter();

http.route({
  path: "/clerk-webhook",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    const headers = Object.fromEntries(request.headers.entries());
    const payload = await request.text();

    try {
      const wh = new Webhook(CLERK_WEBHOOK_SECRET);
      const evt = wh.verify(payload, headers) as ClerkWebhookEvent;

      const { type, data } = evt;

      if (type === "user.created") {
        const { id, email_addresses, first_name, last_name, image_url } = data;
        const email = email_addresses?.[0]?.email_address || "";
        const name = `${first_name || ""} ${last_name || ""}`.trim();

        if (!id || !email) {
          return new Response("Invalid user data", { status: 400 });
        }

        await ctx.runMutation(api.users.createUser, {
          clerkId: id,
          email,
          name,
          university: "Unknown University",              // 🔧 Default
          profileImage: image_url || "",
          collegeEmail: email,                           // 🔧 Just reuse main email for now
          collegeIdCard: "Not uploaded via webhook",     // 🔧 Placeholder
        });

        return new Response("User created", { status: 201 });
      }

      return new Response("Ignored event", { status: 200 });

    } catch (error) {
      console.error("Webhook verification failed:", error);
      return new Response("Unauthorized", { status: 401 });
    }
  }),
});

export default http;
