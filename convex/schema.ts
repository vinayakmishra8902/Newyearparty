import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  messages: defineTable({
    name: v.string(), // key (lowercase)
    displayName: v.string(), // greeting name
    code: v.string(),
    quote: v.string(),
    imageUrl: v.string(),
  }).index("by_code", ["code"]),
  
  visitors: defineTable({
    name: v.string(),
    codeUsed: v.string(),
    device: v.string(),
    timestamp: v.number(),
  }),
});

