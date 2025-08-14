import { query } from "./_generated/server";
import { v } from "convex/values";

export const findMatchingRides = query({
  args: {
    startLocation: v.string(),
    endLocation: v.string(),
    departureTime: v.string(),
  },
  handler: async (ctx, args) => {
    const allRides = await ctx.db.query("rides").collect();

    return allRides.filter(ride =>
      ride.startLocation.toLowerCase() === args.startLocation.toLowerCase() &&
      ride.endLocation.toLowerCase() === args.endLocation.toLowerCase() &&
      ride.departureTime === args.departureTime
    );
  }
});
