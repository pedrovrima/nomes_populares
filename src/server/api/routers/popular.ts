import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { popular } from "@/server/db/schema";

export const popularRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  create: publicProcedure
    .input(
      z.object({
        name: z.string().min(1),
        region: z.string().min(1),
        sourceName: z.string().min(1),
        collector: z.string().min(1),
        speciesId: z.number().int(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(popular).values({
        name: input.name,
        region: input.region,
        sourceName: input.sourceName,
        collector: input.collector,
        speciesId: input.speciesId,
      });
    }),

  // getLatest: publicProcedure.query(({ ctx }) => {
  //   return ctx.db.query.users.findFirst({
  //     orderBy: (users, { desc }) => [desc(users.createdAt)],
  //   });
  // }),
});
