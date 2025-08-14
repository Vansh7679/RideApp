import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    clerkId: v.string(),
    email: v.string(),
    name: v.string(),
    university: v.string(),
    profileImage: v.optional(v.string()),
    collegeEmail: v.optional(v.string()),     // ✅ Optional
    collegeIdCard: v.optional(v.string()),    // ✅ Optional
  })
  .index("by_clerk_id", ["clerkId"]),
  
  rides: defineTable({
    driverId: v.id("users"),
    startLocation: v.string(),
    endLocation: v.string(),
    departureTime: v.string(),
    availableSeats: v.float64(),
    vehicleDetails: v.object({
      model: v.string(),
      plateNumber: v.string(),
    }),
  }).index("by_start_location", ["startLocation"]),

  searches: defineTable({
    userId: v.id("users"),
    startLocation: v.string(),
    endLocation: v.string(),
    departureTime: v.string(),
    timestamp: v.float64(),
  }),

  supportRequests: defineTable({
    userId: v.id("users"),
    message: v.string(),
    status: v.union(v.literal("pending"), v.literal("resolved")),
    timestamp: v.number(),
  }),
});
