import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Fetch a personalized message by name (slug)
export const getMessageByName = query({
  args: { name: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("messages")
      .filter((q) => q.eq(q.field("name"), args.name.toLowerCase()))
      .unique();
  },
});

// Fetch a message by its secret code
export const getMessageByCode = query({
  args: { code: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("messages")
      .withIndex("by_code", (q) => q.eq("code", args.code.toUpperCase()))
      .unique();
  },
});

// Seed data mutation (to be run once)
export const seed = mutation({
  args: {},
  handler: async (ctx) => {
    const existing = await ctx.db.query("messages").collect();
    if (existing.length > 0) return "Already seeded";

    const data = [
      {
        name: "aditi",
        displayName: "Aditi",
        code: "ADITI2025",
        quote: "✨ Aditi — Your Year Wrapped ✨\n\nFrom childhood till now, you’ve always felt more like a friend than just a sister...",
        imageUrl: "/assets/aditi.jpg",
      },
      {
        name: "sourav",
        displayName: "Sourav",
        code: "SOURAVBHAIYAJI2025",
        quote: "✨ Sourav — Your Year Wrapped ✨\n\nYou’ve always felt like the real big brother figure in my life...",
        imageUrl: "/assets/sourav.jpg",
      },
      // ... more data can be added here or via dashboard
    ];

    for (const item of data) {
      await ctx.db.insert("messages", item);
    }
    return "Seeded successfully";
  },
});

// Log a visitor
export const logVisitor = mutation({
  args: {
    name: v.string(),
    codeUsed: v.string(),
    device: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("visitors", {
      ...args,
      timestamp: Date.now(),
    });
  },
});
