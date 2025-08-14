import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

/* -----------------------------------------
 ✅ Create a new user during Registration
------------------------------------------ */
export const createUser = mutation({
  args: {
    clerkId: v.string(),
    name: v.string(),
    email: v.string(),
    university: v.string(),
    profileImage: v.string(),
    collegeEmail: v.string(),
    collegeIdCard: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("users", args);
  },
});

/* -----------------------------------------
 ✅ Query: Get a user by Convex document ID
------------------------------------------ */
export const getUserById = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.userId);
  },
});

/* -----------------------------------------
 ✅ Get Current Convex User by Clerk ID
------------------------------------------ */
export const getCurrentUserByClerkId = query({
  args: { clerkId: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .unique();

    if (!user) throw new Error("User not found");
    return user;
  },
});

/* -----------------------------------------
 ✅ Update User Profile after Login (Used in Registration Form)
------------------------------------------ */
export const updateUserProfile = mutation({
  args: {
    userId: v.string(),
    collegeEmail: v.string(),
    collegeIdCard: v.string(),
    university: v.string(),
    profileImage: v.string(),
  },
  handler: async (ctx, args) => {
    // 1. Find the user document first
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("clerkId"), args.userId))
      .first();

    // 2. If user doesn't exist, throw an error
    if (!user) {
      throw new Error("User not found");
    }

    // 3. Patch using the document _id (string)
    await ctx.db.patch(user._id, {
      collegeEmail: args.collegeEmail,
      collegeIdCard: args.collegeIdCard,
      university: args.university,
      profileImage: args.profileImage,
    });
  },
});

/* -----------------------------------------
 ✅ Create a Ride Offer
------------------------------------------ */
export const createRide = mutation({
  args: {
    driverId: v.id("users"),
    startLocation: v.string(),
    endLocation: v.string(),
    departureTime: v.string(),
    availableSeats: v.float64(),
    vehicleDetails: v.object({
      model: v.string(),
      plateNumber: v.string(),
    }),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("rides", args);
  },
});

/* -----------------------------------------
 ✅ Create a Ride Search (Request)
------------------------------------------ */
export const createSearch = mutation({
  args: {
    userId: v.id("users"),
    startLocation: v.string(),
    endLocation: v.string(),
    departureTime: v.string(),
    timestamp: v.float64(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("searches", args);
  },
});

/* -----------------------------------------
 ✅ Create a Support Request
------------------------------------------ */
export const createSupportRequest = mutation({
  args: {
    userId: v.id("users"),
    message: v.string(),
    status: v.union(v.literal("pending"), v.literal("resolved")),
    timestamp: v.number(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("supportRequests", args);
  },
});
