import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { popular, species } from "@/server/db/schema";
import { Column, eq, ilike, or, sql } from "drizzle-orm";
import { PgColumn } from "drizzle-orm/pg-core";

interface PopularReturn {
  id: number | null;
  name: string | null;
  region: string | null;
  sourceName: string | null;
  collector: string | null;
}

interface SpeciesReturn {
  id: number;
  scientificName: string | null;
  brName: string | null;
  enName: string | null;
  createdAt: Date | null;
  popular: PopularReturn[] | null;
}

export const speciesRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  searchString: publicProcedure
    .input(
      z.object({
        searchString: z.string().min(1),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { searchString } = input;
      const data = await ctx.db
        .selectDistinct({
          id: species.id,
          scientificName: species.scientificName,
          brName: species.brName,
          enName: species.enName,
        })
        .from(species)
        .leftJoin(popular, eq(species.id, popular.speciesId))
        .where(
          or(
            ilike(species.scientificName, `%${searchString}%`),
            ilike(species.brName, `%${searchString}%`),
            ilike(species.enName, `%${searchString}%`),
            ilike(popular.name, `%${searchString}%`),
          ),
        );

      console.log(data);
      return data;
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.select().from(species);
  }),

  getOne: publicProcedure
    .input(z.object({ speciesId: z.number() }))
    .query(async ({ ctx, input }) => {
      const data = await ctx.db
        .select()
        .from(species)
        .where(eq(species.id, input.speciesId))
        .leftJoin(popular, eq(species.id, popular.speciesId));

      const at = data.reduce(
        (acc: SpeciesReturn, cur) => {
          if (acc.id === cur.species.id && cur?.popular) {
            acc.popular?.push(cur?.popular);
          } else {
            const pop = cur?.popular || null;
            acc = {
              ...cur.species,
              popular: [
                {
                  id: pop?.id || null,
                  name: pop?.name || null,
                  region: pop?.region || null,
                  sourceName: pop?.sourceName || null,
                  collector: pop?.collector || null,
                },
              ],
            };
          }
          return acc;
        },
        {
          id: 0,
          scientificName: "",
          brName: "",
          enName: "",
          createdAt: new Date(),
          popular: [],
        },
      );
      console.log(at);
      return at;
    }),
});
